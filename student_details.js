const apiUrl = 'http://127.0.0.1:5000';

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const studentId = urlParams.get('id');
    getStudentDetails(studentId);
});

function getStudentDetails(studentId) {
    fetch(`${apiUrl}/students`)
        .then(response => response.json())
        .then(data => {
            const student = data.find(student => student.id == studentId);
            if (student) {
                document.getElementById('studentInfo').innerHTML = `
                    <p><strong>Full Name:</strong> ${student.full_name}</p>
                    <p><strong>Roll No:</strong> ${student.roll_no}</p>
                `;
                getStudentGrades(studentId);
            } else {
                alert('Student not found');
            }
        });
}

function getStudentGrades(studentId) {
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

                subjectCell.textContent = grade.subject_id; // You might want to fetch subject names instead of IDs
                gradeCell.textContent = grade.grade;
            });
        });
}