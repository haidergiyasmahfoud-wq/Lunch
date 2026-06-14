// ============================================================================
//  ملف JavaScript الرئيسي - دليل المطاعم السورية "هل أنت جائع؟"
//  يعمل مع ملف index.html المقدم
// ============================================================================

// ---------- AOS Animation Initialization ----------
AOS.init({ duration: 600, once: true, disable: 'mobile' });

// ---------- Hero Slider (Swiper) ----------
const heroSwiper = new Swiper('.heroSwiper', {
    loop: true,
    autoplay: { delay: 4000 },
    pagination: { el: '.swiper-pagination', clickable: true },
    effect: 'fade',
    speed: 800,
});

// ---------- Scroll to Top Button ----------
const scrollTopBtn = document.getElementById('scrollTop');
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    header.classList.toggle('scrolled', window.scrollY > 50);
    scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
});

// ---------- Floating Background Shapes ----------
(function createShapes() {
    const shapesContainer = document.getElementById('shapes');
    if (!shapesContainer) return;
    for (let i = 0; i < 20; i++) {
        const shape = document.createElement('div');
        shape.className = 'shape';
        const size = Math.random() * 70 + 20;
        Object.assign(shape.style, {
            width: size + 'px',
            height: size + 'px',
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
            animationDelay: Math.random() * 20 + 's',
            animationDuration: Math.random() * 25 + 15 + 's'
        });
        shapesContainer.appendChild(shape);
    }
})();

// ---------- Dark Mode Toggle ----------
function toggleDarkMode() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const newTheme = isDark ? '' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('darkMode', newTheme);
}

// Apply saved or system dark mode preference
(function applyDarkMode() {
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'dark' || (!savedDarkMode && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
})();

// ---------- Lazy Loading Images ----------
const lazyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.onload = () => img.classList.add('loaded');
                img.removeAttribute('data-src');
                lazyObserver.unobserve(img);
            }
        }
    });
}, { rootMargin: '150px' });

function observeLazyImages() {
    document.querySelectorAll('img[data-src]').forEach(img => lazyObserver.observe(img));
}

// ---------- Toast Notification ----------
function showToast(msg) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(() => toast.classList.remove('show'), 2500);
}

// ---------- Mobile Search Overlay ----------
function openMobileSearch() {
    const overlay = document.getElementById('mobileSearchOverlay');
    overlay.classList.add('active');
    setTimeout(() => {
        const input = document.getElementById('mobileSearchInput');
        if (input) input.focus();
    }, 400);
}
function closeMobileSearch() {
    document.getElementById('mobileSearchOverlay').classList.remove('active');
}

// ---------- Mobile Menu Sidebar ----------
function openMobileMenu() {
    document.getElementById('mobileMenuSidebar').classList.add('active');
    document.getElementById('mobileMenuBackdrop').classList.add('active');
    document.body.style.overflow = 'hidden';
}
function closeMobileMenu() {
    document.getElementById('mobileMenuSidebar').classList.remove('active');
    document.getElementById('mobileMenuBackdrop').classList.remove('active');
    document.body.style.overflow = '';
}

// ---------- Quick Search (from mobile suggestions) ----------
function quickSearch(term) {
    const input = document.getElementById('mobileSearchInput');
    if (input) input.value = term;
    closeMobileSearch();
    globalSearch(term);
}

// ---------- Bottom Navigation Active State ----------
function setActiveNav(el) {
    document.querySelectorAll('.bottom-nav-item').forEach(item => item.classList.remove('active'));
    el.classList.add('active');
}

// ---------- Data Definitions ----------
const provinces = [
    "دمشق", "ريف دمشق", "حلب", "حمص", "حماة", "اللاذقية", "طرطوس",
    "دير الزور", "الحسكة", "الرقة", "إدلب", "السويداء", "درعا", "القنيطرة"
];

const cuisineTypes = [
    'مشاوي', 'مأكولات بحرية', 'بيتزا وباستا', 'برغر', 'مطبخ شرقي',
    'مطبخ غربي', 'حلويات', 'مقبلات', 'أكلات شعبية', 'بوفيه مفتوح'
];

const restaurantNames = [
    'أبو السعد', 'الديار', 'الفردوس', 'القصر', 'الزهرة', 'النجمة', 'البستان',
    'النخيل', 'سهارى', 'ليالي', 'ألف ليلة', 'بوابة الشام', 'جبل العرب',
    'باب توما', 'المأذنة', 'القلعة', 'البارون', 'شهرزاد', 'ميراج', 'رويال',
    'جراند', 'بلازا', 'فاخر', 'مشاوي العاصمة', 'سمك وشوي', 'طازج', 'سوريانا'
];

const adjectives = ['الذهبي', 'الفضي', 'التراثي', 'الحديث', 'الفاخر', 'الرائع', 'المميز', 'الحصري'];

const imagePool = [
    'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg',
    'https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg',
    'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg',
    'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg',
    'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
    'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg',
    'https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg',
];

const provinceCoords = {
    'دمشق': { lat: 33.5138, lng: 36.2765 }, 'ريف دمشق': { lat: 33.5, lng: 36.3 },
    'حلب': { lat: 36.2021, lng: 37.1343 }, 'حمص': { lat: 34.7321, lng: 36.7105 },
    'حماة': { lat: 35.135, lng: 36.7514 }, 'اللاذقية': { lat: 35.531, lng: 35.7909 },
    'طرطوس': { lat: 34.889, lng: 35.886 }, 'دير الزور': { lat: 35.338, lng: 40.144 },
    'الحسكة': { lat: 36.511, lng: 40.743 }, 'الرقة': { lat: 35.959, lng: 39.018 },
    'إدلب': { lat: 35.933, lng: 36.633 }, 'السويداء': { lat: 32.706, lng: 36.569 },
    'درعا': { lat: 32.624, lng: 36.102 }, 'القنيطرة': { lat: 33.124, lng: 35.823 }
};

const provinceIcons = {
    'دمشق': 'landmark', 'ريف دمشق': 'tree', 'حلب': 'city', 'حمص': 'industry',
    'حماة': 'water', 'اللاذقية': 'umbrella-beach', 'طرطوس': 'ship',
    'دير الزور': 'bridge', 'الحسكة': 'mountain', 'الرقة': 'mosque',
    'إدلب': 'leaf', 'السويداء': 'gem', 'درعا': 'fort-awesome', 'القنيطرة': 'hill-rockslide'
};

const provinceImages = {
    'دمشق': 'https://imgur.com/qxbKmUp.jpg', 'ريف دمشق': 'https://imgur.com/JuyiJQI.jpg',
    'حلب': 'https://imgur.com/CIQfzQe.jpg', 'حمص': 'https://imgur.com/OSJci2j.jpg',
    'حماة': 'https://imgur.com/8bAdiEp.jpg', 'اللاذقية': 'https://imgur.com/nvTadsG.jpg',
    'طرطوس': 'https://imgur.com/tzXN4rF.jpg', 'دير الزور': 'https://imgur.com/PAywOu1.jpg',
    'الحسكة': 'https://imgur.com/xhhxnjH.jpg', 'الرقة': 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=600&h=400&fit=crop',
    'إدلب': 'https://imgur.com/J6rg244.jpg', 'السويداء': 'https://imgur.com/iEa5b0S.jpg',
    'درعا': 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600&h=400&fit=crop',
    'القنيطرة': 'https://imgur.com/QlsJK5A.jpg'
};

const provinceInfo = {
    'دمشق': { desc: 'أقدم عاصمة مأهولة في التاريخ، قلب العالم العربي النابض.', famous: 'الجامع الأموي، ضريح صلاح الدين' },
    'ريف دمشق': { desc: 'تضم أجمل المصايف: الزبداني، بلودا، معلولا، وصيدنايا.', famous: 'معلولا، الزبداني' },
    'حلب': { desc: 'العاصمة الاقتصادية، تشتهر بقلعتها وأسواقها المسقوفة.', famous: 'قلعة حلب، السوق المسقوف' },
    'حمص': { desc: 'ثالث أكبر مدينة، بوابة الشمال.', famous: 'قلعة الحصن، جامع خالد بن الوليد' },
    'حماة': { desc: 'مدينة النواعير على نهر العاصي.', famous: 'النواعير، نهر العاصي' },
    'اللاذقية': { desc: 'عروس الساحل السوري على البحر المتوسط.', famous: 'شاطئ الكورنيش، أوغاريت' },
    'طرطوس': { desc: 'لؤلؤة المتوسط، جزيرة أرواد الفينيقية.', famous: 'جزيرة أرواد' },
    'دير الزور': { desc: 'واحة الفرات الخضراء.', famous: 'الجسر المعلق، نهر الفرات' },
    'الحسكة': { desc: 'سلة غذاء سوريا، أرض الجزيرة الخصبة.', famous: 'نهر الخابور' },
    'الرقة': { desc: 'عاصمة الرشيد التاريخية.', famous: 'قصر البنات، بحيرة الأسد' },
    'إدلب': { desc: 'أرض الزيتون والطبيعة.', famous: 'مملكة إيبلا' },
    'السويداء': { desc: 'جبل العرب، أرض الكروم والتفاح.', famous: 'آثار شهبا' },
    'درعا': { desc: 'مهد الثورة العربية الكبرى.', famous: 'مدرج بصرى' },
    'القنيطرة': { desc: 'مرتفعات الجولان الخضراء.', famous: 'غابات الجولان' }
};

// ---------- Generate Random Restaurants ----------
function generateRestaurants(province, count = 50) {
    const restaurants = [];
    const coords = provinceCoords[province] || { lat: 33.5, lng: 36.3 };
    for (let i = 0; i < count; i++) {
        const randomName = restaurantNames[Math.floor(Math.random() * restaurantNames.length)];
        const randomAdj = adjectives[Math.floor(Math.random() * adjectives.length)];
        const cuisine = cuisineTypes[Math.floor(Math.random() * cuisineTypes.length)];
        const rating = (3.5 + Math.random() * 1.5);
        const priceLevel = Math.floor(Math.random() * 4) + 1;
        const priceRange = ['$', '$$', '$$$', '$$$$'][priceLevel - 1];
        const hourStart = Math.floor(Math.random() * 6 + 8);
        const hourEnd = Math.floor(Math.random() * 6 + 20);
        restaurants.push({
            id: `${province}_${i}`,
            name: `${randomName} ${randomAdj}`,
            cuisine,
            rating: parseFloat(rating.toFixed(1)),
            priceRange,
            priceLevel,
            description: `✨ أحد أرقى مطاعم ${province}، يقدم ألذ المأكولات ${cuisine} بأجواء راقية وخدمة ممتازة.`,
            address: `${province} - شارع ${['الفرنسي', 'بغداد', 'الجامعة', 'الصالحية', 'المالكي', 'الشام', 'العروبة'][Math.floor(Math.random()*7)]}`,
            phone: `09${Math.floor(Math.random() * 9000000 + 1000000)}`,
            image: imagePool[Math.floor(Math.random() * imagePool.length)] + `?w=600&h=400&random=${i}`,
            openingHours: `${hourStart}:00 صباحاً - ${hourEnd}:00 مساءً`,
            hourStart,
            hourEnd,
            lat: coords.lat + (Math.random() - 0.5) * 0.08,
            lng: coords.lng + (Math.random() - 0.5) * 0.08,
            reviews: []
        });
    }
    return restaurants;
}

// ---------- Global Restaurant Storage ----------
const allRestaurants = {};
provinces.forEach(p => {
    allRestaurants[p] = generateRestaurants(p, 50);
});

// ---------- Favorites Management ----------
let favorites = JSON.parse(localStorage.getItem('restaurant_favorites') || '[]');

function saveFavorites() {
    localStorage.setItem('restaurant_favorites', JSON.stringify(favorites));
    updateFavCount();
}

function isFavorite(province, restId) {
    return favorites.some(f => f.province === province && f.id === restId);
}

function toggleFavorite(province, restId, event) {
    if (event) event.stopPropagation();
    const idx = favorites.findIndex(f => f.province === province && f.id === restId);
    if (idx > -1) {
        favorites.splice(idx, 1);
        showToast('تمت الإزالة من المفضلة');
    } else {
        favorites.push({ province, id: restId });
        showToast('تمت الإضافة للمفضلة ❤️');
    }
    saveFavorites();
    renderCurrentPage();
}

function updateFavCount() {
    const el = document.getElementById('favCount');
    if (!el) return;
    el.textContent = favorites.length;
    el.style.display = favorites.length > 0 ? 'flex' : 'none';
}

// ---------- Display Favorites Page ----------
function showFavorites() {
    if (favorites.length === 0) {
        showToast('لا توجد مطاعم مفضلة');
        return;
    }
    document.getElementById('mainPage').style.display = 'none';
    const container = document.getElementById('cityPagesContainer');
    let html = '';
    favorites.forEach(fav => {
        const rest = allRestaurants[fav.province]?.find(r => r.id === fav.id);
        if (rest) html += createRestaurantCard(fav.province, rest);
    });
    container.innerHTML = `
        <div class="city-page active">
            <button class="back-btn" onclick="goBack()"><i class="fas fa-arrow-right"></i> العودة للرئيسية</button>
            <div class="city-header"><h2>❤️ مطاعمي المفضلة</h2></div>
            <div class="restaurants-grid">${html}</div>
        </div>
    `;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(observeLazyImages, 200);
    lastRenderedPage = 'favorites';
}

// ---------- Review System ----------
let currentReviewRestaurant = null,
    currentReviewProvince = null,
    selectedRating = 0;

function initStarInput() {
    const stars = document.querySelectorAll('#starInput i');
    stars.forEach(star => {
        star.addEventListener('click', function () {
            selectedRating = parseInt(this.dataset.star);
            stars.forEach(s => {
                s.className = parseInt(s.dataset.star) <= selectedRating ? 'fas fa-star active' : 'far fa-star';
            });
        });
    });
}

function submitReview() {
    if (!currentReviewProvince || !currentReviewRestaurant) return;
    const text = document.getElementById('reviewText').value.trim();
    if (!text && selectedRating === 0) return;
    const rest = allRestaurants[currentReviewProvince].find(r => r.id === currentReviewRestaurant);
    if (!rest) return;
    rest.reviews.push({
        rating: selectedRating,
        text,
        date: new Date().toLocaleDateString('ar-SY')
    });
    document.getElementById('reviewText').value = '';
    selectedRating = 0;
    document.querySelectorAll('#starInput i').forEach(s => s.className = 'far fa-star');
    showToast('تم حفظ تقييمك! ⭐');
    renderReviews(rest);
}

function renderReviews(rest) {
    const container = document.getElementById('existingReviews');
    if (!container) return;
    if (!rest.reviews || rest.reviews.length === 0) {
        container.innerHTML = '<p style="color:var(--text-secondary);font-size:0.75rem;">لا توجد تقييمات بعد</p>';
        return;
    }
    container.innerHTML = rest.reviews.slice().reverse().map(r => `
        <div class="review-item">
            <div class="review-stars">${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</div>
            ${r.text ? `<p>${r.text}</p>` : ''}
            <small style="color:var(--text-secondary);">${r.date}</small>
        </div>
    `).join('');
}

// ---------- Share Buttons Setup ----------
function setupShareButtons(province, rest) {
    const shareText = encodeURIComponent(`شاهد مطعم ${rest.name} في ${province} - تقييم ${rest.rating}⭐`);
    const shareUrl = encodeURIComponent(window.location.href);
    const whatsappBtn = document.getElementById('shareWhatsapp');
    const facebookBtn = document.getElementById('shareFacebook');
    const telegramBtn = document.getElementById('shareTelegram');
    if (whatsappBtn) whatsappBtn.onclick = () => window.open(`https://wa.me/?text=${shareText}%20${shareUrl}`, '_blank');
    if (facebookBtn) facebookBtn.onclick = () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}&quote=${shareText}`, '_blank');
    if (telegramBtn) telegramBtn.onclick = () => window.open(`https://t.me/share/url?url=${shareUrl}&text=${shareText}`, '_blank');
}

// ---------- Geolocation & Nearby ----------
let userLocation = null;

function findNearbyRestaurants() {
    const btn = document.getElementById('nearbyBtn');
    if (!btn) return;
    btn.classList.add('loading');
    if (!navigator.geolocation) {
        showToast('لم نتمكن من الوصول لموقعك');
        btn.classList.remove('loading');
        return;
    }
    navigator.geolocation.getCurrentPosition(
        pos => {
            userLocation = { lat: pos.coords.latitude, lng: pos.coords.longitude };
            displayNearbyRestaurants();
            btn.classList.remove('loading');
        },
        err => {
            showToast('لم نتمكن من الوصول لموقعك');
            btn.classList.remove('loading');
        }, { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 }
    );
}

function getDistance(lat1, lng1, lat2, lng2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180,
        dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLng / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function displayNearbyRestaurants() {
    if (!userLocation) return;
    let all = [];
    for (const p in allRestaurants) {
        allRestaurants[p].forEach(r => {
            all.push({
                ...r,
                province: p,
                distance: getDistance(userLocation.lat, userLocation.lng, r.lat, r.lng)
            });
        });
    }
    all.sort((a, b) => a.distance - b.distance);
    if (!all.length) {
        showToast('لا توجد مطاعم قريبة');
        return;
    }
    document.getElementById('mainPage').style.display = 'none';
    document.getElementById('cityPagesContainer').innerHTML = `
        <div class="city-page active">
            <button class="back-btn" onclick="goBack()"><i class="fas fa-arrow-right"></i> العودة للرئيسية</button>
            <div class="city-header"><h2>📍 أقرب المطاعم منك</h2></div>
            <div class="restaurants-grid">${all.slice(0, 20).map(r => createRestaurantCard(r.province, r, r.distance)).join('')}</div>
        </div>
    `;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(observeLazyImages, 200);
    lastRenderedPage = 'nearby';
}

// ---------- About Syria Page ----------
window.showAboutSyria = function () {
    document.getElementById('mainPage').style.display = 'none';
    const container = document.getElementById('cityPagesContainer');
    const landmarks = 'الجامع الأموي (دمشق)، قلعة حلب، قلعة الحصن (حمص)، النواعير (حماة)، أوغاريت (اللاذقية)، جزيرة أرواد (طرطوس)، دورا أوروبوس (دير الزور)، مملكة إيبلا (إدلب)، مدرج بصرى (درعا)، مرتفعات الجولان (القنيطرة)';
    const facts = 'المساحة: 185,180 كم² | السكان: ~22 مليون | العاصمة: دمشق | اللغة: العربية | العملة: الليرة السورية | مهد الأبجدية الأولى | أقدم عاصمة مأهولة';
    container.innerHTML = `
        <div class="about-page city-page active">
            <button class="back-btn" onclick="goBack()"><i class="fas fa-arrow-right"></i> العودة للرئيسية</button>
            <div class="about-hero">
                <h1>عن سوريا - أرض الحضارات</h1>
                <p>مهد أقدم الحضارات في التاريخ وأجمل مطبخ في العالم العربي</p>
            </div>
            <div class="about-grid">
                <div class="about-card">
                    <h3>📜 لمحة تاريخية</h3>
                    <p>سوريا من أقدم مناطق العالم المأهولة، قامت فيها حضارات عريقة: الآرامية، الفينيقية، الآشورية، البابلية، الفارسية، الإغريقية، الرومانية، البيزنطية، والإسلامية. دمشق أقدم عاصمة مأهولة في التاريخ.</p>
                </div>
                <div class="about-card">
                    <h3>🍽️ المطبخ السوري</h3>
                    <p>يعتبر من أغنى المطابخ العربية والعالمية. أشهر أكلاته: الكبة، اليبرق، الشاورما، الفتوش، التبولة، المقادم، الهريسة، الكنافة، البقلاوة، المعروك، والمشاوي.</p>
                </div>
                <div class="about-card">
                    <h3>🏛️ أشهر المعالم</h3>
                    <p>${landmarks}</p>
                </div>
                <div class="about-card">
                    <h3>📊 حقائق سريعة</h3>
                    <p>${facts}</p>
                </div>
            </div>
            <h2 class="section-title">🗺️ المحافظات السورية</h2>
            <div class="province-detail-grid">
                ${provinces.map(p => {
                    const info = provinceInfo[p] || { desc: '', famous: '' };
                    return `
                        <div class="province-detail-card" onclick="showCityPage('${p}')">
                            <img src="${provinceImages[p]}" alt="${p}" loading="lazy" data-src="${provinceImages[p]}">
                            <div class="detail-body">
                                <h4><i class="fas fa-${provinceIcons[p] || 'city'}" style="color:var(--primary);margin-left:5px;"></i> ${p}</h4>
                                <p>${info.desc}</p>
                                <p style="margin-top:4px;font-weight:500;color:var(--primary);font-size:0.68rem;">🏛️ ${info.famous}</p>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        </div>
    `;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(observeLazyImages, 200);
    lastRenderedPage = 'about';
};

// ---------- Provinces Slider ----------
let provincesSwiper;

function renderProvinces() {
    const wrapper = document.getElementById('provincesWrapper');
    if (!wrapper) return;
    wrapper.innerHTML = provinces.map(p => `
        <div class="swiper-slide">
            <div class="province-card" onclick="showCityPage('${p}')">
                <img src="${provinceImages[p]}" alt="${p}" class="province-image" loading="lazy" data-src="${provinceImages[p]}">
                <div class="province-card-body">
                    <div class="province-icon"><i class="fas fa-${provinceIcons[p] || 'city'}"></i></div>
                    <div class="province-name">${p}</div>
                    <div class="restaurant-count">🍽️ ${allRestaurants[p].length} مطعم</div>
                </div>
            </div>
        </div>
    `).join('');

    if (provincesSwiper) provincesSwiper.destroy(true, true);
    const isMobile = window.innerWidth < 1024;
    provincesSwiper = new Swiper('#provincesSwiper', {
        slidesPerView: isMobile ? 1.5 : 3.5,
        spaceBetween: isMobile ? 10 : 25,
        loop: true,
        autoplay: { delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true },
        pagination: { el: '#provincePagination', clickable: true, dynamicBullets: true },
        navigation: isMobile ? false : { nextEl: '#provinceNext', prevEl: '#provincePrev' },
        breakpoints: {
            480: { slidesPerView: 2 },
            768: { slidesPerView: 2.5 },
            1024: { slidesPerView: 3.5 },
            1280: { slidesPerView: 4.5 }
        },
        speed: 600,
        grabCursor: true,
    });
    setTimeout(observeLazyImages, 300);
}

// ---------- Restaurant Card HTML Generator ----------
function createRestaurantCard(province, rest, distance = null) {
    const liked = isFavorite(province, rest.id);
    const distHTML = distance !== null ? `<span class="distance-badge"><i class="fas fa-location-dot"></i> ${distance.toFixed(1)} كم</span>` : '';
    const starsHTML = '★'.repeat(Math.floor(rest.rating)) + (rest.rating % 1 >= 0.5 ? '½' : '') + '☆'.repeat(5 - Math.ceil(rest.rating));
    return `
        <div class="restaurant-card" onclick="showRestaurantDetails('${province}', '${rest.id}')">
            <div class="restaurant-image">
                <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' fill='%23eee'%3E%3Crect width='400' height='300'/%3E%3C/svg%3E" data-src="${rest.image}" alt="${rest.name}" class="lazy-img">
                <div class="rating"><i class="fas fa-star" style="color:#FFBA08"></i> ${rest.rating}</div>
                <button class="favorite-btn ${liked ? 'liked' : ''}" onclick="toggleFavorite('${province}', '${rest.id}', event)">
                    <i class="${liked ? 'fas' : 'far'} fa-heart"></i>
                </button>
            </div>
            <div class="restaurant-info">
                <h3>${rest.name} ${distHTML}</h3>
                <div class="restaurant-cuisine"><i class="fas fa-utensils"></i> ${rest.cuisine}</div>
                <div class="star-rating-small">${starsHTML}</div>
                <div class="restaurant-footer">
                    <span class="price-range">${rest.priceRange}</span>
                    <button class="btn-details" onclick="event.stopPropagation(); showRestaurantDetails('${province}', '${rest.id}')">تفاصيل 📖</button>
                </div>
            </div>
        </div>
    `;
}

// ---------- State Management for Pages ----------
let currentProvince = null,
    lastRenderedPage = null;
let activeFilters = { cuisine: 'all', price: 'all', hours: 'all', sort: 'default', search: '' };

function renderCityPage(province, filters = {}) {
    activeFilters = { ...activeFilters, ...filters };
    let restaurants = [...allRestaurants[province]];

    if (activeFilters.cuisine !== 'all')
        restaurants = restaurants.filter(r => r.cuisine === activeFilters.cuisine);
    if (activeFilters.price === 'budget')
        restaurants = restaurants.filter(r => r.priceLevel <= 2);
    else if (activeFilters.price === 'mid')
        restaurants = restaurants.filter(r => r.priceLevel === 3);
    else if (activeFilters.price === 'luxury')
        restaurants = restaurants.filter(r => r.priceLevel >= 4);
    if (activeFilters.hours === 'open') {
        const now = new Date().getHours();
        restaurants = restaurants.filter(r => now >= r.hourStart && now < r.hourEnd);
    }
    if (activeFilters.sort === 'rating')
        restaurants.sort((a, b) => b.rating - a.rating);
    else if (activeFilters.sort === 'price_low')
        restaurants.sort((a, b) => a.priceLevel - b.priceLevel);
    else if (activeFilters.sort === 'price_high')
        restaurants.sort((a, b) => b.priceLevel - a.priceLevel);
    else if (activeFilters.sort === 'nearest' && userLocation) {
        restaurants.forEach(r => r._distance = getDistance(userLocation.lat, userLocation.lng, r.lat, r.lng));
        restaurants.sort((a, b) => a._distance - b._distance);
    }

    currentProvince = province;
    document.getElementById('cityPagesContainer').innerHTML = `
        <div class="city-page active">
            <button class="back-btn" onclick="goBack()"><i class="fas fa-arrow-right"></i> العودة للرئيسية</button>
            <div class="city-header"><h2>📍 ${province}</h2><p>🌟 ${restaurants.length} مطعم</p></div>
            <div class="filter-bar">
                <select class="filter-select" onchange="applyFilter('cuisine', this.value)">
                    <option value="all">كل الأنواع</option>
                    ${cuisineTypes.map(c => `<option value="${c}" ${activeFilters.cuisine === c ? 'selected' : ''}>${c}</option>`).join('')}
                </select>
                <select class="filter-select" onchange="applyFilter('price', this.value)">
                    <option value="all">كل الأسعار</option>
                    <option value="budget" ${activeFilters.price === 'budget' ? 'selected' : ''}>💰 اقتصادي</option>
                    <option value="mid" ${activeFilters.price === 'mid' ? 'selected' : ''}>💰💰 متوسط</option>
                    <option value="luxury" ${activeFilters.price === 'luxury' ? 'selected' : ''}>💰💰💰 فاخر</option>
                </select>
                <button class="filter-btn ${activeFilters.hours === 'open' ? 'active' : ''}" onclick="applyFilter('hours', activeFilters.hours === 'open' ? 'all' : 'open')">🕐 مفتوح الآن</button>
                <select class="filter-select sort" onchange="applyFilter('sort', this.value)" style="background:var(--accent);color:white;border-color:var(--accent);">
                    <option value="default" ${activeFilters.sort === 'default' ? 'selected' : ''}>الافتراضي</option>
                    <option value="rating" ${activeFilters.sort === 'rating' ? 'selected' : ''}>الأعلى تقييماً</option>
                    <option value="price_low" ${activeFilters.sort === 'price_low' ? 'selected' : ''}>الأقل سعراً</option>
                    <option value="price_high" ${activeFilters.sort === 'price_high' ? 'selected' : ''}>الأعلى سعراً</option>
                </select>
                <button class="filter-btn reset" onclick="resetFilters()">✕ إعادة</button>
            </div>
            <div class="restaurants-grid">
                ${restaurants.map(r => createRestaurantCard(province, r, activeFilters.sort === 'nearest' && userLocation ? r._distance : null)).join('')}
            </div>
        </div>
    `;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(observeLazyImages, 200);
}

function applyFilter(key, value) {
    if (currentProvince) {
        activeFilters[key] = value;
        renderCityPage(currentProvince);
    }
}

function resetFilters() {
    activeFilters = { cuisine: 'all', price: 'all', hours: 'all', sort: 'default', search: '' };
    if (currentProvince) renderCityPage(currentProvince);
}

// ---------- Show City Page (called from slider) ----------
window.showCityPage = function (province) {
    document.getElementById('mainPage').style.display = 'none';
    renderCityPage(province);
};

// ---------- Re-render current page (used after favoriting) ----------
function renderCurrentPage() {
    if (currentProvince) renderCityPage(currentProvince);
    else if (lastRenderedPage === 'favorites') showFavorites();
    else if (lastRenderedPage === 'nearby') displayNearbyRestaurants();
    else if (lastRenderedPage === 'about') showAboutSyria();
}

// ---------- Go Back to Main Page ----------
window.goBack = function () {
    document.getElementById('mainPage').style.display = 'block';
    document.getElementById('cityPagesContainer').innerHTML = '';
    currentProvince = null;
    lastRenderedPage = null;
    activeFilters = { cuisine: 'all', price: 'all', hours: 'all', sort: 'default', search: '' };
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
        if (provincesSwiper) {
            provincesSwiper.update();
            provincesSwiper.autoplay.start();
        }
    }, 300);
};

// ---------- Show Restaurant Details Modal ----------
window.showRestaurantDetails = function (province, restId) {
    const rest = allRestaurants[province].find(r => r.id === restId);
    if (!rest) return;

    currentReviewProvince = province;
    currentReviewRestaurant = restId;
    selectedRating = 0;

    document.getElementById('modalTitle').innerHTML = rest.name;
    document.getElementById('modalCuisine').innerHTML = `<i class="fas fa-utensils"></i> ${rest.cuisine}`;
    document.getElementById('modalRating').innerHTML = `<i class="fas fa-star" style="color:#FFBA08"></i> ${rest.rating} / 5 ⭐`;
    const modalImage = document.getElementById('modalImage');
    modalImage.src = rest.image;
    modalImage.style.display = 'block';
    document.getElementById('modalDesc').innerHTML = rest.description;
    document.getElementById('modalAddress').innerHTML = `<i class="fas fa-map-marker-alt"></i> 📍 ${rest.address}`;
    document.getElementById('modalPhone').innerHTML = `<i class="fas fa-phone"></i> 📞 ${rest.phone}`;
    document.getElementById('modalHours').innerHTML = `<i class="fas fa-clock"></i> 🕐 ${rest.openingHours}`;
    document.getElementById('modalPrice').innerHTML = `<i class="fas fa-tag"></i> 💰 ${rest.priceRange}`;
    document.getElementById('modalMap').innerHTML = `<iframe width="100%" height="180" style="border:0;border-radius:15px;" loading="lazy" allowfullscreen referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${rest.lat},${rest.lng}&zoom=15&language=ar"></iframe>`;

    const whatsappMsg = `مرحباً، أرغب بالطلب من مطعم ${rest.name} في ${province}%0Aالاسم: [اكتب اسمك]%0Aالطلب: [اكتب طلبك]`;
    const whatsappBtn = document.getElementById('modalWhatsapp');
    whatsappBtn.onclick = () => window.open(`https://wa.me/963${rest.phone}?text=${whatsappMsg}`, '_blank');
    whatsappBtn.style.display = 'inline-flex';

    setupShareButtons(province, rest);
    renderReviews(rest);
    initStarInput();
    document.getElementById('reviewText').value = '';

    document.getElementById('restaurantModal').classList.add('active');
    document.body.style.overflow = 'hidden';
};

function closeModal() {
    document.getElementById('restaurantModal').classList.remove('active');
    document.body.style.overflow = '';
}

// ---------- Global Search ----------
window.globalSearch = function (searchTerm) {
    if (!searchTerm || !searchTerm.trim()) return;
    const term = searchTerm.trim().toLowerCase();
    let results = [];
    for (const p in allRestaurants) {
        const found = allRestaurants[p].filter(r =>
            r.name.toLowerCase().includes(term) || r.cuisine.toLowerCase().includes(term)
        );
        results.push(...found.map(r => ({ ...r, province: p })));
    }
    if (!results.length) {
        showToast('لا توجد نتائج');
        return;
    }
    document.getElementById('mainPage').style.display = 'none';
    document.getElementById('cityPagesContainer').innerHTML = `
        <div class="city-page active">
            <button class="back-btn" onclick="goBack()"><i class="fas fa-arrow-right"></i> العودة للرئيسية</button>
            <div class="city-header"><h2>🔍 نتائج البحث: "${term}"</h2></div>
            <div class="restaurants-grid">${results.map(r => createRestaurantCard(r.province, r)).join('')}</div>
        </div>
    `;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(observeLazyImages, 200);
};

// ---------- Event Listeners ----------
document.addEventListener('DOMContentLoaded', () => {
    renderProvinces();
    updateFavCount();

    const desktopSearch = document.getElementById('desktopSearch');
    if (desktopSearch) {
        desktopSearch.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') globalSearch(this.value);
        });
    }
});

// Global keyboard listener for Escape
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        closeModal();
        closeMobileSearch();
        closeMobileMenu();
    }
});

// Handle resize for swiper navigation
window.addEventListener('resize', () => {
    if (provincesSwiper) {
        const isMobile = window.innerWidth < 1024;
        provincesSwiper.params.navigation = isMobile ? false : { nextEl: '#provinceNext', prevEl: '#provincePrev' };
        provincesSwiper.update();
    }
});

// Observe DOM mutations to lazy-load new images
const domObserver = new MutationObserver(() => observeLazyImages());
domObserver.observe(document.getElementById('cityPagesContainer'), { childList: true, subtree: true });

// Ensure favorites count is shown on load
updateFavCount();
