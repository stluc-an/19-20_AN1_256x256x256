/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:41:16
\*--:--------------------------------------*/

AppManager.ready(function(){
	document.querySelector("#monImage1").classList.remove("hide");
	InteractionHelper.onLongTap("#monImage1",actionWhenLongTap);
});

function actionWhenLongTap(event){
	console.log(event);
	document.querySelector("#monImage1").classList.add("hide");
	document.querySelector("#monImage4").classList.remove("hide");
	document.querySelector("#monImage3").classList.remove("hide");
	InteractionHelper.onDrag("#monImage4", actionWhenDragImage4);
}

function actionWhenDragImage4(event){
	console.log(event);
	event.mouseX = event.mouseX - (window.innerWidth / 2) + 256 /2;
	event.mouseY = event.mouseY - (window.innerHeight / 2) + 256 /2;

	document.querySelector("#monImage4").style.left= event.mouseX+"px";
	document.querySelector("#monImage4").style.top= event.mouseY+"px";
	setTimeout( AppManager.levelComplete , 3000 );
	}