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
                ctx.drawImage(uploadedImage, 805, 870, 300, 300); // Adjust position and size as needed

                // Add text
                ctx.font = '48px Arial';
                ctx.fillStyle = 'black';
                ctx.fillText(`Name: ${name}`, 800, 920);
                ctx.fillText(`University: ${university}`, 800, 940);
                ctx.fillText(`Rank: ${rank}`, 800, 950);

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
