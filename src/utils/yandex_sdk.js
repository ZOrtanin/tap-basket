export default class YandexSDKFile extends Phaser.Loader.File {
    constructor(loader) {
        super(loader, {
            type: 'script',
            key: 'yandexSDK'
        });
    }

    load() {
        console.log('начинаем загрузку сдк')
        const script = document.createElement('script');
        script.src = '/sdk.js';
        script.onload = () => {
            this.loader.scene.registry.set('yandexSDKLoaded', true);
            this.loader.nextFile(this, true);
        };
        script.onerror = () => {
            this.loader.scene.registry.set('yandexSDKLoaded', false);
            this.loader.nextFile(this, false);
        };
        document.head.appendChild(script);
    }
}
