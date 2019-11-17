import { SimpleEnemy } from "../../characters/SimpleEnemy";
import { Player } from "../../characters/Player";
import { Exit } from "../../items/Exit";

export class Battleground extends Phaser.Scene {
	constructor() {
		super({ key: "battleground" });

		this.controls = null;
		this.player = null;
		this.debugText = null;

	}

	preload() {

	}

	create() {
		//WORLD
		let worldWidth = 1600 * 3;
		this.impact.world.setBounds(0, 0, worldWidth, 1800);

		// LEVEL
		var map = this.make.tilemap({ key: "battleground" });
		var tileset = map.addTilesetImage("../assets/tilesets/tileset.png", "tiles");
		var layer = map.createStaticLayer("map", tileset, 0, 0);
		this.impact.world.setCollisionMap("battleground");

		// PLAYER
		this.player = new Player(this, 225, 1600);

		// CAMERAS
		this.cameras.main.setBounds(0, 0, worldWidth, 1800);
		this.cameras.main.startFollow(this.player.sprite, true, 0.1, 0.1);

		this.enemies = [
			new SimpleEnemy(this, 800, 1600),
			new SimpleEnemy(this, 1400, 1600),
			new SimpleEnemy(this, 1800, 1600)
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

	update(time, delta) {
	}

}