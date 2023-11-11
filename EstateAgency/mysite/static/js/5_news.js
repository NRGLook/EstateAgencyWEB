// Функция для создания компонентов изменения шрифта и фона
function createFontAndColorComponents() {
    // Создаем элементы для изменения размера шрифта
    const fontSizeLabel = document.createElement('label');
    fontSizeLabel.textContent = 'Font Size: ';

    const fontSizeInput = document.createElement('input');
    fontSizeInput.type = 'number';
    fontSizeInput.id = 'fontSizeInput';
    fontSizeInput.addEventListener('input', function() {
        document.body.style.fontSize = `${this.value}px`;
    });

    // Создаем элементы для изменения цвета текста
    const textColorLabel = document.createElement('label');
    textColorLabel.textContent = 'Text Color: ';

    const textColorInput = document.createElement('input');
    textColorInput.type = 'color';
    textColorInput.id = 'textColorInput';
    textColorInput.addEventListener('input', function() {
        document.body.style.color = this.value;
    });

    // Создаем элементы для изменения цвета фона
    const bgColorLabel = document.createElement('label');
    bgColorLabel.textContent = 'Background Color: ';

    const bgColorInput = document.createElement('input');
    bgColorInput.type = 'color';
    bgColorInput.id = 'bgColorInput';
    bgColorInput.addEventListener('input', function() {
        document.body.style.backgroundColor = this.value;
    });

    // Добавляем созданные элементы на страницу
    document.body.appendChild(fontSizeLabel);
    document.body.appendChild(fontSizeInput);
    document.body.appendChild(textColorLabel);
    document.body.appendChild(textColorInput);
    document.body.appendChild(bgColorLabel);
    document.body.appendChild(bgColorInput);
}

// Функция для удаления компонентов изменения шрифта и фона
function removeFontAndColorComponents() {
    // Удаляем все созданные элементы
    document.querySelectorAll('label, input').forEach(function(element) {
        element.remove();
    });
}

// Добавляем обработчик изменения флажка
document.getElementById('enableSettings').addEventListener('change', function() {
    if (this.checked) {
        // Если флажок активирован, создаем компоненты
        createFontAndColorComponents();
    } else {
        // Если флажок деактивирован, удаляем компоненты
        removeFontAndColorComponents();
    }
});

// Добавляем обработчики изменения значений полей формы
document.getElementById('fontSizeInput').addEventListener('input', function() {
    document.body.style.fontSize = `${this.value}px`;
});

document.getElementById('textColorInput').addEventListener('input', function() {
    document.body.style.color = this.value;
});

document.getElementById('bgColorInput').addEventListener('input', function() {
    document.body.style.backgroundColor = this.value;
});
