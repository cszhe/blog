# Jekyll Themes

This blog uses a custom Jekyll theme based on the Minima theme.

## Why not Minima?

The official `jekyll-theme-minima` is only compatible with Jekyll 3.8, but this blog uses Jekyll 4.4.1 for better features and performance.

## Available Theme Options

For Jekyll 4.x, you can use:

1. **Custom theme** (current) - We built our own layout with proper styling
2. **minima 2.x/3.x** - Forks of Minima compatible with Jekyll 4
3. **Other themes** - Search for themes on [GitHub](https://github.com/topics/jekyll-theme)

## To Change Theme

1. Update `_config.yml` with `theme: your-theme-name`
2. Add theme to `Gemfile`: `gem "jekyll-theme-your-theme"`
3. Remove custom `_includes/` and `_layouts/` if not needed
4. Run `bundle install` and `bundle exec jekyll build`
