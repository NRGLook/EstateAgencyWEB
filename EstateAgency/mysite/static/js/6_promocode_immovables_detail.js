    async function calculateDiscount() {
        const originalPrice = parseFloat(document.getElementById('immovablesOriginalPrice').value);
        const promoCode = parseInt(document.getElementById('immovablesPromoCode').value);

        if (isNaN(originalPrice) || isNaN(promoCode)) {
            alert('Пожалуйста, введите корректные числовые значения.');
            return;
        }

        try {
            // Оставлены ваши поля и код для отправки данных на сервер, если это необходимо

            // Рассчитываем скидку
            const discount = originalPrice * (promoCode / 100);
            const discountedPrice = originalPrice - discount;

            // Выводим результат на страницу
            document.getElementById('immovablesResult').innerHTML = `Цена со скидкой: ${discountedPrice.toFixed(2)}`;
        } catch (error) {
            console.error('Произошла ошибка:', error);
        }
    }