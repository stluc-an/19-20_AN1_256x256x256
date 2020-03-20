/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:41:16
\*----------------------------------------*/

AppManager.ready(function(){
	InteractionHelper.onDoubleTap("#image", eventHandler);
});

function eventHandler(event){
	console.log(event);
	document.getElementById('image').setAttribute("src", "positionnerSouris.jpg");
	document.getElementById('image').setAttribute("usemap", "#laSouris");
	InteractionHelper.onMouseEnter("#zoneEntrer", eventEnter);
}

function eventEnter(event){
	console.log(event);
	AppManager.levelComplete();
}
