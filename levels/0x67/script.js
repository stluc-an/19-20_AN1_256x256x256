/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:40:30
\*----------------------------------------*/

//let oldScrollPos = 0;

AppManager.ready(function(){
	InteractionHelper.onMouseLeave("#Duck_File", first);
});

function first(event){
	let icone = document.getElementById("img04");
    icone.classList.add("hide");  
    
    InteractionHelper.onKeyUp(second);
}

function second(event){
    if(event.keyCode == "13") {
        let icone = document.getElementById("img03");
        icone.classList.add("hide"); 
        
        console.log(event);
        setTimeout(theEnd, 2000)
    }
}

function theEnd() {
    AppManager.levelComplete();
}