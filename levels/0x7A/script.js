/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:41:40
\*----------------------------------------*/

AppManager.ready(function(){
	InteractionHelper.onKeyUp(actionWhenKeyT);
});

function actionWhenKeyT(event){
    console.log(event);
    if(event.key == "t"){
        document.querySelector("#Devil").classList.remove("hide");
    }
    InteractionHelper.onShow( action_hide);
    
}

function action_hide(event){
    document.querySelector("#Devil").classList.add("hide");
    document.querySelector("#Slash").classList.remove("hide");
    document.querySelector("#Princess").classList.remove("hide");
    
    setTimeout (pause, 2000);
}

function pause(){
    AppManager.levelComplete();
        
}