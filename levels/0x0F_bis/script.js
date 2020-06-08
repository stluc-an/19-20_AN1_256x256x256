AppManager.ready(function(){
	InteractionHelper.onTap("#monImage1", actionOnTap);
});

function actionOnTap(event){
	console.log(event);
    
    document.querySelector("#monImage1").classList.add("hide");
    document.querySelector("#monImage2").classList.remove("hide");
    InteractionHelper.onSound(actionOnSound);
}

function actionOnSound(event){
  console.log(event.intensity);
  if(event.intensity > 30.00){
    AppManager.levelComplete();
  }
}