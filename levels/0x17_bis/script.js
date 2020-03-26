/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:41:04
\*----------------------------------------*/

AppManager.ready(function(){
	InteractionHelper.onDoubleTap("#image", eventHandler);
});

function eventHandler(event){
	console.log(event);
	document.getElementById('image').setAttribute("src", "relacherB.jpg");
	InteractionHelper.onKeyUp(eventUnpressed);
}

function eventUnpressed(event){
	console.log(event);
	if(event.keyCode == 66){
		AppManager.levelComplete();
	}
}
