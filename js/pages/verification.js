// ========================================
// VERIFICATION PAGE
// ========================================

const VerificationPage = {
    currentStep: 1,
    totalSteps: 4,
    formData: {
        name: '',
        college: '',
        hostel: '',
        phone: '',
        email: '',
        collegeIdFront: null,
        collegeIdBack: null,
        govtId: null,
        selfie: null
    },

    render() {
        if (!Auth.requireAuth()) return '';

        const user = Auth.getCurrentUser();
        if (user.verified) {
            return `
                <div class="container section text-center">
                    <div class="card" style="max-width: 500px; margin: 0 auto;">
                        <div style="font-size: 64px; margin-bottom: 20px;">✅</div>
                        <h2>Already Verified!</h2>
                        <p class="text-light">Your account is already verified.</p>
                        <a href="#/dashboard" class="btn btn-primary mt-3">Go to Dashboard</a>
                    </div>
                </div>
            `;
        }

        return `
            <div class="list-vehicle-page">
                <div class="container">
                    <div class="form-container">
                        <h1>Verification & KYC</h1>
                        <p class="text-light mb-4">Complete verification to start renting or listing vehicles</p>
                        
                        ${this.renderProgress()}
                        ${this.renderStepContent()}
                        ${this.renderActions()}
                    </div>
                </div>
            </div>
        `;
    },

    renderProgress() {
        const steps = ['Basic Details', 'ID Upload', 'Selfie', 'Done'];

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
            this.renderStep4()
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
        const user = Auth.getCurrentUser();

        // Pre-fill form data with user info
        if (!this.formData.name && user) {
            this.formData.name = user.name || '';
            this.formData.college = user.college || '';
            this.formData.hostel = user.hostel || '';
            this.formData.phone = user.phone || '';
            this.formData.email = user.email || '';
        }

        return `
            <h2>Basic Details</h2>
            <p class="text-light mb-3">Confirm your information</p>
            ${Components.createInput({
            name: 'name',
            label: 'Full Name',
            placeholder: 'As per college ID',
            value: this.formData.name,
            required: true
        })}
            ${Components.createSelect({
            name: 'college',
            label: 'College/University',
            options: MockData.colleges,
            value: this.formData.college,
            required: true
        })}
            ${Components.createInput({
            name: 'hostel',
            label: 'Hostel/Residence',
            placeholder: 'e.g., North Campus Hostel',
            value: this.formData.hostel,
            required: true
        })}
            ${Components.createInput({
            type: 'tel',
            name: 'phone',
            label: 'Phone Number',
            placeholder: '9876543210',
            value: this.formData.phone,
            required: true
        })}
            ${Components.createInput({
            type: 'email',
            name: 'email',
            label: 'Email Address',
            placeholder: 'your.email@example.com',
            value: this.formData.email,
            required: true
        })}
        `;
    },

    renderStep2() {
        return `
            <h2>Upload ID Documents</h2>
            <p class="text-light mb-4">Upload clear photos of your college ID and government ID</p>
            
            <div class="form-group">
                <label class="form-label">College ID (Front) *</label>
                <div class="upload-area" onclick="document.getElementById('college-id-front').click()">
                    ${this.formData.collegeIdFront ? `
                        <img src="${this.formData.collegeIdFront}" style="max-width: 100%; max-height: 200px; border-radius: 8px;">
                    ` : `
                        <p style="font-size: 48px; margin: 0;">🎓</p>
                        <p>Upload College ID (Front)</p>
                    `}
                </div>
                <input type="file" id="college-id-front" accept="image/*" style="display: none;" onchange="VerificationPage.handleImageUpload(event, 'collegeIdFront')">
            </div>

            <div class="form-group">
                <label class="form-label">College ID (Back) *</label>
                <div class="upload-area" onclick="document.getElementById('college-id-back').click()">
                    ${this.formData.collegeIdBack ? `
                        <img src="${this.formData.collegeIdBack}" style="max-width: 100%; max-height: 200px; border-radius: 8px;">
                    ` : `
                        <p style="font-size: 48px; margin: 0;">🎓</p>
                        <p>Upload College ID (Back)</p>
                    `}
                </div>
                <input type="file" id="college-id-back" accept="image/*" style="display: none;" onchange="VerificationPage.handleImageUpload(event, 'collegeIdBack')">
            </div>

            <div class="form-group">
                <label class="form-label">Government ID (Aadhaar/Driver's License) *</label>
                <div class="upload-area" onclick="document.getElementById('govt-id').click()">
                    ${this.formData.govtId ? `
                        <img src="${this.formData.govtId}" style="max-width: 100%; max-height: 200px; border-radius: 8px;">
                    ` : `
                        <p style="font-size: 48px; margin: 0;">🆔</p>
                        <p>Upload Government ID</p>
                    `}
                </div>
                <input type="file" id="govt-id" accept="image/*" style="display: none;" onchange="VerificationPage.handleImageUpload(event, 'govtId')">
            </div>
        `;
    },

    renderStep3() {
        return `
            <h2>Take a Selfie</h2>
            <p class="text-light mb-4">Take a clear selfie for identity verification</p>
            
            <div class="form-group">
                <div class="upload-area" onclick="document.getElementById('selfie').click()">
                    ${this.formData.selfie ? `
                        <img src="${this.formData.selfie}" style="max-width: 100%; max-height: 300px; border-radius: 8px;">
                    ` : `
                        <p style="font-size: 64px; margin: 0;">🤳</p>
                        <p><strong>Take a Selfie</strong></p>
                        <p class="text-small text-light">Make sure your face is clearly visible</p>
                    `}
                </div>
                <input type="file" id="selfie" accept="image/*" capture="user" style="display: none;" onchange="VerificationPage.handleImageUpload(event, 'selfie')">
            </div>
        `;
    },

    renderStep4() {
        return `
            <div class="text-center">
                <div style="font-size: 80px; margin-bottom: 20px;">⏳</div>
                <h2>Verification Submitted!</h2>
                <p class="text-light mb-4">Your documents are under review. You'll receive an email/SMS once verified.</p>
                
                <div class="alert alert-info text-left">
                    <strong>What happens next?</strong>
                    <ul style="margin: 10px 0 0 20px;">
                        <li>Our team will review your documents</li>
                        <li>Verification usually takes 1-2 business days</li>
                        <li>You'll be notified via email and SMS</li>
                        <li>Once verified, you can start renting or listing</li>
                    </ul>
                </div>

                <button class="btn btn-primary btn-lg mt-4" onclick="VerificationPage.completeVerification()">
                    Complete & Go to Dashboard
                </button>
            </div>
        `;
    },

    renderActions() {
        if (this.currentStep === this.totalSteps) return '';

        return `
            <div class="form-actions">
                <button 
                    class="btn btn-secondary" 
                    onclick="VerificationPage.previousStep()"
                    ${this.currentStep === 1 ? 'style="visibility: hidden;"' : ''}
                >
                    ← Previous
                </button>
                <button 
                    class="btn btn-primary" 
                    onclick="VerificationPage.nextStep()"
                >
                    ${this.currentStep === this.totalSteps - 1 ? 'Submit for Review' : 'Next →'}
                </button>
            </div>
        `;
    },

    async handleImageUpload(event, field) {
        const file = event.target.files[0];
        if (!file) return;

        if (file.size > 8 * 1024 * 1024) {
            Utils.showToast('File too large (max 8MB)', 'error');
            return;
        }

        const compressed = await Utils.compressImage(file);
        this.formData[field] = compressed;
        App.navigate('verification');
    },

    nextStep() {
        if (!this.validateCurrentStep()) return;

        this.saveCurrentStep();
        this.currentStep++;
        App.navigate('verification');
    },

    previousStep() {
        if (this.currentStep > 1) {
            this.currentStep--;
            App.navigate('verification');
        }
    },

    validateCurrentStep() {
        switch (this.currentStep) {
            case 1:
                const name = document.getElementById('name').value;
                const college = document.getElementById('college').value;
                const phone = document.getElementById('phone').value;
                const email = document.getElementById('email').value;

                if (!name || !college || !phone || !email) {
                    Utils.showToast('Please fill all required fields', 'error');
                    return false;
                }

                if (!Utils.validatePhone(phone)) {
                    Utils.showToast('Invalid phone number', 'error');
                    return false;
                }

                if (!Utils.validateEmail(email)) {
                    Utils.showToast('Invalid email address', 'error');
                    return false;
                }
                return true;

            case 2:
                if (!this.formData.collegeIdFront || !this.formData.collegeIdBack || !this.formData.govtId) {
                    Utils.showToast('Please upload all required documents', 'error');
                    return false;
                }
                return true;

            case 3:
                if (!this.formData.selfie) {
                    Utils.showToast('Please take a selfie', 'error');
                    return false;
                }
                return true;

            default:
                return true;
        }
    },

    saveCurrentStep() {
        if (this.currentStep === 1) {
            this.formData.name = document.getElementById('name').value;
            this.formData.college = document.getElementById('college').value;
            this.formData.hostel = document.getElementById('hostel').value;
            this.formData.phone = document.getElementById('phone').value;
            this.formData.email = document.getElementById('email').value;
        }
    },

    completeVerification() {
        // In a real app, this would wait for admin approval
        // For demo, we'll verify immediately
        Auth.verifyUser();

        // Reset form
        this.currentStep = 1;
        this.formData = {
            name: '', college: '', hostel: '', phone: '', email: '',
            collegeIdFront: null, collegeIdBack: null, govtId: null, selfie: null
        };

        App.navigate('dashboard');
    }
};
