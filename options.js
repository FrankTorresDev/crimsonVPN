const ids = ["id", "label", "host", "port", "scheme", "flag", "region", "username", "password"];
const serverList = document.getElementById("serverList");
const saveSuccess = document.getElementById("saveSuccess");

function getFormValues() {
  return Object.fromEntries(ids.map((id) => [id, document.getElementById(id).value.trim()]));
}

function shieldIcon() {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>`;
}

async function renderServers() {
  const { proxyServers = [] } = await chrome.storage.local.get(["proxyServers"]);
  serverList.innerHTML = "";

  if (proxyServers.length === 0) {
    serverList.innerHTML = `
      <div class="empty-state">
        <span>🛡</span>
        No proxy servers configured yet
      </div>`;
    return;
  }

  proxyServers.forEach((server) => {
    const li = document.createElement("li");
    li.className = "server-item";
    li.innerHTML = `
      <div class="server-icon">${shieldIcon()}</div>
      <div class="server-info">
        <div class="server-name">${server.label}</div>
        <div class="server-meta">${server.host}:${server.port}</div>
      </div>
      <span class="scheme-badge">${server.scheme}</span>
      <button class="delete-btn" data-id="${server.id}">Delete</button>
    `;

    li.querySelector(".delete-btn").addEventListener("click", async () => {
      const { proxyServers: current = [] } = await chrome.storage.local.get(["proxyServers"]);
      const filtered = current.filter((s) => s.id !== server.id);
      await chrome.storage.local.set({ proxyServers: filtered });
      renderServers();
    });

    serverList.appendChild(li);
  });
}

document.getElementById("saveBtn").addEventListener("click", async () => {
  const form = getFormValues();

  if (!form.id || !form.label || !form.host || !form.port) {
    alert("Please fill in ID, label, host, and port.");
    return;
  }

  const { proxyServers = [] } = await chrome.storage.local.get(["proxyServers"]);

  const updated = [
    ...proxyServers.filter((server) => server.id !== form.id),
    { ...form, port: Number(form.port), flag: form.flag || "", region: form.region || "Other" }
  ];

  await chrome.storage.local.set({ proxyServers: updated });

  // Reset form
  ids.forEach((id) => {
    const el = document.getElementById(id);
    if (el.tagName === "SELECT") el.selectedIndex = 0;
    else el.value = "";
  });

  // Show success feedback
  saveSuccess.style.display = "block";
  setTimeout(() => { saveSuccess.style.display = "none"; }, 2500);

  renderServers();
});

renderServers();