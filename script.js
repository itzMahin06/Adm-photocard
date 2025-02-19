const bgImageSrc = "background.jpg"; // Replace with your uploaded background image file name

function generateCard() {
    const name = document.getElementById("name").value;
    const university = document.getElementById("university").value;
    const rank = document.getElementById("rank").value;
    const imageUpload = document.getElementById("imageUpload").files[0];

    if (!name || !rank || !imageUpload) {
        alert("Please fill all fields and upload an image.");
        return;
    }

    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    const bgImage = new Image();
    bgImage.src = bgImageSrc;

    bgImage.onload = function () {
        canvas.width = bgImage.width;
        canvas.height = bgImage.height;

        ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);

        // Load user image and crop into a circle
        const reader = new FileReader();
        reader.onload = function (e) {
            const userImg = new Image();
            userImg.src = e.target.result;
            userImg.onload = function () {
                const size = 678;
                const x = 463;
                const y = 530;

                ctx.save();
                ctx.beginPath();
                ctx.arc(x + size / 2, y + size / 2, size / 2, 0, Math.PI * 2);
                ctx.closePath();
                ctx.clip();

                ctx.drawImage(userImg, x, y, size, size);
                ctx.restore();

                // Add text (Centered Alignment)
ctx.fillStyle = "#433268";
ctx.textAlign = "center"; // Center alignment

const centerX = canvas.width / 2; // Get the center X position
const nameY = 1330; // Adjust Y for proper positioning
const universityY = 1430;
const rankY = 1530;

// Name (Larger & Bold)
ctx.font = "bold 100px Kalpurush";
ctx.fillText(name, centerX, nameY);

// University Name (Medium Size)
ctx.font = "bold 80px Kalpurush";
ctx.fillText(university, centerX, universityY);

// Rank (Smaller)
ctx.font = "bold 78px Kalpurush";
ctx.fillText("মেরিট পজিশনঃ " + rank, centerX, rankY);

                // Show download button
                document.getElementById("downloadBtn").style.display = "block";
            };
        };
        reader.readAsDataURL(imageUpload);
    };
}
 
function downloadImage() {
    const canvas = document.getElementById("canvas");
    const link = document.createElement("a");
    link.download = "photo-card.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
}
