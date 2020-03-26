/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:40:40
\*----------------------------------------*/

AppManager.ready(function(){
	InteractionHelper.onTimeout(2000, eventHandler);
});

function eventHandler(event){
	console.log(event);
	document.getElementById('image').setAttribute("src", "presserA.png");
	InteractionHelper.onKeyDown(eventPressed);
}

function eventPressed(event){
	console.log(event);
	if(event.keyCode == 65){
		AppManager.levelComplete();
	}
}
