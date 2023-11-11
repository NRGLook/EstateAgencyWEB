function calculateAgeAndCheckPermission() {
    // Получаем значения введенной даты и пароля родителей
    const dobInput = document.getElementById('dob');
    const parentPasswordInput = document.getElementById('parentPassword');
    const dobValue = dobInput.value;
    const parentPassword = parentPasswordInput.value;

    // Парсим введенную дату
    const dobDate = new Date(dobValue);

    // Получаем текущую дату
    const currentDate = new Date();

    // Вычисляем разницу в годах
    const age = currentDate.getFullYear() - dobDate.getFullYear();

    // Проверяем, является ли пользователь совершеннолетним
    if (age >= 18) {
        // Определяем день недели
        const daysOfWeek = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
        const dayOfWeek = daysOfWeek[dobDate.getDay()];

        // Выводим сообщение
        Swal.fire({
            title: 'Успех!',
            text: `Вы совершеннолетний. День недели вашего рождения: ${dayOfWeek}`,
            icon: 'success',
            confirmButtonText: 'OK'
        });
    } else {
        // Если пользователь несовершеннолетний, запрашиваем пароль родителей
        Swal.fire({
            title: 'Требуется разрешение родителей',
            input: 'password',
            inputLabel: 'Введите пароль родителей',
            inputPlaceholder: 'Пароль',
            showCancelButton: true,
            confirmButtonText: 'Проверить',
            cancelButtonText: 'Отмена',
            preConfirm: (parentPassword) => {
                if (parentPassword === 'родительскийпароль') { // Замените на фактический пароль родителей
                    return true;
                } else {
                    Swal.showValidationMessage('Неверный пароль');
                    return false;
                }
            }
        }).then((result) => {
            if (result.isConfirmed) {
                // Выводим сообщение после ввода правильного пароля родителей
                Swal.fire({
                    title: 'Успех!',
                    text: 'Вам разрешено использование сайта!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
            }
        });
    }
}