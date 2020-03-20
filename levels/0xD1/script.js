/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:43:02
\*----------------------------------------*/

AppManager.ready(function(){
	InteractionHelper.onScroll("#scroll", scroll);
});

function scroll(event){
	//console.log(event);
	//AppManager.levelComplete();
    document.querySelector("#scroll").classList.add("hide");
    document.querySelector(".button").classList.add("block");
    InteractionHelper.onDoubleTap(".button", end);
}

function end(event){
	//console.log(event);
	AppManager.levelComplete();
}