let res_cont = [];
let res_tag = [];
function search() {
    let allElements = document.getElementsByTagName('*');
    let len = allElements.length;
    for (let i = 0, j = 0; i < len; i++) {
        if (allElements[i].tagName.match(/^h[2-6]$/i)) {
            let a = document.createElement("a");
            a.id = "index" + j++;
            res_cont.push(allElements[i].innerHTML);
            res_tag.push(allElements[i].tagName);
            allElements[i].parentElement.insertBefore(a, allElements[i]);
            len++;
            i++;
        }
    }
}
search();
let len = res_cont.length;
let menutree = document.getElementById("menutree");
let kids = menutree.getElementsByTagName("a");

var frag = document.createDocumentFragment();
for (let i = 0; i < len; i++) {
    var a = document.createElement("a");
    a.className = res_tag[i];

    if (res_tag[i] != "H2")
    	a.className += " hide";
    //只要下一个兄弟的res_tag比自己大，那么就是可以收纳的
    if (i < len-1 && res_tag[i] < res_tag[i+1]){
	    a.className+= " fath";
	    var itag = document.createElement("i");
	    itag.className = "icon-you";
	    a.appendChild(itag);
	    a.onclick = function (){
		    //只要比自己大，就collapse，遇到不大于的就退出
		    let j = i;
		    if (kids[i].children[0].className == "icon-you"){
			    kids[i].children[0].className = "icon-xia"
		    }else if (kids[i].children[0].className == "icon-xia"){
			    kids[i].children[0].className = "icon-you"
		    }
		    while (j < len-1&&res_tag[i] < res_tag[j+1]){//从点击的目标开始向下寻找，遇到同类就退出
		    	if (kids[j+1].className.charCodeAt(1) - kids[i].className.charCodeAt(1) == 0){//同类
			    	break;
		    	}else if (kids[j+1].className.charCodeAt(1) - kids[i].className.charCodeAt(1) == 1){//直接子代
		    		if (kids[j+1].children[0] != undefined){
			    		if (kids[j+1].className.match(/ hide/))
					    	kids[j+1].children[0].className = "icon-you";
					    else{
						    kids[j+1].children[0].className = "icon-xia";
					    }
				    }
				    if (kids[j+1].className.match(/ hide/)){
					    kids[j+1].className = kids[j+1].className.replace(/ hide/, "");
				    }else{
					    kids[j+1].className += " hide";
					    let k = i;
					    while (k < len-1&&res_tag[i] < res_tag[k+1]){
						    if (kids[k+1].className.charCodeAt(1) - kids[i].className.charCodeAt(1) == 0){//同类
						    	break;
					    	}else if (kids[k+1].className.charCodeAt(1) - kids[i].className.charCodeAt(1) > 1){//间接子代
						    	if (!kids[k+1].className.match(/ hide/)){
							    	kids[k+1].className += " hide";
						    	}
					    	}
					    	k++;
				    	}
				    }
			    }
			    j++;
		    }
	    }
    }
    a.href = "#index" + i;
    a.innerHTML += " "+res_cont[i];
    frag.appendChild(a);
}
menutree.appendChild(frag);
//********************************
//toggole menutree
//********************************
//menutree.onclick = function (){
//	if (this.className.match(/hide/)){
//		console.log("hide now");
//		console.log(this);
//		this.className = "show";
//	}else{
//		console.log("show now");
//		this.className = "hide";
//	}
//}
let expand = document.getElementsByClassName("expand")[0],
	compress = document.getElementsByClassName("compress")[0],
	toleft = document.getElementsByClassName("toleft")[0];
toleft.onclick = function(){
	menutree.className += " hide";
}
expand.onclick = function(){
	for (let i = 0,len = kids.length; i < len; i++){
		if (kids[i].className.match(/hide/)){
			kids[i].className = kids[i].className.replace(/hide/, "");
		}
	}
}
compress.onclick = function(){
	for (let i = 0,len = kids.length; i < len; i++){
		if (!kids[i].className.match(/H2/) && !kids[i].className.match(/hide/)){
			kids[i].className += " hide";
		}
	}
}
window.onscroll =  function (){
	if (menutree.className.match(/hide/)){
		menutree.className = menutree.className.replace(/hide/, "");
	}
}
//window.onscroll = function (){
//	//for (let i = 0; i < kids.length; i++){
//	//	kids[i].style.color = "#34495e";
//	//}
//	for (let i = 0; i < kids.length; i++){
//		console.log(kids[i].offsetHeight , window.scrollY,window.scrollY + document.documentElement.clientHeight)
//		if (!kids[i].className.match(/ hide/) && isElementInViewport(kids[i])){
//			console.log(kids[i]);
//			//kids[i].style.color = "red";
//			break;
//		}
//	}
//}
//function isElementInViewport(el) {
//  var rect = el.getBoundingClientRect();
//  return (
//    rect.top >= 0 && rect.left >= 0 &&
//    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
//    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
//  );
//}