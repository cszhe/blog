# blog


[![Build and Deploy](https://github.com/cszhe/blog/actions/workflows/jekyll.yml/badge.svg)](https://github.com/cszhe/blog/actions/workflows/jekyll.yml)
[![Build and Deploy to Firebase](https://github.com/cszhe/blog/actions/workflows/firebase.yml/badge.svg)](https://github.com/cszhe/blog/actions/workflows/firebase.yml)
[![Containerization_Buildx](https://github.com/cszhe/blog/actions/workflows/conatainerisation.buidx.yml/badge.svg)](https://github.com/cszhe/blog/actions/workflows/conatainerisation.buidx.yml)

Personal blog written in Markdown, generated with [Jekyll](https://jekyllrb.com/), and deployed to Cloudflare Pages.

## Deployment

- **Primary:** [https://hezongjian.com](https://www.hezongjian.com) (Cloudflare Pages)
- **Mirror:** [https://gh.hezongjian.com](https://gh.hezongjian.com) (GitHub Pages)
- **Mirror:** [https://fb.hezongjian.com](https://fb.hezongjian.com) (Firebase Hosting)

## Theme

Uses [Jekyll Chirpy Theme](https://github.com/cotes2020/jekyll-theme-chirpy) with local customizations.

## Development

```bash
bundle install
bundle exec jekyll serve
```

## History

- Migrated from Pelican to Jekyll for better GitHub Pages compatibility
- Originally deployed to Firebase and Kubernetes
- Now hosted on Cloudflare Pages
