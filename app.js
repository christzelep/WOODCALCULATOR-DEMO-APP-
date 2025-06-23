// Board Foot Calculation Function
function calculateBoardFeet() {
    const length = parseFloat(document.getElementById('length').value);
    const width = parseFloat(document.getElementById('width').value);
    const thickness = parseFloat(document.getElementById('thickness').value);
    
    if (length && width && thickness) {
        const boardFeet = (length * width * thickness) / 144;
        document.getElementById('result').innerHTML = `
            <strong>Result:</strong> ${boardFeet.toFixed(2)} board feet
        `;
    } else {
        document.getElementById('result').innerHTML = `
            <strong>Error:</strong> Please enter all values
        `;
    }
}

// PWA Installation Logic
function setupPWAInstallation() {
    let deferredPrompt;
    const installBtn = document.getElementById('installBtn');

    // Initially hide the install button
    if (installBtn) {
        installBtn.style.display = 'none';

        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            deferredPrompt = e;
            installBtn.style.display = 'block';
            
            installBtn.addEventListener('click', () => {
                installBtn.textContent = 'Installing...';
                deferredPrompt.prompt();
                
                deferredPrompt.userChoice.then((choiceResult) => {
                    if (choiceResult.outcome === 'accepted') {
                        installBtn.textContent = '✅ Installed!';
                        console.log('User accepted the install prompt');
                    } else {
                        installBtn.textContent = '📲 Install App';
                        console.log('User dismissed the install prompt');
                    }
                    setTimeout(() => {
                        installBtn.style.display = 'none';
                    }, 3000);
                });
            });
        });
    }

    // Register Service Worker
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/service-worker.js')
                .then(reg => console.log('[Service Worker] Registered:', reg))
                .catch(err => console.error('[Service Worker] Registration failed:', err));
        });
    }
}

// Usage Tracking for Upgrade Prompts
function trackUsageForUpgrade() {
    let openCount = parseInt(localStorage.getItem('openCount') || 0;
    openCount++;
    localStorage.setItem('openCount', openCount);
    
    if (openCount > 3) {
        setTimeout(() => {
            const upgrade = confirm("Unlock PRO features: Advanced calculators, cut lists, and material estimators!\n\nUpgrade now?");
            if (upgrade) {
                window.location.href = "https://your-main-product.com/upgrade";
            }
        }, 10000);
    }
}

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    // Setup calculator functionality
    const calculateBtn = document.getElementById('calculateBtn');
    if (calculateBtn) {
        calculateBtn.addEventListener('click', calculateBoardFeet);
    }
    
    // Setup PWA installation
    setupPWAInstallation();
    
    // Track usage for upgrade prompts
    trackUsageForUpgrade();
    
    console.log("Woodworking Calculator Demo initialized!");
});
