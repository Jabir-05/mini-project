const form = document.getElementById('student-form');
const studentList = document.getElementById('student-list');
let students = JSON.parse(localStorage.getItem('students')) || [];
let editingIndex = null;

function renderStudents() {
  studentList.innerHTML = '';
  students.forEach((student, index) => {
    studentList.innerHTML += `
      <tr>
        <td>${student.name}</td>
        <td>${student.roll}</td>
        <td>${student.course}</td>
        <td>${student.email}</td>
        <td class="actions">
          <button class="edit-btn" onclick="editStudent(${index})">Edit</button>
          <button class="delete-btn" onclick="deleteStudent(${index})">Delete</button>
        </td>
      </tr>
    `;
  });
}

function saveStudents() {
  localStorage.setItem('students', JSON.stringify(students));
  renderStudents();
}

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const roll = document.getElementById('roll').value;
  const course = document.getElementById('course').value;
  const email = document.getElementById('email').value;

  const studentData = { name, roll, course, email };

  if (editingIndex !== null) {
    students[editingIndex] = studentData;
    editingIndex = null;
    document.getElementById('submit-btn').textContent = 'Add Student';
  } else {
    students.push(studentData);
  }

  saveStudents();
  form.reset();
});

function editStudent(index) {
  const student = students[index];
  document.getElementById('name').value = student.name;
  document.getElementById('roll').value = student.roll;
  document.getElementById('course').value = student.course;
  document.getElementById('email').value = student.email;
  editingIndex = index;
  document.getElementById('submit-btn').textContent = 'Update Student';
}

function deleteStudent(index) {
  if (confirm('Are you sure you want to delete this student?')) {
    students.splice(index, 1);
    saveStudents();
  }
}

renderStudents();
