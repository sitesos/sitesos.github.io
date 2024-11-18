const usrname = document.getElementById("usernameinput");
const agree = document.getElementById("agreetotos");

if (localStorage.getItem("setupCompleted")) {
    location.assign("/index.html");
};

function completeSetup() {
    if (usrname.value) {
        if (agree.checked) {
            localStorage.setItem("username", usrname.value);
            localStorage.setItem("setupCompleted", true);
            localStorage.setItem("sites", JSON.stringify([]));
            location.assign("/builder/index.html");
        } else {
            alert("Error: You are not eligible for our service because you don't agree to the TOS.");
        }
    } else {
        alert("Error: Please fill the username field.");
    }
};
