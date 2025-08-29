# 🚫ai-lockdown

<p align="center">
  <img src="logo.png" alt="No AI Zone Logo" width="128" height="128">
</p>


**No AI Zone** is a browser extension designed to help you **focus during study sessions** by blocking AI tools and distracting websites. It includes a **Study Mode toggle**, a **lock timer**, and a customizable blocklist.

---

## Features

- 🚫 **Block AI Tools:** Prevent access to AI sites like ChatGPT, Bard, GitHub Copilot, Perplexity, and more.
- ⏳ **Lock Timer:** Set a timer to lock Study Mode for a specific duration.
- 📝 **Custom Blocklist:** Add/remove websites you want to block during study.
- 🔄 **Cross-browser:** Supports **Chrome (Manifest V3)** and **Firefox (Manifest V2)**.

---

## Installation

### Chrome

1. Download or clone this repository.
2. Open `chrome://extensions/` in your Chrome browser.
3. Enable **Developer mode**.
4. Click **Load unpacked** and select the `chrome/` folder.
5. Open the extension popup → toggle Study Mode → start timer → focus!

### Firefox

1. Download or clone this repository.
2. Open `about:debugging#/runtime/this-firefox` in Firefox.
3. Click **Load Temporary Add-on** and select `manifest.json` inside the `firefox/` folder.
4. Open the extension popup → toggle Study Mode → start timer → stay focused!

---

## Default Blocklist

### AI Tools

chat.openai.com
chatgpt.com
api.openai.com
platform.openai.com
bard.google.com
copilot.github.com
perplexity.ai
huggingface.co
deepmind.com
suno.ai
murf.ai
copy.ai
rytr.me
notion.so
midjourney.com

_You can customize the blocklist directly in the extension popup._

---

## Usage

1. Open the **No AI Zone** popup.
2. Toggle **Study Mode** to block AI sites.
3. Optionally, select a **Lock Timer** duration.
4. Edit the blocklist to add/remove sites as needed.

---

## Contributing

Feel free to submit issues, requests, or pull requests to improve the blocklist, add features, or enhance UI.

---

## License

This project is licensed under the **MIT License**.

---
