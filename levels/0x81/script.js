/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:41:16
\*--:--------------------------------------*/

AppManager.ready(function(){
	document.querySelector("#monImage1").classList.remove("hide");
	InteractionHelper.onKeyDown(actionWhenKey5Down);
});

function actionWhenKey5Down(event){
	console.log(event);
	if(event.key == "5"){
		document.querySelector("#monImage1").classList.add("hide");
		document.querySelector("#monImage2").classList.remove("hide");
		InteractionHelper.onDoubleTap("#monImage2", actionWhenDoubleTapped);
	}
}
function actionWhenDoubleTapped(event){
	//console.log(event);
	document.querySelector("#monImage2").classList.add("hide");
	document.querySelector("#monImage3").classList.remove("hide");
	setTimeout( AppManager.levelComplete , 1000 );
}