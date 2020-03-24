/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:40:30
\*----------------------------------------*/

AppManager.ready(function(){
	InteractionHelper.onDropFile(".card-body", first);
});

function first(event){
      
	if(event.type == "drop"){
        
        let icone = document.getElementById("img02");
        icone.classList.add("hide");
        
        let icone3 = document.getElementById("img03");
        icone3.classList.add("block");
        
        let icone4 = document.getElementById("img04");
        icone4.classList.add("block");
        
        
        
        setTimeout(second, 3000);
    }
}

function second(event){
    let icone4 = document.getElementById("img04");
    icone4.classList.add("hide");
    
	console.log(event);
	AppManager.levelComplete();
}