/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:42:49
\*----------------------------------------*/

AppManager.ready(function(){
	InteractionHelper.onBeforePrint( print);
	document.querySelector(".hand").classList.add("hide");
	document.querySelector("#yeah").classList.add("hide");
});

function print(event){
	console.log(event);
	//AppManager.levelComplete();
	document.querySelector(".hand").classList.remove("hide");
	document.querySelector("#yeah").classList.remove("hide");

	InteractionHelper.onDoubleTap(".hand", click);
}

function click(event){
	console.log(event);
	AppManager.levelComplete();
}