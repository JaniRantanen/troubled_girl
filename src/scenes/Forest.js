import { Player } from "../characters/Player";
import { setupLevel, setupScene } from "../utils/utils";
import { Trigger } from "../items/Trigger";
import { DraggableItem } from "../items/DraggableItem";
import { Hideout } from "../items/Hideout";
import { Checkpoint } from "../items/Checkpoint";
import { Toy } from "../items/Toy";
import { doublejumpUnlock } from "../cutscenes/abilityUnlock";
import { ShadowEnemy } from "../characters/ShadowEnemy";
import { SimpleEnemy } from "../characters/SimpleEnemy";

export class Forest extends Phaser.Scene {
	constructor() {
		super({ key: "forest" });
	}

	async create() {
		this.level = setupLevel(this, "forest");
		setupScene(this, this.level, "tausta_metsa", { x: 47000, y: 900 });
		this.cameras.main.setZoom(0.75);

		let objects = [
			new DraggableItem(this, 2672, 1250, "metsa_kivi"),
			new Hideout(this, 3050, 1200, "metsa_puu"),
			new Hideout(this, 3250, 1200, "metsa_puu"),
			new Hideout(this, 3400, 1200, "metsa_puu"),
			new Hideout(this, 3550, 1200, "metsa_puu"),
			new SimpleEnemy(this, 3650, 1200),
			new DraggableItem(this, 6040, 1250, "metsa_kivi"),
			new Checkpoint(this, 6330, 1100),
			new ShadowEnemy(this, 8435, 1000),
			new DraggableItem(this, 8660, 1110, "metsa_kivi"),
			new DraggableItem(this, 9800, 1110, "metsa_kivi"),
			new Checkpoint(this, 11625, 400),
			new Hideout(this, 15150, 900, "metsa_puu"),
			new Hideout(this, 15850, 900, "metsa_puu"),
			new SimpleEnemy(this, 16000, 900),
			new Hideout(this, 16000, 900, "metsa_puu"),
			new Hideout(this, 16150, 900, "metsa_puu"),
			new Hideout(this, 17150, 900, "metsa_puu"),
			new Hideout(this, 17300, 900, "metsa_puu"),
			new Checkpoint(this, 19500, 400),
			new SimpleEnemy(this, 20750, 1600),
			new Toy(this, 22025, 900, "item_ilmapallo", doublejumpUnlock.bind(this, this)),
			new Checkpoint(this, 24340, 400),
			new SimpleEnemy(this, 29100, 1600),
			new SimpleEnemy(this, 30900, 1600),
			new Checkpoint(this, 32830, 800),
			new SimpleEnemy(this, 34200, 1600),
			new DraggableItem(this, 35950, 1650, "metsa_kivi"),
			new DraggableItem(this, 36170, 1650, "metsa_kivi"),
			new SimpleEnemy(this, 38550, 1600),
			new Checkpoint(this, 40200, 800),
			new Hideout(this, 40750, 1600, "metsa_puu"),
			new Hideout(this, 40850, 1600, "metsa_puu"),
			new SimpleEnemy(this, 42260, 1600),
			new SimpleEnemy(this, 44000, 1600),
			new Hideout(this, 44900, 1600, "metsa_puu"),
			new Hideout(this, 45000, 1600, "metsa_puu"),
			new Hideout(this, 45200, 1600, "metsa_puu"),
			new Hideout(this, 45350, 1600, "metsa_puu"),
			new SimpleEnemy(this, 47300, 1600),


			//new SimpleEnemy(this, 3750, 1200),
			/*new Hideout(this, 2600, groundLevel, "metsa_puu"),
			new Checkpoint(this, 6000, groundLevel),
			new DraggableItem(this, 15500, groundLevel, "metsa_kivi"),
			new Toy(this, 18700, groundLevel, "item_pallo", dashSlideUnlock.bind(this, this)),*/
		]

		let exitTrigger = new Trigger(this, this.level.widthInPixels - 300, 0, 300, this.level.heightInPixels, () => {
			this.scene.transition({
				target: "graveyard",
				remove: true,
				duration: 1000
			});
		});
	}
}
