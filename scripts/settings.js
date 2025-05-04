Hooks.once("init", () => {
    game.settings.registerMenu("fvtt-rich-presence", "clientDownload", {
        name: "RICHPRESENCE.Settings.ClientDownload.Name",
        hint: "RICHPRESENCE.Settings.ClientDownload.Hint",
        label: "RICHPRESENCE.Settings.ClientDownload.Label",
        icon: "fa-solid fa-download",
        type: ClientDownload,
        restricted: false
    });
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
  
  class ClientDownload extends FormApplication {
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            id: "fvtt-rich-presence-client-download",
            title: "ClientDownload",
            template: "templates/settings/menu.html"
        });
    }

    render() {
        window.open("https://github.com/JeidoUran/fvtt-player-client/releases", "_blank");
        return null;
    }
}