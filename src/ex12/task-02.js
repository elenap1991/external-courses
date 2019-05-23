var itemArr = ["Menu 1", "Menu 2", "Menu 3", "Menu 4", "Menu 5"];
var headlineText = "Top menu";

var cont = document.getElementById("menu");

var li;
var ul = document.createElement("ul");
ul.className = "menu__list";
itemArr.forEach(el => {
	li = document.createElement("li");
	li.className = "menu__items";
	li.innerHTML=el;
	ul.appendChild(li);
})
li = document.createElement("li");
li.innerHTML = headlineText;
li.id = "headline";
li.className = "menu__headline";
ul.appendChild(li);
cont.appendChild(ul);

var itemsMenu = document.getElementsByClassName("menu__items");

function hiding() {
	for(i=0;i<itemsMenu.length;i++){
		itemsMenu[i].style.display="none";
	}
}
function showing() {
	for(i=0;i<itemsMenu.length;i++){
		itemsMenu[i].style.display="block";
	}
}
hiding();
function hiddenall(event) {
	if (event.target.id === "headline") {
		if (itemsMenu[0].style.display === "none") {
			showing();
		} else {
			hiding();
		}
	} else if (event.target.className !== "menu__items" && event.target.className !== "menu__list") {
		hiding();
	}
}

document.addEventListener("click", hiddenall);