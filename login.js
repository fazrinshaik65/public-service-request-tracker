const form = document.getElementById("login-form");
form.addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const type = document.getElementById("user-type").value;
    const error = document.querySelector(".error-msg");
    error.innerHTML = "";
    if(type=="user"){
        const user = users.find(function(u){
            return u.username===username && u.password===password;
        });
        if(user){
            localStorage.setItem("loggedUser",username);
            window.location.href="user.html";
           return;
        }
    }
    if(type=="partner"){
        const partner = partners.find(function(p){
            return p.username===username && p.password===password;
        });
        if(partner){
            localStorage.setItem("loggedPartner",username);
            localStorage.setItem("partnerService",partner.service);
            window.location.href="partner.html";
           return;
        }
    }
    error.innerHTML="Invalid Username or Password";
});