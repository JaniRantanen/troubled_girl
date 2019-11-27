export class Checkpoint {
	constructor(scene, x, y) {
		this.scene = scene;
		this.sprite = scene.add.rectangle(x, y, 100, 1600, "0xff0000");
		this.sprite.setData("isActivated", false);
		this.sprite.setAlpha(0);
		this.scene.events.on("preupdate", this.update, this);
	}

	update() {
		let playerOverlapsTrigger = Phaser.Geom.Rectangle.Overlaps(this.scene.player.sprite.getBounds(), this.sprite.getBounds());
		if (playerOverlapsTrigger && !this.sprite.getData("isActivated")) {
			console.log(`CHECKPOINT PASSED AT x:${this.sprite.x} and y:${this.sprite.y}`);
			this.scene.player.latestCheckpointPosition = new Phaser.Math.Vector2(this.sprite.x, this.sprite.y)
			this.sprite.setData("isActivated", true);
		}
	}
}