import { Player } from "../characters/Player";

export class Home extends Phaser.Scene {
	constructor() {
		super({ key: "home" });
		this.player = null;
		this.exits = null;
		this.enemies = null;
	}

	create() {
		// WORLD
		let worldWidth = 1600 * 3;
		this.impact.world.setBounds(0, 0, worldWidth, 1800);

		// LEVEL
		var map = this.make.tilemap({ key: "home" });
		var tileset = map.addTilesetImage("../assets/tilesets/tileset.png", "tiles");
		var layer = map.createStaticLayer("map", tileset, 0, 0);
		this.impact.world.setCollisionMap("home");

		// PLAYER
		this.player = new Player(this, 225, 1600);

		// CAMERAS
		this.cameras.main.setBounds(0, 0, worldWidth, 1800);
		this.cameras.main.startFollow(this.player.sprite, true, 0.1, 0.1);

		// LEVEL EXITS
		this.exits = [];

		//ENEMIES

	}


}