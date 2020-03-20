/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:40:30
\*----------------------------------------*/

//let oldScrollPos = 0;

AppManager.ready(function(){
	InteractionHelper.onDoubleTap("#Duck_File", first);
});

function first(event){
	console.log(event);
    
    let icone = document.getElementById("img05");
    icone.classList.add("block");
    
    let icone2 = document.getElementById("Duck_File02");
    icone2.classList.add("hide");
    
    let icone11 = document.getElementById("File_Directory02");
    icone11.classList.add("block");
    
    let icone10 = document.getElementById("File_Directory01");
    icone10.classList.add("hide");
    
    let icone5 = document.getElementById("img06");
    icone5.classList.add("block");
    
    InteractionHelper.onWindowResize(second);
}

function second(event){
    console.log(event);
    setTimeout(theEnd, 2000);
}

function theEnd() {
    AppManager.levelComplete();
}