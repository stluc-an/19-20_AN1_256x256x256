/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:40:40
\*----------------------------------------*/

AppManager.ready(function(){
	InteractionHelper.onLongTap("#pompe", eventHandler);
});

function eventHandler(event){
	document.querySelector("#pompe").classList.add("hide");
	document.querySelector("#imprime").classList.remove("hide");
	InteractionHelper.onBeforePrint(kaboom)

	console.log(event);
}
function kaboom(event){
	console.log(event);
	AppManager.levelComplete();
}

