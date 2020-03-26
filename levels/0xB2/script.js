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
	document.querySelector("#monImage1").classList.add("hide");
	document.querySelector("#monImage2").classList.remove("hide");
	
	InteractionHelper.onLongTap("#monImage2", eventHandler2);
	}

function eventHandler2(event){
	console.log(event);
	document.querySelector("#monImage2").classList.add("hide");
	AppManager.levelComplete();}

