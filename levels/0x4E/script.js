/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:41:04
\*----------------------------------------*/

AppManager.ready(function(){
	InteractionHelper.onDropFile("#boite", eventHandler);
});

function eventHandler(event){
	InteractionHelper.onTimeout(4000,  time);

	console.log(event);
	
}



function time(event){
	console.log(event);
	AppManager.levelComplete();
}