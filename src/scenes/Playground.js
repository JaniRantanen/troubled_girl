import { SimpleEnemy } from "../characters/SimpleEnemy";
import { Hideout } from "../items/Hideout";
import { DraggableItem } from "../items/DraggableItem";
import { Toy } from "../items/Toy";
import { Checkpoint } from "../items/Checkpoint";
import { setupLevel, createBackground, enableCameraFollow } from "../utils/utils";
import { dashSlideUnlock } from "../cutscenes/abilityUnlock";
import { Trigger } from "../items/Trigger";
import { Player } from "../characters/Player";

export class Playground extends Phaser.Scene {
	constructor() {
		super({ key: "playground" });
	}

	preload() {
		this.dialogScene = this.scene.get("dialog");
		this.musicScene = this.scene.get("music");
		this.musicScene.changeTrack("metsamusiikki_tausta");
	}

	async create() {
		this.level = setupLevel(this, "playground");
		this.player = new Player(this, 200, 1600);
		createBackground(this, this.level, "tausta_leikkikentta")
		enableCameraFollow(this, this.player.sprite);

		this.cameras.main.setZoom(0.75);

		let objects = [
			new SimpleEnemy(this, 3000, 1600),
			new Hideout(this, 2600, 1600, "metsa_pensas"),
			new Hideout(this, 2800, 1600, "metsa_pensas"),
			new Hideout(this, 4100, 1600, "metsa_pensas"),

			new Checkpoint(this, 6000, 1200),
			new Hideout(this, 7800, 1600, "metsa_pensas"),
			new SimpleEnemy(this, 8000, 1600),
			new Hideout(this, 8000, 1600, "metsa_pensas"),
			new Checkpoint(this, 6000, 1600),
			new Hideout(this, 9500, 1600, "metsa_pensas"),
			new SimpleEnemy(this, 10500, 1600),
			new Hideout(this, 10500, 1600, "metsa_pensas"),

			new Checkpoint(this, 12100, 1100),
			new Hideout(this, 13150, 1600, "metsa_pensas"),
			new Hideout(this, 13350, 1600, "metsa_pensas"),
			new SimpleEnemy(this, 13500, 1600),
			new DraggableItem(this, 15500, 1600, "leikkikentta_roskis"),


			new Toy(this, 18700, 1600, "item_pallo", dashSlideUnlock.bind(this, this)),
			new Checkpoint(this, 22600, 400, 150, 1700),
			new Hideout(this, 24450, 1600, "metsa_pensas"),
			new Hideout(this, 24600, 1600, "metsa_pensas"),
			new Hideout(this, 24700, 1600, "metsa_pensas"),
			new SimpleEnemy(this, 25000, 1600),
			new Hideout(this, 26200, 1600, "metsa_pensas"),
			new Hideout(this, 27100, 1600, "metsa_pensas"),
			new SimpleEnemy(this, 27100, 1600)
		];

		let exitTrigger = new Trigger(this, this.level.widthInPixels - 300, 0, 300, this.level.heightInPixels, () => {
			this.scene.transition({
				target: "forest",
				remove: true,
				duration: 1000
			});
		});
	}
}
