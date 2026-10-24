
document.addEventListener("DOMContentLoaded", () => {
  const slideIds = ["home", "about", "story", "contact"];
  const slides = slideIds
    .map(id => document.getElementById(id))
    .filter(Boolean);

  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");

  function showSlide(id) {
    const target = document.getElementById(id);

    if (!target || !slideIds.includes(id)) return;

    // Matikan semua halaman terlebih dahulu
    slides.forEach(slide => {
      slide.classList.remove("active");
    });

    // Tampilkan hanya halaman yang dipilih
    target.classList.add("active");

    // Perbarui indikator nomor halaman
    const indicator = target.querySelector(".slide-indicator");

    if (indicator) {
      const number = slideIds.indexOf(id) + 1;
      indicator.textContent =
        `${String(number).padStart(2, "0")} / ${String(slideIds.length).padStart(2, "0")}`;
    }

    // Kembali ke bagian paling atas
    window.scrollTo(0, 0);

    // Tutup menu navigasi
    if (navMenu) navMenu.classList.remove("open");

    if (menuToggle) {
      menuToggle.textContent = "☰";
      menuToggle.setAttribute("aria-expanded", "false");
    }

    // Perbarui alamat hash tanpa menggulir halaman
    history.replaceState(null, "", `#${id}`);
  }

  // Tombol Selanjutnya
  document.querySelectorAll("[data-next]").forEach(button => {
    button.addEventListener("click", () => {
      showSlide(button.dataset.next);
    });
  });

  // Tombol Kembali
  document.querySelectorAll("[data-back]").forEach(button => {
    button.addEventListener("click", () => {
      showSlide(button.dataset.back);
    });
  });

  // Navigasi menu
  if (navMenu) {
    navMenu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", event => {
        const id = link.getAttribute("href").slice(1);

        if (slideIds.includes(id)) {
          event.preventDefault();
          showSlide(id);
        }
      });
    });
  }

  // Menu ponsel
  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("open");

      menuToggle.textContent = isOpen ? "✕" : "☰";
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  // Tahun footer
  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // Mulai selalu dari Home
  showSlide("home");
});
