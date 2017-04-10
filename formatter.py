#!/usr/bin/env python3
# -*- coding: utf-8 -*- #

import glob
from typing import List



CONTENT_PATH = '/Users/hezongjian/dev/blog/content'

def convert_image_path(files : List):
    pass


"""
categories:
  - 未分类
tags:
  - iPhone
  - 软件
  
  
category: 未分类
tags:iPhone,软件

"""

def sort_tags(files : List) -> None:
    for file in files:
        with open(file, 'r+') as f:





if __name__ == '__main__':
    md_files = glob.glob('{}/*.md'.format(CONTENT_PATH))

    sort_tags(md_files)
    # convert_image_path()
