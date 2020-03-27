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
	if("s"==event.key){
	document.getElementById("roses").classList.add("hide");
	//console.log(event); 
	InteractionHelper.onDropFile("#file", victoire);
	}
}
function victoire(event){
	//console.log(event);
	AppManager.levelComplete();
}	

