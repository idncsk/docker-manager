import { app, Tray } from "electron";

import { createTrayMenu } from "./tray/createMenu";
import { createTray } from "./tray/createTray";

try {
  const reloader = import("electron-reloader")
  reloader.then(item => item.default(module))
} catch (_) {}

let tray: Tray;

app.on("ready", async () => {
  tray = createTray();
  await createTrayMenu(tray);
});
