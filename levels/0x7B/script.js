/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:41:40
\*----------------------------------------*/

AppManager.ready(function(){
	InteractionHelper.onKeyUp(eventHandler);
});

function eventHandler(event){
	document.querySelector("#piano").classList.add("hide");
	console.log(event);
	InteractionHelper.onWindowResize(hideWhenResize );
}
function hideWhenResize(event){
	AppManager.levelComplete();
}
