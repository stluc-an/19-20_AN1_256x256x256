
/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:43:02
\*----------------------------------------*/
//var position_de_scroll = 0;

//var anime = new scroll;

AppManager.ready(function(event){
	InteractionHelper.onScroll("#rocket",eventHandler);
});

function eventHandler(event){
	document.querySelector("#rocket").classList.add("animate");
	document.querySelector("#diesel").classList.remove("hide");
	InteractionHelper.onDrag("#diesel", eventdrag);
}

function eventdrag(event){
	event.mouseX = event.mouseX - ((window.innerHeight/2)-(265/2));
	event.mouseY = event.mouseY - ((window.innerHeight/2)-(265/2));

	document.querySelector("#diesel").style.left = event.mouseX+"px";
	document.querySelector("#diesel").style.top = event.mouseY+"px";

	document.querySelector("#rocket").classList.add("ranimate")

	
AppManager.levelComplete();
}

	//console.log(event);
	

//window.addEventListener('scroll', function(e) {
//	position_de_scroll = window.scrollY;
//
//	if (!ticking) {
//		window.requestAnimationFrame(function() {
//			eventHandler( position_de_scroll);
//			ticking = false;
//		});
//	}
//
//	ticking = true;
//});