
document.addEventListener('DOMContentLoaded', () => {
    
    const filterButtons = document.querySelectorAll('.filter-btn');
    const roomCards = document.querySelectorAll('.room-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Active class ko change karna
            document.querySelector('.filter-btn.active').classList.remove('active');
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            
            roomCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // --- 2. POPUP MODAL FUNCTIONALITY ---
    const modal = document.getElementById('bookingModal');
    const closeBtn = document.getElementById('closeFormBtn');
    
    // Sabhi "Book Now" buttons ko select karna (Cards wale + Extra button)
    const bookButtons = document.querySelectorAll('.btn-book, #btn-book');

    // Modal Open karne ke liye
    bookButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            modal.style.display = 'flex'; // CSS mein 'display: none' hai, flex se center hoga
        });
    });

    // Modal Close karne ke liye (X button par click)
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Modal Close karne ke liye (Overlay/Bahar click karne par)
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // --- 3. HERO FORM SUBMISSION (Check Availability) ---
    const heroForm = document.getElementById('booking-form');
    const bookingMessage = document.getElementById('booking-message');

    heroForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const checkIn = document.getElementById('check-in').value;
        const checkOut = document.getElementById('check-out').value;
        const guests = document.getElementById('guests').value;

        // Date validation check
        if (new Date(checkIn) >= new Date(checkOut)) {
            bookingMessage.style.color = 'red';
            bookingMessage.textContent = 'Error: Check-Out date, Check-In date se baad ki honi chahiye!';
            return;
        }

        bookingMessage.style.color = 'green';
        bookingMessage.textContent = `Rooms available for ${guests} guest(s) from ${checkIn} to ${checkOut}!`;
    });

    // --- 4. MODAL FORM SUBMISSION (Confirm Booking) ---
    const resortBookingForm = document.getElementById('resortBookingForm');

    resortBookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('userName').value;
        const phone = document.getElementById('userPhone').value;

        alert(`Thank you, ${name}! Your booking request has been submitted. We will call you on ${phone} shortly.`);
        
        // Form reset aur modal close karna
        resortBookingForm.reset();
        modal.style.display = 'none';
    });
});