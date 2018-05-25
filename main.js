"use strict";
var txhash = "3238180c0e3b5816045a0482ad2172ad9035483d192a6361d047a163ffec0e5e"
var dappContactAddress = "n1iWyAsEMKEdLSXcDZsfKo5nx8nHbG9uMDj";
var myAddress = "n1PGFcWaXAR3R1uPR38TsXBDR6Eds6TtBpv"
var Neb = require("nebulas").Neb;
var neb = new Neb();
var HttpRequest = require("nebulas").HttpRequest;
neb.setRequest(new HttpRequest("https://testnet.nebulas.io"))

// var NebPay = require("nebpay");
// var nebPay = new NebPay();
var serialNumber;

$("#search").click(function(){
    if(!$("#search_title").val()){
        alert("不能为空");
        return;
    }
    $("#content").text("");
    var from = dappContactAddress;
    var value = "0";
    var nonce = 0;
    var gas_price = "1000000";
    var gas_limit = "200000";
    var callFunction = "get";
    var callArgs='["'+$("#search_title").val()+'"]';
    console.log(callArgs);
    var contract = {
        "function":callFunction,
        "args":callArgs
    }
    neb.api.call(myAddress,dappContactAddress,value,nonce,gas_price,gas_limit,contract).then(function(resp){
        var result = resp.result;
        if(result === "null"){
            $("#content").text("沒有发现该标题公开信，你可以写一张");
            $("#title").text("");
            $("#author").text("");
            return;
        }
        console.log(result);
        result = JSON.parse(result);
        $("#title").text(result.title);
        $("#content").text("正文： "+result.content);
        $("#author").text("作者： "+result.author);
    }).catch(function(err){
        console.log("error: "+err.message);
    })
})
