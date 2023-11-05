const newsItems = document.querySelectorAll(".news-item");
const intervalInput = document.getElementById("interval");
const startButton = document.getElementById("start-rotation");
const stopButton = document.getElementById("stop-rotation");
let rotationInterval;
let currentNewsIndex = 0;

// Функция для показа следующей новости (ротация)
function showNextNews() {
    newsItems[currentNewsIndex].style.display = "none";
    currentNewsIndex = (currentNewsIndex + 1) % newsItems.length;
    newsItems[currentNewsIndex].style.display = "block";
}

const startRotation = () => {
    const interval = parseInt(intervalInput.value) * 1000;
    rotationInterval = setInterval(showNextNews, interval);
};

const stopRotation = () => {
    clearInterval(rotationInterval);
};

startButton.addEventListener("click", startRotation);
stopButton.addEventListener("click", stopRotation);

// Проверка фокуса страницы
let pageFocused = true;

window.addEventListener("focus", () => {
    pageFocused = true;
    startRotation();
});

window.addEventListener("blur", () => {
    pageFocused = false;
    stopRotation();
});