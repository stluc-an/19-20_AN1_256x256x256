/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:40:30
\*----------------------------------------*/

AppManager.ready(function(){
	InteractionHelper.onScroll("div", first);
});

function first(event){
    if (document.querySelector(".card-body.bg-white").scrollTop > 40) {
        InteractionHelper.onKeyDown(second);
    }
}

function second(event){
    if(event.keyCode == "13") {
        let icone = document.getElementById("img04");
        icone.classList.add("block");
        
        let icone2 = document.getElementById("img02");
        icone2.classList.add("hide");
        
        let icone3 = document.getElementById("img03");
        icone3.classList.add("hide");
        
        let icone4 = document.getElementById("Duck_Text");
        icone4.classList.add("hide");
        
        let icone5 = document.getElementById("Duck_Text02");
        icone5.classList.add("block");
        
        let icone11 = document.getElementById("File_Directory02");
        icone11.classList.add("block");

        let icone10 = document.getElementById("File_Directory01");
        icone10.classList.add("hide");
    
        setTimeout(theEnd, 2000)
    }
}

function theEnd() {
    AppManager.levelComplete();
}