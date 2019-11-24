import { version } from "../../package.json";
import { InteractiveButton, TextElement } from "../UI";

export class MainMenu extends Phaser.Scene {
    constructor() {
        super({ key: "mainmenu" });
    }

    create() {
        let { width, height } = this.sys.game.canvas;
        this.add.image(0, 0, "kansikuva_final").setOrigin(0, 0).setDepth(-2);
        this.cameras.main.fadeIn(1000);

        let startGameButton = this.add.existing(new InteractiveButton(this, (width / 2), 600, "Start", { font: "64px Montserrat" }, "button"));
        startGameButton.onClick = () => this.scene.start("home");

        let versionData = this.add.existing(new TextElement(this, (width / 2), (height / 3) + 500, `V. ${version}`, { font: "20px Montserrat" }));

    }

}