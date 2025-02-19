const bgImageSrc = "bglatest.jpg"; // Replace with your uploaded background image file name

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

                // Add text
                ctx.fillStyle = "#000000";
                ctx.font = "bold 78px Kalpurush";
                ctx.fillText(name, 500, 1330);
                ctx.fillText(university, 500, 1430);
                ctx.fillText("মেরিট পজিশনঃ " + rank, 500, 1530);

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
