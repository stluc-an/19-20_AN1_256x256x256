/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:40:30
\*----------------------------------------*/

let isPieceInPlace = false;


AppManager.ready(function(){
	InteractionHelper.onDoubleTap(".viny2", actionToDrag);
});

function actionToDrag(event){

	first = document.querySelector(".viny2");
	first.classList.add("hide");

	first = document.querySelector(".viny1");
	first.classList.remove("hide");

	InteractionHelper.onDrag(".viny1",whenDragSquare);

	}

function whenDragSquare(event){

	if(isPieceInPlace==false){
		if (event.mouseY  > 8 && 
			event.mouseY < 8 + 200 &&
			 event.mouseX> 8 &&
			 event.mouseX < 8 + 200
		){
			first = document.querySelector(".viny1");
			first.classList.add("hide");
			ok = document.querySelector(".lecteur");
			ok.classList.add("hide");
			third = document.querySelector(".lecteur2");
			third.classList.remove("hide");

			first.style.top = 8 + "px";
			first.style.left = 10 + "px";
			isPieceInPlace = true;	
			setTimeout(consume, 2000);
		}
		else {

		first.style.top = event.mouseY + "px";
		first.style.left = event.mouseX + "px";

		}
	}

}

function consume(){
	AppManager.levelComplete();


}
