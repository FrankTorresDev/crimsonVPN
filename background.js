chrome.runtime.onInstalled.addListener(async () => {
  const existing = await chrome.storage.local.get(["proxyServers"]);

  if (!existing.proxyServers) {
    await chrome.storage.local.set({
      proxyServers: [
        // ── United States ──────────────────────────────────────────
        {
          id: "us-nyc",
          label: "New York City",
          flag: "🇺🇸",
          region: "United States",
          scheme: "http",
          host: "YOUR_PROXY_HOST",
          port: 8080,
          username: "YOUR_USERNAME",
          password: "YOUR_PASSWORD"
        },
        {
          id: "us-la",
          label: "Los Angeles",
          flag: "🇺🇸",
          region: "United States",
          scheme: "http",
          host: "YOUR_PROXY_HOST",
          port: 8081,
          username: "YOUR_USERNAME",
          password: "YOUR_PASSWORD"
        },
        {
          id: "us-chi",
          label: "Chicago",
          flag: "🇺🇸",
          region: "United States",
          scheme: "http",
          host: "YOUR_PROXY_HOST",
          port: 8082,
          username: "YOUR_USERNAME",
          password: "YOUR_PASSWORD"
        },
        {
          id: "us-dal",
          label: "Dallas",
          flag: "🇺🇸",
          region: "United States",
          scheme: "http",
          host: "YOUR_PROXY_HOST",
          port: 8083,
          username: "YOUR_USERNAME",
          password: "YOUR_PASSWORD"
        },
        {
          id: "us-mia",
          label: "Miami",
          flag: "🇺🇸",
          region: "United States",
          scheme: "http",
          host: "YOUR_PROXY_HOST",
          port: 8084,
          username: "YOUR_USERNAME",
          password: "YOUR_PASSWORD"
        },
        {
          id: "us-sea",
          label: "Seattle",
          flag: "🇺🇸",
          region: "United States",
          scheme: "http",
          host: "YOUR_PROXY_HOST",
          port: 8085,
          username: "YOUR_USERNAME",
          password: "YOUR_PASSWORD"
        },
        {
          id: "us-sfo",
          label: "San Francisco",
          flag: "🇺🇸",
          region: "United States",
          scheme: "http",
          host: "YOUR_PROXY_HOST",
          port: 8086,
          username: "YOUR_USERNAME",
          password: "YOUR_PASSWORD"
        },
        {
          id: "us-atl",
          label: "Atlanta",
          flag: "🇺🇸",
          region: "United States",
          scheme: "http",
          host: "YOUR_PROXY_HOST",
          port: 8087,
          username: "YOUR_USERNAME",
          password: "YOUR_PASSWORD"
        },
        {
          id: "us-den",
          label: "Denver",
          flag: "🇺🇸",
          region: "United States",
          scheme: "http",
          host: "YOUR_PROXY_HOST",
          port: 8088,
          username: "YOUR_USERNAME",
          password: "YOUR_PASSWORD"
        },
        {
          id: "us-phx",
          label: "Phoenix",
          flag: "🇺🇸",
          region: "United States",
          scheme: "http",
          host: "YOUR_PROXY_HOST",
          port: 8089,
          username: "YOUR_USERNAME",
          password: "YOUR_PASSWORD"
        },

        // ── Europe ─────────────────────────────────────────────────
        {
          id: "gb-lon",
          label: "London",
          flag: "🇬🇧",
          region: "Europe",
          scheme: "http",
          host: "YOUR_PROXY_HOST",
          port: 8090,
          username: "YOUR_USERNAME",
          password: "YOUR_PASSWORD"
        },
        {
          id: "de-fra",
          label: "Frankfurt",
          flag: "🇩🇪",
          region: "Europe",
          scheme: "http",
          host: "YOUR_PROXY_HOST",
          port: 8091,
          username: "YOUR_USERNAME",
          password: "YOUR_PASSWORD"
        },
        {
          id: "fr-par",
          label: "Paris",
          flag: "🇫🇷",
          region: "Europe",
          scheme: "http",
          host: "YOUR_PROXY_HOST",
          port: 8092,
          username: "YOUR_USERNAME",
          password: "YOUR_PASSWORD"
        },
        {
          id: "nl-ams",
          label: "Amsterdam",
          flag: "🇳🇱",
          region: "Europe",
          scheme: "http",
          host: "YOUR_PROXY_HOST",
          port: 8093,
          username: "YOUR_USERNAME",
          password: "YOUR_PASSWORD"
        },
        {
          id: "se-sto",
          label: "Stockholm",
          flag: "🇸🇪",
          region: "Europe",
          scheme: "http",
          host: "YOUR_PROXY_HOST",
          port: 8094,
          username: "YOUR_USERNAME",
          password: "YOUR_PASSWORD"
        },
        {
          id: "ch-zur",
          label: "Zurich",
          flag: "🇨🇭",
          region: "Europe",
          scheme: "http",
          host: "YOUR_PROXY_HOST",
          port: 8095,
          username: "YOUR_USERNAME",
          password: "YOUR_PASSWORD"
        },

        // ── Asia Pacific ───────────────────────────────────────────
        {
          id: "jp-tok",
          label: "Tokyo",
          flag: "🇯🇵",
          region: "Asia Pacific",
          scheme: "http",
          host: "YOUR_PROXY_HOST",
          port: 8096,
          username: "YOUR_USERNAME",
          password: "YOUR_PASSWORD"
        },
        {
          id: "sg-sin",
          label: "Singapore",
          flag: "🇸🇬",
          region: "Asia Pacific",
          scheme: "http",
          host: "YOUR_PROXY_HOST",
          port: 8097,
          username: "YOUR_USERNAME",
          password: "YOUR_PASSWORD"
        },
        {
          id: "au-syd",
          label: "Sydney",
          flag: "🇦🇺",
          region: "Asia Pacific",
          scheme: "http",
          host: "YOUR_PROXY_HOST",
          port: 8098,
          username: "YOUR_USERNAME",
          password: "YOUR_PASSWORD"
        },
        {
          id: "kr-sel",
          label: "Seoul",
          flag: "🇰🇷",
          region: "Asia Pacific",
          scheme: "http",
          host: "YOUR_PROXY_HOST",
          port: 8099,
          username: "YOUR_USERNAME",
          password: "YOUR_PASSWORD"
        },
        {
          id: "in-mum",
          label: "Mumbai",
          flag: "🇮🇳",
          region: "Asia Pacific",
          scheme: "http",
          host: "YOUR_PROXY_HOST",
          port: 8100,
          username: "YOUR_USERNAME",
          password: "YOUR_PASSWORD"
        },

        // ── Americas ───────────────────────────────────────────────
        {
          id: "ca-tor",
          label: "Toronto",
          flag: "🇨🇦",
          region: "Americas",
          scheme: "http",
          host: "YOUR_PROXY_HOST",
          port: 8101,
          username: "YOUR_USERNAME",
          password: "YOUR_PASSWORD"
        },
        {
          id: "ca-van",
          label: "Vancouver",
          flag: "🇨🇦",
          region: "Americas",
          scheme: "http",
          host: "YOUR_PROXY_HOST",
          port: 8102,
          username: "YOUR_USERNAME",
          password: "YOUR_PASSWORD"
        },
        {
          id: "br-sao",
          label: "São Paulo",
          flag: "🇧🇷",
          region: "Americas",
          scheme: "http",
          host: "YOUR_PROXY_HOST",
          port: 8103,
          username: "YOUR_USERNAME",
          password: "YOUR_PASSWORD"
        },
        {
          id: "mx-mex",
          label: "Mexico City",
          flag: "🇲🇽",
          region: "Americas",
          scheme: "http",
          host: "YOUR_PROXY_HOST",
          port: 8104,
          username: "YOUR_USERNAME",
          password: "YOUR_PASSWORD"
        }
      ],
      connected: false,
      activeServerId: null,
      activeProxyAuth: null
    });
  }
});

async function getServerById(serverId) {
  const { proxyServers = [] } = await chrome.storage.local.get(["proxyServers"]);
  return proxyServers.find((server) => server.id === serverId);
}

async function setProxyConfig(server) {
  const config = {
    mode: "fixed_servers",
    rules: {
      singleProxy: {
        scheme: server.scheme,
        host: server.host,
        port: Number(server.port)
      },
      bypassList: ["localhost", "127.0.0.1"]
    }
  };

  return chrome.proxy.settings.set({
    value: config,
    scope: "regular"
  });
}

async function clearProxyConfig() {
  return chrome.proxy.settings.clear({
    scope: "regular"
  });
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "CONNECT_PROXY") {
    (async () => {
      try {
        const server = await getServerById(message.serverId);

        if (!server) {
          sendResponse({ ok: false, error: "Proxy server not found." });
          return;
        }

        await setProxyConfig(server);

        await chrome.storage.local.set({
          connected: true,
          activeServerId: server.id,
          activeProxyAuth: {
            username: server.username,
            password: server.password
          }
        });

        sendResponse({ ok: true, serverLabel: server.label });
      } catch (error) {
        sendResponse({ ok: false, error: error.message });
      }
    })();

    return true;
  }

  if (message.type === "DISCONNECT_PROXY") {
    (async () => {
      try {
        await clearProxyConfig();

        await chrome.storage.local.set({
          connected: false,
          activeServerId: null,
          activeProxyAuth: null
        });

        sendResponse({ ok: true });
      } catch (error) {
        sendResponse({ ok: false, error: error.message });
      }
    })();

    return true;
  }
});

chrome.webRequest.onAuthRequired.addListener(
  (details, callback) => {
    chrome.storage.local.get(["activeProxyAuth"]).then(({ activeProxyAuth }) => {
      if (!activeProxyAuth?.username || !activeProxyAuth?.password) {
        callback();
        return;
      }

      callback({
        authCredentials: {
          username: activeProxyAuth.username,
          password: activeProxyAuth.password
        }
      });
    });
  },
  { urls: ["<all_urls>"] },
  ["asyncBlocking"]
);