# 「LLM」大模型本地部署

Xorbits Inference是一个开源平台，用于简化各种AI模型的运行和集成，借助Xinference，你可以使用任何开源的LLM、嵌入模型和多模态模型在云端或者本地环境中运行推理，并创建强大的AI应用，通过Xinference，可以轻松的一键部署自己的模型或内置的前沿开源模型。

## 0x01 本地部署平台比较

`ollama vs Xinference`

| 特性       | OLLAMA                               | Xinference                     |
| ---------- | ------------------------------------ | ------------------------------ |
| 主要用途   | 低资源推理优化                       | 多模型、多引擎通用推理平台     |
| 硬件适应性 | 高灵活性、适合低端到高端硬件         | 主要适用于高端硬件             |
| 延迟       | 低延迟、适合实时应用                 | 根据配置不同，延迟可能较高     |
| 模型支持   | 可能有限，专注于优化的模型           | 广泛支持多种模型和格式         |
| 引擎支持   | 可能专注于特定推理引擎               | 支持TensoFlow、PyTorch、ONNX等 |
| 扩展性     | 较低                                 | 高扩展性，适合大模型部署       |
| 集成难度   | 简单，适合快速部署                   | 复杂。适合定制化需求的部署     |
| 资源需求   | 较低，适合低资源场景                 | 较高，适合需要高性能的场景     |
| 优化特点   | 针对推理优化，特别是低端硬件         | 更广泛的优化选择，支持长上下文 |
| 用户群体   | 开发者、工程师，尤其在资源有限的时候 | 大规模企业、需要复杂推理的用户 |

## 0x02 Xinference 部署大模型

首先，我们需要准备一个3.9以上的python环境来运行Xinference，建议先根据 conda 官网文档来安装 conda。

### 2.1 安装Anaconda

Anaconda是一个广泛用于数据科学和机器学习领域的开源软件发行版，它旨在提供一个便捷的环境来管理 python 和 R 编程语言的各种数据科学工具、库和依赖项。Anaconda内置了包管理器 conda，使得用户可以轻松创建、管理和切换虚拟环境，并安装数千个数据科学、机器学习、深度学习和科学计算相关的包。

要在ubuntu 22.04上安装Anaconda：

1. 首先，使用 curl 从官方网站下载Anaconda安装脚本，

```bash
sunshine@ollama:~/tools/anaconda$ curl --output anaconda.sh https://repo.anaconda.com/archive/Anaconda3-2024.10-1-Linux-x86_64.sh
```

2. 下载后，执行下载的Anaconda安装脚本

```bash
sunshine@ollama:~/tools/anaconda$ ls -al
总计 1076668
drwxrwxr-x 2 sunshine sunshine       4096 10月 26 09:19 .
drwxrwxr-x 3 sunshine sunshine       4096 10月 26 09:19 ..
-rw-rw-r-- 1 sunshine sunshine 1102495056 10月 26 09:21 anaconda.sh
sunshine@ollama:~/tools/anaconda$ chmod +x anaconda.sh 
sunshine@ollama:~/tools/anaconda$ bash anaconda.sh 
```

在安装过程中需要接收Anaconda许可协议，确认安装位置。

3. 安装完成后，激活安装

```bash
sunshine@ollama:~$ source .bashrc 
(base) sunshine@ollama:~$ 
```

4. 验证安装，可以使用以下命令：

```bash
(base) sunshine@ollama:~$ conda list
# packages in environment at /home/sunshine/anaconda3:
#
# Name                    Version                   Build  Channel
_anaconda_depends         2024.10             py312_mkl_0  
_libgcc_mutex             0.1                        main  
_openmp_mutex             5.1                       1_gnu  
aiobotocore               2.12.3          py312h06a4308_0  
aiohappyeyeballs          2.4.0           py312h06a4308_0  
aiohttp                   3.10.5          py312h5eee18b_0  
aioitertools              0.7.1              pyhd3eb1b0_0  
aiosignal                 1.2.0              pyhd3eb1b0_0  
alabaster                 0.7.16          py312h06a4308_0  
altair                    5.0.1           py312h06a4308_0  
anaconda-anon-usage       0.4.4           py312hfc0e8ea_100  
anaconda-catalogs         0.2.0           py312h06a4308_1  
anaconda-client           1.12.3          py312h06a4308_0  
anaconda-cloud-auth       0.5.1           py312h06a4308_0  
anaconda-navigator        2.6.3           py312h06a4308_0  
anaconda-project          0.11.1          py312h06a4308_0  
annotated-types           0.6.0           py312h06a4308_0  
anyio                     4.2.0           py312h06a4308_0  
aom                       3.6.0                h6a678d5_0  
appdirs                   1.4.4              pyhd3eb1b0_0  
archspec                  0.2.3              pyhd3eb1b0_0  
```

### 2.2 Xinference 本地源码安装

使用conda创建一个 3.11 的python环境

```bash
(base) sunshine@ollama:~$ conda create --name xinference python=3.11
Channels:
 - defaults
Platform: linux-64
Collecting package metadata (repodata.json): done
Solving environment: done

## Package Plan ##

  environment location: /home/sunshine/anaconda3/envs/xinference

  added / updated specs:
    - python=3.11


The following packages will be downloaded:

    package                    |            build
    ---------------------------|-----------------
    pip-24.2                   |  py311h06a4308_0         2.8 MB
    python-3.11.10             |       he870216_0        32.9 MB
    setuptools-75.1.0          |  py311h06a4308_0         2.2 MB
    wheel-0.44.0               |  py311h06a4308_0         145 KB
    ------------------------------------------------------------
                                           Total:        38.1 MB

The following NEW packages will be INSTALLED:

  _libgcc_mutex      pkgs/main/linux-64::_libgcc_mutex-0.1-main 
  _openmp_mutex      pkgs/main/linux-64::_openmp_mutex-5.1-1_gnu 
  bzip2              pkgs/main/linux-64::bzip2-1.0.8-h5eee18b_6 
  ca-certificates    pkgs/main/linux-64::ca-certificates-2024.9.24-h06a4308_0 
  ld_impl_linux-64   pkgs/main/linux-64::ld_impl_linux-64-2.40-h12ee557_0 
  libffi             pkgs/main/linux-64::libffi-3.4.4-h6a678d5_1 
  libgcc-ng          pkgs/main/linux-64::libgcc-ng-11.2.0-h1234567_1 
  libgomp            pkgs/main/linux-64::libgomp-11.2.0-h1234567_1 
  libstdcxx-ng       pkgs/main/linux-64::libstdcxx-ng-11.2.0-h1234567_1 
  libuuid            pkgs/main/linux-64::libuuid-1.41.5-h5eee18b_0 
  ncurses            pkgs/main/linux-64::ncurses-6.4-h6a678d5_0 
  openssl            pkgs/main/linux-64::openssl-3.0.15-h5eee18b_0 
  pip                pkgs/main/linux-64::pip-24.2-py311h06a4308_0 
  python             pkgs/main/linux-64::python-3.11.10-he870216_0 
  readline           pkgs/main/linux-64::readline-8.2-h5eee18b_0 
  setuptools         pkgs/main/linux-64::setuptools-75.1.0-py311h06a4308_0 
  sqlite             pkgs/main/linux-64::sqlite-3.45.3-h5eee18b_0 
  tk                 pkgs/main/linux-64::tk-8.6.14-h39e8969_0 
  tzdata             pkgs/main/noarch::tzdata-2024b-h04d1e81_0 
  wheel              pkgs/main/linux-64::wheel-0.44.0-py311h06a4308_0 
  xz                 pkgs/main/linux-64::xz-5.4.6-h5eee18b_1 
  zlib               pkgs/main/linux-64::zlib-1.2.13-h5eee18b_1 


Proceed ([y]/n)? y


Downloading and Extracting Packages:
                                                                                                                                            
Preparing transaction: done                                                                                                                 
Verifying transaction: done                                                                                                                 
Executing transaction: done                                                                                                                 
#
# To activate this environment, use
#
#     $ conda activate xinference
#
# To deactivate an active environment, use
#
#     $ conda deactivate

(base) sunshine@ollama:~$ conda activate xinference
(xinference) sunshine@ollama:~$ 
```

在安装Xinference时，将安装 Transformers 和 vLLM 作为Xinference的推理引擎后端

```bash
(xinference) sunshine@ollama:~$ pip install "Xinference"
(xinference) sunshine@ollama:~$ pip install "Xinference[ggml]"
(xinference) sunshine@ollama:~$ pip install "Xinference[pytorch]"
(xinference) sunshine@ollama:~$ pip install "Xinference[transformers]"
(xinference) sunshine@ollama:~$ pip install "Xinference[vllm]"
```

安装完Xinference之后，可以执行以下命令验证PyTorch是否正常：

```bash
(xinference) sunshine@ollama:~$ python -c "import torch; print(torch.cuda.is_available())"
```

安装 llama-cpp-python时可能会出现报错，报错原因是：使用 pip 安装时，是通过下载源码编译安装的，这时候如果系统没有相应的cmake和gcc版本就会出现报错，那么可以根据系统选择官方编译后的whl文件来进行下载离线安装。

```bash
(xinference) sunshine@ollama:~$ wget https://github.com/abetlen/llama-cpp-python/releases/download/v0.3.1/llama_cpp_python-0.3.1-cp311-cp311-linux_x86_64.whl
```

下载后执行安装命令

```bash
(xinference) sunshine@ollama:~$ pip install llama_cpp_python-0.3.1-cp311-cp311-linux_x86_64.whl 
```

还有一种方法就是，通过C++编译器进行编译的方式。

安装必要的编译工具：

```bash
sudo apt install build-essential cmake g++
```

然后正确的设置编译环境

```bash
export CC=gcc
export CXX=g++
pip install --no-cache-dir llama-cpp-python
```



### 2.3 启动Xinference服务

Xinference默认会在本地启动服务，端口默认为9997，配置 `-H 0.0.0.0`参数，非本地客户端也可以通过主机的IP地址来访问Xinference服务。

```bash
(xinference) sunshine@ollama:~$ xinference-local --host 0.0.0.0 --port 8888
```

![image-20241026103620943](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/image-20241026103620943.png)

在安装之后，我们就可以运行一些量化后的大模型。

## 0x03 什么是量化后的大模型

量化后的大模型是指在模型压缩和优化过程中，将深度学习模型的权重和激活值从原始的高精度（通常是32位浮点数，即`FP32`）降低到较低的精度（例如8位数、4位整数等）的过程，量化的目的是减少模型的内存占用和计算复杂度，从而加快推理速度并降低硬件要求，尤其是在资源受限的环境中。

将环境切换到 `Xinference`

```bash
conda env list
conda create -n xinference python=3.11.7
conda activate xinference
conda env list

(xinference) sunshine@ollama:~/桌面$ pip show xinference
Name: xinference
Version: 0.16.1
Summary: Model Serving Made Easy
Home-page: https://github.com/xorbitsai/inference
Author: Qin Xuye
Author-email: qinxuye@xprobe.io
License: Apache License 2.0
Location: /home/sunshine/anaconda3/envs/xinference/lib/python3.11/site-packages
Requires: aioprometheus, async-timeout, click, fastapi, gradio, huggingface-hub, modelscope, nvidia-ml-py, openai, passlib, peft, pillow, pydantic, python-jose, requests, sse-starlette, tabulate, timm, torch, tqdm, typing-extensions, uvicorn, xoscar
Required-by: 
```

## 0x04 运行大模型

运行了 Xinference 之后，我们就可以设置并运行各类大模型。

![CleanShot 2024-10-26 at 13.21.28@2x](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/picCleanShot%202024-10-26%20at%2013.21.28@2x.png)



接下来以千问模型所要设置的参数为例

可以使用以下命令查询与`qwen1.5-chat`模型相关的参数组合，以决定它能够怎样跑在各种推理引擎上。

```bash
xinference engine -e http://127.0.0.1:8888 --model-name qwen1.5-chate

(xinference) sunshine@ollama:~/桌面$ xinference engine -e http://127.0.0.1:8888 --model-name qwen1.5-chat
Name          Engine        Format      Size (in billions)  Quantization
------------  ------------  --------  --------------------  --------------
qwen1.5-chat  Transformers  pytorch                    0_5  4-bit
qwen1.5-chat  Transformers  pytorch                    0_5  8-bit
qwen1.5-chat  Transformers  pytorch                    0_5  none
qwen1.5-chat  Transformers  pytorch                    1_8  4-bit
qwen1.5-chat  Transformers  pytorch                    1_8  8-bit
qwen1.5-chat  Transformers  pytorch                    1_8  none
qwen1.5-chat  Transformers  pytorch                      4  4-bit
...........

参数解释：
1. Name：模型的名称
2. Engine：模型能够运行在哪些引擎上面，当前的是 Transformers 和 llama.cpp。
3. Format：格式
4. Size：模型的参数数量，以10亿为单位，这个参数代表了模型的大小和复杂性，参数量越大的模型表现能力越强，当然，对硬件的要求也越高。
5. Quantization：量化方法，量化到的精度
```

> Transformers 和 llama.cpp 的区别：
>
> - llama.cpp 一般是运行的是量化后的模型，速度比较快，但是精度有所缺失，所以质量有所缺失。
> - Transformers 是加载原版的模型，需要大显存才能运行起来，对显存的要求比较高。

接下来尝试运行一个qwen1.5-chat的模型，首先进行设置，然后点击小火煎就可以运行了。

![CleanShot 2024-10-26 at 13.42.50@2x](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/picCleanShot%202024-10-26%20at%2013.42.50@2x.png)

点击后，在后台控制台就会开始下载这个千问的模型了，经过一段时间等待和运行之后，本地大模型就部署成功了。

![CleanShot 2024-10-26 at 13.53.23@2x](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/picCleanShot%202024-10-26%20at%2013.53.23@2x.png)

并且我们也可以尝试和模型进行对话

![CleanShot 2024-10-26 at 13.57.19@2x](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/picCleanShot%202024-10-26%20at%2013.57.19@2x.png)

> 通常我们说的上下文 128k 是什么意思？
>
> 上下文128k，上下文通常指的是模型在处理输入时所能支持的最大令牌（token）数量为128000个，这个`k`指的是`千`。所以说，模型能够处理的上下文长度越长，代表模型的能力也就越强。

## 0x05 dify中配置Xinference中的本地大模型

在设置中选择模型供应商，然后选择 Xinference 选择添加模型。

模型类型选择 `LLM`，因为我们刚才添加的是大语言模型。

模型名称输入：`qwen1.5-chat`

服务器URL：`http://192.168.100.6:8888`

模型UID：输入 `qwen1.5-chat`

![CleanShot 2024-10-26 at 14.15.34@2x](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/picCleanShot%202024-10-26%20at%2014.15.34@2x.png)

添加之后，进行测试，可以看到，可以正常的聊天了，那么本地的LLM大模型就运行成功了。

![CleanShot 2024-10-26 at 14.20.25@2x](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/picCleanShot%202024-10-26%20at%2014.20.25@2x.png)