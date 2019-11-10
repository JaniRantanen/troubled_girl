import Phaser from "phaser";

const defaultStyle = { fontSize: "20px", fontFamily: "Montserrat", fill: '#fff', align: "left" };

export class TextElement extends Phaser.GameObjects.Text {
	constructor(scene, x, y, text, style = defaultStyle) {
		super(scene, x, y, text, style);
		this.setOrigin(0.5, 0.5)
		this.setWordWrapWidth(scene.game.canvas.width);
	}
}