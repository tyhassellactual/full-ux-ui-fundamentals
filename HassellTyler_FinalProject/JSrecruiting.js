document.addEventListener('DOMContentLoaded', () => {
    // Make sections collapsable
    const headers = document.querySelectorAll('h3');
    
    headers.forEach(header => {
        // Header containers
        const container = document.createElement('div');
        container.className = 'collapsible-section';
        
        // Get next element
        const content = header.nextElementSibling;
        
        // Insert the container before the header
        header.parentNode.insertBefore(container, header);
        
        // Move header and content into the container
        container.appendChild(header);
        container.appendChild(content);
        
        // Create a toggle button
        const toggleBtn = document.createElement('button');
        toggleBtn.textContent = '👇 Expand';
        toggleBtn.className = 'toggle-btn';
        
        // Initially hide the content
        content.style.display = 'none';
        
        // Add toggle functionality
        toggleBtn.addEventListener('click', () => {
            if (content.style.display === 'none') {
                content.style.display = 'block';
                toggleBtn.textContent = '👆 Collapse';
            } else {
                content.style.display = 'none';
                toggleBtn.textContent = '👇 Expand';
            }
        });
        
        // Insert the toggle button after the header
        header.after(toggleBtn);
    });
});