/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:40:30
\*----------------------------------------*/

AppManager.ready(function(){
	InteractionHelper.onDoubleTap("#tap", eventHandler);
});

function eventHandler(event){
	carre = document.querySelector("#LongTap")
	carre.classList.remove("hide")
	rond= document.querySelector("#tap")
	rond.classList.add("hide")

	InteractionHelper.onLongTap("#LongTap", done);
	
	}

function done(event){
	carre = document.querySelector("#corps")
	carre.classList.add(".rouge")

	setTimeout(theEnd, 1000);
	
	}

function theEnd(){
	AppManager.levelComplete();

}
