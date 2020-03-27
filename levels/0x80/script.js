/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:41:53
\*----------------------------------------*/

AppManager.ready(function(){
	InteractionHelper.onKeyDown(eventHandler);
});

function eventHandler(event){
	document.querySelector("#bouton").classList.add("hide");
	document.querySelector("#coeur").classList.remove("hide");
	console.log(event);


InteractionHelper.onTap("div", windowResize);
	
}

function windowResize(event){
	document.querySelector("#coeur").classList.add("hide");



console.log(event);
AppManager.levelComplete();
}	
