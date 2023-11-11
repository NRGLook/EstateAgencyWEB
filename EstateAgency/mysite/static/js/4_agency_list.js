// Ваши существующие функции и код

// Добавляем обработчики событий для эффекта объема
var immovablesCards = document.querySelectorAll('.immovables-card');

immovablesCards.forEach(function (card) {
    card.addEventListener('mouseover', function () {
        card.style.transform = 'scale(1.1)';
        card.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
    });

    card.addEventListener('mouseout', function () {
        card.style.transform = 'scale(1)';
        card.style.boxShadow = 'none';
    });
});
