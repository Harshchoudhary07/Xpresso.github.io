// ========================================
// DASHBOARD PAGE
// ========================================

const DashboardPage = {
    activeTab: 'rentals',

    render() {
        if (!Auth.requireAuth()) return '';

        const user = Auth.getCurrentUser();

        if (!user.verified) {
            return `
                <div class="container section text-center">
                    <div class="card" style="max-width: 600px; margin: 0 auto;">
                        <div style="font-size: 64px; margin-bottom: 20px;">⚠️</div>
                        <h2>Verification Required</h2>
                        <p class="text-light">Please complete verification to access your dashboard.</p>
                        <a href="#/verification" class="btn btn-primary mt-3">Complete Verification</a>
                    </div>
                </div>
            `;
        }

        return `
            <div class="dashboard-page">
                <div class="container">
                    ${this.renderHeader(user)}
                    ${this.renderContent(user)}
                </div>
            </div>
        `;
    },

    renderHeader(user) {
        return `
            <div class="dashboard-header">
                <h1>Welcome back, ${user.name}! 👋</h1>
                <p class="text-light">Manage your rentals and listings</p>
                
                ${user.role === 'owner' ? this.renderStats() : ''}
            </div>
        `;
    },

    renderStats() {
        return `
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-value">₹2,450</div>
                    <div class="stat-label">Total Earnings</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">3</div>
                    <div class="stat-label">Active Bookings</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">12</div>
                    <div class="stat-label">Completed Rides</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">4.8</div>
                    <div class="stat-label">Average Rating</div>
                </div>
            </div>
        `;
    },

    renderContent(user) {
        return `
            <div class="tabs">
                <ul class="tabs-list">
                    <li class="tab-item ${this.activeTab === 'rentals' ? 'active' : ''}" onclick="DashboardPage.switchTab('rentals')">
                        My Rentals
                    </li>
                    ${user.role === 'owner' ? `
                        <li class="tab-item ${this.activeTab === 'listings' ? 'active' : ''}" onclick="DashboardPage.switchTab('listings')">
                            My Listings
                        </li>
                    ` : ''}
                </ul>
            </div>

            <div class="tab-content ${this.activeTab === 'rentals' ? 'active' : ''}" id="tab-rentals">
                ${this.renderRentals()}
            </div>

            ${user.role === 'owner' ? `
                <div class="tab-content ${this.activeTab === 'listings' ? 'active' : ''}" id="tab-listings">
                    ${this.renderListings()}
                </div>
            ` : ''}
        `;
    },

    renderRentals() {
        const userBookings = Utils.storage.get('bookings') || MockData.bookings;
        const user = Auth.getCurrentUser();
        const myBookings = userBookings.filter(b => b.renterId === user.id);

        if (myBookings.length === 0) {
            return `
                <div class="text-center" style="padding: 60px 20px;">
                    <div style="font-size: 64px; margin-bottom: 20px;">🏍️</div>
                    <h3>No rentals yet</h3>
                    <p class="text-light">Start by browsing available vehicles</p>
                    <a href="#/browse" class="btn btn-primary mt-3">Browse Vehicles</a>
                </div>
            `;
        }

        const upcoming = myBookings.filter(b => b.status === 'upcoming');
        const active = myBookings.filter(b => b.status === 'active');
        const completed = myBookings.filter(b => b.status === 'completed');

        return `
            <div class="tabs mb-3">
                <ul class="tabs-list">
                    <li class="tab-item active" onclick="DashboardPage.filterBookings('all')">
                        All (${myBookings.length})
                    </li>
                    <li class="tab-item" onclick="DashboardPage.filterBookings('upcoming')">
                        Upcoming (${upcoming.length})
                    </li>
                    <li class="tab-item" onclick="DashboardPage.filterBookings('active')">
                        Active (${active.length})
                    </li>
                    <li class="tab-item" onclick="DashboardPage.filterBookings('completed')">
                        Completed (${completed.length})
                    </li>
                </ul>
            </div>

            <div id="bookings-list">
                ${myBookings.map(booking => Components.createBookingCard(booking)).join('')}
            </div>
        `;
    },

    renderListings() {
        const pendingListings = Utils.storage.get('pendingListings') || [];
        const user = Auth.getCurrentUser();
        const myListings = pendingListings.filter(v => v.ownerId === user.id);

        if (myListings.length === 0) {
            return `
                <div class="text-center" style="padding: 60px 20px;">
                    <div style="font-size: 64px; margin-bottom: 20px;">📝</div>
                    <h3>No listings yet</h3>
                    <p class="text-light">List your vehicle to start earning</p>
                    <a href="#/list-vehicle" class="btn btn-primary mt-3">List Your Vehicle</a>
                </div>
            `;
        }

        return `
            <div class="vehicles-grid">
                ${myListings.map(vehicle => `
                    <div class="vehicle-card">
                        <img src="${vehicle.images[0]}" alt="${vehicle.name}" class="vehicle-image">
                        <div class="vehicle-info">
                            <div class="vehicle-header">
                                <h3 class="vehicle-name">${vehicle.name}</h3>
                                ${Components.createBadge('Pending Approval', 'warning')}
                            </div>
                            <p class="text-small text-light">${vehicle.location}</p>
                            <div class="vehicle-pricing">
                                <div>
                                    <span class="vehicle-price">${Utils.formatPrice(vehicle.pricePerHour)}</span>
                                    <span class="vehicle-price-unit">/hr</span>
                                </div>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    },

    switchTab(tab) {
        this.activeTab = tab;
        App.navigate('dashboard');
    },

    filterBookings(status) {
        const userBookings = Utils.storage.get('bookings') || MockData.bookings;
        const user = Auth.getCurrentUser();
        let filtered = userBookings.filter(b => b.renterId === user.id);

        if (status !== 'all') {
            filtered = filtered.filter(b => b.status === status);
        }

        const bookingsList = document.getElementById('bookings-list');
        if (bookingsList) {
            bookingsList.innerHTML = filtered.map(booking => Components.createBookingCard(booking)).join('');
        }
    }
};
