# Situs Pengenalan KAPAL KARAM

Situs statis berbahasa Indonesia untuk memperkenalkan proyek controller robot kapal apung berbasis ESP32 dan aplikasi Flutter. Tidak memerlukan instalasi package tambahan; server lokal menggunakan Node.js bawaan.

## Jalankan dari terminal VS Code

Pastikan Node.js tersedia, buka folder ini di VS Code, lalu jalankan:

```powershell
npm run dev
```

Buka alamat yang ditampilkan di terminal, biasanya `http://localhost:3000`. Hentikan server dengan `Ctrl+C`.

Server hanya melayani situs lokal di komputer sendiri. Untuk kontrol Bluetooth BLE, gunakan aplikasi Flutter pada Android; situs ini adalah halaman pengenalan proyek, bukan controller kapal.

## Deploy otomatis ke GitHub Pages

Workflow `.github/workflows/deploy.yml` menerbitkan isi folder `public/` ke GitHub Pages setiap kali ada push ke branch `main`.

1. Buat repository GitHub publik dan unggah seluruh isi folder proyek ini.
2. Pada repository GitHub, buka **Settings → Pages**, lalu pada **Build and deployment → Source** pilih **GitHub Actions**.
3. Buka tab **Actions** dan tunggu workflow **Deploy to GitHub Pages** berhasil.
4. Situs akan tersedia di `https://USERNAME.github.io/NAMA-REPOSITORY/`.

Perubahan pada folder `public/` akan diperbarui otomatis setelah di-push ke branch `main`. Aset web menggunakan path relatif agar tetap berjalan pada URL GitHub Pages tersebut.
