/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:41:16
\*--:--------------------------------------*/

AppManager.ready(function(){
	document.querySelector("#monImage1").classList.remove("hide");
	InteractionHelper.onMouseLeave("#monImage1", actionWhenLeaveImage1);
});

function actionWhenLeaveImage1(event){
	console.log(event);
	document.querySelector("#monImage1").classList.add("hide");
	document.querySelector("#monImage2").classList.remove("hide");
	InteractionHelper.onMouseEnter("#monImage2", actionWhenEnterImage2);
}

function actionWhenEnterImage2(event){
	console.log(event);
	AppManager.levelComplete();
}