# Agent Guide

This file describes the repository structure, conventions, and workflows to help AI coding agents work effectively in this codebase.

## What this repository is

A personal blog by Zongjian He (Jason He), running since 2002/2004. It is a static site generated with [Jekyll](https://jekyllrb.com/) using the [Chirpy theme](https://github.com/cotes2020/jekyll-theme-chirpy) with local customizations.

- **Primary site:** https://hezongjian.com (Cloudflare Pages)
- **Mirror:** https://gh.hezongjian.com (GitHub Pages)
- **Mirror:** https://fb.hezongjian.com (Firebase Hosting)
- **Docker image:** `hezongjian/blog:latest` (multi-arch: amd64 + aarch64)

## Tech stack

| Layer | Technology |
|---|---|
| Site generator | Jekyll (Ruby) |
| Theme | jekyll-theme-chirpy (local copy in `_themes/chirpy`) |
| Styling | SCSS (`_sass/`) |
| JavaScript | Vanilla JS (`_javascript/`) |
| Containerisation | Docker (Nginx serving pre-built `_site/`) |
| CI/CD | GitHub Actions |
| Primary hosting | Cloudflare Pages |

## Repository layout

```
_config.yml          # Main Jekyll configuration
_posts/              # Blog posts, organised by year (YYYY/YYYY-MM-DD-slug.md)
_tabs/               # Static pages: about, archives, categories, tags
_layouts/            # HTML layout templates
_includes/           # Reusable HTML partials
_sass/               # SCSS source files
_javascript/         # JavaScript source files
_data/               # YAML data files (authors, contact, media, share, locales)
_plugins/            # Custom Jekyll plugins (Ruby)
_themes/chirpy/      # Local copy of the Chirpy theme (excluded from build)
assets/              # Compiled/static assets (CSS, JS, images)
uploads/             # Uploaded media, organised by year
Gemfile              # Ruby dependencies
Dockerfile           # Builds a multi-arch nginx image from _site/
nginx.conf           # Nginx config used inside the Docker image
firebase.json        # Firebase Hosting config
.firebaserc          # Firebase project config
```

## Local development

```bash
bundle install
bundle exec jekyll serve
```

The site is served at http://localhost:4000 by default.

To do a production build (output goes to `_site/`):

```bash
bundle exec jekyll build
```

## Writing posts

Posts live under `_posts/YYYY/` and follow the naming convention:

```
YYYY-MM-DD-slug.md
```

Typical front matter:

```yaml
---
title: "Post title"
date: YYYY-MM-DD HH:MM:SS +1200
categories: [Category]
tags: [tag1, tag2]
---
```

Key `_config.yml` defaults applied to all posts:
- `layout: post`
- `comments: true`
- `toc: true`
- `math: true`
- `permalink: /:title`

Posts are written in Markdown and may be in English or Chinese (or both). The timezone is `Pacific/Auckland` (NZST/NZDT).

## CI/CD workflows (`.github/workflows/`)

| File | Trigger | What it does |
|---|---|---|
| `jekyll.yml` | Push to `master` | Builds with Jekyll → deploys to GitHub Pages via `peaceiris/actions-gh-pages` |
| `firebase.yml` | Push to `master` | Builds with Jekyll → deploys to Firebase Hosting (`fb.hezongjian.com`) |
| `conatainerisation.buidx.yml` | Push to `master` | Builds Jekyll site → builds multi-arch Docker image → pushes to Docker Hub |

All three workflows use Ruby 3.2 and run `bundle install` + `bundle exec jekyll build`.

### Required secrets

| Secret | Used by |
|---|---|
| `REGISTRY_USERNAME` / `REGISTRY_PASSWORD` | Docker Hub login (containerisation workflow) |
| `GCP_SA_KEY` | Firebase deployment |
| `GITHUB_TOKEN` | GitHub Pages deployment (provided automatically) |

## Jekyll plugins used

- `jekyll-paginate` – pagination (10 posts per page)
- `jekyll-seo-tag` – SEO meta tags
- `jekyll-remote-theme` – loads the Chirpy theme
- `jekyll-archives` – generates category and tag archive pages
- `jekyll-sitemap` – generates `sitemap.xml`
- `jekyll-include-cache` – caches `{% include %}` calls for faster builds
- `jekyll-redirect-from` – URL redirects via front matter

## Theme customisations

The Chirpy theme files are copied locally into `_themes/chirpy/` (excluded from the Jekyll build via `_config.yml`). Customisations are made directly to `_layouts/`, `_includes/`, `_sass/`, and `_javascript/` in the repository root, which override the remote theme.

## Docker image

The `Dockerfile` is a two-step process: Jekyll builds the site to `_site/`, then the CI workflow copies `_site/` and `nginx.conf` into an `nginx:alpine` image. The image is published as `hezongjian/blog:latest` and supports `linux/amd64` and `linux/aarch64`.
