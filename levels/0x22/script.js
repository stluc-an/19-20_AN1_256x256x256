/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:41:16
\*--:--------------------------------------*/

AppManager.ready(function(){
	document.querySelector("#monImage1").classList.remove("hide");
	InteractionHelper.onLongTap("#monImage1", actionWhenLongTap);
});

function actionWhenLongTap(event){
	console.log(event);
	document.querySelector("#monImage1").classList.add("hide");
	document.querySelector("#monImage2").classList.remove("hide");
	InteractionHelper.onLongTap("#monImage2", actionWhenSecondLongTap);
	}

function actionWhenSecondLongTap(event){
	console.log(event);
	document.querySelector("#monImage2").classList.add("hide");
	document.querySelector("#monImage3").classList.remove("hide");
	setTimeout( AppManager.levelComplete , 2000 );
}