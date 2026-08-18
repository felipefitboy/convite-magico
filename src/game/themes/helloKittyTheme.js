const helloKittyTheme = {
  id: "hello-kitty",

  audio: {
    gardenMusic: "audio/garden-music.mp3",
    collectSound: "audio/collect.mp3",
   
  },

  background: {
    menu:
      "../../assets/images/background/hello-kitty/Menu.png",

    garden:
      "../../assets/images/background/hello-kitty/background_hills.png",
  },

  player: {
    textureKey: "nayla",

    spritesheet:
      "../../assets/images/player/hello-kitty/nayla_spritesheet_128x128.png",

    portrait:
      "../../assets/images/player/hello-kitty/nayla.png",

    frameWidth: 128,
    frameHeight: 128,

    displayWidth: 95,
    displayHeight: 145,

    startDirection: "down"
},

  collectibles: {
    bow:
      "../../assets/images/collectibles/hello-kitty/bow.png",

    balloon:
      "../../assets/images/collectibles/hello-kitty/balloon.png",

    cupcake:
      "../../assets/images/collectibles/hello-kitty/cupcake.png",

    brigadeiro:
      "../../assets/images/collectibles/hello-kitty/brigadeiro.png",

    beijinho:
      "../../assets/images/collectibles/hello-kitty/beijinho.png",
  },
scenery: {
  enabled: true,

  tree01:
    "../../assets/images/scenery/hello-kitty/tree01.png",

  tree02:
    "../../assets/images/scenery/hello-kitty/tree02.png",

  tree03:
    "../../assets/images/scenery/hello-kitty/tree03.png",

  grass:
    "../../assets/images/scenery/hello-kitty/grass.png",

  flower01:
    "../../assets/images/scenery/hello-kitty/flower01.png",

  flower02:
    "../../assets/images/scenery/hello-kitty/flower02.png",

  flower03:
    "../../assets/images/scenery/hello-kitty/flower03.png",
},

  invite: {
    image:
      "../../assets/images/Invite/hello-kitty/convite.png",
  },

  colors: {
    background: "#FFE4F2",
    primary: "#ff6fae",
    text: "#6f3c76",
  },
};

export default helloKittyTheme;