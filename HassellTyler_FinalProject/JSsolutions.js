document.addEventListener('DOMContentLoaded', () => {
    const draggables = document.querySelectorAll('.draggable');
    const dropZones = document.querySelectorAll('.drop-zone');
    const resetBtn = document.getElementById('reset-btn');
    const submitBtn = document.getElementById('submit-btn');
    const itemsContainer = document.getElementById('items-container');

    // Function to shuffle array elements
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Store initial positions and shuffle elements on load
    const initialState = Array.from(draggables).map(drag => {
        return {
            element: drag,
            parent: drag.parentNode,
            index: Array.from(drag.parentNode.children).indexOf(drag)
        };
    });

    // Randomize elements on page load
    function randomizeElements() {
        const elements = Array.from(draggables);
        const shuffledElements = shuffleArray([...elements]);
        
        // Clear container
        itemsContainer.innerHTML = '';
        
        // Append shuffled elements
        shuffledElements.forEach(element => {
            itemsContainer.appendChild(element);
        });
    }

    // Call randomization on page load
    randomizeElements();

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', () => {
            draggable.classList.add('dragging');
        });

        draggable.addEventListener('dragend', () => {
            draggable.classList.remove('dragging');
        });
    });

    dropZones.forEach(zone => {
        zone.addEventListener('dragover', e => {
            e.preventDefault();
            zone.classList.add('dragover');
        });

        zone.addEventListener('dragleave', () => {
            zone.classList.remove('dragover');
        });

        zone.addEventListener('drop', e => {
            e.preventDefault();
            zone.classList.remove('dragover');
            const draggable = document.querySelector('.dragging');
            if (draggable) {
                zone.appendChild(draggable);
            }
        });
    });

    resetBtn.addEventListener('click', () => {
        // Reset all drop zones' styles
        dropZones.forEach(zone => {
            zone.classList.remove('success', 'error');
            // Remove any draggable elements from drop zones
            Array.from(zone.children)
                .filter(child => child.classList.contains('draggable'))
                .forEach(child => itemsContainer.appendChild(child));
        });

        // Randomize elements
        randomizeElements();
    });

    submitBtn.addEventListener('click', () => {
        let isCorrect = true;
        
        dropZones.forEach(zone => {
            const zoneType = zone.dataset.type;
            const items = Array.from(zone.children).filter(child => 
                child.classList.contains('draggable')
            );
            
            const allCorrect = items.every(item => item.dataset.type === zoneType);
            
            zone.classList.remove('success', 'error');
            zone.classList.add(allCorrect ? 'success' : 'error');
            
            if (!allCorrect) isCorrect = false;
        });

        alert(isCorrect ? 'Great Job!' : 'Please Try Again.');
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('talentPoolForm');
    const passwordInput = document.getElementById('password');
    const passwordRequirements = {
        length: document.getElementById('length'),
        uppercase: document.getElementById('uppercase'),
        lowercase: document.getElementById('lowercase'),
        symbol: document.getElementById('symbol'),
        noPassword: document.getElementById('noPassword')
    };

    // Validate password in real-time
    passwordInput.addEventListener('input', function() {
        const password = this.value;
        
        // Check length
        if(password.length >= 12) {
            passwordRequirements.length.classList.add('valid');
        } else {
            passwordRequirements.length.classList.remove('valid');
        }
        
        // Check uppercase
        if(/[A-Z]/.test(password)) {
            passwordRequirements.uppercase.classList.add('valid');
        } else {
            passwordRequirements.uppercase.classList.remove('valid');
        }
        
        // Check lowercase
        if(/[a-z]/.test(password)) {
            passwordRequirements.lowercase.classList.add('valid');
        } else {
            passwordRequirements.lowercase.classList.remove('valid');
        }
        
        // Check symbol
        if(/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            passwordRequirements.symbol.classList.add('valid');
        } else {
            passwordRequirements.symbol.classList.remove('valid');
        }
        
        // Check for password string
        if(!/password/i.test(password)) {
            passwordRequirements.noPassword.classList.add('valid');
        } else {
            passwordRequirements.noPassword.classList.remove('valid');
        }
    });

    // File validation
    const resumeInput = document.getElementById('resume');
    resumeInput.addEventListener('change', function() {
        const file = this.files[0];
        const errorElement = document.getElementById('resumeError');
        const maxSize = 5 * 1024 * 1024; // 5MB in bytes
        
        if (file) {
            // Check file type
            const validTypes = ['.pdf', '.doc', '.docx'];
            const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));
            
            if (!validTypes.includes(fileExtension)) {
                errorElement.textContent = 'Please upload a PDF or Word document only.';
                this.value = '';
                return;
            }
            
            // Check file size
            if (file.size > maxSize) {
                errorElement.textContent = 'File size must be less than 5MB.';
                this.value = '';
                return;
            }
            
            errorElement.textContent = '';
        }
    });
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate username (letters and numbers only)
        const username = document.getElementById('username').value;
        if (!/^[a-zA-Z0-9]+$/.test(username)) {
            document.getElementById('usernameError').textContent = 'Username must contain only letters and numbers.';
            return;
        }
        
        // Validate password meets all requirements
        const password = passwordInput.value;
        if (
            password.length < 12 ||
            !/[A-Z]/.test(password) ||
            !/[a-z]/.test(password) ||
            !/[!@#$%^&*(),.?":{}|<>]/.test(password) ||
            /password/i.test(password)
        ) {
            document.getElementById('passwordError').textContent = 'Please ensure password meets all requirements.';
            return;
        }
        
        // If all validations pass, you would typically submit the form to a server here
        alert('Account created successfully!');
        form.reset();
        
        // Reset password requirement indicators
        Object.values(passwordRequirements).forEach(req => {
            req.classList.remove('valid');
        });
    });
});