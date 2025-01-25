// Sequential Messages Functionality
document.addEventListener('DOMContentLoaded', () => {
    const messages = [
        { id: 'message1', displayDuration: 4000 }, // Display for 4 seconds
        { id: 'message2', displayDuration: 3000 }, // Display for 3 seconds
        { id: 'message3', displayDuration: 3000 }, // Display for 3 seconds
        { id: 'message4', displayDuration: 5000 }  // Display for 5 seconds (includes GIF timing)
    ];

    let totalDelay = 0;

    messages.forEach((msg, index) => {
        // Show the message after the cumulative delay
        setTimeout(() => {
            const element = document.getElementById(msg.id);
            if (element) {
                element.classList.remove('hidden');
                element.classList.add('show');
                console.log(`Showing message: ${msg.id}`);

                // If it's message4, handle GIF timing
                if (msg.id === 'message4') {
                    // Show the GIF after 2 seconds
                    setTimeout(() => {
                        const gif = element.querySelector('.gif');
                        if (gif) {
                            gif.style.display = 'block';
                            console.log('Showing GIF');
                        }
                    }, 2000); // 2-second delay after message4 appears

                    // Hide the GIF after additional 3 seconds (total 5 seconds)
                    setTimeout(() => {
                        const gif = element.querySelector('.gif');
                        if (gif) {
                            gif.style.display = 'none';
                            console.log('Hiding GIF');
                        }

                        // After GIF hides, show the birthday card
                        setTimeout(() => {
                            const birthdayCard = document.querySelector('.birthdaycard');
                            birthdayCard.classList.remove('hidden');
                            birthdayCard.classList.add('show');
                            console.log('Showing birthday card');
                        }, 1000); // 1-second delay before showing the card
                    }, 5000); // 2s (delay) + 3s (GIF display) = 5 seconds
                }
            }
        }, totalDelay);

        // Hide the message after its display duration
        setTimeout(() => {
            const element = document.getElementById(msg.id);
            if (element) {
                element.classList.remove('show');
                element.classList.add('hidden');
                console.log(`Hiding message: ${msg.id}`);
            }

            // No additional action needed here for message4
        }, totalDelay + msg.displayDuration);

        // Increment the total delay for the next message
        totalDelay += msg.displayDuration;
    });
});