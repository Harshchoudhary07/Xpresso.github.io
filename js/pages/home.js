// ========================================
// HOME PAGE
// ========================================

const HomePage = {
    render() {
        return `
            <!-- Hero Section -->
            <section class="hero-section">
                <div class="container">
                    <div class="hero-content">
                        <div class="hero-left">
                            <h1>Affordable Campus Rides, Just for Students</h1>
                            <p>Rent bikes and scooters from verified students and local owners.</p>
                            <div class="hero-actions">
                                <a href="#/browse" class="btn btn-primary btn-lg">Rent a Bike/Scooty</a>
                                <a href="#/list-vehicle" class="btn btn-secondary btn-lg">List Your Vehicle</a>
                            </div>
                        </div>
                        <div class="hero-right">
                            <img src="https://via.placeholder.com/500x400/0D6EFD/FFFFFF?text=Campus+Ride" alt="Campus Ride" class="hero-image">
                        </div>
                    </div>
                </div>
            </section>

            <!-- Why Choose Section -->
            <section class="section why-choose-section">
                <div class="container">
                    <h2 class="text-center">Why Choose CampusRide?</h2>
                    <div class="feature-cards">
                        <div class="feature-card">
                            <div class="feature-icon">💰</div>
                            <h3>Student-Friendly Pricing</h3>
                            <p>No markup fees. Fair pricing set by fellow students and verified owners.</p>
                        </div>
                        <div class="feature-card">
                            <div class="feature-icon">🔒</div>
                            <h3>Privacy First</h3>
                            <p>No data sharing with third parties. Only verified users can see your profile.</p>
                        </div>
                        <div class="feature-card">
                            <div class="feature-icon">✅</div>
                            <h3>Easy Verification</h3>
                            <p>Quick KYC with college ID. Get verified in minutes and start riding.</p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- How It Works - Renters -->
            <section class="section">
                <div class="container">
                    <h2 class="text-center">How It Works - For Renters</h2>
                    <div class="steps-container">
                        <div class="step-card">
                            <div class="step-number">1</div>
                            <h3>Complete Verification</h3>
                            <p>Upload your college ID and complete quick KYC process</p>
                        </div>
                        <div class="step-card">
                            <div class="step-number">2</div>
                            <h3>Browse Vehicles</h3>
                            <p>Filter and find the perfect ride near your campus</p>
                        </div>
                        <div class="step-card">
                            <div class="step-number">3</div>
                            <h3>Book & Pay</h3>
                            <p>Secure in-app payment with instant confirmation</p>
                        </div>
                        <div class="step-card">
                            <div class="step-number">4</div>
                            <h3>Pick Up & Ride</h3>
                            <p>Meet the owner, collect keys, and enjoy your ride</p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- How It Works - Owners -->
            <section class="section bg-soft-grey">
                <div class="container">
                    <h2 class="text-center">How It Works - For Owners</h2>
                    <div class="steps-container" style="grid-template-columns: repeat(3, 1fr);">
                        <div class="step-card">
                            <div class="step-number">1</div>
                            <h3>List Your Vehicle</h3>
                            <p>Add details, photos, and set your pricing</p>
                        </div>
                        <div class="step-card">
                            <div class="step-number">2</div>
                            <h3>Accept Bookings</h3>
                            <p>Get notifications and approve rental requests</p>
                        </div>
                        <div class="step-card">
                            <div class="step-number">3</div>
                            <h3>Earn Money</h3>
                            <p>Instant payout after successful rental completion</p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Trust & Safety -->
            <section class="section">
                <div class="container">
                    <h2 class="text-center">Trust & Safety</h2>
                    <div class="feature-cards">
                        <div class="feature-card">
                            <div class="feature-icon">🎓</div>
                            <h3>College ID Mandatory</h3>
                            <p>All users must verify with valid college ID</p>
                        </div>
                        <div class="feature-card">
                            <div class="feature-icon">🆔</div>
                            <h3>Government ID Required</h3>
                            <p>Additional verification with Aadhaar or Driver's License</p>
                        </div>
                        <div class="feature-card">
                            <div class="feature-icon">🛡️</div>
                            <h3>Damage Protection</h3>
                            <p>Clear policies and security deposits for peace of mind</p>
                        </div>
                    </div>
                    <div class="text-center mt-4">
                        <a href="#/policies" class="btn btn-primary">View All Policies</a>
                    </div>
                </div>
            </section>
        `;
    }
};
