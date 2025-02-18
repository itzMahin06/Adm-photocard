document.getElementById("generateCard").addEventListener("click", function () {
    let name = document.getElementById("name").value.trim();
    let university = document.getElementById("university").value;
    let rank = document.getElementById("rank").value.trim();
    let imageFile = document.getElementById("imageUpload").files[0];

    // Input Validations
    if (!name || !rank || !imageFile) {
        alert("Please fill all fields and upload an image.");
        return;
    }
    if (isNaN(rank) || rank < 1) {
        alert("Rank must be a valid number.");
        return;
    }
    if (imageFile.size > 300 * 1024) {
        alert("Image must be under 300KB.");
        return;
    }

    let reader = new FileReader();
    reader.readAsDataURL(imageFile);
    reader.onload = function (e) {
        let img = new Image();
        img.src = e.target.result;
        img.onload = function () {
            createPhotoCard(img, name, university, rank);
        };
    };
});

// Function to create the photo card
function createPhotoCard(img, name, university, rank) {
    let canvas = document.getElementById("photoCardCanvas");
    let ctx = canvas.getContext("2d");

    // Set canvas size to match uploaded template
    canvas.width = 1080;
    canvas.height = 1080;

    let bgImage = new Image();
    bgImage.src = "photo_card_template.jpg";  // Replace with your template image URL
    bgImage.onload = function () {
        ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);

        // Draw Circular Cropped Image
        let circleX = 400, circleY = 400, radius = 150;
        ctx.save();
        ctx.beginPath();
        ctx.arc(circleX, circleY, radius, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(img, circleX - radius, circleY - radius, radius * 2, radius * 2);
        ctx.restore();

        // Add Name
        ctx.fillStyle = "black";
        ctx.font = "bold 50px Arial";
        ctx.textAlign = "center";
        ctx.fillText(name, canvas.width / 2, 700);

        // Add University & Rank
        ctx.font = "bold 40px Arial";
        ctx.fillText(university, canvas.width / 2, 770);
        ctx.fillText("Rank: " + rank, canvas.width / 2, 840);

        document.getElementById("cardContainer").style.display = "block";
    };
}

// Download Function
document.getElementById("downloadCard").addEventListener("click", function () {
    let canvas = document.getElementById("photoCardCanvas");
    let link = document.createElement("a");
    link.download = "photo_card.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
});
