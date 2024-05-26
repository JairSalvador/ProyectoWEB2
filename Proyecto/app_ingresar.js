document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('dataForm');
    const nameInput = document.getElementById('nameInput');
    const emailInput = document.getElementById('emailInput');
    const ageInput = document.getElementById('ageInput');
    const dataTable = document.getElementById('dataTable').querySelector('tbody');
    const downloadBtn = document.getElementById('downloadBtn');
    let dataList = [];

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = nameInput.value;
        const email = emailInput.value;
        const age = ageInput.value;
        if (name && email && age) {
            const newData = { name, email, age };
            dataList.push(newData);
            addToTable(newData);
            nameInput.value = '';
            emailInput.value = '';
            ageInput.value = '';
        }
    });

    const addToTable = (data) => {
        const row = document.createElement('tr');
        const nameCell = document.createElement('td');
        const emailCell = document.createElement('td');
        const ageCell = document.createElement('td');
        nameCell.textContent = data.name;
        emailCell.textContent = data.email;
        ageCell.textContent = data.age;
        row.appendChild(nameCell);
        row.appendChild(emailCell);
        row.appendChild(ageCell);
        dataTable.appendChild(row);
    };

    downloadBtn.addEventListener('click', () => {
        downloadCSV(dataList);
    });

    const downloadCSV = (data) => {
        let csvContent = 'data:text/csv;charset=utf-8,Nombre,Email,Edad\n';
        data.forEach(row => {
            csvContent += `${row.name},${row.email},${row.age}\n`;
        });
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', 'datos.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
});