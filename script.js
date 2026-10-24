
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

// Membuka dan menutup menu pada ponsel
menuToggle.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Tutup menu navigasi" : "Buka menu navigasi"
  );

  menuToggle.textContent = isOpen ? "✕" : "☰";
});

// Menutup menu setelah tautan dipilih
navMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Buka menu navigasi");
    menuToggle.textContent = "☰";
  });
});

// Tahun footer diperbarui secara otomatis
document.getElementById("year").textContent =
  new Date().getFullYear();
