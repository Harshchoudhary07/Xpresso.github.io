// ========================================
// MAIN APPLICATION LOGIC & ROUTING
// ========================================

const App = {
    currentPage: 'home',
    currentParam: null,

    // Initialize the application
    init() {
        this.setupRouting();
        this.handleRoute();

        // Listen for hash changes
        window.addEventListener('hashchange', () => this.handleRoute());

        // Add scroll listener for header shadow
        window.addEventListener('scroll', this.handleScroll);
    },

    // Setup routing
    setupRouting() {
        // Handle initial load
        if (!window.location.hash) {
            window.location.hash = '#/';
        }
    },

    // Handle route changes
    handleRoute() {
        const hash = window.location.hash.slice(1) || '/';
        const [path, param] = hash.split('/').filter(Boolean);

        this.currentPage = path || 'home';
        this.currentParam = param || null;

        this.render();
        Utils.scrollToTop();
    },

    // Navigate to a page
    navigate(page, param = null) {
        const hash = param ? `#/${page}/${param}` : `#/${page}`;
        window.location.hash = hash;
    },

    // Render the current page
    render() {
        // Render header
        this.renderHeader();

        // Render main content
        const mainContent = document.getElementById('main-content');

        let content = '';

        switch (this.currentPage) {
            case 'home':
                content = HomePage.render();
                break;

            case 'browse':
                content = BrowsePage.render();
                setTimeout(() => BrowsePage.init(), 100);
                break;

            case 'vehicle-details':
                content = VehicleDetailsPage.render(this.currentParam);
                break;

            case 'list-vehicle':
                content = ListVehiclePage.render();
                break;

            case 'verification':
                content = VerificationPage.render();
                break;

            case 'dashboard':
                content = DashboardPage.render();
                break;

            case 'policies':
                content = PoliciesPage.render();
                break;

            case 'login':
                content = this.renderLogin();
                break;

            case 'signup':
                content = this.renderSignup();
                break;

            default:
                content = this.render404();
        }

        mainContent.innerHTML = content;
    },

    // Render header
    renderHeader() {
        const header = document.getElementById('header');
        header.innerHTML = Components.createHeader();

        // Set active nav link
        const currentPath = this.currentPage;
        document.querySelectorAll('.nav-link').forEach(link => {
            const href = link.getAttribute('href').slice(2);
            link.classList.toggle('active', href === currentPath);
        });
    },

    // Handle scroll for header shadow
    handleScroll() {
        const header = document.getElementById('header');
        if (window.scrollY > 10) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    },

    // Render login page
    renderLogin() {
        return `
            <div class="list-vehicle-page">
                <div class="container">
                    <div class="form-container" style="max-width: 500px;">
                        <h1 class="text-center">Login</h1>
                        <p class="text-light text-center mb-4">Welcome back to CampusRide</p>
                        
                        <form onsubmit="App.handleLogin(event)">
                            ${Components.createInput({
            type: 'email',
            name: 'email',
            label: 'Email Address',
            placeholder: 'your.email@example.com',
            required: true
        })}
                            
                            ${Components.createInput({
            type: 'password',
            name: 'password',
            label: 'Password',
            placeholder: 'Enter your password',
            required: true
        })}
                            
                            <div class="form-checkbox">
                                <input type="checkbox" id="remember-me">
                                <label for="remember-me">Remember me</label>
                            </div>
                            
                            <button type="submit" class="btn btn-primary btn-block btn-lg mt-3">
                                Login
                            </button>
                        </form>
                        
                        <p class="text-center mt-3">
                            Don't have an account? <a href="#/signup">Sign up</a>
                        </p>
                    </div>
                </div>
            </div>
        `;
    },

    // Render signup page
    renderSignup() {
        return `
            <div class="list-vehicle-page">
                <div class="container">
                    <div class="form-container" style="max-width: 500px;">
                        <h1 class="text-center">Sign Up</h1>
                        <p class="text-light text-center mb-4">Join CampusRide today</p>
                        
                        <form onsubmit="App.handleSignup(event)">
                            ${Components.createInput({
            type: 'text',
            name: 'name',
            label: 'Full Name',
            placeholder: 'John Doe',
            required: true
        })}
                            
                            ${Components.createInput({
            type: 'email',
            name: 'email',
            label: 'Email Address',
            placeholder: 'your.email@example.com',
            required: true
        })}
                            
                            ${Components.createInput({
            type: 'tel',
            name: 'phone',
            label: 'Phone Number',
            placeholder: '9876543210',
            required: true
        })}
                            
                            <div class="form-group">
                                <label class="form-label" for="password">Password *</label>
                                <input 
                                    type="password" 
                                    id="password" 
                                    name="password" 
                                    class="form-input" 
                                    placeholder="Create a strong password"
                                    required
                                    oninput="App.checkPasswordStrength()"
                                >
                                <div id="password-strength" class="mt-2" style="display: none;">
                                    <div style="display: flex; gap: 4px; margin-bottom: 8px;">
                                        <div id="strength-bar-1" style="height: 4px; flex: 1; background: #E3E4E8; border-radius: 2px;"></div>
                                        <div id="strength-bar-2" style="height: 4px; flex: 1; background: #E3E4E8; border-radius: 2px;"></div>
                                        <div id="strength-bar-3" style="height: 4px; flex: 1; background: #E3E4E8; border-radius: 2px;"></div>
                                    </div>
                                    <p id="strength-text" class="text-small"></p>
                                </div>
                                <div class="mt-2" style="font-size: 13px; color: var(--color-text-light);">
                                    <p style="margin-bottom: 4px;"><strong>Password must contain:</strong></p>
                                    <ul style="margin: 0; padding-left: 20px;">
                                        <li id="check-length">At least 8 characters</li>
                                        <li id="check-uppercase">One uppercase letter (A-Z)</li>
                                        <li id="check-lowercase">One lowercase letter (a-z)</li>
                                        <li id="check-number">One number (0-9)</li>
                                        <li id="check-special">One special character (!@#$%^&*)</li>
                                    </ul>
                                </div>
                            </div>

                            ${Components.createInput({
            type: 'password',
            name: 'confirm-password',
            label: 'Confirm Password',
            placeholder: 'Re-enter your password',
            required: true
        })}
                            
                            ${Components.createSelect({
            name: 'role',
            label: 'I want to',
            options: [
                { value: 'renter', label: 'Rent vehicles' },
                { value: 'owner', label: 'List my vehicle' },
                { value: 'both', label: 'Both' }
            ],
            required: true
        })}
                            
                            <div class="form-checkbox">
                                <input type="checkbox" id="agree-terms" required>
                                <label for="agree-terms">I agree to the <a href="#/policies">Terms & Policies</a></label>
                            </div>
                            
                            <button type="submit" class="btn btn-primary btn-block btn-lg mt-3">
                                Create Account
                            </button>
                        </form>
                        
                        <p class="text-center mt-3">
                            Already have an account? <a href="#/login">Login</a>
                        </p>
                    </div>
                </div>
            </div>
        `;
    },

    // Handle login form submission
    handleLogin(event) {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (!Utils.validateEmail(email)) {
            Utils.showToast('Invalid email address', 'error');
            return;
        }

        if (Auth.login(email, password)) {
            this.navigate('home');
        } else {
            Utils.showToast('Login failed. Please try again.', 'error');
        }
    },

    // Check password strength in real-time
    checkPasswordStrength() {
        const password = document.getElementById('password').value;
        const strengthDiv = document.getElementById('password-strength');
        const strengthText = document.getElementById('strength-text');

        if (!password) {
            strengthDiv.style.display = 'none';
            return;
        }

        strengthDiv.style.display = 'block';
        const result = Utils.validatePasswordStrength(password);

        // Update strength bars
        const bars = [
            document.getElementById('strength-bar-1'),
            document.getElementById('strength-bar-2'),
            document.getElementById('strength-bar-3')
        ];

        bars.forEach(bar => bar.style.background = '#E3E4E8');

        if (result.strength === 'weak') {
            bars[0].style.background = '#DC3545';
            strengthText.innerHTML = '<span style="color: #DC3545;">Weak password</span>';
        } else if (result.strength === 'medium') {
            bars[0].style.background = '#F8D775';
            bars[1].style.background = '#F8D775';
            strengthText.innerHTML = '<span style="color: #d97706;">Medium password</span>';
        } else {
            bars[0].style.background = '#27AE60';
            bars[1].style.background = '#27AE60';
            bars[2].style.background = '#27AE60';
            strengthText.innerHTML = '<span style="color: #27AE60;">Strong password ✓</span>';
        }

        // Update checklist
        const checks = result.checks;
        document.getElementById('check-length').style.color = checks.length ? '#27AE60' : '';
        document.getElementById('check-uppercase').style.color = checks.uppercase ? '#27AE60' : '';
        document.getElementById('check-lowercase').style.color = checks.lowercase ? '#27AE60' : '';
        document.getElementById('check-number').style.color = checks.number ? '#27AE60' : '';
        document.getElementById('check-special').style.color = checks.special ? '#27AE60' : '';
    },

    // Handle signup form submission
    handleSignup(event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        const role = document.getElementById('role').value;

        if (!Utils.validateEmail(email)) {
            Utils.showToast('Invalid email address', 'error');
            return;
        }

        if (!Utils.validatePhone(phone)) {
            Utils.showToast('Invalid phone number', 'error');
            return;
        }

        // Validate password strength
        const passwordCheck = Utils.validatePasswordStrength(password);
        if (!passwordCheck.valid) {
            Utils.showToast('Password does not meet requirements. Please use a stronger password.', 'error');
            return;
        }

        // Check password confirmation
        if (password !== confirmPassword) {
            Utils.showToast('Passwords do not match', 'error');
            document.getElementById('confirm-password').classList.add('error');
            return;
        }

        const userData = { name, email, phone, role };

        if (Auth.signup(userData)) {
            this.navigate('verification');
        } else {
            Utils.showToast('Signup failed. Please try again.', 'error');
        }
    },

    // Render 404 page
    render404() {
        return `
            <div class="container section text-center">
                <div style="font-size: 80px; margin-bottom: 20px;">🔍</div>
                <h1>404 - Page Not Found</h1>
                <p class="text-light">The page you're looking for doesn't exist.</p>
                <a href="#/" class="btn btn-primary mt-3">Go Home</a>
            </div>
        `;
    }
};

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});
