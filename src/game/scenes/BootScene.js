import Phaser from "phaser";

export default class BootScene extends Phaser.Scene {

    constructor() {
        super("BootScene");
    }

    preload() {

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
        this.load.image(
  "bow",
  new URL(
    "../../assets/images/collectibles/bow.png",
    import.meta.url
  ).href
);
this.load.image(
  "backgroundHills",
  new URL(
    "../../assets/images/background/background_hills.png",
    import.meta.url
  ).href
);

this.load.image(
  "balloon",
  new URL(
    "../../assets/images/collectibles/balloon.png",
    import.meta.url
  ).href
);

this.load.image(
  "cupcake",
  new URL(
    "../../assets/images/collectibles/cupcake.png",
    import.meta.url
  ).href
);

this.load.image(
  "brigadeiro",
  new URL(
    "../../assets/images/collectibles/brigadeiro.png",
    import.meta.url
  ).href
);

this.load.image(
  "beijinho",
  new URL(
    "../../assets/images/collectibles/beijinho.png",
    import.meta.url
  ).href
);
        this.load.image(
  "tree01",
  new URL("../../assets/images/scenery/tree01.png", import.meta.url).href
);

this.load.image(
  "tree02",
  new URL("../../assets/images/scenery/tree02.png", import.meta.url).href
);

this.load.image(
  "tree03",
  new URL("../../assets/images/scenery/tree03.png", import.meta.url).href
);

this.load.image(
    "grass",
    new URL("../../assets/images/scenery/grass.png", import.meta.url).href
);
this.load.image(
    "flower01",
    new URL("../../assets/images/scenery/flower01.png", import.meta.url).href
);

this.load.image(
    "flower02",
    new URL("../../assets/images/scenery/flower02.png", import.meta.url).href
);

this.load.image(
    "flower03",
    new URL("../../assets/images/scenery/flower03.png", import.meta.url).href
);

this.load.image(
    "menuBackground",
    new URL("../../assets/images/background/Menu.png", import.meta.url).href
);
    }

    create() {
        this.scene.start("MenuScene");
    }

}