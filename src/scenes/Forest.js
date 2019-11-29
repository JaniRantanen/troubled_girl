import { Player } from "../characters/Player";
import { setupLevel, setupScene } from "../utils/utils";
import { Trigger } from "../items/Trigger";

export class Forest extends Phaser.Scene {
	constructor() {
		super({ key: "forest" });
	}

	async create() {
		this.level = setupLevel(this, "forest");
		setupScene(this, this.level, "tausta_metsa", { x: 300, y: 1300 });

		let exitTrigger = new Trigger(this, this.level.widthInPixels - 300, 0, 300, this.level.heightInPixels, () => {
			this.scene.transition({
				target: "graveyard",
				remove: true,
				duration: 1000
			});
		});
	}
}
