// Пример ассоциативного массива с информацией об учебниках
    const textbooks = [
      { subject: 'Физика', author: 'Иванов', class: 10 },
      { subject: 'Математика', author: 'Петров', class: 9 },
      { subject: 'Физика', author: 'Сидоров', class: 10 },
      { subject: 'Химия', author: 'Иванов', class: 11 },
      { subject: 'Физика', author: 'Петров', class: 10 },
      { subject: 'Математика', author: 'Иванов', class: 9 },
      { subject: 'Физика', author: 'Сидоров', class: 11 },
    ];

    // Функция для нахождения предмета с наибольшим количеством учебников различных авторов для данного класса
    function findMostCommonSubject(textbooks, targetClass) {
      // Создаем объект для хранения количества учебников по предметам
      const subjectCounts = {};

      // Проходим по массиву учебников и увеличиваем счетчик для каждого предмета
      textbooks.forEach((textbook) => {
        if (textbook.class === targetClass) {
          const subjectKey = textbook.subject;
          subjectCounts[subjectKey] = (subjectCounts[subjectKey] || 0) + 1;
        }
      });

      // Находим предмет с максимальным количеством уникальных авторов
      let maxSubject = null;
      let maxCount = 0;

      for (const subjectKey in subjectCounts) {
        if (subjectCounts[subjectKey] > maxCount) {
          maxSubject = subjectKey;
          maxCount = subjectCounts[subjectKey];
        }
      }

      return maxSubject;
    }

    // Пример использования функции для поиска предмета для 10 класса
    const targetClass = 10;
    const mostCommonSubject = findMostCommonSubject(textbooks, targetClass);

    // Выводим результат на HTML-страницу
    document.body.innerHTML += `<p>Для ${targetClass} класса наибольшее количество учебников по предмету: ${mostCommonSubject}</p>`;