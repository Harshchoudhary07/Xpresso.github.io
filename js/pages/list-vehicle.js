// ========================================
// LIST VEHICLE PAGE
// ========================================

const ListVehiclePage = {
    currentStep: 1,
    totalSteps: 6,
    formData: {
        type: '',
        brand: '',
        model: '',
        registration: '',
        year: '',
        gearType: '',
        fuelType: '',
        mileage: '',
        description: '',
        images: [],
        pricePerHour: '',
        pricePerDay: '',
        deposit: '',
        location: '',
        rules: []
    },

    render() {
        if (!Auth.requireAuth()) return '';

        return `
            <div class="list-vehicle-page">
                <div class="container">
                    <div class="form-container">
                        <h1>List Your Vehicle</h1>
                        <p class="text-light mb-4">Fill in the details to list your vehicle for rent</p>
                        
                        ${this.renderSteps()}
                        ${this.renderStepContent()}
                        ${this.renderActions()}
                    </div>
                </div>
            </div>
        `;
    },

    renderSteps() {
        const steps = ['Basic Details', 'Photos', 'Pricing', 'Location', 'Rules', 'Agreement'];

        return `
            <div class="form-steps">
                ${steps.map((step, index) => `
                    <div class="form-step ${index + 1 === this.currentStep ? 'active' : ''} ${index + 1 < this.currentStep ? 'completed' : ''}">
                        <div class="step-circle">${index + 1 < this.currentStep ? '✓' : index + 1}</div>
                        <span class="step-label">${step}</span>
                    </div>
                `).join('')}
            </div>
        `;
    },

    renderStepContent() {
        const steps = [
            this.renderStep1(),
            this.renderStep2(),
            this.renderStep3(),
            this.renderStep4(),
            this.renderStep5(),
            this.renderStep6()
        ];

        return `
            <div class="form-content">
                ${steps.map((content, index) => `
                    <div class="step-content ${index + 1 === this.currentStep ? 'active' : ''}" id="step-${index + 1}">
                        ${content}
                    </div>
                `).join('')}
            </div>
        `;
    },

    renderStep1() {
        return `
            <h2>Basic Details</h2>
            ${Components.createSelect({
            name: 'vehicle-type',
            label: 'Vehicle Type',
            options: ['Scooty', 'Bike'],
            value: this.formData.type,
            required: true
        })}
            ${Components.createSelect({
            name: 'brand',
            label: 'Brand',
            options: ['Honda', 'TVS', 'Suzuki', 'Bajaj', 'Royal Enfield', 'Hero', 'Yamaha', 'KTM'],
            value: this.formData.brand,
            required: true
        })}
            ${Components.createInput({
            name: 'model',
            label: 'Model',
            placeholder: 'e.g., Activa 6G',
            value: this.formData.model,
            required: true
        })}
            ${Components.createInput({
            name: 'registration',
            label: 'Registration Number',
            placeholder: 'e.g., DL01AB1234',
            value: this.formData.registration,
            required: true,
            hint: 'Format: XX00XX0000'
        })}
            ${Components.createInput({
            type: 'number',
            name: 'year',
            label: 'Registration Year',
            placeholder: '2023',
            value: this.formData.year,
            required: true
        })}
            ${Components.createSelect({
            name: 'gear-type',
            label: 'Gear Type',
            options: ['Automatic', 'Manual'],
            value: this.formData.gearType,
            required: true
        })}
            ${Components.createSelect({
            name: 'fuel-type',
            label: 'Fuel Type',
            options: ['Petrol', 'Electric'],
            value: this.formData.fuelType,
            required: true
        })}
            ${Components.createInput({
            name: 'mileage',
            label: 'Mileage',
            placeholder: 'e.g., 45 km/l',
            value: this.formData.mileage,
            required: true
        })}
            ${Components.createTextarea({
            name: 'description',
            label: 'Description',
            placeholder: 'Describe your vehicle...',
            value: this.formData.description,
            required: true
        })}
        `;
    },

    renderStep2() {
        return `
            <h2>Upload Photos</h2>
            <p class="text-light mb-3">Upload 1-10 photos of your vehicle</p>
            
            <div class="upload-area" id="upload-area" onclick="document.getElementById('file-input').click()">
                <p style="font-size: 48px; margin: 0;">📷</p>
                <p><strong>Click to upload</strong> or drag and drop</p>
                <p class="text-small text-light">JPG or PNG, max 8MB each</p>
            </div>
            <input type="file" id="file-input" accept="image/*" multiple style="display: none;" onchange="ListVehiclePage.handleFileUpload(event)">
            
            <div class="upload-preview" id="upload-preview">
                ${this.formData.images.map((img, index) => `
                    <div class="preview-item">
                        <img src="${img}" class="preview-image" alt="Preview ${index + 1}">
                        <button class="preview-remove" onclick="ListVehiclePage.removeImage(${index})">×</button>
                    </div>
                `).join('')}
            </div>
            ${this.formData.images.length > 0 ? `<p class="text-small text-light mt-2">${this.formData.images.length} photo(s) uploaded</p>` : ''}
        `;
    },

    renderStep3() {
        const suggestions = this.formData.type === 'Scooty'
            ? { min: 25, max: 40, day: 350, deposit: 1500 }
            : { min: 40, max: 60, day: 600, deposit: 3000 };

        return `
            <h2>Pricing</h2>
            <div class="alert alert-info">
                <strong>💡 Pricing Suggestions:</strong><br>
                ${this.formData.type || 'Scooty'}: ₹${suggestions.min}-₹${suggestions.max}/hr • ₹${suggestions.day}/day • ₹${suggestions.deposit} deposit
            </div>
            
            ${Components.createInput({
            type: 'number',
            name: 'price-hour',
            label: 'Price per Hour (₹)',
            placeholder: suggestions.min.toString(),
            value: this.formData.pricePerHour,
            required: true
        })}
            ${Components.createInput({
            type: 'number',
            name: 'price-day',
            label: 'Price per Day (₹)',
            placeholder: suggestions.day.toString(),
            value: this.formData.pricePerDay,
            required: true
        })}
            ${Components.createInput({
            type: 'number',
            name: 'deposit',
            label: 'Security Deposit (₹)',
            placeholder: suggestions.deposit.toString(),
            value: this.formData.deposit,
            required: true,
            hint: 'Refundable amount held during rental'
        })}
        `;
    },

    renderStep4() {
        return `
            <h2>Location & Availability</h2>
            ${Components.createInput({
            name: 'location',
            label: 'Pickup Location',
            placeholder: 'e.g., North Campus, DU',
            value: this.formData.location,
            required: true,
            hint: 'Where renters can pick up the vehicle'
        })}
            ${Components.createTextarea({
            name: 'availability',
            label: 'Availability Notes',
            placeholder: 'e.g., Available on weekends, 9 AM - 6 PM',
            value: this.formData.availability || ''
        })}
        `;
    },

    renderStep5() {
        const commonRules = [
            'Helmet mandatory',
            'No smoking',
            'Max 2 riders',
            'Return with same fuel level',
            'No rash driving'
        ];

        return `
            <h2>House Rules</h2>
            <p class="text-light mb-3">Select rules that renters must follow</p>
            
            ${commonRules.map(rule => `
                <div class="form-checkbox">
                    <input type="checkbox" id="rule-${rule.replace(/\s+/g, '-')}" value="${rule}" ${this.formData.rules.includes(rule) ? 'checked' : ''}>
                    <label for="rule-${rule.replace(/\s+/g, '-')}">${rule}</label>
                </div>
            `).join('')}
        `;
    },

    renderStep6() {
        return `
            <h2>Damage & Fines Agreement</h2>
            <div class="alert alert-warning">
                <strong>⚠️ Important:</strong> By listing your vehicle, you agree to CampusRide's damage and fine policies.
            </div>
            
            <div style="max-height: 300px; overflow-y: auto; border: 1px solid var(--color-border-grey); border-radius: var(--radius-md); padding: var(--spacing-3); background-color: var(--color-bg-soft-grey);">
                <h3>Key Points:</h3>
                <ul>
                    <li>Renters are responsible for any damage during rental period</li>
                    <li>Security deposit covers minor damages</li>
                    <li>You must provide repair estimates for damages</li>
                    <li>CampusRide will mediate disputes</li>
                    <li>You cannot overcharge for damages</li>
                    <li>All fines follow platform policy</li>
                </ul>
                <p class="text-small"><a href="#/policies" target="_blank">Read full policies →</a></p>
            </div>
            
            <div class="form-checkbox mt-3">
                <input type="checkbox" id="agree-policy" required>
                <label for="agree-policy"><strong>I agree to the damage and fines policy</strong></label>
            </div>
        `;
    },

    renderActions() {
        return `
            <div class="form-actions">
                <button 
                    class="btn btn-secondary" 
                    onclick="ListVehiclePage.previousStep()"
                    ${this.currentStep === 1 ? 'style="visibility: hidden;"' : ''}
                >
                    ← Previous
                </button>
                <button 
                    class="btn btn-primary" 
                    onclick="ListVehiclePage.nextStep()"
                >
                    ${this.currentStep === this.totalSteps ? 'Submit for Review' : 'Next →'}
                </button>
            </div>
        `;
    },

    nextStep() {
        if (!this.validateCurrentStep()) return;

        this.saveCurrentStep();

        if (this.currentStep === this.totalSteps) {
            this.submitForm();
        } else {
            this.currentStep++;
            App.navigate('list-vehicle');
        }
    },

    previousStep() {
        if (this.currentStep > 1) {
            this.currentStep--;
            App.navigate('list-vehicle');
        }
    },

    validateCurrentStep() {
        switch (this.currentStep) {
            case 1:
                const type = document.getElementById('vehicle-type').value;
                const brand = document.getElementById('brand').value;
                const model = document.getElementById('model').value;
                const registration = document.getElementById('registration').value;

                if (!type || !brand || !model || !registration) {
                    Utils.showToast('Please fill all required fields', 'error');
                    return false;
                }

                if (!Utils.validateRegistrationNumber(registration)) {
                    Utils.showToast('Invalid registration number format', 'error');
                    document.getElementById('registration').classList.add('shake');
                    setTimeout(() => document.getElementById('registration').classList.remove('shake'), 300);
                    return false;
                }
                return true;

            case 2:
                if (this.formData.images.length === 0) {
                    Utils.showToast('Please upload at least 1 photo', 'error');
                    return false;
                }
                return true;

            case 3:
                const priceHour = document.getElementById('price-hour').value;
                const priceDay = document.getElementById('price-day').value;
                const deposit = document.getElementById('deposit').value;

                if (!priceHour || !priceDay || !deposit) {
                    Utils.showToast('Please fill all pricing fields', 'error');
                    return false;
                }
                return true;

            case 4:
                const location = document.getElementById('location').value;
                if (!location) {
                    Utils.showToast('Please enter pickup location', 'error');
                    return false;
                }
                return true;

            case 6:
                const agreed = document.getElementById('agree-policy').checked;
                if (!agreed) {
                    Utils.showToast('You must agree to the policy to continue', 'error');
                    return false;
                }
                return true;

            default:
                return true;
        }
    },

    saveCurrentStep() {
        switch (this.currentStep) {
            case 1:
                this.formData.type = document.getElementById('vehicle-type').value;
                this.formData.brand = document.getElementById('brand').value;
                this.formData.model = document.getElementById('model').value;
                this.formData.registration = document.getElementById('registration').value;
                this.formData.year = document.getElementById('year').value;
                this.formData.gearType = document.getElementById('gear-type').value;
                this.formData.fuelType = document.getElementById('fuel-type').value;
                this.formData.mileage = document.getElementById('mileage').value;
                this.formData.description = document.getElementById('description').value;
                break;

            case 3:
                this.formData.pricePerHour = document.getElementById('price-hour').value;
                this.formData.pricePerDay = document.getElementById('price-day').value;
                this.formData.deposit = document.getElementById('deposit').value;
                break;

            case 4:
                this.formData.location = document.getElementById('location').value;
                this.formData.availability = document.getElementById('availability').value;
                break;

            case 5:
                this.formData.rules = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'))
                    .map(cb => cb.value);
                break;
        }
    },

    async handleFileUpload(event) {
        const files = Array.from(event.target.files);

        if (this.formData.images.length + files.length > 10) {
            Utils.showToast('Maximum 10 photos allowed', 'error');
            return;
        }

        for (const file of files) {
            if (file.size > 8 * 1024 * 1024) {
                Utils.showToast(`${file.name} is too large (max 8MB)`, 'error');
                continue;
            }

            const compressed = await Utils.compressImage(file);
            this.formData.images.push(compressed);
        }

        App.navigate('list-vehicle');
    },

    removeImage(index) {
        this.formData.images.splice(index, 1);
        App.navigate('list-vehicle');
    },

    submitForm() {
        const vehicle = {
            id: Utils.generateId(),
            name: `${this.formData.brand} ${this.formData.model}`,
            ...this.formData,
            pricePerHour: parseInt(this.formData.pricePerHour),
            pricePerDay: parseInt(this.formData.pricePerDay),
            deposit: parseInt(this.formData.deposit),
            year: parseInt(this.formData.year),
            ownerId: Auth.getCurrentUser().id,
            ownerName: Auth.getCurrentUser().name,
            available: false, // Pending approval
            rating: 0,
            distance: '0 km'
        };

        // Save to pending listings
        const pendingListings = Utils.storage.get('pendingListings') || [];
        pendingListings.push(vehicle);
        Utils.storage.set('pendingListings', pendingListings);

        Utils.showToast('Vehicle submitted for review!', 'success');

        // Reset form
        this.currentStep = 1;
        this.formData = {
            type: '', brand: '', model: '', registration: '', year: '',
            gearType: '', fuelType: '', mileage: '', description: '',
            images: [], pricePerHour: '', pricePerDay: '', deposit: '',
            location: '', rules: []
        };

        setTimeout(() => {
            App.navigate('dashboard');
        }, 1500);
    }
};
