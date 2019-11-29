import { Player } from "../characters/Player";
import { SimpleEnemy } from "../characters/SimpleEnemy";
import { Hideout } from "../items/Hideout";
import { DraggableItem } from "../items/DraggableItem";
import { Toy } from "../items/Toy";
import { Checkpoint } from "../items/Checkpoint";
import { setupLevel, setupScene } from "../utils/utils";
import { dashSlideUnlock } from "../cutscenes/abilityUnlock";
import { Trigger } from "../items/Trigger";

export class Playground extends Phaser.Scene {
	constructor() {
		super({ key: "playground" });
	}


	async create() {
		let groundLevel = 1600;
		this.level = setupLevel(this, "playground");
		setupScene(this, this.level, "tausta_leikkikentta", { x: 150, y: groundLevel })

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

		let exitTrigger = new Trigger(this, this.level.widthInPixels - 300, 0, 300, this.level.heightInPixels, () => {
			this.scene.transition({
				target: "forest",
				remove: true,
				duration: 1000
			});
		});
	}
}
