export function getRandomInt(min, max) {
    min = Math.ceil(min); // Округление минимального значения вверх
    max = Math.floor(max); // Округление максимального значения вниз
    return Math.floor(Math.random() * (max - min + 1)) + min; // Генерация случайного числа
}
