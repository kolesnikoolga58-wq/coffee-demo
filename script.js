// ===== Данные меню =====
const MENU = {
  coffee: [
    { icon: "☕", name: "Эспрессо", desc: "Маленькая порция крепкого чёрного кофе, 30 мл", price: 150 },
    { icon: "☕", name: "Американо", desc: "Эспрессо с горячей водой, 250 мл", price: 180 },
    { icon: "🥛", name: "Капучино", desc: "Кофе с нежной молочной пенкой - пены больше, чем в латте, 300 мл", price: 230, tag: "Хит" },
    { icon: "🥛", name: "Латте", desc: "Много молока и немного кофе - мягче и нежнее капучино, 350 мл", price: 250 },
    { icon: "🍯", name: "Раф «Тёплый»", desc: "Кофе со сливками, мёдом и корицей - сладкий, наш фирменный", price: 290, tag: "Фирменный" },
    { icon: "🍫", name: "Мокко", desc: "Эспрессо, шоколад и молоко, 300 мл", price: 270 },
    { icon: "🧊", name: "Айс-латте", desc: "Холодный латте: кофе, молоко и лёд, 350 мл", price: 260 },
    { icon: "🫘", name: "Фильтр-кофе", desc: "Мягкий кофе без молока, сорт недели подскажет бариста (мастер по кофе), 300 мл", price: 200 },
  ],
  other: [
    { icon: "🍵", name: "Матча-латте", desc: "Молоко с японским зелёным чаем матча - мягкий, чуть травяной вкус, без кофе", price: 280 },
    { icon: "🍫", name: "Горячий шоколад", desc: "Густой, с маршмеллоу", price: 240 },
    { icon: "🫖", name: "Чай в чайнике", desc: "Чёрный, зелёный или травяной, 500 мл", price: 220 },
    { icon: "🍊", name: "Облепиховый чай", desc: "С апельсином и мёдом", price: 260, tag: "Согревает" },
    { icon: "🥤", name: "Какао", desc: "Как в детстве, 300 мл", price: 190 },
    { icon: "🍋", name: "Лимонад", desc: "Домашний, с мятой и лаймом", price: 210 },
  ],
  bakery: [
    { icon: "🥐", name: "Круассан", desc: "Классический, на сливочном масле", price: 160 },
    { icon: "🥐", name: "Круассан с миндалём", desc: "С миндальным кремом", price: 210, tag: "Хит" },
    { icon: "🌀", name: "Синнабон", desc: "Булочка с корицей и сливочным кремом", price: 220 },
    { icon: "🍰", name: "Чизкейк «Нью-Йорк»", desc: "Нежный, на песочной основе", price: 290 },
    { icon: "🍪", name: "Печенье с шоколадом", desc: "Мягкое внутри, хрустящее снаружи", price: 110 },
    { icon: "🥕", name: "Морковный торт", desc: "С грецким орехом и крем-чизом", price: 270 },
  ],
  breakfast: [
    { icon: "🍳", name: "Сырники", desc: "Со сметаной и ягодным соусом", price: 340, tag: "Хит" },
    { icon: "🥣", name: "Овсяная каша", desc: "С бананом, орехами и мёдом", price: 260 },
    { icon: "🥑", name: "Тост с авокадо", desc: "Яйцо пашот, зелень, зерновой хлеб", price: 420 },
    { icon: "🥞", name: "Панкейки", desc: "С кленовым сиропом и ягодами", price: 360 },
  ],
};

// ===== Отрисовка меню =====
// Значки рисуем единым набором (SVG), а не эмодзи: на разных телефонах эмодзи выглядят по-разному
const ICON_BY_EMOJI = {
  "☕": "cup", "🍯": "cup", "🍫": "cup", "🥛": "glass", "🧊": "glass", "🥤": "glass", "🍋": "glass",
  "🫘": "bean", "🍵": "leaf", "🫖": "leaf", "🍊": "leaf", "🥐": "bun", "🌀": "bun",
  "🍰": "cake", "🍪": "cake", "🥕": "cake", "🍳": "plate", "🥣": "plate", "🥑": "plate", "🥞": "plate",
};
const menuGrid = document.getElementById("menuGrid");
const tabs = document.querySelectorAll(".tab");

function renderMenu(category) {
  menuGrid.innerHTML = MENU[category]
    .map((item, i) => `
      <article class="menu-item" style="animation-delay:${i * 50}ms">
        <div class="menu-item__icon" aria-hidden="true"><svg class="ico"><use href="#i-${ICON_BY_EMOJI[item.icon] || "cup"}"/></svg></div>
        <div class="menu-item__body">
          <div class="menu-item__head">
            <h3 class="menu-item__name">${item.name}${item.tag ? `<span class="menu-item__tag">${item.tag}</span>` : ""}</h3>
            <span class="menu-item__dots"></span>
            <span class="menu-item__price">${item.price} ₽</span>
          </div>
          <p class="menu-item__desc">${item.desc}</p>
        </div>
      </article>`)
    .join("");
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => {
      t.classList.remove("is-active");
      t.setAttribute("aria-selected", "false");
    });
    tab.classList.add("is-active");
    tab.setAttribute("aria-selected", "true");
    renderMenu(tab.dataset.category);
  });
});

renderMenu("coffee");

// ===== Мобильное меню =====
const burger = document.getElementById("burger");
const nav = document.getElementById("nav");

function toggleNav(open) {
  nav.classList.toggle("is-open", open);
  burger.classList.toggle("is-open", open);
  burger.setAttribute("aria-expanded", String(open));
}

burger.addEventListener("click", () => toggleNav(!nav.classList.contains("is-open")));
nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => toggleNav(false)));

// ===== Тень у шапки при прокрутке =====
const header = document.getElementById("header");
window.addEventListener("scroll", () => {
  header.classList.toggle("is-scrolled", window.scrollY > 20);
});

// ===== «Сейчас открыто / закрыто» =====
function updateOpenStatus() {
  const el = document.getElementById("openStatus");
  const now = new Date();
  const day = now.getDay(); // 0 - воскресенье
  const hour = now.getHours() + now.getMinutes() / 60;
  const weekend = day === 0 || day === 6;
  const [open, close] = weekend ? [9, 23] : [8, 22];
  const isOpen = hour >= open && hour < close;

  el.textContent = isOpen
    ? `Сейчас открыто - ждём до ${close}:00`
    : `Сейчас закрыто - откроемся в ${open}:00`;
  el.style.setProperty("--dot", isOpen ? "#43a047" : "#e53935");
}
updateOpenStatus();

// ===== Анимация счётчиков =====
const counters = document.querySelectorAll(".stat__num");

function animateCounter(el) {
  const target = parseFloat(el.dataset.count);
  const decimals = parseInt(el.dataset.decimals || "0", 10);
  const duration = 1500;
  const start = performance.now();

  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    const value = target * (1 - Math.pow(1 - progress, 3));
    el.textContent = value.toLocaleString("ru-RU", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.6 });
  counters.forEach((c) => observer.observe(c));
} else {
  counters.forEach(animateCounter);
}

// ===== Форма бронирования (демо, никуда не отправляется) =====
const form = document.getElementById("bookingForm");
const message = document.getElementById("bookingMessage");
const dateInput = form.elements.date;

// Нельзя выбрать прошедшую дату
const today = new Date();
today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
dateInput.min = today.toISOString().slice(0, 10);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let valid = true;

  ["name", "phone", "date"].forEach((field) => {
    const input = form.elements[field];
    const ok = field === "phone"
      ? input.value.replace(/\D/g, "").length >= 10
      : input.value.trim() !== "";
    input.classList.toggle("is-invalid", !ok);
    if (!ok) valid = false;
  });

  if (!valid) {
    message.textContent = "Пожалуйста, заполните все поля (телефон не короче 10 цифр).";
    message.className = "booking__message is-error";
    return;
  }

  const name = form.elements.name.value.trim();
  const date = new Date(dateInput.value).toLocaleDateString("ru-RU", { day: "numeric", month: "long" });
  message.textContent = `Спасибо, ${name}! Ждём вас ${date}. (Это демо - заявка никуда не отправлена.)`;
  message.className = "booking__message is-ok";
  form.reset();
});

// ===== Год в подвале =====
document.getElementById("year").textContent = new Date().getFullYear();
