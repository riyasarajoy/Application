// main.js
/*
File name = RiyaJoy_Assignment1
Name = Riya Sara Joy
Id = 301276056
Date = 05/-6/2023
*/

// Function to handle form submission
function handleSubmit(event) {
    event.preventDefault(); // Prevent the default form submission behavior
  
    // Get the form data
    const formData = new FormData(event.target);
  
    // Construct the data object
    const data = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      contactNumber: formData.get('contactNumber'),
      email: formData.get('email'),
      message: formData.get('message'),
    };
  
    // Log the data object to the console
    console.log(data);
  
    // Clear the form inputs
    event.target.reset();
  }
  
  // Add event listener to the form
  const form = document.querySelector('#contactForm');
  form.addEventListener('submit', handleSubmit);
  
  // Example event listener for a button click
document.getElementById('myButton').addEventListener('click', function() {
    // Perform an action when the button is clicked
    console.log('Button clicked!');
  });

// This file can be used to add interactive functionality to your website

// Example: Toggle a class on click
const toggleButton = document.querySelector('.toggle-button');
const navBar = document.querySelector('.navbar');

toggleButton.addEventListener('click', () => {
  navBar.classList.toggle('active');
});

// Example: Smooth scrolling to anchor links
const anchorLinks = document.querySelectorAll('a[href^="#"]');

anchorLinks.forEach(link => {
  link.addEventListener('click', smoothScroll);
});

function smoothScroll(event) {
  event.preventDefault();

  const targetId = this.getAttribute('href');
  const targetElement = document.querySelector(targetId);

  if (targetElement) {
    window.scrollTo({
      top: targetElement.offsetTop,
      behavior: 'smooth'
    });
  }
}