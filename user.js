const user = localStorage.getItem("loggedUser");
const username = document.getElementById("username");
if(username){
    username.innerHTML=user;
}
const logout=document.getElementById("logout");
if(logout){
    logout.addEventListener("click",function(){
        localStorage.removeItem("loggedUser");
        window.location.href="login.html";
    });
}
const bookingForm=document.getElementById("bookingForm");
if(bookingForm){
    bookingForm.addEventListener("submit",function(e){
        e.preventDefault();
        const requests=JSON.parse(localStorage.getItem("requests"));
        const request={
            id:"REQ"+Date.now(),
            user:user,
            service:document.getElementById("service").value,
            partner: document.getElementById("selectedPartner").value,
            phone:document.getElementById("phone").value,
            address:document.getElementById("address").value,
            problem:document.getElementById("problem").value,
            status:"Pending",
            rating:0,
            feedback:""
        };
        requests.push(request);
        localStorage.setItem("requests",JSON.stringify(requests));
        alert("Service Request Submitted Successfully");
        window.location.href="history.html";
    });
}
const viewPartnersBtn = document.getElementById("viewPartnersBtn");
if(viewPartnersBtn){
    viewPartnersBtn.addEventListener("click",function(){
        const service=document.getElementById("service").value;
        const container=document.getElementById("partnerList");
        let output="";
        const partners=servicePartners[service];
        if(!partners){
            container.innerHTML="<h3>No Partners Available</h3>";
            return;
        }
        partners.forEach(function(partner,index){
            output += `
            <div class="card partner-card" id="card-${partner.name}" style="width: 100%;">
            <h2>${partner.name}</h2>
            <p><b>Experience :</b> ${partner.experience}</p>
            <p><b>Area :</b> ${partner.area}</p>
            <p><b>Phone :</b> ${partner.phone}</p>
            <button id="btn-${partner.name}" class="submit-btn partner-btn" onclick="selectPartner('${partner.name}')"> Select </button>
            </div>
            `;
        });
        container.innerHTML=output;
    });
}
const history=document.getElementById("history");
if(history){
    const requests=JSON.parse(localStorage.getItem("requests"));
    let output="";
    requests.forEach(function(r){
        if(r.user===user){
            output+=`
            <div class="card">
            <h3>${r.id}</h3>
            <p><b>Service :</b> ${r.service}</p>
            <p><b>Status :</b> ${getStatus(r.status)}</p>
            <p><b>Problem :</b> ${r.problem}</p>
            <p><b>Address :</b> ${r.address}</p>
            <p><b>Phone :</b> ${r.phone}</p>
            ${showRatingButton(r)}
            </div>
            `;
        }
    });
    if(output===""){
        output="<h2>No Requests Found</h2>";
    }
    history.innerHTML=output;
}
const filter=document.getElementById("filterStatus");
let selected="All";
if(filter){
    filter.addEventListener("change",function(){
        selected=this.value;
        showHistory();
    });
}
function getStatus(status){
    if(status=="Pending")
        return "<span style='color:orange'>Pending</span>";
    if(status=="Accepted")
        return "<span style='color:green'>Accepted</span>";
    if(status=="On the Way")
        return "<span style='color:blue'>On the Way</span>";
    if(status=="Work Started")
        return "<span style='color:purple'>Work Started</span>";
    if(status=="Completed")
        return "<span style='color:darkgreen'>Completed</span>";
    if(status=="Rejected")
        return "<span style='color:red'>Rejected</span>";
}

function showRatingButton(request){
    if(request.status=="Completed" && request.rating==0){
        return `
        <button class="submit-btn"
        onclick="giveRating('${request.id}')">
        Give Rating
        </button>
        `;
    }
    if(request.status=="Completed" && request.rating>0){
        return `
        <p><b>Rating :</b> ${request.rating} ⭐</p>
        <p><b>Feedback :</b> ${request.feedback}</p>
        <button class="submit-btn"
        onclick="deleteRequest('${request.id}')">
        Delete
        </button>
        `;
    }
    return "";
}
function deleteRequest(id){
    const confirmDelete = confirm("Are you sure you want to delete this completed request?");
    if(!confirmDelete){
        return;
    }
    let requests = JSON.parse(localStorage.getItem("requests")) || [];
    requests = requests.filter(function(request){
        return request.id !== id;
    });
    localStorage.setItem("requests", JSON.stringify(requests));
    alert("Request deleted successfully.");
    location.reload();
}
function giveRating(id){
    localStorage.setItem("currentRequest",id);
    window.location.href="ratings.html";
}
const ratingForm=document.getElementById("ratingForm");
if(ratingForm){
    const id=localStorage.getItem("currentRequest");
    document.getElementById("requestId").innerHTML=id;
    ratingForm.addEventListener("submit",function(e){
        e.preventDefault();
        const requests=JSON.parse(localStorage.getItem("requests"));
        const rating=document.getElementById("rating").value;
        const feedback=document.getElementById("feedback").value;
        requests.forEach(function(r){
            if(r.id==id){
            r.rating=rating;
            r.feedback=feedback;
            }
        });
        localStorage.setItem("requests",JSON.stringify(requests));
        localStorage.removeItem("currentRequest");
        alert("Thank you for your feedback!");
        window.location.href="history.html";
    });
}
function selectPartner(name){
    document.getElementById("selectedPartner").value = name;
    const buttons = document.querySelectorAll(".partner-btn");
    buttons.forEach(function(btn){
        btn.innerHTML = "Select";
        btn.style.background = "#10275e";
        btn.disabled = false;
    });
    const cards = document.querySelectorAll(".partner-card");
    cards.forEach(function(card){
        card.classList.remove("selected-card");
    });
    const selectedButton = document.getElementById("btn-" + name);
    selectedButton.innerHTML = "Selected";
    selectedButton.style.background = "#03246c";
    selectedButton.disabled = true;
    document.getElementById("card-" + name).classList.add("selected-card");
}
const total=document.getElementById("totalRequests");
if(total){
    const requests=JSON.parse(localStorage.getItem("requests"));
    let totalCount=0;
    let pending=0;
    let completed=0;
    requests.forEach(function(r){
        if(r.user==user){
            totalCount++;
            if(r.status=="Pending")
            pending++;
            if(r.status=="Completed")
            completed++;
        }
    });
    document.getElementById("totalRequests").innerHTML=totalCount;
    document.getElementById("pendingRequests").innerHTML=pending;
    document.getElementById("completedRequests").innerHTML=completed;
}