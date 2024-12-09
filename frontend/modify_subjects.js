// const apiUrl = 'http://localhost:5000';
const apiUrl = '/api';
let currentSubjectId = null;

document.addEventListener('DOMContentLoaded', () => {
    getSubjects();
});

function getSubjects() {
    fetch(`${apiUrl}/subjects`)
        .then(response => response.json())
        .then(data => {
            const subjectsTable = document.getElementById('subjectsTable').getElementsByTagName('tbody')[0];
            subjectsTable.innerHTML = '';
            data.forEach(subject => {
                const row = subjectsTable.insertRow();
                const nameCell = row.insertCell(0);
                const actionsCell = row.insertCell(1);

                nameCell.textContent = subject.name;
                actionsCell.innerHTML = `
                    <button onclick="showEditForm(${subject.id}, '${subject.name}')">Edit</button>
                    <button onclick="deleteSubject(${subject.id})">Delete</button>
                `;
            });
        });
}

function showAddForm() {
    currentSubjectId = null;
    document.getElementById('formTitle').textContent = 'Add Subject';
    document.getElementById('subjectName').value = '';
    document.getElementById('formContainer').style.display = 'block';
}

function showEditForm(id, name) {
    currentSubjectId = id;
    document.getElementById('formTitle').textContent = 'Edit Subject';
    document.getElementById('subjectName').value = name;
    document.getElementById('formContainer').style.display = 'block';
}

function submitForm() {
    const name = document.getElementById('subjectName').value;

    if (currentSubjectId) {
        fetch(`${apiUrl}/subjects`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: currentSubjectId, name: name })
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            getSubjects();
            document.getElementById('formContainer').style.display = 'none';
        });
    } else {
        fetch(`${apiUrl}/subjects`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: name })
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            getSubjects();
            document.getElementById('formContainer').style.display = 'none';
        });
    }
}

function deleteSubject(id) {
    fetch(`${apiUrl}/subjects`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: id })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        getSubjects();
    });
}