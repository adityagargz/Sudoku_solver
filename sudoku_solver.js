document.addEventListener('DOMContentLoaded', (event) => {
    const grid = document.getElementById('sudoku-grid');
    for (let row = 0; row < 9; row++) {
        let tr = document.createElement('tr');
        for (let col = 0; col < 9; col++) {
            let td = document.createElement('td');
            let input = document.createElement('input');
            input.setAttribute('type', 'text');
            input.setAttribute('maxlength', '1');
            td.appendChild(input);
            tr.appendChild(td);
        }
        grid.appendChild(tr);
    }
});

function getGrid() {
    const grid = [];
    const rows = document.querySelectorAll('#sudoku-grid tr');
    rows.forEach(row => {
        const cells = row.querySelectorAll('input');
        const rowValues = [];
        cells.forEach(cell => {
            const value = cell.value ? parseInt(cell.value) : 0;
            rowValues.push(value);
        });
        grid.push(rowValues);
    });
    return grid;
}

function setGrid(grid) {
    const rows = document.querySelectorAll('#sudoku-grid tr');
    rows.forEach((row, rowIndex) => {
        const cells = row.querySelectorAll('input');
        cells.forEach((cell, colIndex) => {
            cell.value = grid[rowIndex][colIndex] === 0 ? '' : grid[rowIndex][colIndex];
        });
    });
}

function solveSudoku() {
    const grid = getGrid();
    fetch('/solve', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ grid: grid }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            setGrid(data.grid);
        } else {
            alert('Unable to solve the Sudoku puzzle.');
        }
    });
}
