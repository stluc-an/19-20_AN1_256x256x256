/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:40:30
\*----------------------------------------*/

AppManager.ready(function(){
	InteractionHelper.onDoubleTap("#boite", eventHandler);
});

function eventHandler(event){
	document.querySelector("#boite").classList.add("hide");
	document.querySelector("#rond").classList.remove("hide");
	InteractionHelper.onTap("#rond", WhenIPressRond);
	console.log(event);
	
}

function WhenIPressRond(event){

AppManager.levelComplete();}