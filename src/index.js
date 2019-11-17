
import { Boot, MainMenu, Win } from "./scenes";
import { Sandbox, PushPull, Battleground, Hide } from "./scenes";
import { _DEBUG } from "./scenes/_DEBUG";

var game = new Phaser.Game({
    width: 1600,
    height: 900,
    type: Phaser.AUTO,
    scene: [Boot, MainMenu, Win, Sandbox, PushPull, Hide, Battleground, _DEBUG],
    physics: {
        default: 'impact',
        impact: {
            gravity: 100,
            debug: process.env.NODE_ENV === "development"
        }
    },

    backgroundColor: "#b9b9b9",
});