let zvan = document.querySelector("#zvan");
let dol = document.querySelector("#dol");
let article = document.querySelector("#article");
let proc = document.querySelector("#proc");

let dolzhnost = document.querySelectorAll(".dolzhnost");
let view = document.querySelectorAll("#select");

// 1. Создаем объект-базу данных для должностей, чтобы избежать бесконечных if/else
const baseData = {
  tehnik: { zvan: 12181, dol: 27224 },
  radist: { zvan: 11000, dol: 25000 },
  "radist+": { zvan: 10000, dol: 24000 }
};

// Функция самого расчета
function calculate() {
  if (!zvan || !dol || !article || !proc) return;

  // Ищем выбранный вид начисления (1 или 2)
  const activeView = document.querySelector("#select");
  const key = activeView ? +activeView.value : 1;

  // Ищем выбранную должность
  const activeDolzhnost = document.querySelector(".dolzhnost:checked");
  const currentJob = activeDolzhnost ? activeDolzhnost.value : null;

  // Шаг А. Управляем активностью поля Звание
  if (key === 1) {
    zvan.disabled = false;
    // Если должность выбрана, подставляем её дефолтное звание
    if (currentJob && baseData[currentJob]) {
      zvan.value = baseData[currentJob].zvan;
    }
  } else {
    zvan.disabled = true;
    zvan.value = "";
  }

  // Шаг Б. Подставляем оклад должности
  if (currentJob && baseData[currentJob]) {
    dol.value = baseData[currentJob].dol;
  }

  // Шаг В. Математический расчет
  const zvanVal = +zvan.value || 0;
  const dolVal = +dol.value || 0;
  const articleVal = +article.value || 0;

  let res = 0;
  if (key === 1) {
    // Ваша формула oklad_zvanie: Статья / ((Звание + Оклад) / 100)
    const base = zvanVal + dolVal;
    if (base > 0) res = articleVal / (base / 100);
  } else {
    // Ваша формула oklad: Статья / (Оклад / 100)
    if (dolVal > 0) res = articleVal / (dolVal / 100);
  }

  // Выводим результат в proc
  proc.value = isFinite(res) ? Number(res.toFixed(2)) : 0;
}

// 2. ОБЪЕДИНЯЕМ ДВА СПИСКА И ВЕШАЕМ НА НИХ ОДИН МЕТОД FOREACH
const allControls = [...view, ...dolzhnost];

allControls.forEach((element) => {
  element.addEventListener("change", () => {
    // При любом клике на списки или радиокнопки запускаем общий пересчет
    calculate();
  });
});

// 3. Также запускаем расчет, если пользователь вручную меняет цифру в поле Статья
if (article) {
  article.addEventListener("input", calculate);
}
