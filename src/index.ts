import { app, Tray } from "electron";

import { createTrayMenu } from "./tray/createMenu";
import { createTray } from "./tray/createTray";

import reloader from "electron-reloader";

reloader(module, {
  debug: false,
  watchRenderer: true,
});

let tray: Tray;

app.on("ready", async () => {
  tray = createTray();
  await createTrayMenu(tray);
});
