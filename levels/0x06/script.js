/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:40:20
\*----------------------------------------*/


AppManager.ready(function(){
	InteractionHelper.onTap(".BigRedButton", ButtonPressed);
});
    

function ButtonPressed(){
    event.target.classList.add("Hide");
    document.getElementById("LeaveBox").style.display = "block";
    document.getElementById("LeaveBox").transition = "all 2s" ;
    document.getElementById("LeaveBox").style.opacity = 100;
    InteractionHelper.onMouseLeave("#LeaveBox", YouWon);
}

function YouWon(event){
    document.getElementById("LeaveBox").style.display = "none";
    document.getElementById("LeaveBox").style.opacity = 0;
    document.getElementById("Success").style.display = "block";
    document.getElementById("Success").style.opacity = 100;
    console.log(event);
    AppManager.levelComplete();
}