// Инициализация ScrollMagic
const controller = new ScrollMagic.Controller();

// Создаем сцену для каждого элемента с классом 'scroll-animation'
document.querySelectorAll('.scroll-animation').forEach(element => {
    new ScrollMagic.Scene({
        triggerElement: element,
        reverse: false, // Анимация будет проигрываться только один раз при скроллинге вниз
    })
    .setClassToggle(element, 'show') // Добавляем класс 'show' при достижении элемента
    .addTo(controller);
});
