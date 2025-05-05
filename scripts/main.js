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
    ui.notifications.notify(game.i18n.localize("RICHPRESENCE.Notifications.Connected"));
    window._richPresenceInterval = setInterval(() => {
        const sys       = game.system.id;
        const actor     = game.actors.get(game.user.character?.id);
        const pf2eClass = actor?.class;
        
        const classItems = sys === "dnd5e"
          ? actor?.items.filter(i => i.type === "class") || []
          : sys === "pf2e"
            ? [pf2eClass].filter(Boolean)
            : [];
        
        const classDisplay = classItems.length > 0
          ? classItems
          .map(ci => {
            let lvl = null;
            if (sys === "dnd5e") {
              lvl = ci.system?.levels;
            } else if (sys === "pf2e") {
              lvl = actor.system?.details?.level?.value;
            }
            return `${ci.name}${lvl != null ? ` - Level ${lvl}` : ""}`;
          })
          .join(" / ")
      : null;

        const payload = {
          userName:      game.user.name,
          inCombat:      game.combat?.started ?? false,
          actorName:     actor?.name ?? null,
          hp:            actor?.system?.attributes?.hp,
          isGM:          game.user.isGM,
          totalUsers:    game.users.size,
          onlineUsers:   game.users.filter(u => u.active).length,
          worldName:     game.data.world.title,
          className:     classDisplay,
          worldId:       game.world?.id,
          sceneId:       game.scenes.active?.id
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
  