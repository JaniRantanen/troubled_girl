import Phaser from "phaser";
import { TextElement } from "./";

export class InteractiveButton extends Phaser.GameObjects.Container {
    constructor(scene, x, y, textContent, styleOptions, spriteName) {
        super(scene, x, y)

        this.backgroundImage = new Phaser.GameObjects.Image(scene, 0, 0, spriteName);
        this.buttonText = new TextElement(scene, 0, 0, textContent, styleOptions);

        this.add([this.backgroundImage, this.buttonText]);
        this.setSize(this.backgroundImage.width, this.backgroundImage.height);
        this.setInteractive({ useHandCursor: true });

        this.on('pointerover', () => {
            this.backgroundImage.setAlpha(0.75)
            this.onHoverIn();
        });

        this.on('pointerout', () => {
            this.backgroundImage.setAlpha(1);
            this.onHoverOut();
        })

        this.on('pointerdown', () => {
            this.onClick();
        })

        this.on("pointerup", () => {
            this.onClickRelease();
        })

    }


    onHoverIn() {

    };

    onHoverOut() {
    };

    onClick() {
    };

    onClickRelease() {
    };
}