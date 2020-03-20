/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:41:40
\*----------------------------------------*/

AppManager.ready(function(){
	InteractionHelper.onKeyUp(eventHandler);
});

function eventHandler(event){
	console.log(event);
	if(event.key == "r"){
	document.querySelector("#monImage1").classList.add("hide");
	document.querySelector("#monImage2").classList.remove("hide");
	}
	InteractionHelper.onTimeout("#monImage1", eventHandler2);
	}

function eventHandler2(event){
	console.log(event);
	document.querySelector("#monImage2").classList.remove("hide");
	setTimeout( AppManager.levelComplete, 1000);
}



