/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:41:27
\*----------------------------------------*/

let isPieceInPlace = false; 
 
AppManager.ready(function(){
	InteractionHelper.onMouseLeave("body", ActionWhenLeaved);
});

function ActionWhenLeaved(event){
	InteractionHelper.onDrag("html",whenDragSquare);
}

function whenDragSquare(event){

	if(isPieceInPlace==false){
		if (event.mouseY  > 142 && 
			event.mouseY < 142 + 30 &&
			 event.mouseX> 40 &&
			 event.mouseX < 40 + 30
		){
			let bigPiece = document.querySelector("#img3");
			bigPiece.classList.remove("hide")
			let piece = document.querySelector("#img1");
			piece.classList.add("hide");
			piece.style.top = 0 + "px";
			piece.style.left = 0 + "px";
			isPieceInPlace = true;	
			AppManager.levelComplete();
		}
		else {

			let piece = document.querySelector("#img1");
		piece.classList.remove("hide");
		piece.style.top = event.mouseY + "px";
		piece.style.left = event.mouseX + "px";

		}
	}
}


