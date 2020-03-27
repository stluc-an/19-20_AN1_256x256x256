/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:41:27
\*----------------------------------------*/
// question pour vincent, 
//comment peut on valider le niveau quand on drag un element sur un autre
AppManager.ready(function(){
	InteractionHelper.onMouseLeave("#cagewtiger", goOut);
});

function goOut(event){
	document.querySelector("#cagewtiger").classList.add("hide");
	document.querySelector("#tiger1").classList.remove("hide");
	document.querySelector("#cage").classList.remove("hide");
	InteractionHelper.onScroll("#tiger1", ReturnToCage);
	//console.log(event);
}

function ReturnToCage(event){
	document.querySelector("#tiger1").classList.add("goCage")
	AppManager.levelComplete();
}