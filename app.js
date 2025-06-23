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
                } else {
                    installBtn.textContent = '📲 Install App';
                }
                setTimeout(() => {
                    installBtn.style.display = 'none';
                }, 3000);
            });
        });
    });

    // Register Service Worker
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/service-worker.js')
                .then(reg => console.log('Service Worker registered'))
                .catch(err => console.error('Service Worker error:', err));
        });
    }
}

// Usage Tracking for Upgrade Prompts
function trackUsageForUpgrade() {
    let openCount = localStorage.getItem('openCount') || 0;
    localStorage.setItem('openCount', ++openCount);
    
    if (openCount > 3) {
        setTimeout(() => {
            const upgrade = confirm("Unlock PRO features: Advanced calculators, cut lists, and material estimators!\n\nUpgrade now?");
            if (upgrade) {
                window.location.href = "https://your-main-product.com/upgrade";
            }
        }, 10000);
    }
}

// Initialize Calculator
document.addEventListener('DOMContentLoaded', () => {
    // Setup event listeners
    document.getElementById('calculateBtn').addEventListener('click', calculateBoardFeet);
    
    // Setup PWA functionality
    setupPWAInstallation();
    
    // Track usage for upgrade prompts
    trackUsageForUpgrade();
    
    // Additional initialization code can go here
    console.log("Woodworking Calculator Demo initialized!");
});
