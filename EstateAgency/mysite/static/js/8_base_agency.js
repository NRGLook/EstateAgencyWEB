        // Функция для отображения обратного отсчета
        function showCountdown() {
            const countdownElement = document.getElementById('countdown');
            const countdownStart = localStorage.getItem('countdownStart');
            const currentTime = new Date().getTime();
            
            if (!countdownStart || currentTime - countdownStart > 3600000) {
                // Если нет сохраненного времени начала или прошел час, начинаем новый отсчет
                localStorage.setItem('countdownStart', currentTime);
                localStorage.setItem('remainingTime', 3600000);
            }

            // Получаем оставшееся время
            let remainingTime = parseInt(localStorage.getItem('remainingTime'));

            // Обновляем отображение
            function updateCountdown() {
                const minutes = Math.floor(remainingTime / 60000);
                const seconds = Math.floor((remainingTime % 60000) / 1000);
                countdownElement.innerHTML = `Time remaining: ${minutes} minutes ${seconds} seconds`;

                if (remainingTime <= 0) {
                    clearInterval(intervalId);
                    countdownElement.innerHTML = 'Time is up!';
                } else {
                    remainingTime -= 1000;
                    localStorage.setItem('remainingTime', remainingTime);
                }
            }

            // Обновляем отсчет каждую секунду
            const intervalId = setInterval(updateCountdown, 1000);

            // Вызываем updateCountdown в первый раз, чтобы избежать задержки
            updateCountdown();
        }

        // Вызываем функцию при загрузке страницы
        showCountdown();