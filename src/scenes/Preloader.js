import { Scene } from 'phaser';

export class Preloader extends Scene
{
    constructor ()
    {
        super('Preloader');
    }

    init ()
    {
        //  We loaded this image in our Boot Scene, so we can display it here
        //this.add.image(512, 384, 'background');
        this.cameras.main.setBackgroundColor(0x3A4452);

        //  A simple progress bar. This is the outline of the bar.
        this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff);

        //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
        const bar = this.add.rectangle(512-230, 384, 4, 28, 0xffffff);

        //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
        this.load.on('progress', (progress) => {

            //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
            bar.width = 4 + (460 * progress);

        });
    }

    preload ()
    {
        //  Load the assets for the game - Replace with your own assets
        this.load.setPath('assets');

        this.load.image('logo', 'logo.png');
        this.load.image('ring', 'ring.png');
        this.load.image('backboard', 'shield.png')
        this.load.image('ball', 'ball.png');
        this.load.image('dark_ball', 'dark_ball.png');
        this.load.image('paddle', 'paddle.png');
        this.load.image('bg2', 'bg2.png');
        this.load.image('bg_main', 'bg_main.png');
        this.load.image('bg_levels', 'levels.png');

        this.load.image('stars', 'stars.png');
        this.load.image('1stars', '1stars.png');
        this.load.image('2stars', '2stars.png');
        this.load.image('3stars', '3stars.png');
        
        this.load.image('button_win', 'button_win.png');
        this.load.image('button_fall', 'button_fall.png');
        this.load.image('game_over', 'game_over.png');

        this.load.image('start_button', 'start_button.png');
        this.load.image('start_button_activ', 'start_button_activ.png');

        this.load.image('start_settings', 'start_settings.png');
        this.load.image('start_settings_activ', 'start_settings_activ.png');
        
        this.load.image('settings', 'settings.png');
        this.load.image('settings_activ', 'settings_activ.png');

        this.load.image('none_button', 'none_button.png');
        this.load.image('1%', 'one_procent.png');

        
    }

    create ()
    {
        //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
        //  For example, you can define global animations here, so we can use them in other scenes.

        //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
        this.scene.start('MainMenu');
    }
}
