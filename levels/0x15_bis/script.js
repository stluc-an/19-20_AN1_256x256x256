/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:40:30
\*----------------------------------------*/

AppManager.ready(function(){
	InteractionHelper.onDoubleTap("div", eventHandler);
});

function eventHandler(event){
	document.querySelector("#lapin").classList.add("hide");
	document.querySelector("#vaso").classList.remove("hide");
	console.log(event);

	InteractionHelper.onMouseEnter("#vaso", eventHandler2);
}

function eventHandler2(event){
	console.log(event);
	AppManager.levelComplete();
}