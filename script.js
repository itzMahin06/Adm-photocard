document.getElementById('detailsForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const university = document.getElementById('university').value;
    const rank = document.getElementById('rank').value;
    const imageFile = document.getElementById('image').files[0];

    const backgroundImage = document.getElementById('backgroundImage');
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    const reader = new FileReader();
    reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
            canvas.width = backgroundImage.width;
            canvas.height = backgroundImage.height;

            // Draw the background image
            ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

            // Draw the uploaded image as a circle
            const uploadedImage = new Image();
            uploadedImage.src = e.target.result;
            uploadedImage.onload = function() {
                // Position and size of the circular image
                const circleX = 100; // Replace with exact x-coordinate
                const circleY = 100; // Replace with exact y-coordinate
                const circleRadius = 50; // Radius of the circle

                // Create a circular clipping path
                ctx.beginPath();
                ctx.arc(circleX + circleRadius, circleY + circleRadius, circleRadius, 0, Math.PI * 2, true);
                ctx.closePath();
                ctx.clip();

                // Draw the uploaded image within the circular clipping path
                ctx.drawImage(uploadedImage, circleX, circleY, circleRadius * 2, circleRadius * 2);

                // Reset clipping path
                ctx.restore();

                // Add text
                ctx.font = '20px Arial';
                ctx.fillStyle = 'black'; // Text color
                const textX = 200; // Replace with exact x-coordinate for text
                const textY = 250; // Replace with exact y-coordinate for text

                ctx.fillText(`Name: ${name}`, textX, textY);
                ctx.fillText(`University: ${university}`, textX, textY + 30);
                ctx.fillText(`Rank: ${rank}`, textX, textY + 60);

                // Show download link
                const downloadLink = document.getElementById('downloadLink');
                downloadLink.href = canvas.toDataURL('image/png');
                downloadLink.style.display = 'block';
            };
        };
        img.src = backgroundImage.src;
    };
    reader.readAsDataURL(imageFile);
});
