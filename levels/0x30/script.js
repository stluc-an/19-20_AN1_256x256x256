/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:40:20
\*----------------------------------------*/

AppManager.ready(function(){
	InteractionHelper.onDrag("#cd", eventHandler);
});

function eventHandler(event){
	console.log(event);
	document.getElementById('cd').classList.add('cd2');
	InteractionHelper.onTap('#button', TapHandler);


}

function TapHandler(event){

	AppManager.levelComplete();
}