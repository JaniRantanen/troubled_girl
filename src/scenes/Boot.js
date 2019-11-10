
import webfontloader from "webfontloader";
import { TextElement } from "../UI/";

export class Boot extends Phaser.Scene {
    constructor() {
        super({ key: "Boot" });
    }

    preload() {
        /* LOADING BAR AND TEXT */
        let { width, height } = this.sys.game.canvas;
        let progressPercent = this.add.existing(new TextElement(this, (width / 2), (height / 2), "0")).setFontSize(64);
        let currentFileText = this.add.existing(new TextElement(this, (width / 2), (height / 2) + 100, "")).setFontSize(16);

        this.load.on('progress', function (value) {
            progressPercent.setText(`${Math.floor(value * 100)} %`);
        });

        this.load.on('fileprogress', function (file) {
            currentFileText.setText(`Loading: ${file.src}`);
        });

        this.load.on('complete', function () {
            progressPercent.destroy();
            currentFileText.destroy();
        });


        /* ASSET LOADING */
        this.load.setPath("assets/");

        // Music
        this.load.audio("theme", "music/theme.mp3");

        // Graphics
        this.load.image("etummaisetpuut", "images/etummaisetpuut.png");
        this.load.image("keskimmaisetpuut", "images/keskimmaisetpuut.png");
        this.load.image("taaimmaisetpuut", "images/Taaimmaisetpuut.png");
        this.load.image("Taustataivas", "images/Taustataivas.png");

        // Player sprites
        let spriteconf = { frameWidth: 200, frameHeight: 200, spacing: 2 };
        this.load.image('player', 'sprites/player/player.png');
        this.load.spritesheet('dash', 'sprites/player/dash.png', spriteconf);
        this.load.spritesheet('idle', 'sprites/player/idle.png', spriteconf);
        this.load.spritesheet('idle_stare', 'sprites/player/idle_stare.png', spriteconf);
        this.load.spritesheet('jump_fall', 'sprites/player/jump_fall.png', spriteconf);
        this.load.spritesheet('jump_up', 'sprites/player/jump_up.png', spriteconf);
        this.load.spritesheet('run', 'sprites/player/run.png', spriteconf);
        this.load.spritesheet('slide', 'sprites/player/slide.png', spriteconf);

        // Enemy sprites
        this.load.spritesheet('enemy_hum_idle', 'sprites/enemy_hum/enemy_hum.png', { frameWidth: 400, frameHeight: 400, spacing: 2 });

        // Placeholders
        this.load.image('item', 'placeholders/item.png');
        this.load.image('button', 'placeholders/button.png');
        this.load.image('oldman', 'placeholders/oldMan.png');

        //LEVELS
        this.load.tilemapImpact('map', '../levels/sandbox.js');
        this.load.image('tiles', '../assets/tilesets/tileset.png');


        // Fonts
        webfontloader.load({
            google: {
                families: ['Montserrat', 'Cinzel Decorative']
            }
        });

    };

    create() {

        this.cameras.main.once('camerafadeoutcomplete', function (camera) {

            if (process.env.NODE_ENV === "development") {
                this.scene.start("Sandbox");
            } else {
                this.scene.start("MainMenu");
            }

        }, this);

        this.cameras.main.fadeOut(500);

    }

}