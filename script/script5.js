function SendMail(){
    let parms = { 
        name : document.getElementById("name").value,
        contact : document.getElementById("Contact").value,
        email : document.getElementById("email").value,
        message : document.getElementById("message").value,
    }

    emailjs.send("service_e6amz68","template_s6ngmqd8",parms).then(alert("email Sent!!!"))
}