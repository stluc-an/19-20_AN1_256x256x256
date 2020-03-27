/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:43:17
\*----------------------------------------*/

AppManager.ready(function(){
	InteractionHelper.onTap("#unkm",  eventHandler);
});

function eventHandler(event){
	document.querySelector("#unkm").classList.add("hide");
	document.querySelector("#deuxkm").classList.remove("hide");
InteractionHelper.onDoubleTap("#deuxkm",  banana);

}

function banana(event){
	document.querySelector("#deuxkm").classList.add("hide");
    console.log(event);
	AppManager.levelComplete(); 

}
