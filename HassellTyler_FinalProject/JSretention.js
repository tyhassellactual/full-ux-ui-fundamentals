document.addEventListener('DOMContentLoaded', () => {
    // Make sections collapsable
    const collapsibleSections = document.querySelectorAll('#foundation-list, #developing-list, #strengthening-list, #sustaining-list');
    
    collapsibleSections.forEach(section => {
        // Get the parent list item
        const parentLi = section.parentElement;
        
        // Create a toggle button
        const toggleBtn = document.createElement('button');
        toggleBtn.textContent = '👇 Expand';
        toggleBtn.className = 'toggle-btn';
        
        // Initially hide the content
        section.style.display = 'none';
        
        // Add toggle functionality
        toggleBtn.addEventListener('click', () => {
            if (section.style.display === 'none') {
                section.style.display = 'block';
                toggleBtn.textContent = '👆 Collapse';
            } else {
                section.style.display = 'none';
                toggleBtn.textContent = '👇 Expand';
            }
        });
        
        // Insert the toggle button at the end of the parent list item
        parentLi.appendChild(toggleBtn);
    });
});