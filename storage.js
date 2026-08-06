const users = [
    {
        username: "user1",
        password: "1234"
    }
];
const partners = [

    {
        username: "rajesh",
        password: "1234",
        service: "Plumbers"
    },
    {
        username: "suresh",
        password: "1234",
        service: "Plumbers"
    },

    {
        username: "mahesh",
        password: "1234",
        service: "Electricians"
    },
    {
        username: "ramesh",
        password: "1234",
        service: "Electricians"
    },

    {
        username: "anil",
        password: "1234",
        service: "Carpenters"
    },
    {
        username: "praveen",
        password: "1234",
        service: "Carpenters"
    },

    {
        username: "ravi",
        password: "1234",
        service: "RMP / First Aid Doctors"
    },
    {
        username: "priya",
        password: "1234",
        service: "RMP / First Aid Doctors"
    },

    {
        username: "kiran",
        password: "1234",
        service: "AC Repair Technicians"
    },
    {
        username: "vamsi",
        password: "1234",
        service: "AC Repair Technicians"
    },
    {
        username: "prakash",
        password: "1234",
        service: "Appliance Repair Technicians"
    },
    {
        username: "naresh",
        password: "1234",
        service: "Appliance Repair Technicians"
    },
    {
        username: "srinivas",
        password: "1234",
        service: "Painters"
    },
    {
        username: "ajay",
        password: "1234",
        service: "Painters"
    },
    {
        username: "lakshmi",
        password: "1234",
        service: "House Cleaning Services"
    },
    {
        username: "kavya",
        password: "1234",
        service: "House Cleaning Services"
    },

    {
        username: "vikram",
        password: "1234",
        service: "Internet/Cable Technicians"
    },
    {
        username: "arjun",
        password: "1234",
        service: "Internet/Cable Technicians"
    },
    {
        username: "ganesh",
        password: "1234",
        service: "Gas Stove Repair"
    },
    {
        username: "raju",
        password: "1234",
        service: "Gas Stove Repair"
    }

];
const servicePartners = {
    "Plumbers":[
        {
            name:"rajesh",
            experience:"5 Years",
            phone:"9876543210",
            area:"MVP Colony"
        },
        {
            name:"suresh",
            experience:"3 Years",
            phone:"9123456789",
            area:"Madhurawada"
        }
    ],
    "Electricians":[
        {
            name:"mahesh",
            experience:"6 Years",
            phone:"5552233",
            area:"Metroville Central"
        },
        {
            name:"ramesh",
            experience:"4 Years",
            phone:"7777777777",
            area:"Andhra Pradesh"
        }
    ],
    "Carpenters":[
        {
            name:"anil",
            experience:"7 Years",
            phone:"8888888888",
            area:"Gajuwaka"
        },
        {
            name:"praveen",
            experience:"5 Years",
            phone:"9000011111",
            area:"Seethammadhara"
        }
    ],
    "RMP / First Aid Doctors":[
        {
            name:"ravi",
            experience:"10 Years",
            phone:"9012345678",
            area:"Gopalapatnam"
        },
        {
            name:"priya",
            experience:"8 Years",
            phone:"9123456780",
            area:"Madhurawada"
        }
    ],
    "AC Repair Technicians":[
        {
            name:"kiran",
            experience:"8 Years",
            phone:"9999999999",
            area:"Vizag"
        },
        {
            name:"vamsi",
            experience:"6 Years",
            phone:"9888877777",
            area:"Gajuwaka"
        }
    ],
    "Appliance Repair Technicians":[
        {
            name:"prakash",
            experience:"7 Years",
            phone:"9000099999",
            area:"Dwaraka Nagar"
        },
        {
            name:"naresh",
            experience:"5 Years",
            phone:"9555511111",
            area:"MVP Colony"
        }
    ],
    "Painters":[
        {
            name:"srinivas",
            experience:"9 Years",
            phone:"9444412345",
            area:"Akkayyapalem"
        },
        {
            name:"ajay",
            experience:"4 Years",
            phone:"9666612345",
            area:"Madhurawada"
        }
    ],
    "House Cleaning Services":[
        {
            name:"lakshmi",
            experience:"5 Years",
            phone:"9333312345",
            area:"MVP Colony"
        },
        {
            name:"kavya",
            experience:"4 Years",
            phone:"9777712345",
            area:"Gajuwaka"
        }
    ],
    "Internet/Cable Technicians":[
        {
            name:"vikram",
            experience:"6 Years",
            phone:"9555599999",
            area:"Seethammadhara"
        },
        {
            name:"arjun",
            experience:"5 Years",
            phone:"9444499999",
            area:"Madhurawada"
        }
    ],
    "Gas Stove Repair":[
        {
            name:"ganesh",
            experience:"8 Years",
            phone:"9888812345",
            area:"Vizag"
        },
        {
            name:"raju",
            experience:"6 Years",
            phone:"9666611111",
            area:"Gopalapatnam"
        }
    ]
};
if(localStorage.getItem("requests")==null){
    localStorage.setItem("requests",JSON.stringify([]));
}