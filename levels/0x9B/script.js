AppManager.ready(function(){
	InteractionHelper.onHide( eventHandler);
});

function eventHandler(event){
	console.log(event);
    
    document.querySelector("#monImage1").classList.add("hide");
    document.querySelector("#monImage2").classList.remove("hide");
    InteractionHelper.onWindowResize( windowResize);
}

function windowResize(event){
	console.log(event);
	AppManager.levelComplete();
}