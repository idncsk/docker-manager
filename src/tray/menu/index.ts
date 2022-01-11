import { ipcMain, MenuItemConstructorOptions, nativeImage } from "electron";
import path from "path";

export function getLogo() {
  const icon = nativeImage.createFromPath(
    path.resolve(__dirname, "..", "..", "assets", "tray-gray.png")
  );

  const logo: MenuItemConstructorOptions[] = [
    {
      label: "Docker Manager",
      icon,
      enabled: false,
    },
    { type: "separator" },
  ];

  return logo;
}

export function getFooter() {
  const options: MenuItemConstructorOptions[] = [
    {
      type: "separator",
    },
    {
      label: "Update Status",
      click: () => ipcMain.emit("uptdateMenu"),
    },
    {
      label: "Quit from Docker Manager",
      role: "quit",
    },
  ];

  return options;
}
