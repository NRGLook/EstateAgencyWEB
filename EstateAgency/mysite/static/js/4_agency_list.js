// agency_list.js

// Функция добавляет эффект при наведении на карточку
function addHoverEffect(card) {
    card.classList.add('hovered');
}

// Функция убирает эффект при уходе с карточки
function removeHoverEffect(card) {
    card.classList.remove('hovered');
}

// Навешиваем обработчики событий на все карточки
document.querySelectorAll('.immovables-card').forEach(function(card) {
    card.addEventListener('mouseover', function() {
        addHoverEffect(card);
    });

    card.addEventListener('mouseout', function() {
        removeHoverEffect(card);
    });

    card.addEventListener('click', function() {
        window.location.href = card.dataset.url; // Переходим по ссылке из data-атрибута
    });
});
