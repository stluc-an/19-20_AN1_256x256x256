/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:40:20
\*----------------------------------------*/

AppManager.ready(function(){
	InteractionHelper.onShow(eventHandler);
});

function eventHandler(event){
	console.log(event);
	document.getElementById('image').setAttribute("src", "relacherN.png");
	document.getElementById('image').style.marginTop = "0px";
	InteractionHelper.onKeyUp(eventUnpressed);
}

function eventUnpressed(event){
	console.log(event);
	if(event.keyCode == 78){
		AppManager.levelComplete();
	}
}
