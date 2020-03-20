AppManager.ready(function(){
	InteractionHelper.onHide( eventHandler);
});

function eventHandler(event){
	console.log(event);
    
    document.querySelector("#monImage1").classList.add("hide");
    document.querySelector("#monImage2").classList.remove("hide");
    InteractionHelper.onMouseEnter("#monImage2", actionWhenEnterImage2);
    
}

function actionWhenEnterImage2(event){
	//console.log(event);
	//AppManager.levelComplete();
    
    AppManager.levelComplete();
}