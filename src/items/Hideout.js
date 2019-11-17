export class Hideout {
	constructor(scene, x, y, spriteKey) {
		this.scene = scene;
		this.sprite = scene.impact.add.sprite(x, y, spriteKey);
		this.sprite.setData("interactable", true);
		this.sprite.setData("hideable", true);
		this.sprite.setLiteCollision();
		this.sprite.setDepth(-2);
		this.scene.events.on("preupdate", this.update, this)
	}

	update(time, delta) {
		let playerInside = this.sprite.getBounds().contains(this.scene.player.sprite.x, this.scene.player.sprite.y);
		if (playerInside) {
			this.sprite.setAlpha(0.9);
			this.sprite.setDepth(1);
		} else {
			this.sprite.clearAlpha();
			this.sprite.setDepth(-2);
		}
	}
}