AUTHOR = "Johannes Ammon"
SITENAME = "Schockraum-Spickzettel"
SITEURL = ""

PATH = "content"
THEME = "theme"
TIMEZONE = "Europe/Berlin"
STATIC_PATHS = ["sw.js"]
# JINJA2CONTENT_TEMPLATES = ["../tools"]
OUTPUT_PATH = "output/"
DEFAULT_DATE = "fs"
DEFAULT_DATE_FORMAT = "%d.%m.%Y"

DEFAULT_LANG = "de"

# Feed generation is usually not desired when developing
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None

# Blogroll
LINKS = ()

# Social widget
SOCIAL = ()

DEFAULT_PAGINATION = False
DEFAULT_METADATA = {
    "status": "draft",
}
DELETE_OUTPUT_DIRECTORY = True
# Uncomment following line if you want document-relative URLs when developing
# RELATIVE_URLS = True

MARKDOWN = {
    "extension_configs": {
        # 'markdown.extensions.codehilite': {'css_class': 'highlight'},
        "markdown.extensions.extra": {},
        "markdown.extensions.meta": {},
    },
    "output_format": "html5",
}

PAGE_ORDER_BY = "sorting"
