let skor = 0;
let waktu = 30;
let timerInterval;

// Daftar data sampah dan kategorinya
const daftarSampah = [
    { emoji: "🍌", kategori: "organik", nama: "Pisang" },
    { emoji: "🍎", kategori: "organik", nama: "Apel" },
    { emoji: "🥤", kategori: "anorganik", nama: "Botol Plastik" },
    { emoji: "📦", kategori: "anorganik", nama: "Kardus" }
];

let sampahAktif = null;

const elemenSkor = document.getElementById("skor");
const elemenWaktu = document.getElementById("waktu");
const elemenSampah = document.getElementById("objek-sampah");
const tombolMulai = document.getElementById("btn-mulai");
const areaTong = document.querySelectorAll(".tong");

function mulaiGame() {
    skor = 0;
    waktu = 30;
    elemenSkor.innerText = skor;
    elemenWaktu.innerText = waktu;
    tombolMulai.style.display = "none";
    
    gantiSampahAcak();

    // Jalankan Hitung Mundur Waktu
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        waktu--;
        elemenWaktu.innerText = waktu;
        if (waktu <= 0) {
            clearInterval(timerInterval);
            alert(`Waktu Habis! Skor akhir kamu: ${skor}`);
            tombolMulai.style.display = "inline-block";
            elemenSampah.innerText = "🏁";
        }
    }, 1000);
}

// Memunculkan objek sampah acak baru
function gantiSampahAcak() {
    const randomIndex = Math.floor(Math.random() * daftarSampah.length);
    sampahAktif = daftarSampah[randomIndex];
    elemenSampah.innerText = sampahAktif.emoji;
    elemenSampah.setAttribute("data-kategori", sampahAktif.kategori);
}

// Mengatur event interaksi klik/sentuh ke tempat sampah
areaTong.forEach(tong => {
    tong.addEventListener("click", () => {
        if (waktu <= 0) return; // Jika game belum mulai atau habis

        const kategoriPilihan = tong.getAttribute("data-kategori");

        if (kategoriPilihan === sampahAktif.kategori) {
            skor += 10; // Benar
            elemenSkor.innerText = skor;
        } else {
            skor -= 5;  // Salah
            elemenSkor.innerText = skor;
        }

        // Munculkan sampah baru setelah dipilih
        gantiSampahAcak();
    });
});