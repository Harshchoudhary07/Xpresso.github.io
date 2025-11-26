// ========================================
// REUSABLE COMPONENT TEMPLATES
// ========================================

const Components = {
    // Create Button
    createButton(text, variant = 'primary', onClick = '', additionalClasses = '') {
        const classes = `btn btn-${variant} ${additionalClasses}`;
        const onclickAttr = onClick ? `onclick="${onClick}"` : '';
        return `<button class="${classes}" ${onclickAttr}>${text}</button>`;
    },

    // Create Card
    createCard(content, className = '') {
        return `<div class="card ${className}">${content}</div>`;
    },

    // Create Input
    createInput(config) {
        const {
            type = 'text',
            name,
            label,
            placeholder = '',
            value = '',
            required = false,
            error = '',
            hint = ''
        } = config;

        return `
            <div class="form-group">
                ${label ? `<label class="form-label" for="${name}">${label}${required ? ' *' : ''}</label>` : ''}
                <input 
                    type="${type}" 
                    id="${name}" 
                    name="${name}" 
                    class="form-input ${error ? 'error' : ''}" 
                    placeholder="${placeholder}"
                    value="${value}"
                    ${required ? 'required' : ''}
                >
                ${error ? `<span class="form-error">${error}</span>` : ''}
                ${hint ? `<span class="form-hint">${hint}</span>` : ''}
            </div>
        `;
    },

    // Create Select
    createSelect(config) {
        const {
            name,
            label,
            options = [],
            value = '',
            required = false,
            error = ''
        } = config;

        return `
            <div class="form-group">
                ${label ? `<label class="form-label" for="${name}">${label}${required ? ' *' : ''}</label>` : ''}
                <select 
                    id="${name}" 
                    name="${name}" 
                    class="form-select ${error ? 'error' : ''}"
                    ${required ? 'required' : ''}
                >
                    <option value="">Select ${label}</option>
                    ${options.map(opt => `
                        <option value="${opt.value || opt}" ${value === (opt.value || opt) ? 'selected' : ''}>
                            ${opt.label || opt}
                        </option>
                    `).join('')}
                </select>
                ${error ? `<span class="form-error">${error}</span>` : ''}
            </div>
        `;
    },

    // Create Textarea
    createTextarea(config) {
        const {
            name,
            label,
            placeholder = '',
            value = '',
            required = false,
            error = ''
        } = config;

        return `
            <div class="form-group">
                ${label ? `<label class="form-label" for="${name}">${label}${required ? ' *' : ''}</label>` : ''}
                <textarea 
                    id="${name}" 
                    name="${name}" 
                    class="form-textarea ${error ? 'error' : ''}" 
                    placeholder="${placeholder}"
                    ${required ? 'required' : ''}
                >${value}</textarea>
                ${error ? `<span class="form-error">${error}</span>` : ''}
            </div>
        `;
    },

    // Create Badge
    createBadge(text, variant = 'primary') {
        return `<span class="badge badge-${variant}">${text}</span>`;
    },

    // Create Header/Navbar
    createHeader(isLoggedIn = false, userRole = 'renter') {
        const user = Auth.getCurrentUser();
        const loggedIn = user !== null;

        return `
            <nav class="navbar container">
                <a href="#/" class="navbar-brand">Campus<span>Ride</span></a>
                
                <button class="navbar-toggle" onclick="Components.toggleMobileMenu()">☰</button>
                
                <ul class="navbar-nav" id="navbar-nav">
                    <li><a href="#/" class="nav-link">Home</a></li>
                    <li><a href="#/browse" class="nav-link">Browse</a></li>
                    <li><a href="#/policies" class="nav-link">Policies</a></li>
                    ${loggedIn ? `<li><a href="#/dashboard" class="nav-link">Dashboard</a></li>` : ''}
                </ul>
                
                <div class="navbar-actions" id="navbar-actions">
                    ${loggedIn ? `
                        <a href="#/list-vehicle" class="btn btn-primary btn-sm">List Vehicle</a>
                        <button class="btn btn-secondary btn-sm" onclick="Auth.logout()">Logout</button>
                    ` : `
                        <a href="#/login" class="btn btn-link btn-sm">Login</a>
                        <a href="#/signup" class="btn btn-primary btn-sm">Sign Up</a>
                    `}
                </div>
            </nav>
        `;
    },

    toggleMobileMenu() {
        const nav = document.getElementById('navbar-nav');
        nav.classList.toggle('active');
    },

    // Create Vehicle Card
    createVehicleCard(vehicle) {
        return `
            <div class="vehicle-card" onclick="App.navigate('vehicle-details', '${vehicle.id}')">
                <img src="${vehicle.images[0]}" alt="${vehicle.name}" class="vehicle-image">
                <div class="vehicle-info">
                    <div class="vehicle-header">
                        <h3 class="vehicle-name">${vehicle.name}</h3>
                        <span class="badge badge-primary">${vehicle.type}</span>
                    </div>
                    <div class="vehicle-tags">
                        ${this.createBadge(vehicle.gearType, 'grey')}
                        ${this.createBadge(vehicle.brand, 'grey')}
                    </div>
                    <div class="vehicle-details">
                        <div class="vehicle-detail-item">
                            <span>📍</span>
                            <span>${vehicle.location} • ${vehicle.distance}</span>
                        </div>
                        <div class="vehicle-detail-item">
                            <span>⭐</span>
                            <span>${vehicle.rating} rating</span>
                        </div>
                    </div>
                    <div class="vehicle-pricing">
                        <div>
                            <span class="vehicle-price">${Utils.formatPrice(vehicle.pricePerHour)}</span>
                            <span class="vehicle-price-unit">/hr</span>
                        </div>
                        <button class="btn btn-link btn-sm" onclick="event.stopPropagation(); App.navigate('vehicle-details', '${vehicle.id}')">
                            View Details →
                        </button>
                    </div>
                </div>
            </div>
        `;
    },

    // Create Modal
    createModal(title, content, footer = '') {
        return `
            <div class="modal-overlay" onclick="Components.closeModal(event)">
                <div class="modal" onclick="event.stopPropagation()">
                    <div class="modal-header">
                        <h3 class="modal-title">${title}</h3>
                        <button class="modal-close" onclick="Components.closeModal()">×</button>
                    </div>
                    <div class="modal-body">
                        ${content}
                    </div>
                    ${footer ? `<div class="modal-footer">${footer}</div>` : ''}
                </div>
            </div>
        `;
    },

    showModal(title, content, footer = '') {
        const modalRoot = document.getElementById('modal-root');
        modalRoot.innerHTML = this.createModal(title, content, footer);
    },

    closeModal(event) {
        if (!event || event.target.classList.contains('modal-overlay') || event.target.classList.contains('modal-close')) {
            document.getElementById('modal-root').innerHTML = '';
        }
    },

    // Create Booking Card
    createBookingCard(booking) {
        const vehicle = MockData.vehicles.find(v => v.id === booking.vehicleId);
        if (!vehicle) return '';

        const statusColors = {
            upcoming: 'primary',
            active: 'success',
            completed: 'grey'
        };

        return `
            <div class="booking-card-item">
                <div class="booking-header">
                    <h3>Booking #${booking.id.toUpperCase()}</h3>
                    ${this.createBadge(booking.status.toUpperCase(), statusColors[booking.status])}
                </div>
                <div class="booking-grid">
                    <img src="${vehicle.images[0]}" alt="${vehicle.name}" class="booking-image">
                    <div class="booking-details">
                        <h4>${vehicle.name}</h4>
                        <p><strong>Pickup:</strong> ${Utils.formatDateTime(booking.pickupTime)}</p>
                        <p><strong>Return:</strong> ${Utils.formatDateTime(booking.returnTime)}</p>
                        <p><strong>Location:</strong> ${vehicle.location}</p>
                        <p><strong>Total Cost:</strong> ${Utils.formatPrice(booking.totalCost)}</p>
                        <div class="booking-actions">
                            <button class="btn btn-primary btn-sm" onclick="Components.contactOwner('${vehicle.ownerId}')">
                                Contact Owner
                            </button>
                            <button class="btn btn-secondary btn-sm" onclick="App.navigate('vehicle-details', '${vehicle.id}')">
                                View Details
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    contactOwner(ownerId) {
        const owner = MockData.users.find(u => u.id === ownerId);
        if (owner) {
            this.showModal(
                'Contact Owner',
                `
                    <p><strong>Name:</strong> ${owner.name}</p>
                    <p><strong>Phone:</strong> ${owner.phone}</p>
                    <p><strong>Email:</strong> ${owner.email}</p>
                `,
                `<button class="btn btn-primary" onclick="Components.closeModal()">Close</button>`
            );
        }
    },

    // Loading Spinner
    showLoading() {
        return '<div class="flex-center" style="padding: 40px;"><div class="spinner spinner-primary"></div></div>';
    }
};
