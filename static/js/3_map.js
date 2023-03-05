var boughtGroceries = 0;
var paidHousing = 0;

function openBank(){
    window.location.href = "http://localhost:3000/bank";
}
function changeCoin(change, top, left, message){
    console.log("Change coins");
    document.getElementById("avatar").style.top = top+"%";
    document.getElementById("avatar").style.left = left+"%";

    $.ajax({
        'url': "http://localhost:3000/change_coins?amt="+change,
        'method': 'get',
        'success': onCoinsChanged
    });
    
    var hasHouse = parseInt(document.getElementById("hidden-val").innerHTML);
    if(top==76&&left==7&&hasHouse===0){
        alert("You bought a house for $36,000!");
        $.ajax({
            'url': "http://localhost:3000/give_house",
            'method': 'get',
            'success': onHouseAdded
        });
    }
    else{
        alert(message);
    }
    
    console.log("TOP: "+top);
    if(top==76){
        paidHousing = 1;
    }
    if(top==2){
        boughtGroceries = 1;
    }
    console.log(paidHousing);
    console.log(boughtGroceries);
}
function onCoinsChanged(responseString){
    document.getElementById("coins_label").innerHTML = responseString;
}
function onHouseAdded(responseString){
    console.log("YES");
}

function incrementMonth(){
    // Update month count
    curMonth = parseInt(document.getElementById("month_span").innerHTML);
    console.log(curMonth);
    document.getElementById("month_span").innerHTML = ""+(curMonth+1);
    $.ajax({
        'url': "http://localhost:3000/change_month?newmonth="+(curMonth+1),
        'method': "get",
        'success': onMonthUpdate
    });
    // Groceries and house?
    console.log("Now: " + boughtGroceries);
    if(boughtGroceries===0){
        alert("You did not buy groceries and lost 10 health points.");
    }
    console.log("Nowr: "+paidHousing);
    if(paidHousing===0){
        alert("You did not pay rent and lost 10 health points.");
        $.ajax({
            'url': "http://localhost:3000/change_health?amt=-10",
            'method': 'get',
            'success': onHealthChanged
        });
    }
    boughtGroceries = 0;
    boughtRent = 0;
    // Random incident
    if(Math.random()<0.5){
        alert("You encountered a random incident!");
        let change = -100;
        $.ajax({
            'url': "http://localhost:3000/change_coins?amt="+change,
            'method': 'get',
            'success': onCoinsChanged
        });
    }
    // Interest 
    alert("You earned monthly interest!");
    savings = parseInt(document.getElementById("hidden-savings").innerHTML);
    $.ajax({
        'url': "http://localhost:3000/change_coins?amt="+parseInt(savings*0.0275),
        'method': 'get',
        'success': onCoinsChanged
    });
}
function onMonthUpdate(responseString){
    
}
function onHealthChanged(responseString){
    console.log("Health "+responseString);
    document.getElementById("health_label").innerHTML = responseString;
}