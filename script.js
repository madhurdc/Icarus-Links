let qrInstance;
const generate = document.getElementById("generate")
const download = document.getElementById("download")

function getColors() {
    const colorSelect = document.getElementById("color-select").value;
    switch(colorSelect) {
        case "black-white":
            return { dark: "#000000", light: "#ffffff" };
        case "orange-black":
            return { dark: "#FFA500", light: "#000000" };
        case "blue-white":
            return { dark: "#0000FF", light: "#ffffff" };
        case "green-white":
            return { dark: "#008000", light: "#ffffff" };
        case "purple-yellow":
            return { dark: "#800080", light: "#FFFF00" };
        default:
            return { dark: "#000000", light: "#ffffff" };
    }
}

function getQRSize() {
    const sizeSelect = document.getElementById("size-select").value;
    let baseSize;
    switch(sizeSelect) {
        case "small":
            baseSize = 250; 
            break;
        case "medium":
            baseSize = 350; 
            break;
        case "large":
            baseSize = 450; 
            break;
        default:
            baseSize = 350;
    }
    const screenWidth = window.innerWidth;
    if(screenWidth < 500)
    {
        baseSize = Math.min(baseSize, screenWidth * 0.9)
    }
    return baseSize
}


function generateQR()
{
    let text = document.getElementById("qr-input").value.trim();
    if (!/^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(text))
        text = "https://" + text;
    try 
    {
        let url = new URL(text);
    }
    catch(_)
    {
        alert("Enter a valid URL!");
        return;
    }
    const colors = getColors()
    const size = getQRSize()
    const qr = document.getElementById("qrcode");
    qr.innerHTML = "";
    qrInstance = new QRCode(qr, {
        text: text,
        width: size,
        height: size,
        correctLevel: QRCode.CorrectLevel.H,
        colorDark: colors.dark,
        colorLight: colors.light
    });
}
function downloadQR()
{
    if(!qrInstance)
    {
        alert("Please generate a QR code first!")
        return;
    }

    let img = document.querySelector("#qrcode img")
    if(img)
    {
        let link = document.createElement("a");
        link.href = img.src;
        link.download = "qrcode.png"
        link.click();
    }
    else {
        let canvas = document.querySelector("#qrcode canvas");
        let link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "qrcode.png"
        link.click();
    }
}
generate.addEventListener("click", generateQR)
download.addEventListener("click", downloadQR)
window.addEventListener("resize", () => {
    const qrContainer = document.getElementById("qrcode");
    if (qrContainer.innerHTML !== "") {
        generateQR(); // regenerate QR code with new size
    }
});
