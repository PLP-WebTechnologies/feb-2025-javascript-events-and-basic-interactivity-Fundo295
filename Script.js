// Navigation between sections
document.getElementById('home-btn').addEventListener('click', () => {
    showSection('home-section');
});

document.getElementById('menu-btn').addEventListener('click', () => {
    showSection('menu-section');
});

document.getElementById('reservation-btn').addEventListener('click', () => {
    showSection('reservation-section');
});

document.getElementById('contact-btn').addEventListener('click', () => {
    showSection('contact-section');
});

function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('hidden');
    });
    
    // Show the selected section
    document.getElementById(sectionId).classList.remove('hidden');
}

// Shopping cart functionality
let cart = [];

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const name = button.getAttribute('data-name');
        const price = parseFloat(button.getAttribute('data-price'));
        
        // Check if item already in cart
        const existingItem = cart.find(item => item.name === name);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ name, price, quantity: 1 });
        }
        
        updateCart();
        
        // Visual feedback
        button.textContent = 'Added!';
        setTimeout(() => {
            button.textContent = 'Add to Cart';
        }, 1000);
    });
});

document.getElementById('checkout-btn').addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Your cart is empty!');
    } else {
        alert('Order placed! Total: $' + calculateTotal().toFixed(2));
        cart = [];
        updateCart();
    }
});

function updateCart() {
    const cartItemsElement = document.getElementById('cart-items');
    cartItemsElement.innerHTML = '';
    
    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <span>${item.name} x${item.quantity}</span>
            <span>$${(item.price * item.quantity).toFixed(2)}</span>
        `;
        cartItemsElement.appendChild(itemElement);
    });
    
    document.getElementById('cart-total').textContent = calculateTotal().toFixed(2);
}

function calculateTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Special offer interaction
document.getElementById('special-offer').addEventListener('click', function() {
    this.innerHTML = '<h2>Use code: PASTA20 at checkout!</h2>';
    this.style.backgroundColor = '#2ecc71';
});

// Form validation
document.getElementById('reservation-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    let isValid = true;
    
    // Validate name
    const name = document.getElementById('name').value.trim();
    if (name === '') {
        document.getElementById('name-error').textContent = 'Name is required';
        isValid = false;
    } else {
        document.getElementById('name-error').textContent = '';
    }
    
    // Validate email
    const email = document.getElementById('email').value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === '') {
        document.getElementById('email-error').textContent = 'Email is required';
        isValid = false;
    } else if (!emailRegex.test(email)) {
        document.getElementById('email-error').textContent = 'Please enter a valid email';
        isValid = false;
    } else {
        document.getElementById('email-error').textContent = '';
    }
    
    // Validate phone
    const phone = document.getElementById('phone').value.trim();
    const phoneRegex = /^\d{10,}$/;
    if (phone === '') {
        document.getElementById('phone-error').textContent = 'Phone number is required';
        isValid = false;
    } else if (!phoneRegex.test(phone)) {
        document.getElementById('phone-error').textContent = 'Please enter a valid phone number';
        isValid = false;
    } else {
        document.getElementById('phone-error').textContent = '';
    }
    
    // Validate date
    const date = document.getElementById('date').value;
    if (date === '') {
        document.getElementById('date-error').textContent = 'Date is required';
        isValid = false;
    } else {
        document.getElementById('date-error').textContent = '';
    }
    
    // Validate time
    const time = document.getElementById('time').value;
    if (time === '') {
        document.getElementById('time-error').textContent = 'Time is required';
        isValid = false;
    } else {
        document.getElementById('time-error').textContent = '';
    }
    
    // Validate guests
    const guests = document.getElementById('guests').value;
    if (guests === '') {
        document.getElementById('guests-error').textContent = 'Please select number of guests';
        isValid = false;
    } else {
        document.getElementById('guests-error').textContent = '';
    }
    
    if (isValid) {
        alert('Reservation submitted successfully! We look forward to seeing you.');
        this.reset();
    }
});