// ===== 3D BACKGROUND =====
const canvas = document.getElementById('bgCanvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 2 + 1,
            speedX: (Math.random() - 0.5) * 0.5,
            speedY: (Math.random() - 0.5) * 0.5,
            color: `rgba(${Math.random() * 100 + 155}, ${Math.random() * 100}, 255, ${Math.random() * 0.5})`
        });
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(p => {
            p.x += p.speedX;
            p.y += p.speedY;
            
            if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
            if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
            
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// ===== AUTHENTICATION =====
document.addEventListener('DOMContentLoaded', function() {
    const googleBtn = document.getElementById('googleLoginBtn');
    
    if (googleBtn) {
        googleBtn.addEventListener('click', () => {
            auth.signInWithPopup(provider)
                .then((result) => {
                    const user = result.user;
                    // Simpan user data di sessionStorage
                    sessionStorage.setItem('userName', user.displayName);
                    sessionStorage.setItem('userEmail', user.email);
                    sessionStorage.setItem('userPhoto', user.photoURL);
                    
                    window.location.href = 'dashboard.html';
                })
                .catch((error) => {
                    alert('Login gagal: ' + error.message);
                });
        });
    }
    
    // Cek auth di dashboard
    if (window.location.pathname.includes('dashboard.html')) {
        const user = auth.currentUser;
        
        if (!user && !sessionStorage.getItem('userName')) {
            // Fallback ke sessionStorage atau redirect ke login
            if (!sessionStorage.getItem('userName')) {
                window.location.href = 'index.html';
            }
        }
        
        // Update UI dengan nama user
        updateUserUI();
    }
});

function updateUserUI() {
    const userName = sessionStorage.getItem('userName') || 'TUAN';
    const userEmail = sessionStorage.getItem('userEmail') || 'tuan@blackhitt.com';
    const userPhoto = sessionStorage.getItem('userPhoto') || 'https://ui-avatars.com/api/?name=' + userName;
    
    document.querySelectorAll('#userName, #welcomeName, .user-name-display').forEach(el => {
        if (el) el.textContent = userName.split(' ')[0];
    });
    
    document.getElementById('userEmail').textContent = userEmail;
    
    const profilePic = document.getElementById('profilePic');
    if (profilePic) {
        profilePic.src = userPhoto;
        profilePic.onerror = function() {
            this.src = 'https://ui-avatars.com/api/?name=' + userName;
        };
    }
}

function logout() {
    auth.signOut().then(() => {
        sessionStorage.clear();
        window.location.href = 'index.html';
    }).catch((error) => {
        // Fallback logout
        sessionStorage.clear();
        window.location.href = 'index.html';
    });
}

// ===== AI ASSISTANT REAL (GEMINI API) =====
const API_KEY = 'AIzaSyBp3QqVYcXH7LqjQqXH7LqjQqXH7LqjQqXH7LqjQ'; // Ganti dengan API key lu nanti
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

let aiMessages = [];

function toggleAI() {
    const window = document.getElementById('aiWindow');
    if (window) {
        window.style.display = window.style.display === 'none' ? 'block' : 'none';
    }
}

function handleAIKey(event) {
    if (event.key === 'Enter') {
        sendAIMessage();
    }
}

async function sendAIMessage() {
    const input = document.getElementById('aiInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    // Tampilkan pesan user
    addMessage(message, 'user');
    input.value = '';
    
    // Tampilkan loading
    addMessage('⏳ AI sedang mengetik...', 'bot loading');
    
    try {
        const response = await callGeminiAPI(message);
        // Hapus loading
        document.querySelectorAll('.loading').forEach(el => el.remove());
        addMessage(response, 'bot');
    } catch (error) {
        document.querySelectorAll('.loading').forEach(el => el.remove());
        addMessage('Maaf TUAN, AI lagi error. Coba lagi nanti ya!', 'bot');
    }
}

async function callGeminiAPI(prompt) {
    // Simulasi AI response (karena API key perlu didaftar sendiri)
    // Ini contoh respons AI yang mirip-mirip
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const userName = sessionStorage.getItem('userName') || 'TUAN';
    const lowerPrompt = prompt.toLowerCase();
    
    if (lowerPrompt.includes('harga') || lowerPrompt.includes('price')) {
        return `Halo ${userName}! Harga jasa di sini mulai 5K - 500K tergantung produknya. Mau tanya yang mana?`;
    } else if (lowerPrompt.includes('delta') || lowerPrompt.includes('gb')) {
        return `${userName}, Delta GB v3.4.3 punya fitur anti delete, blur UI, IOS style, dan 1000+ themes. Harganya premium, langsung klik aja buat order!`;
    } else if (lowerPrompt.includes('banned') && lowerPrompt.includes('wa')) {
        return `${userName}, jasa banned WA 75K, proses 2x24 jam. Garansi 100% work. Mau order?`;
    } else if (lowerPrompt.includes('unban')) {
        return `${userName}, unban WA 150K, proses 3-7 hari kerja. Nomor lu kena banned?`;
    } else if (lowerPrompt.includes('nokos')) {
        return `${userName}, nokos mulai 5K dapet 5 nomor. Bisa buat verifikasi WA, Telegram, IG.`;
    } else if (lowerPrompt.includes('owner') || lowerPrompt.includes('mr ucup')) {
        return `${userName}, owner MR UCUP ada di Telegram @mrblackhitt. Klik aja produk nanti langsung ke chat beliau!`;
    } else if (lowerPrompt.includes('terima kasih') || lowerPrompt.includes('thanks')) {
        return `Sama-sama ${userName}! Senang bisa bantu. Ada lagi yang mau ditanya?`;
    } else {
        return `${userName}, ada yang bisa aku bantu? Aku asisten pribadi buatan MR UCUP. Bisa tanya harga, fitur produk, atau cara order.`;
    }
}

function addMessage(text, sender) {
    const messagesDiv = document.getElementById('aiMessages');
    if (!messagesDiv) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender.includes('loading') ? 'bot' : sender}`;
    
    const avatar = document.createElement('div');
    avatar.className = 'avatar';
    avatar.innerHTML = sender === 'user' ? '<i class="fas fa-user"></i>' : '<i class="fas fa-robot"></i>';
    
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    bubble.textContent = text;
    
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(bubble);
    messagesDiv.appendChild(messageDiv);
    
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// ===== FAKE ONLINE COUNTER =====
const onlineCount = document.getElementById('onlineCount');
if (onlineCount) {
    function updateOnlineCounter() {
        const base = 1337;
        const random = Math.floor(Math.random() * 500) + 800;
        onlineCount.textContent = (base + random).toLocaleString();
    }
    setInterval(updateOnlineCounter, 8000);
}

// ===== FAKE RECENT PURCHASES =====
const purchases = [
    { name: 'Andi', product: 'Delta GB', price: '75K' },
    { name: 'Budi', product: 'Banned WA', price: '75K' },
    { name: 'Citra', product: 'Nokos', price: '25K' },
    { name: 'Deni', product: 'Unban WA', price: '150K' },
    { name: 'Eka', product: 'GBWhatsApp', price: '50K' },
    { name: 'Fajar', product: 'Banned IG', price: '50K' },
    { name: 'Gita', product: 'Web Suntik', price: '100K' },
    { name: 'Hendra', product: 'FM WhatsApp', price: '60K' }
];

const purchaseTicker = document.getElementById('purchaseTicker');
if (purchaseTicker) {
    let index = 0;
    setInterval(() => {
        const p = purchases[index % purchases.length];
        purchaseTicker.innerHTML = `
            <div class="purchase-item-modern">
                <span><i class="fas fa-user-circle"></i> <span class="name">${p.name}***</span></span>
                <span class="product">${p.product}</span>
                <span class="price">${p.price}</span>
                <span><i class="fas fa-clock"></i> ${Math.floor(Math.random() * 5) + 1} menit lalu</span>
            </div>
        `;
        index++;
    }, 6000);
}

// ===== FAKE VIEWER COUNTS =====
setInterval(() => {
    document.querySelectorAll('.viewer-badge').forEach(el => {
        const current = parseInt(el.textContent.replace(/\D/g, ''));
        const change = Math.floor(Math.random() * 10) - 3;
        let newCount = current + change;
        if (newCount < 50) newCount = 50 + Math.floor(Math.random() * 100);
        el.textContent = newCount + ' lihat';
    });
}, 10000);

// ===== TESTIMONIALS =====
const testimonials = [
    { name: 'Andi Pratama', product: 'Delta GB', text: 'Mantap bos! Delta GB work 100% anti delete. Udah order 3x selalu puas.', rating: 5, date: '2 jam lalu' },
    { name: 'Budi Santoso', product: 'Banned WA', text: 'Langsung work dalam 1 jam. Mantap MR UCUP!', rating: 5, date: '5 jam lalu' },
    { name: 'Citra Dewi', product: 'Unban WA', text: 'Akhirnya nomor WA balik setelah 2 minggu banned. Makasih banyak!', rating: 5, date: '1 hari lalu' },
    { name: 'Deni Kurniawan', product: 'Nokos', text: 'Nokos murah meriah, bisa buat verifikasi semua platform.', rating: 4, date: '3 jam lalu' },
    { name: 'Eka Putri', product: 'GBWhatsApp', text: 'Fitur lengkap, ga pernah error. Recomended!', rating: 5, date: '6 jam lalu' },
    { name: 'Fajar Hidayat', product: 'Banned IG', text: 'Instagram rival kerjaan langsung tumbang. Puas!', rating: 5, date: '2 hari lalu' },
    { name: 'Gita Anggraini', product: 'FM WhatsApp', text: 'Tema banyak, privasi aman. Mantap jiwa!', rating: 5, date: '4 jam lalu' },
    { name: 'Hendra Wijaya', product: 'Web Suntik', text: 'Tools inject followers, daily 1000+ aman terus.', rating: 4, date: '1 hari lalu' },
    { name: 'Intan Permata', product: 'Spotify Premium', text: 'Akun premium 1 tahun, ga kena log out. Recomended!', rating: 5, date: '3 jam lalu' },
    { name: 'Joko Susilo', product: 'Hacking IG', text: 'Bisa hack IG mantan, work dalam 2 jam. Makasih MR UCUP!', rating: 5, date: '5 jam lalu' }
];

function loadTestimonials(count = 12) {
    const grid = document.getElementById('testimonialsGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    for (let i = 0; i < count; i++) {
        const t = testimonials[i % testimonials.length];
        const rating = '★'.repeat(t.rating) + '☆'.repeat(5 - t.rating);
        
        grid.innerHTML += `
            <div class="testimonial-card-modern">
                <div class="testimonial-header-modern">
                    <div class="testimonial-avatar-modern">${t.name.charAt(0)}</div>
                    <div>
                        <div class="testimonial-name-modern">${t.name}</div>
                        <div class="testimonial-date-modern">${t.date}</div>
                    </div>
                </div>
                <div class="testimonial-text">"${t.text}"</div>
                <div class="testimonial-rating-modern">${rating}</div>
                <span class="testimonial-product-modern">${t.product}</span>
            </div>
        `;
    }
}

function loadMoreTestimonials() {
    const currentCount = document.querySelectorAll('.testimonial-card-modern').length;
    loadTestimonials(currentCount + 12);
}

// ===== SIDEBAR TOGGLE =====
function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('collapsed');
}

// ===== SECTION NAVIGATION =====
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show selected section
    document.getElementById(sectionId).classList.add('active');
    
    // Update active nav
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    event?.target.closest('.nav-item')?.classList.add('active');
    
    // Update page title
    const titles = {
        'home': 'Beranda',
        'services': 'Jasa Premium',
        'apps': 'WA Mods',
        'other-apps': 'Aplikasi Premium',
        'testimonials': 'Testimonial',
        'groups': 'Komunitas'
    };
    document.getElementById('pageTitle').textContent = titles[sectionId] || 'Beranda';
}

// ===== REDIRECT TO OWNER =====
function redirectOwner(product) {
    const ownerUsername = 'mrblackhitt';
    const userName = sessionStorage.getItem('userName') || 'TUAN';
    const message = encodeURIComponent(`Halo MR UCUP, saya ${userName} mau order: ${product}. Mohon info detailnya.`);
    window.open(`https://t.me/${ownerUsername}?text=${message}`, '_blank');
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', function() {
    // Load testimonials if on dashboard
    if (document.getElementById('testimonialsGrid')) {
        loadTestimonials(12);
    }
    
    // Set default section
    if (document.querySelector('.content-section')) {
        showSection('home');
    }
});

// ===== RESIZE HANDLER =====
window.addEventListener('resize', () => {
    if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
});
