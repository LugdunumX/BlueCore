// =====================
// BlueCore - app.js
// =====================

// Année footer
document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});

// =====================
// Helpers DOM
// =====================
function el(id) {
  return document.getElementById(id);
}
function setText(id, value) {
  const e = el(id);
  if (!e) return;
  e.textContent = value === 0 ? "0" : value ? String(value) : "—";
}

// =====================
// CONFIG CLUB
// =====================
const CLUB_ID = "55123";
const PLATFORM = "common-gen5";

// ✅ Backend local (Node)
const API_STATS = "http://localhost:3001/api/club/stats";

// ✅ Endpoint matches (GET)
const API_MATCHES = (type) =>
  `http://localhost:3001/api/club/matches?clubId=${encodeURIComponent(
    CLUB_ID
  )}&platform=${encodeURIComponent(PLATFORM)}&matchType=${encodeURIComponent(
    type
  )}`;

// =====================
// Compute Last 5
// =====================
function computeLast5(matches) {
  const last = (matches || []).slice(0, 5);

  let w = 0,
    d = 0,
    l = 0;
  let gf = 0,
    ga = 0;

  for (const m of last) {
    const hg = Number(m?.homeGoals ?? 0);
    const ag = Number(m?.awayGoals ?? 0);

    // On détecte si Valencygn est home ou away via le nom
    const isHome = String(m?.homeName || "").toLowerCase().includes("valencygn");
    const my = isHome ? hg : ag;
    const op = isHome ? ag : hg;

    gf += my;
    ga += op;

    if (my > op) w++;
    else if (my === op) d++;
    else l++;
  }

  return {
    last5: `W${w} D${d} L${l}`,
    gd: String(gf - ga),
    form: w >= 3 ? "Bon ✅" : w === 2 ? "Moyen 😅" : "Difficile 😬"
  };
}

// =====================
// Render matches list  ✅ (fonction intégrée)
// =====================
function renderMatchesToList(listEl, matches) {
  if (!listEl) return;
  listEl.innerHTML = "";

  if (!matches || !matches.length) {
    listEl.innerHTML = `<div class="matchEmpty">Aucun match trouvé.</div>`;
    return;
  }

  for (const m of matches.slice(0, 10)) {
    const homeName = m?.homeName ?? "Home";
    const awayName = m?.awayName ?? "Away";
    const homeGoals = m?.homeGoals ?? "—";
    const awayGoals = m?.awayGoals ?? "—";
    const stadium = m?.stadium ?? "—";
    const dateTxt = m?.date ?? "—";

    const row = document.createElement("div");
    row.className = "matchRow";
    row.innerHTML = `
      <div class="team">
        <img class="teamLogo" src="assets/valencygn.png" alt="">
        <div>
          <div class="teamName">${homeName}</div>
          <div class="matchMeta">📍 ${stadium}</div>
        </div>
      </div>

      <div class="score">${homeGoals} - ${awayGoals}</div>

      <div class="team teamRight">
        <div class="teamRightTxt">
          <div class="teamName">${awayName}</div>
          <div class="matchMeta">🗓️ ${dateTxt}</div>
        </div>
        <img class="teamLogo" src="assets/valencygn.png" alt="">
      </div>
    `;
    listEl.appendChild(row);
  }
}

document.addEventListener("DOMContentLoaded", loadValencygn);
