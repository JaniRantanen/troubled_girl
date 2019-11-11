import { SimpleEnemy } from "../characters/SimpleEnemy";


/*
    TODO: Clean this horrible monolithic mess of logic
*/
export class Sandbox extends Phaser.Scene {
    constructor() {
        super({ key: "Sandbox" });

        this.controls = null;
        this.player = null;
        this.oldman = null;
        this.music = null;
    }
    preload() {
        if (this.music == null) {
            this.music = this.sound.add("theme", { loop: true }).play();
        }
    }

    create() {
        //WORLD
        let worldWidth = 1600 * 3;
        this.impact.world.setBounds(0, 0, worldWidth, 1800);

        for (let i = 0; i <= worldWidth; i = i + 1600) {
            this.add.image(i, -100, "Taustataivas").setOrigin(0, 0).setDepth(-10)
            this.add.image(i, -100, "taaimmaisetpuut").setOrigin(0, 0).setDepth(-8)
            this.add.image(i, -100, "keskimmaisetpuut").setOrigin(0, 0).setDepth(-6)
            this.add.image(i, -100, "etummaisetpuut").setOrigin(0, 0).setDepth(-4)
        }


        // CONTROLS 
        this.controls = this.input.keyboard.createCursorKeys();

        // PLAYER
        this.player = this.impact.add.sprite(300, 1700, "player")
            .setActiveCollision()
            .setTypeA()
            .setMaxVelocity(500)
            .setFriction(1000, 100)
            .setGravity(10)
            .setBodySize(50, 175)
            .setOffset(75, 25)

        this.player.setCollideCallback(this.collide, this);

        this.player.hurt = false;
        this.player.body.accelGround = 1200;
        this.player.body.accelAir = 600;
        this.player.body.jumpSpeed = 700;

        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('idle', { start: 0, end: 2 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'idle_stare',
            frames: this.anims.generateFrameNumbers('idle_stare', { start: 0, end: 4 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNumbers('run', { start: 0, end: 4 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'jump_fall',
            frames: this.anims.generateFrameNumbers('jump_fall', { start: 0, end: 4 }),
            frameRate: 10,
            repeat: 1
        });
        this.anims.create({
            key: 'jump_up',
            frames: this.anims.generateFrameNumbers('jump_up', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: 1
        });

        this.anims.create({
            key: 'slide',
            frames: this.anims.generateFrameNumbers('slide', { start: 0, end: 7 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'dash',
            frames: this.anims.generateFrameNumbers('dash', { start: 0, end: 7 }),
            frameRate: 10,
            repeat: 1
        });

        // OLD MAN
        this.oldman = this.impact.add.sprite(4200, 1300, "oldman")
            .setActiveCollision()
            .setTypeA()
            .setMaxVelocity(500)
            .setFriction(1000, 100)
            .setGravity(10)
            .setBodySize(50, 175)
            .setOffset(75, 25)

        this.oldman.body.name = "oldman";

        this.cameras.main.setBounds(0, 0, worldWidth, 1800);
        this.cameras.main.startFollow(this.player, true, 0.1, 0.1);


        //ENEMY

        let initialGuard = new SimpleEnemy(this, 1000, 1600);
        let pitGuard = new SimpleEnemy(this, 2500, 1600);
        let pitGuard_2 = new SimpleEnemy(this, 2800, 1600);

        // ITEM
        this.item = this.impact.add.sprite(150, 1400, "item");
        this.item.setFixedCollision();
        this.item.body.name = "boots";

        //LEVEL
        var map = this.make.tilemap({ key: 'map' });
        var tileset = map.addTilesetImage('../assets/tilesets/tileset.png', 'tiles');
        var layer = map.createStaticLayer('map', tileset, 0, 0);
        this.impact.world.setCollisionMap('map');

    }

    update(time, delta) {
        var acceleration = this.player.body.standing ? this.player.body.accelGround : this.player.body.accelAir;

        if (this.controls.left.isDown) {
            this.player.setAccelerationX(-acceleration);
            this.player.flipX = true;
            this.player.anims.play('run', true);
        }
        else if (this.controls.right.isDown) {
            this.player.setAccelerationX(acceleration);
            this.player.flipX = false;
            this.player.anims.play('run', true);
        }
        else {
            this.player.setAccelerationX(0);
        }

        if (this.controls.up.isDown && this.player.body.standing) {
            this.player.setVelocityY(-this.player.body.jumpSpeed);
            this.player.anims.play('jump_up');
        }

        if (this.player.vel.y > 0) {
            this.player.anims.play('jump_fall');
        }

        if (this.player.vel.x === 0 && this.player.vel.y === 0) {
            this.player.anims.play("idle", true);

        }

        //TODO: Add stare animation after 3 seconds of inactivity
        //TODO: Add slide
        //TODO: Add Dash

    }

    collide(bodyA, bodyB, axis) {
        console.log(bodyB)
        if (!this.player.hurt) {
            if (bodyB.name == "bottom") {
                this.player.hurt = true;
                this.cameras.main.flash(125);
                setTimeout(() => {
                    this.scene.restart();
                }, 125);
            }

            if (bodyB.type === 2) {
                this.player.hurt = true;
                this.cameras.main.shake(125);
                setTimeout(() => {
                    this.scene.restart();
                }, 250);
            }

            if (bodyB.name === "boots") {
                this.player.body.jumpSpeed = this.player.body.jumpSpeed * 1.5;
                this.item.destroy();
            }

            if (bodyB.name === "oldman") {
                this.cameras.main.fadeOut();
                this.scene.start("Win");
            }
        }
    }
}