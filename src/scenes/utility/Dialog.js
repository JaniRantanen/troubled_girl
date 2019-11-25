import { TextElement } from "../../UI";
import { Pause } from "../../utils/utils";



export class Dialog extends Phaser.Scene {

	constructor() {
		super({ key: 'dialog', active: true });
		this.dialogText = null;
	}
	create() {
		let xPosition = this.sys.canvas.width / 2;
		let yPosition = this.sys.canvas.height - 80;
		this.dialogText = new TextElement(this, xPosition, yPosition, '', { fontSize: "64px", fontFamily: "Montserrat", fill: '#fff', align: "center" });
		this.add.existing(this.dialogText);
	}

	async updateDialog(text, timeToLive = 2000) {
		this.dialogText.setText(text);
		this.dialogText.setVisible(true);
		await Pause(timeToLive);
		this.dialogText.setVisible(false);
	}
}