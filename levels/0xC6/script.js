/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:42:49
\*----------------------------------------*/

AppManager.ready(function(){
	InteractionHelper.onBeforePrint( eventHandler);
});

function eventHandler(event){
	console.log(event);
	AppManager.levelComplete();
}