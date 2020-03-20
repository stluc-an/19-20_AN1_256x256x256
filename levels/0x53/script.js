/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:40:30
\*----------------------------------------*/
AppManager.ready(function(){
	InteractionHelper.onMouseEnter(".monboutton", sourisEntre);
});

/*function eventHandler(event){
	console.log(event);
	AppManager.levelComplete();
}
*/

function sourisEntre(event){
	InteractionHelper.onDrag(".monboutton", sourisDrag);
}

function sourisDrag(event){

		event.mouseX = event.mouseX - ((window.innerWidth/2)-(265/2));
		event.mouseY = event.mouseY - ((window.innerHeight/2)-(265/2));

		document.querySelector(".monboutton").style.left = event.mouseX+"px";
		document.querySelector(".monboutton").style.top = event.mouseY+"px";

		AppManager.levelComplete();
}