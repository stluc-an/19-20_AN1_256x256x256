AppManager.ready(function(){
	InteractionHelper.onMouseLeave("#monImage1", actionWhenMouseLeaveImage1);
});

function actionWhenMouseLeaveImage1(event){
	console.log(event);
	//AppManager.levelComplete();
    
    document.querySelector("#monImage1").classList.add("hide");
    document.querySelector("#monImage2").classList.remove("hide");
    InteractionHelper.onMouseLeave("#monImage2", actionWhenMouseLeaveImage2);
}

function actionWhenMouseLeaveImage2(event){
    //console.log(event);
    AppManager.levelComplete();
}
