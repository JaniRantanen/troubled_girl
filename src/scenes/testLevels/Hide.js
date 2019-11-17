import { SimpleEnemy } from "../../characters/SimpleEnemy";
import { Player } from "../../characters/Player";
import { Exit } from "../../items/Exit";
import { Hideout } from "../../items/Hideout";

export class Hide extends Phaser.Scene {
    constructor() {
        super({ key: "hide" });
        this.player = null;
        this.music = null;
        this.exits = null;
        this.enemies = null;
    }
    create() {
        // WORLD
        let worldWidth = 1600 * 3;
        this.impact.world.setBounds(0, 0, worldWidth, 1800);

        // LEVEL
        var map = this.make.tilemap({ key: "hide" });
        var tileset = map.addTilesetImage("../assets/tilesets/tileset.png", "tiles");
        var layer = map.createStaticLayer("map", tileset, 0, 0);
        this.impact.world.setCollisionMap("hide");

        // PLAYER
        this.player = new Player(this, 225, 1600);

        // CAMERAS
        this.cameras.main.setBounds(0, 0, worldWidth, 1800);
        this.cameras.main.startFollow(this.player.sprite, true, 0.1, 0.1);

        // LEVEL EXITS
        this.exits = [new Exit(this, {
            x: worldWidth - 300,
            y: 1600,
            spriteKey: "door",
            sceneKey: "battleground",
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
        let pointA = new Phaser.Math.Vector2(1000, 1600);
        let pointB = new Phaser.Math.Vector2(worldWidth - 600, 1600)
        let hideTestEnemy = new SimpleEnemy(this, pointA.x, pointA.y);
        hideTestEnemy.patrolArea = {
            "start": pointA,
            "end": pointB,
        }

        let hideTestEnemy2 = new SimpleEnemy(this, pointB.x, pointB.y);
        hideTestEnemy2.patrolArea = {
            "start": pointB,
            "end": pointA,
        }

        //HIDEABLE OBJECTS
        let hideouts = [
            new Hideout(this, 500, 1600, "metsa_pensas"),
            new Hideout(this, 1500, 1600, "metsa_kivi"),
            new Hideout(this, 2000, 1600, "metsa_kanto"),
            new Hideout(this, 2500, 1600, "metsa_puu")
        ];
    }
}