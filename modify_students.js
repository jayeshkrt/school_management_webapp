const apiUrl = 'http://127.0.0.1:5000';
let currentStudentId = null;

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
                const actionsCell = row.insertCell(2);

                nameCell.textContent = student.full_name;
                rollNoCell.textContent = student.roll_no;
                actionsCell.innerHTML = `
                    <button onclick="showEditForm(${student.id}, '${student.full_name}', ${student.roll_no})">Edit</button>
                    <button onclick="deleteStudent(${student.id})">Delete</button>
                `;
            });
        });
}

function showAddForm() {
    currentStudentId = null;
    document.getElementById('formTitle').textContent = 'Add Student';
    document.getElementById('studentName').value = '';
    document.getElementById('studentRollNo').value = '';
    document.getElementById('formContainer').style.display = 'block';
}

function showEditForm(id, name, rollNo) {
    currentStudentId = id;
    document.getElementById('formTitle').textContent = 'Edit Student';
    document.getElementById('studentName').value = name;
    document.getElementById('studentRollNo').value = rollNo;
    document.getElementById('formContainer').style.display = 'block';
}

function submitForm() {
    const name = document.getElementById('studentName').value;
    const rollNo = document.getElementById('studentRollNo').value;

    if (currentStudentId) {
        fetch(`${apiUrl}/students`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: currentStudentId, full_name: name, roll_no: rollNo })
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            getStudents();
            document.getElementById('formContainer').style.display = 'none';
        });
    } else {
        fetch(`${apiUrl}/students`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ full_name: name, roll_no: rollNo })
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            getStudents();
            document.getElementById('formContainer').style.display = 'none';
        });
    }
}

function deleteStudent(id) {
    fetch(`${apiUrl}/students`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: id })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        getStudents();
    });
}