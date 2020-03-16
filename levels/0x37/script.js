/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:40:20
\*----------------------------------------*/

AppManager.ready(function(){
	InteractionHelper.onDrag("img", eventHandler);
});

function eventHandler(event){
	console.log(event);
	document.getElementById('slider').classList.add('slidB');
	document.getElementById('imessage').classList.add('imessB');
	document.getElementById('form').classList.remove('hide');
	InteractionHelper.onKeyUp(KUHandler);
	document.getElementById("text").focus();

}

function KUHandler(event){

	AppManager.levelComplete();
}