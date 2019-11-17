import { Player } from "../../characters/Player";
import { SimpleEnemy } from "../../characters/SimpleEnemy";
import { Box } from "../../items/Box";
import { Exit } from "../../items/Exit";

export class PushPull extends Phaser.Scene {
	constructor() {
		super({ key: "pushpull" });

		this.controls = null;
		this.player = null;

	}

	create() {
		//WORLD
		let worldWidth = 1600 * 3;
		this.impact.world.setBounds(0, 0, worldWidth, 1800);

		// LEVEL
		var map = this.make.tilemap({ key: "pushpull" });
		var tileset = map.addTilesetImage("../assets/tilesets/tileset.png", "tiles");
		var layer = map.createStaticLayer("map", tileset, 0, 0);
		this.impact.world.setCollisionMap("pushpull");

		// PLAYER
		this.player = new Player(this, 200, 1700);

		// CAMERAS
		this.cameras.main.setBounds(0, 0, worldWidth, 1800);
		this.cameras.main.startFollow(this.player.sprite, true, 0.1, 0.1);

		let stackTest = [new Box(this, 450, 1700), new Box(this, 450, 1600)]
		let slopePullTest = new Box(this, 750, 1700);
		let pushPullTest = new Box(this, 1550, 1600);
		let enemyAndBoxInteractionTest =
			[
				new Box(this, 3250, 1600),
				new Box(this, 3350, 1600),
				new Box(this, 3450, 1600),

				new Box(this, 3350, 1500),
				new Box(this, 3450, 1500),

				new Box(this, 3450, 1400),

				new SimpleEnemy(this, 3700, 1600)
			];

		this.exits = [new Exit(this, {
			x: 4600,
			y: 1600,
			spriteKey: "door",
			sceneKey: "battleground",
			bodySize: {
				x: 100,
				y: 200
			},
			offset: {
				x: 50,
				y: 0,
			}
		})];
	}
}