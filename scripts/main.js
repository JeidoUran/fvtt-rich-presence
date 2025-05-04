function sendFallbackAndClose() {
  const ws = window._richPresenceSocket;
  ws.close();

  if (window._richPresenceInterval) {
    clearInterval(window._richPresenceInterval);
    delete window._richPresenceInterval;
  }
  if ("_richPresenceSocket" in window) {
    delete window._richPresenceSocket;
  }
}

Hooks.once("ready", () => {
  const enabled = game.settings.get("fvtt-rich-presence", "enableRichPresence");
  
  if (!enabled) {
    sendFallbackAndClose();
    return;
  }

  if (window._richPresenceSocket?.readyState === WebSocket.OPEN) {
    console.log("[RP] WebSocket is already active, won't connect again");
    return;
  }

  const ws = new WebSocket("ws://localhost:35601");
  window._richPresenceSocket = ws;

  ws.onopen = () => {
    console.log("[RP] Connected to RichPresence Client");
    window._richPresenceInterval = setInterval(() => {
        const actor = game.actors.get(game.user.character?.id);
        const classId = actor?.system?.details?.originalClass;
        const classItem = actor?.items?.find(item => item.type === "class" && item._id === classId);
        const payload = {
          userName: game.user.name,
          inCombat: game.combat?.started ?? false,
          actorName: actor?.name ?? null,
          hp: actor?.system?.attributes?.hp,
          isGM: game.user.isGM,
          totalUsers: game.users.size,
          onlineUsers: game.users.filter(e => e.active).length,
          worldName: game.data.world.title,
          className: classItem?.name,
          classLevel: classItem?.system.levels,
          worldId: game.world?.id,
          sceneId: game.scenes.active?.id
        };
        ws.send(JSON.stringify(payload));
      }, 5000);
    };

    ws.onerror = (err) => console.warn("[RP] WebSocket error :", err);
    ws.onclose = () => {
      console.log("[RP] WebSocket closed");

      delete window._richPresenceSocket;
      if (window._richPresenceInterval) {
        clearInterval(window._richPresenceInterval);
        delete window._richPresenceInterval;
      }
    };
  });
  