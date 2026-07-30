import Phaser from "phaser";

import BootScene from "./scenes/BootScene";
import MenuScene from "./scenes/MenuScene";
import GardenScene from "./scenes/GardenScene";
import InviteScene from "./scenes/InviteScene";

const config = {
 type: Phaser.CANVAS,
  width: 1280,
  height: 720,
  parent: "game",
  backgroundColor: "#FFE4F2",

 scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 1280,
    height: 720,
  },

  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },

  scene: [
    BootScene,
    MenuScene,
    GardenScene,
    InviteScene,
  ],
};

export default config;
