import Phaser from "phaser";
import client from "../clients/index.js";


export default class InviteScene extends Phaser.Scene {
  constructor() {
    super("InviteScene");
  }

  create() {
    console.log(client);
    console.log("InviteScene iniciou!");
    const { width, height } = this.scale;

    this.cameras.main.setBackgroundColor("#ffe4f2");
    this.cameras.main.fadeIn(700, 255, 228, 242);

    const isMobile =
      window.innerWidth < 900 ||
      window.innerHeight > window.innerWidth;

    const sourceImage =
      this.textures
        .get("conviteFinal")
        .getSourceImage();

    const imageWidth = sourceImage.width;
    const imageHeight = sourceImage.height;

    const buttonsAreaHeight =
      isMobile ? 110 : 85;

    const availableWidth =
      width - (isMobile ? 30 : 120);

    const availableHeight =
      height -
      buttonsAreaHeight -
      (isMobile ? 20 : 50);

    const inviteScale = Math.min(
      availableWidth / imageWidth,
      availableHeight / imageHeight
    );

    const inviteY =
      availableHeight / 2 + 10;

    const shadow = this.add
      .rectangle(
        width / 2 + 9,
        inviteY + 10,
        imageWidth * inviteScale,
        imageHeight * inviteScale,
        0x000000,
        0.25
      )
      .setDepth(1)
      .setAlpha(0);

    const convite = this.add
      .image(
        width / 2,
        -imageHeight,
        "conviteFinal"
      )
      .setScale(inviteScale)
      .setDepth(2);

    this.tweens.add({
      targets: shadow,
      alpha: 1,
      duration: 600,
      delay: 350,
    });

    this.tweens.add({
      targets: convite,
      y: inviteY,
      duration: 900,
      ease: "Back.Out",
    });

    const buttonY =
      isMobile
        ? height - 52
        : height - 43;

    const buttonWidth =
      isMobile
        ? width * 0.46
        : 260;

    const buttonGap =
      isMobile ? 12 : 20;

    const totalWidth =
      buttonWidth * 2 +
      buttonGap;

    const firstButtonX =
      width / 2 -
      totalWidth / 2 +
      buttonWidth / 2;

    const secondButtonX =
      firstButtonX +
      buttonWidth +
      buttonGap;

    const mapsButton =
      this.createButton({
        x: firstButtonX,
        y: buttonY,
        width: buttonWidth,
        label: "📍 Como chegar",
        backgroundColor: 0xf68ab5,
        hoverColor: 0xffa4c8,
        onClick: () => {
         // this.openGoogleMaps();
        },
      });

    const whatsappButton =
      this.createButton({
        x: secondButtonX,
        y: buttonY,
        width: buttonWidth,
        label: "✓ Confirmar presença",
        backgroundColor: 0x42b983,
        hoverColor: 0x65cca0,
        onClick: () => {
         // this.openWhatsApp();
        },
      });

    mapsButton
      .setAlpha(0)
      .setY(buttonY + 45);

    whatsappButton
      .setAlpha(0)
      .setY(buttonY + 45);

    this.tweens.add({
      targets: [
        mapsButton,
        whatsappButton,
      ],
      alpha: 1,
      y: buttonY,
      duration: 600,
      delay: 750,
      ease: "Back.Out",
    });
  }

  createButton({
    x,
    y,
    width,
    label,
    backgroundColor,
    hoverColor,
    onClick,
  }) {
    const height = 58;

    const background = this.add
      .rectangle(
        0,
        0,
        width,
        height,
        backgroundColor,
        1
      )
      .setStrokeStyle(
        3,
        0xffffff
      );

    const text = this.add
      .text(
        0,
        0,
        label,
        {
          fontFamily: "Arial",
          fontSize: "22px",
          fontStyle: "bold",
          color: "#ffffff",
          align: "center",
        }
      )
      .setOrigin(0.5);

    const container = this.add
      .container(
        x,
        y,
        [
          background,
          text,
        ]
      )
      .setDepth(10)
      .setSize(
        width,
        height
      )
      .setInteractive({
        useHandCursor: true,
      });

    container.on(
      "pointerover",
      () => {
        background.setFillStyle(
          hoverColor
        );

        container.setScale(1.04);
      }
    );

    container.on(
      "pointerout",
      () => {
        background.setFillStyle(
          backgroundColor
        );

        container.setScale(1);
      }
    );

    container.on(
      "pointerdown",
      () => {
        container.setScale(0.96);
      }
    );

    container.on(
      "pointerup",
      () => {
        container.setScale(1.04);
        onClick();
      }
    );

    return container;
  }

 openGoogleMaps() {
  window.open(
    client.links.maps,
    "_blank"
  );
}

  openWhatsApp() {
  const message =
    encodeURIComponent(
      client.texts.whatsappMessage
    );

  const separator =
    client.links.whatsapp.includes("?")
      ? "&"
      : "?";

  const whatsappUrl =
    `${client.links.whatsapp}${separator}text=${message}`;

  window.open(
    whatsappUrl,
    "_blank"
  );
}
}