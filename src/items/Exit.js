export class Exit {
	constructor(scene, config) {
		this.scene = scene;
		this.config = config;
		this.sprite = scene.impact.add.sprite(config.x, config.y, config.spriteKey);
		this.sprite.setFixedCollision();
		this.sprite.setGravity(0);
		this.sprite.setBounce(0, 0);
		this.sprite.setBodySize(config.bodySize.x, config.bodySize.y)
		this.sprite.setOffset(config.offset.x, config.offset.y);
		this.sprite.setCollideCallback(this.collide, this);

	}

	collide(bodyA, bodyB, axis) {
		if (bodyB.name === "player") {
			this.scene.scene.start(this.config.sceneKey);
		}
	}
}