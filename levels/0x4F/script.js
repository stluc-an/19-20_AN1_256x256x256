/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:41:16
\*--:--------------------------------------*/

AppManager.ready(function(){
	document.querySelector("#monImage1").classList.remove("hide");
	InteractionHelper.onDropFile("#monImage1", actionWhenDropFile);
});

function actionWhenDropFile(event){
	console.log(event);
	document.querySelector("#monImage1").classList.add("hide");
	document.querySelector("#monImage2").classList.remove("hide");
	InteractionHelper.onSound(actionWhenSounded);
	}

function actionWhenSounded(event){
	console.log(event);
	if(event.intensity>30){
		document.querySelector("#monImage2").classList.add("hide");
		document.querySelector("#monImage3").classList.remove("hide");
		setTimeout( AppManager.levelComplete , 1000 );
	}
}
AppManager.levelComplete();





