# 📦 Panduan Instalasi Lengkap - Belajar Hewan

## 📋 Persyaratan Sistem

### Minimum Requirements
- **OS**: Windows 7+, macOS 10.12+, Linux (Ubuntu 16.04+)
- **Browser**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **RAM**: 2GB
- **Storage**: 500MB
- **Internet**: Untuk awal (library eksternal optional)

### Recommended
- **OS**: Windows 10/11, macOS Big Sur+, Ubuntu 20.04+
- **Browser**: Chrome/Edge latest
- **RAM**: 4GB+
- **Storage**: 1GB
- **Device untuk testing**: Smartphone/Tablet (Android/iOS)

---

## 🎯 Opsi Instalasi

### Opsi 1: Quick Start (Tanpa Install)
✅ **Paling mudah** - Langsung buka file HTML
❌ Beberapa fitur terbatas

**Langkah:**
1. Extract zip project
2. Double-click `index.html`
3. Buka di browser

**Kelemahan:**
- CORS issues mungkin terjadi
- Audio mungkin tidak work
- Web server tidak running

### Opsi 2: Local Web Server (Disarankan ⭐)
✅ **Recommended** - Full features support
✅ Mobile testing mudah
❌ Perlu install software

**A. Menggunakan Python** (Paling Simple)

Windows:
```bash
# Install Python dari python.org
# Buka command prompt, navigasi ke project folder

cd "C:\Users\[Username]\OneDrive\Dokumen\Belajar Hewan"
python -m http.server 8000
```

macOS/Linux:
```bash
cd ~/Documents/Belajar\ Hewan
python3 -m http.server 8000
```

**B. Menggunakan Node.js**

Install Node.js: https://nodejs.org (LTS version)

```bash
# Buka terminal/command prompt
# Navigate ke project folder

npm install -g http-server
http-server -p 8000
```

**C. Menggunakan PHP**

```bash
cd "path/to/Belajar Hewan"
php -S localhost:8000
```

**Akses:**
- Desktop: Buka browser, ketik `http://localhost:8000`
- Mobile: `http://[YOUR-IP]:8000`

### Opsi 3: VS Code (Development)
✅ **Best for Development**
✅ Live server included
✅ Debugging tools

**Setup:**
1. Install VS Code: https://code.visualstudio.com
2. Open folder project
3. Install extension: "Live Server" (Ritwick Dey)
4. Right-click `index.html` → Open with Live Server
5. Browser akan auto-open di `http://127.0.0.1:5500`

### Opsi 4: Docker (Advanced)
✅ **Isolated environment**
❌ Butuh install Docker

**Dockerfile:**
```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY . .
RUN npm install -g http-server
EXPOSE 8000
CMD ["http-server", "-p", "8000"]
```

**Run:**
```bash
docker build -t belajar-hewan .
docker run -p 8000:8000 belajar-hewan
```

---

## 🔍 Finding Your IP Address

### Windows
```powershell
# Buka Command Prompt
ipconfig

# Cari: IPv4 Address (biasanya 192.168.x.x atau 10.0.x.x)
```

### macOS
```bash
# Buka Terminal
ifconfig | grep inet

# Cari inet address (bukan 127.0.0.1)
```

### Linux
```bash
hostname -I
# atau
ip addr show
```

**Contoh:** Jika IP adalah `192.168.1.100`
- Di mobile: buka browser ketik `http://192.168.1.100:8000`

---

## 📱 Mobile Setup & Testing

### Android Phone via USB
```bash
# Install Android Debug Bridge (ADB)
# Atau: Android Studio → SDK Platform Tools

# Enable Developer Mode di phone:
# Settings → About → tap Build Number 7x → Enable USB Debugging

# Di command prompt:
adb reverse tcp:8000 tcp:8000

# Di browser mobile: localhost:8000
```

### iOS via Network
1. Find your IP (lihat section di atas)
2. Di iPhone Safari: `http://[YOUR-IP]:8000`

### Android via Network
1. Phone & Computer harus di network yang sama (WiFi)
2. Find your IP
3. Di Chrome mobile: `http://[YOUR-IP]:8000`

---

## ⚙️ Konfigurasi untuk Production

### 1. Disable Debug Mode
File: `js/config.js`
```javascript
debug: {
    enabled: false,  // ← Change to false
    logLevel: 'warn',
    showPerformanceMetrics: false,
    showGridOverlay: false
}
```

### 2. Enable Offline Mode
```javascript
features: {
    offlineMode: true  // ← Biarkan true
}
```

### 3. Compress Assets
```bash
# Install ImageMin
npm install -g imagemin-cli imagemin-jpeg imagemin-png-quant

# Compress images
imagemin assets/images/* --out-dir=assets/images
```

### 4. Minify JavaScript (Optional)
```bash
npm install -g terser

terser js/main.js -o js/main.min.js -c -m
```

---

## 🔧 Troubleshooting Setup

| Problem | Cause | Solution |
|---------|-------|----------|
| "Port 8000 already in use" | Other app using port | Use port lain: `http-server -p 8001` |
| "Cannot find python" | Python not installed | Install dari python.org |
| "CORS error" | Opening HTML directly | Use web server (tidak bisa buka file://) |
| "Module not found" | node_modules missing | Run `npm install` |
| "Permission denied" | Wrong permissions | `chmod +x` (Linux) |
| White/blank page | JavaScript error | Open DevTools (F12) → Console |

---

## 🌐 Mengakses Dari Jauh (Via Internet)

### Menggunakan Ngrok (Recommended)
```bash
# Install ngrok dari https://ngrok.com

# Terminal 1: Start web server
python -m http.server 8000

# Terminal 2: Expose ke internet
ngrok http 8000

# Dapatkan URL: https://xxx-xxx-xxx.ngrok.io
# Share URL ke orang lain
```

### Menggunakan Cloudflare Tunnel
```bash
# Install cloudflared
# Download dari: https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/

# Run tunnel
cloudflared tunnel --url localhost:8000
```

---

## 📊 Performance Tuning

### 1. Enable Compression (Apache)
File: `.htaccess`
```apache
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>
```

### 2. Cache Control (Apache)
```apache
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType text/html "access plus 1 day"
    ExpiresByType image/jpeg "access plus 30 days"
    ExpiresByType application/javascript "access plus 7 days"
</IfModule>
```

### 3. Lazy Load Assets
Edit `index.html`:
```html
<script src="js/main.js" defer></script>
```

---

## 🔐 Security Considerations

### 1. Secure HTTPS (Jika online)
```bash
# Using Let's Encrypt + Certbot
certbot certonly --standalone -d yourdomain.com

# Configure web server with SSL certificate
```

### 2. Content Security Policy
Add di `index.html`:
```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; script-src 'self' 'unsafe-inline'">
```

### 3. Disable Console (Production)
File: `js/config.js`
```javascript
if (!APP_CONFIG.debug.enabled) {
    console.log = function() {};
    console.error = function() {};
}
```

---

## 📦 Backup & Deployment

### Create Backup
```bash
# Zip semua file
# Windows: Right-click → Send to → Compressed folder
# macOS: Right-click → Compress
# Linux: tar -czf backup.tar.gz belajar-hewan/

# Or using command line:
zip -r belajar-hewan-backup.zip .
```

### Deploy ke Web Hosting

1. **Upload ke FTP/SFTP**
   - Buka FTP client (FileZilla)
   - Connect ke hosting
   - Drag folder ke public_html/

2. **Deploy ke GitHub Pages**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git push -u origin main
   
   # Di GitHub: Settings → Pages → Deploy from main branch
   ```

3. **Deploy ke Netlify**
   - Drag folder ke https://app.netlify.com
   - Auto deployed!

4. **Deploy ke Vercel**
   - Import project
   - Deploy dengan 1 klik

---

## 🎯 Verification Checklist

Setelah setup, pastikan:

- [ ] ✓ Aplikasi bisa diakses di browser
- [ ] ✓ Semua menu bisa diklik
- [ ] ✓ Console (F12) tidak ada error merah
- [ ] ✓ Audio bisa didengarkan (jika file ada)
- [ ] ✓ Game bisa dimainkan
- [ ] ✓ Responsive di mobile (F12 → Toggle device)
- [ ] ✓ Performance > 60 FPS (F12 → Performance)
- [ ] ✓ Bisa diakses dari mobile di network

---

## 📞 Support & Help

### If Something Goes Wrong

1. **Check Browser Console**
   - Press `F12` → Console
   - Look for red error messages
   - Report error message

2. **Check Network Tab**
   - F12 → Network
   - Reload page
   - Look for failed requests (red)

3. **Common Fixes**
   - Clear cache: Ctrl+Shift+Delete
   - Restart browser
   - Try different browser
   - Update browser

4. **Logs to Check**
   - Browser console (F12)
   - Server logs (terminal)
   - Error files in hosting

---

## 🚀 Next Steps Setelah Setup

1. **Customize untuk kebutuhan Anda**
   - Edit `js/config.js` - tambah hewan baru
   - Edit `css/style.css` - ganti warna tema
   - Edit `index.html` - ganti title & meta

2. **Tambah Audio Files**
   - Download suara hewan
   - Letakkan di `assets/sounds/animals/`

3. **(Dihapus) Setup Legacy Mode**
   - Catatan: Fitur lama tidak lagi didukung pada versi ini. Lihat catatan arsip jika diperlukan.

4. **Test di Mobile**
   - Ambil smartphone
   - Akses dari IP address
   - Test semua fitur

---

**Installation Complete! 🎉**

Aplikasi siap digunakan.

Terakhir diperbarui: Mei 2026

