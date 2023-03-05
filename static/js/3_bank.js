var withdraw_change = 0;
var save_change = 0;

function investStocks(){
     $('#buy_stock_modal').modal('show');
}
function useModel(){
    useModelHelp().then(json => {
        console.log(json.prediction);
        $.ajax({
            'url': 'http://localhost:3000/change_coins?amt='+(parseInt(json.prediction)-stock_thing),
            'method': 'get',
            'success': onCoinsChangeSuccess
        });
    });
}
async function useModelHelp(){
    let stock = document.getElementById("stockname").value;
    let money = document.getElementById("amount").value;
    stock_thing = money;
    let time = document.getElementById("time").value;
    let url = "https://finance-api.justinlee60.repl.co/predict?time="+time+"&stock="+stock+"&money="+money;
    const response = await fetch(url);
    return response.json();
}

// Save money 
function save(){
    $('#save_modal').modal('show');
}
function submitSave(){
    savings = parseInt(document.getElementById("savings-text").innerHTML);
    change = document.getElementById("save-amount").value;
    console.log(savings);
    save_change = change;
    document.getElementById("savings-text").innerHTML = (""+(savings+parseInt(change)));
    $.ajax({
        'url': "http://localhost:3000/change_savings?amt="+(savings+parseInt(change)),
        'method': "get",
        'success': onSaveSuccess
    });
}
function onSaveSuccess(responseString){
    $.ajax({
        'url': "http://localhost:3000/change_coins?amt="+(savings-parseInt(change)),
        'method': "get",
        'success': onCoinsChangeSuccess
    });
}

// Withdraw money 
function withdraw(){
    $('#withdraw_modal').modal('show');
}
function submitWithdraw(){
    savings = parseInt(document.getElementById("savings-text").innerHTML);
    change = document.getElementById("withdraw-amount").value;
    withdraw_change = change;
    document.getElementById("savings-text").innerHTML = (""+(savings-parseInt(change)));
    $.ajax({
        'url': "http://localhost:3000/change_savings?amt=-"+change,
        'method': "get",
        'success': onWithdrawSuccess
    });
}
function onWithdrawSuccess(){
    $.ajax({
        'url': "http://localhost:3000/change_coins?amt="+withdraw_change,
        'method': "get",
        'success': onCoinsChangeSuccess
    });
}
function onCoinsChangeSuccess(responseString){
    
}
