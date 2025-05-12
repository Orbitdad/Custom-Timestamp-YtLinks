let totaltime;
let outputURL = document.getElementById("outputURL")
let load =document.getElementById("mini-loader")
const style = document.createElement('style');
function returnText() {
    const userInput = document.querySelector("#userInput").value.trim();
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[a-zA-Z0-9_-]+/;

    if (!youtubeRegex.test(userInput)) {
        alert("Please enter a valid YouTube URL.");
        return;
    }

    let h = parseInt(document.querySelector("#hour").value) || 0;
    let m = parseInt(document.querySelector("#minutes").value) || 0;
    let s = parseInt(document.querySelector("#seconds").value) || 0;

    if (m > 59 || s > 59 || h < 0 || m < 0 || s < 0) {
        alert("Please enter valid time values.");
        return;
    }

    totaltime = (h * 3600) + (m * 60) + s;

    let formattedTime = convertToTime(totaltime);


    let finalUrl = userInput.includes("?") 
        ? `${userInput}&t=${totaltime}s`
        : `${userInput}?t=${totaltime}s`;

    outputURL = document.getElementById("outputURL");

    outputURL.addEventListener("click", function (event) {
        event.preventDefault();
        if (!finalUrl) {
            alert("Enter data..")
        } else {
            navigator.clipboard.writeText(finalUrl).then(() => {
                alert("Link copied to clipboard!");
            });
        }
    });
    let counter=3
    if (counter!=0) {
        setInterval(()=>counter-=counter,1000)
        setInterval(loader(),3000)
    }

    setTimeout(()=>{
        load.style.display="none"
        outputURL.style.display="block"
        style.innerHTML = `
                #outputURL::after {
                    display:block;
                }`
    },3000)
}


function loader(){
    load.style.display = "block"
    load.style.animation= "load 1s ease-in-out  5"
}

function convertToTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    seconds %= 3600;
    const minutes = Math.floor(seconds / 60);
    seconds %= 60;
    return `${hours}h ${minutes}m ${seconds}s`;
}

function resetForm() {
    document.getElementById("userInput").value = "";
    document.getElementById("hour").value = "";
    document.getElementById("minutes").value = "";
    document.getElementById("seconds").value = "";
    outputURL.textContent = "Generated Link";
    outputURL.removeAttribute("href");
    timestampDisplay.textContent = "Timestamp: 0h 0m 0s";
}