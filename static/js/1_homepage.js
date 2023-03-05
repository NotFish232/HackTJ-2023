function show_login(){
    var ajax_params={
        'url': "http://localhost:3000/login-box", //login-localhost:3000
        'method': "get",
        'success': updateLogin
    };
    $.ajax(ajax_params);
}
function updateLogin(responseString){
    document.getElementById("signup-box").innerHTML = responseString;
    document.getElementById("message-inner").innerHTML="Need an account? Sign up instead!";
    document.getElementById("message-inner").setAttribute("onclick","show_signup()");
}

function show_signup(){
    var ajax_params={
        'url': "http://localhost:3000/signup-box",
        'method': "get",
        'success': updateSignup
    };
    $.ajax(ajax_params);
}
function updateSignup(responseString){
    document.getElementById("signup-box").innerHTML = responseString;
    document.getElementById("message-inner").innerHTML="Have an account already? Log in instead!";
    document.getElementById("message-inner").setAttribute("onclick","show_login()");
}