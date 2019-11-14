import { SimpleEnemy } from "../characters/SimpleEnemy";
import { Box } from "../items/Box";
import { Player } from "../characters/Player";


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


        this.player = new Player(this, 500, 1700);

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
        this.cameras.main.startFollow(this.player.sprite, true, 0.1, 0.1);


        //ENEMY

        //let initialGuard = new SimpleEnemy(this, 1300, 1600);
        let pitGuard = new SimpleEnemy(this, 2500, 1600);
        let pitGuard_2 = new SimpleEnemy(this, 2800, 1600);

        // BOX
        let box = new Box(this, 600, 1600);
        let box2 = new Box(this, 900, 1650);
        let box3 = new Box(this, 900, 1550);
        let box4 = new Box(this, 900, 1450);

        // ITEM
        this.item = this.impact.add.sprite(150, 1400, "item");
        this.item.setFixedCollision();
        this.item.body.name = "boots";


        //LEVEL
        var map = this.make.tilemap({ key: "map" });
        var tileset = map.addTilesetImage("../assets/tilesets/tileset.png", "tiles");
        var layer = map.createStaticLayer("map", tileset, 0, 0);
        this.impact.world.setCollisionMap("map");

        console.log(this);

    }

    update(time, delta) {


    }



}