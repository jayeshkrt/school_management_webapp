const apiUrl = 'http://127.0.0.1:5000';
let subjects = [];

document.addEventListener('DOMContentLoaded', () => {
    getSubjects();
    getTeachers();
});

function getSubjects() {
    fetch(`${apiUrl}/subjects`)
        .then(response => response.json())
        .then(data => {
            subjects = data;
        });
}

function getTeachers() {
    fetch(`${apiUrl}/teachers`)
        .then(response => response.json())
        .then(data => {
            const teachersTable = document.getElementById('teachersTable').getElementsByTagName('tbody')[0];
            teachersTable.innerHTML = '';
            data.forEach(teacher => {
                const row = teachersTable.insertRow();
                const nameCell = row.insertCell(0);
                const subjectCell = row.insertCell(1);

                nameCell.textContent = teacher.full_name;
                const subject = subjects.find(subject => subject.id === teacher.subject_id);
                subjectCell.textContent = subject ? subject.name : 'Unknown';
            });
        });
}