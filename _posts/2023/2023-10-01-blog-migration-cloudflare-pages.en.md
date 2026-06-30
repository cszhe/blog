---
layout: post
title: "Blog Migration: Trying Cloudflare Pages"
lang: en
date: 2023-10-01 20:24:00 +00:00
category: Work and Study
tags:
  - Geek
  - CloudFlare
slug: blog-migration-cloudflare-pages
original: /bo-ke-ban-jia-cloudflareshi-yong
ai_translated: true
---

My blog has been running for 20 years. I've migrated countless times, but luckily never lost data. I started with domestic Chinese blog service providers — back when internet management wasn't so strict. Sites like Blogbus and BlogCN let you create an account and start writing. But these free sites could shut down anytime. Blogbus, my first, did exactly that. Thankfully, blog migration tools worked well and I kept all my data.

Then I started hosting my own blog. First with WordPress — needed a domain and virtual hosting. Virtual hosting is just allocated space on a server where you install WordPress. I later realized WordPress is a maintenance nightmare: full of bugs, constantly attacked. Early WordPress didn't even support Unicode — all my articles became garbled. And with shared IPs, you never knew when your site would get blocked by the GFW — not necessarily because of your content, but because a "neighbor" on the same virtual host posted something problematic.

I eventually exported the WordPress database, wrote a script to convert everything to plain text, and moved to Pelican. Pelican is a static site generator written in Python — write in Markdown, generate static HTML. No more WordPress security worries since it's purely static. But you need somewhere to host the static files. Luckily, free static hosting abroad is plentiful.

I first put static files on GitHub, but GitHub was slow and interfered with by the GFW. GitHub has its own static site generator, Jekyll — also Markdown → static HTML. But Jekyll requires Ruby templates, and I don't know Ruby, so I passed.

Many cloud providers offer free VMs. Google Cloud gives you a free Linux VM — 2 vCPUs, 1 GB RAM — plenty for a blog. Host static files on a VM with a dedicated IP: fast, and as long as you don't post anything subversive, no GFW issues. Just install Ubuntu + Nginx, drop static files in the right directory, done. GitHub later added Actions, so I could auto-build with Pelican on push and SCP-deploy to the VM. Very convenient.

I also tried Oracle's free VMs — more generous than Google. Up to 4 VMs, choose your datacenter (Google seemed to only offer US). They even have ARM VMs with 12 GB RAM — overkill for a blog. I ran a media streaming server and a Minecraft server on it for my son and his friends.

I also experimented with Docker and Kubernetes: GitHub Actions builds a Docker image, pushes to Docker Hub, auto-deploys to Kubernetes. Too complex. Kubernetes is a maintenance nightmare — 2 major version upgrades per year, and you must keep up. A fully managed k8s service would be better, but self-managed is a pain. I gave up on k8s and stuck with Docker on a VM.

Then there's HTTPS. Nobody cared about it years ago, but now your site is basically broken without it. I've been using Let's Encrypt's free 3-month auto-renewing certificates for about 5 years without major issues.

Eventually I realized maintaining a VM is a huge burden. Script kiddies keep attacking. I use fail2ban to block attacks — here's a random log snippet: 3,278 attacks, 78 IPs banned. You constantly need to update the system and software, or you'll be compromised. Sometimes updating the system without updating software is still a problem. I'm confident my VM won't be breached, but it's annoying. You have to patch vulnerabilities as they emerge. Even Ubuntu LTS needs a major upgrade every 2 years. Constant `apt update && apt upgrade`. I automated some of it with Puppet, but it still grated.

```bash
webhost$ sudo fail2ban-client status sshd
Status for the jail: sshd
|- Filter
|  |- Currently failed:	0
|  |- Total failed:	3278
|  `- File list:	/var/log/auth.log
`- Actions
   |- Currently banned:	78
   |- Total banned:	988
   `- Banned IP list:	103.84.236.242 43.153.184.188 ...
```

So I decided to ditch the VM and find free static hosting with zero maintenance. I first tried Google's Firebase — static hosting with GitHub Actions deploying via Firebase API. But I don't trust Google — they're blocked in China already, Firebase might disappear too.

Then I found Cloudflare Pages. Cloudflare is a CDN provider; putting your site on Cloudflare makes it fast. They recently launched Pages — free static hosting with CDN, with seemingly unlimited storage (25 MB per file limit, which is fine). Cloudflare Pages connects to your GitHub repo via webhook: on every push, it auto-downloads, builds, and deploys. Supports most static site generators — no need to write GitHub Actions yourself.

Cloudflare Pages also supports custom domains. You can bind your domain to it. If Cloudflare Pages ever shuts down, you can migrate. Plus, many overseas services use Cloudflare. Unless the GFW blocks all Cloudflare IPs, it should be relatively safe.

I'll use it for now and see how long Cloudflare Pages lasts. If it doesn't work out, I'll migrate again.
