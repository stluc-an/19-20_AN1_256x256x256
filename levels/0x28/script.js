AppManager.ready(function(){
	InteractionHelper.onLongTap("monImage1",actionWhenLongTap);
});

function actionWhenLongTap(event){
	console.log(event);
    
	document.querySelector("#monImage1").classList.add("hide");
    document.querySelector("#monImage2").classList.remove("hide");
    InteractionHelper.onKeyDown(actionWhenKeyDown);
}

function actionWhenKeyDown(event){
	console.log(event);
	AppManager.levelComplete();
}