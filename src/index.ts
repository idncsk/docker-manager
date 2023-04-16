import { app, Menu } from "electron";
import { createTrayMenu } from "./tray/createMenu";
import { createTray } from "./tray/createTray";

// try {
//   require("electron-reloader")(module);
// } catch (_) {}

const data: any[] = [];
(async () => {
  await app.whenReady();
  const tray = createTray();
  const ini = Menu.buildFromTemplate([
    { id: "1", label: "Item1", type: "normal", role: "viewMenu" },
    // { label: "Item2", type: "submenu" },
    // { label: "Item3", type: "normal" },
    // { label: "Item4", type: "radio" },
    // { label: "Item4", type: "separator" },
  ]);

  const initial = Menu.setApplicationMenu(ini);
  tray.setContextMenu(ini);
  const menu = Menu.getApplicationMenu();
  menu?.on("menu-will-show", () => {
    console.log("show");
  });
  menu!.addListener("menu-will-show", () => console.log("will-show"));
  menu!.addListener("menu-will-close", () => console.log("will-show"));
  tray.on("click", function () {
    console.log(menu?.items.map((i) => i.id));
    menu?.popup();
    tray.popUpContextMenu();
    tray.displayBalloon({ content: "123", title: "312" });
  });
})();

// app.on("ready", async () => {
//   const tray = createTray();
//   const onRightClick = () => {
//     console.log("right-click");
//     tray.setIgnoreDoubleClickEvents(false);
//   };
//   // console.log(tray);
//   const initial = Menu.buildFromTemplate([
//     { label: "Item1", type: "checkbox" },
//     // { label: "Item2", type: "submenu" },
//     // { label: "Item3", type: "normal" },
//     // { label: "Item4", type: "radio" },
//     // { label: "Item4", type: "separator" },
//   ]);
//   tray.on("click", function () {
//     tray.popUpContextMenu();
//     tray.displayBalloon({ content: "123", title: "312" });
//   });
//   tray.setToolTip("This is my application.");
//   tray.setContextMenu(initial);
//   // tray.addListener("click", () => console.log("click"));
//   tray.addListener("right-click", () => onRightClick());

//   // tray.once('')

//   // await createTrayMenu(tray);
// });
