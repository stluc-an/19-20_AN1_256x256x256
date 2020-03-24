/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:41:16
\*----------------------------------------*/

AppManager.ready(function(){
	InteractionHelper.onMouseEnter("#carte", ouvrir);
});

function ouvrir(event){
	console.log("sisi");
	//AppManager.levelComplete();
    document.querySelector("#carte").classList.add("hide");
    document.querySelector("#carteop").classList.remove("hide");
    document.querySelector("#print").classList.remove("hide");
    InteractionHelper.onBeforePrint( end);
}

function end(event){
	//console.log(event);
	AppManager.levelComplete();
}