document.addEventListener("DOMContentLoaded", () => {

  const sendBtn = document.getElementById("sendDiscord");
  const formationSelect = document.getElementById("formation");

  if (!sendBtn) {
    console.error("❌ Bouton Discord introuvable");
    return;
  }

  const DISCORD_WEBHOOK_URL =
    "https://discord.com/api/webhooks/1462955175932198977/d0ibAL9el6NE0P9wxnZI7aCRiDSAcyuXKIcARj7OU2nzoOOy65_11DgUzgHGgA5ZH_M6";

  sendBtn.addEventListener("click", async () => {
    try {
      const pitch = document.getElementById("pitch");

      // 📸 Capture terrain
      const canvas = await html2canvas(pitch, {
        backgroundColor: null,
        scale: 2
      });

      const blob = await new Promise(resolve =>
        canvas.toBlob(resolve, "image/png")
      );

      // 📝 Texte
      const players = document.querySelectorAll(".player");

      let message = `⚽ **Composition du club**\n`;
      message += `📋 **Formation : ${formationSelect.value}**\n\n`;

      players.forEach(p => {
        const name = p.querySelector(".player-name")?.textContent || "Joueur";
        const role = p.dataset.role || "?";
        const captain = p.classList.contains("captain");

        message += `${captain ? "⭐ **CAPITAINE** — " : ""}${role} : ${name}\n`;
      });

      // 📦 Envoi Discord
      const formData = new FormData();
      formData.append("content", message);
      formData.append("file", blob, "composition.png");

      const res = await fetch(DISCORD_WEBHOOK_URL, {
        method: "POST",
        body: formData
      });

      if (!res.ok) throw new Error("Webhook Discord KO");

      alert("✅ Composition envoyée sur Discord !");
    } catch (err) {
      console.error(err);
      alert("❌ Erreur lors de l’envoi Discord");
    }
  });

});
}

  const KITS = {
    home: "/BlueCore/assets/Jersey-Valencygne-Esport-rouge.png",
    away: "/BlueCore/assets/blanc.png",
    gk: "/BlueCore/assets/Jersey-Valencygne-Esport-JAUNE.png"
  };

  /* =========================
     FORMATIONS – TOUTES (EA FC)
     ========================= */

  const FORMATIONS = {

    "3-1-4-2": [
      ["GB",50,92],
      ["DC",50,75],
      ["MG",15,55],["MC",35,55],["MC",50,55],["MC",65,55],["MD",85,55],
      ["BU",45,26],["BU",55,26]
    ],

    "3-4-1-2": [
      ["GB",50,92],
      ["DC",35,75],["DC",50,75],["DC",65,75],
      ["MG",20,55],["MC",40,55],["MC",60,55],["MD",80,55],
      ["MOC",50,40],
      ["BU",45,26],["BU",55,26]
    ],

    "3-4-2-1": [
      ["GB",50,92],
      ["DC",35,75],["DC",50,75],["DC",65,75],
      ["MG",20,55],["MC",40,55],["MC",60,55],["MD",80,55],
      ["MOC",40,38],["MOC",60,38],
      ["BU",50,26]
    ],

    "3-4-3": [
      ["GB",50,92],
      ["DC",35,75],["DC",50,75],["DC",65,75],
      ["MG",20,55],["MC",40,55],["MC",60,55],["MD",80,55],
      ["AG",25,28],["BU",50,26],["AD",75,28]
    ],

    "3-5-2": [
      ["GB",50,92],
      ["DC",35,75],["DC",50,75],["DC",65,75],
      ["MG",15,50],["MC",40,55],["MC",60,55],["MD",85,50],
      ["MOC",50,40],
      ["BU",45,26],["BU",55,26]
    ],

    "4-1-2-1-2": [
      ["GB",50,92],
      ["DG",20,75],["DC",40,75],["DC",60,75],["DD",80,75],
      ["MDC",50,60],
      ["MC",40,52],["MC",60,52],
      ["MOC",50,40],
      ["BU",45,26],["BU",55,26]
    ],

    "4-1-4-1": [
      ["GB",50,92],
      ["DG",20,75],["DC",40,75],["DC",60,75],["DD",80,75],
      ["MDC",50,60],
      ["MG",20,45],["MC",40,50],["MC",60,50],["MD",80,45],
      ["BU",50,26]
    ],

    "4-2-2-2": [
      ["GB",50,92],
      ["DG",20,75],["DC",40,75],["DC",60,75],["DD",80,75],
      ["MDC",45,60],["MDC",55,60],
      ["MOC",35,40],["MOC",65,40],
      ["BU",45,26],["BU",55,26]
    ],

    "4-2-3-1": [
      ["GB",50,92],
      ["DG",20,75],["DC",40,75],["DC",60,75],["DD",80,75],
      ["MDC",45,60],["MDC",55,60],
      ["AG",25,40],["MOC",50,40],["AD",75,40],
      ["BU",50,26]
    ],

    "4-3-1-2": [
      ["GB",50,92],
      ["DG",20,75],["DC",40,75],["DC",60,75],["DD",80,75],
      ["MC",40,55],["MC",50,55],["MC",60,55],
      ["MOC",50,40],
      ["BU",45,26],["BU",55,26]
    ],

    "4-3-2-1": [
      ["GB",50,92],
      ["DG",20,75],["DC",40,75],["DC",60,75],["DD",80,75],
      ["MC",35,55],["MC",50,55],["MC",65,55],
      ["AG",40,35],["AD",60,35],
      ["BU",50,26]
    ],

    "4-3-3": [
      ["GB",50,92],
      ["DG",20,75],["DC",40,75],["DC",60,75],["DD",80,75],
      ["MC",35,55],["MC",50,55],["MC",65,55],
      ["AG",20,28],["BU",50,26],["AD",80,28]
    ],

"4-3-3 (4)": [
      ["GB",50,92],
      ["DG",18,75],["DC",38,75],["DC",62,75],["DD",82,75],
      ["MCG",38,56],["MOC",50,46],["MCD",62,56],
      ["AG",22,28],["BU",50,24],["AD",78,28]
    ],

    "4-4-1-1": [
      ["GB",50,92],
      ["DG",20,75],["DC",40,75],["DC",60,75],["DD",80,75],
      ["MG",20,50],["MC",40,55],["MC",60,55],["MD",80,50],
      ["MOC",50,40],
      ["BU",50,26]
    ],

    "4-4-2": [
      ["GB",50,92],
      ["DG",20,75],["DC",40,75],["DC",60,75],["DD",80,75],
      ["MG",20,50],["MC",40,55],["MC",60,55],["MD",80,50],
      ["BU",45,26],["BU",55,26]
    ],

    "4-5-1": [
      ["GB",50,92],
      ["DG",20,75],["DC",40,75],["DC",60,75],["DD",80,75],
      ["MG",20,50],["MC",40,55],["MC",50,55],["MC",60,55],["MD",80,50],
      ["BU",50,26]
    ],

    "5-2-1-2": [
      ["GB",50,92],
      ["AG",15,72],["DC",32,75],["DC",50,75],["DC",68,75],["AD",85,72],
      ["MC",40,55],["MC",60,55],
      ["MOC",50,40],
      ["BU",45,26],["BU",55,26]
    ],

    "5-3-2": [
      ["GB",50,92],
      ["AG",15,72],["DC",32,75],["DC",50,75],["DC",68,75],["AD",85,72],
      ["MC",35,55],["MC",50,55],["MC",65,55],
      ["BU",45,26],["BU",55,26]
    ],

    "5-4-1": [
      ["GB",50,92],
      ["AG",15,72],["DC",32,75],["DC",50,75],["DC",68,75],["AD",85,72],
      ["MG",25,50],["MC",45,55],["MC",55,55],["MD",75,50],
      ["BU",50,26]
    ]
  };

  /* =========================
     RENDER
     ========================= */

  function renderFormation(name) {
    pitch.querySelectorAll(".player").forEach(p => p.remove());

    FORMATIONS[name].forEach((p, i) => {
      const [role, x, y] = p;

      const player = document.createElement("div");
      player.className = "player";
      player.style.left = x + "%";
      player.style.top = y + "%";
      player.dataset.role = role;

      const img = document.createElement("img");
      img.src = role === "GB" ? KITS.gk : KITS[kitSelect.value];

      const label = document.createElement("div");
      label.className = "player-name";
      label.innerHTML = `Joueur ${i + 1}<br><small>${role}</small>`;

      player.addEventListener("click", () => {
        const name = prompt("Nom du joueur", label.textContent.split("\n")[0]);
        if (name) label.innerHTML = `${name}<br><small>${role}</small>`;
      });

      player.addEventListener("contextmenu", e => {
        e.preventDefault();
        document.querySelectorAll(".player.captain").forEach(p => p.classList.remove("captain"));
        player.classList.add("captain");
      });

      player.appendChild(img);
      player.appendChild(label);
      pitch.appendChild(player);
    });
  }

  formationSelect.addEventListener("change", e => renderFormation(e.target.value));
  kitSelect.addEventListener("change", () => renderFormation(formationSelect.value));
  pitch.addEventListener("contextmenu", e => e.preventDefault());

  renderFormation(formationSelect.value);
});






