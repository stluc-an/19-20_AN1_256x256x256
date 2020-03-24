/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:43:17
\*----------------------------------------*/

AppManager.ready(function(){

//document.querySelector("#hello").classList;

	InteractionHelper.onTimeout(2000,  eventHandler);
});

function eventHandler(event){
	document.querySelector("#hello").classList.add("hide");
	document.querySelector("#hay").classList.remove("hide");
	InteractionHelper.onTimeout(2000,  eventHandler2);

	console.log(event);
}

function eventHandler2(event){
	document.querySelector("#hay").classList.add("hide");
	document.querySelector("#smiley").classList.remove("hide");

	console.log(event);

AppManager.levelComplete();
}
