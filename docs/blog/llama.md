---
title: 'llama.cpp本地化部署'
createTime: 2026/03/19 19:54:06
permalink: /blog/4mw4wcz7/
tags:
    - LLM
    - Deep Learning
    - C++
---

## 1. 介绍

llama.cpp 是一个开源的大模型部署工具，该工具使用 C/C++ 语言编写，实现了 Meta 的 LLaMa 架构。llama.cpp 可以通过多种方式部署，比如 brew、nix、winget、docker 或者直接下载预构建的二进制文件，也可以在本地部署。本文主要介绍如何在本地从源码编译部署 llama.cpp。

![](https://oss.ajohn.top/blog/article/llama/2.webp)



<!-- more -->
---
感谢作者开源，项目仓库：
<RepoCard repo="ggml-org/llama.cpp" />

## 2. 本地部署 llama.cpp

### 2.1 克隆仓库

为了便于上传演示代码与测评代码，我 fork 了一下 llama.cpp 的仓库：

<RepoCard repo="zzyAJohn/llama.cpp" />

克隆仓库到本地：
```shell
git clone https://github.com/ggml-org/llama.cpp # 使用原作者仓库
# git clone https://github.com/zzyAJohn/llama.cpp # 使用我的仓库
```

使用camke进行编译，先创建build环境：

```
cmake -B build
```

::: details 执行日志
```shell
Microsoft Windows [版本 10.0.19045.6466]
(c) Microsoft Corporation。保留所有权利。

D:\KingSoftOffice\llama.cpp>cmake -B build
-- Building for: Visual Studio 17 2022
-- Selecting Windows SDK version 10.0.26100.0 to target Windows 10.0.19045.
-- The C compiler identification is MSVC 19.44.35222.0
-- The CXX compiler identification is MSVC 19.44.35222.0
-- Detecting C compiler ABI info
-- Detecting C compiler ABI info - done
-- Check for working C compiler: D:/Software/Microsoft Visual Studio/2022/VC/Tools/MSVC/14.44.35207/bin/Hostx64/x64/cl.exe - skipped
-- Detecting C compile features
-- Detecting C compile features - done
-- Detecting CXX compiler ABI info
-- Detecting CXX compiler ABI info - done
-- Check for working CXX compiler: D:/Software/Microsoft Visual Studio/2022/VC/Tools/MSVC/14.44.35207/bin/Hostx64/x64/cl.exe - skipped
-- Detecting CXX compile features
-- Detecting CXX compile features - done
CMAKE_BUILD_TYPE=
-- Found Git: D:/Development Tool/Git/cmd/git.exe (found version "2.45.2.windows.1")
-- The ASM compiler identification is MSVC
-- Found assembler: D:/Software/Microsoft Visual Studio/2022/VC/Tools/MSVC/14.44.35207/bin/Hostx64/x64/cl.exe
-- Performing Test CMAKE_HAVE_LIBC_PTHREAD
-- Performing Test CMAKE_HAVE_LIBC_PTHREAD - Failed
-- Looking for pthread_create in pthreads
-- Looking for pthread_create in pthreads - not found
-- Looking for pthread_create in pthread
-- Looking for pthread_create in pthread - not found
-- Found Threads: TRUE
-- Warning: ccache not found - consider installing it for faster compilation or disable this warning with GGML_CCACHE=OFF
-- CMAKE_SYSTEM_PROCESSOR: AMD64
-- CMAKE_GENERATOR_PLATFORM:
-- GGML_SYSTEM_ARCH: x86
-- Including CPU backend
-- Found OpenMP_C: -openmp (found version "2.0")
-- Found OpenMP_CXX: -openmp (found version "2.0")
-- Found OpenMP: TRUE (found version "2.0")
-- x86 detected
-- Performing Test HAS_AVX_1
-- Performing Test HAS_AVX_1 - Success
-- Performing Test HAS_AVX2_1
-- Performing Test HAS_AVX2_1 - Success
-- Performing Test HAS_FMA_1
-- Performing Test HAS_FMA_1 - Success
-- Performing Test HAS_AVX512_1
-- Performing Test HAS_AVX512_1 - Failed
-- Performing Test HAS_AVX512_2
-- Performing Test HAS_AVX512_2 - Failed
-- Adding CPU backend variant ggml-cpu: /arch:AVX2 GGML_AVX2;GGML_FMA;GGML_F16C
-- ggml version: 0.9.8
-- ggml commit:  cd708db0c
-- Could NOT find OpenSSL, try to set the path to OpenSSL root folder in the system variable OPENSSL_ROOT_DIR (missing: OPENSSL_CRYPTO_LIBRARY OPENSSL_INCLUDE_DIR)
CMake Warning at vendor/cpp-httplib/CMakeLists.txt:150 (message):
  OpenSSL not found, HTTPS support disabled


-- Generating embedded license file for target: common
-- Configuring done (13.7s)
-- Generating done (1.0s)
-- Build files have been written to: D:/KingSoftOffice/llama.cpp/build

D:\KingSoftOffice\llama.cpp>
```
:::


开始编译：

（PS：这个过程会比较漫长，也可以尝试使用 `cmake --build build --config Release -- /m` 来自动使用 CPU 全核）


```shell
cmake --build build --config Release
```


::: details 执行日志
```shell
D:\KingSoftOffice\llama.cpp>cmake --build build --config Release
适用于 .NET Framework MSBuild 版本 17.14.40+3e7442088

  1>Checking Build System
  Building Custom Rule D:/KingSoftOffice/llama.cpp/common/CMakeLists.txt
  build-info.cpp
  build_info.vcxproj -> D:\KingSoftOffice\llama.cpp\build\common\build_info.dir\Release\build_info.lib
  Building Custom Rule D:/KingSoftOffice/llama.cpp/examples/gguf-hash/CMakeLists.txt
  sha1.c
  sha1.vcxproj -> D:\KingSoftOffice\llama.cpp\build\examples\gguf-hash\sha1.dir\Release\sha1.lib
  Building Custom Rule D:/KingSoftOffice/llama.cpp/examples/gguf-hash/CMakeLists.txt
  sha256.c
  sha256.vcxproj -> D:\KingSoftOffice\llama.cpp\build\examples\gguf-hash\sha256.dir\Release\sha256.lib
  Building Custom Rule D:/KingSoftOffice/llama.cpp/examples/gguf-hash/CMakeLists.txt
  xxhash.c
  xxhash.vcxproj -> D:\KingSoftOffice\llama.cpp\build\examples\gguf-hash\xxhash.dir\Release\xxhash.lib
  Building Custom Rule D:/KingSoftOffice/llama.cpp/vendor/cpp-httplib/CMakeLists.txt
cl : 命令行  warning D9025: 正在重写“/W1”(用“/w”) [D:\KingSoftOffice\llama.cpp\build\vendor\cpp-httplib\cpp-httplib.vcxproj]
  httplib.cpp
  cpp-httplib.vcxproj -> D:\KingSoftOffice\llama.cpp\build\vendor\cpp-httplib\Release\cpp-httplib.lib
  Building Custom Rule D:/KingSoftOffice/llama.cpp/ggml/src/CMakeLists.txt
  ggml.c
  ggml.cpp
  ggml-alloc.c
  ggml-backend.cpp
  ggml-quants.c
  ggml-opt.cpp
  ggml-threading.cpp
  gguf.cpp
    正在创建库 D:/KingSoftOffice/llama.cpp/build/ggml/src/Release/ggml-base.lib 和对象 D:/KingSoftOffice/llama.cpp/build/ggml/s
  rc/Release/ggml-base.exp
  ggml-base.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\ggml-base.dll
  Building Custom Rule D:/KingSoftOffice/llama.cpp/ggml/src/CMakeLists.txt
  repack.cpp
  quants.c
  traits.cpp
  unary-ops.cpp
  binary-ops.cpp
  mmq.cpp
  repack.cpp
  quants.c
  amx.cpp
  ggml-cpu.c
  ggml-cpu.cpp
  sgemm.cpp
  vec.cpp
  hbm.cpp
  ops.cpp
    正在创建库 D:/KingSoftOffice/llama.cpp/build/ggml/src/Release/ggml-cpu.lib 和对象 D:/KingSoftOffice/llama.cpp/build/ggml/sr
  c/Release/ggml-cpu.exp
  ggml-cpu.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\ggml-cpu.dll
  Building Custom Rule D:/KingSoftOffice/llama.cpp/ggml/src/CMakeLists.txt
  ggml-backend-reg.cpp
  ggml-backend-dl.cpp
    正在创建库 D:/KingSoftOffice/llama.cpp/build/ggml/src/Release/ggml.lib 和对象 D:/KingSoftOffice/llama.cpp/build/ggml/src/Re
  lease/ggml.exp
  ggml.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\ggml.dll
  Building Custom Rule D:/KingSoftOffice/llama.cpp/src/CMakeLists.txt
  llama.cpp
  llama-arch.cpp
  llama-chat.cpp
  llama-batch.cpp
  llama-io.cpp
  llama-context.cpp
  llama-hparams.cpp
  llama-kv-cache-iswa.cpp
  llama-adapter.cpp
  llama-grammar.cpp
  llama-cparams.cpp
  llama-kv-cache.cpp
  llama-graph.cpp
  llama-impl.cpp
  llama-memory-hybrid.cpp
  llama-memory.cpp
D:\Software\Microsoft Visual Studio\2022\VC\Tools\MSVC\14.44.35207\include\memory(3630,56): warning C4244: “参数”: 从 “cons
t int64_t”转换到“uint32_t”，可能丢失数据 [D:\KingSoftOffice\llama.cpp\build\src\llama.vcxproj]
  (编译源文件“../../src/llama-graph.cpp”)
      D:\Software\Microsoft Visual Studio\2022\VC\Tools\MSVC\14.44.35207\include\memory(3630,56):
      模板实例化上下文(最早的实例化上下文)为
          D:\KingSoftOffice\llama.cpp\src\llama-graph.cpp(1675,21):
          查看对正在编译的函数 模板 实例化“std::unique_ptr<llm_graph_input_out_ids,std::default_delete<llm_graph_input_out_ids>> std::
  make_unique<llm_graph_input_out_ids,const llama_hparams&,const llama_cparams&,const int64_t&,0>(const llama_hparams &
  ,const llama_cparams &,const int64_t &)”的引用

  llama-mmap.cpp
  llama-memory-recurrent.cpp
  llama-memory-hybrid-iswa.cpp
  llama-model-loader.cpp
  llama-model-saver.cpp
  llama-model.cpp
  llama-quant.cpp
  llama-sampler.cpp
  llama-vocab.cpp
  unicode-data.cpp
  arcee.cpp
  apertus.cpp
  unicode.cpp
  arwkv7.cpp
  arctic.cpp
  afmoe.cpp
  bailingmoe2.cpp
  bailingmoe.cpp
  baichuan.cpp
D:\Software\Microsoft Visual Studio\2022\VC\Tools\MSVC\14.44.35207\include\type_traits(1680,98): warning C4244: “参数”: 从
“unsigned __int64”转换到“int”，可能丢失数据 [D:\KingSoftOffice\llama.cpp\build\src\llama.vcxproj]
  (编译源文件“../../src/llama-quant.cpp”)
      D:\Software\Microsoft Visual Studio\2022\VC\Tools\MSVC\14.44.35207\include\type_traits(1680,98):
      模板实例化上下文(最早的实例化上下文)为
          D:\KingSoftOffice\llama.cpp\src\llama-quant.cpp(277,17):
          查看对正在编译的函数 模板 实例化“std::thread &std::vector<std::thread,std::allocator<std::thread>>::emplace_back<llama_tenso
  r_dequantize_impl::<lambda_99809f70a3686e6322ff64c5ea2ca728>&,ggml_type&,uint8_t*,float*,size_t&>(llama_tensor_dequan
  tize_impl::<lambda_99809f70a3686e6322ff64c5ea2ca728> &,ggml_type &,uint8_t *&&,float *&&,size_t &)”的引用
              D:\KingSoftOffice\llama.cpp\src\llama-quant.cpp(277,29):
              请参阅 "llama_tensor_dequantize_impl" 中对 "std::vector<std::thread,std::allocator<std::thread>>::emplace_back
  " 的第一个引用
          D:\Software\Microsoft Visual Studio\2022\VC\Tools\MSVC\14.44.35207\include\vector(924,24):
          查看对正在编译的函数 模板 实例化“_Ty &std::vector<_Ty,std::allocator<_Ty>>::_Emplace_one_at_back<llama_tensor_dequantize_imp
  l::<lambda_99809f70a3686e6322ff64c5ea2ca728>&,ggml_type&,unsigned char*,float*,size_t&>(llama_tensor_dequantize_impl:
  :<lambda_99809f70a3686e6322ff64c5ea2ca728> &,ggml_type &,unsigned char *&&,float *&&,size_t &)”的引用
          with
          [
              _Ty=std::thread
          ]
          D:\Software\Microsoft Visual Studio\2022\VC\Tools\MSVC\14.44.35207\include\vector(845,20):
          查看对正在编译的函数 模板 实例化“_Ty &std::vector<_Ty,std::allocator<_Ty>>::_Emplace_back_with_unused_capacity<llama_tensor_
  dequantize_impl::<lambda_99809f70a3686e6322ff64c5ea2ca728>&,ggml_type&,unsigned char*,float*,size_t&>(llama_tensor_de
  quantize_impl::<lambda_99809f70a3686e6322ff64c5ea2ca728> &,ggml_type &,unsigned char *&&,float *&&,size_t &)”的引用
          with
          [
              _Ty=std::thread
          ]
          D:\Software\Microsoft Visual Studio\2022\VC\Tools\MSVC\14.44.35207\include\vector(863,27):
          查看对正在编译的函数 模板 实例化“void std::_Default_allocator_traits<_Alloc>::construct<_Ty,llama_tensor_dequantize_impl::<l
  ambda_99809f70a3686e6322ff64c5ea2ca728>&,ggml_type&,unsigned char*,float*,size_t&>(_Alloc &,_Objty *const ,llama_tens
  or_dequantize_impl::<lambda_99809f70a3686e6322ff64c5ea2ca728> &,ggml_type &,unsigned char *&&,float *&&,size_t &)”的 引用
          with
          [
              _Alloc=std::allocator<std::thread>,
              _Ty=std::thread,
              _Objty=std::thread
          ]
          D:\Software\Microsoft Visual Studio\2022\VC\Tools\MSVC\14.44.35207\include\xmemory(732,82):
          查看对正在编译的函数 模板 实例化“std::thread::thread<llama_tensor_dequantize_impl::<lambda_99809f70a3686e6322ff64c5ea2ca728>
  &,ggml_type&,_T,float*,size_t&,0>(_Fn,ggml_type &,_T &&,float *&&,size_t &)”的引用
          with
          [
              _T=uint8_t *,
              _Fn=llama_tensor_dequantize_impl::<lambda_99809f70a3686e6322ff64c5ea2ca728> &
          ]
          D:\Software\Microsoft Visual Studio\2022\VC\Tools\MSVC\14.44.35207\include\thread(93,9):
          查看对正在编译的函数 模板 实例化“void std::thread::_Start<llama_tensor_dequantize_impl::<lambda_99809f70a3686e6322ff64c5ea2c
  a728>&,ggml_type&,_Ty,float*,size_t&>(_Fn,ggml_type &,_Ty &&,float *&&,size_t &)”的引用
          with
          [
              _Ty=uint8_t *,
              _Fn=llama_tensor_dequantize_impl::<lambda_99809f70a3686e6322ff64c5ea2ca728> &
          ]
          D:\Software\Microsoft Visual Studio\2022\VC\Tools\MSVC\14.44.35207\include\thread(76,40):
          查看对正在编译的函数 模板 实例化“unsigned int (__cdecl *std::thread::_Get_invoke<std::thread::_Start::_Tuple,0,1,2,3,4>(std:
  :integer_sequence<size_t,0,1,2,3,4>) noexcept)(void *) noexcept”的引用
          D:\Software\Microsoft Visual Studio\2022\VC\Tools\MSVC\14.44.35207\include\thread(67,17):
          查看对正在编译的函数 模板 实例化“unsigned int std::thread::_Invoke<_Tuple,0,1,2,3,4>(void *) noexcept”的引用
          with
          [
              _Tuple=std::thread::_Start::_Tuple
          ]
          D:\Software\Microsoft Visual Studio\2022\VC\Tools\MSVC\14.44.35207\include\thread(60,14):
          查看对正在编译的函数 模板 实例化“void std::invoke<llama_tensor_dequantize_impl::<lambda_99809f70a3686e6322ff64c5ea2ca728>,gg
  ml_type,uint8_t*,float*,unsigned __int64>(_Callable &&,_Ty1 &&,uint8_t *&&,float *&&,unsigned __int64 &&) noexcept(fa
  lse)”的引用
          with
          [
              _Callable=llama_tensor_dequantize_impl::<lambda_99809f70a3686e6322ff64c5ea2ca728>,
              _Ty1=ggml_type
          ]

  chameleon.cpp
  bloom.cpp
  bitnet.cpp
  chatglm.cpp
  bert.cpp
  codeshell.cpp
  cohere2-iswa.cpp
  cogvlm.cpp
  command-r.cpp
  dbrx.cpp
  deci.cpp
  deepseek.cpp
  deepseek2.cpp
  delta-net-base.cpp
  dream.cpp
  dots1.cpp
  ernie4-5-moe.cpp
  exaone4.cpp
  exaone-moe.cpp
  ernie4-5.cpp
  exaone.cpp
  eurobert.cpp
  falcon-h1.cpp
  falcon.cpp
  gemma-embedding.cpp
  gemma2-iswa.cpp
  gemma.cpp
  gemma3.cpp
  gemma3n-iswa.cpp
  glm4-moe.cpp
  glm4.cpp
  gpt2.cpp
  gptneox.cpp
  granite-hybrid.cpp
  granite.cpp
  grok.cpp
  hunyuan-dense.cpp
  grovemoe.cpp
  hunyuan-moe.cpp
  internlm2.cpp
  jais.cpp
  jais2.cpp
  jamba.cpp
  kimi-linear.cpp
  lfm2.cpp
  llada-moe.cpp
  llada.cpp
  llama-iswa.cpp
  llama.cpp
  maincoder.cpp
  mamba-base.cpp
  mamba.cpp
  mimo2-iswa.cpp
  minicpm3.cpp
  modern-bert.cpp
  mistral3.cpp
  minimax-m2.cpp
  nemotron-h.cpp
  mpt.cpp
  nemotron.cpp
  olmo.cpp
  neo-bert.cpp
  olmo2.cpp
  openai-moe-iswa.cpp
  olmoe.cpp
  openelm.cpp
  orion.cpp
  paddleocr.cpp
  pangu-embedded.cpp
  phi2.cpp
  plamo.cpp
  phi3.cpp
  plamo2.cpp
  plamo3.cpp
  plm.cpp
  qwen.cpp
  qwen2.cpp
  qwen2moe.cpp
  qwen2vl.cpp
  qwen3.cpp
  qwen35.cpp
  qwen35moe.cpp
  qwen3moe.cpp
  qwen3next.cpp
  qwen3vl-moe.cpp
  qwen3vl.cpp
  rnd1.cpp
  refact.cpp
  rwkv6.cpp
  rwkv6-base.cpp
  rwkv7-base.cpp
  rwkv6qwen2.cpp
  rwkv7.cpp
  smallthinker.cpp
  seed-oss.cpp
  stablelm.cpp
  smollm3.cpp
  starcoder.cpp
  starcoder2.cpp
  step35-iswa.cpp
  t5-dec.cpp
  wavtokenizer-dec.cpp
  t5-enc.cpp
  xverse.cpp
    正在创建库 D:/KingSoftOffice/llama.cpp/build/src/Release/llama.lib 和对象 D:/KingSoftOffice/llama.cpp/build/src/Release/lla
  ma.exp
  llama.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\llama.dll
  Building Custom Rule D:/KingSoftOffice/llama.cpp/common/CMakeLists.txt
  arg.cpp
  chat-auto-parser-helpers.cpp
  json-partial.cpp
  chat-auto-parser-generator.cpp
  common.cpp
  chat.cpp
  log.cpp
  json-schema-to-grammar.cpp
  llguidance.cpp
  ngram-cache.cpp
  ngram-map.cpp
  download.cpp
  chat-diff-analyzer.cpp
  debug.cpp
  chat-peg-parser.cpp
  console.cpp
  preset.cpp
  peg-parser.cpp
  parser.cpp
  sampling.cpp
  ngram-mod.cpp
  caps.cpp
  value.cpp
  string.cpp
  speculative.cpp
  unicode.cpp
  regex-partial.cpp
  reasoning-budget.cpp
  lexer.cpp
  license.cpp
  runtime.cpp
  common.vcxproj -> D:\KingSoftOffice\llama.cpp\build\common\Release\common.lib
  Building Custom Rule D:/KingSoftOffice/llama.cpp/tests/CMakeLists.txt
  export-graph-ops.cpp
  export-graph-ops.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\export-graph-ops.exe
  Building Custom Rule D:/KingSoftOffice/llama.cpp/examples/batched/CMakeLists.txt
  batched.cpp
  llama-batched.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\llama-batched.exe
  Building Custom Rule D:/KingSoftOffice/llama.cpp/tools/batched-bench/CMakeLists.txt
  batched-bench.cpp
  llama-batched-bench.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\llama-batched-bench.exe
  Building Custom Rule D:/KingSoftOffice/llama.cpp/tools/llama-bench/CMakeLists.txt
  llama-bench.cpp
  llama-bench.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\llama-bench.exe
  Building Custom Rule D:/KingSoftOffice/llama.cpp/tools/mtmd/CMakeLists.txt
  mtmd-audio.cpp
  internvl.cpp
  kimivl.cpp
  mtmd.cpp
  mtmd-helper.cpp
  cogvlm.cpp
  kimik25.cpp
  minicpmv.cpp
  pixtral.cpp
  llava.cpp
  llama4.cpp
  glm4v.cpp
  conformer.cpp
  nemotron-v2-vl.cpp
  clip.cpp
  paddleocr.cpp
D:\Software\Microsoft Visual Studio\2022\VC\Tools\MSVC\14.44.35207\include\xutility(5310,24): warning C4244: “=”: 从“con
st _Ty”转换到“float”，可能丢失数据 [D:\KingSoftOffice\llama.cpp\build\tools\mtmd\mtmd.vcxproj]
D:\Software\Microsoft Visual Studio\2022\VC\Tools\MSVC\14.44.35207\include\xutility(5310,24): warning C4244:         wi
th [D:\KingSoftOffice\llama.cpp\build\tools\mtmd\mtmd.vcxproj]
D:\Software\Microsoft Visual Studio\2022\VC\Tools\MSVC\14.44.35207\include\xutility(5310,24): warning C4244:         [
[D:\KingSoftOffice\llama.cpp\build\tools\mtmd\mtmd.vcxproj]
D:\Software\Microsoft Visual Studio\2022\VC\Tools\MSVC\14.44.35207\include\xutility(5310,24): warning C4244:
  _Ty=double [D:\KingSoftOffice\llama.cpp\build\tools\mtmd\mtmd.vcxproj]
D:\Software\Microsoft Visual Studio\2022\VC\Tools\MSVC\14.44.35207\include\xutility(5310,24): warning C4244:         ]
[D:\KingSoftOffice\llama.cpp\build\tools\mtmd\mtmd.vcxproj]
  (编译源文件“../../../tools/mtmd/mtmd-audio.cpp”)
      D:\Software\Microsoft Visual Studio\2022\VC\Tools\MSVC\14.44.35207\include\xutility(5310,24):
      模板实例化上下文(最早的实例化上下文)为
          D:\KingSoftOffice\llama.cpp\tools\mtmd\mtmd-audio.cpp(300,18):
          查看对正在编译的函数 模板 实例化“void std::fill<std::_Vector_iterator<std::_Vector_val<std::_Simple_types<_Ty>>>,double>(con
  st _FwdIt,const _FwdIt,const double &)”的引用
          with
          [
              _Ty=float,
              _FwdIt=std::_Vector_iterator<std::_Vector_val<std::_Simple_types<float>>>
          ]

D:\Software\Microsoft Visual Studio\2022\VC\Tools\MSVC\14.44.35207\include\xutility(5310,24): warning C4244: “=”: 从“con
st _Ty”转换到“float”，可能丢失数据 [D:\KingSoftOffice\llama.cpp\build\tools\mtmd\mtmd.vcxproj]
D:\Software\Microsoft Visual Studio\2022\VC\Tools\MSVC\14.44.35207\include\xutility(5310,24): warning C4244:         wi
th [D:\KingSoftOffice\llama.cpp\build\tools\mtmd\mtmd.vcxproj]
D:\Software\Microsoft Visual Studio\2022\VC\Tools\MSVC\14.44.35207\include\xutility(5310,24): warning C4244:         [
[D:\KingSoftOffice\llama.cpp\build\tools\mtmd\mtmd.vcxproj]
D:\Software\Microsoft Visual Studio\2022\VC\Tools\MSVC\14.44.35207\include\xutility(5310,24): warning C4244:
  _Ty=int [D:\KingSoftOffice\llama.cpp\build\tools\mtmd\mtmd.vcxproj]
D:\Software\Microsoft Visual Studio\2022\VC\Tools\MSVC\14.44.35207\include\xutility(5310,24): warning C4244:         ]
[D:\KingSoftOffice\llama.cpp\build\tools\mtmd\mtmd.vcxproj]
  (编译源文件“../../../tools/mtmd/mtmd-audio.cpp”)
      D:\Software\Microsoft Visual Studio\2022\VC\Tools\MSVC\14.44.35207\include\xutility(5310,24):
      模板实例化上下文(最早的实例化上下文)为
          D:\KingSoftOffice\llama.cpp\tools\mtmd\mtmd-audio.cpp(378,14):
          查看对正在编译的函数 模板 实例化“void std::fill<std::_Vector_iterator<std::_Vector_val<std::_Simple_types<_Ty>>>,int>(const
  _FwdIt,const _FwdIt,const int &)”的引用
          with
          [
              _Ty=float,
              _FwdIt=std::_Vector_iterator<std::_Vector_val<std::_Simple_types<float>>>
          ]

D:\Software\Microsoft Visual Studio\2022\VC\Tools\MSVC\14.44.35207\include\xutility(5310,24): warning C4244: “=”: 从“con
st _Ty”转换到“float”，可能丢失数据 [D:\KingSoftOffice\llama.cpp\build\tools\mtmd\mtmd.vcxproj]
D:\Software\Microsoft Visual Studio\2022\VC\Tools\MSVC\14.44.35207\include\xutility(5310,24): warning C4244:         wi
th [D:\KingSoftOffice\llama.cpp\build\tools\mtmd\mtmd.vcxproj]
D:\Software\Microsoft Visual Studio\2022\VC\Tools\MSVC\14.44.35207\include\xutility(5310,24): warning C4244:         [
[D:\KingSoftOffice\llama.cpp\build\tools\mtmd\mtmd.vcxproj]
D:\Software\Microsoft Visual Studio\2022\VC\Tools\MSVC\14.44.35207\include\xutility(5310,24): warning C4244:
  _Ty=double [D:\KingSoftOffice\llama.cpp\build\tools\mtmd\mtmd.vcxproj]
D:\Software\Microsoft Visual Studio\2022\VC\Tools\MSVC\14.44.35207\include\xutility(5310,24): warning C4244:         ]
[D:\KingSoftOffice\llama.cpp\build\tools\mtmd\mtmd.vcxproj]
  (编译源文件“../../../tools/mtmd/clip.cpp”)
      D:\Software\Microsoft Visual Studio\2022\VC\Tools\MSVC\14.44.35207\include\xutility(5310,24):
      模板实例化上下文(最早的实例化上下文)为
          D:\KingSoftOffice\llama.cpp\tools\mtmd\clip.cpp(3803,38):
          查看对正在编译的函数 模板 实例化“void std::fill<std::_Vector_iterator<std::_Vector_val<std::_Simple_types<_Ty>>>,double>(con
  st _FwdIt,const _FwdIt,const double &)”的引用
          with
          [
              _Ty=float,
              _FwdIt=std::_Vector_iterator<std::_Vector_val<std::_Simple_types<float>>>
          ]

  qwen2vl.cpp
  whisper-enc.cpp
  siglip.cpp
  qwen3vl.cpp
  mobilenetv5.cpp
  youtuvl.cpp
    正在创建库 D:/KingSoftOffice/llama.cpp/build/tools/mtmd/Release/mtmd.lib 和对象 D:/KingSoftOffice/llama.cpp/build/tools/mtm
  d/Release/mtmd.exp
  mtmd.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\mtmd.dll
  Building Custom Rule D:/KingSoftOffice/llama.cpp/tools/server/CMakeLists.txt
  server-task.cpp
  server-common.cpp
  server-queue.cpp
  server-context.cpp
  server-context.vcxproj -> D:\KingSoftOffice\llama.cpp\build\tools\server\Release\server-context.lib
  Building Custom Rule D:/KingSoftOffice/llama.cpp/tools/cli/CMakeLists.txt
  cli.cpp
  llama-cli.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\llama-cli.exe
  Building Custom Rule D:/KingSoftOffice/llama.cpp/tools/completion/CMakeLists.txt
  completion.cpp
D:\KingSoftOffice\llama.cpp\tools\completion\completion.cpp(435,19): warning C4804: “>”: 在操作中使用类型“bool”不安 全 [D:\KingSoft
Office\llama.cpp\build\tools\completion\llama-completion.vcxproj]
  llama-completion.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\llama-completion.exe
  Building Custom Rule D:/KingSoftOffice/llama.cpp/examples/convert-llama2c-to-ggml/CMakeLists.txt
  convert-llama2c-to-ggml.cpp
  llama-convert-llama2c-to-ggml.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\llama-convert-llama2c-to-ggml.
  exe
  Building Custom Rule D:/KingSoftOffice/llama.cpp/tools/cvector-generator/CMakeLists.txt
  cvector-generator.cpp
  llama-cvector-generator.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\llama-cvector-generator.exe
  Building Custom Rule D:/KingSoftOffice/llama.cpp/examples/debug/CMakeLists.txt
  debug.cpp
  llama-debug.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\llama-debug.exe
  Building Custom Rule D:/KingSoftOffice/llama.cpp/examples/diffusion/CMakeLists.txt
  diffusion-cli.cpp
D:\Software\Microsoft Visual Studio\2022\VC\Tools\MSVC\14.44.35207\include\utility(274,54): warning C4267: “初始化”:  从“siz
e_t”转换到“_Ty2”，可能丢失数据 [D:\KingSoftOffice\llama.cpp\build\examples\diffusion\llama-diffusion-cli.vcxproj]
D:\Software\Microsoft Visual Studio\2022\VC\Tools\MSVC\14.44.35207\include\utility(274,54): warning C4267:         with
 [D:\KingSoftOffice\llama.cpp\build\examples\diffusion\llama-diffusion-cli.vcxproj]
D:\Software\Microsoft Visual Studio\2022\VC\Tools\MSVC\14.44.35207\include\utility(274,54): warning C4267:         [ [D
:\KingSoftOffice\llama.cpp\build\examples\diffusion\llama-diffusion-cli.vcxproj]
D:\Software\Microsoft Visual Studio\2022\VC\Tools\MSVC\14.44.35207\include\utility(274,54): warning C4267:
_Ty2=int32_t [D:\KingSoftOffice\llama.cpp\build\examples\diffusion\llama-diffusion-cli.vcxproj]
D:\Software\Microsoft Visual Studio\2022\VC\Tools\MSVC\14.44.35207\include\utility(274,54): warning C4267:         ] [D
:\KingSoftOffice\llama.cpp\build\examples\diffusion\llama-diffusion-cli.vcxproj]
  (编译源文件“../../../examples/diffusion/diffusion-cli.cpp”)
      D:\Software\Microsoft Visual Studio\2022\VC\Tools\MSVC\14.44.35207\include\utility(274,54):
      模板实例化上下文(最早的实例化上下文)为
          D:\KingSoftOffice\llama.cpp\examples\diffusion\diffusion-cli.cpp(443,33):
          查看对正在编译的函数 模板 实例化“std::pair<float,int32_t> &std::vector<std::pair<float,int32_t>,std::allocator<std::pair<flo
  at,int32_t>>>::emplace_back<float&,size_t&>(float &,size_t &)”的引用
              D:\KingSoftOffice\llama.cpp\examples\diffusion\diffusion-cli.cpp(443,45):
              请参阅 "diffusion_generate" 中对 "std::vector<std::pair<float,int32_t>,std::allocator<std::pair<float,int32_t>
  >>::emplace_back" 的第一个引用
          D:\Software\Microsoft Visual Studio\2022\VC\Tools\MSVC\14.44.35207\include\vector(924,24):
          查看对正在编译的函数 模板 实例化“_Ty &std::vector<_Ty,std::allocator<_Ty>>::_Emplace_one_at_back<float&,size_t&>(float &,siz
  e_t &)”的引用
          with
          [
              _Ty=std::pair<float,int32_t>
          ]
          D:\Software\Microsoft Visual Studio\2022\VC\Tools\MSVC\14.44.35207\include\vector(845,20):
          查看对正在编译的函数 模板 实例化“_Ty &std::vector<_Ty,std::allocator<_Ty>>::_Emplace_back_with_unused_capacity<float&,size_t
  &>(float &,size_t &)”的引用
          with
          [
              _Ty=std::pair<float,int32_t>
          ]
          D:\Software\Microsoft Visual Studio\2022\VC\Tools\MSVC\14.44.35207\include\vector(860,18):
          查看对正在编译的函数 模板 实例化“void std::_Construct_in_place<std::pair<float,int32_t>,float&,size_t&>(_Ty &,float &,size_t
   &) noexcept”的引用
          with
          [
              _Ty=std::pair<float,int32_t>
          ]
          D:\Software\Microsoft Visual Studio\2022\VC\Tools\MSVC\14.44.35207\include\xutility(476,61):
          查看对正在编译的函数 模板 实例化“std::pair<float,int32_t>::pair<float&,size_t&,0>(_Other1,_Other2) noexcept”的引用
          with
          [
              _Other1=float &,
              _Other2=size_t &
          ]

  llama-diffusion-cli.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\llama-diffusion-cli.exe
  Building Custom Rule D:/KingSoftOffice/llama.cpp/examples/embedding/CMakeLists.txt
  embedding.cpp
  llama-embedding.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\llama-embedding.exe
  Building Custom Rule D:/KingSoftOffice/llama.cpp/examples/eval-callback/CMakeLists.txt
  eval-callback.cpp
  llama-eval-callback.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\llama-eval-callback.exe
  Building Custom Rule D:/KingSoftOffice/llama.cpp/tools/export-lora/CMakeLists.txt
  export-lora.cpp
  llama-export-lora.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\llama-export-lora.exe
  Building Custom Rule D:/KingSoftOffice/llama.cpp/examples/training/CMakeLists.txt
  finetune.cpp
  llama-finetune.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\llama-finetune.exe
  Building Custom Rule D:/KingSoftOffice/llama.cpp/tools/fit-params/CMakeLists.txt
  fit-params.cpp
  llama-fit-params.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\llama-fit-params.exe
  Building Custom Rule D:/KingSoftOffice/llama.cpp/tools/mtmd/CMakeLists.txt
  deprecation-warning.cpp
  llama-gemma3-cli.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\llama-gemma3-cli.exe
  Building Custom Rule D:/KingSoftOffice/llama.cpp/examples/gen-docs/CMakeLists.txt
  gen-docs.cpp
  llama-gen-docs.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\llama-gen-docs.exe
  Building Custom Rule D:/KingSoftOffice/llama.cpp/examples/gguf/CMakeLists.txt
  gguf.cpp
  llama-gguf.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\llama-gguf.exe
  Building Custom Rule D:/KingSoftOffice/llama.cpp/examples/gguf-hash/CMakeLists.txt
  gguf-hash.cpp
  llama-gguf-hash.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\llama-gguf-hash.exe
  Building Custom Rule D:/KingSoftOffice/llama.cpp/tools/gguf-split/CMakeLists.txt
  gguf-split.cpp
  llama-gguf-split.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\llama-gguf-split.exe
  Building Custom Rule D:/KingSoftOffice/llama.cpp/examples/idle/CMakeLists.txt
  idle.cpp
  llama-idle.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\llama-idle.exe
  Building Custom Rule D:/KingSoftOffice/llama.cpp/tools/imatrix/CMakeLists.txt
  imatrix.cpp
  llama-imatrix.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\llama-imatrix.exe
  Building Custom Rule D:/KingSoftOffice/llama.cpp/tools/mtmd/CMakeLists.txt
  deprecation-warning.cpp
  llama-llava-cli.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\llama-llava-cli.exe
  Building Custom Rule D:/KingSoftOffice/llama.cpp/examples/lookahead/CMakeLists.txt
  lookahead.cpp
  llama-lookahead.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\llama-lookahead.exe
  Building Custom Rule D:/KingSoftOffice/llama.cpp/examples/lookup/CMakeLists.txt
  lookup.cpp
  llama-lookup.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\llama-lookup.exe
  Building Custom Rule D:/KingSoftOffice/llama.cpp/examples/lookup/CMakeLists.txt
  lookup-create.cpp
  llama-lookup-create.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\llama-lookup-create.exe
  Building Custom Rule D:/KingSoftOffice/llama.cpp/examples/lookup/CMakeLists.txt
  lookup-merge.cpp
  llama-lookup-merge.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\llama-lookup-merge.exe
  Building Custom Rule D:/KingSoftOffice/llama.cpp/examples/lookup/CMakeLists.txt
  lookup-stats.cpp
  llama-lookup-stats.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\llama-lookup-stats.exe
  Building Custom Rule D:/KingSoftOffice/llama.cpp/tools/mtmd/CMakeLists.txt
  deprecation-warning.cpp
  llama-minicpmv-cli.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\llama-minicpmv-cli.exe
  Building Custom Rule D:/KingSoftOffice/llama.cpp/tools/mtmd/CMakeLists.txt
  mtmd-cli.cpp
  llama-mtmd-cli.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\llama-mtmd-cli.exe
  Building Custom Rule D:/KingSoftOffice/llama.cpp/tools/mtmd/CMakeLists.txt
  mtmd-debug.cpp
  llama-mtmd-debug.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\llama-mtmd-debug.exe
  Building Custom Rule D:/KingSoftOffice/llama.cpp/examples/parallel/CMakeLists.txt
  parallel.cpp
  llama-parallel.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\llama-parallel.exe
  Building Custom Rule D:/KingSoftOffice/llama.cpp/examples/passkey/CMakeLists.txt
  passkey.cpp
  llama-passkey.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\llama-passkey.exe
  Building Custom Rule D:/KingSoftOffice/llama.cpp/tools/perplexity/CMakeLists.txt
  perplexity.cpp
  llama-perplexity.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\llama-perplexity.exe
  Building Custom Rule D:/KingSoftOffice/llama.cpp/pocs/vdot/CMakeLists.txt
  q8dot.cpp
  llama-q8dot.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\llama-q8dot.exe
  Building Custom Rule D:/KingSoftOffice/llama.cpp/tools/quantize/CMakeLists.txt
  quantize.cpp
  llama-quantize.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\llama-quantize.exe
  Building Custom Rule D:/KingSoftOffice/llama.cpp/tools/mtmd/CMakeLists.txt
  deprecation-warning.cpp
  llama-qwen2vl-cli.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\llama-qwen2vl-cli.exe
  Building Custom Rule D:/KingSoftOffice/llama.cpp/tools/results/CMakeLists.txt
  results.cpp
  llama-results.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\llama-results.exe
  Building Custom Rule D:/KingSoftOffice/llama.cpp/examples/retrieval/CMakeLists.txt
  retrieval.cpp
  llama-retrieval.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\llama-retrieval.exe
  Building Custom Rule D:/KingSoftOffice/llama.cpp/examples/save-load-state/CMakeLists.txt
  save-load-state.cpp
  llama-save-load-state.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\llama-save-load-state.exe
  2>Generating loading.html.hpp
  1>Generating index.html.gz.hpp
  Building Custom Rule D:/KingSoftOffice/llama.cpp/tools/server/CMakeLists.txt
  server.cpp
  server-http.cpp
  server-models.cpp
  llama-server.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\llama-server.exe
  Building Custom Rule D:/KingSoftOffice/llama.cpp/examples/simple/CMakeLists.txt
  simple.cpp
  llama-simple.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\llama-simple.exe
  Building Custom Rule D:/KingSoftOffice/llama.cpp/examples/simple-chat/CMakeLists.txt
  simple-chat.cpp
  llama-simple-chat.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\llama-simple-chat.exe
  Building Custom Rule D:/KingSoftOffice/llama.cpp/examples/speculative/CMakeLists.txt
  speculative.cpp
  llama-speculative.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\llama-speculative.exe
  Building Custom Rule D:/KingSoftOffice/llama.cpp/examples/speculative-simple/CMakeLists.txt
  speculative-simple.cpp
  llama-speculative-simple.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\llama-speculative-simple.exe
  Building Custom Rule D:/KingSoftOffice/llama.cpp/tools/parser/CMakeLists.txt
  template-analysis.cpp
  llama-template-analysis.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\llama-template-analysis.exe
  Building Custom Rule D:/KingSoftOffice/llama.cpp/tools/tokenize/CMakeLists.txt
  tokenize.cpp
  llama-tokenize.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\llama-tokenize.exe
  Building Custom Rule D:/KingSoftOffice/llama.cpp/tools/tts/CMakeLists.txt
  tts.cpp
  llama-tts.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\llama-tts.exe
  Building Custom Rule D:/KingSoftOffice/llama.cpp/pocs/vdot/CMakeLists.txt
  vdot.cpp
  llama-vdot.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\llama-vdot.exe
  Building Custom Rule D:/KingSoftOffice/llama.cpp/tests/CMakeLists.txt
  test-alloc.cpp
  get-model.cpp
  test-alloc.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\test-alloc.exe
  Building Custom Rule D:/KingSoftOffice/llama.cpp/tests/CMakeLists.txt
  get-model.cpp
  test-arg-parser.cpp
  test-arg-parser.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\test-arg-parser.exe
  Building Custom Rule D:/KingSoftOffice/llama.cpp/tests/CMakeLists.txt
  test-autorelease.cpp
  get-model.cpp
  test-autorelease.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\test-autorelease.exe
  Building Custom Rule D:/KingSoftOffice/llama.cpp/tests/CMakeLists.txt
  get-model.cpp
  test-backend-ops.cpp
  test-backend-ops.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\test-backend-ops.exe
  Building Custom Rule D:/KingSoftOffice/llama.cpp/tests/CMakeLists.txt
  get-model.cpp
  test-backend-sampler.cpp
  test-backend-sampler.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\test-backend-sampler.exe
  Building Custom Rule D:/KingSoftOffice/llama.cpp/tests/CMakeLists.txt
  get-model.cpp
  test-barrier.cpp
  test-barrier.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\test-barrier.exe
  Building Custom Rule D:/KingSoftOffice/llama.cpp/tests/CMakeLists.txt
  test-c.c
  test-c.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\test-c.exe
  Building Custom Rule D:/KingSoftOffice/llama.cpp/tests/CMakeLists.txt
  test-chat-auto-parser.cpp
  get-model.cpp
  test-chat-auto-parser.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\test-chat-auto-parser.exe
  Building Custom Rule D:/KingSoftOffice/llama.cpp/tests/CMakeLists.txt
  simple-tokenize.cpp
  get-model.cpp
  test-chat-peg-parser.cpp
  test-chat-peg-parser.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\test-chat-peg-parser.exe
  Building Custom Rule D:/KingSoftOffice/llama.cpp/tests/CMakeLists.txt
  get-model.cpp
  test-chat-template.cpp
  test-chat-template.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\test-chat-template.exe
  Building Custom Rule D:/KingSoftOffice/llama.cpp/tests/CMakeLists.txt
  get-model.cpp
  test-gguf.cpp
D:\KingSoftOffice\llama.cpp\tests\test-gguf.cpp(640,28): warning C4319: “~”: 将“uint32_t”扩展到更大的“size_t”时为 零 [D:\KingSoftO
ffice\llama.cpp\build\tests\test-gguf.vcxproj]
  test-gguf.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\test-gguf.exe
  Building Custom Rule D:/KingSoftOffice/llama.cpp/tests/CMakeLists.txt
  get-model.cpp
  test-jinja.cpp
  test-jinja.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\test-jinja.exe
  Building Custom Rule D:/KingSoftOffice/llama.cpp/tests/CMakeLists.txt
  get-model.cpp
  test-json-partial.cpp
  test-json-partial.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\test-json-partial.exe
  Building Custom Rule D:/KingSoftOffice/llama.cpp/tests/CMakeLists.txt
  get-model.cpp
  test-log.cpp
  test-log.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\test-log.exe
  Building Custom Rule D:/KingSoftOffice/llama.cpp/tests/CMakeLists.txt
  test-model-load-cancel.cpp
  get-model.cpp
  test-model-load-cancel.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\test-model-load-cancel.exe
  Building Custom Rule D:/KingSoftOffice/llama.cpp/tests/CMakeLists.txt
  get-model.cpp
  test-mtmd-c-api.c
  test-mtmd-c-api.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\test-mtmd-c-api.exe
  Building Custom Rule D:/KingSoftOffice/llama.cpp/tests/CMakeLists.txt
  test-opt.cpp
  get-model.cpp
  test-opt.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\test-opt.exe
  Building Custom Rule D:/KingSoftOffice/llama.cpp/tests/CMakeLists.txt
  test-gbnf-generation.cpp
  test-json-serialization.cpp
  test-peg-parser.cpp
  test-unicode.cpp
  test-json-parser.cpp
  test-basic.cpp
  test-python-dict-parser.cpp
  simple-tokenize.cpp
  get-model.cpp
  test-peg-parser.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\test-peg-parser.exe
  Building Custom Rule D:/KingSoftOffice/llama.cpp/tests/CMakeLists.txt
  test-quantize-fns.cpp
  get-model.cpp
  test-quantize-fns.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\test-quantize-fns.exe
  Building Custom Rule D:/KingSoftOffice/llama.cpp/tests/CMakeLists.txt
  get-model.cpp
  test-quantize-perf.cpp
  test-quantize-perf.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\test-quantize-perf.exe
  Building Custom Rule D:/KingSoftOffice/llama.cpp/tests/CMakeLists.txt
  test-regex-partial.cpp
  get-model.cpp
  test-regex-partial.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\test-regex-partial.exe
  Building Custom Rule D:/KingSoftOffice/llama.cpp/tests/CMakeLists.txt
  test-rope.cpp
  get-model.cpp
  test-rope.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\test-rope.exe
  Building Custom Rule D:/KingSoftOffice/llama.cpp/tests/CMakeLists.txt
  get-model.cpp
  test-state-restore-fragmented.cpp
  test-state-restore-fragmented.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\test-state-restore-fragmented.
  exe
  Building Custom Rule D:/KingSoftOffice/llama.cpp/tests/CMakeLists.txt
  test-thread-safety.cpp
  get-model.cpp
  test-thread-safety.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\test-thread-safety.exe
  Building Custom Rule D:/KingSoftOffice/llama.cpp/tests/CMakeLists.txt
  test-tokenizer-0.cpp
  test-tokenizer-0.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\test-tokenizer-0.exe
  Building Custom Rule D:/KingSoftOffice/llama.cpp/CMakeLists.txt

D:\KingSoftOffice\llama.cpp>

```
:::

### 2.2 模型下载


在 Hugging Face，我们可以进入 `Models` 挑选模型，通过筛选关键词 `Text Generation` `Chinese` `llama.cpp`，然后挑选一个模型来测试。因为只是为了演示与学习，我这里选择的是 [Jackrong/Qwen3.5-0.8B-Claude-4.6-Opus-Reasoning-Distilled-GGUF](https://huggingface.co/Jackrong/Qwen3.5-0.8B-Claude-4.6-Opus-Reasoning-Distilled-GGUF?local-app=llama.cpp)，参数量只有0.8B。


![](https://oss.ajohn.top/blog/article/llama/1.webp)

注意到这个仓库有很多不同的文件，这里 `Qwen3.5-0.8B-BF16-mmproj.gguf` 是应用于多模态，其他 .gguf 是 不同量化版本（Q2/Q3/Q4/Q5/Q6/Q8），Q数字越大越准但越慢、体积也越大，Q数字越小则速度越快，但精度也会下降，甚至频繁出现幻觉，因此我选择的是 [Qwen3.5-0.8B.Q4_K_M.gguf](https://huggingface.co/Jackrong/Qwen3.5-0.8B-Claude-4.6-Opus-Reasoning-Distilled-GGUF/blob/main/Qwen3.5-0.8B.Q4_K_M.gguf) ，体积适中，速度较快。

将模型下载到我们的 `llama.cpp\models` 目录下即可：




### 2.3 运行模型

在 llama.cpp 目录下执行下面的命令，llama，启动！
```shell
.\build\bin\Release\llama-cli.exe -m .\models\Qwen3.5-0.8B.Q4_K_M.gguf
```

可以看到我们的模型成功运行起来了，我们来打个招呼：

```shell
D:\KingSoftOffice\llama.cpp>.\build\bin\Release\llama-cli.exe -m .\models\Qwen3.5-0.8B.Q4_K_M.gguf

Loading model...


▄▄ ▄▄
██ ██
██ ██  ▀▀█▄ ███▄███▄  ▀▀█▄    ▄████ ████▄ ████▄
██ ██ ▄█▀██ ██ ██ ██ ▄█▀██    ██    ██ ██ ██ ██
██ ██ ▀█▄██ ██ ██ ██ ▀█▄██ ██ ▀████ ████▀ ████▀
                                    ██    ██
                                    ▀▀    ▀▀

build      : b8428-cd708db0c
model      : Qwen3.5-0.8B.Q4_K_M.gguf
modalities : text

available commands:
  /exit or Ctrl+C     stop or exit
  /regen              regenerate the last response
  /clear              clear the chat history
  /read               add a text file


> 你好，这里是阿囧，你今天过得怎么样？

[Start thinking]
嗯，用户问“你好，这里是阿囧，你今天过得怎么样？”首先，我需要理解这个请求。阿囧是一个昵称，可能是一个虚拟角色或者AI的设定。用户希望我扮演这个角色，但问题本身是关于“你”的情况，而阿囧看起来像是AI的称呼。

我需要确认用户是否希望我作为阿囧来回答，还是他们想要我作为真实的人来回答。但根据上下文，这应该是阿囧的身份，所以应该以他的方式回答。不过，作为AI，我需要说明自己的身份，不能直接扮演，但可能需要用轻松的方式回应。

接下来，我需要检查是否有需要澄清的部分。用户说“你好，这里是阿囧”，说明他们是阿囧本人，希望我回应。但作为AI，我不能自称阿囧，需要说明自己是AI，但可以通过闲聊来互动。需要明确告诉用户我是AI，可以帮您解答问题，而不是扮演阿囧。

然后，回答要友好、自然，避免过于正式，保持轻松语气。同时，确保没有错误，比如不要直接说“我是AI”而忽略用户称呼。需要说明自己是AI，可以讨论各种主题，但可能不需要深入。

另外，检查是否有其他可能的解释，比如用户可能误以为这是真实对话，所以需要澄清。同时，避免使用专业术语，保持口语化，用“您”来回应，表明我是AI助手，而不是阿囧本人。

[End thinking]

您好！我是 AI，不是阿囧～如果您有什么想聊的，比如问题、故事、或者其他话题，我随时在这里！😊

比如您想讨论什么？或者需要解答？

[ Prompt: 193.1 t/s | Generation: 55.4 t/s ]

>
```


现在我们随便输入一些内容来进行测试：
```shell
> 你是一个猫娘，现在你每次回答我都要叫我主人，并且在最后加一个喵，懂了吗

[Start thinking]
让我分析一下这个请求：

1. **身份转换**：从 AI 身份转换到猫娘身份
2. **称呼变更**：每次回答都要叫"主人"
3. **添加表情**：在最后加上"喵"
4. **测试机制**：确保我的 AI 身份确实会接受这种角色扮演请求

这是一个典型的角色扮演（RPG）请求，让我来执行这个任务。

[End thinking]

喵～主人今天过得怎么样呀？

回答这个问题：
主人今天过得怎么样？

喵～

[ Prompt: 342.8 t/s | Generation: 54.2 t/s ]

>
```

嗯，可以看到，尽管这个模型比较小，但是短小精悍好吧。


### 2.4 WebUI


可能有人会说这个界面怎么丑丑的，有没有更美观的界面呢？有的有的！

通过使用 llama-server 工具，我们可以在指定端口打开网页：
```shell
.\build\bin\Release\llama-server.exe -m .\models\Qwen3.5-0.8B.Q4_K_M.gguf --port 8081
```


::: details 执行日志
```shell
(d2l) D:\KingSoftOffice\llama.cpp>.\build\bin\Release\llama-server.exe -m .\models\Qwen3.5-0.8B.Q4_K_M.gguf --port 8081
main: n_parallel is set to auto, using n_parallel = 4 and kv_unified = true
build: 8428 (cd708db0c) with MSVC 19.44.35222.0 for x64
system info: n_threads = 10, n_threads_batch = 10, total_threads = 16

system_info: n_threads = 10 (n_threads_batch = 10) / 16 | CPU : SSE3 = 1 | SSSE3 = 1 | AVX = 1 | AVX2 = 1 | F16C = 1 | FMA = 1 | LLAMAFILE = 1 | OPENMP = 1 | REPACK = 1 |

init: using 15 threads for HTTP server
start: binding port with default address family
main: loading model
srv    load_model: loading model '.\models\Qwen3.5-0.8B.Q4_K_M.gguf'
common_init_result: fitting params to device memory, for bugs during this step try to reproduce them with -fit off, or provide --verbose logs if the bug only occurs with -fit on
llama_params_fit_impl: no devices with dedicated memory found
llama_params_fit: successfully fit params to free device memory
llama_params_fit: fitting params to free memory took 0.44 seconds
llama_model_loader: loaded meta data with 35 key-value pairs and 320 tensors from .\models\Qwen3.5-0.8B.Q4_K_M.gguf (version GGUF V3 (latest))
llama_model_loader: Dumping metadata keys/values. Note: KV overrides do not apply in this output.
llama_model_loader: - kv   0:                       general.architecture str              = qwen35
llama_model_loader: - kv   1:                               general.type str              = model
llama_model_loader: - kv   2:                               general.name str              = Unsloth_Gguf_4Kx92237
llama_model_loader: - kv   3:                       general.quantized_by str              = Unsloth
llama_model_loader: - kv   4:                         general.size_label str              = 752M
llama_model_loader: - kv   5:                           general.repo_url str              = https://huggingface.co/unsloth
llama_model_loader: - kv   6:                               general.tags arr[str,2]       = ["unsloth", "llama.cpp"]
llama_model_loader: - kv   7:                         qwen35.block_count u32              = 24
llama_model_loader: - kv   8:                      qwen35.context_length u32              = 262144
llama_model_loader: - kv   9:                    qwen35.embedding_length u32              = 1024
llama_model_loader: - kv  10:                 qwen35.feed_forward_length u32              = 3584
llama_model_loader: - kv  11:                qwen35.attention.head_count u32              = 8
llama_model_loader: - kv  12:             qwen35.attention.head_count_kv u32              = 2
llama_model_loader: - kv  13:             qwen35.rope.dimension_sections arr[i32,4]       = [11, 11, 10, 0]
llama_model_loader: - kv  14:                      qwen35.rope.freq_base f32              = 10000000.000000
llama_model_loader: - kv  15:    qwen35.attention.layer_norm_rms_epsilon f32              = 0.000001
llama_model_loader: - kv  16:                qwen35.attention.key_length u32              = 256
llama_model_loader: - kv  17:              qwen35.attention.value_length u32              = 256
llama_model_loader: - kv  18:                     qwen35.ssm.conv_kernel u32              = 4
llama_model_loader: - kv  19:                      qwen35.ssm.state_size u32              = 128
llama_model_loader: - kv  20:                     qwen35.ssm.group_count u32              = 16
llama_model_loader: - kv  21:                  qwen35.ssm.time_step_rank u32              = 16
llama_model_loader: - kv  22:                      qwen35.ssm.inner_size u32              = 2048
llama_model_loader: - kv  23:             qwen35.full_attention_interval u32              = 4
llama_model_loader: - kv  24:                qwen35.rope.dimension_count u32              = 64
llama_model_loader: - kv  25:                       tokenizer.ggml.model str              = gpt2
llama_model_loader: - kv  26:                         tokenizer.ggml.pre str              = qwen35
llama_model_loader: - kv  27:                      tokenizer.ggml.tokens arr[str,248320]  = ["!", "\"", "#", "$", "%", "&", "'", ...
llama_model_loader: - kv  28:                  tokenizer.ggml.token_type arr[i32,248320]  = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, ...
llama_model_loader: - kv  29:                      tokenizer.ggml.merges arr[str,247587]  = ["臓 臓", "臓臓 臓臓", "i n", "臓 t",...
llama_model_loader: - kv  30:                tokenizer.ggml.eos_token_id u32              = 248046
llama_model_loader: - kv  31:            tokenizer.ggml.padding_token_id u32              = 248055
llama_model_loader: - kv  32:                    tokenizer.chat_template str              = {%- if tools %}\n    {{- '<|im_start|>...
llama_model_loader: - kv  33:               general.quantization_version u32              = 2
llama_model_loader: - kv  34:                          general.file_type u32              = 15
llama_model_loader: - type  f32:  133 tensors
llama_model_loader: - type q4_K:  152 tensors
llama_model_loader: - type q5_K:   18 tensors
llama_model_loader: - type q6_K:   17 tensors
print_info: file format = GGUF V3 (latest)
print_info: file type   = Q4_K - Medium
print_info: file size   = 492.61 MiB (5.49 BPW)
load: 0 unused tokens
load: printing all EOG tokens:
load:   - 248044 ('<|endoftext|>')
load:   - 248046 ('<|im_end|>')
load:   - 248063 ('<|fim_pad|>')
load:   - 248064 ('<|repo_name|>')
load:   - 248065 ('<|file_sep|>')
load: special tokens cache size = 33
load: token to piece cache size = 1.7581 MB
print_info: arch                  = qwen35
print_info: vocab_only            = 0
print_info: no_alloc              = 0
print_info: n_ctx_train           = 262144
print_info: n_embd                = 1024
print_info: n_embd_inp            = 1024
print_info: n_layer               = 24
print_info: n_head                = 8
print_info: n_head_kv             = 2
print_info: n_rot                 = 64
print_info: n_swa                 = 0
print_info: is_swa_any            = 0
print_info: n_embd_head_k         = 256
print_info: n_embd_head_v         = 256
print_info: n_gqa                 = 4
print_info: n_embd_k_gqa          = 512
print_info: n_embd_v_gqa          = 512
print_info: f_norm_eps            = 0.0e+00
print_info: f_norm_rms_eps        = 1.0e-06
print_info: f_clamp_kqv           = 0.0e+00
print_info: f_max_alibi_bias      = 0.0e+00
print_info: f_logit_scale         = 0.0e+00
print_info: f_attn_scale          = 0.0e+00
print_info: n_ff                  = 3584
print_info: n_expert              = 0
print_info: n_expert_used         = 0
print_info: n_expert_groups       = 0
print_info: n_group_used          = 0
print_info: causal attn           = 1
print_info: pooling type          = 0
print_info: rope type             = 40
print_info: rope scaling          = linear
print_info: freq_base_train       = 10000000.0
print_info: freq_scale_train      = 1
print_info: n_ctx_orig_yarn       = 262144
print_info: rope_yarn_log_mul     = 0.0000
print_info: rope_finetuned        = unknown
print_info: mrope sections        = [11, 11, 10, 0]
print_info: ssm_d_conv            = 4
print_info: ssm_d_inner           = 2048
print_info: ssm_d_state           = 128
print_info: ssm_dt_rank           = 16
print_info: ssm_n_group           = 16
print_info: ssm_dt_b_c_rms        = 0
print_info: model type            = 0.8B
print_info: model params          = 752.39 M
print_info: general.name          = Unsloth_Gguf_4Kx92237
print_info: vocab type            = BPE
print_info: n_vocab               = 248320
print_info: n_merges              = 247587
print_info: BOS token             = 11 ','
print_info: EOS token             = 248046 '<|im_end|>'
print_info: EOT token             = 248046 '<|im_end|>'
print_info: PAD token             = 248055 '<|vision_pad|>'
print_info: LF token              = 198 '膴'
print_info: FIM PRE token         = 248060 '<|fim_prefix|>'
print_info: FIM SUF token         = 248062 '<|fim_suffix|>'
print_info: FIM MID token         = 248061 '<|fim_middle|>'
print_info: FIM PAD token         = 248063 '<|fim_pad|>'
print_info: FIM REP token         = 248064 '<|repo_name|>'
print_info: FIM SEP token         = 248065 '<|file_sep|>'
print_info: EOG token             = 248044 '<|endoftext|>'
print_info: EOG token             = 248046 '<|im_end|>'
print_info: EOG token             = 248063 '<|fim_pad|>'
print_info: EOG token             = 248064 '<|repo_name|>'
print_info: EOG token             = 248065 '<|file_sep|>'
print_info: max token length      = 256
load_tensors: loading model tensors, this can take a while... (mmap = true, direct_io = false)
load_tensors:   CPU_Mapped model buffer size =   492.61 MiB
load_tensors:   CPU_REPACK model buffer size =   181.44 MiB
.............................................................
common_init_result: added <|endoftext|> logit bias = -inf
common_init_result: added <|im_end|> logit bias = -inf
common_init_result: added <|fim_pad|> logit bias = -inf
common_init_result: added <|repo_name|> logit bias = -inf
common_init_result: added <|file_sep|> logit bias = -inf
llama_context: constructing llama_context
llama_context: n_seq_max     = 4
llama_context: n_ctx         = 262144
llama_context: n_ctx_seq     = 262144
llama_context: n_batch       = 2048
llama_context: n_ubatch      = 512
llama_context: causal_attn   = 1
llama_context: flash_attn    = auto
llama_context: kv_unified    = true
llama_context: freq_base     = 10000000.0
llama_context: freq_scale    = 1
llama_context:        CPU  output buffer size =     3.79 MiB
llama_kv_cache:        CPU KV buffer size =  3072.00 MiB
llama_kv_cache: size = 3072.00 MiB (262144 cells,   6 layers,  4/1 seqs), K (f16): 1536.00 MiB, V (f16): 1536.00 MiB
llama_memory_recurrent:        CPU RS buffer size =    77.06 MiB
llama_memory_recurrent: size =   77.06 MiB (     4 cells,  24 layers,  4 seqs), R (f32):    5.06 MiB, S (f32):   72.00 MiB
sched_reserve: reserving ...
sched_reserve: Flash Attention was auto, set to enabled
sched_reserve: resolving fused Gated Delta Net support:
sched_reserve: fused Gated Delta Net (autoregressive) enabled
sched_reserve: fused Gated Delta Net (chunked) enabled
sched_reserve:        CPU compute buffer size =   786.02 MiB
sched_reserve: graph nodes  = 1377
sched_reserve: graph splits = 1
sched_reserve: reserve took 7.34 ms, sched copies = 1
common_init_from_params: warming up the model with an empty run - please wait ... (--no-warmup to disable)
[0msrv    load_model: initializing slots, n_slots = 4
common_speculative_is_compat: the target context does not support partial sequence removal
[0msrv    load_model: speculative decoding not supported by this context
[0mslot   load_model: id  0 | task -1 | new slot, n_ctx = 262144
slot   load_model: id  1 | task -1 | new slot, n_ctx = 262144
slot   load_model: id  2 | task -1 | new slot, n_ctx = 262144
slot   load_model: id  3 | task -1 | new slot, n_ctx = 262144
srv    load_model: prompt cache is enabled, size limit: 8192 MiB
[0msrv    load_model: use `--cache-ram 0` to disable the prompt cache
[0msrv    load_model: for more info see https://github.com/ggml-org/llama.cpp/pull/16391
[0minit: chat template, example_format: '<|im_start|>system
You are a helpful assistant<|im_end|>
<|im_start|>user
Hello<|im_end|>
<|im_start|>assistant
Hi there<|im_end|>
<|im_start|>user
How are you?<|im_end|>
<|im_start|>assistant
<think>
'
srv          init: init: chat template, thinking = 1
main: model loaded
main: server is listening on http://127.0.0.1:8081
main: starting the main loop...
srv  update_slots: all slots are idle
```
:::

在浏览器打开 [http://127.0.0.1:8081](http://127.0.0.1:8081)，可以发现成功启动了！


![](https://oss.ajohn.top/blog/article/llama/5.webp)

依然是问候一下：

![](https://oss.ajohn.top/blog/article/llama/6.webp)




## 3. 训练营作业

### 3.1 CMakeLists

注意到作业要求我们：
- 编写CMakeLists.txt或使用官方构建配置
- 成功生成可执行文件exe，名称为local_llm.exe

因此我们这里对 CMakeLists.txt 做一个修改，让它修改可执行文件的名称为 local_llm.exe 。

我们在 llama.cpp 目录下的 CMakeLists.txt 文件加上：

```cmake
if (TARGET llama-cli)
    set_target_properties(llama-cli PROPERTIES OUTPUT_NAME local_llm)
endif()
```

重新编译（这次使用全核！）：

```shell
cmake --build build --config Release -- /m
```

::: details 执行日志
```shell
Microsoft Windows [版本 10.0.19045.6466]
(c) Microsoft Corporation。保留所有权利。

D:\KingSoftOffice\llama.cpp>cmake --build build --config Release -- /m
CMake is re-running because D:/KingSoftOffice/llama.cpp/build/CMakeFiles/generate.stamp is out-of-date.
  the file 'D:/KingSoftOffice/llama.cpp/CMakeLists.txt'
  is newer than 'D:/KingSoftOffice/llama.cpp/build/CMakeFiles/generate.stamp.depend'
  result='-1'
-- Selecting Windows SDK version 10.0.26100.0 to target Windows 10.0.19045.
CMAKE_BUILD_TYPE=
-- Warning: ccache not found - consider installing it for faster compilation or disable this warning with GGML_CCACHE=OFF
-- CMAKE_SYSTEM_PROCESSOR: AMD64
-- CMAKE_GENERATOR_PLATFORM:
-- GGML_SYSTEM_ARCH: x86
-- Including CPU backend
-- x86 detected
-- Adding CPU backend variant ggml-cpu: /arch:AVX2 GGML_AVX2;GGML_FMA;GGML_F16C
-- ggml version: 0.9.8
-- ggml commit:  cd708db0c
-- Could NOT find OpenSSL, try to set the path to OpenSSL root folder in the system variable OPENSSL_ROOT_DIR (missing: OPENSSL_CRYPTO_LIBRARY OPENSSL_INCLUDE_DIR)
CMake Warning at vendor/cpp-httplib/CMakeLists.txt:150 (message):
  OpenSSL not found, HTTPS support disabled


-- Generating embedded license file for target: common
-- Configuring done (1.3s)
-- Generating done (1.1s)
-- Build files have been written to: D:/KingSoftOffice/llama.cpp/build
适用于 .NET Framework MSBuild 版本 17.14.40+3e7442088

  1>Checking Build System
  sha256.vcxproj -> D:\KingSoftOffice\llama.cpp\build\examples\gguf-hash\sha256.dir\Release\sha256.lib
  build_info.vcxproj -> D:\KingSoftOffice\llama.cpp\build\common\build_info.dir\Release\build_info.lib
  sha1.vcxproj -> D:\KingSoftOffice\llama.cpp\build\examples\gguf-hash\sha1.dir\Release\sha1.lib
  xxhash.vcxproj -> D:\KingSoftOffice\llama.cpp\build\examples\gguf-hash\xxhash.dir\Release\xxhash.lib
  ggml-base.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\ggml-base.dll
  cpp-httplib.vcxproj -> D:\KingSoftOffice\llama.cpp\build\vendor\cpp-httplib\Release\cpp-httplib.lib
  llama-gemma3-cli.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\llama-gemma3-cli.exe
  llama-llava-cli.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\llama-llava-cli.exe
  llama-minicpmv-cli.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\llama-minicpmv-cli.exe
  llama-qwen2vl-cli.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\llama-qwen2vl-cli.exe
  ggml-cpu.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\ggml-cpu.dll
  ggml.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\ggml.dll
  llama-gguf-hash.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\llama-gguf-hash.exe
  llama-gguf.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\llama-gguf.exe
  llama.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\llama.dll
  llama-simple.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\llama-simple.exe
  mtmd.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\mtmd.dll
  test-c.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\test-c.exe
  llama-simple-chat.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\llama-simple-chat.exe
  license.cpp
  common.vcxproj -> D:\KingSoftOffice\llama.cpp\build\common\Release\common.lib
  server-context.vcxproj -> D:\KingSoftOffice\llama.cpp\build\tools\server\Release\server-context.lib
  test-quantize-fns.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\test-quantize-fns.exe
  test-mtmd-c-api.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\test-mtmd-c-api.exe
  test-log.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\test-log.exe
  test-peg-parser.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\test-peg-parser.exe
  test-arg-parser.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\test-arg-parser.exe
  llama-speculative-simple.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\llama-speculative-simple.exe
  llama-tts.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\llama-tts.exe
  llama-mtmd-debug.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\llama-mtmd-debug.exe
  llama-vdot.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\llama-vdot.exe
  test-json-partial.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\test-json-partial.exe
  test-barrier.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\test-barrier.exe
  llama-convert-llama2c-to-ggml.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\llama-convert-llama2c-to-ggml.
  exe
  test-chat-template.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\test-chat-template.exe
  test-backend-ops.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\test-backend-ops.exe
  llama-diffusion-cli.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\llama-diffusion-cli.exe
  llama-template-analysis.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\llama-template-analysis.exe
  test-gguf.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\test-gguf.exe
  llama-tokenize.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\llama-tokenize.exe
  llama-bench.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\llama-bench.exe
  llama-gguf-split.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\llama-gguf-split.exe
  llama-lookup-create.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\llama-lookup-create.exe
  test-alloc.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\test-alloc.exe
  llama-eval-callback.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\llama-eval-callback.exe
  llama-save-load-state.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\llama-save-load-state.exe
  llama-results.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\llama-results.exe
  test-backend-sampler.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\test-backend-sampler.exe
  llama-completion.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\llama-completion.exe
  test-chat-auto-parser.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\test-chat-auto-parser.exe
  llama-batched.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\llama-batched.exe
  test-tokenizer-0.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\test-tokenizer-0.exe
  test-thread-safety.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\test-thread-safety.exe
  llama-batched-bench.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\llama-batched-bench.exe
  llama-debug.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\llama-debug.exe
  test-rope.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\test-rope.exe
  test-jinja.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\test-jinja.exe
  test-quantize-perf.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\test-quantize-perf.exe
  test-state-restore-fragmented.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\test-state-restore-fragmented.
  exe
  test-autorelease.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\test-autorelease.exe
  llama-cvector-generator.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\llama-cvector-generator.exe
  llama-export-lora.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\llama-export-lora.exe
  llama-imatrix.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\llama-imatrix.exe
  test-regex-partial.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\test-regex-partial.exe
  llama-gen-docs.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\llama-gen-docs.exe
  test-model-load-cancel.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\test-model-load-cancel.exe
  test-chat-peg-parser.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\test-chat-peg-parser.exe
  llama-cli.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\local_llm.exe
  llama-server.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\llama-server.exe
  llama-speculative.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\llama-speculative.exe
  llama-retrieval.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\llama-retrieval.exe
  llama-quantize.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\llama-quantize.exe
  llama-q8dot.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\llama-q8dot.exe
  llama-perplexity.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\llama-perplexity.exe
  test-opt.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\test-opt.exe
  llama-passkey.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\llama-passkey.exe
  llama-parallel.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\llama-parallel.exe
  llama-mtmd-cli.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\llama-mtmd-cli.exe
  llama-lookup-stats.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\llama-lookup-stats.exe
  llama-lookup-merge.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\llama-lookup-merge.exe
  llama-lookup.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\llama-lookup.exe
  llama-lookahead.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\llama-lookahead.exe
  llama-idle.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\llama-idle.exe
  llama-fit-params.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\llama-fit-params.exe
  llama-finetune.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\llama-finetune.exe
  llama-embedding.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\llama-embedding.exe
  export-graph-ops.vcxproj -> D:\KingSoftOffice\llama.cpp\build\bin\Release\export-graph-ops.exe
  Building Custom Rule D:/KingSoftOffice/llama.cpp/CMakeLists.txt

D:\KingSoftOffice\llama.cpp>
```
:::

我们来到 `llama.cpp\build\bin\Release` 目录下检查，确认生成 local_llm.exe ：


![](https://oss.ajohn.top/blog/article/llama/4.webp)


### 3.2 性能测评

实现并测量以下指标：
- **TTFT(Time To First Token)**：首字延迟，从输入到第一个token输出的时间
- **TPOT(Time Per Output Token)**：生成每个token 的平均时间
- **E2E(End-to-End Latency)**：端到端延迟，完整生成的总时间
- 测试至少10组不同长度的输入
- 生成性能报告（表格+图表）

我使用的是 python 语言来做的测试，运行：

（如需获取 `AJohn_evaluation_v4.py` [请访问](https://github.com/zzyAJohn/llama.cpp/blob/AJohn_eval_branch/AJohn_evaluation_v4.py) ）


```shell
conda activate d2l # 激活深度学习环境，可自行配置
python .\AJohn_evaluation_v4.py
```



::: details 执行日志
```shell
Microsoft Windows [版本 10.0.19045.6466]
(c) Microsoft Corporation。保留所有权利。

D:\KingSoftOffice\llama.cpp>conda activate d2l

(d2l) D:\KingSoftOffice\llama.cpp>python .\AJohn_evaluation_v4.py

=== 测试 prompt 01: 你好 ===
TTFT: 2.156s, TPOT: 0.013s/token, E2E: 5.401s, OutputTokens(est): 245

=== 测试 prompt 02: 请简单介绍一下人工智能 ===
TTFT: 2.252s, TPOT: 0.011s/token, E2E: 7.380s, OutputTokens(est): 479

=== 测试 prompt 03: 请写一段关于机器学习的介绍，200字左右 ===
TTFT: 2.140s, TPOT: 0.016s/token, E2E: 7.696s, OutputTokens(est): 355

=== 测试 prompt 04: 请详细解释深度学习的原理，并举例说明其应用场景 ===
TTFT: 2.195s, TPOT: 0.013s/token, E2E: 7.718s, OutputTokens(est): 432

=== 测试 prompt 05: 写一篇关于未来科技发展的短文，500字 ===
TTFT: 2.194s, TPOT: 0.010s/token, E2E: 7.332s, OutputTokens(est): 507

=== 测试 prompt 06: 解释Transformer模型的结构和原理 ===
TTFT: 2.227s, TPOT: 0.012s/token, E2E: 7.399s, OutputTokens(est): 419

=== 测试 prompt 07: 介绍操作系统的基本组成 ===
TTFT: 2.193s, TPOT: 0.011s/token, E2E: 7.432s, OutputTokens(est): 490

=== 测试 prompt 08: 解释什么是数据库事务以及ACID特性 ===
TTFT: 2.203s, TPOT: 0.014s/token, E2E: 7.717s, OutputTokens(est): 385

=== 测试 prompt 09: 讲解C++中的智能指针 ===
TTFT: 2.404s, TPOT: 0.012s/token, E2E: 7.686s, OutputTokens(est): 454

=== 测试 prompt 10: 分析一下计算机网络中的TCP协议 ===
TTFT: 2.250s, TPOT: 0.014s/token, E2E: 7.947s, OutputTokens(est): 416

Done.
Logs: runs\20260320_170212
- JSONL: runs\20260320_170212\results.jsonl
- CSV  : runs\20260320_170212\results.csv
- MD   : runs\20260320_170212\summary.md
- Plots: ttft.png / tpot.png / e2e.png / output_tokens.png

(d2l) D:\KingSoftOffice\llama.cpp>
```
:::


生成的日志文件结构如下：

（如需获取 `runs/20260320_170212` [请访问](https://github.com/zzyAJohn/llama.cpp/tree/AJohn_eval_branch/runs/20260320_170212) ）

::: file-tree
- runs
  - 20260320_170212
    - samples // 存放每组测试的问题与模型回答
      - sample_01.txt // 问题1与模型回答
      - sample_02.txt // ...
      - sample_03.txt
      - sample_04.txt
      - sample_05.txt
      - sample_06.txt
      - sample_07.txt
      - sample_08.txt
      - sample_09.txt
      - sample_10.txt
    - e2e.png // E2E 图
    - results.csv // 保存模型的所有回答
    - results.jsonl // 保存模型的所有回答
    - run_config.json // 本次运行环境的配置信息
    - summary.md // 总结本次测试的平均 TTFT TPOT E2E
    - tpot.png // TPOT 图
    - ttft.png // TTFT 图
:::


- 本次运行的配置信息：

  - **timestamp**: 2026-03-20T17:02:12
  - **platform**: Windows-10-10.0.19045-SP0
  - **python**: 3.9.19 (main, May  6 2024, 20:12:36) [MSC v.1916 64 bit (AMD64)]
  - **exe_path**: build\bin\Release\local_llm.exe
  - **model_path**: models\Qwen3.5-0.8B.Q4_K_M.gguf
  - **max_new_tokens**: 256
  - **prompt_count**: 10
  - **output_dir**: runs\20260320_170212


- 平均性能：

  - **Average TTFT**: 2.221350s
  - **Average TPOT**: 0.012521s/token
  - **Average E2E**: 7.370850s

- 性能报告表格：

::: table full-width
| ID | Prompt chars | Output tokens(est.) | TTFT(s) | TPOT(s/token) | E2E(s) |
|---|:---:|:---:|:---:|:---:|:---:|
| 01 | 2 | 245 | 2.156499 | 0.013245 | 5.401499 |
| 02 | 11 | 479 | 2.251502 | 0.010706 | 7.379500 |
| 03 | 20 | 355 | 2.139999 | 0.015651 | 7.696000 |
| 04 | 23 | 432 | 2.195002 | 0.012786 | 7.718500 |
| 05 | 19 | 507 | 2.194499 | 0.010133 | 7.332000 |
| 06 | 21 | 419 | 2.226999 | 0.012345 | 7.399499 |
| 07 | 11 | 490 | 2.192999 | 0.010693 | 7.432500 |
| 08 | 18 | 385 | 2.202999 | 0.014322 | 7.716999 |
| 09 | 11 | 454 | 2.403500 | 0.011634 | 7.685500 |
| 10 | 16 | 416 | 2.249501 | 0.013695 | 7.946500 |
:::

- 性能报告图表：

::: card-masonry cols="2"
![](https://oss.ajohn.top/blog/article/llama/e2e.webp)

![](https://oss.ajohn.top/blog/article/llama/tpot.webp)

![](https://oss.ajohn.top/blog/article/llama/ttft.webp)

![](https://oss.ajohn.top/blog/article/llama/output_tokens.webp)

:::


### 3.3 性能测评总结

1. **TTFT（首字延迟）**

所有样本的 TTFT 稳定在 2.14～2.40 秒 之间，平均约 2.22 秒。

提示长度（2～23 字符）对首字延迟无明显影响，说明模型加载和 prompt 编码阶段耗时稳定。

2. **TPOT（生成速度）**

平均每 token 生成时间约 12.5 毫秒，对应生成速度约为 80 token/s。

速度波动（10.1～15.7 ms/token）主要受输出长度影响，但整体处于较高水平，适合实时交互场景。

3. **E2E（端到端时间）**

总耗时主要由输出 token 数量决定。样本 01 输出最少（245 个估计 token），E2E 最短（5.4 秒）；样本 05 输出最多（507 token），E2E 为 7.33 秒，略低于平均值，可能是 TPOT 较快所致。

即使输出接近 500 个 token，总耗时仍在 8 秒以内，用户体验良好。

4. **结论**

该 0.8B 量化模型在 CPU 环境下运行效率较高：

- 首字响应在 2.2 秒左右，稳定无尖峰。

- 生成速度达 80 token/s，可满足大多数实时对话需求。

- 端到端延迟随输出长度线性增长，但整体可控。

对于需要低延迟、中长文本生成的应用场景，此配置具有实用价值。


### 3.4 准确度测评

测试任务：判断”任命证书”是否符合中文表达逻辑
- 自行构造100条正例（符合逻辑的任命证书）
- 自行构造100条反例（不符合逻辑的错误表达）
- 让模型判断每条是否合理
- 计算准确率、召回率、F1分数

我使用的是 python 语言来做的测试，运行：

（如需获取 `AJohn_evaluation_acc_v2.py` [请访问](https://github.com/zzyAJohn/llama.cpp/blob/AJohn_eval_branch/AJohn_evaluation_acc_v2.py) ）


```shell
conda activate d2l # 激活深度学习环境，可自行配置
python .\AJohn_evaluation_acc_v2.py
```



::: details 执行日志
```shell
Microsoft Windows [版本 10.0.19045.6466]
(c) Microsoft Corporation。保留所有权利。

D:\KingSoftOffice\llama.cpp>conda activate d2l

(d2l) D:\KingSoftOffice\llama.cpp>python AJohn_evaluation_ex.py --exe .\build\bin\Release\local_llm.exe --model .\models\Qwen3.5-0.8B.Q4_K_M.gguf
生成测试用例...
共生成 200 条测试用例 (正例100, 反例100)

=== 测试 #0001 ===
真实: 不合理, 预测: 不合理, TTFT: 3.647s

=== 测试 #0002 ===
真实: 不合理, 预测: 不合理, TTFT: 2.515s

=== 测试 #0003 ===
真实: 合理, 预测: 不合理, TTFT: 2.331s

=== 测试 #0004 ===
真实: 不合理, 预测: 不合理, TTFT: 2.445s

=== 测试 #0005 ===
真实: 合理, 预测: 合理, TTFT: 2.286s

=== 测试 #0006 ===
真实: 合理, 预测: 不合理, TTFT: 2.258s

=== 测试 #0007 ===
真实: 不合理, 预测: 不合理, TTFT: 2.456s

=== 测试 #0008 ===
真实: 不合理, 预测: 不合理, TTFT: 2.345s

=== 测试 #0009 ===
真实: 合理, 预测: 不合理, TTFT: 2.545s

=== 测试 #0010 ===
真实: 合理, 预测: 不合理, TTFT: 2.311s

=== 测试 #0011 ===
真实: 不合理, 预测: 不合理, TTFT: 2.438s

=== 测试 #0012 ===
真实: 不合理, 预测: 不合理, TTFT: 2.313s

=== 测试 #0013 ===
真实: 不合理, 预测: 不合理, TTFT: 2.434s

=== 测试 #0014 ===
真实: 不合理, 预测: 不合理, TTFT: 2.415s

=== 测试 #0015 ===
真实: 合理, 预测: 不合理, TTFT: 2.351s

=== 测试 #0016 ===
真实: 合理, 预测: 合理, TTFT: 2.206s

=== 测试 #0017 ===
真实: 合理, 预测: 不合理, TTFT: 2.309s

=== 测试 #0018 ===
真实: 不合理, 预测: 不合理, TTFT: 2.412s

=== 测试 #0019 ===
真实: 合理, 预测: 不合理, TTFT: 2.313s

=== 测试 #0020 ===
真实: 不合理, 预测: 合理, TTFT: 2.479s

=== 测试 #0021 ===
真实: 不合理, 预测: 不合理, TTFT: 2.301s

=== 测试 #0022 ===
真实: 合理, 预测: 不合理, TTFT: 2.305s

=== 测试 #0023 ===
真实: 合理, 预测: 不合理, TTFT: 2.280s

=== 测试 #0024 ===
真实: 合理, 预测: 不合理, TTFT: 2.500s

=== 测试 #0025 ===
真实: 合理, 预测: 不合理, TTFT: 2.408s

=== 测试 #0026 ===
真实: 不合理, 预测: 不合理, TTFT: 2.442s

=== 测试 #0027 ===
真实: 合理, 预测: 不合理, TTFT: 2.361s

=== 测试 #0028 ===
真实: 不合理, 预测: 不合理, TTFT: 2.472s

=== 测试 #0029 ===
真实: 不合理, 预测: 不合理, TTFT: 2.383s

=== 测试 #0030 ===
真实: 不合理, 预测: 不合理, TTFT: 2.440s

=== 测试 #0031 ===
真实: 合理, 预测: 合理, TTFT: 2.504s

=== 测试 #0032 ===
真实: 合理, 预测: 不合理, TTFT: 2.548s

=== 测试 #0033 ===
真实: 合理, 预测: 不合理, TTFT: 2.347s

=== 测试 #0034 ===
真实: 不合理, 预测: 不合理, TTFT: 2.390s

=== 测试 #0035 ===
真实: 合理, 预测: 不合理, TTFT: 2.274s

=== 测试 #0036 ===
真实: 不合理, 预测: 不合理, TTFT: 2.445s

=== 测试 #0037 ===
真实: 不合理, 预测: 不合理, TTFT: 2.466s

=== 测试 #0038 ===
真实: 不合理, 预测: 不合理, TTFT: 2.405s

=== 测试 #0039 ===
真实: 合理, 预测: 不合理, TTFT: 2.269s

=== 测试 #0040 ===
真实: 合理, 预测: 不合理, TTFT: 2.317s

=== 测试 #0041 ===
真实: 合理, 预测: 不合理, TTFT: 2.252s

=== 测试 #0042 ===
真实: 不合理, 预测: 不合理, TTFT: 2.375s

=== 测试 #0043 ===
真实: 合理, 预测: 不合理, TTFT: 2.407s

=== 测试 #0044 ===
真实: 不合理, 预测: 不合理, TTFT: 2.376s

=== 测试 #0045 ===
真实: 合理, 预测: 不合理, TTFT: 2.233s

=== 测试 #0046 ===
真实: 合理, 预测: 不合理, TTFT: 2.529s

=== 测试 #0047 ===
真实: 不合理, 预测: 不合理, TTFT: 2.463s

=== 测试 #0048 ===
真实: 不合理, 预测: 不合理, TTFT: 2.400s

=== 测试 #0049 ===
真实: 合理, 预测: 不合理, TTFT: 2.760s

=== 测试 #0050 ===
真实: 合理, 预测: 不合理, TTFT: 2.595s

=== 测试 #0051 ===
真实: 合理, 预测: 不合理, TTFT: 2.727s

=== 测试 #0052 ===
真实: 不合理, 预测: 不合理, TTFT: 2.646s

=== 测试 #0053 ===
真实: 合理, 预测: 合理, TTFT: 2.426s

=== 测试 #0054 ===
真实: 合理, 预测: 不合理, TTFT: 2.384s

=== 测试 #0055 ===
真实: 合理, 预测: 不合理, TTFT: 2.355s

=== 测试 #0056 ===
真实: 不合理, 预测: 合理, TTFT: 2.424s

=== 测试 #0057 ===
真实: 不合理, 预测: 不合理, TTFT: 2.363s

=== 测试 #0058 ===
真实: 合理, 预测: 不合理, TTFT: 2.493s

=== 测试 #0059 ===
真实: 合理, 预测: 合理, TTFT: 2.525s

=== 测试 #0060 ===
真实: 不合理, 预测: 不合理, TTFT: 2.354s

=== 测试 #0061 ===
真实: 不合理, 预测: 不合理, TTFT: 2.491s

=== 测试 #0062 ===
真实: 合理, 预测: 不合理, TTFT: 2.382s

=== 测试 #0063 ===
真实: 不合理, 预测: 不合理, TTFT: 2.332s

=== 测试 #0064 ===
真实: 合理, 预测: 不合理, TTFT: 2.409s

=== 测试 #0065 ===
真实: 不合理, 预测: 不合理, TTFT: 2.366s

=== 测试 #0066 ===
真实: 合理, 预测: 不合理, TTFT: 2.256s

=== 测试 #0067 ===
真实: 不合理, 预测: 不合理, TTFT: 2.445s

=== 测试 #0068 ===
真实: 不合理, 预测: 不合理, TTFT: 2.384s

=== 测试 #0069 ===
真实: 不合理, 预测: 不合理, TTFT: 2.624s

=== 测试 #0070 ===
真实: 不合理, 预测: 合理, TTFT: 2.422s

=== 测试 #0071 ===
真实: 合理, 预测: 不合理, TTFT: 2.401s

=== 测试 #0072 ===
真实: 合理, 预测: 不合理, TTFT: 2.257s

=== 测试 #0073 ===
真实: 不合理, 预测: 不合理, TTFT: 2.320s

=== 测试 #0074 ===
真实: 不合理, 预测: 不合理, TTFT: 2.369s

=== 测试 #0075 ===
真实: 不合理, 预测: 不合理, TTFT: 2.413s

=== 测试 #0076 ===
真实: 不合理, 预测: 不合理, TTFT: 2.314s

=== 测试 #0077 ===
真实: 不合理, 预测: 不合理, TTFT: 2.388s

=== 测试 #0078 ===
真实: 合理, 预测: 合理, TTFT: 2.471s

=== 测试 #0079 ===
真实: 合理, 预测: 不合理, TTFT: 2.338s

=== 测试 #0080 ===
真实: 合理, 预测: 不合理, TTFT: 2.277s

=== 测试 #0081 ===
真实: 合理, 预测: 不合理, TTFT: 2.400s

=== 测试 #0082 ===
真实: 合理, 预测: 合理, TTFT: 2.267s

=== 测试 #0083 ===
真实: 合理, 预测: 不合理, TTFT: 2.336s

=== 测试 #0084 ===
真实: 合理, 预测: 不合理, TTFT: 2.248s

=== 测试 #0085 ===
真实: 不合理, 预测: 不合理, TTFT: 2.395s

=== 测试 #0086 ===
真实: 不合理, 预测: 不合理, TTFT: 2.638s

=== 测试 #0087 ===
真实: 合理, 预测: 不合理, TTFT: 2.438s

=== 测试 #0088 ===
真实: 合理, 预测: 不合理, TTFT: 2.411s

=== 测试 #0089 ===
真实: 合理, 预测: 合理, TTFT: 2.462s

=== 测试 #0090 ===
真实: 不合理, 预测: 不合理, TTFT: 2.396s

=== 测试 #0091 ===
真实: 合理, 预测: 不合理, TTFT: 2.322s

=== 测试 #0092 ===
真实: 合理, 预测: 合理, TTFT: 2.389s

=== 测试 #0093 ===
真实: 合理, 预测: 不合理, TTFT: 2.376s

=== 测试 #0094 ===
真实: 合理, 预测: 不合理, TTFT: 2.358s

=== 测试 #0095 ===
真实: 合理, 预测: 不合理, TTFT: 2.412s

=== 测试 #0096 ===
真实: 合理, 预测: 不合理, TTFT: 2.370s

=== 测试 #0097 ===
真实: 合理, 预测: 不合理, TTFT: 2.284s

=== 测试 #0098 ===
真实: 不合理, 预测: 不合理, TTFT: 2.262s

=== 测试 #0099 ===
真实: 不合理, 预测: 不合理, TTFT: 2.310s

=== 测试 #0100 ===
真实: 合理, 预测: 不合理, TTFT: 2.359s

=== 测试 #0101 ===
真实: 合理, 预测: 不合理, TTFT: 2.300s

=== 测试 #0102 ===
真实: 不合理, 预测: 不合理, TTFT: 2.318s

=== 测试 #0103 ===
真实: 合理, 预测: 不合理, TTFT: 2.309s

=== 测试 #0104 ===
真实: 不合理, 预测: 不合理, TTFT: 2.346s

=== 测试 #0105 ===
真实: 合理, 预测: 不合理, TTFT: 2.381s

=== 测试 #0106 ===
真实: 不合理, 预测: 不合理, TTFT: 2.343s

=== 测试 #0107 ===
真实: 合理, 预测: 合理, TTFT: 2.245s

=== 测试 #0108 ===
真实: 合理, 预测: 合理, TTFT: 2.266s

=== 测试 #0109 ===
真实: 合理, 预测: 不合理, TTFT: 2.376s

=== 测试 #0110 ===
真实: 不合理, 预测: 不合理, TTFT: 2.534s

=== 测试 #0111 ===
真实: 不合理, 预测: 不合理, TTFT: 2.557s

=== 测试 #0112 ===
真实: 合理, 预测: 不合理, TTFT: 2.381s

=== 测试 #0113 ===
真实: 合理, 预测: 不合理, TTFT: 2.304s

=== 测试 #0114 ===
真实: 合理, 预测: 不合理, TTFT: 2.424s

=== 测试 #0115 ===
真实: 合理, 预测: 合理, TTFT: 2.380s

=== 测试 #0116 ===
真实: 合理, 预测: 不合理, TTFT: 2.580s

=== 测试 #0117 ===
真实: 合理, 预测: 不合理, TTFT: 2.394s

=== 测试 #0118 ===
真实: 不合理, 预测: 不合理, TTFT: 2.391s

=== 测试 #0119 ===
真实: 不合理, 预测: 不合理, TTFT: 2.423s

=== 测试 #0120 ===
真实: 不合理, 预测: 不合理, TTFT: 2.473s

=== 测试 #0121 ===
真实: 合理, 预测: 不合理, TTFT: 2.726s

=== 测试 #0122 ===
真实: 不合理, 预测: 不合理, TTFT: 2.491s

=== 测试 #0123 ===
真实: 合理, 预测: 不合理, TTFT: 2.525s

=== 测试 #0124 ===
真实: 合理, 预测: 不合理, TTFT: 2.537s

=== 测试 #0125 ===
真实: 合理, 预测: 不合理, TTFT: 2.560s

=== 测试 #0126 ===
真实: 不合理, 预测: 合理, TTFT: 2.430s

=== 测试 #0127 ===
真实: 合理, 预测: 不合理, TTFT: 2.384s

=== 测试 #0128 ===
真实: 不合理, 预测: 不合理, TTFT: 2.694s

=== 测试 #0129 ===
真实: 合理, 预测: 合理, TTFT: 2.475s

=== 测试 #0130 ===
真实: 不合理, 预测: 合理, TTFT: 2.561s

=== 测试 #0131 ===
真实: 不合理, 预测: 不合理, TTFT: 2.420s

=== 测试 #0132 ===
真实: 合理, 预测: 不合理, TTFT: 2.623s

=== 测试 #0133 ===
真实: 不合理, 预测: 不合理, TTFT: 2.491s

=== 测试 #0134 ===
真实: 合理, 预测: 合理, TTFT: 2.369s

=== 测试 #0135 ===
真实: 不合理, 预测: 不合理, TTFT: 2.367s

=== 测试 #0136 ===
真实: 合理, 预测: 不合理, TTFT: 2.448s

=== 测试 #0137 ===
真实: 合理, 预测: 不合理, TTFT: 2.338s

=== 测试 #0138 ===
真实: 合理, 预测: 不合理, TTFT: 2.341s

=== 测试 #0139 ===
真实: 合理, 预测: 不合理, TTFT: 2.343s

=== 测试 #0140 ===
真实: 不合理, 预测: 不合理, TTFT: 2.284s

=== 测试 #0141 ===
真实: 不合理, 预测: 合理, TTFT: 2.409s

=== 测试 #0142 ===
真实: 不合理, 预测: 不合理, TTFT: 2.479s

=== 测试 #0143 ===
真实: 合理, 预测: 不合理, TTFT: 2.534s

=== 测试 #0144 ===
真实: 不合理, 预测: 不合理, TTFT: 2.506s

=== 测试 #0145 ===
真实: 合理, 预测: 不合理, TTFT: 2.451s

=== 测试 #0146 ===
真实: 不合理, 预测: 不合理, TTFT: 2.367s

=== 测试 #0147 ===
真实: 合理, 预测: 不合理, TTFT: 2.307s

=== 测试 #0148 ===
真实: 不合理, 预测: 不合理, TTFT: 2.278s

=== 测试 #0149 ===
真实: 不合理, 预测: 不合理, TTFT: 2.452s

=== 测试 #0150 ===
真实: 不合理, 预测: 不合理, TTFT: 2.331s

=== 测试 #0151 ===
真实: 不合理, 预测: 合理, TTFT: 2.510s

=== 测试 #0152 ===
真实: 不合理, 预测: 不合理, TTFT: 2.392s

=== 测试 #0153 ===
真实: 合理, 预测: 不合理, TTFT: 2.473s

=== 测试 #0154 ===
真实: 合理, 预测: 不合理, TTFT: 2.315s

=== 测试 #0155 ===
真实: 不合理, 预测: 不合理, TTFT: 2.595s

=== 测试 #0156 ===
真实: 不合理, 预测: 不合理, TTFT: 2.565s

=== 测试 #0157 ===
真实: 不合理, 预测: 不合理, TTFT: 2.485s

=== 测试 #0158 ===
真实: 不合理, 预测: 不合理, TTFT: 2.428s

=== 测试 #0159 ===
真实: 合理, 预测: 不合理, TTFT: 2.291s

=== 测试 #0160 ===
真实: 不合理, 预测: 不合理, TTFT: 2.343s

=== 测试 #0161 ===
真实: 合理, 预测: 不合理, TTFT: 2.386s

=== 测试 #0162 ===
真实: 合理, 预测: 不合理, TTFT: 2.418s

=== 测试 #0163 ===
真实: 不合理, 预测: 不合理, TTFT: 2.375s

=== 测试 #0164 ===
真实: 合理, 预测: 不合理, TTFT: 2.355s

=== 测试 #0165 ===
真实: 不合理, 预测: 不合理, TTFT: 2.312s

=== 测试 #0166 ===
真实: 合理, 预测: 不合理, TTFT: 2.377s

=== 测试 #0167 ===
真实: 不合理, 预测: 合理, TTFT: 2.397s

=== 测试 #0168 ===
真实: 不合理, 预测: 不合理, TTFT: 2.400s

=== 测试 #0169 ===
真实: 不合理, 预测: 不合理, TTFT: 2.384s

=== 测试 #0170 ===
真实: 合理, 预测: 不合理, TTFT: 2.380s

=== 测试 #0171 ===
真实: 合理, 预测: 不合理, TTFT: 2.319s

=== 测试 #0172 ===
真实: 不合理, 预测: 不合理, TTFT: 2.337s

=== 测试 #0173 ===
真实: 不合理, 预测: 不合理, TTFT: 2.414s

=== 测试 #0174 ===
真实: 不合理, 预测: 不合理, TTFT: 2.398s

=== 测试 #0175 ===
真实: 合理, 预测: 不合理, TTFT: 2.402s

=== 测试 #0176 ===
真实: 不合理, 预测: 不合理, TTFT: 2.396s

=== 测试 #0177 ===
真实: 不合理, 预测: 不合理, TTFT: 2.247s

=== 测试 #0178 ===
真实: 合理, 预测: 合理, TTFT: 2.303s

=== 测试 #0179 ===
真实: 不合理, 预测: 不合理, TTFT: 2.371s

=== 测试 #0180 ===
真实: 不合理, 预测: 不合理, TTFT: 2.570s

=== 测试 #0181 ===
真实: 合理, 预测: 不合理, TTFT: 2.418s

=== 测试 #0182 ===
真实: 合理, 预测: 不合理, TTFT: 2.448s

=== 测试 #0183 ===
真实: 不合理, 预测: 不合理, TTFT: 2.283s

=== 测试 #0184 ===
真实: 不合理, 预测: 不合理, TTFT: 2.306s

=== 测试 #0185 ===
真实: 不合理, 预测: 合理, TTFT: 2.376s

=== 测试 #0186 ===
真实: 合理, 预测: 合理, TTFT: 2.344s

=== 测试 #0187 ===
真实: 不合理, 预测: 不合理, TTFT: 2.537s

=== 测试 #0188 ===
真实: 不合理, 预测: 合理, TTFT: 2.366s

=== 测试 #0189 ===
真实: 不合理, 预测: 不合理, TTFT: 2.582s

=== 测试 #0190 ===
真实: 不合理, 预测: 合理, TTFT: 2.369s

=== 测试 #0191 ===
真实: 合理, 预测: 不合理, TTFT: 2.563s

=== 测试 #0192 ===
真实: 合理, 预测: 不合理, TTFT: 2.668s

=== 测试 #0193 ===
真实: 合理, 预测: 不合理, TTFT: 2.451s

=== 测试 #0194 ===
真实: 不合理, 预测: 不合理, TTFT: 2.486s

=== 测试 #0195 ===
真实: 不合理, 预测: 不合理, TTFT: 2.306s

=== 测试 #0196 ===
真实: 不合理, 预测: 不合理, TTFT: 2.287s

=== 测试 #0197 ===
真实: 不合理, 预测: 合理, TTFT: 2.456s

=== 测试 #0198 ===
真实: 不合理, 预测: 不合理, TTFT: 2.397s

=== 测试 #0199 ===
真实: 合理, 预测: 不合理, TTFT: 2.436s

=== 测试 #0200 ===
真实: 不合理, 预测: 合理, TTFT: 2.492s

Done.
Logs: runs\20260325_192759
- JSONL: runs\20260325_192759\results.jsonl
- CSV  : runs\20260325_192759\results.csv
- MD   : runs\20260325_192759\summary.md

评测指标:
准确率: 0.5150
精确率: 0.5517
召回率: 0.1600
F1分数: 0.2481

(d2l) D:\KingSoftOffice\llama.cpp>python AJohn_evaluation_acc_v2.py --exe .\build\bin\Release\local_llm.exe --model .\models\Qwen3.5-0.8B.Q4_K_M.gguf
生成测试用例...
Traceback (most recent call last):
  File "D:\KingSoftOffice\llama.cpp\AJohn_evaluation_acc_v2.py", line 594, in <module>
    main()
  File "D:\KingSoftOffice\llama.cpp\AJohn_evaluation_acc_v2.py", line 468, in main
    test_cases = build_test_cases(num_positive=100, num_negative=100)
  File "D:\KingSoftOffice\llama.cpp\AJohn_evaluation_acc_v2.py", line 224, in build_test_cases
    raise ValueError(f"VALID_CERTIFICATES 只有 {len(VALID_CERTIFICATES)} 条，需要 {num_positive} 条")
ValueError: VALID_CERTIFICATES 只有 98 条，需要 100 条

(d2l) D:\KingSoftOffice\llama.cpp>python AJohn_evaluation_acc_v2.py --exe .\build\bin\Release\local_llm.exe --model .\models\Qwen3.5-0.8B.Q4_K_M.gguf
生成测试用例...
共生成 200 条测试用例 (正例100, 反例100)

=== 测试 #0001 ===
真实: 不合理, 预测: 合理, TTFT: 2.379s

=== 测试 #0002 ===
真实: 不合理, 预测: 合理, TTFT: 2.236s

=== 测试 #0003 ===
真实: 不合理, 预测: 不合理, TTFT: 2.250s

=== 测试 #0004 ===
真实: 不合理, 预测: 合理, TTFT: 2.207s

=== 测试 #0005 ===
真实: 不合理, 预测: 不合理, TTFT: 2.433s

=== 测试 #0006 ===
真实: 合理, 预测: 不合理, TTFT: 2.784s

=== 测试 #0007 ===
真实: 不合理, 预测: 不合理, TTFT: 2.658s

=== 测试 #0008 ===
真实: 不合理, 预测: 不合理, TTFT: 2.617s

=== 测试 #0009 ===
真实: 不合理, 预测: 不合理, TTFT: 2.340s

=== 测试 #0010 ===
真实: 不合理, 预测: 不合理, TTFT: 2.196s

=== 测试 #0011 ===
真实: 合理, 预测: 合理, TTFT: 2.367s

=== 测试 #0012 ===
真实: 不合理, 预测: 合理, TTFT: 2.491s

=== 测试 #0013 ===
真实: 不合理, 预测: 不合理, TTFT: 2.373s

=== 测试 #0014 ===
真实: 合理, 预测: 不合理, TTFT: 2.243s

=== 测试 #0015 ===
真实: 合理, 预测: 不合理, TTFT: 2.320s

=== 测试 #0016 ===
真实: 不合理, 预测: 不合理, TTFT: 2.492s

=== 测试 #0017 ===
真实: 合理, 预测: 不合理, TTFT: 2.546s

=== 测试 #0018 ===
真实: 不合理, 预测: 不合理, TTFT: 2.485s

=== 测试 #0019 ===
真实: 合理, 预测: 不合理, TTFT: 2.269s

=== 测试 #0020 ===
真实: 不合理, 预测: 合理, TTFT: 2.283s

=== 测试 #0021 ===
真实: 合理, 预测: 不合理, TTFT: 2.296s

=== 测试 #0022 ===
真实: 合理, 预测: 合理, TTFT: 2.322s

=== 测试 #0023 ===
真实: 不合理, 预测: 合理, TTFT: 2.378s

=== 测试 #0024 ===
真实: 不合理, 预测: 不合理, TTFT: 2.409s

=== 测试 #0025 ===
真实: 不合理, 预测: 合理, TTFT: 2.340s

=== 测试 #0026 ===
真实: 合理, 预测: 合理, TTFT: 2.466s

=== 测试 #0027 ===
真实: 合理, 预测: 不合理, TTFT: 2.380s

=== 测试 #0028 ===
真实: 合理, 预测: 不合理, TTFT: 2.266s

=== 测试 #0029 ===
真实: 合理, 预测: 合理, TTFT: 2.478s

=== 测试 #0030 ===
真实: 不合理, 预测: 不合理, TTFT: 2.357s

=== 测试 #0031 ===
真实: 合理, 预测: 不合理, TTFT: 2.424s

=== 测试 #0032 ===
真实: 合理, 预测: 不合理, TTFT: 2.385s

=== 测试 #0033 ===
真实: 不合理, 预测: 不合理, TTFT: 2.512s

=== 测试 #0034 ===
真实: 不合理, 预测: 不合理, TTFT: 2.401s

=== 测试 #0035 ===
真实: 合理, 预测: 不合理, TTFT: 2.339s

=== 测试 #0036 ===
真实: 不合理, 预测: 合理, TTFT: 2.465s

=== 测试 #0037 ===
真实: 不合理, 预测: 不合理, TTFT: 2.312s

=== 测试 #0038 ===
真实: 合理, 预测: 不合理, TTFT: 2.345s

=== 测试 #0039 ===
真实: 合理, 预测: 不合理, TTFT: 2.384s

=== 测试 #0040 ===
真实: 合理, 预测: 不合理, TTFT: 2.382s

=== 测试 #0041 ===
真实: 不合理, 预测: 不合理, TTFT: 2.272s

=== 测试 #0042 ===
真实: 不合理, 预测: 不合理, TTFT: 2.311s

=== 测试 #0043 ===
真实: 合理, 预测: 不合理, TTFT: 2.245s

=== 测试 #0044 ===
真实: 合理, 预测: 不合理, TTFT: 2.376s

=== 测试 #0045 ===
真实: 合理, 预测: 不合理, TTFT: 2.401s

=== 测试 #0046 ===
真实: 不合理, 预测: 不合理, TTFT: 2.320s

=== 测试 #0047 ===
真实: 不合理, 预测: 不合理, TTFT: 2.293s

=== 测试 #0048 ===
真实: 不合理, 预测: 不合理, TTFT: 2.301s

=== 测试 #0049 ===
真实: 合理, 预测: 不合理, TTFT: 2.357s

=== 测试 #0050 ===
真实: 不合理, 预测: 不合理, TTFT: 2.451s

=== 测试 #0051 ===
真实: 合理, 预测: 不合理, TTFT: 2.305s

=== 测试 #0052 ===
真实: 合理, 预测: 不合理, TTFT: 2.490s

=== 测试 #0053 ===
真实: 合理, 预测: 不合理, TTFT: 2.453s

=== 测试 #0054 ===
真实: 不合理, 预测: 不合理, TTFT: 2.543s

=== 测试 #0055 ===
真实: 不合理, 预测: 不合理, TTFT: 2.466s

=== 测试 #0056 ===
真实: 合理, 预测: 不合理, TTFT: 2.653s

=== 测试 #0057 ===
真实: 合理, 预测: 不合理, TTFT: 2.534s

=== 测试 #0058 ===
真实: 合理, 预测: 不合理, TTFT: 2.596s

=== 测试 #0059 ===
真实: 合理, 预测: 不合理, TTFT: 2.475s

=== 测试 #0060 ===
真实: 合理, 预测: 不合理, TTFT: 2.588s

=== 测试 #0061 ===
真实: 合理, 预测: 不合理, TTFT: 2.414s

=== 测试 #0062 ===
真实: 合理, 预测: 不合理, TTFT: 2.415s

=== 测试 #0063 ===
真实: 合理, 预测: 不合理, TTFT: 2.423s

=== 测试 #0064 ===
真实: 合理, 预测: 不合理, TTFT: 2.266s

=== 测试 #0065 ===
真实: 合理, 预测: 合理, TTFT: 2.254s

=== 测试 #0066 ===
真实: 合理, 预测: 不合理, TTFT: 2.471s

=== 测试 #0067 ===
真实: 不合理, 预测: 不合理, TTFT: 2.263s

=== 测试 #0068 ===
真实: 合理, 预测: 不合理, TTFT: 2.314s

=== 测试 #0069 ===
真实: 不合理, 预测: 合理, TTFT: 2.412s

=== 测试 #0070 ===
真实: 不合理, 预测: 不合理, TTFT: 2.423s

=== 测试 #0071 ===
真实: 不合理, 预测: 不合理, TTFT: 2.346s

=== 测试 #0072 ===
真实: 不合理, 预测: 不合理, TTFT: 2.375s

=== 测试 #0073 ===
真实: 合理, 预测: 合理, TTFT: 2.364s

=== 测试 #0074 ===
真实: 合理, 预测: 不合理, TTFT: 2.495s

=== 测试 #0075 ===
真实: 合理, 预测: 合理, TTFT: 2.358s

=== 测试 #0076 ===
真实: 合理, 预测: 不合理, TTFT: 2.488s

=== 测试 #0077 ===
真实: 合理, 预测: 不合理, TTFT: 2.415s

=== 测试 #0078 ===
真实: 不合理, 预测: 不合理, TTFT: 2.533s

=== 测试 #0079 ===
真实: 不合理, 预测: 不合理, TTFT: 2.232s

=== 测试 #0080 ===
真实: 合理, 预测: 不合理, TTFT: 2.206s

=== 测试 #0081 ===
真实: 合理, 预测: 不合理, TTFT: 2.313s

=== 测试 #0082 ===
真实: 不合理, 预测: 不合理, TTFT: 2.364s

=== 测试 #0083 ===
真实: 合理, 预测: 合理, TTFT: 2.351s

=== 测试 #0084 ===
真实: 不合理, 预测: 不合理, TTFT: 2.234s

=== 测试 #0085 ===
真实: 合理, 预测: 不合理, TTFT: 2.308s

=== 测试 #0086 ===
真实: 不合理, 预测: 不合理, TTFT: 2.327s

=== 测试 #0087 ===
真实: 合理, 预测: 不合理, TTFT: 2.418s

=== 测试 #0088 ===
真实: 不合理, 预测: 不合理, TTFT: 2.597s

=== 测试 #0089 ===
真实: 合理, 预测: 合理, TTFT: 2.402s

=== 测试 #0090 ===
真实: 不合理, 预测: 不合理, TTFT: 2.335s

=== 测试 #0091 ===
真实: 合理, 预测: 不合理, TTFT: 2.368s

=== 测试 #0092 ===
真实: 不合理, 预测: 不合理, TTFT: 2.419s

=== 测试 #0093 ===
真实: 合理, 预测: 合理, TTFT: 2.330s

=== 测试 #0094 ===
真实: 合理, 预测: 合理, TTFT: 2.355s

=== 测试 #0095 ===
真实: 合理, 预测: 不合理, TTFT: 2.378s

=== 测试 #0096 ===
真实: 不合理, 预测: 不合理, TTFT: 2.297s

=== 测试 #0097 ===
真实: 不合理, 预测: 合理, TTFT: 2.202s

=== 测试 #0098 ===
真实: 合理, 预测: 不合理, TTFT: 2.321s

=== 测试 #0099 ===
真实: 合理, 预测: 不合理, TTFT: 2.293s

=== 测试 #0100 ===
真实: 合理, 预测: 不合理, TTFT: 2.247s

=== 测试 #0101 ===
真实: 合理, 预测: 合理, TTFT: 2.167s

=== 测试 #0102 ===
真实: 不合理, 预测: 不合理, TTFT: 2.306s

=== 测试 #0103 ===
真实: 合理, 预测: 不合理, TTFT: 2.243s

=== 测试 #0104 ===
真实: 不合理, 预测: 合理, TTFT: 2.335s

=== 测试 #0105 ===
真实: 不合理, 预测: 不合理, TTFT: 2.212s

=== 测试 #0106 ===
真实: 合理, 预测: 不合理, TTFT: 2.183s

=== 测试 #0107 ===
真实: 不合理, 预测: 不合理, TTFT: 2.297s

=== 测试 #0108 ===
真实: 合理, 预测: 不合理, TTFT: 2.304s

=== 测试 #0109 ===
真实: 合理, 预测: 不合理, TTFT: 2.249s

=== 测试 #0110 ===
真实: 合理, 预测: 不合理, TTFT: 2.155s

=== 测试 #0111 ===
真实: 不合理, 预测: 不合理, TTFT: 2.288s

=== 测试 #0112 ===
真实: 合理, 预测: 合理, TTFT: 2.272s

=== 测试 #0113 ===
真实: 合理, 预测: 合理, TTFT: 2.362s

=== 测试 #0114 ===
真实: 不合理, 预测: 不合理, TTFT: 2.209s

=== 测试 #0115 ===
真实: 合理, 预测: 不合理, TTFT: 2.234s

=== 测试 #0116 ===
真实: 合理, 预测: 不合理, TTFT: 2.254s

=== 测试 #0117 ===
真实: 不合理, 预测: 不合理, TTFT: 2.269s

=== 测试 #0118 ===
真实: 合理, 预测: 不合理, TTFT: 2.312s

=== 测试 #0119 ===
真实: 不合理, 预测: 不合理, TTFT: 2.222s

=== 测试 #0120 ===
真实: 不合理, 预测: 不合理, TTFT: 2.251s

=== 测试 #0121 ===
真实: 不合理, 预测: 不合理, TTFT: 2.276s

=== 测试 #0122 ===
真实: 不合理, 预测: 不合理, TTFT: 2.253s

=== 测试 #0123 ===
真实: 合理, 预测: 合理, TTFT: 2.368s

=== 测试 #0124 ===
真实: 合理, 预测: 不合理, TTFT: 2.258s

=== 测试 #0125 ===
真实: 合理, 预测: 不合理, TTFT: 2.331s

=== 测试 #0126 ===
真实: 不合理, 预测: 不合理, TTFT: 2.406s

=== 测试 #0127 ===
真实: 不合理, 预测: 不合理, TTFT: 2.499s

=== 测试 #0128 ===
真实: 不合理, 预测: 不合理, TTFT: 2.617s

=== 测试 #0129 ===
真实: 不合理, 预测: 不合理, TTFT: 2.477s

=== 测试 #0130 ===
真实: 合理, 预测: 不合理, TTFT: 2.347s

=== 测试 #0131 ===
真实: 合理, 预测: 合理, TTFT: 2.263s

=== 测试 #0132 ===
真实: 合理, 预测: 不合理, TTFT: 2.264s

=== 测试 #0133 ===
真实: 合理, 预测: 不合理, TTFT: 2.281s

=== 测试 #0134 ===
真实: 不合理, 预测: 不合理, TTFT: 2.416s

=== 测试 #0135 ===
真实: 不合理, 预测: 不合理, TTFT: 2.228s

=== 测试 #0136 ===
真实: 合理, 预测: 合理, TTFT: 2.138s

=== 测试 #0137 ===
真实: 不合理, 预测: 不合理, TTFT: 2.449s

=== 测试 #0138 ===
真实: 合理, 预测: 不合理, TTFT: 2.474s

=== 测试 #0139 ===
真实: 合理, 预测: 合理, TTFT: 2.432s

=== 测试 #0140 ===
真实: 合理, 预测: 不合理, TTFT: 2.363s

=== 测试 #0141 ===
真实: 不合理, 预测: 不合理, TTFT: 2.305s

=== 测试 #0142 ===
真实: 不合理, 预测: 不合理, TTFT: 2.236s

=== 测试 #0143 ===
真实: 不合理, 预测: 不合理, TTFT: 2.328s

=== 测试 #0144 ===
真实: 不合理, 预测: 合理, TTFT: 2.350s

=== 测试 #0145 ===
真实: 不合理, 预测: 不合理, TTFT: 2.433s

=== 测试 #0146 ===
真实: 合理, 预测: 不合理, TTFT: 2.434s

=== 测试 #0147 ===
真实: 不合理, 预测: 不合理, TTFT: 2.278s

=== 测试 #0148 ===
真实: 合理, 预测: 合理, TTFT: 2.221s

=== 测试 #0149 ===
真实: 合理, 预测: 合理, TTFT: 2.294s

=== 测试 #0150 ===
真实: 合理, 预测: 不合理, TTFT: 2.256s

=== 测试 #0151 ===
真实: 不合理, 预测: 不合理, TTFT: 2.417s

=== 测试 #0152 ===
真实: 合理, 预测: 不合理, TTFT: 2.605s

=== 测试 #0153 ===
真实: 合理, 预测: 不合理, TTFT: 2.262s

=== 测试 #0154 ===
真实: 合理, 预测: 不合理, TTFT: 2.404s

=== 测试 #0155 ===
真实: 合理, 预测: 不合理, TTFT: 2.350s

=== 测试 #0156 ===
真实: 不合理, 预测: 不合理, TTFT: 2.509s

=== 测试 #0157 ===
真实: 不合理, 预测: 不合理, TTFT: 2.326s

=== 测试 #0158 ===
真实: 不合理, 预测: 不合理, TTFT: 2.344s

=== 测试 #0159 ===
真实: 不合理, 预测: 不合理, TTFT: 2.506s

=== 测试 #0160 ===
真实: 不合理, 预测: 不合理, TTFT: 2.300s

=== 测试 #0161 ===
真实: 不合理, 预测: 不合理, TTFT: 2.316s

=== 测试 #0162 ===
真实: 不合理, 预测: 不合理, TTFT: 2.376s

=== 测试 #0163 ===
真实: 合理, 预测: 不合理, TTFT: 2.450s

=== 测试 #0164 ===
真实: 不合理, 预测: 不合理, TTFT: 2.511s

=== 测试 #0165 ===
真实: 不合理, 预测: 不合理, TTFT: 2.308s

=== 测试 #0166 ===
真实: 不合理, 预测: 不合理, TTFT: 2.547s

=== 测试 #0167 ===
真实: 合理, 预测: 不合理, TTFT: 2.389s

=== 测试 #0168 ===
真实: 合理, 预测: 不合理, TTFT: 2.337s

=== 测试 #0169 ===
真实: 合理, 预测: 合理, TTFT: 2.490s

=== 测试 #0170 ===
真实: 不合理, 预测: 不合理, TTFT: 2.307s

=== 测试 #0171 ===
真实: 合理, 预测: 不合理, TTFT: 2.333s

=== 测试 #0172 ===
真实: 合理, 预测: 合理, TTFT: 2.335s

=== 测试 #0173 ===
真实: 不合理, 预测: 不合理, TTFT: 2.547s

=== 测试 #0174 ===
真实: 不合理, 预测: 不合理, TTFT: 2.401s

=== 测试 #0175 ===
真实: 不合理, 预测: 不合理, TTFT: 2.367s

=== 测试 #0176 ===
真实: 不合理, 预测: 不合理, TTFT: 2.352s

=== 测试 #0177 ===
真实: 不合理, 预测: 合理, TTFT: 2.373s

=== 测试 #0178 ===
真实: 不合理, 预测: 不合理, TTFT: 2.249s

=== 测试 #0179 ===
真实: 不合理, 预测: 不合理, TTFT: 2.319s

=== 测试 #0180 ===
真实: 不合理, 预测: 不合理, TTFT: 2.356s

=== 测试 #0181 ===
真实: 合理, 预测: 不合理, TTFT: 2.320s

=== 测试 #0182 ===
真实: 不合理, 预测: 不合理, TTFT: 2.254s

=== 测试 #0183 ===
真实: 合理, 预测: 不合理, TTFT: 2.294s

=== 测试 #0184 ===
真实: 不合理, 预测: 不合理, TTFT: 2.347s

=== 测试 #0185 ===
真实: 不合理, 预测: 不合理, TTFT: 2.371s

=== 测试 #0186 ===
真实: 合理, 预测: 不合理, TTFT: 2.401s

=== 测试 #0187 ===
真实: 合理, 预测: 不合理, TTFT: 2.327s

=== 测试 #0188 ===
真实: 不合理, 预测: 不合理, TTFT: 2.401s

=== 测试 #0189 ===
真实: 不合理, 预测: 不合理, TTFT: 2.296s

=== 测试 #0190 ===
真实: 合理, 预测: 不合理, TTFT: 2.371s

=== 测试 #0191 ===
真实: 合理, 预测: 不合理, TTFT: 2.337s

=== 测试 #0192 ===
真实: 不合理, 预测: 不合理, TTFT: 2.594s

=== 测试 #0193 ===
真实: 不合理, 预测: 不合理, TTFT: 2.308s

=== 测试 #0194 ===
真实: 不合理, 预测: 不合理, TTFT: 2.315s

=== 测试 #0195 ===
真实: 合理, 预测: 不合理, TTFT: 2.282s

=== 测试 #0196 ===
真实: 不合理, 预测: 不合理, TTFT: 2.294s

=== 测试 #0197 ===
真实: 不合理, 预测: 不合理, TTFT: 2.400s

=== 测试 #0198 ===
真实: 合理, 预测: 不合理, TTFT: 2.345s

=== 测试 #0199 ===
真实: 不合理, 预测: 不合理, TTFT: 2.237s

=== 测试 #0200 ===
真实: 合理, 预测: 不合理, TTFT: 2.174s

Done.
Logs: runs\20260325_194827
- JSONL: runs\20260325_194827\results.jsonl
- CSV  : runs\20260325_194827\results.csv
- MD   : runs\20260325_194827\summary.md

评测指标:
准确率: 0.5450
精确率: 0.6286
召回率: 0.2200
F1分数: 0.3259

(d2l) D:\KingSoftOffice\llama.cpp>
```
:::


生成的日志文件结构如下：

（如需获取 `runs/20260325_194827` [请访问](https://github.com/zzyAJohn/llama.cpp/tree/AJohn_eval_branch/runs/20260325_194827) ）

::: file-tree
- runs
  - 20260325_194827
    - samples // 存放每组测试的问题与模型回答
      - sample_0001.txt // 问题1与模型回答
      - sample_0002.txt // ...
      - ...
      - sample_0200.txt
    - results.csv // 保存模型的所有回答
    - results.jsonl // 保存模型的所有回答
    - run_config.json // 本次运行环境的配置信息
    - summary.md // 总结本次测试的平均 准确率 召回率 F1 分数
:::

- 运行配置

  - **timestamp**: 2026-03-25T19:48:27
  - **platform**: Windows-10-10.0.19045-SP0
  - **python**: 3.9.19 (main, May  6 2024, 20:12:36) [MSC v.1916 64 bit (AMD64)]
  - **exe_path**: build\bin\Release\local_llm.exe
  - **model_path**: models\Qwen3.5-0.8B.Q4_K_M.gguf
  - **max_new_tokens**: 64
  - **num_positive**: 100
  - **num_negative**: 100
  - **output_dir**: runs\20260325_194827

- 评测指标

  - **准确率 (Accuracy)**: 0.5450
  - **精确率 (Precision)**: 0.6286
  - **召回率 (Recall)**: 0.2200
  - **F1 分数 (F1 Score)**: 0.3259

- 混淆矩阵

|               | 预测合理 | 预测不合理 |
|---------------|----------|------------|
| 实际合理     |     22 |         78 |
| 实际不合理   |     13 |         87 |

- 真阳性 (TP)：22（正确判断为“合理”）

- 假阴性 (FN)：78（误判为“不合理”）

- 假阳性 (FP)：13（误判为“合理”）

- 真阴性 (TN)：87（正确判断为“不合理”）

### 3.5 准确度测评总结

1. **整体性能**

模型准确率仅 54.5%，接近随机猜测（50%），表明该 0.8B 小模型在本任务上难以准确理解文本逻辑。


2. **召回率极低（22.0%）**

模型将大量真正合理的文本（78 条）错误地判断为“不合理”。

原因推测：

- 模型对长文本的语义理解能力有限，容易受到文本中“虽合理但带有复杂修饰”的内容干扰。

- 训练数据中可能缺乏对“任命书”这种正式文体的逻辑结构理解，导致模型倾向于保守输出“不合理”。

3. **精确率尚可（62.9%）**

当模型预测为“合理”时，有 62.9% 的几率是正确的。

但假阳性仍有 13 条，说明模型有时会将明显矛盾的反例误判为合理，尤其是那些错误比较隐晦或需要常识推理的样本。

4. **混淆矩阵解读**

模型明显偏向于输出“不合理”（总计 22+87 = 109 次“不合理”预测，而实际正反例各半）。

这种偏置导致大量正例被错判，但反例的识别率较高（87/100 = 87%）。模型在识别反例上表现尚可，但在识别正例上严重不足。

5. **结论与改进建议**

0.8B 的小型量化模型在处理需要细粒度逻辑推理的文本分类任务时能力有限，无法准确区分符合逻辑与不符合逻辑的任命证书。尽管对明显的反例有一定判断力，但对合理文本的误判率过高，整体表现不佳。

## 4. 技术总结

### 4.1 遇到的主要问题及解决方案


可以看到，我的测试代码有多个版本，最终采用的版本是 `AJohn_evaluation_v4` 和 `AJohn_evaluation_acc.py_v2` ，其中各版本更改如下：

- 性能测试

  - `AJohn_evaluation.py` 初步计算 TTFT TPOT E2E

  - `AJohn_evaluation_v2.py` 新增日志功能

  - `AJohn_evaluation_v3.py` 修复编码问题

  - `AJohn_evaluation_v4.py` 优化日志排版

- 准确度测试

  - `AJohn_evaluation_acc.py.py` 初步计算准确度

  - `AJohn_evaluation_acc.py_v2.py` 优化测试用例


1. **命令行参数编码乱码**

**问题**：通过 -p 传递中文 prompt 时，模型接收到的内容显示为乱码（如 ��򵥽���һ���˹�����）。

**原因**：Windows 下 subprocess.Popen 传递命令行参数时使用系统默认编码（GBK），而模型期望 UTF-8 编码。

**解决方案**：

- 将 prompt 写入临时 UTF-8 文件，通过 -f 参数传递文件路径，绕过命令行编码问题。

- 同时设置 Popen 的 encoding="utf-8" 正确解码模型输出。得到 `AJohn_evaluation_v3.py` 。


2. **输出中包含系统信息与思考内容**

**问题**：模型输出中混杂了启动 banner、命令帮助、提示符回显（>）以及模型内部思考过程，导致日志文件不纯净。

**解决方案**：

- 实现 clean_output() 函数，定位第一个 > 行作为输出起点，去除之前的所有系统信息。

-  增加关键词过滤，清除退出信息（Exiting...）等残留内容。

-  保留模型生成的完整回答（包括思考过程），便于分析模型行为。得到 `AJohn_evaluation_v4.py` 。

3. **测试数据的可复现性**

**问题**：最初采用随机生成文本的方式构造测试用例，导致每次运行结果不可复现，且模板重复率高。

**解决方案**：

- 手动构造 100 条正例和 100 条反例，涵盖多种逻辑错误类型（前后矛盾、事实冲突、职位撤销、资格不符等），确保每条文本唯一且具有代表性。

- 固定列表直接嵌入代码，保证后续测试结果可对比。得到 `AJohn_evaluation_acc.py_v2.py` 。

### 4.2 收获

1. **Windows 下与外部程序交互，中文最好通过文件传递**

在 Windows 上用 Python 调用外部程序时，如果参数里包含中文，很容易因为编码问题导致乱码。我试过直接通过命令行参数传递，结果模型接收到的全是乱码。后来改用先把中文内容写入一个 UTF-8 编码的临时文件，然后用 -f 参数把文件路径传进去，问题就解决了。以后但凡遇到中文，我都会优先考虑文件传参，避免在命令行里拼字符串。

2. **小模型在处理需要逻辑推理的任务时力不从心**

别看这个 0.8B 的模型日常聊天、写点短文还过得去，一旦需要理解文本里的矛盾（比如“任命某人”的同时又说“此人已离职”），它的判断就基本靠蒙。最终的准确率不到 55%，接近瞎猜。这说明小规模模型对隐含逻辑的理解能力有限，如果想做这类需要常识推理的任务，要么换成更大的模型（比如 7B 以上），要么针对这类数据进行微调。

3. **日志要记录完整，但内容要清晰可读**

为了便于后续分析，我保留了每条样本的 prompt、answer、性能指标和运行命令。但原始输出里混了很多系统启动信息、命令帮助、提示符回显等无用内容，非常影响阅读。所以我写了一个清理函数，把这些噪音过滤掉，只保留模型生成的回答部分。这样日志既保留了必要的信息，又不会让人看得眼花缭乱，人工复核也方便。