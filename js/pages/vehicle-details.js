// ========================================
// VEHICLE DETAILS PAGE
// ========================================

const VehicleDetailsPage = {
    currentVehicle: null,
    selectedImageIndex: 0,

    render(vehicleId) {
        this.currentVehicle = MockData.vehicles.find(v => v.id === vehicleId);

        if (!this.currentVehicle) {
            return `
                <div class="container section">
                    <div class="text-center">
                        <h2>Vehicle not found</h2>
                        <a href="#/browse" class="btn btn-primary mt-3">Browse Vehicles</a>
                    </div>
                </div>
            `;
        }

        const vehicle = this.currentVehicle;
        const owner = MockData.users.find(u => u.id === vehicle.ownerId);

        return `
            <div class="vehicle-details-page">
                <div class="container">
                    <a href="#/browse" class="btn btn-link mb-3">← Back to Browse</a>
                    
                    <div class="vehicle-details-grid">
                        <div>
                            ${this.renderImageGallery(vehicle)}
                            ${this.renderVehicleInfo(vehicle, owner)}
                        </div>
                        ${this.renderBookingCard(vehicle)}
                    </div>
                </div>
            </div>
        `;
    },

    renderImageGallery(vehicle) {
        return `
            <div class="image-gallery">
                <img src="${vehicle.images[this.selectedImageIndex]}" alt="${vehicle.name}" class="main-image" id="main-image">
                ${vehicle.images.length > 1 ? `
                    <div class="thumbnail-grid">
                        ${vehicle.images.map((img, index) => `
                            <img 
                                src="${img}" 
                                alt="Thumbnail ${index + 1}" 
                                class="thumbnail ${index === this.selectedImageIndex ? 'active' : ''}"
                                onclick="VehicleDetailsPage.selectImage(${index})"
                            >
                        `).join('')}
                    </div>
                ` : ''}
            </div>
        `;
    },

    renderVehicleInfo(vehicle, owner) {
        return `
            <div class="card mt-4">
                <h2>${vehicle.name}</h2>
                <div class="flex gap-2 mb-3">
                    ${Components.createBadge(vehicle.type, 'primary')}
                    ${Components.createBadge(vehicle.gearType, 'grey')}
                    ${Components.createBadge(vehicle.brand, 'grey')}
                </div>
                
                <div class="mb-3">
                    <p><strong>⭐ ${vehicle.rating}</strong> rating</p>
                    <p><strong>📍 ${vehicle.location}</strong> • ${vehicle.distance} away</p>
                </div>

                <div class="divider"></div>

                <h3>Vehicle Specifications</h3>
                <table class="specs-table">
                    <tr>
                        <td>Model</td>
                        <td><strong>${vehicle.model}</strong></td>
                    </tr>
                    <tr>
                        <td>Year</td>
                        <td><strong>${vehicle.year}</strong></td>
                    </tr>
                    <tr>
                        <td>Registration</td>
                        <td><strong>${vehicle.registration}</strong></td>
                    </tr>
                    <tr>
                        <td>Gear Type</td>
                        <td><strong>${vehicle.gearType}</strong></td>
                    </tr>
                    <tr>
                        <td>Fuel Type</td>
                        <td><strong>${vehicle.fuelType}</strong></td>
                    </tr>
                    <tr>
                        <td>Mileage</td>
                        <td><strong>${vehicle.mileage}</strong></td>
                    </tr>
                </table>

                <div class="divider"></div>

                <h3>Description</h3>
                <p>${vehicle.description}</p>

                <div class="divider"></div>

                <h3>House Rules</h3>
                <ul>
                    ${vehicle.rules.map(rule => `<li>${rule}</li>`).join('')}
                </ul>

                <div class="divider"></div>

                <h3>Owner Information</h3>
                <p><strong>Name:</strong> ${owner ? owner.name : 'Unknown'}</p>
                <p><strong>College:</strong> ${owner ? owner.college : 'Unknown'}</p>
                ${owner && owner.verified ? Components.createBadge('Verified Owner', 'success') : ''}
            </div>
        `;
    },

    renderBookingCard(vehicle) {
        return `
            <div class="booking-card">
                <h3>Pricing</h3>
                <div class="mb-3">
                    <p class="text-primary" style="font-size: 28px; font-weight: bold; margin: 0;">
                        ${Utils.formatPrice(vehicle.pricePerHour)}<span style="font-size: 16px; font-weight: normal;">/hour</span>
                    </p>
                    <p class="text-light">
                        ${Utils.formatPrice(vehicle.pricePerDay)}/day
                    </p>
                </div>

                <div class="divider"></div>

                <h4>Security Deposit</h4>
                <p class="text-semibold">${Utils.formatPrice(vehicle.deposit)}</p>
                <p class="text-small text-light">Refundable after return</p>

                <div class="divider"></div>

                ${Components.createInput({
            type: 'datetime-local',
            name: 'pickup-time',
            label: 'Pickup Time',
            required: true
        })}

                ${Components.createInput({
            type: 'datetime-local',
            name: 'return-time',
            label: 'Return Time',
            required: true
        })}

                <button class="btn btn-primary btn-block btn-lg" onclick="VehicleDetailsPage.bookVehicle()">
                    Book Now
                </button>

                <p class="text-tiny text-light text-center mt-2">
                    You won't be charged yet
                </p>
            </div>
        `;
    },

    selectImage(index) {
        this.selectedImageIndex = index;
        const mainImage = document.getElementById('main-image');
        if (mainImage) {
            mainImage.src = this.currentVehicle.images[index];
        }

        // Update thumbnail active state
        document.querySelectorAll('.thumbnail').forEach((thumb, i) => {
            thumb.classList.toggle('active', i === index);
        });
    },

    bookVehicle() {
        if (!Auth.requireAuth()) return;
        if (!Auth.requireVerification()) return;

        const pickupTime = document.getElementById('pickup-time').value;
        const returnTime = document.getElementById('return-time').value;

        if (!pickupTime || !returnTime) {
            Utils.showToast('Please select pickup and return times', 'warning');
            return;
        }

        const pickup = new Date(pickupTime);
        const returnDate = new Date(returnTime);

        if (pickup >= returnDate) {
            Utils.showToast('Return time must be after pickup time', 'error');
            return;
        }

        // Calculate cost
        const hours = Math.ceil((returnDate - pickup) / (1000 * 60 * 60));
        const days = Math.floor(hours / 24);
        let cost;

        if (days > 0) {
            cost = days * this.currentVehicle.pricePerDay;
        } else {
            cost = hours * this.currentVehicle.pricePerHour;
        }

        // Create booking
        const booking = {
            id: Utils.generateId(),
            vehicleId: this.currentVehicle.id,
            renterId: Auth.getCurrentUser().id,
            pickupTime: pickupTime,
            returnTime: returnTime,
            status: 'upcoming',
            totalCost: cost,
            deposit: this.currentVehicle.deposit
        };

        // Save booking
        const bookings = Utils.storage.get('bookings') || [];
        bookings.push(booking);
        Utils.storage.set('bookings', bookings);

        Utils.showToast('Booking successful! Check your dashboard.', 'success');

        setTimeout(() => {
            App.navigate('dashboard');
        }, 1500);
    }
};
