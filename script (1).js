/* ============================================================
   Central Multimarcas — comportamento da página
   Edite apenas o bloco CONFIG abaixo.
   ============================================================ */

const CONFIG = {
  whatsapp: "5588992740633",   // DDI + DDD + número, só dígitos
  horarios: [                  // um intervalo por turno (24h)
    ["08:00", "11:00"],
    ["14:00", "18:00"]
  ],
  dias: [1, 2, 3, 4, 5, 6],    // 0=domingo … 6=sábado
  msgPadrao: "Olá! Vim pelo Instagram e gostaria de atendimento."
};

/* ---------- abrir o WhatsApp com a mensagem do botão ---------- */
const toMinutes = t => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};

function estaAberto(agora) {
  if (!CONFIG.dias.includes(agora.getDay())) return false;
  const minutos = agora.getHours() * 60 + agora.getMinutes();
  return CONFIG.horarios.some(([abre, fecha]) =>
    minutos >= toMinutes(abre) && minutos < toMinutes(fecha)
  );
}

document.querySelectorAll("[data-msg]").forEach(el => {
  el.addEventListener("click", e => {
    e.preventDefault();
    const texto = el.dataset.msg || CONFIG.msgPadrao;
    const url = "https://wa.me/" + CONFIG.whatsapp + "?text=" + encodeURIComponent(texto);
    window.open(url, "_blank", "noopener");
  });
});

/* ---------- aviso de atendimento ---------- */
const agora = new Date();
if (!estaAberto(agora)) {
  document.getElementById("dot").classList.add("off");
  document.getElementById("status").textContent = "Deixe sua mensagem, respondemos em breve";
}

/* ---------- botão flutuante: só aparece quando o principal sai da tela ---------- */
const fab = document.getElementById("fab");
const principal = document.getElementById("mainCta");
if ("IntersectionObserver" in window) {
  new IntersectionObserver(([e]) => fab.classList.toggle("show", !e.isIntersecting))
    .observe(principal);
} else {
  fab.classList.add("show");
}

/* ---------- ano do rodapé ---------- */
document.getElementById("y").textContent = agora.getFullYear();
