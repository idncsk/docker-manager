import {
  ipcMain,
  MenuItemConstructorOptions,
  nativeImage,
  Notification,
} from "electron";
import path from "path";
import { attachContainer } from "../docker/attach-container";
import { removeContainer } from "../docker/remove-container";
import { startContainer } from "../docker/start-container";
import { stopContainer } from "../docker/stop-container";

const icon = nativeImage.createFromPath(
  path.resolve(__dirname, "..", "..", "assets", "icon.png")
);

async function handleStartContainer(label: string) {
  const notification = new Notification({
    icon,
    title: `Starting container ${label}`,
  });

  notification.show();
  try {
    await startContainer(label);
    notification.title = `Container ${label} start with sucesss`;
    notification.show();
  } catch (err) {
    notification.title = `Error: ${err}`;
    notification.show();
  }

  ipcMain.emit("uptdateMenu");
}

async function handleAttachContainer(label: string) {
  const notification = new Notification({
    icon,
    title: `Attaching to container ${label}`,
  });

  notification.show();
  try {
    await attachContainer(label);
  } catch (err) {
    notification.title = `Error: ${err}`;
    notification.show();
  }
}

async function handleStopContainer(label: string) {
  const notification = new Notification({
    icon,
    title: `Stopping container ${label}`,
  });

  notification.show();
  try {
    await stopContainer(label);
    notification.title = `Container ${label} has stopped with sucesss`;
    notification.show();
  } catch (err) {
    notification.title = `Error: ${err}`;
    notification.show();
  }
  ipcMain.emit("uptdateMenu");
}

async function handleRemoveContainer(label: string) {
  const notification = new Notification({
    icon,
    title: `Removing container ${label}`,
  });

  notification.show();
  try {
    await removeContainer(label);
    notification.title = `Container ${label} has been deleted with sucesss`;
    notification.show();
  } catch (err) {
    notification.title = `Error: ${err}`;
    notification.show();
  }
  ipcMain.emit("uptdateMenu");
}

export function getOptions(name: string) {
  const options: MenuItemConstructorOptions[] = [
    {
      click: () => handleAttachContainer(name),
      label: "Attach",
    },
    {
      click: () => handleStartContainer(name),
      label: "Start",
    },
    {
      click: () => handleStopContainer(name),
      label: "Stop",
    },
    {
      click: () => handleRemoveContainer(name),
      label: "Remove",
    },
  ];

  return options;
}
