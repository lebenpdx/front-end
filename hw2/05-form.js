document.getElementById('form').addEventListener('submit', function (event) {
  event.preventDefault();

  const fullName = document.getElementById('fullName').value;
  const email = document.getElementById('email').value;
  const registrationStatus =
    document.getElementById('registrationStatus').value;
  const courses = Array.from(
    document.querySelectorAll('input[name="courses"]:checked')
  ).map((c) => c.value);
  const anythingElse = document.getElementById('anythingElse').value;

  console.log('Full Name: ' + fullName);
  console.log('Email: ' + email);
  console.log('Registration Status: ' + registrationStatus);
  console.log('Courses: ' + courses.join(', '));
  console.log('Anything Else: ' + anythingElse);
});
