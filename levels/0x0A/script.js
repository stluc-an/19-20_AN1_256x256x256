/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:40:30
\*----------------------------------------*/

//let oldScrollPos = 0;

AppManager.ready(function(){
	InteractionHelper.onTap("button", first);
});

function first(event) {    
    let icone = document.getElementById("img02");
    icone.classList.add("hide");
    
    let icone2 = document.getElementById("Duck_Text");
    icone2.classList.add("hide");
    
    let icone3 = document.getElementById("img03");
    icone3.classList.add("block");
    
    let icone4 = document.getElementById("img04");
    icone4.classList.add("block");
    
    let icone5 = document.getElementById("img05");
    icone5.classList.add("block");
    
    let icone6 = document.getElementById("img06");
    icone6.classList.add("block");
    
    let icone7 = document.getElementById("img07");
    icone7.classList.add("block");
    
    let icone11 = document.getElementById("File_Directory02");
    icone11.classList.add("block");
    
    let icone10 = document.getElementById("File_Directory01");
    icone10.classList.add("hide");
    
    InteractionHelper.onShow(second);
}

function second(event){
    //let bruh = 0;
    
    let icone8 = document.getElementById("img04");
    icone8.classList.remove("block");
    icone8.classList.add("hide");

    AppManager.levelComplete(); 
}