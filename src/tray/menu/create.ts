import { Menu, MenuItemConstructorOptions, nativeImage } from "electron";

import path from "path";
import { getFooter, getLogo } from ".";
import { getContainers } from "../docker/get-containers";
import { getOptions } from "./options";

export async function createMenu() {
  const containers = await getContainers();
  const containerToMenu = containers.map(({ name, status }) => {
    const icon = nativeImage.createFromPath(
      path.resolve(
        __dirname,
        "..",
        "..",
        "assets",
        status ? "on.png" : "off.png"
      )
    );

    const submenu = getOptions(name as string);
    return { label: name, icon, submenu } as MenuItemConstructorOptions;
  });

  const logo = getLogo();
  const footer = getFooter();
  const contextMenu = Menu.buildFromTemplate([
    ...logo,
    ...containerToMenu,
    ...footer,
  ]);

  return contextMenu;
}
