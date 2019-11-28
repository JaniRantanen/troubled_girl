export class Crawlspace {
	constructor(scene, x, y, spriteKey) {
		this.scene = scene;
		this.sprite = scene.impact.add.sprite(x, y, spriteKey);
		this.sprite.setFixedCollision();
		this.sprite.setGravity(0);
		this.sprite.setCollideCallback(this.collide, this);
		this.sprite.setBodySize(this.sprite.width, this.sprite.height - 150);
		this.createTileCollision();
	}

	createTileCollision() {
		console.log(this.scene.impact.world.collisionMap);

	}

}