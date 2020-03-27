/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:40:40
\*----------------------------------------*/

AppManager.ready(function(){
	InteractionHelper.onShow(fenetreOuverte);
});

function fenetreOuverte(event){
	document.getElementById("obj").classList.add("hide");
	//console.log(event);
	InteractionHelper.onTap(".trigger", victoire);
}

function victoire(event){
	//console.log(event);
	AppManager.levelComplete();
}