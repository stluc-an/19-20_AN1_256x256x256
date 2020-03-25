/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:40:20
\*----------------------------------------*/

AppManager.ready(function(){
	InteractionHelper.onDoubleTap("#GTA", eventHandler);
});

function eventHandler(event){
	document.getElementById('GTA').classList.remove('show');
	document.getElementById('RICK').classList.remove('hide');
	document.getElementById('GTA').classList.add('hide');
	document.getElementById('RICK').classList.add('show');
	console.log(event);
	InteractionHelper.onScroll("#RICK", scrollHandler);

}

function scrollHandler(event){


	setTimeout ( AppManager.levelComplete, 1700);
}