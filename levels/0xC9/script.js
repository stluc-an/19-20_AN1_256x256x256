/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:42:04
\*----------------------------------------*/

AppManager.ready(function(){
	InteractionHelper.onBeforePrint( HideTheWindow);
});

function HideTheWindow(event){
    document.getElementById("Print").style.display = "none";
    document.getElementById("Print").style.opacity = "0";
    
    document.getElementById("Hide").style.display = "block";
    document.getElementById("Hide").style.opacity = "100";
	console.log(event);
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