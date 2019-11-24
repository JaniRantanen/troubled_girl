export class Crawlspace {
	constructor(scene, x, y, spriteKey) {
		this.scene = scene;
		this.sprite = scene.impact.add.sprite(x, y, spriteKey);
		this.sprite.setFixedCollision();
		this.sprite.setGravity(0);
		this.sprite.setCollideCallback(this.collide, this);
		this.setupBody();
	}

	setupBody() {
		this.sprite.setBodySize(this.sprite.width, this.sprite.height - 150);
	}

	collide(bodyA, bodyB, axis) {
		//What happens when player stands up inside a crawlspace?
		if (bodyB.name === "player" && axis === "y") {
			//TODO: Add code for handling this situation
		}
	}
}