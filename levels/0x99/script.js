/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:43:24
\*----------------------------------------*/

AppManager.ready(function(){
	InteractionHelper.onHide(cacheFenetre);
});

function cacheFenetre(event){
	document.getElementById("objet1").classList.add("hide");
	InteractionHelper.onHide(victoire);
}

function victoire(event){
	//console.log(event);
	AppManager.levelComplete();
}