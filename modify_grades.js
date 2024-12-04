const apiUrl = 'http://127.0.0.1:5000';
let currentStudentId = null;
let currentEnrollmentId = null;
let subjects = [];

document.addEventListener('DOMContentLoaded', () => {
    getSubjects();
});

function getSubjects() {
    fetch(`${apiUrl}/subjects`)
        .then(response => response.json())
        .then(data => {
            subjects = data;
        });
}

function searchStudent() {
    const searchName = document.getElementById('searchName').value.toLowerCase();
    fetch(`${apiUrl}/students`)
        .then(response => response.json())
        .then(data => {
            const student = data.find(student => student.full_name.toLowerCase().includes(searchName));
            if (student) {
                currentStudentId = student.id;
                document.getElementById('studentName').textContent = student.full_name;
                document.getElementById('studentInfo').style.display = 'block';
                getGrades(student.id);
            } else {
                alert('Student not found');
            }
        });
}

function getGrades(studentId) {
    fetch(`${apiUrl}/enrollments`)
        .then(response => response.json())
        .then(data => {
            const gradesTable = document.getElementById('gradesTable').getElementsByTagName('tbody')[0];
            gradesTable.innerHTML = '';
            const studentGrades = data.filter(enrollment => enrollment.student_id == studentId);
            studentGrades.forEach(grade => {
                const row = gradesTable.insertRow();
                const subjectCell = row.insertCell(0);
                const gradeCell = row.insertCell(1);
                const actionsCell = row.insertCell(2);

                const subject = subjects.find(subject => subject.id === grade.subject_id);
                subjectCell.textContent = subject ? subject.name : 'Unknown';
                gradeCell.textContent = grade.grade;
                actionsCell.innerHTML = `
                    <button onclick="showEditForm(${grade.id}, '${subject ? subject.name : ''}', '${grade.grade}')">Edit</button>
                    <button onclick="deleteGrade(${grade.id})">Delete</button>
                `;
            });
        });
}

function showAddForm() {
    currentEnrollmentId = null;
    document.getElementById('formTitle').textContent = 'Add Grade';
    document.getElementById('subjectName').value = '';
    document.getElementById('grade').value = '';
    document.getElementById('formContainer').style.display = 'block';
}

function showEditForm(id, subjectName, grade) {
    currentEnrollmentId = id;
    document.getElementById('formTitle').textContent = 'Edit Grade';
    document.getElementById('subjectName').value = subjectName;
    document.getElementById('grade').value = grade;
    document.getElementById('formContainer').style.display = 'block';
}

function submitForm() {
    const subjectName = document.getElementById('subjectName').value;
    const grade = document.getElementById('grade').value;
    const subject = subjects.find(subject => subject.name.toLowerCase() === subjectName.toLowerCase());

    if (!subject) {
        alert('Subject not found');
        return;
    }

    if (currentEnrollmentId) {
        fetch(`${apiUrl}/enrollments`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: currentEnrollmentId, student_id: currentStudentId, subject_id: subject.id, grade: grade })
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            getGrades(currentStudentId);
            document.getElementById('formContainer').style.display = 'none';
        });
    } else {
        fetch(`${apiUrl}/enrollments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ student_id: currentStudentId, subject_id: subject.id, grade: grade })
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            getGrades(currentStudentId);
            document.getElementById('formContainer').style.display = 'none';
        });
    }
}

function deleteGrade(id) {
    fetch(`${apiUrl}/enrollments`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: id })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        getGrades(currentStudentId);
    });
}