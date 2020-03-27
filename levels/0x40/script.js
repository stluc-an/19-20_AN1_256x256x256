/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:41:04
\*----------------------------------------*/

AppManager.ready(function(){
	InteractionHelper.onDropFile("#tiroir", eventHandler);
});

function eventHandler(event){
	if(event.type=="drop"){
		document.querySelector("#doc").classList.remove("hide");
		console.log(event);
		InteractionHelper.onTap("#doc", winWhenTap);
	}
}

function winWhenTap(event){
	AppManager.levelComplete();
}

