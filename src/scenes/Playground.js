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
		setupScene(this, this.level, "tausta_leikkikentta", { x: 22000, y: groundLevel })
		let objects = [
			new SimpleEnemy(this, 3000, groundLevel),
			new Hideout(this, 2600, groundLevel, "metsa_pensas"),
			new Hideout(this, 4000, groundLevel, "metsa_pensas"),

			new Checkpoint(this, 6000, groundLevel),
			new SimpleEnemy(this, 8000, groundLevel),
			new Hideout(this, 8000, groundLevel, "metsa_pensas"),
			new Checkpoint(this, 6000, groundLevel),
			new SimpleEnemy(this, 10500, groundLevel),

			new Checkpoint(this, 12500, 1300),
			new SimpleEnemy(this, 13500, groundLevel),
			new DraggableItem(this, 15500, groundLevel, "leikkikentta_roskis"),

		
			new Toy(this, 18700, groundLevel, "item_pallo", dashSlideUnlock.bind(this, this)),
			new Checkpoint(this, 22600, groundLevel, 150, 1700),
			new Hideout(this, 24450, groundLevel, "metsa_pensas"),
			new SimpleEnemy(this, 25000, groundLevel),
			new Hideout(this, 26200, groundLevel, "metsa_pensas"),
			new Hideout(this, 27400, groundLevel, "metsa_pensas"),
			new SimpleEnemy(this, 27100, groundLevel)
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
