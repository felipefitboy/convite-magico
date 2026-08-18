const unicornTheme = {
  id: "unicorn",

  audio: {
    gardenMusic: "audio/garden-music.mp3",
    collectSound: "audio/collect.mp3",
  },

  background: {
    menu:
      "../../assets/images/background/unicorn/Menu.png",

    garden:
      "../../assets/images/background/unicorn/background_hills.png",
  },

  player: {
    textureKey: "nayla",

    spritesheet:
      "../../assets/images/player/unicorn/nayla_spritesheet_128x128.png",

    portrait:
      "../../assets/images/player/unicorn/nayla.png",

    frameWidth: 256,
    frameHeight: 256,

    displayWidth: 95,
    displayHeight: 145,

    startDirection: "down",
  },

  collectibles: {
    bow:
      "../../assets/images/collectibles/unicorn/bow.png",

    balloon:
      "../../assets/images/collectibles/unicorn/balloon.png",

    cupcake:
      "../../assets/images/collectibles/unicorn/cupcake.png",

    brigadeiro:
      "../../assets/images/collectibles/unicorn/brigadeiro.png",

    beijinho:
      "../../assets/images/collectibles/unicorn/beijinho.png",

    labels: {
      bow: "Chifre mágico",
      balloon: "Estrela dourada",
      cupcake: "Mini arco-íris",
      brigadeiro: "Cristal mágico",
      beijinho: "Borboleta encantada",
    },
  },

  // O background do Unicórnio já possui
  // árvores, flores e vegetação.
  scenery: {
    enabled: false,
  },

  invite: {
    image:
      "../../assets/images/Invite/unicorn/convite.png",
  },

  colors: {
    background: "#F8E8FF",
    primary: "#C96BFF",
    text: "#5E3D82",
  },
};

export default unicornTheme;