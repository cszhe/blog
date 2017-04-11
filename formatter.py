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

def sort_tags(file_content : str) -> str:
    myreg = r"tags:\n(\W*- \w*)*"
    full = re.search(myreg, file_content)

    if full:
        repl = full.group(0).replace('-', ',').replace('\n', '').replace(',', '', 1)
        matches = re.sub(myreg, repl, file_content)
        return matches
    else:
        return file_content


def sort_category(file_content : str) -> str:
    myreg = r"categories:\n(\W*- \w*)*"
    full = re.search(myreg, file_content)

    if full:
        repl = full.group(0).replace('-', ',').replace('\n', '').replace(',', '', 1)
        repl = repl.replace('categories', 'category')
        repl = repl.split(',')[0]
        matches = re.sub(myreg, repl, file_content)
        return matches
    else:
        return file_content


def relative_graph(file_content : str) -> str:
    ret = file_content

    regex = r"(http://\S*/wp-content)/uploads/\S*"
    matches = re.finditer(regex, file_content)

    for _, match in enumerate(matches):
        repl = match.group(0).replace(match.group(1), '')
        ret = ret.replace(match.group(0), repl)

    return ret


if __name__ == '__main__':
    md_files = glob.glob('{}/*.md'.format(CONTENT_PATH))
    # md_files = ['/Users/hezongjian/dev/blog/content/2015-08-31-%e6%99%ae%e6%9e%97%e6%96%af%e9%a1%bf%e5%a4%a7%e5%ad%a6%e5%8f%82%e8%a7%82%e8%ae%b0.md']

    for file in md_files:
        print('processing {}'.format(file))
        content = ''
        with open(file, 'r') as f:
            content = f.read()
            content = sort_tags(content)
            content = sort_category(content)
            content = relative_graph(content)

        with open(file, 'w') as f:
            f.write(content)

    #
    # convert_image_path()
