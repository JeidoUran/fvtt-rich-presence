Hooks.once("ready", () => {
  const socket = new WebSocket("ws://localhost:35601");

  socket.onopen = () => {
    console.log("[RP] Connecté au client RichPresence");

    setInterval(() => {
      const actor = game.actors.get(game.user.character?.id);
      const classId = actor?.system?.details?.originalClass;
      const classItem = actor?.items?.find(item => item.type === "class" && item._id === classId);
      const payload = {
        userName: game.user.name,
        scene: game.scenes.active?.name ?? "???",
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
      socket.send(JSON.stringify(payload));
    }, 2000);
  };

  socket.onerror = (err) => {
    console.warn("[RP] Échec de connexion WebSocket :", err);
  };
});
