import{_ as n,c as a,e,o as i}from"./app-DXjYgPyf.js";const l={};function p(t,s){return i(),a("div",null,[...s[0]||(s[0]=[e(`<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>1.服务器</span></span>
<span class="line"><span>2.宝塔</span></span>
<span class="line"><span>yum install -y wget &amp;&amp; wget -O install.sh http://download.bt.cn/install/install_6.0.sh &amp;&amp; sh install.sh</span></span>
<span class="line"><span>（防火墙放行8888端口）</span></span>
<span class="line"><span></span></span>
<span class="line"><span>去github下载nvm</span></span>
<span class="line"><span>https://blog.csdn.net/weixin_49085046/article/details/125925353</span></span>
<span class="line"><span></span></span>
<span class="line"><span>3.node npm</span></span>
<span class="line"><span>curl --silent --location https://rpm.nodesource.com/setup_lts.x | bash -</span></span>
<span class="line"><span>sudo yum install -y nodejs</span></span>
<span class="line"><span>//sudo yum install -y node</span></span>
<span class="line"><span>4.pnpm</span></span>
<span class="line"><span>npm install -g pnpm</span></span>
<span class="line"><span>npm install -g npm@8.19.2</span></span>
<span class="line"><span>5.安装git</span></span>
<span class="line"><span>yum -y install git</span></span>
<span class="line"><span>6.安装并运行redis</span></span>
<span class="line"><span>yum -y install redis &amp;&amp; redis-server --daemonize yes</span></span>
<span class="line"><span></span></span>
<span class="line"><span>进入Yunzai</span></span>
<span class="line"><span>//到这了</span></span>
<span class="line"><span>7.安装cnpm</span></span>
<span class="line"><span>npm install cnpm -g --registry=https://registry.npm.taobao.org</span></span>
<span class="line"><span></span></span>
<span class="line"><span>8.用cnpm安装，主要安装Puppeteer，下载chrome浏览器</span></span>
<span class="line"><span>cnpm install</span></span>
<span class="line"><span></span></span>
<span class="line"><span>9.安装chrome依赖库</span></span>
<span class="line"><span>yum install pango.x86_64 libXcomposite.x86_64 libXcursor.x86_64 libXdamage.x86_64 libXext.x86_64 libXi.x86_64 libXtst.x86_64 cups-libs.x86_64 libXScrnSaver.x86_64 libXrandr.x86_64 GConf2.x86_64 alsa-lib.x86_64 atk.x86_64 gtk3.x86_64 -y &amp;&amp; yum install libdrm libgbm libxshmfence -y &amp;&amp; yum install nss -y &amp;&amp; yum update nss -y;</span></span>
<span class="line"><span>安装中文字体</span></span>
<span class="line"><span>yum groupinstall fonts -y</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1)])])}const d=n(l,[["render",p]]),r=JSON.parse('{"path":"/article/eodsdqxt/","title":"古早的云崽备忘录","lang":"zh-CN","frontmatter":{"title":"古早的云崽备忘录","createTime":"2025/09/04 20:46:40","permalink":"/article/eodsdqxt/","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"古早的云崽备忘录\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2025-10-28T11:44:01.000Z\\",\\"author\\":[]}"],["meta",{"property":"og:url","content":"https://www.ajohn.top/article/eodsdqxt/"}],["meta",{"property":"og:site_name","content":"AJohn Blog"}],["meta",{"property":"og:title","content":"古早的云崽备忘录"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-10-28T11:44:01.000Z"}],["meta",{"property":"article:modified_time","content":"2025-10-28T11:44:01.000Z"}]]},"readingTime":{"minutes":0.62,"words":185},"git":{"createdTime":1761651841000,"updatedTime":1761651841000,"contributors":[{"name":"zzyAJohn","username":"zzyAJohn","email":"1833302139@qq.com","commits":1,"avatar":"https://avatars.githubusercontent.com/zzyAJohn?v=4","url":"https://github.com/zzyAJohn"}]},"filePathRelative":"blog/云崽/old-sth.md","headers":[],"categoryList":[{"id":"4c2393","sort":10004,"name":"云崽"}]}');export{d as comp,r as data};
