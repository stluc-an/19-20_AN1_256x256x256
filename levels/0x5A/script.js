/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:40:50
\*----------------------------------------*/

AppManager.ready(function(){
	InteractionHelper.onMouseEnter("#zoneEntrer", eventHandler);
});

function eventHandler(event){
	console.log(event);
	document.getElementById('image').setAttribute("src", "internet.png");
	document.getElementById('image').setAttribute("height", "auto");
	document.getElementById('image').style.marginTop="224px"
	document.getElementById('image').removeAttribute("usemap");
	InteractionHelper.onShow(eventShow);
}

function eventShow(event){
	console.log(event);
	AppManager.levelComplete();
}
