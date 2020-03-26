/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:40:30
\*----------------------------------------*/

AppManager.ready(function(){
	InteractionHelper.onTap("#image", eventHandler);
});

function eventHandler(event){
	console.log(event);
	document.getElementById('image').setAttribute("src", "hide.png");
	document.getElementById('image').setAttribute("height", "50px");
	InteractionHelper.onHide(eventClosed);
}

function eventClosed(event){
	console.log(event);
	AppManager.levelComplete();
}
