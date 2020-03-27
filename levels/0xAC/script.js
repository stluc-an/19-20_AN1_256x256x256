/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:42:16
\*----------------------------------------*/

AppManager.ready(function(){
	InteractionHelper.onShow(fenetreOuverte);
});

function fenetreOuverte(event){
	//console.log(event);
	document.getElementById("obj").classList.add("hide");
	InteractionHelper.onBeforePrint(victoire);
}	

function victoire(event){
	//console.log(event);
	AppManager.levelComplete();
}