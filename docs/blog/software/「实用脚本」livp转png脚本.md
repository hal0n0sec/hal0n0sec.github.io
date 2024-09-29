---
date: 2024-09-18 01:20:00
---

# 「实用脚本」livp转png脚本

## 什么是livp格式文件？

`livp`是一种苹果公司开发的图像文件格式，主要用于iOS设备上拍摄的实况照片（Live Photos）。

1. 文件结构：`livp`文件实际上是一个包含多个元素的压缩包，它通常包括：
    - 一张高质量的静态JPEG图像。
    - 一段MOV格式的短视频。
    - 元数据信息。

2. 功能特点：
    - 实况照片：捕捉拍摄瞬间前后的短暂动态场景。
    - 互动性：用户可以通过按压照片来查看动态效果。
    - 兼容性：在不支持Live Photos的设备上仍可显示为静态图像。

3. 图像大小：`livp`文件通常比普通照片大，因为它包含了额外的视频数据，文件大小可能在2~5MB之间，具体取决于内容复杂度。

## 转换为PNG图像脚本

遇到需要将手机拍摄的动态图片上传到Windows系统的电脑上，但是在Windows上如果不借用第三方软件，就无法查看图片，由此使用改脚本，将`livp`后缀的文件转换为`.png`后缀的静态图像文件。

脚本具体内容：

```python
import os
from PIL import Image
import zipfile
import io
from pillow_heif import register_heif_opener

# 注册HEIF opener
register_heif_opener()


def convert_livp_to_png(input_dir, output_dir):
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    for filename in os.listdir(input_dir):
        if filename.lower().endswith('.livp'):
            livp_path = os.path.join(input_dir, filename)

            try:
                with zipfile.ZipFile(livp_path, 'r') as zip_ref:
                    # 查找HEIC图像文件
                    image_file = next((f for f in zip_ref.namelist() if f.lower().endswith('.heic')), None)

                    if image_file:
                        with zip_ref.open(image_file) as file:
                            img_data = file.read()

                        # 使用Pillow打开HEIC图像
                        img = Image.open(io.BytesIO(img_data))

                        # 生成输出文件名
                        output_filename = os.path.splitext(filename)[0] + '.png'
                        output_path = os.path.join(output_dir, output_filename)

                        # 保存为PNG
                        img.save(output_path, 'PNG')
                        print(f"转换成功: {filename} -> {output_filename}")
                    else:
                        print(f"警告: 在 {filename} 中没有找到HEIC图像文件")
            except Exception as e:
                print(f"处理 {filename} 时出错: {str(e)}")

input_directory = 'C:/xx/xx/xx'         # 改成实际的livp文件所在的目录路径
output_directory = 'C:/xx/xx/xx/out'    # 改成需要的输出目录路径
convert_livp_to_png(input_directory, output_directory)
```
