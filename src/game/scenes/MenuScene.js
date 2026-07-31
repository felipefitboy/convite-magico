import Phaser from "phaser";

export default class MenuScene extends Phaser.Scene {
  constructor() {
    super("MenuScene");
  }

  create() {
    const { width, height } = this.scale;

    this.add
      .image(width / 2, height / 2, "menuBackground")
      .setDisplaySize(width, height);

    const playButton = this.add
      .rectangle(
        width / 2,
        height - 52,
        330,
        85,
        0xffffff,
        0
      )
      .setInteractive({ useHandCursor: true });

    playButton.on("pointerdown", () => {
      this.cameras.main.fadeOut(
        350,
        255,
        255,
        255
      );

      this.time.delayedCall(350, () => {
        this.scene.start("GardenScene");
      });
    });
  }
}