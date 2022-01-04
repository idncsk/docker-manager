import { Tray, nativeImage } from "electron";
import path from "path";

export const defaultIcon = nativeImage.createFromPath(
  path.resolve(__dirname, "..", "assets", "icon.png")
);

export function createTray() {
  return new Tray(defaultIcon);
}
