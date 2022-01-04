import { ipcMain, Notification, Tray } from "electron";
import { createMenu } from "./menu/create";

export function listener(tray: Tray) {
  tray.on("click", () => {
    createMenu()
      .then((menu) => {
        tray.popUpContextMenu();
        console.log("aqui");
      })
      .catch((err) => console.log(err));
  });
}
