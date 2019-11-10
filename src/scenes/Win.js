import { InteractiveButton, TextElement } from "../UI";

export class Win extends Phaser.Scene {
	constructor() {
		super({ key: "Win" });
	}

	create() {
		console.log("WIN")
		this.sound.add("theme", { loop: true }).play();

		this.add.image(0, 0, "Taustataivas").setOrigin(0, 0).setDepth(-10)
		this.add.image(0, 0, "taaimmaisetpuut").setOrigin(0, 0).setDepth(-8)
		this.add.image(0, 0, "keskimmaisetpuut").setOrigin(0, 0).setDepth(-6)
		this.add.image(0, 0, "etummaisetpuut").setOrigin(0, 0).setDepth(-4)

		this.cameras.main.fadeIn(500);

		let { width, height } = this.sys.game.canvas;
		let gameTitleText = this.add.existing(new TextElement(this, (width / 2), (height / 3), "YOU WIN", { font: "128px Cinzel Decorative" }).setShadow(5, 5, "#000"))

		let startGameButton = this.add.existing(new InteractiveButton(this, (width / 2), (height / 3) + 200, "Play again?", { font: "64px Montserrat" }, "button"));
		startGameButton.onClick = () => this.scene.start("Sandbox");

	}

}