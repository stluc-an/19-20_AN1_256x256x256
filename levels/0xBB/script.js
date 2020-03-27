/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:42:31
\*----------------------------------------*/

AppManager.ready(function(){
	InteractionHelper.onWindowResize(eventHandler);
});

function eventHandler(event){
	console.log(event);
	document.querySelector("#grandir").classList.add("hide");
	document.querySelector("#rapetisser").classList.remove("hide");
	console.log(event);
InteractionHelper.onWindowResize(eventHandlerer);
}

function eventHandlerer(event){
	document.querySelector("#rapetisser").classList.add("hide");
	document.querySelector("#ragrandir").classList.remove("hide");
	console.log(event);
	AppManager.levelComplete();
}
