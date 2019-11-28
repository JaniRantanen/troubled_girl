import { Player } from "../characters/Player";
import { setupLevel } from "../utils/utils";

export class Graveyard extends Phaser.Scene {
	constructor() {
		super({ key: "graveyard" });
		this.player = null;
		this.ui = null;
	}
	preload() {
		this.ui = this.scene.get("dialog");
	}

	async create() {
		this.cameras.main.setBackgroundColor(0xb9b9b9);
		this.player = new Player(this, 300, 1000);
		this.cameras.main.startFollow(this.player.sprite, true, 0.1, 0.1);
		let level = setupLevel(this, "graveyard");
		this.cameras.main.setZoom(0.2);

		for (let i = 0; i < level.widthInPixels; i = i + 1600) {
			this.add.image(i, -100, "tausta_hautausmaa").setOrigin(0, 0).setDepth(-10);
		}
		this.impact.add.sprite(6000, 1500, "aiti_muutos7fps", 0);
		this.impact.add.sprite(6500, 1500, "item_hauta");


	}
}
