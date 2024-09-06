---
date: 2024-05-20 00:14:36
---

# 「终端shell」Oh My Zsh终端美化

先给大家看看最终美化后的效果，个人比较喜欢极简的风格。

![oh-my-zsh.gif](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/oh-my-zsh.gif)

1. 安装基本工具，部署基本环境

```bash
# 更新软件源
sudo apt-get update && sudo apt-get -y upgrade
# 安装zsh git curl
sudo apt-get install zsh git curl -y
```

![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240515094504.png)


2. 使用当前用户身份，设置默认终端环境为zsh

```bash
chsh -s /bin/zsh
```

3. 安装oh-my-zsh

```bash
sh -c "$(curl -fsSL https://install.ohmyz.sh)"
```

4. 安装过程中需要同意使用oh-my-zsh的配置模板覆盖现有的`.zshrc`（zsh当前的环境变量配置文件）。

![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240515094641.png)

5. 接下来就可以设置自己的主题，主题所在的目录是`~/.oh-my-zsh/themes`

![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240515094843.png)

6. 更换主题需要修改当前的`~/.zshrc`文件，修改的字段是：

```bash
ZSH_THEME="想要设置的主题名称"
```

![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240515095203.png)

修改完成后，保存退出，然后重置环境变量：

```bash
source ~/.zshrc
```

![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240515095315.png)


7. 或者也可以使用powerlevel10K这个项目，主题比较好看

```bash
git clone --depth=1 https://github.com/romkatv/powerlevel10k.git ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k
```

然后在`~/.zshrc`文件中设置`ZSH_THEME="powerlevel10k/powerlevel10k`，重置环境变量文件后系统会引导对powerlevel10k进行设置，或者使用命令`p10k configure`

![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240515101209.png)


安装字体，可以在该[网站](https://www.nerdfonts.com/font-downloads)下载喜欢的字体。

8. 安装插件
- `zsh-autosuggestions`插件：输入命令时，会自动推测想要可能输入的命令，按下右键可快速采用。下载该插件到目录`~/.oh-my-zsh/custom/plugins`目录。

```bash
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
```

![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240515100757.png)


- `zsh-syntax-highlighting`插件：是一个命令语法校验插件，命令错误则会显示红色。

```bash
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
```

![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240515100812.png)


- `z`：内置插件，用来文件夹快速跳转。

![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240515100920.png)


9. 启用插件

修改`~/.zshrc`文件，修改部分如下：

```bash
plugins=(git zsh-autosuggestions zsh-syntax-highlighting z extract web-search)
```

![image.png](https://takuya-1305710862.cos.ap-shanghai.myqcloud.com/A1ways0nline/pic/20240515100553.png)

10. 然后重新读取环境变量文件就可以了

```bash
source .zshrc
```

