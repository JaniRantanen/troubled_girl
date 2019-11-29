import { Trigger } from "./Trigger";

export class Checkpoint extends Trigger {
	constructor(scene, x, y, width = 100, height = 1000) {
		super(scene, x, y, width, height, null, true);
		this.scene = scene;
		super.triggerFunction = this.onCheckpointPassed;
	}

	onCheckpointPassed() {
		console.log(`CHECKPOINT PASSED AT x:${this.shape.x} and y:${this.shape.y}`);
		this.scene.player.latestCheckpointPosition = new Phaser.Math.Vector2(this.shape.x, this.shape.y)
	}
}