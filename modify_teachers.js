const apiUrl = 'http://127.0.0.1:5000';
let currentTeacherId = null;
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
            const subjectSelect = document.getElementById('teacherSubject');
            subjectSelect.innerHTML = '';
            subjects.forEach(subject => {
                const option = document.createElement('option');
                option.value = subject.id;
                option.textContent = subject.name;
                subjectSelect.appendChild(option);
            });
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
                const actionsCell = row.insertCell(2);

                nameCell.textContent = teacher.full_name;
                const subject = subjects.find(subject => subject.id === teacher.subject_id);
                subjectCell.textContent = subject ? subject.name : 'Unknown';
                actionsCell.innerHTML = `
                    <button onclick="showEditForm(${teacher.id}, '${teacher.full_name}', ${teacher.subject_id})">Edit</button>
                    <button onclick="deleteTeacher(${teacher.id})">Delete</button>
                `;
            });
        });
}

function showAddForm() {
    currentTeacherId = null;
    document.getElementById('formTitle').textContent = 'Add Teacher';
    document.getElementById('teacherName').value = '';
    document.getElementById('teacherSubject').value = '';
    document.getElementById('formContainer').style.display = 'block';
}

function showEditForm(id, name, subjectId) {
    currentTeacherId = id;
    document.getElementById('formTitle').textContent = 'Edit Teacher';
    document.getElementById('teacherName').value = name;
    document.getElementById('teacherSubject').value = subjectId;
    document.getElementById('formContainer').style.display = 'block';
}

function submitForm() {
    const name = document.getElementById('teacherName').value;
    const subjectId = document.getElementById('teacherSubject').value;

    if (currentTeacherId) {
        fetch(`${apiUrl}/teachers`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: currentTeacherId, full_name: name, subject_id: subjectId })
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            getTeachers();
            document.getElementById('formContainer').style.display = 'none';
        });
    } else {
        fetch(`${apiUrl}/teachers`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ full_name: name, subject_id: subjectId })
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            getTeachers();
            document.getElementById('formContainer').style.display = 'none';
        });
    }
}

function deleteTeacher(id) {
    fetch(`${apiUrl}/teachers`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: id })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        getTeachers();
    });
}