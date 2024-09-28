---
date: 2024-09-28 01:00:00
---

# 「实用脚本」Chrome代理启动器

![GIF_proxychrome](../../public/GIF_chromeproxy.gif)

平时在我们渗透测试过程中都需要使用到 burpsuite，我们可能只想要特定的流量经过burp的代理，而有一部分的流量并不需要经过burp代理，之前的处理方式是打开两个不同的浏览器（例如 firefox），一个用来正常的访问web站点，一个浏览器用来针对测试站点来使用burp抓取数据包。

现在可以经过以下这个脚本，运行之后可以单独的运行一个经过了代理的chrome浏览器实例，而这个Chrome实例是完全独立的，与未进过代理的Chrome进程之间相互独立，因此就无需运行其他浏览器，工作中变得更加高效。



代码如下：
```python
import logging
import random
import string
import sys
import subprocess
import os
import tempfile

"""
实现打开一个新的Chrome浏览器，并通过burp进行代理
这个脚本适用于 macOS 系统，以下是一些关键点的说明：
    - 脚本接受一个命令行参数：代理的端口
    - 它会启动一个新的chrome进程，使用指定的代理设置
    - 新的Chrome实例使用单独的用户数据目录剋，确保与其他的Chrome实例相互隔离
    
使用方法：
    在终端中运行：python3 chromeproxy_for_macos.py 8080
"""

logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')

def find_chrome_path():
    """
    在macos系统上查找chrome可执行文件
    
    返回值：str类型，chrome可执行文件的路径，如果没有找到则返回None
    """
    default_path = "Applications/Google Chrome.app/contents/MacOS/Google Chrome"
    
    if os.path.exists(default_path):
        return default_path
    
    try:
        result = subprocess.run(["mdfind", "kMDItemCFBundleIdentifier == 'com.google.Chrome'"],
                                capture_output=True, text=True, check=True)
        paths = result.stdout.strip().split("\n")
        if paths:
            return os.path.join(paths[0], "Contents/MacOS/Google Chrome")
    except subprocess.CalledProcessError:
        pass
    
    return None

def generate_random_string(lenght=10):
    """
    生成指定长度的随机字符串
    
    参数 length: int类型，要生成的字符串长度，默认长度为10
    返回值：str类型，生成的随机字符串
    """
    return ''.join(random.choices(string.ascii_lowercase + string.digits, k=lenght))

def launch_chrome_with_proxy(proxy_port):
    """
    启动一个新的chrome实例，使用指定的代理设置
    
    参数 proxy_port：str类型，代理服务器的端口
    """
    chrome_path = find_chrome_path()
    if not chrome_path:
        logging.error("Chrome executable not found, Please make sure Chrome is installed!")
        return
    
    logging.info(f"Using Chrome path: {chrome_path}")
    
    user_data_dir = tempfile.mkdtemp(prefix="chrome_proxy_")
    logging.info(f"Using temporary user data directory: {user_data_dir}")
    
    proxy_server = f"127.0.0.1:{proxy_port}"
    
    remote_debugging_port = random.randint(10000, 60000)
    
    command = [
        chrome_path,
        f"--user-data-dir={user_data_dir}",
        f"--proxy-server={proxy_server}",
        "--no-first-run",
        "--no-default-browser-check",
        f"--remote-debugging-port={remote_debugging_port}",
        "--new-window",
        "about:blank"
    ]
    
    logging.info(f"Launching Chrome with Command: {' '.join(command)}")
    
    try:
        env = os.environ.copy()
        env["CHROME_ISOLATED_INSTANCE"] = generate_random_string()
        
        subprocess.Popen(command, env=env)
        logging.info("Chrome launched successfully")
        print(f"Chrome launched with proxy {proxy_server}")
        print("You can now browse websites through this chrome instance, and the traffic will be proxied")
    except Exception as e:
        logging.error(f"An error occurred: {str(e)}")
        
if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python3 chromeproxy_for_macos.py <proxy_port>")
        sys.exit(1)
        
    
    proxy_port = sys.argv[1]
    launch_chrome_with_proxy(proxy_port)
```

然后在环境变量配置文件中添加`alias`，具体如下：
```bash
alias chromeproxy="python3 /path/to/chromeproxy_for_macos.py 8080"
```

重新加载环境变量文件
```bash
source .zshrc
```

