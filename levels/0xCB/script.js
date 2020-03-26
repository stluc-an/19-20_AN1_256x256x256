/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:41:27
\*----------------------------------------*/

AppManager.ready(function(){
	InteractionHelper.onBeforePrint(eventHandler);
});

function eventHandler(event){
	console.log(event);
	document.getElementById('image').setAttribute("src", "resize.png");
	document.getElementById('image').setAttribute("width", "256px");
	document.getElementById('image').setAttribute("height", "256px");
	InteractionHelper.onWindowResize(eventEnter);
}

function eventEnter(event){
	console.log(event);
	AppManager.levelComplete();
}
