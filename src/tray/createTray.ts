import { Tray, nativeImage } from "electron";
import path from "path";

const config =
  process.env.NODE_ENV === "development"
    ? path.join(__dirname, "..")
    : path.join(__dirname);

export const defaultIcon = nativeImage.createFromPath(
  path.resolve(config, "assets", "icon.png")
);

export function createTray() {
  return new Tray(defaultIcon);
}
