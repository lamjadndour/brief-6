$(document).ready(function () {
    $("#but_submit2").click(function () {
        var username = $("#nameR").val();
        var password = $("#passR").val();
        var confpass = $("#confpass").val();
        var email = $("#emailR").val();

        function validate_email(email) {
            /* Define the recommended regular expression. */
            var emailExp = new RegExp(/^\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i);
            /* Test the email given against the expression and return the result. */
            return emailExp.test(email);
        }
        function confirm_password(password, confpass) {
            if (password != confpass)
                return false
            return true;
        }
        if (username != "" && password != "" && validate_email(email) === true && confirm_password(password, confpass) === true) {
            $.ajax({
                url: '/SignUp',
                type: 'post',
                data: { email, username, password },
                success: function (response) {
                    if (response.request) {
                        window.location.href = "home.html";
                    }
                    else {
                        //if user alredy existe 
                        $("#alertR").css('display', 'block');
                        $("#alertR").html(" <strong>Warning!</strong> you are not lucky try another ID")
                    }
                }
            });
        }
        else {
            //input is messing
            $("#alertR").css('display', 'block');
            $("#alertR").html(" <strong>Warning!</strong> Please feal correctily all inputs.")
            console.log("email " + validate_email(email));
            console.log("confpass " + confirm_password(password, confpass));
        }
    });
});












// $(document).ready(function () {
//     $("#but_submit2").click(function () {
//         var username = $("#nameR").val();
//         var password = $("#passR").val();
//         var confpass = $("confpass")
//         var email = $("#emailR").val();
//         function validateEmail() {
//             var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
//             return regex.test(email)
//         }
//         function validatePassword() {
//             if (password === confpass) {
//                 return true
//             }
//             return false;
//         }

//         if (email)
//             if (username != "" && password != "") {
//                 $.ajax({
//                     url: '/Signup',
//                     type: 'post',
//                     data: { username, password, email },
//                     success: function (response) {
//                         if (response.request) {
//                             window.location.href = "home.html";
//                             console.log('you are registred')
//                         }
//                         else {
//                             $("#alert").css('visibility', 'visible');
//                             console.log('user alery existe')
//                         }

//                     },
//                     error: function () {
//                         $("#alert").css('visibility', 'visible');


//                     }
//                 });
//             } else {
//                 $("#alertR").css('display', 'block');
//                 console.log('inser a corecte email');
//                 var node = document.getElementById('alertR');
//                 node.innerHTML('<strong>Warning!</strong> inser a corecte email');
//             }
//     });
// }); 