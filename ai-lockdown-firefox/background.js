let blocklist = [
  "chat.openai.com",
  "chatgpt.com",
  "api.openai.com",
  "platform.openai.com",
  "bard.google.com",
  "copilot.github.com",
  "perplexity.ai",
  "huggingface.co",
  "deepmind.com",
  "x.com",
  "grok.com",

  "synthesia.io",
  "midjourney.com",
  "canva.com",
  "looka.com",
  "elevenlabs.io",
  "murf.ai",
  "suno.ai",
  "udio.ai",
  "sudowrite.com",
  "rytr.me",
  "copy.ai",
  "toolsaday.com",
  "tealhq.com",
  "kickresume.com",
  "reclaim.ai",
  "clockwise.so",
  "gamma.app",
  "cursor.so",
  "notebooklm.ai",
  "deepseek.ai",
  "fathom.video",
  "nyota.ai",
  "opusclip.com",
  "veo.ai",
  "grok.ai",
  "claude.ai",
  "qwen.ai",
  "perplexity.ai",
  "facebook.com",
  "twitter.com",
  "instagram.com",
  "tiktok.com",
  "pinterest.com",
  "reddit.com",
  "netflix.com",
  "twitch.tv",
  "steamcommunity.com",
  "playstation.com",
  "xbox.com",
  "leagueoflegends.com",
  "battle.net",
  "callofduty.com",
  "4chan.org",
  "8ch.net",
  "theuselessweb.com",
  "chromeweblab.com",
  "staggeringbeauty.com",
  "weavesilk.com",
  "areyouahuman.com",
  "findthedifference.com",
  "staggeringbeauty.com",
  "chromeweblab.com",
  "theuselessweb.com",
];
let studyMode = false;

browser.storage.local.get("blocklist").then((data) => {
  if (data.blocklist && data.blocklist.length) blocklist = data.blocklist;
});

// Intercept requests
function blockRequest(details) {
  if (!studyMode) return {};
  for (let host of blocklist) {
    if (details.url.includes(host)) {
      console.log("Blocking:", details.url);
      // Instead of redirect, cancel and open blocked page
      browser.tabs.update(details.tabId, {
        url: browser.runtime.getURL("blocked.html"),
      });
      return { cancel: true }; // Cancel original request
    }
  }
  return {};
}

browser.webRequest.onBeforeRequest.addListener(
  blockRequest,
  { urls: ["<all_urls>"], types: ["main_frame"] },
  ["blocking"]
);

// Listen to popup messages
browser.runtime.onMessage.addListener((msg) => {
  if (msg.type === "SET_STUDY_MODE") studyMode = msg.enabled;
  else if (msg.type === "SET_BLOCKLIST") blocklist = msg.blocklist;
  else if (msg.type === "GET_STATUS")
    return Promise.resolve({ enabled: studyMode });
});
