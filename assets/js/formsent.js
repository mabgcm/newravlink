function sendMail() {

    var full_name = document.getElementById("fname").value;
    var company_name = document.getElementById("cname").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;


    // Check if required fields are filled
    if (!full_name || !company_name || !email || !phone) {
        Toastify({
            text: "Please fill in all required fields.",
            duration: 3000,
            close: true,
            gravity: "bottom",
            position: "right",
            backgroundColor: "#FF5733",
            stopOnFocus: true,
        }).showToast();
        return; // Prevent form submission if fields are missing
    }
    var template = {
        subject: "Website Contact Form",
        form_name: full_name,
        form_email: email,
        form_phone: phone,
        message: `${company_name}`
    };

    emailjs.send('service_plh1e6e', 'template_wf6smzg', template)
        .then(function (res) {
            console.log('SUCCESS!', res.status, res.text);
            document.getElementById("fname").value = "";
            document.getElementById("cname").value = "";
            document.getElementById("email").value = "";
            document.getElementById("phone").value = "";

            Toastify({
                text: "Your message sent successfully!",
                duration: 1500,
                close: true,
                gravity: "bottom",
                position: "left",
                backgroundColor: "#001253",
                stopOnFocus: true,
            }).showToast();
            gtag('event', 'conversion', {
                'send_to': 'AW-17095407004/success'
            });
        }, function (error) {
            console.log('FAILED...', error);
        });
    // console.log(template.message)
}

document.getElementById('contact-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission

    // Call your sendMail() function here
    sendMail();
});