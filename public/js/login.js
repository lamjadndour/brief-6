$(document).ready(function () {
    $("#but_submit").click(function () {
        var username = $("#name").val();
        var password = $("#pass").val();
        if (username != "" && password != "") {
            $.ajax({
                url: '/Login',
                type: 'post',
                data: { username, password },
                success: function (response) {
                    if (response.request) {
                        // password correct
                        window.location.href = "/dashbord.html";
                    } else {
                        //password incorrect
                        $("#alert").css('display', 'block');
                        $("#alert").html(" <strong>Warning!</strong>Wrong Username & Password")
                    }
                }
            });
        } else {
            //input is messing
            $("#alert").css('display', 'block');
            $("#alert").html(" <strong>Warning!</strong> Please feal correctily all inputs.")
        }
    });
}); 