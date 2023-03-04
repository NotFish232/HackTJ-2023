function show_login(){
    var ajax_params={
        'url': "https://temp-2023jwang.sites.tjhsst.edu/login-box", //login-box
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
        'url': "https://temp-2023jwang.sites.tjhsst.edu/signup-box",
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