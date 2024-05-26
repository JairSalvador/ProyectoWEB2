let csvData = [];

document.getElementById('fileInput').addEventListener('change', function (event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
        const text = e.target.result;
        parseCSV(text);
    };

    reader.readAsText(file);
});

function parseCSV(text) {
    const rows = text.split('\n').map(row => row.split(','));
    csvData = rows;
    displayTable(rows);
}

function displayTable(data) {
    const tableHead = document.querySelector('#csvTable thead');
    const tableBody = document.querySelector('#csvTable tbody');
    tableHead.innerHTML = '';
    tableBody.innerHTML = '';

    const [header, ...rows] = data;

    const headerRow = document.createElement('tr');
    header.forEach(cell => {
        const th = document.createElement('th');
        th.textContent = cell;
        headerRow.appendChild(th);
    });
    headerRow.appendChild(document.createElement('th')); // Extra column for delete button
    tableHead.appendChild(headerRow);

    rows.forEach((row, rowIndex) => {
        const tr = document.createElement('tr');
        row.forEach(cell => {
            const td = document.createElement('td');
            td.textContent = cell;
            tr.appendChild(td);
        });
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Borrar';
        deleteButton.addEventListener('click', () => {
            deleteRow(rowIndex + 1); // Adjust for header
        });
        const td = document.createElement('td');
        td.appendChild(deleteButton);
        tr.appendChild(td);
        tableBody.appendChild(tr);
    });
}

function deleteRow(index) {
    csvData.splice(index, 1);
    displayTable(csvData);
}

document.getElementById('downloadCsv').addEventListener('click', function () {
    if (csvData.length === 0) {
        alert('No hay datos para descargar.');
        return;
    }

    let csvContent = csvData.map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'datos_actualizados.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});