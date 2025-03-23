// Simple time slider functionality
const timeSlider = document.getElementById('meeting_time');
const timeDisplay = document.getElementById('time_display');

function updateTimeDisplay() {
    const hour = Math.floor(timeSlider.value);
    const minute = timeSlider.value % 1 ? '30' : '00';
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : hour;
    timeDisplay.textContent = `${displayHour}:${minute} ${period} CST`;
}

timeSlider.addEventListener('input', updateTimeDisplay);
updateTimeDisplay(); // Initial display

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const nameInput = document.getElementById('name');
    const checkboxes = document.querySelectorAll('input[name="interests"]');
    const radioButtons = document.querySelectorAll('input[name="contact_method"]');
    const phoneInput = document.getElementById('phone');
    const emailInput = document.getElementById('email');
    const dateInput = document.getElementById('meeting_date');

    // Set up date restrictions
    const today = new Date();
    const dateString = today.toISOString().split('T')[0];
    dateInput.min = dateString; // Prevent past dates

    // Disable Weekends and Mondays
    dateInput.addEventListener('input', function(e) {
        const selectedDate = new Date(this.value);
        const day = selectedDate.getDay(); // 0 = Monday, 5 = Saturday, 6 = Sunday
        
        if(day === 0 || day === 5 || day === 6) { // If Sunday, Monday, or Saturday
            alert('Please select a Tuesday through Friday only');
            this.value = ''; // Clear the invalid date
        }
    });

    // Function to disable specific days
    function disableDates(date) {
        const day = date.getDay();
        return day !== 0 && day !== 1 && day !== 6;
    }

    // Phone number formatting
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, ''); // Remove non-digits
        if (value.length >= 3 && value.length < 6) {
            value = value.slice(0,3) + '-' + value.slice(3);
        } else if (value.length >= 6) {
            value = value.slice(0,3) + '-' + value.slice(3,6) + '-' + value.slice(6,10);
        }
        e.target.value = value;
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent form submission initially
        let isValid = true;
        let errorMessage = '';

        // Name validation
        if (!nameInput.value.trim()) {
            isValid = false;
            errorMessage += 'Name is required.\n';
            nameInput.style.borderColor = '#dc3545';
        } else {
            nameInput.style.borderColor = '#003366';
        }

        // Checkbox validation (at least one must be checked)
        let checkboxChecked = false;
        checkboxes.forEach(checkbox => {
            if (checkbox.checked) checkboxChecked = true;
        });
        if (!checkboxChecked) {
            isValid = false;
            errorMessage += 'Please select at least one interest.\n';
            document.querySelector('.checkbox-group').style.color = '#dc3545';
        } else {
            document.querySelector('.checkbox-group').style.color = '#333333';
        }

        // Radio button validation
        let radioChecked = false;
        radioButtons.forEach(radio => {
            if (radio.checked) radioChecked = true;
        });
        if (!radioChecked) {
            isValid = false;
            errorMessage += 'Please select a preferred contact method.\n';
            document.querySelector('.radio-group').style.color = '#dc3545';
        } else {
            document.querySelector('.radio-group').style.color = '#333333';
        }

        // Phone validation (if filled)
        const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
        if (phoneInput.value && !phoneRegex.test(phoneInput.value)) {
            isValid = false;
            errorMessage += 'Phone must be in format: 123-456-7890\n';
            phoneInput.style.borderColor = '#dc3545';
        } else {
            phoneInput.style.borderColor = '#003366';
        }

        // Email validation (if filled)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailInput.value && !emailRegex.test(emailInput.value)) {
            isValid = false;
            errorMessage += 'Please enter a valid email address.\n';
            emailInput.style.borderColor = '#dc3545';
        } else {
            emailInput.style.borderColor = '#003366';
        }

        // Contact method validation - check if selected method has corresponding info
        const contactMethod = document.querySelector('input[name="contact_method"]:checked')?.value;
        if (contactMethod === 'phone' && !phoneInput.value) {
            isValid = false;
            errorMessage += 'Phone number is required when Phone is selected as contact method.\n';
            phoneInput.style.borderColor = '#dc3545';
        }
        if (contactMethod === 'email' && !emailInput.value) {
            isValid = false;
            errorMessage += 'Email is required when Email is selected as contact method.\n';
            emailInput.style.borderColor = '#dc3545';
        }

        if (!isValid) {
            alert(errorMessage);
        } else {
            alert('Thank you, you will be contacted by someone from our team soon');
            form.reset();
            document.querySelectorAll('input, select').forEach(element => {
                element.style.borderColor = '#003366';
            });
        }
    });

    // Reset validation styling when user starts typing/selecting
    nameInput.addEventListener('input', function() {
        this.style.borderColor = '#003366';
    });

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            document.querySelector('.checkbox-group').style.color = '#333333';
        });
    });

    radioButtons.forEach(radio => {
        radio.addEventListener('change', function() {
            document.querySelector('.radio-group').style.color = '#333333';
        });
    });

    phoneInput.addEventListener('input', function() {
        this.style.borderColor = '#003366';
    });

    emailInput.addEventListener('input', function() {
        this.style.borderColor = '#003366';
    });
});