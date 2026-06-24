// 1. Находим все элементы на странице
const zvan = document.querySelector("#zvan");
const dol = document.querySelector("#dol");
const article = document.querySelector("#article");
const proc = document.querySelector("#proc");

const dolzhnost = document.querySelectorAll(".dolzhnost");
const view = document.querySelectorAll("#select");

// База данных для автоматического заполнения окладов
const baseData = {
  tehnik: { zvan: 12181, dol: 27224 },
  radist: { zvan: 11000, dol: 25791 },
  "radist+": { zvan: 12181, dol: 25791 }
};

// Главная функция управления формой и расчета
function calculate() {
  if (!zvan || !dol || !article || !proc) return;

  // Получаем выбранный вид начисления (0, 1 или 2)
  const activeView = document.querySelector("#select");
  const key = activeView ? +activeView.value : 0;

  // Ищем, какая должность сейчас выбрана радиокнопкой
  const activeDolzhnost = document.querySelector(".dolzhnost:checked");
  const currentJob = activeDolzhnost ? activeDolzhnost.value : null;

  // СЦЕНАРИЙ 0: Ничего не выбрано в верхнем списке (value="0")
  if (key === 0) {
    // Блокируем и сбрасываем радиокнопки должностей
    dolzhnost.forEach(radio => {
      radio.disabled = true;
      radio.checked = false; 
    });

    // Оставляем инпуты активными для полностью ручного ввода (как в прошлых шагах)
    zvan.disabled = false;
    dol.disabled = false;
    article.disabled = false;

    zvan.placeholder = "Оклад по званию";
    
    // Принудительно очищаем автоподстановку окладов
    zvan.value = "";
    dol.value = "";
  } 
  // СЦЕНАРИЙ 1 ИЛИ 2: Конкретный вид начисления выбран
  else {
    // Активируем радиокнопки для выбора должности
    dolzhnost.forEach(radio => radio.disabled = false);
    dol.disabled = false;
    article.disabled = false;

    // Блокируем инпут "Звание" ТОЛЬКО для группы 2
    if (key === 2) {
      zvan.disabled = true;
      zvan.value = ""; // Очищаем звание, так как оно не нужно для группы 2
      zvan.placeholder = "Не требуется";
    } else {
      zvan.disabled = false;
      zvan.placeholder = "Оклад по званию";
    }

    // Автоподстановка окладов на основе выбранной должности
    if (currentJob && baseData[currentJob]) {
      dol.value = baseData[currentJob].dol;
      
      // Подставляем звание только для группы 1
      if (key === 1) {
        zvan.value = baseData[currentJob].zvan;
      }
    }
  }

  // Собираем актуальные цифры для математических формул из инпутов
  const zvanVal = +zvan.value || 0;
  const dolVal = +dol.value || 0;
  const articleVal = +article.value || 0;

  let res = 0;
  
  if (key === 2) {
    // Формула только для Оклада (группа 2)
    if (dolVal > 0) res = articleVal / (dolVal / 100);
  } else {
    // Базовая формула для группы 0 и группы 1 (Оклад + Звание)
    const base = zvanVal + dolVal;
    if (base > 0) res = articleVal / (base / 100);
  }
  // Выводим округленный до двух знаков результат
  proc.value = isFinite(res) && res > 0 ? Number(res.toFixed(2)) : "%";
}

// 2. Объединяем коллекции элементов для навешивания общего события
const allControls = [...view, ...dolzhnost];

allControls.forEach((element) => {
  element.addEventListener("change", () => {
    calculate();
  });
});

// 3. Отслеживаем ручной ввод цифр в поля для моментального пересчета
if (article) article.addEventListener("input", calculate);
if (zvan) zvan.addEventListener("input", calculate);
if (dol) dol.addEventListener("input", calculate);

// 4. Первичный запуск функции для настройки полей при загрузке
calculate();
const resetBtn = document.querySelector("#resetBtn");

if (resetBtn) {
  resetBtn.addEventListener("click", () => {
    location.reload(); // Перезагружает страницу при клике
  });
}
