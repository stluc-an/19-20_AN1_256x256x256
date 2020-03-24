/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:43:17
\*----------------------------------------*/

AppManager.ready(function(){
	InteractionHelper.onTimeout(3000,  eventHandler);
});

function eventHandler(event){
	document.querySelector("#montre").classList.add("hide");
	document.querySelector("#interrupteur").classList.remove("hide");
	InteractionHelper.onKeyUp(tapededans);
	console.log(event);
}
 function tapededans(event){
 	document.querySelector("#interrupteur").classList.add("hide");
 	console.log(event);
	AppManager.levelComplete();
 }