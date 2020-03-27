/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:40:50
\*----------------------------------------*/

AppManager.ready(function(){
	InteractionHelper.onDoubleTap(".objet", eventHandler);
});

function eventHandler(event){
	//console.log(event);
	event.target.classList.add("hide");
	InteractionHelper.onLongTap(".objet2", victoire);
}

function victoire(event){
	//console.log(event);
	AppManager.levelComplete();
}