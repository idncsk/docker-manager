import { ipcMain, Tray } from "electron";
import { createMenu } from "./menu/create";

export async function createTrayMenu(tray: Tray) {
  const menu = await createMenu();

  tray.setContextMenu(menu);
  ipcMain.on("uptdateMenu", () => createTrayMenu(tray));
}
