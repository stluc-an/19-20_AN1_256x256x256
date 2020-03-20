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
	console.log(event);
	if(event.keyCode == 68){
		document.getElementById('image').setAttribute("src", "scroller.jpg");
		InteractionHelper.onScroll("html", eventEnter);
}
}

function eventEnter(event){
	console.log(event);
	AppManager.levelComplete();
}
