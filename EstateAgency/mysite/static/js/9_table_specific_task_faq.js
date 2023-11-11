let tableSize = 0;
let limit = 1;
let selectedCells = [];

function generateTable() {
    tableSize = parseInt(document.getElementById('size').value);
    limit = parseInt(document.getElementById('limit').value);

    const table = document.getElementById('myTable');
    table.innerHTML = '';
    selectedCells = [];

    for (let i = 0; i < tableSize; i++) {
        const row = table.insertRow(i);
        for (let j = 0; j < tableSize; j++) {
            const cell = row.insertCell(j);
            cell.textContent = Math.floor(Math.random() * 10);
            cell.onclick = function () {
                highlightCell(this);
            };
        }
    }
}

function highlightCell(cell) {
    const value = parseInt(cell.textContent);

    // Проверка ограничения для одного ряда
    const rowIndex = cell.parentNode.rowIndex;
    const rowCells = Array.from(cell.parentNode.cells);
    const selectedRowCells = selectedCells.filter(selectedCell => selectedCell.parentNode.rowIndex === rowIndex);

    // Проверка ограничения для одного столбца
    const colIndex = cell.cellIndex;
    const colCells = Array.from(cell.parentNode.parentNode.rows).map(row => row.cells[colIndex]);
    const selectedColCells = selectedCells.filter(selectedCell => selectedCell.cellIndex === colIndex);

    // Определение соседей
    const isLeftNeighborSelected = colIndex > 0 && rowCells[colIndex - 1].classList.contains('highlight-even');
    const isRightNeighborSelected = colIndex < rowCells.length - 1 && rowCells[colIndex + 1].classList.contains('highlight-even');

    if ((selectedRowCells.length >= limit && !selectedRowCells.includes(cell)) ||
        (selectedColCells.length >= limit && !selectedColCells.includes(cell)) ||
        isLeftNeighborSelected || isRightNeighborSelected) {
        cell.classList.remove('highlight-even', 'highlight-odd');

        // Удаление ячейки из списка выделенных, если она была выделена
        selectedCells = selectedCells.filter(selectedCell => selectedCell !== cell);
    } else {
        cell.classList.toggle('highlight-even', value % 2 === 0);
        cell.classList.toggle('highlight-odd', value % 2 !== 0);

        // Обновление списка выделенных ячеек
        if (cell.classList.contains('highlight-even') || cell.classList.contains('highlight-odd')) {
            selectedCells.push(cell);
        } else {
            selectedCells = selectedCells.filter(selectedCell => selectedCell !== cell);
        }
    }
}

function transposeTable() {
    const table = document.getElementById('myTable');
    const rows = Array.from(table.rows);
    const cols = rows.map(row => Array.from(row.cells));

    table.innerHTML = '';
    selectedCells = [];

    for (let j = 0; j < tableSize; j++) {
        const row = table.insertRow(j);
        for (let i = 0; i < tableSize; i++) {
            const cell = row.insertCell(i);
            cell.textContent = cols[i][j].textContent;
            cell.onclick = function () {
                highlightCell(this);
            };
        }
    }
}

function addRow() {
    const table = document.getElementById('myTable');
    const newRow = table.insertRow(-1);

    for (let i = 0; i < table.rows[0].cells.length; i++) {
        const newCell = newRow.insertCell(i);
        newCell.appendChild(document.createTextNode(Math.floor(Math.random() * 10) + 1));
        newCell.addEventListener('click', () => handleCellClick(newCell));
    }
}

function addColumn() {
    const table = document.getElementById('myTable');

    for (let i = 0; i < table.rows.length; i++) {
        const newCell = table.rows[i].insertCell(-1);
        newCell.appendChild(document.createTextNode(Math.floor(Math.random() * 10) + 1));
        newCell.addEventListener('click', () => handleCellClick(newCell));
    }
}
    // Использование
    const instance1 = new DerivedClass("Instance 1", "Additional Property 1");
    displayResult("Prototype Inheritance", instance1);

    const instance2 = new DerivedClassES6("Instance 2", "Additional Property 2");
    displayResult("Class Inheritance", instance2);

    function displayResult(title, instance) {
        document.body.innerHTML += `<h2>${title}</h2>`;
        document.body.innerHTML += `<p>Initial Name: ${instance.getName()}</p>`;
        document.body.innerHTML += `<p>Initial Additional Property: ${instance.getAdditionalProperty()}</p>`;
    }