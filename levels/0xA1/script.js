AppManager.ready(function(){
	InteractionHelper.onShow(actionWhenShow);
});

function actionWhenShow(event){
	console.log(event);
    document.querySelector("#monImage1").classList.add("hide");
    document.querySelector("#monImage2").classList.remove("hide");
	InteractionHelper.onDoubleTap("#monImage2", actionWhenDoubleTap);
}

function actionWhenDoubleTap(event){
	console.log(event);
	AppManager.levelComplete();
}