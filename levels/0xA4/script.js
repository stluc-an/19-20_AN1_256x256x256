/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:42:16
\*----------------------------------------*/

AppManager.ready(function(){
	InteractionHelper.onShow(DropTheFile);
});

function DropTheFile(){
    document.getElementById("ShowMe").style.display = "none";
    document.getElementById("ShowMe").style.opacity = "0";
    
    document.getElementById("DropMe").style.display = "block";
    document.getElementById("DropMe").style.opacity = "100";
	InteractionHelper.onDropFile("#DropMe", YouWon);
}

function YouWon(event){
    if(event.type=="drop"){
        document.getElementById("DropMe").style.display = "none";
        document.getElementById("DropMe").style.opacity = 0;
        document.getElementById("Success").style.display = "block";
        document.getElementById("Success").style.opacity = 100;
        
            AppManager.levelComplete();
  }
}