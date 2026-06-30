---
layout: post
title: "Who's Been Eating the Trash?"
lang: en
date: 2025-09-17 17:06
category: Work and Study
tags:
  - AI
  - LLM
slug: whos-eating-the-trash
original: /dao-di-shui-zai-chi-la-ji
ai_translated: true
---

I built a little toy that uses an LLM to respond to web requests. The code is short enough to paste here:

```python
#!/usr/bin/env python3
from cerebras.cloud.sdk import Cerebras
import os
import logging
from logging.handlers import RotatingFileHandler
from flask import Flask, request
from pathvalidate import sanitize_filename
import dotenv
dotenv.load_dotenv()

client = Cerebras(
  api_key=os.environ.get("CEREBRAS_API_KEY"),
)

app = Flask(__name__)

os.makedirs("html", exist_ok=True)
os.makedirs("logs", exist_ok=True)

logger = logging.getLogger("ai_server")
logger.setLevel(logging.INFO)
formatter = logging.Formatter("%(asctime)s %(levelname)s %(message)s")

console_handler = logging.StreamHandler()
console_handler.setFormatter(formatter)
logger.addHandler(console_handler)

file_handler = RotatingFileHandler("logs/requests.log", maxBytes=5 * 1024 * 1024, backupCount=5)
file_handler.setFormatter(formatter)
logger.addHandler(file_handler)

@app.route('/', defaults={'path': ''}, methods=['GET', 'POST'])
@app.route('/<path:path>', methods=['GET', 'POST'])
def catch_all(path):
    req_path = request.full_path.strip("?")
    client_ip = request.remote_addr or "-"
    logger.info("Incoming request: method=%s path=%s client=%s UA=%s", request.method, req_path, client_ip, request.headers.get("User-Agent"))

    path = req_path
    filename = f"html/" + sanitize_filename(path) + ".html"
    if os.path.isfile(filename):
        with open(filename, "r") as f:
            content = f.read()
            return content

    try:
        result = client.chat.completions.create(
            messages=[
                {"role": "user", "content": f"""You are a web server. A request has just come in on the path {path}.
                    Respond with HTML/CSS/JS that is appropriate for that path.
                    Only return the HTML/CSS/JS, nothing else.
                    Do not include any comments or explanations.
                    Try to make the web page as beautiful and functional as possible.
                    Don't mention that this is a simulation, make it as realistic as possible.
                    You can add relative links if appropriate, but if the user follows a relative link, you'll have to handle that too, so be sure to pass enough context for yourself to understand what you're doing in the URL.
                """
            }],
            model="gpt-oss-120b",
        ).choices[0].message.content
    except Exception as e:
        logger.exception("Model request failed for path=%s", path)
        return ("<h1>Internal Server Error</h1>", 500)

    with open(filename, "w") as f:
        f.write(result)
    return result, {"Content-Type": "text/html"}

if __name__ == '__main__':
    app.run(debug=True, port=7890)
```

The code accepts any URL path, sends it to the LLM, and returns a generated web page. I host it at https://wario.hezongjian.com/. Visit https://wario.hezongjian.com/training, and it sends the path /training to the LLM, which generates a page. Looks something like this:

![training](/uploads/2025/AInternet/training.png)

Free tier can't generate images, so those are broken, but everything else works. The content is entirely made up — that's fine for creative stuff. Hallucination is a feature, not a bug, when you're generating fake web pages. It's not diagnosing your illness or managing your investments.

At first it was just a fun experiment. Some of the generated pages were surprisingly convincing:

Chinese:
- [Shanghai Metro](https://wario.hezongjian.com/上海地铁.html)
- [Oriental Pearl Tower](https://wario.hezongjian.com/东方明珠.html)

English:
- [University of Auckland](https://wario.hezongjian.com/universityofauckland.html)
- [New Zealand](https://wario.hezongjian.com/newzealand.html)

After a few days, I noticed something: some pages were actually *usable*. Like this [Password Generator](https://wario.hezongjian.com/passwordgenerator.html). You can choose password strength and it generates one for you. Fully functional. This is what people mean when they say AI can replace junior programmers — your average coder with a few years of HTML/JS experience might not write this as cleanly.

Then I realized: this thing is a honeypot for hackers. There are countless script kiddies scanning websites with automated tools, looking for admin panels — /admin, /login, /wp-admin, /user, /cpanel, /config, /setup, /test, /debug, /.env, /.git, /backup, /old, /data, etc. If your site has these paths, they'll try to break in. If not, they move on. Since my site generates a fake page for every path, they think they've found something:

- [Admin](https://wario.hezongjian.com/admin.html)

It returns this:

![admin](/uploads/2025/AInternet/admin.png)

Pretty convincing, right? It looks like a real admin dashboard, complete with financial data. Of course, it's all fake.

## Going Off the Rails

I let this run for a while. One day, I got "too many requests" errors. The free token quota was exhausted. I'd started with Google Cloud's Gemini model, but it was too slow, so I switched to Cerebras — much faster. They advertise 14,400 requests and 1,000,000 tokens per day. Used up in half a day. I checked the html directory: over 200MB of generated HTML pages in less than two weeks. Plain text HTML — no images, no media.

But who was making all these requests? I added logging — IP addresses and User-Agent strings — and waited another two weeks.

## Analysis

Even without fancy tools, three sources stood out at a glance:

- `compatible; Googlebot/2.1; +http://www.google.com/bot.html`
- `compatible; GPTBot/1.2; +https://openai.com/gptbot`
- `compatible; SemrushBot/7~bl; +http://www.semrush.com/bot.html`

Let's see what each was doing:

### Googlebot

Google's crawler. No surprise there — they crawl most of the web. But it was hilarious what it thought my site was. It treated it like a tech forum, crawling paths like /forum, /thread, /post, /reply, /topic, /viewtopic, /viewforum. Examples:

- /community/forums/storage/cloud-storage-alternatives
- /topic/emerging-tech/ai-automation
- /posts/restful-api-design

Then it decided my site was Microsoft's MSDN documentation, crawling MSDN paths:

- /msdn/documentation/azure/networking/network-interfaces/
- /msdn/learn/azure/cognitive-services-path
- /msdn/tutorials/azure-functions-serverless/http-trigger

The AI happily generated these fake pages. But here's the problem: MSDN is official Microsoft documentation. If Google indexes these AI-generated fake MSDN pages, programmers searching for documentation might find wrong or misleading information. That's dangerous.

### GPTBot

OpenAI's crawler, collecting data for training their GPT models. The irony: my site generates pages using OpenAI's GPT OSS model. Is it eating its own dog food? Training on self-generated data — I guess that's one form of unsupervised learning. There's been a lot of talk about "distillation" — some call it learning, others call it theft. This is similar: the model feeds itself, trains on its own output, and convinces itself it's amazing. A bit like Master Ma's martial arts.

GPTBot was broad in its interests. It crawled knowledge-base paths:

- /kb/guides/managing-storage/file-systems
- /docs/sdks/javascript
- /solutions/iot/security

And event-related paths:

- /events/cloud-native-summit
- /sports/motorsports/wec

Imagine someone wanting to attend this "Cloud Native Summit" — only to find it doesn't exist. Awkward.

### SemrushBot

Semrush is less famous than Google or OpenAI. They do SEO-related work, collecting data to improve their services.

Their bot was laser-focused — it was convinced my site was Microsoft MSDN documentation:

- /msdn/documentation/windows/drivers/kernel-mode-drivers/memory-management/
- /msdn/documentation/net/apis/System/Linq
- /msdn/documentation/windows/api-reference/networking/winsock/introduction/
- /msdn/documentation/azure/tutorials/ai-ml/mlops-azureml/ml-governance

Why do both Googlebot and SemrushBot think my site is MSDN? I have my suspicions that they share data behind the scenes, but no proof.

## Afterword

I eventually shut the site down. It's wasteful — burning electricity and compute for no real benefit. More importantly, it's polluting the internet. LLM-generated content gets consumed by another LLM for training. It's like a person talking nonsense to themselves, and another person listening intently, thinking it's meaningful conversation. It's not. The end result is garbage in, garbage out. Shutting it down felt like the right thing to do — protecting the internet from itself.
