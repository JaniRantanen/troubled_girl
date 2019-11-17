import { SimpleEnemy } from "../../characters/SimpleEnemy";
import { Player } from "../../characters/Player";
import { Exit } from "../../items/Exit";

export class Sandbox extends Phaser.Scene {
    constructor() {
        super({ key: "sandbox" });
        this.player = null;
        this.music = null;
        this.exits = null;
        this.enemies = null;
    }
    preload() {
        if (this.music === null) {
            this.music = this.sound.add("theme", { loop: true }).play();
        }
    }

    create() {
        // WORLD
        let worldWidth = 1600 * 3;
        this.impact.world.setBounds(0, 0, worldWidth, 1800);

        // LEVEL
        var map = this.make.tilemap({ key: "sandbox" });
        var tileset = map.addTilesetImage("../assets/tilesets/tileset.png", "tiles");
        var layer = map.createStaticLayer("map", tileset, 0, 0);
        this.impact.world.setCollisionMap("sandbox");

        // BACKGROUND
        for (let i = 0; i <= worldWidth; i = i + 1600) {
            this.add.image(i, -100, "Taustataivas").setOrigin(0, 0).setDepth(-10)
            this.add.image(i, -100, "taaimmaisetpuut").setOrigin(0, 0).setDepth(-8)
            this.add.image(i, -100, "keskimmaisetpuut").setOrigin(0, 0).setDepth(-6)
            this.add.image(i, -100, "etummaisetpuut").setOrigin(0, 0).setDepth(-4)
        }

        // PLAYER
        this.player = new Player(this, 225, 1700);

        // CAMERAS
        this.cameras.main.setBounds(0, 0, worldWidth, 1800);
        this.cameras.main.startFollow(this.player.sprite, true, 0.1, 0.1);

        // LEVEL EXITS
        this.exits = [new Exit(this, {
            x: 1000,
            y: 500,
            spriteKey: "door",
            sceneKey: "pushpull",
            bodySize: {
                x: 100,
                y: 200
            },
            offset: {
                x: 50,
                y: 0,
            }
        })];
        //ENEMIES
        let bottomGuard = new SimpleEnemy(this, 1300, 1600);
        bottomGuard.patrolArea.end.x = worldWidth - 300;
    }

    update(time, delta) {
    }
}