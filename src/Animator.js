/*----------------------------------------*\
  256^3 - Animator.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-05 17:45:38
  @Last Modified time: 2020-02-06 21:36:10
\*----------------------------------------*/
const RAF = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

class Animator{
    constructor({ duration = Infinity, delay=0, atStarting = ()=>{}, atRunning = ()=>{}, atStoping = ()=>{}, fps = Infinity, ...data }){
    	this.nextFrameDelay = 1000/fps;
    	this.nextFrameAt = Infinity;
    	this.lastFrameAt = Infinity;
    	this.stopAt = Infinity;
    	this.data = data;
        this.duration = duration;
        this.ratio = 1.0/duration;
        this.delay = 0;
        this.atStarting = atStarting;
        this.atRunning = atRunning;
        this.atStoping = atStoping;
    }
    
    start(){
        this.startAt = Animator.now + this.delay;
        this.nextFrameAt = this.startAt + this.nextFrameDelay;
        this.stopAt = this.startAt + this.duration;
        this.atStarting();
        this.lastFrameAt = Animator.now;
        Animator.animations.push(this);
    }

    update(){
    	this.nextFrameAt = Animator.now + this.nextFrameDelay;
		this.atRunning({
			now : Animator.now,
			deltaTime : (Animator.now - this.lastFrameAt)*0.001, 
			cursor : Math.min(1, Math.max(0, (Animator.now-this.startAt) * this.ratio)),
			...this.data
		});
		this.lastFrameAt = Animator.now;
    }

    hasToRun(){
    	return this.nextFrameAt < Animator.now;
    }

    hasToStop(){
    	return this.stopAt < Animator.now;
    }

    static run(time){
    	Animator.now = time;
        for(let i = Animator.animations.length-1 ; i >= 0 ; i --){
        	const animation = Animator.animations[i];
        	if(animation.hasToRun()){
	    		animation.update()
        	}
	        if(animation.hasToStop()){
	    		animation.atStoping();
	    		Animator.animations.splice(i, 1);
	    	}
	    }
    	RAF(Animator.run);
    }
}

RAF(Animator.run);
Animator.animations = [];
Animator.now = 0;

export default Animator;