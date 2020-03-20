/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:40:20
\*----------------------------------------*/

AppManager.ready(function(){
	InteractionHelper.onTap(".tapme", buttonPressed);
});

function buttonPressed(event){
	console.log(event);
    event.target.classList.add("hide");
    setTimeout(showlongtap,700)
    

}

function showlongtap(){
    document.querySelector(".tappedme").classList.add("hide");
    document.querySelector(".longtap").classList.remove("hide");
    InteractionHelper.onLongTap(".longtap", longtap);
    
    document.querySelector(".longtap").addEventListener("mousedown", fill, false);
    
}

function longtap(event){
    console.log(event);
    setTimeout(showlongtapped, 500);

}

function showlongtapped(){
     document.querySelector(".longtap").classList.add("hide");
    document.querySelector(".longtapped").classList.remove("hide");
    AppManager.levelComplete();
}

function fill(){
 document.querySelector(".liquid").classList.add("full");
}

