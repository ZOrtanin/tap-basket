export default class GameProgress {
    constructor(storageKey = 'gameProgress') {
        this.storageKey = storageKey; // Ключ для хранения прогресса
    }

    save(progress) {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(progress));
            //console.log('Прогресс сохранён успешно:', progress);
        } catch (error) {
            console.error('Ошибка при сохранении прогресса:', error);
        }
    }

    load() {
        try {
            const data = localStorage.getItem(this.storageKey);
            if (data) {
                //console.log('Прогресс загружен успешно');
                return JSON.parse(data);
            } else {
                //console.log('Прогресс не найден');
                return null;
            }
        } catch (error) {
            console.error('Ошибка при загрузке прогресса:', error);
            return null;
        }
    }

    clear() {
        try {
            localStorage.removeItem(this.storageKey);
            console.log('Прогресс удалён');
        } catch (error) {
            console.error('Ошибка при удалении прогресса:', error);
        }
    }
}
