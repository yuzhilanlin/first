
var wrap = document.getElementById('wrap');
var fen =  document.getElementById('fen');
var time =  document.getElementById('time');
var div = wrap.getElementsByTagName('div');
var times = 10;
var fs = 0;
var gameoverbol = false;
// div[0].style.display = "block";
startFn ()

for (var i = 0; i < div.length; i++) {
	div[i].onclick = function  () {
		if (this.dabol==true) {return};
		this.dabol = true;
		moveDa(this);
		if (this.imgs=="h") {
			fs += 10;
		}else{
			fs -= 10;
		}
		fen.innerHTML = fs;
	}
};

//游戏开始函数
function startFn () {
	var timer = setInterval(function  () {
		if (gameoverbol) {
			clearInterval(timer)			
		};
		divFn ()
		function divFn () {
			var rnd = Math.floor(Math.random()*div.length);
			if (div[rnd].bol != true) {
				if (Math.random()-0.3>0) {
					div[rnd].style.backgroundImage = "url(img/h.png)";
					div[rnd].imgs = "h";
				}else{
					div[rnd].style.backgroundImage = "url(img/x.png)";
					div[rnd].imgs = "x";
				}				
				moveUp (div[rnd]);
			}else{
				divFn ()
			}
		}
	},500)
}
//灰太狼出来
function moveUp (obj){
	var i = 0;
	obj.bol = true;
	obj.style.display = "block";
	clearInterval(obj.timer);
	clearTimeout(obj.timeout);
	obj.timer = setInterval(function  () {	
		i++;
		if (i>=5) {
			clearInterval(obj.timer);
			obj.timeout = setTimeout(function  () {
				moveDown(obj);
			},100)			
		};		
		obj.style.backgroundPosition = -obj.offsetWidth*i+"px 0";
	},50)	
}
//灰太狼下去
function moveDown (obj){
	var i = 5;
	clearInterval(obj.timer);
	clearTimeout(obj.timeout);
	obj.timer = setInterval(function  () {	
		i--;
		if (i<=0) {
			clearInterval(obj.timer);
			obj.style.display = "none";
			obj.bol = false;
			obj.dabol = false;
		};		
		obj.style.backgroundPosition = -obj.offsetWidth*i+"px 0";
	},50)	
}

function moveDa(obj){
	var i = 6;
	clearInterval(obj.timer);
	clearTimeout(obj.timeout);
	obj.timer = setInterval(function  () {	
		i++;
		if (i>=9) {
			clearInterval(obj.timer);
			moveDown (obj)			
		};		
		obj.style.backgroundPosition = -obj.offsetWidth*i+"px 0";
	},50)	
}

timeFn ()
//倒计时
function timeFn () {
	var n = times;
	var w = time.offsetWidth;
	var timer = setInterval(function  () {
		n -= 0.02;
		if (n<=0) {
			clearInterval(timer)
			n = 0;
			gameoverbol = true;
		};
		var timeW = n/times*w;
		// time.style.width = timeW+"px";
		time.style.backgroundSize = timeW+"px 100%";
	},20)
}
