import { SimpleEnemy } from "../../characters/SimpleEnemy";
import { Player } from "../../characters/Player";
import { Exit } from "../../items/Exit";
import { Hideout } from "../../items/Hideout";

export class Dash extends Phaser.Scene {
    constructor() {
        super({ key: "dash" });
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
        var map = this.make.tilemap({ key: "dash" });
        var tileset = map.addTilesetImage("../assets/tilesets/tileset.png", "tiles");
        var layer = map.createStaticLayer("map", tileset, 0, 0);
        this.impact.world.setCollisionMap("dash");

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
            sceneKey: "hide",
            bodySize: {
                x: 100,
                y: 200
            },
            offset: {
                x: 50,
                y: 0,
            }
        })];
    }
}