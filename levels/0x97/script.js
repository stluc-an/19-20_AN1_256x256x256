/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:42:04
\*----------------------------------------*/

AppManager.ready(function(){
	InteractionHelper.onHide(fermeFenetre);
});

function fermeFenetre(event){
	document.getElementById("objet").classList.add("hide");
	InteractionHelper.onKeyUp(victoire);
}
function victoire(event){
	//console.log(event);
	if("u"==event.key){
	AppManager.levelComplete();
	}
}