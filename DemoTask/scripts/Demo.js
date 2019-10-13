//////////////////////////////////////////////////////////////
// Title:  CyanGate Demo Task
// Author: Sinem Şentepe
// Date: 13 October 2019
//////////////////////////////////////////////////////////////
// What Can Be Done With CyanGate Demo Task?
// Click on image to start preparation of beverage's countdown
// Wait for countdown
// Cannot click on the same image before time is up
// See when it's prepared
// See history
// Add new beverages as hot chocolate, cappuccino, herbal tea.
// Delete beverages except tea and coffee 
//////////////////////////////////////////////////////////////

// Beverages' preparation times
const teaSec = 5;
const coffeeSec = 10;
const hotChocolateSec = 15;
const cappuccinoSec = 10;
const herbalTeaSec = 7;

let todayTime;
//Arrays for beverages' times
let arrayTea = new Array();
let arrayCoffee = new Array();
let arrayHotChocolate = new Array();
let arrayCappuccino = new Array();
let arrayHerbalTea = new Array();

//Once a second, it checks that time is 00:00?
let dayControl = setInterval(function () {
    todayTime = new Date();
    var timeNow = todayTime.getHours() + ":" + todayTime.getMinutes();
    
    if (timeNow == "00:00") { //if time is 00:00 then clear all arrays and list of histories
        arrayTea = new Array();
        arrayCoffee = new Array();
        arrayHotChocolate = new Array();
        arrayCappuccino = new Array();
        arrayHerbalTea = new Array();
      
        document.getElementById("lstTeaHistory").innerHTML = "";
        document.getElementById("lstCoffeeHistory").innerHTML = "";
        document.getElementById("lstHotChocolateHistory").innerHTML = "";
        document.getElementById("lstCappuccinoHistory").innerHTML = "";
        document.getElementById("lstHerbalTeaHistory").innerHTML = "";
    }
}, 1000)

//After clicking an image, function starts working
function decrementTimer(name) {
    disableButton(name); //this function doesnt allow to click on image, when countdown is started
    var prepareSec, constSec, arrayBeverage;
    //  countdownsec for preparation, constant beverage seconds, array of beverage
    if (name == "Tea") {
        prepareSec = teaSec;
        constSec = teaSec;
        arrayBeverage = arrayTea;
    } else if (name == "Coffee") {
        prepareSec = coffeeSec;
        constSec = coffeeSec;
        arrayBeverage = arrayCoffee;
    } else if (name == "HotChocolate") {
        prepareSec = hotChocolateSec;
        constSec = hotChocolateSec;
        arrayBeverage = arrayHotChocolate;
    } else if (name == "Cappuccino") {
        prepareSec = cappuccinoSec;
        constSec = cappuccinoSec;
        arrayBeverage = arrayCappuccino;
    } else if (name == "HerbalTea") {
        prepareSec = herbalTeaSec;
        constSec = herbalTeaSec;
        arrayBeverage = arrayHerbalTea;
    }

    useSetInterval(prepareSec, name, constSec, arrayBeverage);
}

// Countdown for beverages
function useSetInterval(prepareSec, name, constSec, arrayBeverage) {  
    var beverage = setInterval(function () {
        if (prepareSec == 0) { //when time is up
            clearTimeout(beverage); //stop interval
            prepareSec = constSec; //countdownsec equals const sec again
            document.getElementById("timer" + name).innerHTML = constSec + ' seconds'; //write preparation seconds again
            addTimeToHistory(arrayBeverage, "lst" + name + "History"); // adding time to list of history for beverage 
            enableButton(name); //when time is up, we can click to image again
        } else {
            prepareSec--; //countdown
            document.getElementById("timer" + name).innerHTML = prepareSec + ' seconds'; //showing the countdown
        }
    }, 1000);
}

//dont allow to click
function disableButton(name) { 
    document.getElementById("img" + name).disabled = true;
}

//allow to click
function enableButton(name) { 
    document.getElementById("img" + name).disabled = false;
}

// showing times in list
function addTimeToHistory(arr, lstHistory) {  
    todayTime = new Date();
    var timeNow = todayTime.getHours() + ":" + todayTime.getMinutes(); //get hours and minutes
    var newRow = "<li class='list-group-item'>" + timeNow + "</li>"; //html new item of list 
    var lstTimeHistory = document.getElementById(lstHistory);
    arr.push(timeNow); //adding time to array of beverage
    lstTimeHistory.innerHTML += newRow; //adds new item of list to html
    var itemsCount = lstTimeHistory.getElementsByTagName("li").length; //get count of items of beverage

    if (arr.length !== 1) { //if there is previous data
        var prevData, prevDataHtml, newData;
        var prevIndex = itemsCount - 2; //index of previous item 
        prevDataHtml = lstTimeHistory.getElementsByTagName("li").item(prevIndex); //get previous item of list by index
        prevData = prevDataHtml.innerHTML; //get prev item's value 
        newData = prevData.strike(); //strike it
        prevDataHtml.innerHTML = newData; //new previous item is striked
    }
}

//after selection of new beverage, this works
function addNewBeverage(name) { 
    document.getElementById("div" + name).style.display = "block"; // show selected beverage on main page
    $('#newModal').modal('hide'); //close modal which has beverages
    $("#btn" + name).attr("disabled", "disabled"); // dont allow to select the same beverage again because it is selected.
    var historyDivId = name.charAt(0).toLowerCase() + name.substring(1); // convert to lower case fist letter of beverage's name
    document.getElementById(historyDivId + "History").style.display = "block"; // show selected beverage's list of history
}

// after clicking delete button below the image, it works
function deleteBeverage(name) { 
    document.getElementById("div" + name).style.display = "none"; //dont show deleted beverage
    $("#btn" + name).removeAttr("disabled"); // allow to aselect the beverage on modal
    var historyDivId = name.charAt(0).toLowerCase() + name.substring(1); // convert to lower case fist letter of beverage's name
    document.getElementById(historyDivId + "History").style.display = "none";// dont show deleted beverage's list of history
}
