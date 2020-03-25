/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:40:20
\*----------------------------------------*/

AppManager.ready(function(){
	InteractionHelper.onTap("#punch", eventHandler);
});

function eventHandler(event){
	console.log(event);
	document.getElementById('matt').classList.add('mattB');
	InteractionHelper.onDoubleTap("#punch", DTHandler);

}


function DTHandler(event){
	document.getElementById('matt').classList.add('mattC');
	setTimeout ( AppManager.levelComplete, 500);

}