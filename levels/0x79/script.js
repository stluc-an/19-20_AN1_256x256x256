/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:41:40
\*----------------------------------------*/

AppManager.ready(function(){
	InteractionHelper.onKeyDown(actionWhenKeyRika);
});

function actionWhenKeyRika(event){
	console.log(event);

    if(event.key == "v"){
        document.querySelector("#Heart2").classList.remove("hide");
    }
    
    InteractionHelper.onHide( action_hide);
}

function action_hide(event){
    document.querySelector("#Heart2").classList.add("hide");
    document.querySelector("#Heart3").classList.remove("hide");
    
    AppManager.levelComplete();
}