import { SimpleEnemy } from "../../characters/SimpleEnemy";
import { Player } from "../../characters/Player";
import { Exit } from "../../items/Exit";
import { setupLevel } from "../../utils/utils";
import { ShadowEnemy } from "../../characters/ShadowEnemy";

export class Battleground extends Phaser.Scene {
	constructor() {
		super({ key: "battleground" });
		this.player = null;
	}
	create() {
		this.player = new Player(this, 225, 1600);
		this.cameras.main.startFollow(this.player.sprite, true, 0.1, 0.1);
		this.cameras.main.setZoom(0.5)
		setupLevel(this, "battleground");

		this.enemies = [
			new SimpleEnemy(this, 800, 1600),
			new SimpleEnemy(this, 1400, 1600),
			new SimpleEnemy(this, 1800, 1600),
			new ShadowEnemy(this, 1600, 1000)
		];

		this.exits = [new Exit(this, {
			x: 4700,
			y: 1200,
			spriteKey: "oldman",
			sceneKey: "win",
			bodySize: {
				x: 100,
				y: 200
			},
			offset: {
				x: 50,
				y: 0,
			}
		})]
	}
}