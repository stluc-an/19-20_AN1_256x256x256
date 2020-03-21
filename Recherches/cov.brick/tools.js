/*----------------------------------------*\
  19-20_AN1_256x256x256 - tools.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-03-21 02:12:38
  @Last Modified time: 2020-03-21 03:16:24
\*----------------------------------------*/


String.prototype.debit = function(size=1){
	size = Math.ceil(size);
	if(size==Infinity) return [this.toString()];
	if(size<1)return false;
	if(this.length==0) return false;
	return this.match(new RegExp(".{1,"+ size +"}","g"))
};

String.prototype.pad = function(multiple=__CHAR_PER_LINE__){
	let self = this;
	while((self.length%multiple)!=0)self+=" "
	return self;
};



function intersectArea(r1, r2) {
  return !(r2.x1 > r1.x2 || 
           r2.x2 < r1.x1 || 
           r2.y1 > r1.y2 ||
           r2.y2 < r1.y1);
}

function centerArea(r) {
	return new Vector((r.x2 + r.x1)>>1, (r.y2 + r.y1)>>1);
}



class Vector{
	constructor(x=0, y=0){
		this.x = x;
		this.y = y;
	}
	add(p2){
		this.x += p2.x;
		this.y += p2.y;
		return this;
	}
	sub(p2){
		this.x -= p2.x;
		this.y -= p2.y;
		return this;
	}
	mult(a){
		this.x *= a;
		this.y *= a;
		return this;
	}
	angle(){
		return Math.atan2(this.y, this.x);
	}
}