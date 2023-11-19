# Swoop - Private Search Engine 🌍🔒

### *Swoop* *is* *a* *secure* *and* *privacy-focused* *search* *engine* *leveraging* *Searx*, *NGINX*, *TypeScript*, *tRPC*, *and* *NextJS*. *Swoop* *was* *built* *to* *offer* *users* *a* *non-intrusive*, *non-tracking*, *and* *completely* *anonymous* *way* *to* *browse* *the* *web*.

## 🟢 [Launch live site](https://www.google.com/)

## Summary 📖
In today's digital landscape, privacy concerns have become increasingly important. Traditional search engines, despite their convenience, often leave traces of user metadata and create user profiles without explicit consent. This can lead to privacy invasions and curated search results that may not align with personal preferences.<br>

While privacy-focused alternatives like [StartPage](https://www.startpage.com/en/) and [DuckDuckGo](https://duckduckgo.com/?va=b&t=hc) provide a level of data security, they may still fall short in offering a truly tailored and comprehensive solution. However, with *Swoop*, you have the unique opportunity to harness the power of a fully customized and meticulously designed search engine. By leveraging this platform, you can ensure unmatched data security and a personalized search experience that aligns perfectly with your individual preferences and privacy requirements. Experience the freedom and peace of mind that comes from using *Swoop* for your private browsing needs.<br>

Swoop combines [Searx](https://searx.github.io/searx/), [NGINX](https://www.nginx.com/resources/glossary/nginx/), Next.js, and TypeScript to safeguard user privacy and deliver efficient search functionality. Swoop aggregates results from over 70 sources without tracking or profiling users, while offering [IP anonymization](https://complianz.io/are-your-ip-addresses-anonymized/), [SSL/TLS termination](https://en.wikipedia.org/wiki/TLS_termination_proxy), and zero advertisements.<br>

Swoop demonstrates the successful integration of open-source tools, efficient server-side rendering, and optimized proxy server configuration to deliver a seamless and secure search experience.
<br>
<br>

## Features 🛠️
- **Privacy-focused** - Swoop does not track or profile users, and it does not use cookies.
- **Secure** - Swoop uses SSL/TLS termination to encrypt all traffic between the client and the server.
- **Fast** - Swoop uses server-side rendering to deliver fast and efficient search results.
- **Customizable** - Swoop allows users to customize their search experience by selecting from a variety of search engines and categories.
- **Ad-free** - Swoop does not display advertisements.
- **Open-source** - Swoop is open-source and free to use.
<br>
<br>

## How it works 🤔
Swoop is built using [Searx](https://searx.github.io/searx/), [NGINX](https://www.nginx.com/resources/glossary/nginx/), [tRPC](https://trpc.io/), Next.js, and TypeScript. Searx is a privacy-respecting metasearch engine that aggregates results from over 70 sources. NGINX is a web server that is used to serve static content and reverse proxy. Next.js is a React framework that is used to build server-side rendered applications. TypeScript is a superset of JavaScript that is used to add static typing to JavaScript code.<br>

Swoop aims to protect the privacy of its users by not sharing users' [IP addresses](https://usa.kaspersky.com/resource-center/definitions/what-is-an-ip-address) or search history with the search engines from which results are gathered. [Tracking cookies](https://en.wikipedia.org/wiki/HTTP_cookie#Tracking) served by the search engines are blocked, preventing user-profiling-based results modification. By default, queries are submitted via [HTTP POST](https://en.wikipedia.org/wiki/POST_(HTTP)) to prevent users' query keywords from appearing in webserver logs. Swoop also offers the option to submit queries via [HTTP GET](https://en.wikipedia.org/wiki/GET_(HTTP)) for compatibility with search engines that do not support HTTP POST.<br>

Swoop sends anonymized queries to multiple search engines, which include popular search engines like Google, Bing, DuckDuckGo, and many others. Swoop does not rely on a fixed set of search engines but allows users to customize the list of search engines to include. Swoop also allows users to customize the list of categories from which results are gathered. By default, results are gathered from all categories, but users can choose to limit results to specific categories, such as images, videos, news, maps, and more.<br>

Swoop fetches the content on behalf of the user and delivers results without revealing the user's IP address or other indentifying information to the destination website.
<br>
<br>

## Architecture 🏗️
<br>

![swoop architecture](/public/assets/swoop-engine-arch.png)

<br>



