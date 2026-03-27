    const imageInput = document.getElementById('imageInput');
    const fileNameDisplay = document.getElementById('fileName');
    const dropZone = document.getElementById('dropZone');
    const loader = document.getElementById('loader');
    const status = document.getElementById('status');
    const outputDiv = document.getElementById('outputImage');

    function resetAll() {
        imageInput.value = "";
        fileNameDisplay.innerText = "Drag Or Drop Here Picture";
        fileNameDisplay.style.color = "#6b7280";
        status.innerText = "";
        outputDiv.innerHTML = "";
        loader.style.display = "none";
        console.log("Reset Completed!!!");
    }

    // ২. ফাইলের নাম আপডেট
    imageInput.addEventListener('change', function() {
        if (this.files[0]) {
            fileNameDisplay.innerText = "Your Picked File : " + this.files[0].name;
            fileNameDisplay.style.color = "var(--primary)";
        }
    });

    dropZone.addEventListener('dragover', (e) => { e.preventDefault(); dropZone.classList.add('active'); });
    dropZone.addEventListener('dragleave', () => dropZone.classList.remove('active'));
    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('active');
        imageInput.files = e.dataTransfer.files;
        fileNameDisplay.innerText = "Your Picked File : " + e.dataTransfer.files[0].name;
    });

    async function removeBackground() {
        const imageFile = imageInput.files[0];
        if (!imageFile) { alert("Select Picture First!!!"); return; }

        const apiKey = "QKSTHuN7yTKmtzKmHXrmbaDf";

        loader.style.display = "block";
        status.innerText = "Processing...";
        outputDiv.innerHTML = "";

        const formData = new FormData();
        formData.append('image_file', imageFile);
        formData.append('size', 'auto');

        try {
            const response = await fetch('https://api.remove.bg/v1.0/removebg', {
                method: 'POST',
                headers: { 'X-Api-Key': apiKey },
                body: formData
            });

            if (response.ok) {
                const blob = await response.blob();
                const url = URL.createObjectURL(blob);
                status.innerText = "Successful!!! ✅";
                status.className = "text-success";
                outputDiv.innerHTML = `<img src="${url}"><br><a href="${url}" download="Removed_Background_Picture.png"><button class="btn-process" style="background:var(--primary-top:10px;">Download</button></a>`;
            } else {
                status.innerText = "There Was An Unexpected Error In API";
            }
        } catch (e) {
            status.innerText = "There Was An Unexpected Error";
        } finally {
            loader.style.display = "none";
        }
    }
