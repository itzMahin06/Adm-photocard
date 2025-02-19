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

            // Draw the uploaded image
            const uploadedImage = new Image();
            uploadedImage.src = e.target.result;
            uploadedImage.onload = function() {
                ctx.drawImage(uploadedImage, 50, 50, 100, 100); // Adjust position and size as needed

                // Add text
                ctx.font = '20px Arial';
                ctx.fillStyle = 'white';
                ctx.fillText(`Name: ${name}`, 50, 200);
                ctx.fillText(`University: ${university}`, 50, 230);
                ctx.fillText(`Rank: ${rank}`, 50, 260);

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
