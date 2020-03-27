/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:40:40
\*----------------------------------------*/

AppManager.ready(function(){
	InteractionHelper.onLongTap("div", eventHandler);
});

function eventHandler(event){
    document.getElementById("img1").classList.add("hide");
    document.getElementById("img2").classList.remove("hide");
	console.log(event);
	
    InteractionHelper.onHide( eventHandler2);
}

function eventHandler2(event){
    document.querySelector("#img2").classList.add("hide");
    document.querySelector("#img3").classList.remove("hide");
	console.log(event);
	AppManager.levelComplete();
}