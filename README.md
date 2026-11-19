# Situs Pengenalan KAPAL KARAM

Situs statis berbahasa Indonesia untuk memperkenalkan proyek controller robot kapal apung berbasis ESP32 dan aplikasi Flutter. Tidak memerlukan instalasi package tambahan; server lokal menggunakan Node.js bawaan.

Antarmuka dilengkapi animasi ringan, parallax pointer pada ilustrasi hero, navigasi responsif, indikator progres baca, dan reveal saat scroll. Preferensi `prefers-reduced-motion` dihormati agar gerak dapat diminimalkan dari pengaturan perangkat.

## Jalankan dari terminal VS Code

Pastikan Node.js tersedia, buka folder ini di VS Code, lalu jalankan:

```powershell
npm run dev
```

Buka alamat yang ditampilkan di terminal, biasanya `http://localhost:3000`. Hentikan server dengan `Ctrl+C`.

Server hanya melayani situs lokal di komputer sendiri. Untuk kontrol Bluetooth BLE, gunakan aplikasi Flutter pada Android; situs ini adalah halaman pengenalan proyek, bukan controller kapal.

## Deploy otomatis ke GitHub Pages

Workflow `.github/workflows/deploy.yml` menerbitkan isi folder `public/` ke GitHub Pages setiap kali ada push ke branch `main`.

1. Buat repository **publik dan kosong** di GitHub. Jangan centang opsi untuk menambahkan README, license, atau `.gitignore`.
2. Dari terminal di folder proyek, hubungkan repository baru lalu unggah branch `main`:

   ```powershell
   git remote add origin https://github.com/USERNAME/NAMA-REPOSITORY.git
   git push -u origin main
   ```

   Ganti `USERNAME` dan `NAMA-REPOSITORY` sesuai repository GitHub Anda.
3. Pada repository GitHub, buka **Settings → Pages**, lalu pada **Build and deployment → Source** pilih **GitHub Actions**.
4. Buka tab **Actions** dan tunggu workflow **Deploy to GitHub Pages** berhasil.
5. Situs akan tersedia di `https://USERNAME.github.io/NAMA-REPOSITORY/`.

Perubahan pada folder `public/` akan diperbarui otomatis setelah di-push ke branch `main`. Aset web menggunakan path relatif agar tetap berjalan pada URL GitHub Pages tersebut.

Website menyediakan tautan repository dan unduhan ZIP langsung dari branch `main` di GitHub. ZIP itu berisi sumber situs pengenalan; aplikasi controller Flutter merupakan folder proyek terpisah.

link website pengenalan : https://riseterlan-eng.github.io/RoboShip-Controller-with-ESP32--Vite-Version
