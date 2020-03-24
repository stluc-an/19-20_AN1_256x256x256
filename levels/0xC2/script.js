/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:40:40
\*----------------------------------------*/

AppManager.ready(function(){
	InteractionHelper.onBeforePrint( Longtap);
});

function Longtap(event){
	console.log(event);
    document.getElementById('Print').style.display = 'none';
    document.getElementById('Print').style.opacity = '0';
    
    document.getElementById('LongTap').style.display = 'block';
    document.getElementById('LongTap').style.opacity = '100';
	InteractionHelper.onLongTap("#LongTap", YouWon);
}

function YouWon(event){
    document.getElementById("LongTap").style.display = "none";
    document.getElementById("LongTap").style.opacity = 0;
    document.getElementById("Success").style.display = "block";
    document.getElementById("Success").style.opacity = 100;
	console.log(event);
	AppManager.levelComplete();
} 