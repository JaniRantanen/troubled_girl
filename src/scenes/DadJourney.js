import { Pause, setupLevel, disableControls, enableControls, setupScene } from "../utils/utils";
import { Dad } from "../characters/Dad";
import { Trigger } from "../items/Trigger";
export class DadJourney extends Phaser.Scene {
	constructor() {
		super({ key: "dadjourney" });
	}
	async create(data) {
		this.level = setupLevel(this, "dadjourney");
		this.player = new Dad(this, 100, 1500);
		this.cameras.main.startFollow(this.player.sprite, true, 0.1, 0.1);

		this.backgrounds = data.backgrounds;
		this.nextSceneKey = data.nextSceneKey;

		new Trigger(this, 3000, 0, 300, 1700, this.setupJourneyAndBackdrop.bind(this), false);
		this.setupJourneyAndBackdrop();
	}

	setupJourneyAndBackdrop() {
		this.cameras.main.fadeOut(2000);

		this.player.sprite.body.pos.x = 100;

		if (this.backgrounds.length > 0) {
			let next = this.backgrounds.shift();
			for (let i = 0; i < this.level.widthInPixels; i = i + 1600) {
				this.add.image(i, -100, next).setOrigin(0, 0).setDepth(-10);
			}
		} else {
			this.scene.transition({
				target: this.nextSceneKey,
				remove: true,
				duration: 1000
			});
		}

		this.cameras.main.fadeIn(2000);

	}
}