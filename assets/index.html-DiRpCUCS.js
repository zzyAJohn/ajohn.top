import{_ as i,o as a,c as n,e as l}from"./app-CAmiM7gQ.js";const e={};function p(t,s){return a(),n("div",null,s[0]||(s[0]=[l(`<blockquote><p>你只需要无条件地信任并调用你的递归函数就可以了，而递归函数需要考虑的事情就很多了 ——AJohn</p></blockquote><h1 id="阶乘" tabindex="-1"><a class="header-anchor" href="#阶乘"><span>阶乘</span></a></h1><div class="language-py line-numbers-mode" data-ext="py" data-title="py"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">def</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;"> factorial</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">n</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">):</span></span>
<span class="line"><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">    &quot;&quot;&quot;</span></span>
<span class="line"><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">    返回n的阶乘</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">    &gt;&gt;&gt; </span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">factorial(4)</span></span>
<span class="line"><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">    24</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">    &gt;&gt;&gt; </span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">factorial(5)</span></span>
<span class="line"><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">    120</span></span>
<span class="line"><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">    &quot;&quot;&quot;</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">    if</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> n </span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">==</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 0</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">:</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">        return</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 1</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">    else</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">:</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">        return</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> n </span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">*</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> factorial</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">n</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">-</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;">1</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>调用：<code>factorial(4)</code></p><p>输出：<code>24</code></p><h1 id="斐波那契数列" tabindex="-1"><a class="header-anchor" href="#斐波那契数列"><span>斐波那契数列</span></a></h1><div class="language-py line-numbers-mode" data-ext="py" data-title="py"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">def</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;"> fib</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">n</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">):</span></span>
<span class="line"><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">    &quot;&quot;&quot;</span></span>
<span class="line"><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">    返回第 n 个斐波那契数列的值</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">    &gt;&gt;&gt; </span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">fib(4)</span></span>
<span class="line"><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">    2</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">    &gt;&gt;&gt; </span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">fib(10)</span></span>
<span class="line"><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">    55</span></span>
<span class="line"><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">    &quot;&quot;&quot;</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">    if</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> n </span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">==</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 0</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">:</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">        return</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 0</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">    elif</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> n </span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">==</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 1</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">:</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">        return</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 1</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">    else</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">:</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">        return</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> fib</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">n</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">-</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;">2</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> +</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> fib</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">n</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">-</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;">1</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">def</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;"> pirnt_1_to_fib_n</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">n</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">):</span></span>
<span class="line"><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">    &quot;&quot;&quot;</span></span>
<span class="line"><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">    打印第 1 个到第 n 个斐波那契数列的值，便于检查</span></span>
<span class="line"><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">    &quot;&quot;&quot;</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">    for</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> i </span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">in</span><span style="--shiki-light:#998418;--shiki-dark:#B8A965;"> range</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;">1</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">,</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> n </span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">+</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 1</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">):</span></span>
<span class="line"><span style="--shiki-light:#998418;--shiki-dark:#B8A965;">        print</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">fib</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">i</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">),</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> end</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> =</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;"> &#39;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">,</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;"> if</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> i </span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">&lt;</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> n </span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">else</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;"> &#39;&#39;</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>调用：<code>pirnt_1_to_fib_n(10)</code></p><p>输出：<code>1,1,2,3,5,8,13,21,34,55</code></p><p><strong>PS：上面两个例子太过简单，你可能会对递归产生质疑，因为你用while循环也能轻松做到，但请看接下来的这个例子，你将感受到递归的真正魅力</strong></p><h1 id="汉诺塔" tabindex="-1"><a class="header-anchor" href="#汉诺塔"><span>汉诺塔</span></a></h1><div class="language-py line-numbers-mode" data-ext="py" data-title="py"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">def</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;"> move_disk</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">disk_number</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">,</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> from_peg</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">,</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> to_peg</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">):</span></span>
<span class="line"><span style="--shiki-light:#998418;--shiki-dark:#B8A965;">    print</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">f</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">&quot;Move </span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;">{</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">disk_number</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;">}</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> from </span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;">{</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">from_peg</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;">}</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> to </span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;">{</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">to_peg</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;">}</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">&quot;</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">def</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;"> hanoi</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">n</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">,</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> start_peg</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">,</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> end_peg</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">):</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">    if</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> n </span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">==</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 1</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">:</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">        move_disk</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">n</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">,</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> start_peg</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">,</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> end_peg</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">    else</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">:</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">        spare_peg </span><span style="--shiki-light:#999999;--shiki-dark:#666666;">=</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 6</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> -</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> start_peg </span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">-</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> end_peg </span><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;"># 定义备用桩</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">        hanoi</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">n </span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">-</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 1</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">,</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> start_peg</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">,</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> spare_peg</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;"> # 把上面n-1个片移到备用桩</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">        move_disk</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">n</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">,</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> start_peg</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">,</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> end_peg</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;"> # 把最大的片移到结束桩</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">        hanoi</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">n </span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">-</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 1</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">,</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> spare_peg</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">,</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> end_peg</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;"> # 把n-1个片移到结束桩上</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>调用：<code>hanoi(3,1,2)</code></p><p>输出：</p><div class="language- line-numbers-mode" data-ext="" data-title=""><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>Move 1 from 1 to 2</span></span>
<span class="line"><span>Move 2 from 1 to 3</span></span>
<span class="line"><span>Move 1 from 2 to 3</span></span>
<span class="line"><span>Move 3 from 1 to 2</span></span>
<span class="line"><span>Move 1 from 3 to 1</span></span>
<span class="line"><span>Move 2 from 3 to 2</span></span>
<span class="line"><span>Move 1 from 1 to 2</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>调用：<code>hanoi(5,1,2)</code></p><p>输出：</p><div class="language- line-numbers-mode" data-ext="" data-title=""><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>Move 1 from 1 to 2</span></span>
<span class="line"><span>Move 2 from 1 to 3</span></span>
<span class="line"><span>Move 1 from 2 to 3</span></span>
<span class="line"><span>Move 3 from 1 to 2</span></span>
<span class="line"><span>Move 1 from 3 to 1</span></span>
<span class="line"><span>Move 2 from 3 to 2</span></span>
<span class="line"><span>Move 1 from 1 to 2</span></span>
<span class="line"><span>Move 4 from 1 to 3</span></span>
<span class="line"><span>Move 1 from 2 to 3</span></span>
<span class="line"><span>Move 2 from 2 to 1</span></span>
<span class="line"><span>Move 1 from 3 to 1</span></span>
<span class="line"><span>Move 3 from 2 to 3</span></span>
<span class="line"><span>Move 1 from 1 to 2</span></span>
<span class="line"><span>Move 2 from 1 to 3</span></span>
<span class="line"><span>Move 1 from 2 to 3</span></span>
<span class="line"><span>Move 5 from 1 to 2</span></span>
<span class="line"><span>Move 1 from 3 to 1</span></span>
<span class="line"><span>Move 2 from 3 to 2</span></span>
<span class="line"><span>Move 1 from 1 to 2</span></span>
<span class="line"><span>Move 3 from 3 to 1</span></span>
<span class="line"><span>Move 1 from 2 to 3</span></span>
<span class="line"><span>Move 2 from 2 to 1</span></span>
<span class="line"><span>Move 1 from 3 to 1</span></span>
<span class="line"><span>Move 4 from 3 to 2</span></span>
<span class="line"><span>Move 1 from 1 to 2</span></span>
<span class="line"><span>Move 2 from 1 to 3</span></span>
<span class="line"><span>Move 1 from 2 to 3</span></span>
<span class="line"><span>Move 3 from 1 to 2</span></span>
<span class="line"><span>Move 1 from 3 to 1</span></span>
<span class="line"><span>Move 2 from 3 to 2</span></span>
<span class="line"><span>Move 1 from 1 to 2</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>你让它做什么，它就一定会做到，无论过程如何。 ——Moiads</p></blockquote><p><strong>你只需要无条件地信任并调用你的递归函数就可以了，而递归函数需要考虑的事情就很多了，何乐而不为呢？</strong></p>`,20)]))}const k=i(e,[["render",p],["__file","index.html.vue"]]),d=JSON.parse('{"path":"/cs61a/va2a14f4/","title":"recursion","lang":"zh-CN","frontmatter":{"title":"recursion","tags":["CS61A","Berkeley","Python"],"createTime":"2024/11/12 08:42:59","permalink":"/cs61a/va2a14f4/","description":"你只需要无条件地信任并调用你的递归函数就可以了，而递归函数需要考虑的事情就很多了 ——AJohn 阶乘 调用：factorial(4) 输出：24 斐波那契数列 调用：pirnt_1_to_fib_n(10) 输出：1,1,2,3,5,8,13,21,34,55 PS：上面两个例子太过简单，你可能会对递归产生质疑，因为你用while循环也能轻松做到，但...","head":[["meta",{"property":"og:url","content":"https://ajohn.top/cs61a/va2a14f4/"}],["meta",{"property":"og:site_name","content":"AJohn Blog"}],["meta",{"property":"og:title","content":"recursion"}],["meta",{"property":"og:description","content":"你只需要无条件地信任并调用你的递归函数就可以了，而递归函数需要考虑的事情就很多了 ——AJohn 阶乘 调用：factorial(4) 输出：24 斐波那契数列 调用：pirnt_1_to_fib_n(10) 输出：1,1,2,3,5,8,13,21,34,55 PS：上面两个例子太过简单，你可能会对递归产生质疑，因为你用while循环也能轻松做到，但..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-12-29T11:44:28.000Z"}],["meta",{"property":"article:tag","content":"CS61A"}],["meta",{"property":"article:tag","content":"Berkeley"}],["meta",{"property":"article:tag","content":"Python"}],["meta",{"property":"article:modified_time","content":"2024-12-29T11:44:28.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"recursion\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-12-29T11:44:28.000Z\\",\\"author\\":[]}"]]},"headers":[],"readingTime":{"minutes":2.15,"words":644},"git":{"updatedTime":1735472668000,"contributors":[{"name":"zzyAJohn","email":"1833302139@qq.com","commits":2,"avatar":"https://avatars.githubusercontent.com/zzyAJohn?v=4","url":"https://github.com/zzyAJohn"}]},"autoDesc":true,"filePathRelative":"notes/cs61a/course/recursion.md","bulletin":false}');export{k as comp,d as data};