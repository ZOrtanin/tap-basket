
import { Boot } from './scenes/Boot';
import { Game } from './scenes/Game';
import { GameOver } from './scenes/GameOver';
import { MainMenu } from './scenes/MainMenu';
import { Levels } from './scenes/levels';
import { Preloader } from './scenes/Preloader';
import { Settings } from './scenes/Settings';


//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config = {
    type: Phaser.AUTO,
    width: 1080,
    height: 1984,
    parent: 'game-container',
    backgroundColor: '#3A4452',
    physics: {

        default: 'matter',
        matter: {
            gravity: { y: 1 },
            debug: false
        }
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [
        Boot,
        Preloader,
        MainMenu,
        Levels,
        Game,
        GameOver,
        Settings
    ]
};

export default new Phaser.Game(config);
