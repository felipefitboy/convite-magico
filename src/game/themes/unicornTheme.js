const unicornTheme = {
  id: "unicorn",

  audio: {
    gardenMusic: "audio/garden-music.mp3",
    collectSound: "audio/collect.mp3",
  },

  background: {
    menu: new URL(
      "../../assets/images/background/unicorn/Menu.png",
      import.meta.url
    ).href,

    garden: new URL(
      "../../assets/images/background/unicorn/background_hills.png",
      import.meta.url
    ).href,
  },

  player: {
    textureKey: "nayla",

    spritesheet: new URL(
      "../../assets/images/player/unicorn/nayla_spritesheet_128x128.png",
      import.meta.url
    ).href,

    portrait: new URL(
      "../../assets/images/player/unicorn/nayla.png",
      import.meta.url
    ).href,

    frameWidth: 256,
    frameHeight: 256,

    displayWidth: 95,
    displayHeight: 145,

    startDirection: "down",
  },

  collectibles: {
    bow: new URL(
      "../../assets/images/collectibles/unicorn/bow.png",
      import.meta.url
    ).href,

    balloon: new URL(
      "../../assets/images/collectibles/unicorn/balloon.png",
      import.meta.url
    ).href,

    cupcake: new URL(
      "../../assets/images/collectibles/unicorn/cupcake.png",
      import.meta.url
    ).href,

    brigadeiro: new URL(
      "../../assets/images/collectibles/unicorn/brigadeiro.png",
      import.meta.url
    ).href,

    beijinho: new URL(
      "../../assets/images/collectibles/unicorn/beijinho.png",
      import.meta.url
    ).href,

    labels: {
      bow: "Chifre mágico",
      balloon: "Estrela dourada",
      cupcake: "Mini arco-íris",
      brigadeiro: "Cristal mágico",
      beijinho: "Borboleta encantada",
    },
  },

  scenery: {
    enabled: false,
  },

  invite: {
    image: new URL(
      "../../assets/images/Invite/unicorn/convite.png",
      import.meta.url
    ).href,
  },

  colors: {
    background: "#F8E8FF",
    primary: "#C96BFF",
    text: "#5E3D82",
  },
};

export default unicornTheme;