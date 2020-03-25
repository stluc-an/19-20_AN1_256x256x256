/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:42:31
\*----------------------------------------*/

AppManager.ready(function(){
	InteractionHelper.onWindowResize( eventHandler);
});

function eventHandler(event){

InteractionHelper.onScroll("#rond", Scroll);
	console.log(event);
	
}

function Scroll(event){
	console.log(event);
	AppManager.levelComplete();
}