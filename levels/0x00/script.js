/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:40:20
\*----------------------------------------*/

AppManager.ready(function(){
	InteractionHelper.onTap("#cible", click);
});

function click(event){
	//console.log(event);
	//AppManager.levelComplete();
    document.querySelector("#cible").classList.add("hide");
    document.querySelector("#cible2").classList.remove("hide");
    InteractionHelper.onTap("#cible2", click2);
}

function click2(event){
     document.querySelector("#cible2").classList.add("hide");
    AppManager.levelComplete();
    
}
