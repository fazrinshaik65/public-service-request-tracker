const history = document.getElementById("history");
const filter = document.getElementById("filterStatus");

if (history) {

    const currentUser = localStorage.getItem("loggedUser");

    function showHistory() {

        const requests = JSON.parse(localStorage.getItem("requests")) || [];
        const selectedStatus = filter.value;

        let output = "";

        requests.forEach(function (r) {

            if (r.user === currentUser) {

                if (selectedStatus === "All" || r.status === selectedStatus) {

                    output += `
                    <div class="card">

                        <h3>${r.id}</h3>

                        <p>
                            <b>Service :</b> ${r.service}
                        </p>

                        <p>
                            <b>Status :</b> ${getStatus(r.status)}
                        </p>

                        ${
                            r.status === "Rejected"
                            ?
                            `
                            <div style="
                                margin:15px 0;
                                padding:12px;
                                background:#ffe6e6;
                                border-left:5px solid red;
                                border-radius:8px;
                            ">
                                <p style="color:red;">
                                    <b>Rejection Reason :</b>
                                    ${r.rejectionReason || "No reason provided"}
                                </p>
                            </div>
                            `
                            :
                            ""
                        }

                        <p>
                            <b>Problem :</b> ${r.problem}
                        </p>

                        <p>
                            <b>Address :</b> ${r.address}
                        </p>

                        <p>
                            <b>Phone :</b> ${r.phone}
                        </p>

                        ${showRatingButton(r)}

                    </div>
                    `;
                }
            }
        });

        if (output === "") {
            output = `
                <h2 style="text-align:center">
                    No Requests Found
                </h2>
            `;
        }

        history.innerHTML = output;
    }

    showHistory();

    if (filter) {
        filter.addEventListener("change", showHistory);
    }
}