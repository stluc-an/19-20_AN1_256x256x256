/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:41:16
\*----------------------------------------*/

AppManager.ready(function(){
	InteractionHelper.onMouseEnter("#boite", eventHandler);
});

function eventHandler(event){
	InteractionHelper.onTap("#boite", WhenIPressRond);
	console.log(event);
	

	
}

function WhenIPressRond(event){

AppManager.levelComplete();}