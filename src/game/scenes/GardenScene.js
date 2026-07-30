import Phaser from "phaser";

import backgroundHillsUrl from "../../assets/images/background/background_hills.png";
import naylaSheetUrl from "../../assets/images/player/nayla_spritesheet_128x128.png";
import conviteImagemUrl from "../../assets/images/Invite/convite.png";

// Coloque o número que receberá as confirmações.
// Use somente números: 55 + DDD + telefone.
const WHATSAPP_NUMBER = "5511986896523";

const PARTY_ADDRESS =
  "Restaurante Família Nishimura, Avenida da Aldeia, 1004, Barueri, SP";

export default class GardenScene extends Phaser.Scene {
  constructor() {
    super("GardenScene");
  }

  preload() {
    this.load.image(
      "backgroundHills",
      backgroundHillsUrl
    );

    this.load.spritesheet(
      "nayla",
      naylaSheetUrl,
      {
        frameWidth: 128,
        frameHeight: 128,
      }
    );

    // Imagem do convite final
    this.load.image(
      "conviteFinal",
      conviteImagemUrl
    );

    // Efeito de coleta
    this.load.audio(
      "collectSound",
      "/audio/collect.mp3"
    );

    // Música de fundo
    this.load.audio(
      "gardenMusic",
      "/audio/garden-music.mp3"
    );
  }

  create() {
    const { width, height } =
      this.scale;

    this.gameWidth = width;
    this.gameHeight = height;

    this.isCelebrating = false;
    this.inviteStarted = false;
    this.finalInviteVisible = false;
    this.score = 0;
    this.lastDirection = "down";

    // Fundo do jardim
    this.add
      .image(
        width / 2,
        height / 2,
        "backgroundHills"
      )
      .setDisplaySize(
        width,
        height
      )
      .setDepth(-10);

    this.createAudio();
    this.createGardenDecoration();
    this.createExtraAnimations();
    this.createCollectibles();
    this.createPlayerAnimations();
    this.createPlayer();
    this.createScore();
    this.createKeyboardControls();
    this.createVirtualJoystick();

    // Para a música quando a cena for encerrada
    this.events.once(
      Phaser.Scenes.Events.SHUTDOWN,
      () => {
        this.stopGardenMusic();
      }
    );
  }

  update() {
    if (
      this.isCelebrating ||
      this.inviteStarted ||
      this.finalInviteVisible
    ) {
      return;
    }

    const speed = 5;

    let dx = 0;
    let dy = 0;
    let animationKey = null;

    if (
      this.cursors.left.isDown
    ) {
      dx = -speed;
    } else if (
      this.cursors.right.isDown
    ) {
      dx = speed;
    }

    if (
      this.cursors.up.isDown
    ) {
      dy = -speed;
    } else if (
      this.cursors.down.isDown
    ) {
      dy = speed;
    }
// Controle pelo joystick no celular
if (
  dx === 0 &&
  dy === 0 &&
  this.joystickVector
) {
  dx =
    this.joystickVector.x *
    speed;

  dy =
    this.joystickVector.y *
    speed;
}
    // Corrige a velocidade diagonal
    if (
      dx !== 0 &&
      dy !== 0
    ) {
      dx *= 0.7071;
      dy *= 0.7071;
    }

    if (dy < 0) {
      animationKey =
        "nayla-walk-up";

      this.lastDirection = "up";
      this.player.setFlipX(false);
    } else if (dy > 0) {
      animationKey =
        "nayla-walk-down";

      this.lastDirection = "down";
      this.player.setFlipX(false);
    } else if (dx > 0) {
      animationKey =
        "nayla-walk-side";

      this.lastDirection = "right";
      this.player.setFlipX(false);
    } else if (dx < 0) {
      animationKey =
        "nayla-walk-side";

      this.lastDirection = "left";
      this.player.setFlipX(true);
    }

    this.player.x += dx;
    this.player.y += dy;

    const isMoving =
      dx !== 0 ||
      dy !== 0;

    if (
      isMoving &&
      animationKey
    ) {
      this.player.anims.play(
        animationKey,
        true
      );
    } else {
      this.stopPlayerAnimation();
    }

    this.player.x =
      Phaser.Math.Clamp(
        this.player.x,
        50,
        this.gameWidth - 50
      );

    this.player.y =
      Phaser.Math.Clamp(
        this.player.y,
        75,
        this.gameHeight - 100
      );

    this.checkItemCollection();
  }

  createAudio() {
    this.collectSound = null;
    this.gardenMusic = null;

    if (
      this.cache.audio.exists(
        "collectSound"
      )
    ) {
      this.collectSound =
        this.sound.add(
          "collectSound",
          {
            volume: 0.65,
          }
        );
    }

    if (
      this.cache.audio.exists(
        "gardenMusic"
      )
    ) {
      this.gardenMusic =
        this.sound.add(
          "gardenMusic",
          {
            volume: 0.18,
            loop: true,
          }
        );

      this.startGardenMusic();
    }

    // Caso o navegador bloqueie o início automático
    this.input.once(
      "pointerdown",
      () => {
        this.startGardenMusic();
      }
    );

    if (this.input.keyboard) {
      this.input.keyboard.once(
        "keydown",
        () => {
          this.startGardenMusic();
        }
      );
    }
  }

  createGardenDecoration() {
  this.animatedTrees = [];

  const createTree = ({
    x,
    y,
    key,
    scale,
    depth,
    alpha = 1,
  }) => {
    const tree = this.add
      .image(x, y, key)
      .setOrigin(0.5, 1)
      .setScale(scale)
      .setAlpha(alpha)
      .setDepth(depth);

    this.animatedTrees.push(tree);

    return tree;
  };

  // Árvores do fundo
  createTree({
    x: 70,
    y: 625,
    key: "tree02",
    scale: 0.3,
    alpha: 0.85,
    depth: 2,
  });

  createTree({
    x: 360,
    y: 625,
    key: "tree03",
    scale: 0.28,
    alpha: 0.85,
    depth: 2,
  });

  createTree({
    x: 860,
    y: 625,
    key: "tree01",
    scale: 0.3,
    alpha: 0.85,
    depth: 2,
  });

  createTree({
    x: 1210,
    y: 625,
    key: "tree02",
    scale: 0.28,
    alpha: 0.85,
    depth: 2,
  });

  // Árvores principais
  createTree({
    x: 180,
    y: 635,
    key: "tree01",
    scale: 0.58,
    depth: 5,
  });

  createTree({
    x: 640,
    y: 635,
    key: "tree02",
    scale: 0.56,
    depth: 5,
  });

  createTree({
    x: 1050,
    y: 635,
    key: "tree03",
    scale: 0.52,
    depth: 5,
  });

  // Árvores menores
  createTree({
    x: 420,
    y: 640,
    key: "tree01",
    scale: 0.25,
    depth: 7,
  });

  createTree({
    x: 825,
    y: 640,
    key: "tree03",
    scale: 0.24,
    depth: 7,
  });

  // Flores
  const flowers = [
    "flower01",
    "flower02",
    "flower03",
  ];

  for (let i = 0; i < 14; i += 1) {
    const flowerKey =
      flowers[i % flowers.length];

    const flower = this.add
      .image(
        60 + i * 85,
        618,
        flowerKey
      )
      .setOrigin(0.5, 1)
      .setScale(0.1)
      .setDepth(8);

    // Movimento sutil das flores
    this.tweens.add({
      targets: flower,
      angle:
        i % 2 === 0
          ? 3
          : -3,
      duration:
        Phaser.Math.Between(
          1300,
          2200
        ),
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut",
      delay:
        Phaser.Math.Between(
          0,
          900
        ),
    });
  }
}
createExtraAnimations() {
  this.animateTrees();
  this.createMovingClouds();
  this.createButterflies();
  this.createFallingPetals();
  this.createMagicFireflies();
}

animateTrees() {
  if (!this.animatedTrees) {
    return;
  }

  this.animatedTrees.forEach(
    (tree, index) => {
      const direction =
        index % 2 === 0
          ? 1
          : -1;

      this.tweens.add({
        targets: tree,
        angle:
          direction *
          Phaser.Math.FloatBetween(
            1,
            2.5
          ),
        duration:
          Phaser.Math.Between(
            2200,
            3800
          ),
        yoyo: true,
        repeat: -1,
        ease: "Sine.easeInOut",
        delay:
          Phaser.Math.Between(
            0,
            1200
          ),
      });
    }
  );
}

createMovingClouds() {
  const cloudConfigurations = [
    {
      x: -130,
      y: 85,
      scale: 1,
      speed: 26000,
      alpha: 0.5,
    },
    {
      x: 250,
      y: 135,
      scale: 0.7,
      speed: 34000,
      alpha: 0.38,
    },
    {
      x: 900,
      y: 70,
      scale: 0.85,
      speed: 30000,
      alpha: 0.45,
    },
  ];

  cloudConfigurations.forEach(
    (config, index) => {
      const cloud =
        this.createCloudShape(
          config.x,
          config.y,
          config.scale,
          config.alpha
        );

      cloud.setDepth(-5);

      this.tweens.add({
        targets: cloud,
        x:
          this.gameWidth +
          180,
        duration:
          config.speed,
        repeat: -1,
        ease: "Linear",
        delay: index * 1500,

        onRepeat: () => {
          cloud.x = -180;
          cloud.y =
            config.y +
            Phaser.Math.Between(
              -15,
              15
            );
        },
      });
    }
  );
}

createCloudShape(
  x,
  y,
  scale = 1,
  alpha = 0.5
) {
  const cloud =
    this.add.container(x, y);

  const cloudColor =
    0xffffff;

  cloud.add([
    this.add.ellipse(
      -38,
      8,
      78,
      38,
      cloudColor,
      alpha
    ),
    this.add.ellipse(
      0,
      0,
      90,
      52,
      cloudColor,
      alpha
    ),
    this.add.ellipse(
      43,
      9,
      74,
      36,
      cloudColor,
      alpha
    ),
    this.add.ellipse(
      -7,
      -17,
      55,
      42,
      cloudColor,
      alpha
    ),
  ]);

  cloud.setScale(scale);

  return cloud;
}

createButterflies() {
  const butterflyColors = [
    0xff71ad,
    0xb784ff,
    0xffd65a,
    0x72d7ff,
  ];

  for (let i = 0; i < 4; i += 1) {
    this.createSingleButterfly({
      delay:
        i *
        Phaser.Math.Between(
          1200,
          2200
        ),
      color:
        butterflyColors[
          i %
          butterflyColors.length
        ],
    });
  }
}

createSingleButterfly({
  delay = 0,
  color = 0xff71ad,
}) {
  const startFromLeft =
    Phaser.Math.Between(
      0,
      1
    ) === 0;

  const startX =
    startFromLeft
      ? -60
      : this.gameWidth + 60;

  const endX =
    startFromLeft
      ? this.gameWidth + 60
      : -60;

  const startY =
    Phaser.Math.Between(
      170,
      480
    );

  const butterfly =
    this.add.container(
      startX,
      startY
    );

  butterfly.setDepth(15);

  const leftWing =
    this.add
      .ellipse(
        -7,
        0,
        15,
        23,
        color,
        0.9
      )
      .setAngle(-25);

  const rightWing =
    this.add
      .ellipse(
        7,
        0,
        15,
        23,
        color,
        0.9
      )
      .setAngle(25);

  const body =
    this.add.ellipse(
      0,
      2,
      5,
      17,
      0x6d416d,
      1
    );

  butterfly.add([
    leftWing,
    rightWing,
    body,
  ]);

  if (!startFromLeft) {
    butterfly.setScale(-1, 1);
  }

  // Movimento das asas
  this.tweens.add({
    targets: leftWing,
    scaleX: 0.25,
    duration: 130,
    yoyo: true,
    repeat: -1,
    ease: "Sine.easeInOut",
  });

  this.tweens.add({
    targets: rightWing,
    scaleX: 0.25,
    duration: 130,
    yoyo: true,
    repeat: -1,
    ease: "Sine.easeInOut",
  });

  // Movimento de subida e descida
  this.tweens.add({
    targets: butterfly,
    y: startY - 30,
    duration: 900,
    yoyo: true,
    repeat: -1,
    ease: "Sine.easeInOut",
  });

  // Travessia da tela
  this.tweens.add({
    targets: butterfly,
    x: endX,
    duration:
      Phaser.Math.Between(
        9000,
        15000
      ),
    delay,
    ease: "Linear",

    onComplete: () => {
      butterfly.destroy();

      this.time.delayedCall(
        Phaser.Math.Between(
          1000,
          4500
        ),
        () => {
          if (
            this.scene.isActive()
          ) {
            this.createSingleButterfly({
              color,
            });
          }
        }
      );
    },
  });
}

createFallingPetals() {
  this.petalsTimer =
    this.time.addEvent({
      delay: 450,
      loop: true,

      callback: () => {
        if (
          this.finalInviteVisible
        ) {
          return;
        }

        this.createSinglePetal();
      },
    });
}

createSinglePetal() {
  const startX =
    Phaser.Math.Between(
      -40,
      this.gameWidth + 40
    );

  const petal =
    this.add.ellipse(
      startX,
      -20,
      Phaser.Math.Between(
        7,
        13
      ),
      Phaser.Math.Between(
        12,
        20
      ),
      Phaser.Utils.Array.GetRandom([
        0xffa7ca,
        0xffc3da,
        0xff82b6,
        0xffffff,
      ]),
      Phaser.Math.FloatBetween(
        0.55,
        0.9
      )
    );

  petal
    .setDepth(30)
    .setAngle(
      Phaser.Math.Between(
        0,
        360
      )
    );

  this.tweens.add({
    targets: petal,

    x:
      startX +
      Phaser.Math.Between(
        -160,
        160
      ),

    y:
      this.gameHeight +
      40,

    angle:
      petal.angle +
      Phaser.Math.Between(
        180,
        720
      ),

    duration:
      Phaser.Math.Between(
        4500,
        8500
      ),

    ease: "Sine.easeIn",

    onComplete: () => {
      petal.destroy();
    },
  });
}

createMagicFireflies() {
  for (let i = 0; i < 12; i += 1) {
    const firefly =
      this.add.circle(
        Phaser.Math.Between(
          50,
          this.gameWidth - 50
        ),
        Phaser.Math.Between(
          250,
          590
        ),
        Phaser.Math.Between(
          2,
          4
        ),
        0xfff59d,
        0
      );

    firefly.setDepth(18);

    this.animateSingleFirefly(
      firefly
    );
  }
}

animateSingleFirefly(firefly) {
  if (!firefly?.active) {
    return;
  }

  const nextX =
    Phaser.Math.Clamp(
      firefly.x +
        Phaser.Math.Between(
          -80,
          80
        ),
      30,
      this.gameWidth - 30
    );

  const nextY =
    Phaser.Math.Clamp(
      firefly.y +
        Phaser.Math.Between(
          -50,
          50
        ),
      220,
      this.gameHeight - 80
    );

  this.tweens.add({
    targets: firefly,
    x: nextX,
    y: nextY,
    alpha:
      Phaser.Math.FloatBetween(
        0.45,
        1
      ),
    scale:
      Phaser.Math.FloatBetween(
        0.7,
        1.5
      ),
    duration:
      Phaser.Math.Between(
        900,
        1900
      ),
    yoyo: true,
    ease: "Sine.easeInOut",

    onComplete: () => {
      this.animateSingleFirefly(
        firefly
      );
    },
  });
}
  createCollectibles() {
    this.partyItems = [];

    const itemsData = [
      {
        key: "bow",
        name: "Laço",
        x: 185,
        y: 535,
        width: 65,
        height: 65,
      },
      {
        key: "balloon",
        name: "Bexiga",
        x: 820,
        y: 440,
        width: 55,
        height: 85,
      },
      {
        key: "cupcake",
        name: "Cupcake",
        x: 650,
        y: 550,
        width: 65,
        height: 65,
      },
      {
        key: "brigadeiro",
        name: "Brigadeiro",
        x: 1045,
        y: 560,
        width: 65,
        height: 65,
      },
      {
        key: "beijinho",
        name: "Beijinho",
        x: 320,
        y: 610,
        width: 65,
        height: 65,
      },
    ];

    itemsData.forEach(
      (itemData) => {
        const item = this.add
          .image(
            itemData.x,
            itemData.y,
            itemData.key
          )
          .setDisplaySize(
            itemData.width,
            itemData.height
          )
          .setDepth(10);

        item.setData(
          "name",
          itemData.name
        );

        item.setData(
          "collected",
          false
        );

        this.partyItems.push(item);

        // Movimento de flutuação
        this.tweens.add({
          targets: item,
          y: item.y - 8,
          duration: 900,
          yoyo: true,
          repeat: -1,
          ease: "Sine.easeInOut",
        });

        // Brilho suave periódico
        this.tweens.add({
          targets: item,
          alpha: 0.72,
          duration: 650,
          yoyo: true,
          repeat: -1,
          ease: "Sine.easeInOut",
          delay:
            Phaser.Math.Between(
              0,
              600
            ),
        });
      }
    );
  }

  createPlayer() {
    // Nayla começa mais à esquerda,
    // entre as árvores.
    this.player = this.add
      .sprite(
        470,
        550,
        "nayla",
        0
      )
      .setDisplaySize(
        95,
        145
      )
      .setDepth(20);

    this.playerNormalScaleX =
      Math.abs(
        this.player.scaleX
      );

    this.playerNormalScaleY =
      Math.abs(
        this.player.scaleY
      );
  }

  createScore() {
  

this.scoreTitle = this.add
 .text(
    330,
    28,
    "Encontre:",
    {
      fontFamily: "Arial",
      fontSize: "22px",
      fontStyle: "bold",
      color: "#6f3c76",
    }
  )
  .setDepth(101);
  const hudItems = [
  { key: "bow", x: 490 },
  { key: "balloon", x: 550 },
  { key: "cupcake", x: 610 },
  { key: "brigadeiro", x: 670 },
  { key: "beijinho", x: 730 },
];

this.itemHud = {};

hudItems.forEach((item) => {
  const circle = this.add
    .circle(
      item.x,
      40,
      28,
      0xffffff,
      0.75
    )
    .setStrokeStyle(2, 0xf0a8cf)
    .setDepth(100)
    .setScrollFactor(0);

  const image = this.add
    .image(
      item.x,
      40,
      item.key
    )
    .setDisplaySize(38, 38)
    .setDepth(101)
    .setScrollFactor(0);

  const check = this.add
    .text(
      item.x,
      40,
      "✓",
      {
        fontFamily: "Arial",
        fontSize: "46px",
        fontStyle: "bold",
        color: "#27a844",
        stroke: "#ffffff",
        strokeThickness: 6,
      }
    )
    .setOrigin(0.5)
    .setDepth(103)
    .setScrollFactor(0)
    .setVisible(false);

  this.itemHud[item.key] = {
    circle,
    image,
    check,
    found: false,
  };
});
}

  createKeyboardControls() {
    this.cursors =
      this.input.keyboard.createCursorKeys();
  }
  createVirtualJoystick() {
  const joystickX = 115;
  const joystickY =
    this.gameHeight - 115;

  const baseRadius = 70;
  const movementRadius = 48;

  this.joystickVector = {
    x: 0,
    y: 0,
  };

  this.joystickPointerId = null;

  this.joystickBase = this.add
    .circle(
      joystickX,
      joystickY,
      baseRadius,
      0xff79b0,
      0.38
    )
    .setStrokeStyle(
      5,
      0xffffff,
      0.85
    )
  .setDepth(500)
.setScrollFactor(0)
.setInteractive();

  this.joystickThumb = this.add
    .circle(
      joystickX,
      joystickY,
      31,
      0xff4f9a,
      0.85
    )
    .setStrokeStyle(
      4,
      0xffffff,
      1
    )
   .setDepth(501)
   .setScrollFactor(0);

  this.joystickBase.on(
    "pointerdown",
    (pointer) => {
      this.joystickPointerId =
        pointer.id;

      this.updateVirtualJoystick(
        pointer,
        movementRadius
      );
    }
  );

  this.input.on(
    "pointermove",
    (pointer) => {
      if (
        this.joystickPointerId !==
          pointer.id ||
        !pointer.isDown
      ) {
        return;
      }

      this.updateVirtualJoystick(
        pointer,
        movementRadius
      );
    }
  );

  this.input.on(
    "pointerup",
    (pointer) => {
      if (
        this.joystickPointerId ===
        pointer.id
      ) {
        this.resetVirtualJoystick();
      }
    }
  );

  this.input.on(
    "gameout",
    () => {
      this.resetVirtualJoystick();
    }
  );
}

updateVirtualJoystick(
  pointer,
  movementRadius
) {
  const baseX =
    this.joystickBase.x;

  const baseY =
    this.joystickBase.y;

 let differenceX =
  pointer.x - baseX;

let differenceY =
  pointer.y - baseY;

  const distance = Math.sqrt(
    differenceX * differenceX +
      differenceY * differenceY
  );

  if (distance > movementRadius) {
    differenceX =
      (differenceX / distance) *
      movementRadius;

    differenceY =
      (differenceY / distance) *
      movementRadius;
  }

  this.joystickThumb.setPosition(
    baseX + differenceX,
    baseY + differenceY
  );

  this.joystickVector.x =
    differenceX / movementRadius;

  this.joystickVector.y =
    differenceY / movementRadius;

  const deadZone = 0.12;

  if (
    Math.abs(
      this.joystickVector.x
    ) < deadZone
  ) {
    this.joystickVector.x = 0;
  }

  if (
    Math.abs(
      this.joystickVector.y
    ) < deadZone
  ) {
    this.joystickVector.y = 0;
  }
}

resetVirtualJoystick() {
  this.joystickPointerId = null;

  if (this.joystickVector) {
    this.joystickVector.x = 0;
    this.joystickVector.y = 0;
  }

  if (
    this.joystickBase &&
    this.joystickThumb
  ) {
    this.joystickThumb.setPosition(
      this.joystickBase.x,
      this.joystickBase.y
    );
  }
}

  createPlayerAnimations() {
    if (
      !this.anims.exists(
        "nayla-walk-down"
      )
    ) {
      this.anims.create({
        key: "nayla-walk-down",
        frames: [
          {
            key: "nayla",
            frame: 0,
          },
          {
            key: "nayla",
            frame: 1,
          },
          {
            key: "nayla",
            frame: 2,
          },
          {
            key: "nayla",
            frame: 3,
          },
        ],
        frameRate: 7,
        repeat: -1,
      });
    }

    if (
      !this.anims.exists(
        "nayla-walk-up"
      )
    ) {
      this.anims.create({
        key: "nayla-walk-up",
        frames: [
          {
            key: "nayla",
            frame: 4,
          },
          {
            key: "nayla",
            frame: 5,
          },
          {
            key: "nayla",
            frame: 6,
          },
          {
            key: "nayla",
            frame: 5,
          },
        ],
        frameRate: 7,
        repeat: -1,
      });
    }

    if (
      !this.anims.exists(
        "nayla-walk-side"
      )
    ) {
      this.anims.create({
        key: "nayla-walk-side",
        frames: [
          {
            key: "nayla",
            frame: 9,
          },
          {
            key: "nayla",
            frame: 10,
          },
          {
            key: "nayla",
            frame: 11,
          },
          {
            key: "nayla",
            frame: 10,
          },
        ],
        frameRate: 7,
        repeat: -1,
      });
    }
  }

  checkItemCollection() {
    this.partyItems.forEach(
      (item) => {
        if (
          !item.active ||
          item.getData("collected")
        ) {
          return;
        }

        const distance =
          Phaser.Math.Distance.Between(
            this.player.x,
            this.player.y,
            item.x,
            item.y
          );

        if (distance < 55) {
          this.collectItem(item);
        }
      }
    );
  }

  collectItem(item) {
    if (
      !item ||
      !item.active ||
      item.getData("collected")
    ) {
      return;
    }

    item.setData(
      "collected",
      true
    );

    item.setActive(false);

    const itemName =
      item.getData("name");

      const itemKey =
  item.texture.key;

const hudItem =
  this.itemHud[itemKey];

if (
  hudItem &&
  !hudItem.found
) {
  hudItem.found = true;

  hudItem.image.setAlpha(0.4);

  hudItem.check
    .setVisible(true)
    .setScale(0);

  this.tweens.add({
    targets: hudItem.check,
    scale: 1,
    duration: 300,
    ease: "Back.Out",
  });

  this.tweens.add({
    targets: hudItem.circle,
    scaleX: 1.15,
    scaleY: 1.15,
    duration: 180,
    yoyo: true,
  });
}

    this.stopPlayerAnimation();

    if (this.collectSound) {
      if (
        this.collectSound.isPlaying
      ) {
        this.collectSound.stop();
      }

      this.collectSound.play();
    }

    this.score += 1;

   
    this.createSparkles(
      item.x,
      item.y
    );

    this.celebrate();

    const message = this.add
      .text(
        item.x,
        item.y - 55,
        `${itemName} encontrado!`,
        {
          fontFamily: "Arial",
          fontSize: "22px",
          fontStyle: "bold",
          color: "#ff4f9a",
          stroke: "#ffffff",
          strokeThickness: 4,
        }
      )
      .setOrigin(0.5)
      .setDepth(100);

    this.tweens.add({
      targets: item,
      scaleX:
        item.scaleX * 1.6,
      scaleY:
        item.scaleY * 1.6,
      angle: 20,
      alpha: 0,
      duration: 350,
      ease: "Back.easeIn",

      onComplete: () => {
        item.destroy();
      },
    });

    this.tweens.add({
      targets: message,
      y: message.y - 50,
      alpha: 0,
      duration: 1100,
      ease: "Sine.easeOut",

      onComplete: () => {
        message.destroy();
      },
    });

    this.cameras.main.flash(
      140,
      255,
      235,
      150,
      false
    );

    if (
      this.score === 5 &&
      !this.inviteStarted
    ) {
      this.inviteStarted = true;

      this.time.delayedCall(
        900,
        () => {
          this.showCompletionMessage();
        }
      );
    }
  }

  celebrate() {
    this.isCelebrating = true;

    const originalY =
      this.player.y;

    const originalScaleX =
      this.playerNormalScaleX;

    const originalScaleY =
      this.playerNormalScaleY;

    const wasFlipped =
      this.player.flipX;

    this.player.setScale(
      originalScaleX,
      originalScaleY
    );

    this.player.setFlipX(
      wasFlipped
    );

    this.tweens.add({
      targets: this.player,
      y: originalY - 24,
      scaleX:
        originalScaleX * 1.08,
      scaleY:
        originalScaleY * 1.08,
      duration: 180,
      yoyo: true,
      ease: "Quad.easeOut",

      onComplete: () => {
        this.player.y =
          originalY;

        this.player.setScale(
          originalScaleX,
          originalScaleY
        );

        this.player.setFlipX(
          wasFlipped
        );

        this.isCelebrating = false;
        this.stopPlayerAnimation();
      },
    });
  }

  showCompletionMessage() {
    const { width, height } =
      this.scale;

    this.stopPlayerAnimation();

    const darkOverlay =
      this.add
        .rectangle(
          width / 2,
          height / 2,
          width,
          height,
          0x000000,
          0
        )
        .setDepth(490);

    this.tweens.add({
      targets: darkOverlay,
      fillAlpha: 0.45,
      duration: 500,
    });

    const messageBox =
      this.add
        .rectangle(
          width / 2,
          height / 2,
          580,
          230,
          0xfff3f8,
          0.98
        )
        .setStrokeStyle(
          6,
          0xff6fae
        )
        .setDepth(510)
        .setScale(0);

    const title =
      this.add
        .text(
          width / 2,
          height / 2 - 55,
          "✨ Muito bem! ✨",
          {
            fontFamily: "Arial",
            fontSize: "42px",
            fontStyle: "bold",
            color: "#e63f8c",
            stroke: "#ffffff",
            strokeThickness: 5,
            align: "center",
          }
        )
        .setOrigin(0.5)
        .setDepth(511)
        .setAlpha(0);

    const subtitle =
      this.add
        .text(
          width / 2,
          height / 2 + 35,
          "Você ajudou a Nayla\na preparar a festa!",
          {
            fontFamily: "Arial",
            fontSize: "29px",
            fontStyle: "bold",
            color: "#7c467d",
            align: "center",
            lineSpacing: 8,
          }
        )
        .setOrigin(0.5)
        .setDepth(511)
        .setAlpha(0);

    this.tweens.add({
      targets: messageBox,
      scale: 1,
      duration: 450,
      ease: "Back.Out",
    });

    this.tweens.add({
      targets: [
        title,
        subtitle,
      ],
      alpha: 1,
      duration: 450,
      delay: 250,
    });

    this.createConfetti(80);

    this.time.delayedCall(
      2200,
      () => {
        this.tweens.add({
          targets: [
            messageBox,
            title,
            subtitle,
          ],
          alpha: 0,
          duration: 500,

          onComplete: () => {
            messageBox.destroy();
            title.destroy();
            subtitle.destroy();

            this.cameras.main.fadeOut(
  800,
  255,
  228,
  242
);

this.time.delayedCall(
  800,
  () => {
    this.scene.start("InviteScene");
  }
);
          },
        });
      }
    );
  }

  showFinalInvite(darkOverlay) {
    const { width, height } =
      this.scale;

    this.finalInviteVisible = true;

    if (this.scoreTitle) {
  this.scoreTitle.setVisible(false);
}

if (this.itemHud) {
  Object.values(this.itemHud).forEach((item) => {
    item.circle.setVisible(false);
    item.image.setVisible(false);
    item.check.setVisible(false);
  });
}
    // Abaixa o volume da música
    if (
      this.gardenMusic &&
      this.gardenMusic.isPlaying
    ) {
      this.tweens.add({
        targets:
          this.gardenMusic,
        volume: 0.07,
        duration: 900,
      });
    }

    if (darkOverlay) {
      darkOverlay.setDepth(500);

      this.tweens.add({
        targets: darkOverlay,
        fillAlpha: 0.68,
        duration: 600,
      });
    }

    // Área reservada para os botões
    // Detecta celular
const isMobile = this.scale.width < 900;

// Espaço reservado para os botões
const buttonsAreaHeight = isMobile ? 110 : 78;

// Área disponível para o convite
const availableHeight =
  height -
  buttonsAreaHeight -
  (isMobile ? 8 : 40);

const availableWidth =
  width -
  (isMobile ? 8 : 50);

const sourceImage =
  this.textures
    .get("conviteFinal")
    .getSourceImage();

const imageWidth =
  sourceImage.width;

const imageHeight =
  sourceImage.height;
  

let inviteScale;

if (isMobile) {
  // O convite ocupará cerca de 96% da altura da tela
  inviteScale = (height * 0.96) / imageHeight;
} else {
  inviteScale = Math.min(
    availableWidth / imageWidth,
    availableHeight / imageHeight
  );
}
// Centraliza o convite
const inviteFinalY =
  isMobile
    ? height / 2 - 18
    : availableHeight / 2 + 8;
    const convite =
      this.add
        .image(
          width / 2,
          -imageHeight,
          "conviteFinal"
        )
        .setScale(
          inviteScale
        )
        .setDepth(610)
        .setAlpha(0.98);

    // Sombra atrás do convite
    const shadow =
      this.add
        .rectangle(
          width / 2 + 8,
          inviteFinalY + 10,
          imageWidth *
            inviteScale,
          imageHeight *
            inviteScale,
          0x000000,
          0.28
        )
        .setDepth(605)
        .setAlpha(0);

    this.tweens.add({
      targets: shadow,
      alpha: 1,
      duration: 600,
      delay: 400,
    });

    this.tweens.add({
      targets: convite,
      y: inviteFinalY,
      duration: 1000,
      ease: "Back.Out",
    });

    this.createConfetti(100);
    this.createFloatingBalloons();

    const buttonY =
  isMobile
    ? height - 22
    : height - 42;

   const buttonWidth =
  isMobile
    ? width * 0.46
    : Math.min(
        260,
        width * 0.38
      );

   const buttonGap =
  isMobile ? 8 : 15;

    const totalButtonsWidth =
      buttonWidth * 2 +
      buttonGap;

    const firstButtonX =
      width / 2 -
      totalButtonsWidth / 2 +
      buttonWidth / 2;

    const secondButtonX =
      firstButtonX +
      buttonWidth +
      buttonGap;

    const mapsButton =
      this.createFinalButton({
        x: firstButtonX,
        y: buttonY,
        width: buttonWidth,
        label: "📍 Como chegar",
        backgroundColor:
          0xf68ab5,
        hoverColor:
          0xffa4c8,
        onClick: () => {
          this.openGoogleMaps();
        },
      });

    const whatsappButton =
      this.createFinalButton({
        x: secondButtonX,
        y: buttonY,
        width: buttonWidth,
        label:
          "✓ Confirmar presença",
        backgroundColor:
          0x42b983,
        hoverColor:
          0x65cca0,
        onClick: () => {
          this.openWhatsApp();
        },
      });

    mapsButton.container
      .setAlpha(0)
      .setY(buttonY + 50);

    whatsappButton.container
      .setAlpha(0)
      .setY(buttonY + 50);

    this.tweens.add({
      targets: [
        mapsButton.container,
        whatsappButton.container,
      ],
      alpha: 1,
      y: buttonY,
      duration: 600,
      delay: 900,
      ease: "Back.Out",
    });
  }

  createFinalButton({
    x,
    y,
    width,
    label,
    backgroundColor,
    hoverColor,
    onClick,
  }) {
    const container =
      this.add.container(
        x,
        y
      );

    container.setDepth(700);

    const background =
      this.add
        .rectangle(
          0,
          0,
          width,
          52,
          backgroundColor,
          1
        )
        .setStrokeStyle(
          3,
          0xffffff
        )
        .setInteractive({
          useHandCursor: true,
        });

    const text =
      this.add
        .text(
          0,
          0,
          label,
          {
            fontFamily: "Arial",
            fontSize: "20px",
            fontStyle: "bold",
            color: "#ffffff",
            align: "center",
          }
        )
        .setOrigin(0.5);

    container.add([
      background,
      text,
    ]);

    background.on(
      "pointerover",
      () => {
        background.setFillStyle(
          hoverColor
        );

        this.tweens.add({
          targets: container,
          scale: 1.04,
          duration: 120,
        });
      }
    );

    background.on(
      "pointerout",
      () => {
        background.setFillStyle(
          backgroundColor
        );

        this.tweens.add({
          targets: container,
          scale: 1,
          duration: 120,
        });
      }
    );

    background.on(
      "pointerdown",
      () => {
        this.tweens.add({
          targets: container,
          scale: 0.95,
          duration: 80,
          yoyo: true,
        });
      }
    );

    background.on(
      "pointerup",
      () => {
        onClick();
      }
    );

    return {
      container,
      background,
      text,
    };
  }

  openGoogleMaps() {
    const mapsUrl =
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        PARTY_ADDRESS
      )}`;

    window.open(
      mapsUrl,
      "_blank",
      "noopener,noreferrer"
    );
  }

  openWhatsApp() {
    if (
      WHATSAPP_NUMBER ===
      "5511999999999"
    ) {
      console.warn(
        "Altere o número do WhatsApp no início do GardenScene.js."
      );
    }

    const message =
      "Olá! Confirmo minha presença na festa de 4 anos da Nayla Ayumi, no dia 5 de setembro de 2026, às 13h. 🎀🎂";

    const whatsappUrl =
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
        message
      )}`;

    window.open(
      whatsappUrl,
      "_blank",
      "noopener,noreferrer"
    );
  }

  createConfetti(amount = 70) {
    const colors = [
      0xff4f9a,
      0xffd54f,
      0x81d4fa,
      0xba68c8,
      0x66bb6a,
      0xffffff,
      0xff8a80,
    ];

    for (
      let i = 0;
      i < amount;
      i += 1
    ) {
      const x =
        Phaser.Math.Between(
          0,
          this.gameWidth
        );

      const y =
        Phaser.Math.Between(
          -350,
          -20
        );

      const confetti =
        this.add.rectangle(
          x,
          y,
          Phaser.Math.Between(
            5,
            11
          ),
          Phaser.Math.Between(
            9,
            18
          ),
          Phaser.Utils.Array.GetRandom(
            colors
          )
        );

      confetti
        .setDepth(650)
        .setAngle(
          Phaser.Math.Between(
            0,
            360
          )
        );

      this.tweens.add({
        targets: confetti,
        y:
          this.gameHeight +
          Phaser.Math.Between(
            30,
            160
          ),
        x:
          x +
          Phaser.Math.Between(
            -100,
            100
          ),
        angle:
          confetti.angle +
          Phaser.Math.Between(
            180,
            720
          ),
        duration:
          Phaser.Math.Between(
            2500,
            4800
          ),
        delay:
          Phaser.Math.Between(
            0,
            900
          ),
        ease: "Sine.easeIn",

        onComplete: () => {
  confetti.destroy();
},
      });
    }
  }

  createFloatingBalloons() {
    const balloonColors = [
      0xff7bac,
      0xffc4dd,
      0xc59cff,
      0xffdf72,
      0x91d7ff,
    ];

    for (
      let i = 0;
      i < 10;
      i += 1
    ) {
      const x =
        Phaser.Math.Between(
          25,
          this.gameWidth - 25
        );

      const y =
        this.gameHeight +
        Phaser.Math.Between(
          80,
          450
        );

      const balloon =
        this.add
          .ellipse(
            x,
            y,
            Phaser.Math.Between(
              22,
              34
            ),
            Phaser.Math.Between(
              30,
              46
            ),
            Phaser.Utils.Array.GetRandom(
              balloonColors
            ),
            0.85
          )
          .setDepth(520);

      const string =
        this.add
          .line(
            0,
            0,
            x,
            y + 20,
            x,
            y + 65,
            0xffffff,
            0.7
          )
          .setOrigin(0)
          .setDepth(519);

      this.tweens.add({
        targets: [
          balloon,
          string,
        ],
        y:
          -this.gameHeight -
          Phaser.Math.Between(
            100,
            350
          ),
        duration:
          Phaser.Math.Between(
            5000,
            8500
          ),
        delay:
          Phaser.Math.Between(
            0,
            1800
          ),
        ease: "Sine.easeInOut",

        onComplete: () => {
          balloon.destroy();
          string.destroy();
        },
      });
    }
  }

  createSparkles(x, y) {
    const sparkleColors = [
      0xfff176,
      0xff80ab,
      0xffffff,
      0xba68c8,
      0x81d4fa,
    ];

    for (
      let i = 0;
      i < 14;
      i += 1
    ) {
      const angle =
        Phaser.Math.FloatBetween(
          0,
          Math.PI * 2
        );

      const distance =
        Phaser.Math.Between(
          35,
          85
        );

      const size =
        Phaser.Math.Between(
          3,
          7
        );

      const color =
        Phaser.Utils.Array.GetRandom(
          sparkleColors
        );

      const sparkle =
        this.add.circle(
          x,
          y,
          size,
          color
        );

      sparkle
        .setDepth(150)
        .setAlpha(1);

      this.tweens.add({
        targets: sparkle,
        x:
          x +
          Math.cos(angle) *
            distance,
        y:
          y +
          Math.sin(angle) *
            distance,
        scale: 0,
        alpha: 0,
        duration:
          Phaser.Math.Between(
            450,
            750
          ),
        ease: "Cubic.easeOut",

        onComplete: () => {
          sparkle.destroy();
        },
      });
    }
  }

  stopPlayerAnimation() {
    if (!this.player) {
      return;
    }

    this.player.anims.stop();

    this.player.setScale(
      this.playerNormalScaleX,
      this.playerNormalScaleY
    );

    if (
      this.lastDirection === "up"
    ) {
      this.player.setFlipX(false);
      this.player.setFrame(5);
    } else if (
      this.lastDirection === "right"
    ) {
      this.player.setFlipX(false);
      this.player.setFrame(10);
    } else if (
      this.lastDirection === "left"
    ) {
      this.player.setFlipX(true);
      this.player.setFrame(10);
    } else {
      this.player.setFlipX(false);
      this.player.setFrame(0);
    }
  }

  startGardenMusic() {
    if (
      !this.gardenMusic ||
      this.gardenMusic.isPlaying
    ) {
      return;
    }

    if (this.sound.locked) {
      this.sound.once(
        Phaser.Sound.Events.UNLOCKED,
        () => {
          if (
            this.gardenMusic &&
            !this.gardenMusic.isPlaying
          ) {
            this.gardenMusic.play();
          }
        }
      );

      return;
    }

    this.gardenMusic.play();
  }

  stopGardenMusic() {
    if (!this.gardenMusic) {
      return;
    }

    if (
      this.gardenMusic.isPlaying
    ) {
      this.gardenMusic.stop();
    }

    this.gardenMusic.destroy();
    this.gardenMusic = null;
  }
}