import{_ as i,o as a,c as n,e as t}from"./app-CAmiM7gQ.js";const h={};function l(k,s){return a(),n("div",null,s[0]||(s[0]=[t(`<p>注：部分题目已整理到<a href="#233-%E6%81%B0%E5%A5%BD%E5%9E%8B%E6%BB%91%E5%8A%A8%E7%AA%97%E5%8F%A3">「2.3.3 恰好型滑动窗口」</a>中。</p><ol><li><p><a href="https://leetcode.cn/problems/number-of-arithmetic-triplets/description/" target="_blank" rel="noopener noreferrer">2367. 等差三元组的数目</a></p><div class="language-py line-numbers-mode" data-ext="py" data-title="py"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">class</span><span style="--shiki-light:#2E8F82;--shiki-dark:#5DA994;"> Solution</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">:</span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">def</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;"> arithmeticTriplets</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">self</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">,</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> nums</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">:</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> List</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">[</span><span style="--shiki-light:#998418;--shiki-dark:#B8A965;">int</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">],</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> diff</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">:</span><span style="--shiki-light:#998418;--shiki-dark:#B8A965;"> int</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> -&gt;</span><span style="--shiki-light:#998418;--shiki-dark:#B8A965;"> int</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">:</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">    res </span><span style="--shiki-light:#999999;--shiki-dark:#666666;">=</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 0</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">    for</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> i </span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">in</span><span style="--shiki-light:#998418;--shiki-dark:#B8A965;"> range</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#998418;--shiki-dark:#B8A965;">len</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">nums</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)):</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">        if</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> nums</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">[</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">i</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">]</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> +</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> diff </span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">in</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> nums </span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">and</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> nums</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">[</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">i</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">]</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> +</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 2</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> *</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> diff </span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">in</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> nums</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">:</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">            res </span><span style="--shiki-light:#999999;--shiki-dark:#666666;">+=</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 1</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">    return</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> res</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>时间复杂度：O(n)</p><p>空间复杂度：O(1)</p></li><li><p><a href="https://leetcode.cn/problems/count-the-number-of-fair-pairs/description/" target="_blank" rel="noopener noreferrer">2563. 统计公平数对的数目</a></p><p><strong>两个指针left和right从后往前找到符合的区间，计算区间元素个数，第三个指针从前往后遍历。</strong></p><div class="language-py line-numbers-mode" data-ext="py" data-title="py"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">class</span><span style="--shiki-light:#2E8F82;--shiki-dark:#5DA994;"> Solution</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">:</span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">def</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;"> countFairPairs</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">self</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">,</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> nums</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">:</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> List</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">[</span><span style="--shiki-light:#998418;--shiki-dark:#B8A965;">int</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">],</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> lower</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">:</span><span style="--shiki-light:#998418;--shiki-dark:#B8A965;"> int</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">,</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> upper</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">:</span><span style="--shiki-light:#998418;--shiki-dark:#B8A965;"> int</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> -&gt;</span><span style="--shiki-light:#998418;--shiki-dark:#B8A965;"> int</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">:</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">    nums</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">sort</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">()</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">    res </span><span style="--shiki-light:#999999;--shiki-dark:#666666;">=</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 0</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">    left </span><span style="--shiki-light:#999999;--shiki-dark:#666666;">=</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> right </span><span style="--shiki-light:#999999;--shiki-dark:#666666;">=</span><span style="--shiki-light:#998418;--shiki-dark:#B8A965;"> len</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">nums</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">    for</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> j</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">,</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> num </span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">in</span><span style="--shiki-light:#998418;--shiki-dark:#B8A965;"> enumerate</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">nums</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">):</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">        while</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> right </span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">and</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> nums</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">[</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">right </span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">-</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 1</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">]</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> &gt;</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> upper </span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">-</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> num</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">:</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">            right </span><span style="--shiki-light:#999999;--shiki-dark:#666666;">-=</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 1</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">        while</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> left </span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">and</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> nums</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">[</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">left </span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">-</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 1</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">]</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> &gt;=</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> lower </span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">-</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> num</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">:</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">            left </span><span style="--shiki-light:#999999;--shiki-dark:#666666;">-=</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 1</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">        res </span><span style="--shiki-light:#999999;--shiki-dark:#666666;">+=</span><span style="--shiki-light:#998418;--shiki-dark:#B8A965;"> min</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">j</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">,</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> right</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> -</span><span style="--shiki-light:#998418;--shiki-dark:#B8A965;"> min</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">j</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">,</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> left</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">    return</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> res</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>时间复杂度：O(nlogn)</p><p>空间复杂度：O(1)</p></li></ol><h2 id="思考" tabindex="-1"><a class="header-anchor" href="#思考"><span>思考</span></a></h2><p><strong>做了一些题目后，请总结：滑动窗口和双指针的区别是什么？</strong></p><div class="hint-container tip"><p class="hint-container-title">提示</p><p><strong>阿囧说：滑动窗口需要维护窗口内的状态，整个窗口内的元素共同构成了正确答案；<br> 双指针更多的是考虑两个具体指针处的状态，指针中间则不考虑，同向双指针和滑动窗口最为接近。</strong></p></div>`,5)]))}const p=i(h,[["render",l],["__file","index.html.vue"]]),r=JSON.parse('{"path":"/leetcode/y8fsz0fr/","title":"1.5 三指针","lang":"zh-CN","frontmatter":{"title":"1.5 三指针","createTime":"2024/11/25 21:36:40","permalink":"/leetcode/y8fsz0fr/","description":"注：部分题目已整理到「2.3.3 恰好型滑动窗口」中。 2367. 等差三元组的数目 时间复杂度：O(n) 空间复杂度：O(1) 2563. 统计公平数对的数目 两个指针left和right从后往前找到符合的区间，计算区间元素个数，第三个指针从前往后遍历。 时间复杂度：O(nlogn) 空间复杂度：O(1) 思考 做了一些题目后，请总结：滑动窗口和双指...","head":[["meta",{"property":"og:url","content":"https://ajohn.top/leetcode/y8fsz0fr/"}],["meta",{"property":"og:site_name","content":"AJohn Blog"}],["meta",{"property":"og:title","content":"1.5 三指针"}],["meta",{"property":"og:description","content":"注：部分题目已整理到「2.3.3 恰好型滑动窗口」中。 2367. 等差三元组的数目 时间复杂度：O(n) 空间复杂度：O(1) 2563. 统计公平数对的数目 两个指针left和right从后往前找到符合的区间，计算区间元素个数，第三个指针从前往后遍历。 时间复杂度：O(nlogn) 空间复杂度：O(1) 思考 做了一些题目后，请总结：滑动窗口和双指..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-12-09T02:34:03.000Z"}],["meta",{"property":"article:modified_time","content":"2024-12-09T02:34:03.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"1.5 三指针\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-12-09T02:34:03.000Z\\",\\"author\\":[]}"]]},"headers":[],"readingTime":{"minutes":1.11,"words":333},"git":{"updatedTime":1733711643000,"contributors":[{"name":"zzyAJohn","email":"1833302139@qq.com","commits":1,"avatar":"https://avatars.githubusercontent.com/zzyAJohn?v=4","url":"https://github.com/zzyAJohn"}]},"autoDesc":true,"filePathRelative":"notes/leetcode/1.sliding-window/5.three-pointers.md","bulletin":false}');export{p as comp,r as data};