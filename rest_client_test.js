const http = require("http");
console.log(http);
http.post("http://localhost:3500/login",
{
    username: "admin",
    password:"secret"
},function(res) {
    console.log("Login - username: admin pass:secret");
    if (res.success) {
        let token = res.token;
        console.log("\t Login successfully. Token:");
    }   
});