// ========================================
// AUTHENTICATION LOGIC
// ========================================

const Auth = {
    // Check if user is logged in
    isLoggedIn() {
        return this.getCurrentUser() !== null;
    },

    // Get current user
    getCurrentUser() {
        return Utils.storage.get('currentUser');
    },

    // Login
    login(email, password) {
        // Validate email format
        if (!email || !Utils.validateEmail(email)) {
            Utils.showToast('Please enter a valid email address', 'error');
            return false;
        }

        // Validate password length (minimum 8 characters)
        if (!password || password.length < 8) {
            Utils.showToast('Password must be at least 8 characters long', 'error');
            return false;
        }

        // Check if user registered via signup
        const registeredUsers = Utils.storage.get('registeredUsers') || [];
        const registeredUser = registeredUsers.find(
            user => user.email === email && user.password === password
        );

        if (registeredUser) {
            // Remove password before storing in currentUser
            const { password, ...userWithoutPassword } = registeredUser;
            Utils.storage.set('currentUser', userWithoutPassword);
            return true;
        }

        // Check demo credentials as fallback
        const validCredentials = [
            { email: 'demo@xpresso.com', password: 'demo1234' },
            { email: 'test@xpresso.com', password: 'test1234' },
            { email: 'user@example.com', password: 'password123' }
        ];

        const validUser = validCredentials.find(
            cred => cred.email === email && cred.password === password
        );

        if (validUser) {
            const user = {
                id: 'u1',
                name: 'Demo User',
                email: email,
                phone: '9876543210',
                role: 'renter',
                college: 'Vadodara University',
                hostel: 'Campus Hostel',
                verified: true
            };

            Utils.storage.set('currentUser', user);
            return true;
        }

        Utils.showToast('Invalid email or password', 'error');
        return false;
    },

    // Signup
    signup(userData, password) {
        // Get existing registered users
        const registeredUsers = Utils.storage.get('registeredUsers') || [];

        // Check if email already exists
        if (registeredUsers.find(user => user.email === userData.email)) {
            Utils.showToast('Email already registered. Please login.', 'error');
            return false;
        }

        // Create new user with password
        const user = {
            id: Utils.generateId(),
            ...userData,
            password: password,
            verified: false
        };

        // Add to registered users
        registeredUsers.push(user);
        Utils.storage.set('registeredUsers', registeredUsers);

        // Set as current user (without password)
        const { password: _, ...userWithoutPassword } = user;
        Utils.storage.set('currentUser', userWithoutPassword);

        Utils.showToast('Account created successfully! Redirecting to login...', 'success');

        // Redirect to login page after 1.5 seconds
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1500);

        return true;
    },

    // Logout
    logout() {
        Utils.storage.remove('currentUser');
        Utils.showToast('Logged out successfully', 'info');
        window.location.href = 'index.html';
    },

    // Check if user needs verification
    needsVerification() {
        const user = this.getCurrentUser();
        return user && !user.verified;
    },

    // Verify user
    verifyUser() {
        const user = this.getCurrentUser();
        if (user) {
            user.verified = true;
            Utils.storage.set('currentUser', user);
            Utils.showToast('Verification completed!', 'success');
        }
    },

    // Require authentication for protected routes
    requireAuth() {
        if (!this.isLoggedIn()) {
            Utils.showToast('Please login to continue', 'warning');
            window.location.href = 'login.html';
            return false;
        }
        return true;
    },

    // Require verification
    requireVerification() {
        if (this.needsVerification()) {
            Utils.showToast('Please complete verification first', 'warning');
            window.location.href = 'verification.html';
            return false;
        }
        return true;
    }
};
