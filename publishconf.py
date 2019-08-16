#!/usr/bin/env python
# -*- coding: utf-8 -*- #
from __future__ import unicode_literals

AUTHOR = 'Zongjian He'
SITENAME = "Zongjian's blog"
SITEURL = ''

PATH = 'content'

TIMEZONE = 'Asia/Shanghai'

DEFAULT_LANG = 'en'

# Feed generation is usually not desired when developing
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None

# Blogroll
LINKS = (('Pelican', 'http://getpelican.com/'),
         ('Google', 'http://www.google.com/'),)

# Social widget
SOCIAL = (
    ('Facebook', 'https://www.facebook.com/hezongjian'),
    ('Twitter', 'https://twitter.com/hezongjian'),
    ('Weibo', 'https://www.weibo.com/omale'),
    # ('微信', 'omalechat', 'weixin')
    )

DISPLAY_CATEGORIES_ON_MENU = False
DISPLAY_PAGES_ON_MENU = False
MENUITEMS = (
    ('Home', './'),
    ('Categories', './categories.html'),
    ('Tags', './tags.html'),
    ('Archives', './archives.html'),
    # ('CV', '/pdfs/HouserCV.pdf')
    )

DIRECT_TEMPLATES = ('index', 'categories', 'authors', 'tags', 'archives', 'search')

DEFAULT_PAGINATION = 10

# Uncomment following line if you want document-relative URLs when developing
RELATIVE_URLS = True

THEME = "../pelican-themes/pelican-bootstrap3/"

STATIC_PATHS = ['images', 'uploads']

# pelican-bootstrap3 specific settings

JINJA_ENVIRONMENT = {'extensions': ['jinja2.ext.i18n']}
PLUGIN_PATHS = ['../pelican-plugins']
PLUGINS = ['i18n_subsites', 'tag_cloud', 'tipue_search']

I18N_TEMPLATES_LANG = 'en'
DISPLAY_TAGS_ON_SIDEBAR = True
DISPLAY_TAGS_INLINE = True
DISPLAY_CATEGORIES_ON_SIDEBAR = True
DISPLAY_ARCHIVE_ON_SIDEBAR = True
SHOW_ARTICLE_CATEGORY = True
BOOTSTRAP_NAVBAR_INVERSE = True
CC_LICENSE = "CC-BY-NC-SA"
