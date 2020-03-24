/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:41:40
\*----------------------------------------*/

AppManager.ready(function(){
	InteractionHelper.onKeyUp(DragThatElement);
});

function DragThatElement(event){
    document.getElementById("KeyUp").style.display = "none";
    document.getElementById("KeyUp").style.opacity = "0";
    
    document.getElementById("DragIt").style.display = "block";
    document.getElementById("DragIt").style.opacity = "100";
    InteractionHelper.onDrag("#DragIt", Dragging);
        
}

function Dragging(){
    console.log(event);
    event.mouseX = event.mouseX - ((window.innerWidth/2)-(265/2));
    event.mouseY = event.mouseY - ((window.innerHeight/2)-(265/2))
    
    document.getElementById("DragIt").style.left = event.mouseX+"px"
    document.getElementById("DragIt").style.top = event.mouseY+"px";
}


function YouWon(event){
    document.getElementById("DragIt").style.display = "none";
    document.getElementById("DragIt").style.opacity = 0;
    document.getElementById("Success").style.display = "block";
    document.getElementById("Success").style.opacity = 100;
    console.log(event);
    AppManager.levelComplete();
}