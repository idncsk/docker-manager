import { app, Tray } from "electron";

import { createTrayMenu } from "./tray/createMenu";
import { createTray } from "./tray/createTray";
import { listener } from "./tray/listener";

let tray: Tray;

app.on("ready", async () => {
  tray = createTray();
  listener(tray);
  await createTrayMenu(tray);
});
