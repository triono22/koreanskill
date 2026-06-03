// --- SPA Routing ---
const navLinks = document.querySelectorAll('.nav-link');
const views = document.querySelectorAll('.view-section');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('data-target');
        
        // Update active link
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        
        // Update view
        views.forEach(view => {
            if(view.id === targetId) {
                view.classList.remove('hidden');
                view.classList.add('active');
                // scroll to top
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                view.classList.remove('active');
                view.classList.add('hidden');
            }
        });
        
        // Close mobile menu if open
        const navLinksContainer = document.querySelector('.nav-links');
        if(navLinksContainer.classList.contains('active')) {
            navLinksContainer.classList.remove('active');
        }
    });
});

// Mobile Menu Toggle
document.querySelector('.hamburger').addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('active');
});


// --- Interactive Map Logic ---
const uniData = {
    "Seoul": [
        "Seoul National University (Konvensional)",
        "Hanyang University (Teknik/Vokasi)",
        "Dongyang Mirae University (Vokasi)",
        "Kookmin University (Konvensional)",
        "Seoul Cyber University (Siber)",
        "Hanyang Cyber University (Siber)",
        "Kyung Hee Cyber University (Siber)"
    ],
    "Incheon": [
        "Inha Technical College (Vokasi Khusus)",
        "Inha University (Konvensional)"
    ],
    "Daegu": [
        "Yeungjin University (Vokasi Mekatronika)"
    ],
    "Busan": [
        "Pusan National University (Konvensional)"
    ],
    "Gwangju": [
        "Chonnam National University (Konvensional)"
    ],
    "Chungnam": [
        "Ajou Motor College (Vokasi Otomotif)"
    ]
};

const mapPins = document.querySelectorAll('.map-pin');
const infoCityName = document.getElementById('info-city-name');
const infoCityDesc = document.getElementById('info-city-desc');
const infoUniList = document.getElementById('info-uni-list');

mapPins.forEach(pin => {
    pin.addEventListener('click', () => {
        const city = pin.getAttribute('data-city');
        infoCityName.textContent = `Wilayah: ${city}`;
        infoCityDesc.textContent = `Daftar Universitas Mitra & Populer di ${city}:`;
        
        infoUniList.innerHTML = '';
        if(uniData[city]) {
            uniData[city].forEach(uni => {
                const li = document.createElement('li');
                li.textContent = uni;
                infoUniList.appendChild(li);
            });
        }
    });
});


// --- Calculator Logic ---
const tuitionCostInput = document.getElementById('tuition-cost');
const tuitionCostVal = document.getElementById('tuition-cost-val');
const cyberTuitionCostInput = document.getElementById('cyber-tuition-cost');
const cyberTuitionCostVal = document.getElementById('cyber-tuition-cost-val');

const barConv = document.getElementById('bar-conv');
const valConv = document.getElementById('val-conv');
const barCyber = document.getElementById('bar-cyber');
const valCyber = document.getElementById('val-cyber');

const barFullCyber50 = document.getElementById('bar-full-cyber-50');
const valFullCyber50 = document.getElementById('val-full-cyber-50');
const barFullCyber80 = document.getElementById('bar-full-cyber-80');
const valFullCyber80 = document.getElementById('val-full-cyber-80');

const valSaving = document.getElementById('val-saving');

function updateCalculator() {
    const tc = parseInt(tuitionCostInput.value); // per semester
    const ctc = parseInt(cyberTuitionCostInput.value); // per semester
    
    // Update labels
    tuitionCostVal.textContent = tc.toLocaleString('id-ID');
    cyberTuitionCostVal.textContent = ctc.toLocaleString('id-ID');
    
    // Conventional: 8 semesters tuition in Korea
    const convTotal = tc * 8;
    
    // Cyber 2+2: 4 sem online (base cyber * 20%) + 4 sem Korea
    const cyber2plus2Tuition = (ctc * 0.2) * 4;
    const koreaTuition = tc * 4;
    const cyber2plus2Total = cyber2plus2Tuition + koreaTuition;
    
    // Full Cyber (Beasiswa 50%): 8 sem online * (ctc * 0.5)
    const fullCyber50Total = (ctc * 0.5) * 8;
    
    // Full Cyber (Beasiswa 80%): 8 sem online * (ctc * 0.2)
    const fullCyber80Total = (ctc * 0.2) * 8;
    
    // Calculate max saving vs Full Cyber 80%
    const maxSaving = convTotal - fullCyber80Total;
    
    valConv.textContent = `Rp ${(convTotal/1000000).toFixed(0)} Jt`;
    valCyber.textContent = `Rp ${(cyber2plus2Total/1000000).toFixed(0)} Jt`;
    valFullCyber50.textContent = `Rp ${(fullCyber50Total/1000000).toFixed(0)} Jt`;
    valFullCyber80.textContent = `Rp ${(fullCyber80Total/1000000).toFixed(0)} Jt`;
    
    valSaving.textContent = `Rp ${(maxSaving/1000000).toFixed(0)} Juta!`;
    
    // Adjust Bar heights (max is convTotal)
    barConv.style.height = '100%';
    barCyber.style.height = `${(cyber2plus2Total / convTotal) * 100}%`;
    barFullCyber50.style.height = `${(fullCyber50Total / convTotal) * 100}%`;
    barFullCyber80.style.height = `${(fullCyber80Total / convTotal) * 100}%`;
}

tuitionCostInput.addEventListener('input', updateCalculator);
cyberTuitionCostInput.addEventListener('input', updateCalculator);
// Init
updateCalculator();


// --- Eligibility Modal Logic ---
const modal = document.getElementById('eligibility-modal');
const btnNav = document.getElementById('btn-eligibility-nav');
const closeBtn = document.querySelector('.close-btn');

function openEligibilityModal(path = '') {
    modal.classList.add('show');
    // reset
    document.querySelectorAll('.quiz-step').forEach(s => s.classList.add('hidden'));
    document.getElementById('step-1').classList.remove('hidden');
    
    // Optional: pre-select based on path if needed
}

btnNav.addEventListener('click', () => openEligibilityModal());
closeBtn.addEventListener('click', () => modal.classList.remove('show'));
window.addEventListener('click', (e) => {
    if(e.target === modal) modal.classList.remove('show');
});

function nextStep(step) {
    document.querySelectorAll('.quiz-step').forEach(s => s.classList.add('hidden'));
    document.getElementById(`step-${step}`).classList.remove('hidden');
}

function prevStep(step) {
    document.querySelectorAll('.quiz-step').forEach(s => s.classList.add('hidden'));
    document.getElementById(`step-${step}`).classList.remove('hidden');
}

function submitQuiz() {
    const edu = document.getElementById('q-edu').value;
    const goal = document.getElementById('q-goal').value;
    const budget = document.getElementById('q-budget').value;
    
    if(!edu || !goal || !budget) {
        alert("Mohon lengkapi semua pilihan.");
        return;
    }
    
    let recommendation = "";
    if(edu === "SMK Teknik" && budget !== "< 50 Juta") {
        recommendation = "Jalur Vokasi Teknik D-2 sangat direkomendasikan untuk Anda! Peluang emas menuju visa kerja E-7.";
    } else if (budget === "< 50 Juta" || goal === "Gelar S1") {
        recommendation = "Jalur Cyber University (Skema 2+2) adalah pilihan paling cerdas untuk menghemat biaya sambil mendapat gelar S1.";
    } else {
        recommendation = "Tim konsultan kami akan merancang jalur studi konvensional atau vokasi yang paling pas dengan profil Anda.";
    }
    
    document.getElementById('result-desc').textContent = recommendation;
    
    // Build WA Link
    // Default admin WA Number for PT Songmun KoreanSkill
    const waNumber = "+821084690945";
    const message = `Halo PT Songmun KoreanSkill, saya ingin konsultasi studi ke Korea.
Data Saya:
- Pendidikan: ${edu}
- Tujuan: ${goal}
- Budget: ${budget}

Berdasarkan tes, saya direkomendasikan: ${recommendation}
Mohon info pendaftarannya.`;

    const encodedMsg = encodeURIComponent(message);
    document.getElementById('wa-link').href = `https://wa.me/${waNumber}?text=${encodedMsg}`;
    
    // Trigger Google Ads Conversion for 'Pendaftaran'
    if (typeof gtag_report_conversion === 'function') {
        gtag_report_conversion();
    }
    
    nextStep('result');
}

// --- Admisi Tab System ---
const admisiTabBtns = document.querySelectorAll('.admisi-tab-btn');
const admisiTabContents = document.querySelectorAll('.admisi-tab-content');

if (admisiTabBtns.length > 0) {
    admisiTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTabId = btn.getAttribute('data-tab');
            
            // Toggle active button
            admisiTabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Toggle active content
            admisiTabContents.forEach(content => {
                if (content.id === targetTabId) {
                    content.classList.add('active');
                } else {
                    content.classList.remove('active');
                }
            });
        });
    });
}
