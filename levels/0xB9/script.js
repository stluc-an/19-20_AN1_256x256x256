/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:42:31
\*----------------------------------------*/

AppManager.ready(function(){
	InteractionHelper.onWindowResize(HideThePage);
});

function HideThePage(event){
	console.log(event);
    document.getElementById("Resize").style.display = "none";
    document.getElementById("Resize").style.opacity = "0";
    
    document.getElementById("Hide").style.display = "block";
    document.getElementById("Hide").style.opacity = "100";
	InteractionHelper.onHide( YouWon);
}

function YouWon(event){
    document.getElementById("Hide").style.display = "none";
    document.getElementById("Hide").style.opacity = 0;
    document.getElementById("Success").style.display = "block";
    document.getElementById("Success").style.opacity = 100;
    console.log(event);
    AppManager.levelComplete();
}