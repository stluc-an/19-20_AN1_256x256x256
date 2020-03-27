/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:41:27
\*----------------------------------------*/

AppManager.ready(function(){
	InteractionHelper.onMouseLeave("#objet", sourisSort);
});

function sourisSort(event){
	//console.log("sourisSort");
	document.getElementById("objet").classList.add("hide");
	InteractionHelper.onHide(victoire);
}

function victoire(event){
	//console.log(event);
	AppManager.levelComplete();
}