let zvan = document.querySelector("#zvan");
let dol = document.querySelector("#dol");
let article = document.querySelector("#article");
let proc = document.querySelector("#proc");

let dolzhnost = document.querySelectorAll(".dolzhnost");

let view = document.querySelectorAll("#select");

let key;

function checked(el) {
  el.forEach((element) => {
    element.addEventListener("change", (ev) => {
      if (element.value == 1) {
        key = 1;
        zvan.disabled = false;
      } else {
        key = 2;
        zvan.value = "";
        zvan.disabled = true;
      }
    });
  });
}
checked(view);

function oklad_zvanie(el) {
  el.addEventListener("input", function () {
    const res = +el.value / ((+zvan.value + +dol.value) / 100);
    proc.value = res;
  });
}

oklad_zvanie(proc);

function oklad(el) {
  el.addEventListener("input", function () {
    const res = +el.value / (+dol.value / 100);
    proc.value = res;
  });
}

oklad(proc);

function checkDol(el) {
  el.forEach((element) => {
    element.addEventListener("change", function (ev) {
      if ((ev.target.value === "tehnik") & (key == 1)) {
        zvan.disabled = false;
        zvan.value = 12181;
        dol.value = 27224;
      } else if ((ev.target.value === "tehnik") & (key == 2)) {
        zvan.disabled = true;
        dol.value = 27224;
      } else if ((ev.target.value === "radist") & (key == 1)) {
        zvan.disabled = false;
        zvan.value = 11000;
        dol.value = 25000;
      } else if ((ev.target.value === "radist") & (key == 2)) {
        zvan.disabled = true;
        dol.value = 25000;
      } else if ((ev.target.value === "radist+") & (key == 1)) {
        zvan.disabled = false;
        zvan.value = 10000;
        dol.value = 24000;
      } else if ((ev.target.value === "radist+") & (key == 2)) {
        zvan.disabled = true;
        dol.value = 24000;
      }
    });
  });
}

checkDol(dolzhnost);
