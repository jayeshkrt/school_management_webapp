# School Management System

A web-based School Management System that provides an interface for managing and viewing student, teacher, and grade information. The application allows admins to log in and perform CRUD operations on students, teachers, subjects, and grades.

## Features
- View Information:
  - Students, their grades in various subjects, and their assigned teachers.
- Admin Functionalities:

  - Login securely.
  - Create, Read, Update, and Delete (CRUD) operations for:
    - Students
    - Teachers
    - Subjects
    - Grades

- Frontend:

  - Static HTML, CSS, and JavaScript served by Nginx.
- Backend:

  - REST API powered by Flask.
- Database:

  - Persistent data storage using MySQL.


## Getting Started
### Prerequisites
- Docker and Docker Compose installed on your system.
- Basic knowledge of Docker and web applications.
### Installation
1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/school-management-system.git
    cd school-management-system
    ```

2. Set up environment variables:
    - Create a .env file in the project root to store sensitive data (e.g., database credentials).

3. Build and run the application:

    ```bash
    docker-compose up --build
    ```

4. Access the application:

    - Frontend: http://localhost
    - Backend API: http://localhost:5000

## Project Structure
```plaintext
project-root/
├── app/                     # Flask application backend
│   ├── app.py               # Application entry point
│   ├── requirements.txt     # Python dependencies
│   └── ...
├── frontend/                # Static frontend files (HTML, CSS, JS)
│   ├── index.html
│   ├── styles.css
│   └── ...
├── nginx.conf               # Nginx configuration for frontend
├── docker-compose.yml       # Docker Compose configuration
├── init.sql                 # Database initialization script
├── LICENSE                  # MIT License
└── README.md                # Project documentation
```

## Technologies Used
- Frontend: HTML, CSS, JavaScript
- Backend: Flask
- Database: MySQL
- Containerization: Docker, Docker Compose
- Web Server: Nginx

## Usage
1. Admin Login:

    - Use the admin credentials to log in to the system.
2. CRUD Operations:
    - Navigate to the respective sections (students, teachers, subjects, grades) to perform CRUD operations.
3. Viewing Data:
    - Non-admin users can view student and teacher information without logging in.

## Contributing
Contributions are welcome! Please follow these steps:

- Fork the repository.
- Create a feature branch (git checkout -b feature-branch).
- Commit your changes (git commit -m "Add some feature").
- Push to the branch (git push origin feature-branch).
- Open a pull request.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgments
- Flask and its developers for the powerful framework.
- Docker for simplifying deployment and environment consistency.
- Open-source contributors for inspiration and resources.

## Contact
For questions or suggestions, feel free to open an issue.
