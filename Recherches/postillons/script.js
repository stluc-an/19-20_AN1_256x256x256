/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-10-19 23:16:09
\*----------------------------------------*/

let maxilaire;
AppManager.ready(function(){
	document.querySelector("input").focus();
	InteractionHelper.onKeyDown(eventHandler);
	InteractionHelper.onTap("body", ()=>{
		document.querySelector("input").focus();
	});
	requestAnimationFrame(update);	
});

function eventHandler(event){
	maxilaire = maxilaire || document.querySelector(".maxilaire");
	maxilaire.style.transform = "translate(0, "+( Math.random() * 10)+"px)";
	new Letter(event.key, event.mouseX, event.mouseY);
}

const letters = [];
let lastTime = 0;

class Letter{
	constructor(key, x, y){
		this.element = document.createElement("div");
		this.element.innerText = key;
		this.element.classList.add("letter");

		this.x = 143;
		this.y = 170;
		this.z = 0;
		this.r = 0;
		
		this.xspeed = (Math.random()-0.5) * 2 * 100;
		this.yspeed = (Math.random()-0.5) * 2 * 50;
		this.zspeed = (Math.random()-0.0) * 2 * 5;
		this.rspeed = (Math.random()-0.5) * 2 * 100;
		
		this.xAcc = 0;
		this.yAcc = 1.81;
		this.rAcc = .9999;
		
		document.body.append(this.element);
		letters.push(this);
	}
	update(deltaTime){
		this.x += this.xspeed * deltaTime ;
		this.y += this.yspeed * deltaTime ;
		this.z += this.zspeed * deltaTime ;
		this.r += this.rspeed * deltaTime;
		
		this.xspeed += this.xAcc;
		this.yspeed += this.yAcc;
		//this.rspeed *= this.rAcc;

		this.element.style.fontSize = 5+this.z+"px";
		this.element.style.transform = 	"translate("+(this.x-this.element.offsetWidth*0.5)+"px, "+this.y+"px)"+
										"rotateZ("+(this.r)+"deg)";;;
	}
	isAlive(){
		return this.y < document.body.offsetWidth;
	}
	destroy(i){
		this.element.parentElement.removeChild(this.element);
		letters.splice(i, 1);
	}
}



function update(time){
	const deltaTime = (time - lastTime)*0.001;
	lastTime = time;
	for(const l of letters){
		l.update(deltaTime)
	}
	for(let i = letters.length-1 ; i >= 0 ; i --){
		if(!letters[i].isAlive()){
			letters[i].destroy(i);
		}
	}
	requestAnimationFrame(update);	
}


