// console.log('hello labib');
const userName = document.querySelector("#userName");
const passwordInput = document.querySelector("#passwordInput");
const loginBtn = document.querySelector("#loginBtn");

loginBtn.addEventListener('click', function() {
    if(userName.value === "admin" && passwordInput.value === "admin123"){
        window.location.href = "./dashboard/home.html";
    }else{
        alert("Plase try again");
    }
})