import Phaser from "phaser";
import theme from "../themes";

export default class BootScene extends Phaser.Scene {
  constructor() {
    super("BootScene");
  }

  preload() {
    console.log("Tema ativo:", theme.id);

    const baseUrl = import.meta.env.BASE_URL;

this.load.audio(
  "gardenMusic",
  `${baseUrl}audio/garden-music.mp3`
);

this.load.audio(
  "collectSound",
  `${baseUrl}audio/collect.mp3`
);  

     this.load.spritesheet(
  "nayla",
  new URL(
    "../../assets/images/player/nayla_spritesheet_128x128.png",
    import.meta.url
  ).href,
  {
    frameWidth: 128,
    frameHeight: 128,
  }
);

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
      new URL(
        theme.player.spritesheet,
        import.meta.url
      ).href,
      {
        frameWidth: theme.player.frameWidth,
        frameHeight: theme.player.frameHeight,
      }
    );

    // =========================
    // Itens
    // =========================

    this.load.image(
      "bow",
      new URL(
        theme.collectibles.bow,
        import.meta.url
      ).href
    );

    this.load.image(
      "balloon",
      new URL(
        theme.collectibles.balloon,
        import.meta.url
      ).href
    );

    this.load.image(
      "cupcake",
      new URL(
        theme.collectibles.cupcake,
        import.meta.url
      ).href
    );

    this.load.image(
      "brigadeiro",
      new URL(
        theme.collectibles.brigadeiro,
        import.meta.url
      ).href
    );

    this.load.image(
      "beijinho",
      new URL(
        theme.collectibles.beijinho,
        import.meta.url
      ).href
    );

    // =========================
    // Fundo
    // =========================

    this.load.image(
      "backgroundHills",
      new URL(
        theme.background.garden,
        import.meta.url
      ).href
    );

    // =========================
    // Cenário (somente temas que usam)
    // =========================

    if (theme.scenery.enabled) {

      this.load.image(
        "tree01",
        new URL(
          theme.scenery.tree01,
          import.meta.url
        ).href
      );

      this.load.image(
        "tree02",
        new URL(
          theme.scenery.tree02,
          import.meta.url
        ).href
      );

      this.load.image(
        "tree03",
        new URL(
          theme.scenery.tree03,
          import.meta.url
        ).href
      );

      this.load.image(
        "grass",
        new URL(
          theme.scenery.grass,
          import.meta.url
        ).href
      );

      this.load.image(
        "flower01",
        new URL(
          theme.scenery.flower01,
          import.meta.url
        ).href
      );

      this.load.image(
        "flower02",
        new URL(
          theme.scenery.flower02,
          import.meta.url
        ).href
      );

      this.load.image(
        "flower03",
        new URL(
          theme.scenery.flower03,
          import.meta.url
        ).href
      );
    }
  }

  create() {
    this.scene.start("MenuScene");
  }
}