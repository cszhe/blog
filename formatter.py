#!/usr/bin/env python3
# -*- coding: utf-8 -*- #

import glob
import re
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

def sort_tags(file_content : str, tag : str) -> str:
    myreg = r"{}:\n(\W*- \w*)*".format(tag)
    full = re.search(myreg, file_content)

    if full:
        repl = full.group(0).replace('-', ',').replace('\n', '').replace(',', '', 1)
        repl = repl.replace('categories', 'category')
        matches = re.sub(myreg, repl, file_content)
        return matches
    else:
        return file_content





if __name__ == '__main__':
    md_files = glob.glob('{}/*.md'.format(CONTENT_PATH))

    for file in md_files:
        print('processing {}'.format(file))
        content = ''
        with open(file, 'r') as f:
            content = f.read()
            content = sort_tags(content, 'tags')
            content = sort_tags(content, 'categories')

        with open(file, 'w') as f:
            f.write(content)

    #
    # convert_image_path()
