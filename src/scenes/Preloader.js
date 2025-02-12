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

        this.load.audio('myMusic', '/sound/bg.mp3');
        this.load.audio('myBall', '/sound/ball.mp3');
        this.load.audio('myUdar', '/sound/udar.mp3');
        this.load.audio('myNet', '/sound/net.mp3');
        this.load.audio('myStar', '/sound/star.mp3');

        this.load.image('ball', '/image/ball.png');
        this.load.image('logo', '/image/logo.png');
        this.load.image('graffity', '/image/graffity.png');
        this.load.image('ring', '/image/ring.png');
        this.load.image('backboard', '/image/shield.png')
        
        this.load.image('star', '/image/Star.png');
        this.load.image('dark_ball', '/image/dark_ball.png');
        this.load.image('paddle', '/image/paddle.png');
        this.load.image('bg2', '/image/bg2.png');
        this.load.image('bg_main', '/image/bg_main.png');
        this.load.image('bg_levels', '/image/levels.png');

        this.load.image('stars', '/image/stars.png');
        this.load.image('1stars', '/image/1stars.png');
        this.load.image('2stars', '/image/2stars.png');
        this.load.image('3stars', '/image/3stars.png');

        // настройки
        this.load.image('slider_line', '/image/slider_line.png');

        this.load.image('box', '/image/box.png');
        this.load.image('chek', '/image/chek.png');

        
        this.load.image('button_win', '/image/button_win.png');
        this.load.image('button_fall', '/image/button_fall.png');
        this.load.image('game_over', '/image/game_over.png');

        this.load.image('start_button', '/image/start_button.png');
        this.load.image('start_button_activ', '/image/start_button_activ.png');

        this.load.image('start_settings', '/image/start_settings.png');
        this.load.image('start_settings_activ', '/image/start_settings_activ.png');
        
        this.load.image('settings', '/image/settings.png');
        this.load.image('settings_activ', '/image/settings_activ.png');

        this.load.image('none_button', '/image/none_button.png');
        this.load.image('1%', '/image/one_procent.png');

        
    }

    create ()
    {
        //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
        //  For example, you can define global animations here, so we can use them in other scenes.

        //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
        this.scene.start('MainMenu');
    }
}
