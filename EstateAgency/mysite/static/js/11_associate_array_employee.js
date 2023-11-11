// Используем объект для хранения значений
var values = {};

function calculateSum() {
    // Получаем значения из формы и сохраняем их в объекте
    values['input1'] = parseFloat(document.getElementById('input1').value);
    values['input2'] = parseFloat(document.getElementById('input2').value);

    // Проверяем, что введены числа
    if (isNaN(values['input1']) || isNaN(values['input2'])) {
        alert('Пожалуйста, введите числа.');
        return;
    }

    // Рассчитываем сумму
    var sum = values['input1'] + values['input2'];

    // Выводим результат на страницу
    document.getElementById('result').innerHTML = 'Sum: ' + sum;
}
