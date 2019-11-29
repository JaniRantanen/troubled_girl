

import { Player } from "../characters/Player";
import { setupLevel, Pause, setupScene } from "../utils/utils";
import { SimpleEnemy } from "../characters/SimpleEnemy";
import { ShadowEnemy } from "../characters/ShadowEnemy";
import { DraggableItem } from "../items/DraggableItem";
import { Toy } from "../items/Toy";
import { Checkpoint } from "../items/Checkpoint";
import { dragUnlock, dashSlideUnlock, doublejumpUnlock } from "../cutscenes/abilityUnlock";
import { Trigger } from "../items/Trigger";

export class Sandbox extends Phaser.Scene {
    constructor() {
        super({ key: "sandbox" });
        this.player = null;
        this.dialogScene = null;
        this.musicScene = null;
        this.level = null;
    }

    preload() {

    }

    async create() {
        let floor_1_y = 1300;
        this.level = setupLevel(this, "sandbox");
        setupScene(this, this.level, "tausta_metsa", { x: 10880, y: floor_1_y });
        this.musicScene.backgroundMusic = this.sound.add("metsamusiikki", { loop: true, volume: 0.2 });
    }

    update() {
        this.musicScene.handleMusicUpdate(this);
    }
}