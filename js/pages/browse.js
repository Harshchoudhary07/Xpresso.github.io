// ========================================
// BROWSE PAGE
// ========================================

const BrowsePage = {
    filters: {
        location: '',
        type: '',
        gearType: '',
        brand: '',
        minPrice: 0,
        maxPrice: 1000
    },

    render() {
        return `
            <div class="browse-page">
                <div class="container">
                    <h1>Browse Vehicles</h1>
                    <div class="browse-container">
                        ${this.renderFilters()}
                        <div id="vehicles-results">
                            ${this.renderVehicles()}
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    renderFilters() {
        return `
            <aside class="filters-sidebar">
                <h3>Filters</h3>
                
                <div class="filter-section">
                    <h3>Location</h3>
                    ${Components.createInput({
            type: 'text',
            name: 'filter-location',
            placeholder: 'Search location...',
            value: this.filters.location
        })}
                </div>

                <div class="filter-section">
                    <h3>Vehicle Type</h3>
                    <div class="filter-options">
                        <div class="form-checkbox">
                            <input type="radio" name="vehicle-type" value="" id="type-all" ${!this.filters.type ? 'checked' : ''}>
                            <label for="type-all">All</label>
                        </div>
                        <div class="form-checkbox">
                            <input type="radio" name="vehicle-type" value="Scooty" id="type-scooty" ${this.filters.type === 'Scooty' ? 'checked' : ''}>
                            <label for="type-scooty">Scooty</label>
                        </div>
                        <div class="form-checkbox">
                            <input type="radio" name="vehicle-type" value="Bike" id="type-bike" ${this.filters.type === 'Bike' ? 'checked' : ''}>
                            <label for="type-bike">Bike</label>
                        </div>
                    </div>
                </div>

                <div class="filter-section">
                    <h3>Gear Type</h3>
                    <div class="filter-options">
                        <div class="form-checkbox">
                            <input type="radio" name="gear-type" value="" id="gear-all" ${!this.filters.gearType ? 'checked' : ''}>
                            <label for="gear-all">All</label>
                        </div>
                        <div class="form-checkbox">
                            <input type="radio" name="gear-type" value="Automatic" id="gear-auto" ${this.filters.gearType === 'Automatic' ? 'checked' : ''}>
                            <label for="gear-auto">Automatic</label>
                        </div>
                        <div class="form-checkbox">
                            <input type="radio" name="gear-type" value="Manual" id="gear-manual" ${this.filters.gearType === 'Manual' ? 'checked' : ''}>
                            <label for="gear-manual">Manual</label>
                        </div>
                    </div>
                </div>

                <div class="filter-section">
                    <h3>Brand</h3>
                    ${Components.createSelect({
            name: 'filter-brand',
            label: '',
            options: ['All Brands', 'Honda', 'TVS', 'Suzuki', 'Bajaj', 'Royal Enfield', 'Hero', 'Yamaha'],
            value: this.filters.brand
        })}
                </div>

                <div class="filter-section">
                    <h3>Price Range (per hour)</h3>
                    <div class="price-range-inputs">
                        ${Components.createInput({
            type: 'number',
            name: 'min-price',
            placeholder: 'Min',
            value: this.filters.minPrice
        })}
                        ${Components.createInput({
            type: 'number',
            name: 'max-price',
            placeholder: 'Max',
            value: this.filters.maxPrice
        })}
                    </div>
                </div>

                <button class="btn btn-primary btn-block" onclick="BrowsePage.applyFilters()">Apply Filters</button>
                <button class="btn btn-secondary btn-block mt-2" onclick="BrowsePage.clearFilters()">Clear All</button>
            </aside>
        `;
    },

    renderVehicles() {
        const filtered = this.getFilteredVehicles();

        if (filtered.length === 0) {
            return `
                <div class="text-center" style="padding: 60px 20px;">
                    <h3>No vehicles found</h3>
                    <p class="text-light">Try adjusting your filters</p>
                </div>
            `;
        }

        return `
            <div class="vehicles-grid">
                ${filtered.map(vehicle => Components.createVehicleCard(vehicle)).join('')}
            </div>
        `;
    },

    getFilteredVehicles() {
        let vehicles = MockData.vehicles.filter(v => v.available);

        if (this.filters.location) {
            vehicles = vehicles.filter(v =>
                v.location.toLowerCase().includes(this.filters.location.toLowerCase())
            );
        }

        if (this.filters.type) {
            vehicles = vehicles.filter(v => v.type === this.filters.type);
        }

        if (this.filters.gearType) {
            vehicles = vehicles.filter(v => v.gearType === this.filters.gearType);
        }

        if (this.filters.brand && this.filters.brand !== 'All Brands') {
            vehicles = vehicles.filter(v => v.brand === this.filters.brand);
        }

        vehicles = vehicles.filter(v =>
            v.pricePerHour >= this.filters.minPrice &&
            v.pricePerHour <= this.filters.maxPrice
        );

        return vehicles;
    },

    applyFilters() {
        this.filters.location = document.getElementById('filter-location').value;
        this.filters.type = document.querySelector('input[name="vehicle-type"]:checked').value;
        this.filters.gearType = document.querySelector('input[name="gear-type"]:checked').value;
        this.filters.brand = document.getElementById('filter-brand').value;
        this.filters.minPrice = parseInt(document.getElementById('min-price').value) || 0;
        this.filters.maxPrice = parseInt(document.getElementById('max-price').value) || 1000;

        document.getElementById('vehicles-results').innerHTML = this.renderVehicles();
    },

    clearFilters() {
        this.filters = {
            location: '',
            type: '',
            gearType: '',
            brand: '',
            minPrice: 0,
            maxPrice: 1000
        };
        App.navigate('browse');
    },

    init() {
        // Add event listeners for real-time filtering
        setTimeout(() => {
            const locationInput = document.getElementById('filter-location');
            if (locationInput) {
                locationInput.addEventListener('input', Utils.debounce(() => {
                    this.applyFilters();
                }, 500));
            }
        }, 100);
    }
};
