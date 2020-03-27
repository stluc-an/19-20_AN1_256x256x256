/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:41:40
\*----------------------------------------*/

AppManager.ready(function(){
	InteractionHelper.onShow(eventHandler);
});
function eventHandler(event){
	//console.log(event);
	document.getElementById("objet").classList.add("hide");
	InteractionHelper.onTimeout(5555, victoire);
}
function victoire(event){
	//console.log(event);
	AppManager.levelComplete();
}