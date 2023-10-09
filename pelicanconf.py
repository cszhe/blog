#!/usr/bin/env python
# -*- coding: utf-8 -*- #
from __future__ import unicode_literals

AUTHOR = 'Zongjian He'
SITENAME = "Zongjian's blog"
SITEURL = ''

PATH = 'content'

TIMEZONE = 'Pacific/Auckland'

DEFAULT_LANG = 'en'

# Feed generation is usually not desired when developing
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None

# Blogroll
LINKS = (
    ('Pelican', 'http://getpelican.com/'),
    ('Google', 'http://www.google.com/'),
    ('AMD', 'http://www.amd.com/'),
)

# Social widget
SOCIAL = (
    ('Facebook', 'https://www.facebook.com/hezongjian'),
    ('Instagram', 'https://www.instagram.com/zongjian.he'),
    ('Twitter', 'https://twitter.com/omale'),
    ('Weibo', 'https://www.weibo.com/omale'),
    ('Github', 'https://github.com/cszhe'),
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

MARKDOWN = {
    'extension_configs': {
        'markdown.extensions.codehilite': {'css_class': 'highlight'},
        'markdown.extensions.extra': {},
        'markdown.extensions.meta': {},
    },
    'output_format': 'html5',
}

DEFAULT_PAGINATION = 12

# Uncomment following line if you want document-relative URLs when developing
RELATIVE_URLS = True

THEME = "./external/themes/pelican-bootstrap3"

STATIC_PATHS = ['uploads', 'extra/favicon.ico', 'functions']
EXTRA_PATH_METADATA = {'extra/favicon.ico': {'path': 'favicon.ico'}}

# feed settings
FEED_DOMAIN = "https://www.hezongjian.com"
FEED_ALL_ATOM = 'feeds/all.atom.xml'
FEED_MAX_ITEMS = 12

GITHUB_URL = 'https://github.com/cszhe/blog' 

# pelican-bootstrap3 specific settings

JINJA_ENVIRONMENT = {'extensions': ['jinja2.ext.i18n']}
PLUGIN_PATHS = ['./external/plugins']
PLUGINS = ['i18n_subsites', 'tag_cloud', 'tipue_search']

# tipue_search settings
DIRECT_TEMPLATES = ('index', 'categories', 'tag', 'archives', 'search')

I18N_TEMPLATES_LANG = 'en'
DISPLAY_TAGS_ON_SIDEBAR = True
DISPLAY_TAGS_ON_SIDEBAR_LIMIT = 10
DISPLAY_LINKS_ON_SIDEBAR_LIMIT = 5
DISPLAY_TAGS_INLINE = True
DISPLAY_CATEGORIES_ON_SIDEBAR = True
DISPLAY_ARCHIVE_ON_SIDEBAR = True
SHOW_ARTICLE_CATEGORY = True
BOOTSTRAP_NAVBAR_INVERSE = True
LICENSE = 'CC-BY-NC-SA'
CC_LICENSE = "CC-BY-NC-SA"
