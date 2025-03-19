document.addEventListener('DOMContentLoaded', () => {
    const redSlider = document.getElementById('red');
    const greenSlider = document.getElementById('green');
    const blueSlider = document.getElementById('blue');
    const colorPreview = document.getElementById('color-preview');
    const hexCodeInput = document.getElementById('hex-code');
    const copyButton = document.getElementById('copy-button');
    const colorNameDisplay = document.getElementById('color-name');
    const copyMessage = document.getElementById('copy-message');

    function updateColor() {
        const red = redSlider.value;
        const green = greenSlider.value;
        const blue = blueSlider.value;

        const hexCode = rgbToHex(red, green, blue);

        colorPreview.style.backgroundColor = hexCode;
        hexCodeInput.value = hexCode;

        const colorName = getColorName(red, green, blue);
        colorNameDisplay.textContent = `Color: ${colorName}`;
    }

    function rgbToHex(r, g, b) {
        return "#" + componentToHex(parseInt(r)) + componentToHex(parseInt(g)) + componentToHex(parseInt(b));
    }

    function componentToHex(c) {
        let hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }

    function getColorName(r, g, b) {
        if (r == 255 && g == 0 && b == 0) return "Red";
        if (r == 0 && g == 255 && b == 0) return "Green";
        if (r == 0 && g == 0 && b == 255) return "Blue";
        if (r == 255 && g == 255 && b == 0) return "Yellow";
        if (r == 255 && g == 255 && b == 255) return "White";
        if (r == 0 && g == 0 && b == 0) return "Black";
        if (r == g && g == b) {
            if (r > 128) return "Light Gray";
            else return "Dark Gray";
        }
        return `RGB(${r}, ${g}, ${b})`;
    }

    redSlider.addEventListener('input', updateColor);
    greenSlider.addEventListener('input', updateColor);
    blueSlider.addEventListener('input', updateColor);

    copyButton.addEventListener('click', () => {
        hexCodeInput.select();
        hexCodeInput.setSelectionRange(0, 99999);

        navigator.clipboard.writeText(hexCodeInput.value)
            .then(() => {
                // Show the copy message
                copyMessage.classList.remove('hidden');

                // Hide the copy message after a delay
                setTimeout(() => {
                    copyMessage.classList.add('hidden');
                }, 2000); // 2 seconds
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
                copyMessage.textContent = "Failed to Copy!";
                copyMessage.classList.remove('hidden');
                setTimeout(() => {
                    copyMessage.classList.add('hidden');
                    copyMessage.textContent = "Copied!"; // Reset text
                }, 2000);
            });
    });

    updateColor();
});