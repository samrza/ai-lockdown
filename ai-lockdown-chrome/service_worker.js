const BLOCK_PAGE = chrome.runtime.getURL("blocked.html");

// default blocklist (edit/add as needed)
const defaultHosts = [
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

function makeRules(hostPatterns) {
  const rules = [];
  let id = 1;
  for (const p of hostPatterns) {
    rules.push({
      id: id++,
      priority: 1,
      action: {
        type: "redirect",
        redirect: { url: BLOCK_PAGE },
      },
      condition: {
        urlFilter: p,
        resourceTypes: ["main_frame"],
      },
    });
  }
  return rules;
}

async function enableBlocking() {
  const rules = makeRules(await loadBlocklist());
  try {
    await chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: (
        await chrome.declarativeNetRequest.getDynamicRules()
      ).map((r) => r.id),
      addRules: rules,
    });
    console.log("Study Mode enabled — rules added:", rules.length);
  } catch (e) {
    console.error("Failed to set rules", e);
  }
}

async function disableBlocking() {
  try {
    const existing = await chrome.declarativeNetRequest.getDynamicRules();
    const ids = existing.map((r) => r.id);
    if (ids.length) {
      await chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: ids,
      });
    }
    console.log("Study Mode disabled — rules removed");
  } catch (e) {
    console.error("Failed to remove rules", e);
  }
}

async function loadBlocklist() {
  return new Promise((res) => {
    chrome.storage.local.get(["blocklist"], (data) => {
      if (
        data.blocklist &&
        Array.isArray(data.blocklist) &&
        data.blocklist.length
      ) {
        res(data.blocklist);
      } else {
        res(defaultHosts);
      }
    });
  });
}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg && msg.type === "SET_STUDY_MODE") {
    if (msg.enabled) enableBlocking();
    else disableBlocking();
    sendResponse({ status: "ok" });
  } else if (msg && msg.type === "GET_STATUS") {
    chrome.declarativeNetRequest.getDynamicRules().then((rules) => {
      sendResponse({ enabled: rules.length > 0 });
    });
    return true;
  } else if (msg && msg.type === "SET_BLOCKLIST") {
    chrome.storage.local.set({ blocklist: msg.blocklist }, () => {
      chrome.declarativeNetRequest.getDynamicRules().then((rules) => {
        if (rules.length) enableBlocking();
        sendResponse({ status: "saved" });
      });
    });
    return true;
  }
});
