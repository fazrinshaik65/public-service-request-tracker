const history = document.getElementById("history");
const filter = document.getElementById("filterStatus");
if (history) {
    const requests = JSON.parse(localStorage.getItem("requests")) || [];
    const currentUser = localStorage.getItem("loggedUser");
    function showHistory() {
        const selectedStatus = filter.value;
        let output = "";
        requests.forEach(function (r) {
            if (r.user === currentUser) {
                if (selectedStatus === "All" || r.status === selectedStatus) {
                    output += `
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
            }
        });
        if (output === "") {
            output = "<h2 style='text-align:center'>No Requests Found</h2>";
        }
        history.innerHTML = output;
    }
    showHistory();
    if (filter) {
        filter.addEventListener("change", showHistory);
    }
}