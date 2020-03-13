/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-28 15:49:33
\*----------------------------------------*/

AppManager.ready(function(){
	InteractionHelper.onTimeout(4000,  eventHandler);
});

function eventHandler(event){
	console.log(event);
	AppManager.levelComplete();
}