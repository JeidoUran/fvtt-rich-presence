import { WebSocketServer } from 'ws';

let wss;

Hooks.once("ready", () => {
  if (!game.user.isGM) return; // Un seul utilisateur démarre le serveur

  wss = new WebSocketServer({ port: 35600 }); // Port local

  wss.on("connection", (ws) => {
    console.log("RichPresence connecté");

    const sendData = () => {
      const data = getCurrentRichPresenceData();
      ws.send(JSON.stringify(data));
    };

    // Envoyer les données à l'ouverture
    sendData();

    // Re-envoyer périodiquement ou via events
    const interval = setInterval(sendData, 2000);

    ws.on("close", () => clearInterval(interval));
  });
});
