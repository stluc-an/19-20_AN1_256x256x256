/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:40:30
\*----------------------------------------*/

AppManager.ready(function(){
	InteractionHelper.onWindowResize(first);
});

function first(event){
    let icone2 = document.getElementById("img03");
    icone2.classList.add("hide");
    
    let icone3 = document.getElementById("img02");
    icone3.classList.add("hide");
    
    let icone = document.getElementById("img04");
    icone.classList.add("block");
    
    InteractionHelper.onDropFile(".card-body.bg-white", second);
}

function second(event){
    if(event.type == "drop"){
        AppManager.levelComplete();
    }
}