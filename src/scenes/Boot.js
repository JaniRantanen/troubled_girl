
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

        // Art objects
        this.load.image('metsa_kanto', 'images/metsa_kanto.png');
        this.load.image('metsa_kivi', 'images/metsa_kivi.png');
        this.load.image('metsa_pensas', 'images/metsa_pensas.png');
        this.load.image('metsa_puu', 'images/metsa_puu.png');


        // Player sprites and animations
        let spriteconf = { frameWidth: 200, frameHeight: 200, spacing: 2 };
        this.load.image('player', 'sprites/player/player.png');
        this.load.atlas('TG_girl_idle', 'sprites/player/TG_girl_idle.png', 'sprites/player/TG_girl_idle.json');
        this.load.atlas('TG_girl_eyes_stare', 'sprites/player/TG_girl_eyes_stare.png', 'sprites/player/TG_girl_eyes_stare.json');
        this.load.atlas('TG_girl_eyes_turn', 'sprites/player/TG_girl_eyes_turn.png', 'sprites/player/TG_girl_eyes_turn.json');
        this.load.atlas('TG_girl_slide', 'sprites/player/TG_girl_slide.png', 'sprites/player/TG_girl_slide.json');
        this.load.atlas('TG_girl_run', 'sprites/player/TG_girl_run.png', 'sprites/player/TG_girl_run.json');
        this.load.atlas('TG_girl_jumpup', 'sprites/player/TG_girl_jumpup.png', 'sprites/player/TG_girl_jumpup.json');
        this.load.atlas('TG_girl_jumpdrop', 'sprites/player/TG_girl_jumpdrop.png', 'sprites/player/TG_girl_jumpdrop.json');
        this.load.atlas('TG_girl_crawlidle', 'sprites/player/TG_girl_crawlidle.png', 'sprites/player/TG_girl_crawlidle.json');
        this.load.atlas('TG_girl_crawlmove', 'sprites/player/TG_girl_crawlmove.png', 'sprites/player/TG_girl_crawlmove.json');
        this.load.atlas('TG_girl_dash', 'sprites/player/TG_girl_dash.png', 'sprites/player/TG_girl_dash.json');
        this.load.atlas('TG_girl_doublejump', 'sprites/player/TG_girl_doublejump.png', 'sprites/player/TG_girl_doublejump.json');
        this.load.atlas('TG_girl_hit', 'sprites/player/TG_girl_hit.png', 'sprites/player/TG_girl_hit.json');
        this.load.atlas('TG_girl_pull', 'sprites/player/TG_girl_pull.png', 'sprites/player/TG_girl_pull.json');
        this.load.atlas('TG_girl_push', 'sprites/player/TG_girl_push.png', 'sprites/player/TG_girl_push.json');

        // Enemy sprites
        this.load.spritesheet('enemy_hum_idle', 'sprites/enemy_hum/enemy_hum.png', { frameWidth: 400, frameHeight: 400, spacing: 2 });

        // Placeholders
        this.load.image('item', 'placeholders/item.png');
        this.load.image('button', 'placeholders/button.png');
        this.load.image('oldman', 'placeholders/oldMan.png');
        this.load.image('box', 'placeholders/box.png');
        this.load.image('door', 'placeholders/door.png');

        //LEVELS
        this.load.tilemapImpact('sandbox', '../levels/sandbox.js');
        this.load.tilemapImpact('pushpull', '../levels/pushpull.js');
        this.load.tilemapImpact('battleground', '../levels/battleground.js');
        this.load.tilemapImpact('hide', '../levels/hide.js');

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
                this.scene.start("hide");
            } else {
                this.scene.start("mainmenu");
            }

        }, this);

        this.cameras.main.fadeOut(500);

    }

}