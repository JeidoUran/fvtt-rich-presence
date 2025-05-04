Hooks.once("init", () => {
    game.settings.register("fvtt-rich-presence", "enableRichPresence", {
        name: "RICHPRESENCE.Settings.Enable.Name",
        hint: "RICHPRESENCE.Settings.Enable.Hint",
        scope: "client",
        config: true,
        requiresReload: true,
        default: false,
        type: Boolean
      });
  });
  