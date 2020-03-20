/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:40:30
\*----------------------------------------*/

let isPieceInPlace = false;

AppManager.ready(function(){
	InteractionHelper.onDrag("html", first);
});

function first(event){
   if(isPieceInPlace==false){
        if (event.mouseY  > 75 && 
            event.mouseY < 75 + 50 &&
            event.mouseX> 90 &&
            event.mouseX < 90 + 50
        ){
            let Duck = document.querySelector("#Duck");
            Duck.style.top = 75 + "px";
            Duck.style.left = 90 + "px";
            isPieceInPlace = true;
            
            let icone = document.getElementById("img02");
            icone.classList.add("hide");
            
            let icone2 = document.getElementById("img03");
            icone2.classList.add("hide");
            
            let icone3 = document.getElementById("img04");
            icone3.classList.add("block");

            document.getElementById("Pond03").style.cursor = "pointer";
            
            InteractionHelper.onDoubleTap("#Pond03", second);
        }
        else {
            let Duck = document.querySelector("#Duck");
            Duck.style.top = event.mouseY - (Duck.offsetHeight/2) + "px";
            Duck.style.left = event.mouseX - (Duck.offsetHeight/2) + "px";
        }
    }
}

function second(event){
    let icone6 = document.getElementById("img04");
    icone6.classList.remove("block");
    icone6.classList.add("hide");
    
    let icone7 = document.getElementById("Pond02");
    icone7.classList.add("hide");
    
    let icone11 = document.getElementById("File_Directory02");
    icone11.classList.add("block");

    let icone10 = document.getElementById("File_Directory01");
    icone10.classList.add("hide");
    
    let icone4 = document.getElementById("img05");
    icone4.classList.add("block");
            
    let icone5 = document.getElementById("img06");
    icone5.classList.add("block");
            
    let icone8 = document.getElementById("img07");
    icone8.classList.add("block");
    
    setTimeout(theEnd, 2000);
}

function theEnd() {
    AppManager.levelComplete();
}