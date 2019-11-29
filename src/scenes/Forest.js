import { Player } from "../characters/Player";
import { setupLevel, setupScene } from "../utils/utils";
import { Trigger } from "../items/Trigger";
import { DraggableItem } from "../items/DraggableItem";
import { Hideout } from "../items/Hideout";
import { Checkpoint } from "../items/Checkpoint";
import { Toy } from "../items/Toy";
import { doublejumpUnlock } from "../cutscenes/abilityUnlock";
import { ShadowEnemy } from "../characters/ShadowEnemy";

export class Forest extends Phaser.Scene {
	constructor() {
		super({ key: "forest" });
	}

	async create() {
		this.level = setupLevel(this, "forest");
		setupScene(this, this.level, "tausta_metsa", { x: 6330, y: 800 });
		this.cameras.main.setZoom(0.2);

		let objects = [
			new DraggableItem(this, 2672, 1250, "metsa_kivi"),
			new Hideout(this, 3150, 1200, "metsa_puu"),
			new Hideout(this, 3350, 1200, "metsa_puu"),
			new Hideout(this, 3500, 1200, "metsa_puu"),
			//new SimpleEnemy(this, 3750, 1200),
			//new SimpleEnemy(this, 3750, 1200),
			new DraggableItem(this, 6040, 1250, "metsa_kivi"),
			new Checkpoint(this, 6330, 1100),
			new ShadowEnemy(this, 8435, 1000),
			new DraggableItem(this, 9800, 1110, "metsa_kivi"),
			new Checkpoint(this, 11625, 400),
			new Hideout(this, 15150, 900, "metsa_puu"),
			new Hideout(this, 15850, 900, "metsa_puu"),
			new Hideout(this, 16000, 900, "metsa_puu"),
			new Hideout(this, 16150, 900, "metsa_puu"),
			//new SimpleEnemy(this, 3750, 1200),
			new Hideout(this, 16750, 900, "metsa_puu"),
			new Hideout(this, 16900, 900, "metsa_puu"),
			//new SimpleEnemy(this, 3750, 1200),
			new Checkpoint(this, 19500, 400),
			//new SimpleEnemy(this, 3750, 1200),
			new Toy(this, 22025, 900, "item_ilmapallo", doublejumpUnlock.bind(this, this)),
			new Checkpoint(this, 24340, 400),
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
