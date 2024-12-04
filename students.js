const apiUrl = 'http://127.0.0.1:5000';

document.addEventListener('DOMContentLoaded', () => {
    getStudents();
});

function getStudents() {
    fetch(`${apiUrl}/students`)
        .then(response => response.json())
        .then(data => {
            const studentsTable = document.getElementById('studentsTable').getElementsByTagName('tbody')[0];
            studentsTable.innerHTML = '';
            data.forEach(student => {
                const row = studentsTable.insertRow();
                const nameCell = row.insertCell(0);
                const rollNoCell = row.insertCell(1);

                nameCell.innerHTML = `<a href="student_details.html?id=${student.id}">${student.full_name}</a>`;
                rollNoCell.textContent = student.roll_no;
            });
        });
}

function searchStudent() {
    const searchName = document.getElementById('searchName').value.toLowerCase();
    fetch(`${apiUrl}/students`)
        .then(response => response.json())
        .then(data => {
            const student = data.find(student => student.full_name.toLowerCase().includes(searchName));
            if (student) {
                window.location.href = `student_details.html?id=${student.id}`;
            } else {
                alert('Student not found');
            }
        });
}