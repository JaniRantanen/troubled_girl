import { version } from "../../package.json";
import { InteractiveButton, TextElement } from "../UI";

export class MainMenu extends Phaser.Scene {
    constructor() {
        super({ key: "mainmenu" });
    }

    create() {
        let introMusic = this.sound.add("alkuvalikkomusikki_1_tausta");
        introMusic.play()
        introMusic.once("complete", () => this.sound.play("alkuvalikkomusiikki_2_tausta", { loop: true }), this);

        this.createMenu();

        this.cameras.main.fadeIn(1000);
    }

    createMenu() {
        let backgroundImage = this.add.image(0, 0, "kansikuva_final").setOrigin(0, 0).setDepth(-2);
        let { width, height } = this.sys.game.canvas;
        let startGameButton = this.add.existing(new InteractiveButton(this, (width / 2), 600, "Start", { font: "64px Montserrat" }, "button"));
        startGameButton.onClick = this.startGame.bind(this);
        let versionData = this.add.existing(new TextElement(this, (width / 2), (height / 3) + 500, `V. ${version}`, { font: "20px Montserrat" }));
    }

    startGame() {
        this.sound.stopAll();
        this.scene.start("home");
    }

}