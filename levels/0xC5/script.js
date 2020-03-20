/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:42:49
\*----------------------------------------*/

AppManager.ready(function(){
	InteractionHelper.onBeforePrint(DisplayBox);
});

function DisplayBox(){
        document.getElementById("Print").style.display = "none";
        document.getElementById("Print").style.opacity = "0";
        document.getElementById("Box").style.display = "block";
        document.getElementById("Box").style.opacity = "100";
            InteractionHelper.onMouseEnter("#Box", YouWon);
} 


function YouWon(event){
    document.getElementById("Box").style.display = "none";
    document.getElementById("Box").style.opacity = 0;
    document.getElementById("Success").style.display = "block";
    document.getElementById("Success").style.opacity = 100;
	console.log(event);
	AppManager.levelComplete();
} 