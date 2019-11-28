import { Player } from "../characters/Player";
import { SimpleEnemy } from "../characters/SimpleEnemy";
import { Hideout } from "../items/Hideout";
import { DraggableItem } from "../items/DraggableItem";
import { Toy } from "../items/Toy";
import { Checkpoint } from "../items/Checkpoint";
import { setupLevel } from "../utils/utils";
import { dashSlideUnlock } from "../cutscenes/abilityUnlock";

export class Playground extends Phaser.Scene {
	constructor() {
		super({ key: "playground" });
		this.player = null;
		this.dialogScene = null;
	}
	preload() {
		this.dialogScene = this.scene.get("dialog");
	}

	async create() {
		this.cameras.main.setBackgroundColor(0xb9b9b9);
		this.player = new Player(this, 1000, 1600);
		this.cameras.main.startFollow(this.player.sprite, true, 0.1, 0.1);
		setupLevel(this, "playground");

		let groundLevel = 1600;

		//this.cameras.main.setZoom(0.1);
		let objects = [
			new SimpleEnemy(this, 3000, groundLevel),
			new Hideout(this, 4000, groundLevel, "metsa_pensas"),

			new Checkpoint(this, 6000, groundLevel),
			new SimpleEnemy(this, 8000, groundLevel),
			new Hideout(this, 8000, groundLevel, "metsa_pensas"),
			new DraggableItem(this, 9000, groundLevel, "leikkikentta_roskis"),
			new SimpleEnemy(this, 11000, groundLevel),

			new Checkpoint(this, 12500, 1300),
			new SimpleEnemy(this, 13000, groundLevel),
			new DraggableItem(this, 15500, groundLevel, "leikkikentta_roskis"),

			new Checkpoint(this, 16000, groundLevel),
			new Toy(this, 18700, groundLevel, "item_pallo", dashSlideUnlock.bind(this, this)),
			new SimpleEnemy(this, 25000, groundLevel),
			new SimpleEnemy(this, 28000, groundLevel)

		];
	}
}
