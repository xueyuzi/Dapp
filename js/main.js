


function addVote(text){
	// defaultOptions.listener = addVoteCallback;
	nebPay.call(config.contractAddr,"0",config.addContract,'["'+text+'"]',defaultOptions);//to, value, func, args, options
}
$("#btn").on("click",function(){
    console.log("addVote")
    addVote($("#text").val())
})