/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-28 16:00:00
\*----------------------------------------*/

AppManager.ready(function(){
	InteractionHelper.onDropFile("div", eventHandler);
});

function eventHandler(event){
	if(event.type=="drop"){
		AppManager.levelComplete();	
	}
}