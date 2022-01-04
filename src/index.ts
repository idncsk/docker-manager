import { app, BrowserWindow, Tray } from "electron";

import reloader from "electron-reloader";
import { createTrayMenu } from "./tray/createMenu";
import { createTray } from "./tray/createTray";
import { listener } from "./tray/listener";

reloader(module, { debug: true, watchRenderer: true });

let mainwin;
let tray: Tray;

app.on("ready", async () => {
  mainwin = new BrowserWindow({});

  tray = createTray();
  listener(tray);
  await createTrayMenu(tray);
});
