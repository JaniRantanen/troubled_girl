export class Toy {
	constructor(scene, x, y, spriteKey, collisionFunction = () => { }) {
		this.scene = scene;
		this.sprite = scene.impact.add.sprite(x, y, spriteKey);
		this.sprite.setFixedCollision();
		this.sprite.setGravity(0);
		this.sprite.setBounce(0, 0);
		this.sprite.setCollideCallback(this.collide, this);
		this.collisionFunction = collisionFunction;
	}

	collide(bodyA, bodyB, axis) {
		if (bodyB.name === "player") {
			this.sprite.destroy();
			this.collisionFunction();
		}
	}
}