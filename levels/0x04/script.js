/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:40:20
\*----------------------------------------*/

AppManager.ready(function(){
	InteractionHelper.onTap(".button", buttonPressed);
	document.querySelector(".hand").classList.add("hide");
});

function buttonPressed(event){
	//console.log(event);
	document.querySelector("#vitre").classList.add("hide");
	document.querySelector("#papiers").classList.remove("hide");
	document.querySelector(".hand").classList.remove("hide");
	document.querySelector(".button").classList.add("hide");

	InteractionHelper.onDropFile(".hand", dropFile);
	
}

function dropFile (event){
	console.log(event);
	AppManager.levelComplete();
}