
import webfontloader from "webfontloader";
import { TextElement } from "../../UI/";

export class Boot extends Phaser.Scene {
    constructor() {
        super({ key: "boot" });
    }

    preload() {
        /* LOADING BAR AND TEXT */
        let { width, height } = this.sys.game.canvas;
        let progressPercent = this.add.existing(new TextElement(this, (width / 2), (height / 2), "0")).setFontSize(64);
        let currentFileText = this.add.existing(new TextElement(this, (width / 2), (height / 2) + 100, "")).setFontSize(16);

        this.load.on("progress", function (value) {
            progressPercent.setText(`${Math.floor(value * 100)} %`);
        });

        this.load.on("fileprogress", function (file) {
            currentFileText.setText(`Loading: ${file.src}`);
        });

        this.load.on("complete", function () {
            progressPercent.destroy();
            currentFileText.destroy();
        });


        /* ASSET LOADING */
        this.load.setPath("assets/");

        // Music
        this.load.audio("alkuvalikkopiisi_1", "music/alkuvalikkopiisi_1.wav");
        this.load.audio("alkuvalikkopiisi_2", "music/alkuvalikkopiisi_2.wav");
        this.load.audio("metsamusiikki", "music/metsamusiikki.wav");

        // SFX
        this.load.audio("jahtausmusiikki", "sfx/jahtausmusiikki.wav");
        this.load.audio("jump", "sfx/jump.wav");
        this.load.audio("osuma", "sfx/osuma.wav");
        this.load.audio("raahausaani", "sfx/raahausaani.wav");
        this.load.audio("vihollisaanet_1", "sfx/vihollisaanet_1.wav");
        this.load.audio("vihollisaanet_2", "sfx/vihollisaanet_2.wav");
        this.load.audio("vihollisaanet_3", "sfx/vihollisaanet_3.wav");

        // Graphics
        this.load.image("kansikuva_final", "images/kansikuva_final.png");
        this.load.image("etummaisetpuut", "images/etummaisetpuut.png");
        this.load.image("keskimmaisetpuut", "images/keskimmaisetpuut.png");
        this.load.image("taaimmaisetpuut", "images/Taaimmaisetpuut.png");
        this.load.image("Taustataivas", "images/Taustataivas.png");
        this.load.image("flat_tausta_hautausmaa", "images/flat_tausta_hautausmaa.png");
        this.load.image("flat_tausta_leikkikentta", "images/flat_tausta_leikkikentta.png");
        this.load.image("flat_tausta_metsa", "images/metsa_puu.png");
        this.load.image("tausta_metsa", "images/tausta_metsa.png");
        this.load.image("tausta_leikkikentta", "images/tausta_leikkikentta.png");
        this.load.image("tausta_kallio", "images/tausta_kallio.png");
        this.load.image("tausta_hautausmaa", "images/tausta_hautausmaa.png");


        // Art objects
        this.load.image("koti_jakkara", "images/koti_jakkara.png");
        this.load.image("koti_laatikko", "images/koti_laatikko.png");
        this.load.image("koti_lamppu", "images/koti_lamppu.png");
        this.load.image("koti_tuoli", "images/koti_tuoli.png");
        this.load.image("koti_tuoli_etu", "images/koti_tuoli_etu.png");
        this.load.image("koti_tuoli_sivu", "images/koti_tuoli_sivu.png");

        this.load.image("koti_kello", "images/koti_kello.png");
        this.load.image("koti_nojatuoli", "images/koti_nojatuoli.png");
        this.load.image("koti_poyta", "images/koti_poyta.png");
        this.load.image("koti_poytaliinalla", "images/koti_poytaliinalla.png");
        this.load.image("koti_sanky", "images/koti_sanky.png");
        this.load.image("koti_sankypeitto", "images/koti_sankypeitto.png");
        this.load.image("koti_sohva", "images/koti_sohva.png");
        this.load.image("koti_tv", "images/koti_tv.png");

        this.load.image("leikkikentta_aita", "images/leikkikentta_aita.png");
        this.load.image("leikkikentta_keinut", "images/leikkikentta_keinut.png");
        this.load.image("leikkikentta_leikkimokki", "images/leikkikentta_leikkimokki.png");
        this.load.image("leikkikentta_liukumaki", "images/leikkikentta_liukumaki.png");
        this.load.image("leikkikentta_poni", "images/leikkikentta_poni.png");
        this.load.image("leikkikentta_rengas", "images/leikkikentta_rengas.png");
        this.load.image("leikkikentta_roskis", "images/leikkikentta_roskis.png");

        this.load.image("metsa_kanto", "images/metsa_kanto.png");
        this.load.image("metsa_kivi", "images/metsa_kivi.png");
        this.load.image("metsa_pensas", "images/metsa_pensas.png");
        this.load.image("metsa_puu", "images/metsa_puu.png");

        this.load.image("leikki_ilmapallo_musta", "images/leikki_ilmapallo_musta.png");
        this.load.image("leikki_ilmapallo_vari", "images/leikki_ilmapallo_vari.png");
        this.load.image("leikki_nalle_musta", "images/leikki_nalle_musta.png");
        this.load.image("leikki_nalle_vari", "images/leikki_nalle_vari.png");
        this.load.image("leikki_tytto_pallo_musta", "images/leikki_tytto_pallo_musta.png");
        this.load.image("leikki_tytto_pallo_vari", "images/leikki_tytto_pallo_vari.png");

        this.load.image("kuu", "images/kuu.png");

        //Items
        this.load.image("item_pallo", "sprites/items/item_pallo.png");
        this.load.image("item_ilmapallo", "sprites/items/item_ilmapallo.png");
        this.load.image("item_nalle", "sprites/items/item_nalle.png");
        this.load.image("item_kukka", "sprites/items/item_kukka.png");
        this.load.image("item_hauta", "sprites/items/item_hauta.png");

        // Player sprites and animations
        this.load.image("player", "sprites/player/player.png");
        this.load.atlas("TG_girl_idle", "sprites/player/TG_girl_idle.png", "sprites/player/TG_girl_idle.json");
        this.load.atlas("TG_girl_eyes_stare", "sprites/player/TG_girl_eyes_stare.png", "sprites/player/TG_girl_eyes_stare.json");
        this.load.atlas("TG_girl_eyes_turn", "sprites/player/TG_girl_eyes_turn.png", "sprites/player/TG_girl_eyes_turn.json");
        this.load.atlas("TG_girl_slide", "sprites/player/TG_girl_slide.png", "sprites/player/TG_girl_slide.json");
        this.load.atlas("TG_girl_run", "sprites/player/TG_girl_run.png", "sprites/player/TG_girl_run.json");
        this.load.atlas("TG_girl_jumpup", "sprites/player/TG_girl_jumpup.png", "sprites/player/TG_girl_jumpup.json");
        this.load.atlas("TG_girl_jumpdrop", "sprites/player/TG_girl_jumpdrop.png", "sprites/player/TG_girl_jumpdrop.json");
        this.load.atlas("TG_girl_crawlidle", "sprites/player/TG_girl_crawlidle.png", "sprites/player/TG_girl_crawlidle.json");
        this.load.atlas("TG_girl_crawlmove", "sprites/player/TG_girl_crawlmove.png", "sprites/player/TG_girl_crawlmove.json");
        this.load.atlas("TG_girl_dash", "sprites/player/TG_girl_dash.png", "sprites/player/TG_girl_dash.json");
        this.load.atlas("TG_girl_doublejump", "sprites/player/TG_girl_doublejump.png", "sprites/player/TG_girl_doublejump.json");
        this.load.atlas("TG_girl_hit", "sprites/player/TG_girl_hit.png", "sprites/player/TG_girl_hit.json");
        this.load.atlas("TG_girl_pull", "sprites/player/TG_girl_pull.png", "sprites/player/TG_girl_pull.json");
        this.load.atlas("TG_girl_lookdown_cry_idle5fps", "sprites/player/TG_girl_lookdown_cry_idle5fps.png", "sprites/player/TG_girl_lookdown_cry_idle5fps.json");
        this.load.atlas("TG_girl_lookdown_cry5fps", "sprites/player/TG_girl_lookdown_cry5fps.png", "sprites/player/TG_girl_lookdown_cry5fps.json");
        this.load.atlas("TG_girl_lookup_cry5fps", "sprites/player/TG_girl_lookup_cry5fps.png", "sprites/player/TG_girl_lookup_cry5fps.json");
        this.load.atlas("TG_girl_cryonground2fps", "sprites/player/TG_girl_cryonground2fps.png", "sprites/player/TG_girl_cryonground2fps.json");
        this.load.atlas("TG_girl_twistangle8fps", "sprites/player/TG_girl_twistangle8fps.png", "sprites/player/TG_girl_twistangle8fps.json");

        // Dad sprites and animations
        this.load.atlas("isa_idle", "sprites/dad/isa_idle.png", "sprites/dad/isa_idle.json");
        this.load.atlas("isa_jumptry", "sprites/dad/isa_jumptry.png", "sprites/dad/isa_jumptry.json");
        this.load.atlas("isa_walk", "sprites/dad/isa_walk.png", "sprites/dad/isa_walk.json");
        this.load.atlas("varjoisa_idle", "sprites/dad/varjoisa_idle.png", "sprites/dad/varjoisa_idle.json");
        this.load.atlas("varjoisa_walk", "sprites/dad/varjoisa_walk.png", "sprites/dad/varjoisa_walk.json");

        // Mom sprites and animations
        this.load.atlas("aiti_enkeli_idle5fps", "sprites/mom/aiti_enkeli_idle5fps.png", "sprites/mom/aiti_enkeli_idle5fps.json");
        this.load.atlas("aiti_idle5fps", "sprites/mom/aiti_idle5fps.png", "sprites/mom/aiti_idle5fps.json");
        this.load.atlas("aiti_muutos7fps", "sprites/mom/aiti_muutos7fps.png", "sprites/mom/aiti_muutos7fps.json");

        // Enemy sprites and animations
        this.load.spritesheet("enemy_hum_idle", "sprites/enemy_hum/enemy_hum.png", { frameWidth: 400, frameHeight: 400, spacing: 2 });
        this.load.atlas("varjo_chase", "sprites/enemy_chaser/varjo_chase.png", "sprites/enemy_chaser/varjo_chase.json");
        this.load.atlas("varjo_spawn", "sprites/enemy_chaser/varjo_spawn.png", "sprites/enemy_chaser/varjo_spawn.json");

        // Cutscenes
        this.load.atlas("koti_ikkuna_reveal", "sprites/cutscene/koti_ikkuna_reveal.png", "sprites/cutscene/koti_ikkuna_reveal.json");
        this.load.atlas("koti_ikkuna_looking", "sprites/cutscene/koti_ikkuna_looking.png", "sprites/cutscene/koti_ikkuna_looking.json");
        this.load.atlas("koti_tv_uusi", "sprites/cutscene/koti_tv_uusi.png", "sprites/cutscene/koti_tv_uusi.json");

        // Placeholders
        this.load.image("item", "placeholders/item.png");
        this.load.image("button", "placeholders/button.png");
        this.load.image("oldman", "placeholders/oldman.png");
        this.load.image("box", "placeholders/box.png");
        this.load.image("door", "placeholders/door.png");
        this.load.image("mockbox", "placeholders/mockbox.png");
        this.load.image("widebox", "placeholders/widebox.png");

        //LEVELS
        this.load.tilemapImpact("home", "../levels/koti00.js");
        this.load.tilemapImpact("forest", "../levels/metsa.js");
        this.load.tilemapImpact("playground", "../levels/leikkikentta.js");
        this.load.tilemapImpact("graveyard", "../levels/hautausmaa.js");
        this.load.tilemapImpact("cliff", "../levels/kallio.js");

        this.load.image("tileset_background", "../assets/tilesets/tileset_background-extruded.png");
        this.load.image("tileset_foreground", "../assets/tilesets/tileset_foreground-extruded.png");
        this.load.image("tileset", "../assets/tilesets/tileset-extruded.png");

        this.load.tilemapImpact("sandbox", "../levels/sandbox.js");
        this.load.tilemapImpact("flat", "../levels/flat.js");



        // Fonts
        webfontloader.load({
            google: {
                families: ["Montserrat", "Cinzel Decorative"]
            }
        });

    };

    create() {

        this.cameras.main.once("camerafadeoutcomplete", function (camera) {

            if (process.env.NODE_ENV === "development") {
                this.scene.start("sandbox");
            } else {
                this.scene.start("mainmenu");
            }

        }, this);

        this.cameras.main.fadeOut(500);

    }

}