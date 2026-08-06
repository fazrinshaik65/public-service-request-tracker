const partner = localStorage.getItem("loggedPartner");
const service = localStorage.getItem("partnerService");
const partnerName = document.getElementById("partnerName");
if (partnerName) {
    partnerName.innerHTML = partner;
}
const partnerService = document.getElementById("partnerService");
if (partnerService) {
    partnerService.innerHTML = service;
}
const logout = document.getElementById("logoutPartner");
if (logout) {
    logout.addEventListener("click", function () {
        localStorage.removeItem("loggedPartner");
        localStorage.removeItem("partnerService");
        window.location.href = "login.html";
    });
}
const requests = JSON.parse(localStorage.getItem("requests"));
const container = document.getElementById("requestContainer");
if (container) {
    let output = "";
    requests.forEach(function(request,index){
        if(request.partner===partner && request.status!="Completed" && request.status!="Rejected"){
            output += `
            <div class="card">
                <h3>${request.id}</h3>
                <p><b>User :</b> ${request.user}</p>
                <p><b>Phone :</b> ${request.phone}</p>
                <p><b>Address :</b> ${request.address}</p>
                <p><b>Problem :</b> ${request.problem}</p>
                <p><b>Status :</b>
                <span style="color:blue;font-weight:bold">
                ${request.status}
                </span>
                </p>
                ${getButtons(request.status,index)}
            </div>
            `;
        }
    });
    container.innerHTML = output;
}
function getButtons(status,index){
    if(status=="Pending"){
        return `<button class="submit-btn" onclick="acceptRequest(${index})"> Accept </button>
        <button class="submit-btn" onclick="rejectRequest(${index})"> Reject </button>`;
    }
    if(status=="Accepted"){
        return `<button class="submit-btn" onclick="updateStatus(${index},'On the Way')"> On the Way </button>`;
    }
    if(status=="On the Way"){
        return `<button class="submit-btn" onclick="updateStatus(${index},'Work Started')"> Start Work </button>`;
    }
    if(status=="Work Started"){
        return `<button class="submit-btn" onclick="updateStatus(${index},'Completed')"> Complete Work </button>`;
    }
    if(status=="Completed"){
        return `<h3 style="color:green"> ✔ Work Completed </h3>`;
    }
    if(status=="Rejected"){
        return `<h3 style="color:red"> Request Rejected </h3>`;
    }
}
function acceptRequest(index){
    const requests = JSON.parse(localStorage.getItem("requests"));
    requests[index].status="Accepted";
    localStorage.setItem("requests",JSON.stringify(requests));
    location.reload();
}
function rejectRequest(index){
    const answer=confirm("Reject this request?");
    if(!answer) return;
    const requests=JSON.parse(localStorage.getItem("requests"));
    requests[index].status="Rejected";
    localStorage.setItem("requests",JSON.stringify(requests));
    location.reload();
}
function updateStatus(index,status){
    const requests=JSON.parse(localStorage.getItem("requests"));
    requests[index].status=status;
    localStorage.setItem("requests",JSON.stringify(requests));
    location.reload();
}
const reviews=document.getElementById("reviews");
if(reviews){
    const requests=JSON.parse(localStorage.getItem("requests"));
    const service=localStorage.getItem("partnerService");
    let output="";
    let total=0;
    let count=0;
    requests.forEach(function(r){
        if(r.partner===partner && Number(r.rating)>0){
            total+=Number(r.rating);
            count++;
            output+=`
            <div class="card">
            <h3>${r.id}</h3>
            <p><b>User :</b> ${r.user}</p>
            <p><b>Rating :</b> ${r.rating} ⭐</p>
            <p><b>Feedback :</b></p>
            <p>${r.feedback}</p>
            </div>
            `;
        }
    });
    if(count>0){
        output=`
        <div class="card">
        <h2>
        Average Rating : ${(total/count).toFixed(1)} ⭐
        </h2>
        </div>
        `+output;
    }
    else{
        output="<h2>No Reviews Yet</h2>";
    }
    reviews.innerHTML=output;
}
const totalJobs=document.getElementById("totalJobs");
if(totalJobs){
    const requests=JSON.parse(localStorage.getItem("requests"));
    let active=0;
    let pending=0;
    let completed=0;
    requests.forEach(function(r){
        if(r.partner==partner){
            if(r.status=="Pending")
                pending++;
            if(r.status=="Pending" || r.status=="Accepted" || r.status=="On the Way" || r.status=="Work Started" || r.status=="Completed")
                active++;
            if(r.status=="Completed")
                completed++;
        }
    });
    document.getElementById("totalJobs").innerHTML=active;
    document.getElementById("pendingJobs").innerHTML=pending;
    document.getElementById("completedJobs").innerHTML=completed;
}
const historyContainer = document.getElementById("historyContainer");
if(historyContainer){
    const requests = JSON.parse(localStorage.getItem("requests"));
    const service = localStorage.getItem("partnerService");
    let output = "";
    requests.forEach(function(request){
        console.log(request);
        console.log(service);
        if(request.partner==partner && (request.status=="Completed" || request.status=="Rejected")){
            output += `
            <div class="card">
                <h2>${request.id}</h2>
                <p><b>User :</b> ${request.user}</p>
                <p><b>Phone :</b> ${request.phone}</p>
                <p><b>Address :</b> ${request.address}</p>
                <p><b>Problem :</b> ${request.problem}</p>
                <p><b>Status :</b>
                <span style="color:
                ${request.status=="Completed" ? "green" : "red"}">
                ${request.status}
                </span>
                </p>
                ${
                    request.rating>0 ?
                    `<p><b>Rating :</b> ${request.rating} ⭐</p>
                    <p><b>Feedback :</b> ${request.feedback}</p>`
                    :
                   "<p><i>No Rating</i></p>"
                }
            </div>
            `;
        }
    });
    if(output==""){
        output="<h2 style='text-align:center'>No Job History Available</h2>";
    }
    historyContainer.innerHTML=output;
}