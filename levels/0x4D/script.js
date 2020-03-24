/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:40:30
\*----------------------------------------*/

//let oldScrollPos = 0;

AppManager.ready(function(){
	InteractionHelper.onDropFile(".card-body.bg-white", first);
});

function first(event){
      
	if(event.type == "drop"){
        
        let icone = document.getElementById("img02");
        icone.classList.add("hide");
        
        let icone2 = document.getElementById("Duck-File");
        icone2.classList.add("block");
        
        InteractionHelper.onScroll(".card-body.bg-white", second);
    }
}

function second(event){ 
    
    if (document.querySelector(".card-body.bg-white").scrollTop > 1) {
        
        setTimeout(theEnd, 2000);
    }
}

function theEnd() {
    AppManager.levelComplete();
}