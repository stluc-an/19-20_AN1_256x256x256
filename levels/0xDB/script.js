/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:43:02
\*----------------------------------------*/

AppManager.ready(function(){
	InteractionHelper.onScroll("#monImage1", eventHandler);
});

function eventHandler(event){
	console.log(event);
	document.querySelector("#monImage1").classList.add("hide");
	document.querySelector("#monImage2").classList.remove("hide");

	AppManager.levelComplete();

	InteractionHelper.onWindowResize(eventHandler2);
	}

function eventHandler2(event){

	console.log(event);
	document.querySelector("#monImage2").classList.add("hide");
}

