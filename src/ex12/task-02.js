var itemArr = ["Menu 1", "Menu 2", "Menu 3", "Menu 4", "Menu 5"];
var headlineText = "Top menu";

var cont = document.getElementById("menu");

var li;
var ul = document.createElement("ul");
ul.className = "menu__list";
itemArr.forEach(el => {
  createItemLi(el, "menu__items");
})
createItemLi(headlineText, "menu__headline", "headline");
cont.appendChild(ul);

var itemsMenu = document.getElementsByClassName("menu__items");

function createItemLi(value, className, id) {
  li = document.createElement("li");
  li.innerHTML = value;
  li.className = className;
  if (id !== undefined) { li.id = id; }
  ul.appendChild(li);
}
function hide() {
  for (i = 0; i < itemsMenu.length; i++){
    itemsMenu[i].style.display = "none";
  }
}
function show() {
  for (i = 0; i < itemsMenu.length; i++){
    itemsMenu[i].style.display = "block";
  }
}
hide();
function hideAll(event) {
  if (event.target.id === "headline") {
    if (itemsMenu[0].style.display === "none") {
      show();
    } else {
      hide();
    }
  } else if (event.target.className !== "menu__items" && event.target.className !== "menu__list") {
    hide();
  }
}

document.addEventListener("click", hideAll);