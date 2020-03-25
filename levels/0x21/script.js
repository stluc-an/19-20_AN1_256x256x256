/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:40:20
\*----------------------------------------*/

AppManager.ready(function(){
	InteractionHelper.onLongTap("body", eventHandler);
});

function eventHandler(event){
	console.log(event);
	document.getElementById('balloon').classList.add('ballooned');
	/*document.getElementById('balloon').classList.remove('balloon');*/
	document.getElementById('pina').classList.add('pinata');
	InteractionHelper.onDoubleTap("body", DTAPHandler);

}


function DTAPHandler(event){
	document.getElementById('pina').classList.add('pinataDEAD');
	document.getElementById('pinaDEAD').classList.add('show');
	AppManager.levelComplete();

}