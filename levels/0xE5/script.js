/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:43:17
\*----------------------------------------*/

AppManager.ready(function(){
	InteractionHelper.onMouseEnter("#balle", buttonPressed);
});

function buttonPressed(event){
	console.log(event);
    
    document.querySelector("#balle").classList.add("hide");
    document.querySelector("#chien").classList.add("hide");
    document.querySelector("#flash").classList.remove("hide");
    
    setTimeout (pause, 3000);
    
}

function pause(){
    AppManager.levelComplete();
}


