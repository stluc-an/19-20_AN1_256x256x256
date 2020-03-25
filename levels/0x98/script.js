/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:42:04
\*----------------------------------------*/

AppManager.ready(function(){
	InteractionHelper.onHide( eventHandler);
});

function eventHandler(event){
	InteractionHelper.onKeyDown(Touche);
	console.log(event);
	
}

function Touche(event){
	console.log(event);
	AppManager.levelComplete();
}