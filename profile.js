document.addEventListener('DOMContentLoaded', function() {
  // Add event listener to the form submission
  const form = document.querySelector('form');
  if (form) {
      form.addEventListener('submit', function(event) {
          event.preventDefault(); // Prevent the default form submission
          createProfile();
      });
  }
});

function createProfile() {
  // Retrieve the form data
  var name = document.getElementById('name').value;
  var phone = document.getElementById('phone').value;
  var dob = document.getElementById('dob').value;
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;

  // Validate form data
  if (!name || !phone || !dob || !email || !password) {
      alert('Please fill in all fields.');
      return;
  }

  // Create an object to store the profile data
  var profile = {
    name: name,
    phone: phone,
    dob: dob,
    email: email,
    password: password
  };

  // Store the profile data in local storage
  localStorage.setItem('userProfile', JSON.stringify(profile));

  // Redirect to the profile page
  window.location.href = 'profile.html';
}
