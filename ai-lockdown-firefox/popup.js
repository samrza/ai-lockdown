const toggle = document.getElementById("studyToggle");
const area = document.getElementById("blocklistArea");
const saveBtn = document.getElementById("saveBtn");
const timerSelect = document.getElementById("timerSelect");
const startTimerBtn = document.getElementById("startTimerBtn");
const timerStatus = document.getElementById("timerStatus");

browser.runtime.sendMessage({ type: "GET_STATUS" }).then((resp) => {
  if (resp && resp.enabled) toggle.checked = true;
});

browser.storage.local.get(["blocklist", "lockUntil"]).then((data) => {
  if (data.blocklist && data.blocklist.length)
    area.value = data.blocklist.join("\n");
  else
    area.value = [
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
      "claude.ai",
    ].join("\n");
  if (data.lockUntil && Date.now() < data.lockUntil) {
    updateTimerStatus(data.lockUntil);
    disableControls();
  }
});

toggle.addEventListener("change", () => {
  browser.runtime.sendMessage({
    type: "SET_STUDY_MODE",
    enabled: toggle.checked,
  });
});

saveBtn.addEventListener("click", () => {
  const lines = area.value
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
  browser.runtime
    .sendMessage({ type: "SET_BLOCKLIST", blocklist: lines })
    .then(() => alert("Blocklist saved."));
});

startTimerBtn.addEventListener("click", () => {
  const minutes = parseInt(timerSelect.value);
  if (minutes > 0) {
    const lockUntil = Date.now() + minutes * 60 * 1000;
    browser.storage.local.set({ lockUntil });
    browser.runtime.sendMessage({ type: "SET_STUDY_MODE", enabled: true });
    toggle.checked = true;
    updateTimerStatus(lockUntil);
    disableControls();
  }
});

function updateTimerStatus(lockUntil) {
  const interval = setInterval(() => {
    const remaining = lockUntil - Date.now();
    if (remaining <= 0) {
      timerStatus.textContent = "";
      enableControls();
      browser.storage.local.remove("lockUntil");
      clearInterval(interval);
    } else {
      const mins = Math.floor(remaining / 60000);
      const secs = Math.floor((remaining % 60000) / 1000);
      timerStatus.textContent = `Locked for ${mins}m ${secs}s`;
    }
  }, 1000);
}

function disableControls() {
  toggle.disabled = true;
  timerSelect.disabled = true;
  startTimerBtn.disabled = true;
}

function enableControls() {
  toggle.disabled = false;
  timerSelect.disabled = false;
  startTimerBtn.disabled = false;
}
