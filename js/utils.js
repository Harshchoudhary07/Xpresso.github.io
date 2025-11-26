// ========================================
// UTILITY FUNCTIONS
// ========================================

const Utils = {
    // Form Validation
    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },

    validatePhone(phone) {
        const re = /^[6-9]\d{9}$/;
        return re.test(phone);
    },

    validateRegistrationNumber(regNo) {
        // Format: XX00XX0000
        const re = /^[A-Z]{2}[0-9]{2}[A-Z]{2}[0-9]{4}$/;
        return re.test(regNo.toUpperCase());
    },

    validatePasswordStrength(password) {
        const result = {
            valid: false,
            strength: 'weak',
            checks: {
                length: password.length >= 8,
                uppercase: /[A-Z]/.test(password),
                lowercase: /[a-z]/.test(password),
                number: /[0-9]/.test(password),
                special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
            }
        };

        const passedChecks = Object.values(result.checks).filter(Boolean).length;

        if (passedChecks >= 5) {
            result.strength = 'strong';
            result.valid = true;
        } else if (passedChecks >= 3) {
            result.strength = 'medium';
            result.valid = true;
        } else {
            result.strength = 'weak';
            result.valid = false;
        }

        return result;
    },

    // Date/Time Formatting
    formatDate(date) {
        const d = new Date(date);
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return d.toLocaleDateString('en-IN', options);
    },

    formatTime(date) {
        const d = new Date(date);
        const options = { hour: '2-digit', minute: '2-digit' };
        return d.toLocaleTimeString('en-IN', options);
    },

    formatDateTime(date) {
        return `${this.formatDate(date)} at ${this.formatTime(date)}`;
    },

    // Price Calculations
    formatPrice(price) {
        return `₹${price.toLocaleString('en-IN')}`;
    },

    calculateDuration(startDate, endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffMs = end - start;
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffDays = Math.floor(diffHours / 24);

        if (diffDays > 0) {
            return `${diffDays} day${diffDays > 1 ? 's' : ''}`;
        }
        return `${diffHours} hour${diffHours > 1 ? 's' : ''}`;
    },

    // LocalStorage Helpers
    storage: {
        set(key, value) {
            try {
                localStorage.setItem(key, JSON.stringify(value));
                return true;
            } catch (e) {
                console.error('Storage error:', e);
                return false;
            }
        },

        get(key) {
            try {
                const item = localStorage.getItem(key);
                return item ? JSON.parse(item) : null;
            } catch (e) {
                console.error('Storage error:', e);
                return null;
            }
        },

        remove(key) {
            localStorage.removeItem(key);
        },

        clear() {
            localStorage.clear();
        }
    },

    // Toast Notifications
    showToast(message, type = 'info') {
        const container = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;

        toast.innerHTML = `
            <div class="toast-message">${message}</div>
            <button class="toast-close" onclick="this.parentElement.remove()">×</button>
        `;

        container.appendChild(toast);

        setTimeout(() => {
            toast.remove();
        }, 5000);
    },

    // Image Compression (for uploads)
    async compressImage(file, maxWidth = 1200) {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    let width = img.width;
                    let height = img.height;

                    if (width > maxWidth) {
                        height = (height * maxWidth) / width;
                        width = maxWidth;
                    }

                    canvas.width = width;
                    canvas.height = height;

                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, height);

                    resolve(canvas.toDataURL('image/jpeg', 0.8));
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        });
    },

    // Debounce Function
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Generate Random ID
    generateId() {
        return 'id_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    },

    // Scroll to Top
    scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    // Get Query Parameter
    getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }
};
