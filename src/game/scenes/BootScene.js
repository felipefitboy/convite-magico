import Phaser from "phaser";
import theme from "../themes";

export default class BootScene extends Phaser.Scene {
  constructor() {
    super("BootScene");
  }

  preload() {
    console.log("Tema ativo:", theme.id);

    const baseUrl = import.meta.env.BASE_URL;

    this.load.on("loaderror", (file) => {
      console.error(
        "ERRO AO CARREGAR:",
        file.key,
        file.src
      );
    });

    this.load.on("filecomplete", (key) => {
      console.log("CARREGADO:", key);
    });

    // =========================
    // Áudios
    // =========================

    this.load.audio(
      "gardenMusic",
      `${baseUrl}${theme.audio.gardenMusic}`
    );

    this.load.audio(
      "collectSound",
      `${baseUrl}${theme.audio.collectSound}`
    );

    // =========================
    // Personagem
    // =========================

    this.load.spritesheet(
      theme.player.textureKey,
      theme.player.spritesheet,
      {
        frameWidth:
          theme.player.frameWidth,

        frameHeight:
          theme.player.frameHeight,
      }
    );

    // =========================
    // Itens
    // =========================

    this.load.image(
      "bow",
      theme.collectibles.bow
    );

    this.load.image(
      "balloon",
      theme.collectibles.balloon
    );

    this.load.image(
      "cupcake",
      theme.collectibles.cupcake
    );

    this.load.image(
      "brigadeiro",
      theme.collectibles.brigadeiro
    );

    this.load.image(
      "beijinho",
      theme.collectibles.beijinho
    );

    // =========================
    // Fundo
    // =========================

    this.load.image(
      "backgroundHills",
      theme.background.garden
    );

    // =========================
    // Cenário extra
    // =========================

    if (theme.scenery.enabled) {
      this.load.image(
        "tree01",
        theme.scenery.tree01
      );

      this.load.image(
        "tree02",
        theme.scenery.tree02
      );

      this.load.image(
        "tree03",
        theme.scenery.tree03
      );

      this.load.image(
        "grass",
        theme.scenery.grass
      );

      this.load.image(
        "flower01",
        theme.scenery.flower01
      );

      this.load.image(
        "flower02",
        theme.scenery.flower02
      );

      this.load.image(
        "flower03",
        theme.scenery.flower03
      );
    }
  }

  create() {
    this.scene.start("MenuScene");
  }
}