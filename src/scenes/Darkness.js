import { Player } from "../characters/Player";
import { setupLevel } from "../utils/utils";

export class Darkness extends Phaser.Scene {
	constructor() {
		super({ key: "darkness" });
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
		setupLevel(this, "pimeys");
	}
}
