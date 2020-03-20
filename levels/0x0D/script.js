/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:40:20
\*----------------------------------------*/

AppManager.ready(function(){
	InteractionHelper.onTap("#ascenseur", eventHandlerAscenseur);
});

function eventHandlerAscenseur(event){
	console.log(event);
    document.querySelector("#ascenseur").classList.add("hide");
    document.querySelector("#ascenseur2").classList.remove("hide");
    setTimeout (document.querySelector("#Jean_Michel").classList.remove("hide"), 3000);
    
    InteractionHelper.onScroll("#Jean_Michel", eventHandler);    
}

function eventHandler(event){
    window.onscroll = function() {myFunction()};
}

function myFunction() {
  if (document.body.scrollTop > 350 || document.documentElement.scrollTop > 350) {
    document.getElementById("#Jean_Michel").className = "slideUp";
  }
    
    AppManager.levelComplete();
}