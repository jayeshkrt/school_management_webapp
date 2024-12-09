from flask import Flask, request, jsonify
from flask_mysqldb import MySQL
import MySQLdb.cursors
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)  # Enable CORS

# MySQL configurations
app.config['MYSQL_HOST'] = os.getenv('MYSQL_HOST', 'localhost')
app.config['MYSQL_USER'] = os.getenv('MYSQL_USER', 'yourusername')
app.config['MYSQL_PASSWORD'] = os.getenv('MYSQL_PASSWORD', 'yourpassword')
app.config['MYSQL_DB'] = os.getenv('MYSQL_DB', 'school_management_system')

mysql = MySQL(app)

@app.route('/')
def hello_world():
    return 'Hello, World!'

# CRUD operations for students
@app.route('/students', methods=['GET', 'POST', 'PUT', 'DELETE'])
def students():
    if request.method == 'GET':
        return get_students()
    elif request.method == 'POST':
        return add_student()
    elif request.method == 'PUT':
        return update_student()
    elif request.method == 'DELETE':
        return delete_student()

# CRUD operations for teachers
@app.route('/teachers', methods=['GET', 'POST', 'PUT', 'DELETE'])
def teachers():
    if request.method == 'GET':
        return get_teachers()
    elif request.method == 'POST':
        return add_teacher()
    elif request.method == 'PUT':
        return update_teacher()
    elif request.method == 'DELETE':
        return delete_teacher()

# CRUD operations for subjects
@app.route('/subjects', methods=['GET', 'POST', 'PUT', 'DELETE'])
def subjects():
    if request.method == 'GET':
        return get_subjects()
    elif request.method == 'POST':
        return add_subject()
    elif request.method == 'PUT':
        return update_subject()
    elif request.method == 'DELETE':
        return delete_subject()

# CRUD operations for enrollments
@app.route('/enrollments', methods=['GET', 'POST', 'PUT', 'DELETE'])
def enrollments():
    if request.method == 'GET':
        return get_enrollments()
    elif request.method == 'POST':
        return add_enrollment()
    elif request.method == 'PUT':
        return update_enrollment()
    elif request.method == 'DELETE':
        return delete_enrollment()

# CRUD functions for students
def get_students():
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute("SELECT * FROM students")
    students = cursor.fetchall()
    return jsonify(students)

def add_student():
    data = request.json
    cursor = mysql.connection.cursor()
    cursor.execute("INSERT INTO students (full_name, roll_no) VALUES (%s, %s)",
                   (data['full_name'], data['roll_no']))
    mysql.connection.commit()
    return jsonify({'message': 'Student added successfully'})

def update_student():
    data = request.json
    cursor = mysql.connection.cursor()
    cursor.execute("UPDATE students SET full_name=%s, roll_no=%s WHERE id=%s",
                   (data['full_name'], data['roll_no'], data['id']))
    mysql.connection.commit()
    return jsonify({'message': 'Student updated successfully'})

def delete_student():
    data = request.json
    cursor = mysql.connection.cursor()
    cursor.execute("DELETE FROM students WHERE id=%s", (data['id'],))
    mysql.connection.commit()
    return jsonify({'message': 'Student deleted successfully'})

# CRUD functions for teachers
def get_teachers():
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute("SELECT * FROM teachers")
    teachers = cursor.fetchall()
    return jsonify(teachers)

def add_teacher():
    data = request.json
    cursor = mysql.connection.cursor()
    cursor.execute("INSERT INTO teachers (full_name, subject_id) VALUES (%s, %s)",
                   (data['full_name'], data['subject_id']))
    mysql.connection.commit()
    return jsonify({'message': 'Teacher added successfully'})

def update_teacher():
    data = request.json
    cursor = mysql.connection.cursor()
    cursor.execute("UPDATE teachers SET full_name=%s, subject_id=%s WHERE id=%s",
                   (data['full_name'], data['subject_id'], data['id']))
    mysql.connection.commit()
    return jsonify({'message': 'Teacher updated successfully'})

def delete_teacher():
    data = request.json
    cursor = mysql.connection.cursor()
    cursor.execute("DELETE FROM teachers WHERE id=%s", (data['id'],))
    mysql.connection.commit()
    return jsonify({'message': 'Teacher deleted successfully'})

# CRUD functions for subjects
def get_subjects():
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute("SELECT * FROM subjects")
    subjects = cursor.fetchall()
    return jsonify(subjects)

def add_subject():
    data = request.json
    cursor = mysql.connection.cursor()
    cursor.execute("INSERT INTO subjects (name) VALUES (%s)", (data['name'],))
    mysql.connection.commit()
    return jsonify({'message': 'Subject added successfully'})

def update_subject():
    data = request.json
    cursor = mysql.connection.cursor()
    cursor.execute("UPDATE subjects SET name=%s WHERE id=%s", (data['name'], data['id']))
    mysql.connection.commit()
    return jsonify({'message': 'Subject updated successfully'})

def delete_subject():
    data = request.json
    cursor = mysql.connection.cursor()
    cursor.execute("DELETE FROM subjects WHERE id=%s", (data['id'],))
    mysql.connection.commit()
    return jsonify({'message': 'Subject deleted successfully'})

# CRUD functions for enrollments
def get_enrollments():
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute("SELECT * FROM enrollments")
    enrollments = cursor.fetchall()
    return jsonify(enrollments)

def add_enrollment():
    data = request.json
    cursor = mysql.connection.cursor()
    cursor.execute("INSERT INTO enrollments (student_id, subject_id, grade) VALUES (%s, %s, %s)",
                   (data['student_id'], data['subject_id'], data['grade']))
    mysql.connection.commit()
    return jsonify({'message': 'Enrollment added successfully'})

def update_enrollment():
    data = request.json
    cursor = mysql.connection.cursor()
    cursor.execute("UPDATE enrollments SET student_id=%s, subject_id=%s, grade=%s WHERE id=%s",
                   (data['student_id'], data['subject_id'], data['grade'], data['id']))
    mysql.connection.commit()
    return jsonify({'message': 'Enrollment updated successfully'})

def delete_enrollment():
    data = request.json
    cursor = mysql.connection.cursor()
    cursor.execute("DELETE FROM enrollments WHERE id=%s", (data['id'],))
    mysql.connection.commit()
    return jsonify({'message': 'Enrollment deleted successfully'})

if __name__ == '__main__':
    app.run(debug=True)