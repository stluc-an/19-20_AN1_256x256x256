AppManager.ready(function(){
	InteractionHelper.onMouseLeave("#monImage1", actionWhenMouseLeaveImage1);
});

function actionWhenMouseLeaveImage1(event){
	console.log(event);
	//AppManager.levelComplete();
    
    document.querySelector("#monImage1").classList.add("hide");
    document.querySelector("#monImage2").classList.remove("hide");
    InteractionHelper.onLongTap("#monImage2",actionWhenLongTap);
}

function actionWhenLongTap(event){
	console.log(event);
    
    document.querySelector("#monImage2").classList.add("hide");
    document.querySelector("#monImage3").classList.remove("hide");
    
    AppManager.levelComplete();
}