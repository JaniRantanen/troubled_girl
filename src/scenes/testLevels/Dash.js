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
        let worldWidth = 1600 * 6;
        this.impact.world.setBounds(0, 0, worldWidth, 1800);

        // LEVEL
        var map = this.make.tilemap({ key: "dash" });
        var tileset = map.addTilesetImage("../assets/tilesets/tileset.png", "tiles");
        var tileset_2 = map.addTilesetImage("../assets/tilesets/spritesheet.png", "tiles2");
        var mapLayer = map.createStaticLayer("map", tileset, 0, 0);
        var foregroundLayer = map.createStaticLayer("foreground", tileset_2, 0, 0).setDepth(1);
        var backgroundLayer = map.createStaticLayer("background", tileset, 0, 0).setAlpha(0.1);
        this.impact.world.setCollisionMap("dash");

        // PLAYER
        this.player = new Player(this, 300, 1600);

        // CAMERAS
        this.cameras.main.setBounds(0, 0, worldWidth, 1800);
        this.cameras.main.startFollow(this.player.sprite, true, 0.1, 0.1);

        // LEVEL EXITS
        this.exits = [new Exit(this, {
            x: worldWidth - 300,
            y: 1600,
            spriteKey: "door",
            sceneKey: "sandbox",
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