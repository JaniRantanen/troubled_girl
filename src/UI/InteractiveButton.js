import Phaser from "phaser";
import { TextElement } from "./";

export class InteractiveButton extends Phaser.GameObjects.Container {
    constructor(scene, x, y, textContent, styleOptions) {
        super(scene, x, y)

        this.backgroundGraphic = new Phaser.GameObjects.Rectangle(scene, 0, 0, 250, 100, 0x555555);
        this.buttonText = new TextElement(scene, 0, 0, textContent, styleOptions);

        this.add([this.backgroundGraphic, this.buttonText]);
        this.setSize(this.backgroundGraphic.width, this.backgroundGraphic.height);
        this.setInteractive({ useHandCursor: true });

        this.on('pointerover', () => {
            this.backgroundGraphic.setAlpha(0.75)
            this.onHoverIn();
        });

        this.on('pointerout', () => {
            this.backgroundGraphic.setAlpha(1);
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