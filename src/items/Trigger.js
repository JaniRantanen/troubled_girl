import { getImpactBodyBounds } from "../utils/utils";

export class Trigger {
	constructor(scene, x, y, width, height, triggerFunction = () => { }, singleFire = true) {
		this.scene = scene;
		this.shape = new Phaser.Geom.Rectangle(x, y, width, height);
		this.triggerFunction = triggerFunction;
		this.singleFire = singleFire;
		this.hasFired = false;

		this.scene.events.on("preupdate", this.update, this);
		this.graphics = scene.add.graphics();
	}

	update() {
		this.drawDebug();
		if (!this.hasFired || !this.singleFire) {
			let playerOverlapsTrigger = Phaser.Geom.Rectangle.Overlaps(getImpactBodyBounds(this.scene.player.sprite.body), this.shape);
			if (playerOverlapsTrigger) {
				this.triggerFunction();
				this.hasFired = true;
			}
		}
	}

	drawDebug() {
		if (process.env.NODE_ENV === "development") {
			this.graphics.clear();
			this.graphics.strokeRectShape(this.shape);
		}
	}
}