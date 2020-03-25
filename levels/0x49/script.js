/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:41:16
\*--:--------------------------------------*/

AppManager.ready(function(){
	InteractionHelper.onDropFile("#monImage1", actionWhenDropFile);
});

function actionWhenDropFile(event){
	console.log(event);
	document.querySelector("#monImage2").classList.remove("hide");
	InteractionHelper.onShow(action_hide);
}

function action_hide(event){
	console.log(event);
	document.querySelector("#monImage1").classList.add("hide");
	document.querySelector("#monImage2").classList.remove("hide");
	
}
AppManager.levelComplete();