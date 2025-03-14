---
title: Ants Vs. SomeBees
createTime: 2024/12/10 21:20:41
permalink: /cs61a/91gmdeq1/
---

![](https://cdn.jsdelivr.net/gh/zzyAJohn/Blog-Image/2024-12-10/202412102124480.png)

<div align="center">
    The bees are coming!<br>
    Create a better soldier<br>
    With inherit-ants.
</div>

## Introduction
In this project, you will create a tower defense game called Ants Vs. SomeBees. As the ant queen, you populate your colony with the bravest ants you can muster. Your ants must protect their queen from the evil bees that invade your territory. Irritate the bees enough by throwing leaves at them, and they will be vanquished. Fail to pester the airborne intruders adequately, and your queen will succumb to the bees' wrath. This game is inspired by PopCap Games' [Plants Vs. Zombies](https://www.ea.com/ea-studios/popcap/plants-vs-zombies).

This project uses an object-oriented programming paradigm, focusing on material from [Chapter 2.5](https://www.composingprograms.com/pages/25-object-oriented-programming.html) of Composing Programs. The project also involves understanding, extending, and testing a large program.


## Download starter files
The [ants.zip](https://cs61a.org/proj/ants/ants.zip) archive contains several files, but all of your changes will be made to `ants.py`.

- `ants.py`: The game logic of Ants Vs. SomeBees
- `ants_plans.py`: The details of each difficulty level
- `ucb.py`: Utility functions for CS 61A
- `gui.py`: A graphical user interface (GUI) for Ants Vs. SomeBees.
- `ok`: The autograder
- `proj3.ok`: The `ok` configuration file
- `tests`: A directory of tests used by `ok`
- `libs`: A directory of libraries used by `gui.py`
- `static`: A directory of images and files used by `gui.py`
- `templates`: A directory of HTML templates used by `gui.py`


## Logistics
You will turn in the following files:

- `ants.py`

You do not need to modify or turn in any other files to complete the project. To submit the project, submit the required files to the appropriate Gradescope assignment.

You may not use artificial intelligence tools to help you with this project or reference solutions found on the internet.

For the functions that we ask you to complete, there may be some initial code that we provide. If you would rather not use that code, feel free to delete it and start from scratch. You may also add new function definitions as you see fit.

However, please do not modify any other functions or edit any files not listed above. Doing so may result in your code failing our autograder tests. Also, please do not change any function signatures (names, argument order, or number of arguments).

Throughout this project, you should be testing the correctness of your code. It is good practice to test often, so that it is easy to isolate any problems. However, you should not be testing too often, to allow yourself time to think through problems.

We have provided an autograder called ok to help you with testing your code and tracking your progress. The first time you run the autograder, you will be asked to log in with your Ok account using your web browser. Please do so. Each time you run ok, it will back up your work and progress on our servers.

The primary purpose of ok is to test your implementations.

If you want to test your code interactively, you can run
```bash
python3 ok -q [question number] -i
```
with the appropriate question number (e.g. 01) inserted. This will run the tests for that question until the first one you failed, then give you a chance to test the functions you wrote interactively.
You can also use the debugging print feature in OK by writing
```bash
print("DEBUG:", x)
```
which will produce an output in your terminal without causing OK tests to fail with extra output.

## The Game
A game of Ants Vs. SomeBees consists of a series of turns. In each turn, new bees may enter the ant colony. Then, new ants are placed to defend their colony. Finally, all insects (ants, then bees) take individual actions. Bees either try to move toward the end of the tunnel or sting ants in their way. Ants perform a different action depending on their type, such as collecting more food or throwing leaves at the bees. The game ends either when a bee reaches the end of the tunnel (ants lose), the bees destroy a `QueenAnt` if it exists (ants lose), or the entire bee fleet has been vanquished (ants win).

![](https://cdn.jsdelivr.net/gh/zzyAJohn/Blog-Image/2024-12-10/202412102138932.png)

## Core concepts
**The Colony**. This is where the game takes place. The colony consists of several `Places` that are chained together to form tunnels through which the bees travel. The colony also has some quantity of food which can be expended in order to place an ant in a tunnel.

**Places**. A place links to another place to form a tunnel. The player can put a single ant into each place. However, there can be many bees in a single place.

**The Hive**. This is the place where bees originate. Bees exit the beehive to enter the ant colony.

**Ants**. The player places an ant into the colony by selecting from the available ant types at the top of the screen. Each type of ant takes a different action and requires a different amount of colony food to place. The two most basic ant types are the `HarvesterAnt`, which adds one food to the colony during each turn, and the `ThrowerAnt`, which throws a leaf at a bee each turn. You will be implementing many more!

**Bees**. Each turn, a bee either advances to the next place in the tunnel if no ant is in its way, or it stings the ant in its way. Bees win when at least one bee reaches the end of a tunnel. In addition to the orange bees, there are yellow wasps that do double damage and a green boss bee that is quite difficult to vanquish.

## Core classes
The concepts described above each have a corresponding class that encapsulates the logic for that concept. Here is a summary of the main classes involved in this game:

- `GameState`: Represents the colony and some state information about the game, including how much food is available, how much time has elapsed, where the `AntHomeBase` is, and all the `Places` in the game.
- `Place`: Represents a single place that holds insects. At most one `Ant` can be in a single place, but there can be many `Bee`s in a single place. `Place` objects have an `exit` to the left and an `entrance` to the right, which are also places. Bees travel through a tunnel by moving to a `Place`'s `exit`.
- `Hive`: Represents the place where `Bee`s start out (on the right of the tunnel).
AntHomeBase: Represents the place `Ant`s are defending (on the left of the tunnel). If `Bee`s get here, they win :(
- `Insect`: A base class for `Ant` and `Bee`. Each insect has a `health` attribute representing its remaining health and a place attribute representing the Place where it is currently located. Each turn, every active `Insect` in the game performs its `action`.
- `Ant`: Represents ants. Each Ant subclass has special attributes or a special action that distinguish it from other Ant types. For example, a HarvesterAnt gets food for the colony and a `ThrowerAnt` attacks `Bee`s. Each ant type also has a `food_cost` attribute that indicates how much it costs to deploy one unit of that type of ant.
- `Bee`: Represents bees. Each turn, a bee either moves to the `exit` of its current `Place` if the `Place` is not `blocked` by an ant, or stings the ant occupying its same `Place`.


## Game Layout
Below is a visualization of a GameState.

![](https://cdn.jsdelivr.net/gh/zzyAJohn/Blog-Image/2024-12-15/202412152005014.png)

To help visualize how all the classes fit together, here is a diagram of all of the classes and their inheritance relationships.

## Phase 1: Basic gameplay
In the first phase you will complete the implementation that will allow for basic gameplay with the two basic `Ant`s: the `HarvesterAnt` and the `ThrowerAnt`.

### Problem 0 (0 pt)
Answer a set of conceptual questions after you have read the entire `ants.py` file by running this `ok` command:
```bash
python ok -q 00 -u
```

If you get stuck while answering these questions, you can try reading through `ants.py` again or asking questions on Ed.

A note on unlocking tests: If you'd like to review the unlocking questions after you have completed the unlocking test, you can navigate to (within the `ants` folder), the `tests` folder. For example, after unlocking Problem 0, you can review the unlocking test at `tests/00.py`.

::: details 点击查看答案
```bash
PS D:\Github\CS61A_Fall2024\proj\ants> python ok -q 00 -u
=====================================================================
Assignment: Project 3: Ants Vs. SomeBees
OK, version v1.18.1
=====================================================================

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Unlocking tests

At each "? ", type what you would expect the output to be.
Type exit() to quit

---------------------------------------------------------------------
Problem 0 > Suite 1 > Case 1
(cases remaining: 9)

Q: What is the significance of an Insect's health attribute? Does this
value change? If so, how?
Choose the number of the correct choice:
0) It represents the amount of health the insect has left, so the
   insect is eliminated when it reaches 0
1) It represents the strength of an insect against attacks, which
   doesn't change throughout the game
2) It represents health protecting the insect, so the insect can only
   be damaged when its health reaches 0
? 0
-- OK! --

---------------------------------------------------------------------
Problem 0 > Suite 1 > Case 2
(cases remaining: 8)

Choose the number of the correct choice:
0) health
1) place
2) damage
3) bees
? 2
-- OK! --

---------------------------------------------------------------------
Problem 0 > Suite 1 > Case 3
(cases remaining: 7)

Q: Is the health attribute of the Ant class an instance attribute or class attribute? Why?
Choose the number of the correct choice:
0) instance, each Ant starts out with a different amount of health
1) class, when one Ant gets damaged, all ants receive the same amount of damage
2) instance, each Ant instance needs its own health value
3) class, Ants of the same subclass all have the same amount of starting health
? 2
-- OK! --

---------------------------------------------------------------------
Problem 0 > Suite 1 > Case 4
(cases remaining: 6)

Q: Is the damage attribute of an Ant subclass (such as ThrowerAnt) an
instance or class attribute? Why?
Choose the number of the correct choice:
0) instance, each Ant does damage to bees at different rates
1) instance, the damage an Ant depends on where the Ant is
2) class, all Ants of the same subclass deal the same damage
3) class, all Ants deal the same damage
? 2
-- OK! --

---------------------------------------------------------------------
Problem 0 > Suite 1 > Case 5
(cases remaining: 5)

Q: Which class do both Ant and Bee inherit from?
Choose the number of the correct choice:
0) Place
1) Insect
2) Ant
3) Bee
? 1
-- OK! --

---------------------------------------------------------------------
Problem 0 > Suite 1 > Case 6
(cases remaining: 4)

Q: What do instances of Ant and instances of Bee have in common? Please choose the most correct answer.
Choose the number of the correct choice:
0) Ants and Bees both have the attribute damage and the methods
   reduce_health and action
1) Ants and Bees both take the same action each turn
2) Ants and Bees have nothing in common
3) Ants and Bees both have the attributes health, damage, and place
   and the methods reduce_health and action
? 3
-- OK! --

---------------------------------------------------------------------
Problem 0 > Suite 1 > Case 7
(cases remaining: 3)

Q: How many insects can be in a single Place at any given time in the
game (before Problem 8)?

Choose the number of the correct choice:
0) There is no limit on the number of insects of any type in a single Place
1) There can be one Bee and many Ants in a single Place
2) Only one insect can be in a single Place at a time
3) There can be one Ant and many Bees in a single Place
? 3
-- OK! --

---------------------------------------------------------------------
Problem 0 > Suite 1 > Case 8
(cases remaining: 2)

Q: What does a Bee do during one of its turns?
Choose the number of the correct choice:
0) The bee moves to the next place, then stings the ant in that place
1) The bee flies to the nearest Ant and attacks it
2) The bee stings the ant in its place and then moves to the next place
3) The bee stings the ant in its place or moves to the next place if there is no ant in its place
? 3
-- OK! --

---------------------------------------------------------------------
Problem 0 > Suite 1 > Case 9
(cases remaining: 1)

Q: When is the game lost?
Choose the number of the correct choice:
0) When any bee reaches the end of the tunnel and the Queen Ant is killed
1) When the bees enter the colony
2) When the colony runs out of food
3) When no ants are left on the map
4) When any bee reaches the end of the tunnel or when the Queen Ant is killed
? 4
-- OK! --

---------------------------------------------------------------------
OK! All cases for Problem 0 unlocked.

Backup... 100% complete
Backup past deadline by 45 days, 3 hours, 21 minutes, and 11 seconds
Backup successful for user: zhiyong947@gmail.com
URL: https://okpy.org/cal/cs61a/fa24/ants/backups/kDQN6r

OK is up to date
PS D:\Github\CS61A_Fall2024\proj\ants> 
```
:::


### Problem 1 (1 pt)
**Part A**: Currently, there is no cost for placing any type of Ant, and so there is no challenge to the game. The base class Ant has a food_cost of zero. Override this class attribute for HarvesterAnt and ThrowerAnt according to the "Food Cost" column in the table below.

|Class|Food Cost|Initial Health|
|:-:|:-:|:-:|
|![](https://cdn.jsdelivr.net/gh/zzyAJohn/Blog-Image/2024-12-15/202412152010482.png) <br> HarvesterAnt|2|1|
|![](https://cdn.jsdelivr.net/gh/zzyAJohn/Blog-Image/2024-12-15/202412152011061.png) <br> ThrowerAnt|3|1|


**Part B**: Now that placing an Ant costs food, we need to be able to gather more food! To fix this issue, implement the HarvesterAnt class. A HarvesterAnt is a type of Ant that adds one food to the gamestate.food total as its action.

Before writing any code, unlock the tests to verify your understanding of the question:

```bash
python ok -q 01 -u
```

::: details 点击查看答案
```bash
PS D:\Github\CS61A_Fall2024> cd .\proj\ants\
PS D:\Github\CS61A_Fall2024\proj\ants> python ok -q 01 -u 
=====================================================================
Assignment: Project 3: Ants Vs. SomeBees
OK, version v1.18.1
=====================================================================

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Unlocking tests

At each "? ", type what you would expect the output to be.
Type exit() to quit

---------------------------------------------------------------------
Problem 1 > Suite 1 > Case 1
(cases remaining: 5)

Q: What is the purpose of the food_cost attribute?
Choose the number of the correct choice:
0) Placing an ant into the colony will decrease the colony's total   
   available food by that ant's food_cost
1) Each turn, each Ant in the colony eats food_cost food from the    
   colony's total available food
2) Each turn, each Ant in the colony adds food_cost food to the      
   colony's total available food
? 0
-- OK! --

---------------------------------------------------------------------
Problem 1 > Suite 1 > Case 2
(cases remaining: 4)

Q: What type of attribute is food_cost?
Choose the number of the correct choice:
Problem 1 > Suite 1 > Case 2
(cases remaining: 4)

Q: What type of attribute is food_cost?
Choose the number of the correct choice:
(cases remaining: 4)

Q: What type of attribute is food_cost?
Choose the number of the correct choice:

Q: What type of attribute is food_cost?
Choose the number of the correct choice:
Q: What type of attribute is food_cost?
Choose the number of the correct choice:
Choose the number of the correct choice:
0) instance, the food_cost of an Ant is randomized upon initialization
0) instance, the food_cost of an Ant is randomized upon initialization
1) instance, the food_cost of an Ant depends on the location it is placed
2) class, all Ants cost the same to place no matter what type of Ant it is
3) class, all Ants of the same subclass cost the same to place
? 3
-- OK! --

---------------------------------------------------------------------
Problem 1 > Suite 2 > Case 1
(cases remaining: 3)

>>> from ants import *
>>> from ants_plans import *
>>> Ant.food_cost
? 2
-- Not quite. Try again! --

? 3
-- Not quite. Try again! --

? 0
-- OK! --

>>> HarvesterAnt.food_cost
? 2
-- OK! --

>>> ThrowerAnt.food_cost
? 3
-- OK! --

---------------------------------------------------------------------
Problem 1 > Suite 2 > Case 2
(cases remaining: 2)

>>> from ants import *
>>> from ants_plans import *
>>> # Testing HarvesterAnt action
>>> # Create a test layout where the colony is a single row with 9 tiles
>>> beehive = Hive(make_test_assault_plan())
>>> gamestate = GameState(beehive, ant_types(), dry_layout, (1, 9))
>>> #
>>> gamestate.food = 4
>>> harvester = HarvesterAnt()
>>> # Note: initializing an Ant doesn't cost food,
>>> # only deploying an Ant in the game layout does.
>>> # For this test case, Ants can still take actions
>>> # without being deployed in the game layout.
>>> #
>>> gamestate.food
? 4
-- OK! --

>>> harvester.action(gamestate) # executing harvester's action method. this symbolizes the ant taking one turn.
>>> gamestate.food
? 13
-- Not quite. Try again! --

? 5
-- OK! --

>>> harvester.action(gamestate) # harvester's action is executed again.
>>> gamestate.food
? 5
-- Not quite. Try again! --

? 6
-- OK! --

---------------------------------------------------------------------
Problem 1 > Suite 2 > Case 3
(cases remaining: 1)

-- Already unlocked --

---------------------------------------------------------------------
OK! All cases for Problem 1 unlocked.

Backup... 100% complete
Backup past deadline by 45 days, 3 hours, 34 minutes, and 35 seconds
Backup successful for user: zhiyong947@gmail.com
URL: https://okpy.org/cal/cs61a/fa24/ants/backups/lDQN87

OK is up to date
PS D:\Github\CS61A_Fall2024\proj\ants> 
```
:::

Once you are done unlocking, begin implementing your solution. You can check your correctness with:
```bash
python ok -q 01
```


::: details 点击查看答案

```py
# ants.py
class HarvesterAnt(Ant):
    """HarvesterAnt produces 1 additional food per turn for the colony."""

    name = 'Harvester'
    implemented = True
    # OVERRIDE CLASS ATTRIBUTES HERE
    food_cost = 2 # [!code ++]

    def action(self, gamestate):
        """Produce 1 additional food for the colony.

        gamestate -- The GameState, used to access game state information.
        """
        # BEGIN Problem 1
        "*** YOUR CODE HERE ***"
        gamestate.food += 1 # [!code ++]
        # END Problem 1


class ThrowerAnt(Ant):
    """ThrowerAnt throws a leaf each turn at the nearest Bee in its range."""

    name = 'Thrower'
    implemented = True
    damage = 1
    # ADD/OVERRIDE CLASS ATTRIBUTES HERE
    food_cost = 3 # [!code ++]

    def nearest_bee(self):
        """Return the nearest Bee in a Place (that is not the hive) connected to
        the ThrowerAnt's Place by following entrances.

        This method returns None if there is no such Bee (or none in range).
        """
        # BEGIN Problem 3 and 4
        return random_bee(self.place.bees) # REPLACE THIS LINE
        # END Problem 3 and 4

    def throw_at(self, target):
        """Throw a leaf at the target Bee, reducing its health."""
        if target is not None:
            target.reduce_health(self.damage)

    def action(self, gamestate):
        """Throw a leaf at the nearest Bee in range."""
        self.throw_at(self.nearest_bee())

```
:::

### Problem 2 (1 pt)
In this problem, you'll complete `Place.__init__` by adding code that tracks entrances. Right now, a `Place` keeps track only of its `exit`. We would like a `Place` to keep track of its entrance as well. A `Place` needs to track only one `entrance`. Tracking entrances will be useful when an `Ant` needs to see what `Bees` are in front of it in the tunnel.

However, simply passing an entrance to a `Place` constructor will be problematic; we would need to have both the exit and the entrance before creating a `Place`! (It's a chicken or the egg problem.) To get around this problem, we will keep track of entrances in the following way instead. `Place.__init__` should use this logic:

- A newly created `Place` always starts with its `entrance` as `None`.
- If the `Place` has an `exit`, then the `exit`'s `entrance` is set to that `Place`.

Hint: Remember that when the `__init__` method is called, the first parameter, `self`, is bound to the newly created object

Hint: Try drawing out two `Place` s next to each other if things get confusing. In the GUI, a place's `entrance` is to its right while the `exit` is to its left.

Hint: Remember that `Place` s are not stored in a list, so you can't index into anything to access them. This means that you can't do something like `colony[index + 1]` to access an adjacent `Place`. How can you move from one place to another?

![](https://cdn.jsdelivr.net/gh/zzyAJohn/Blog-Image/2024-12-15/202412152017811.png)

Before writing any code, unlock the tests to verify your understanding of the question:
```bash
python ok -q 02 -u
```

::: details 点击查看答案
```bash
PS D:\Github\CS61A_Fall2024\proj\ants> python ok -q 02 -u 
=====================================================================
Assignment: Project 3: Ants Vs. SomeBees
OK, version v1.18.1
=====================================================================

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Unlocking tests

At each "? ", type what you would expect the output to be.
Type exit() to quit

---------------------------------------------------------------------
Problem 2 > Suite 1 > Case 1
(cases remaining: 5)

Q: What does a Place represent in the game?
Choose the number of the correct choice:
0) A single tile that an Ant can be placed on and that connects to
   other Places
1) The tunnel that bees travel through
2) Where the bees start out in the game
3) The entire space where the game takes place
? 0
-- OK! --

---------------------------------------------------------------------
Problem 2 > Suite 1 > Case 2
(cases remaining: 4)

Q: p is a Place whose entrance is q and exit is r (q and r are not None). When is p.entrance first set to a non-None value?
Choose the number of the correct choice:
0) When q is constructed
1) Never, it is always set to None
2) When p is constructed
? 0
-- OK! --

---------------------------------------------------------------------
Problem 2 > Suite 1 > Case 3
(cases remaining: 3)

Q: p is a Place whose entrance is q and exit is r (q and r are not None). When is p.exit first set to a non-None value?
Choose the number of the correct choice:
0) When q is constructed
1) Never, it is always set to None
2) When p is constructed
? 2
-- OK! --

---------------------------------------------------------------------
Problem 2 > Suite 2 > Case 1
(cases remaining: 2)

>>> from ants import *
>>> from ants_plans import *
>>> #
>>> # Create a test layout where the gamestate is a single row with 3 tiles
>>> beehive, layout = Hive(make_test_assault_plan()), dry_layout
>>> dimensions = (1, 3)
>>> gamestate = GameState(beehive, ant_types(), layout, dimensions)
>>> #
>>> # Simple test for Place
>>> place0 = Place('place_0')
>>> print(place0.exit)
? None
-- OK! --

>>> print(place0.entrance)
? None
-- OK! --

>>> place1 = Place('place_1', place0)
>>> place1.exit is place0
? True
-- OK! --

>>> place0.entrance is place1
? None
-- Not quite. Try again! --

? True
-- OK! --

---------------------------------------------------------------------
Problem 2 > Suite 2 > Case 2
(cases remaining: 1)

-- Already unlocked --

---------------------------------------------------------------------
OK! All cases for Problem 2 unlocked.

Backup... 100% complete
Backup past deadline by 45 days, 4 hours, 1 minute, and 56 seconds
Backup successful for user: zhiyong947@gmail.com
URL: https://okpy.org/cal/cs61a/fa24/ants/backups/rXZngW

OK is up to date
PS D:\Github\CS61A_Fall2024\proj\ants> 
```
:::

Once you are done unlocking, begin implementing your solution. You can check your correctness with:
```bash
python ok -q 02
```

::: details 点击查看答案
```py
class Place:
    """A Place holds insects and has an exit to another Place."""
    is_hive = False

    def __init__(self, name, exit=None):
        """Create a Place with the given NAME and EXIT.

        name -- A string; the name of this Place.
        exit -- The Place reached by exiting this Place (may be None).
        """
        self.name = name
        self.exit = exit
        self.bees = []        # A list of Bees
        self.ant = None       # An Ant
        self.entrance = None  # A Place
        # Phase 1: Add an entrance to the exit
        # BEGIN Problem 2
        "*** YOUR CODE HERE ***"
        if exit: # [!code ++]
            exit.entrance = self # [!code ++]
        # END Problem 2

    def add_insect(self, insect):
        """Asks the insect to add itself to this place. This method exists so
        that it can be overridden in subclasses.
        """
        insect.add_to(self)

    def remove_insect(self, insect):
        """Asks the insect to remove itself from this place. This method exists so
        that it can be overridden in subclasses.
        """
        insect.remove_from(self)

    def __str__(self):
        return self.name
```
:::


### Problem 3 (2 pt)
In order for a `ThrowerAnt` to throw a leaf, it must know which bee to hit. The provided implementation of the `nearest_bee` method in the `ThrowerAnt` class only allows them to hit bees in the same `Place`. Your job is to fix it so that a `ThrowerAnt` will throw_at the nearest bee in front of it **that is not still in the** `Hive`.

This includes bees that are in the same `Place` as a `ThrowerAnt`

Hint: All `Places` have an is_hive attribute which is `True` when that place is the `Hive`.

Change `nearest_bee` so that it returns a random Bee from the nearest place that contains bees. Your implementation should follow this logic:

- Start from the current `Place` of the `ThrowerAnt`.
- For each place, return a random bee if there is any, and if not, inspect the place in front of it (stored as the current place's `entrance`).
- If there is no bee to attack, return `None`.

Hint: The `random_bee` function provided in ants.py returns a random bee from a list of bees or None if the list is empty.

Hint: As a reminder, if there are no bees present at a `Place`, then the `bees` attribute of that `Place` instance will be an empty list.

Hint: Having trouble visualizing the test cases? Try drawing them out on paper! The sample diagram provided in Game Layout shows the first test case for this problem.

Before writing any code, unlock the tests to verify your understanding of the question:
```bash
python ok -q 03 -u
```

::: details 点击查看答案
```bash
PS D:\Github\CS61A_Fall2024\proj\ants> python ok -q 03 -u 
=====================================================================
Assignment: Project 3: Ants Vs. SomeBees
OK, version v1.18.1
=====================================================================

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Unlocking tests

At each "? ", type what you would expect the output to be.
Type exit() to quit

---------------------------------------------------------------------
Problem 3 > Suite 1 > Case 1
(cases remaining: 12)

Q: What Bee should a ThrowerAnt throw at?
Choose the number of the correct choice:
1) The ThrowerAnt finds the nearest place including and in front of its
   own place that has Bees and throws at a random Bee in that place
2) The ThrowerAnt finds the nearest place in either direction that has
   Bees and throws at a random Bee in that place
3) The ThrowerAnt finds the nearest place behind its own place
   that has Bees and throws at a random Bee in that place
4) The ThrowerAnt throws at a random Bee in its own Place
? 0
-- OK! --

---------------------------------------------------------------------
Problem 3 > Suite 1 > Case 2
(cases remaining: 11)

Q: How do you get the Place object in front of another Place object?
Choose the number of the correct choice:
0) The place's entrance instance attribute
1) Decrement the place by 1
2) Increment the place by 1
3) The place's exit instance attribute
? 0
-- OK! --

---------------------------------------------------------------------
Problem 3 > Suite 1 > Case 3
(cases remaining: 10)

Q: What is the entrance of the first Place in a tunnel (i.e. where do the bees enter from)?
Choose the number of the correct choice:
0) An empty Place
1) None
2) The Hive
? 2
-- OK! --

---------------------------------------------------------------------
Problem 3 > Suite 1 > Case 4
(cases remaining: 9)

Q: How can you determine if a given Place is the Hive?
Choose the number of the correct choice:
0) by checking the bees attribute of the place instance
1) by checking the ant attribute of the place instance
2) by using the is_hive attribute of the place instance
? 2
-- OK! --

---------------------------------------------------------------------
Problem 3 > Suite 1 > Case 5
(cases remaining: 8)

Q: What should nearest_bee return if there is no Bee in front of the ThrowerAnt in the tunnel?
Choose the number of the correct choice:
0) The closest Bee behind the ThrowerAnt
1) A random Bee in the Hive
2) None
? 2
-- OK! --

---------------------------------------------------------------------
Problem 3 > Suite 2 > Case 1
(cases remaining: 7)

>>> from ants import *
>>> beehive, layout = Hive(AssaultPlan()), dry_layout
>>> dimensions = (1, 9)
>>> gamestate = GameState(beehive, ant_types(), layout, dimensions)
>>> thrower = ThrowerAnt()
>>> ant_place = gamestate.places["tunnel_0_0"]
>>> ant_place.add_insect(thrower)
>>> #
>>> # Testing nearest_bee
>>> near_bee = Bee(2) # A Bee with 2 health
>>> far_bee = Bee(3)  # A Bee with 3 health
>>> hive_bee = Bee(4) # A Bee with 4 health
>>> hive_place = gamestate.beehive
>>> hive_place.is_hive # Check if this place is the Hive
? True
-- OK! --

>>> hive_place.add_insect(hive_bee)
>>> thrower.nearest_bee() is hive_bee # Bees in the Hive can never be attacked
? False
-- OK! --

>>> near_place = gamestate.places['tunnel_0_3']
>>> far_place = gamestate.places['tunnel_0_6']
>>> near_place.is_hive # Check if this place is the Hive
? False
-- OK! --

>>> near_place.add_insect(near_bee)
>>> far_place.add_insect(far_bee)
>>> nearest_bee = thrower.nearest_bee()
>>> thrower.place is ant_place    # Don't change self.place!
? True
-- OK! --

>>> nearest_bee is far_bee
? False
-- OK! --

>>> nearest_bee is near_bee
? True
-- OK! --

>>> nearest_bee.health
? 1
-- Not quite. Try again! --

? 2
-- OK! --

>>> thrower.action(gamestate)    # Attack! ThrowerAnts do 1 damage
>>> near_bee.health
? 1
-- OK! --

>>> far_bee.health
? 3
-- OK! --

>>> thrower.place is ant_place    # Don't change self.place!
? True
-- OK! --

---------------------------------------------------------------------
Problem 3 > Suite 2 > Case 2
(cases remaining: 6)

-- Already unlocked --

---------------------------------------------------------------------
Problem 3 > Suite 2 > Case 3
(cases remaining: 5)

-- Already unlocked --

---------------------------------------------------------------------
Problem 3 > Suite 2 > Case 4
(cases remaining: 4)

-- Already unlocked --

---------------------------------------------------------------------
Problem 3 > Suite 2 > Case 5
(cases remaining: 3)

-- Already unlocked --

---------------------------------------------------------------------
Problem 3 > Suite 2 > Case 6
(cases remaining: 2)

-- Already unlocked --

---------------------------------------------------------------------
Problem 3 > Suite 2 > Case 7
(cases remaining: 1)

-- Already unlocked --

---------------------------------------------------------------------
OK! All cases for Problem 3 unlocked.

Backup... 100% complete
Backup past deadline by 45 days, 4 hours, 21 minutes, and 7 seconds
Backup successful for user: zhiyong947@gmail.com
URL: https://okpy.org/cal/cs61a/fa24/ants/backups/yMlxpg

OK is up to date
PS D:\Github\CS61A_Fall2024\proj\ants> 
```
:::

Once you are done unlocking, begin implementing your solution. You can check your correctness with:
```bash
python3 ok -q 03
```

::: details 点击查看答案
```py
class ThrowerAnt(Ant):
    """ThrowerAnt throws a leaf each turn at the nearest Bee in its range."""

    name = 'Thrower'
    implemented = True
    damage = 1
    # ADD/OVERRIDE CLASS ATTRIBUTES HERE
    food_cost = 3

    def nearest_bee(self):
        """Return the nearest Bee in a Place (that is not the hive) connected to
        the ThrowerAnt's Place by following entrances.

        This method returns None if there is no such Bee (or none in range).
        """
        # BEGIN Problem 3 and 4
        cur_place = self.place # [!code ++]
        while cur_place is not None: # [!code ++]
            if cur_place.bees and cur_place.is_hive == False: # [!code ++]
                return random_bee(cur_place.bees) # REPLACE THIS LINE # [!code ++]
            cur_place = cur_place.entrance # [!code ++]
        return None # [!code ++]
        return random_bee(self.place.bees) # REPLACE THIS LINE # [!code --]
        # END Problem 3 and 4

    def throw_at(self, target):
        """Throw a leaf at the target Bee, reducing its health."""
        if target is not None:
            target.reduce_health(self.damage)

    def action(self, gamestate):
        """Throw a leaf at the nearest Bee in range."""
        self.throw_at(self.nearest_bee())


def random_bee(bees):
    """Return a random bee from a list of bees, or return None if bees is empty."""
    assert isinstance(bees, list), \
        "random_bee's argument should be a list but was a %s" % type(bees).__name__
    if bees:
        return random.choice(bees)
```
:::
