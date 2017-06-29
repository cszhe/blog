#!/usr/bin/env python3
# -*- coding: utf-8 -*- #

import glob
import re
import os
from slugify import slugify
from typing import List



CONTENT_PATH = '/Users/hezongjian/dev/blog/content'
IMAGE_PATH = '/Users/hezongjian/dev/blog/content/uploads/'

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


def remove_srcset(file_content : str) -> str:
    regex = r"srcset=\".*\""

    ret  = re.sub(regex, '', file_content)

    return ret



def grab_jianshu(file_content : str, file_title : str) -> str:
    import urllib.request

    ret = file_content
    slug_title = slugify(file_title)

    regex = r"\((http:\/\/.*jianshu.io.*)\)"

    matches = re.finditer(regex, file_content)

    for count, match in enumerate(matches):
        the_url = match.group(1)
        image_file = IMAGE_PATH + "{}.{}.png".format(slug_title, count)
        if not os.path.exists(image_file):
            urllib.request.urlretrieve(the_url, image_file)

        # replace
        relative_file = "/uploads/{}.{}.png".format(slug_title, count)
        ret = ret.replace(match.group(1), relative_file)
    # end for

    return ret



def convert_all():
    """
    Only need to be execute once
    :return:
    """
    md_files = glob.glob('{}/*.md'.format(CONTENT_PATH))

    for file in md_files:
        file_name = os.path.basename(file)
        print('processing {}'.format(file_name))
        content = ''
        with open(file, 'r') as f:
            content = f.read()
            content = sort_tags(content)
            content = sort_category(content)
            content = relative_graph(content)
            content = remove_srcset(content)

            # grab images
            content = grab_jianshu(content, file_name)

        with open(file, 'w') as f:
            f.write(content)

    #
    # convert_image_path()

if __name__ == '__main__':
    md_files = ['{}/{}'.format(CONTENT_PATH, '新西兰工作记.md')]
    for file in md_files:
        file_name = os.path.basename(file)
        print('processing {}'.format(file_name))
        content = ''
        with open(file, 'r') as f:
            content = f.read()
            content = sort_tags(content)
            content = sort_category(content)
            content = relative_graph(content)
            content = remove_srcset(content)

            # grab images
            content = grab_jianshu(content, file_name)

        with open(file, 'w') as f:
            f.write(content)

