

import { Player } from "../characters/Player";
import { setupLevel } from "../utils/utils";

export class Sandbox extends Phaser.Scene {
    constructor() {
        super({ key: "sandbox" });
        this.player = null;
    }
    create() {
        this.player = new Player(this, 225, 1600);
        let level = setupLevel(this, "sandbox");
        this.cameras.main.startFollow(this.player.sprite, true, 0.1, 0.1);
        this.cameras.main.setZoom(0.5);
    }

}