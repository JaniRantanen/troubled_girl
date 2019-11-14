export class Box {
	constructor(scene, x, y) {
		this.scene = scene;
		this.sprite = scene.impact.add.sprite(x, y, "box");
		this.sprite.setData("draggable", true);
		this.sprite.setData("isBeingMoved", false);
		this.initialize();
	}

	initialize() {
		this.sprite.setActiveCollision();
		this.sprite.setTypeA();
		this.sprite.setGravity(10);
		this.sprite.setMaxVelocity(500)

		this.scene.events.on("update", this.update, this);
		this.sprite.drag = this.drag;
		this.sprite.drag = this.drop;
	}



	update(time, delta) {
		if (this.sprite.getData("isBeingMoved")) {
			let { x, y } = this.scene.player.sprite;
			this.sprite.setFriction(100);

			let halfWidth = this.sprite.body.size.x / 2;
			let xPosition = this.scene.player.currentFacing === "right" ? halfWidth : -halfWidth * 2;

			this.sprite.body.pos = {
				x: x + xPosition,
				y: y,
			};
		} else {
			this.sprite.setFriction(10000000);
			this.sprite.setFixedCollision();
		}
	}

	drag() {
		this.sprite.setData("isBeingMoved", true);
	}

	drop() {
		this.sprite.setData("isBeingMoved", false);
	}
}