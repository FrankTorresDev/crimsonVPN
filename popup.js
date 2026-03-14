let allServers = [];
let activeServerId = null;
let connected = false;
let dropdownOpen = false;
let searchQuery = '';

// DOM
const connectBtn      = document.getElementById('connectBtn');
const statusLabel     = document.getElementById('statusLabel');
const selectedFlag    = document.getElementById('selectedFlag');
const selectedName    = document.getElementById('selectedName');
const selectedLoc     = document.getElementById('selectedLocation');
const dropdownTrigger = document.getElementById('dropdownTrigger');
const dropdownPanel   = document.getElementById('dropdownPanel');
const triggerFlag     = document.getElementById('triggerFlag');
const triggerName     = document.getElementById('triggerName');
const triggerChevron  = document.getElementById('triggerChevron');
const panelSearch     = document.getElementById('panelSearch');
const panelList       = document.getElementById('panelList');

// ── Init ─────────────────────────────────
async function init() {
  const data = await chrome.storage.local.get(['proxyServers', 'activeServerId', 'connected']);
  allServers     = data.proxyServers || [];
  activeServerId = data.activeServerId || null;
  connected      = data.connected || false;

  if (!activeServerId && allServers.length > 0) {
    activeServerId = allServers[0].id;
  }

  updateHero();
  updateTrigger();
}

// ── Hero ─────────────────────────────────
function updateHero() {
  const server = allServers.find(s => s.id === activeServerId);
  connectBtn.classList.remove('on', 'loading');
  statusLabel.className = 'status-label';
  selectedLoc.className = 'selected-location';

  if (connected && server) {
    connectBtn.classList.add('on');
    statusLabel.textContent = 'Connected';
    statusLabel.classList.add('on');
    selectedFlag.textContent = server.flag || '🌐';
    selectedName.textContent = server.label;
    selectedLoc.classList.add('on');
  } else if (server) {
    statusLabel.textContent = 'Tap to connect';
    selectedFlag.textContent = server.flag || '🌐';
    selectedName.textContent = server.label;
    selectedLoc.classList.add('has-selection');
  } else {
    statusLabel.textContent = 'Choose a location';
    selectedFlag.textContent = '';
    selectedName.textContent = 'No location selected';
  }
}

// ── Trigger pill ─────────────────────────
function updateTrigger() {
  const server = allServers.find(s => s.id === activeServerId);
  if (server) {
    triggerFlag.textContent = server.flag || '🌐';
    triggerName.textContent = server.label;
    triggerName.classList.remove('placeholder');
  } else {
    triggerFlag.textContent = '🌐';
    triggerName.textContent = 'Select a location…';
    triggerName.classList.add('placeholder');
  }
}

// ── Dropdown open/close ──────────────────
function openDropdown() {
  dropdownOpen = true;
  dropdownTrigger.classList.add('open');
  dropdownPanel.classList.add('open');
  panelSearch.value = '';
  searchQuery = '';
  renderPanel();
  setTimeout(() => panelSearch.focus(), 50);
}

function closeDropdown() {
  dropdownOpen = false;
  dropdownTrigger.classList.remove('open');
  dropdownPanel.classList.remove('open');
}

dropdownTrigger.addEventListener('click', (e) => {
  e.stopPropagation();
  dropdownOpen ? closeDropdown() : openDropdown();
});

document.addEventListener('click', (e) => {
  if (dropdownOpen && !dropdownPanel.contains(e.target) && !dropdownTrigger.contains(e.target)) {
    closeDropdown();
  }
});

panelSearch.addEventListener('input', () => {
  searchQuery = panelSearch.value.trim().toLowerCase();
  renderPanel();
});

// Stop panel clicks from bubbling to document
dropdownPanel.addEventListener('click', e => e.stopPropagation());

// ── Render panel list ────────────────────
function renderPanel() {
  panelList.innerHTML = '';

  let servers = [...allServers];
  if (searchQuery) {
    servers = servers.filter(s =>
      s.label.toLowerCase().includes(searchQuery) ||
      (s.region || '').toLowerCase().includes(searchQuery)
    );
  }

  if (servers.length === 0) {
    panelList.innerHTML = '<div class="panel-empty">No locations found</div>';
    return;
  }

  // Group by region
  const groups = {};
  servers.forEach(s => {
    const r = s.region || 'Other';
    if (!groups[r]) groups[r] = [];
    groups[r].push(s);
  });

  Object.entries(groups).forEach(([region, list]) => {
    // Region label
    const regionEl = document.createElement('div');
    regionEl.className = 'panel-region-label';
    regionEl.textContent = region;
    panelList.appendChild(regionEl);

    // Options
    list.forEach(server => {
      const opt = document.createElement('div');
      opt.className = 'panel-option' + (server.id === activeServerId ? ' active' : '');
      opt.innerHTML = `
        <span class="opt-flag">${server.flag || '🌐'}</span>
        <span class="opt-name">${server.label}</span>
        <span class="opt-tick">✓</span>
      `;
      opt.addEventListener('click', () => {
        selectServer(server.id);
        closeDropdown();
      });
      panelList.appendChild(opt);
    });
  });
}

// ── Select server ────────────────────────
function selectServer(id) {
  activeServerId = id;
  updateTrigger();

  if (connected) {
    (async () => {
      connectBtn.classList.add('loading');
      await chrome.runtime.sendMessage({ type: 'DISCONNECT_PROXY' });
      const res = await chrome.runtime.sendMessage({ type: 'CONNECT_PROXY', serverId: id });
      connected = res?.ok ?? false;
      connectBtn.classList.remove('loading');
      updateHero();
    })();
  } else {
    updateHero();
  }
}

// ── Connect / disconnect ─────────────────
connectBtn.addEventListener('click', async () => {
  if (!activeServerId) { openDropdown(); return; }

  connectBtn.classList.add('loading');
  statusLabel.textContent = connected ? 'Disconnecting…' : 'Connecting…';

  if (connected) {
    const res = await chrome.runtime.sendMessage({ type: 'DISCONNECT_PROXY' });
    connected = res?.ok ? false : connected;
  } else {
    const res = await chrome.runtime.sendMessage({ type: 'CONNECT_PROXY', serverId: activeServerId });
    connected = res?.ok ? true : connected;
  }

  connectBtn.classList.remove('loading');
  updateHero();
});

init();