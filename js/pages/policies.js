// ========================================
// POLICIES PAGE
// ========================================

const PoliciesPage = {
    render() {
        return `
            <div class="policies-page">
                <div class="container">
                    <div class="policies-container">
                        <h1 class="text-center mb-5">Policies & Guidelines</h1>

                        ${this.renderRenterResponsibilities()}
                        ${this.renderFineStructure()}
                        ${this.renderDisputeResolution()}
                        ${this.renderOwnerResponsibilities()}
                        ${this.renderZeroTolerance()}
                    </div>
                </div>
            </div>
        `;
    },

    renderRenterResponsibilities() {
        return `
            <div class="policy-section">
                <h2>📋 Renter Responsibilities</h2>
                
                <h3>Before Pickup</h3>
                <ul>
                    <li>Complete verification and KYC process</li>
                    <li>Arrive on time at the agreed location</li>
                    <li>Inspect the vehicle thoroughly</li>
                    <li>Take photos of all sides of the vehicle</li>
                    <li>Report any existing damage to the owner</li>
                </ul>

                <h3>During Rental</h3>
                <ul>
                    <li>Wear helmet at all times (mandatory)</li>
                    <li>Follow all traffic laws and regulations</li>
                    <li>No unauthorized riders allowed</li>
                    <li>Maintain the vehicle properly</li>
                    <li>Report any issues or accidents immediately</li>
                    <li>Lock the vehicle when parked</li>
                    <li>Keep vehicle documents safe</li>
                </ul>

                <h3>Return Conditions</h3>
                <ul>
                    <li>Return on time as per booking</li>
                    <li>Return with same fuel level as pickup</li>
                    <li>Clean the vehicle before return</li>
                    <li>No damage to the vehicle</li>
                    <li>Return all documents and keys</li>
                </ul>
            </div>
        `;
    },

    renderFineStructure() {
        return `
            <div class="policy-section">
                <h2>💰 Fine Structure</h2>

                <h3>Late Return Fines</h3>
                <table class="fine-table">
                    <thead>
                        <tr>
                            <th>Duration</th>
                            <th>Fine Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${MockData.fines.lateReturn.map(item => `
                            <tr>
                                <td>${item.duration}</td>
                                <td><strong>${typeof item.fine === 'number' ? Utils.formatPrice(item.fine) : item.fine}</strong></td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>

                <h3 class="mt-4">Damage Categories</h3>
                
                <h4 class="mt-3">Minor Damage (${Components.createBadge('₹500-₹2,000', 'warning')})</h4>
                <table class="fine-table">
                    <thead>
                        <tr>
                            <th>Damage Type</th>
                            <th>Estimated Fine</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${MockData.fines.damages.minor.map(item => `
                            <tr>
                                <td>${item.item}</td>
                                <td><strong>${item.fine}</strong></td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>

                <h4 class="mt-3">Moderate Damage (${Components.createBadge('₹2,000-₹10,000', 'warning')})</h4>
                <table class="fine-table">
                    <thead>
                        <tr>
                            <th>Damage Type</th>
                            <th>Estimated Fine</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${MockData.fines.damages.moderate.map(item => `
                            <tr>
                                <td>${item.item}</td>
                                <td><strong>${item.fine}</strong></td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>

                <h4 class="mt-3">Major Damage (${Components.createBadge('₹10,000+', 'danger')})</h4>
                <table class="fine-table">
                    <thead>
                        <tr>
                            <th>Damage Type</th>
                            <th>Estimated Fine</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${MockData.fines.damages.major.map(item => `
                            <tr>
                                <td>${item.item}</td>
                                <td><strong>${item.fine}</strong></td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>

                <h3 class="mt-4">Other Violations</h3>
                <table class="fine-table">
                    <thead>
                        <tr>
                            <th>Violation</th>
                            <th>Fine Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${MockData.fines.violations.map(item => `
                            <tr>
                                <td>${item.violation}</td>
                                <td><strong>${item.fine}</strong></td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    },

    renderDisputeResolution() {
        return `
            <div class="policy-section">
                <h2>⚖️ Dispute Resolution Process</h2>

                <div class="steps-container" style="grid-template-columns: repeat(4, 1fr); margin-top: 30px;">
                    <div class="step-card">
                        <div class="step-number">1</div>
                        <h3>Direct Communication</h3>
                        <p>Try to resolve the issue directly with the other party</p>
                    </div>
                    <div class="step-card">
                        <div class="step-number">2</div>
                        <h3>Raise a Dispute</h3>
                        <p>Submit dispute within 24 hours with photos and details</p>
                    </div>
                    <div class="step-card">
                        <div class="step-number">3</div>
                        <h3>CampusRide Review</h3>
                        <p>Our team reviews evidence and mediates (3-5 business days)</p>
                    </div>
                    <div class="step-card">
                        <div class="step-number">4</div>
                        <h3>Resolution</h3>
                        <p>Final decision made and deposit adjusted accordingly</p>
                    </div>
                </div>

                <div class="alert alert-info mt-4">
                    <strong>Important:</strong> Always take photos before and after rental. This is your best evidence in case of disputes.
                </div>
            </div>
        `;
    },

    renderOwnerResponsibilities() {
        return `
            <div class="policy-section">
                <h2>👤 Owner Responsibilities</h2>

                <ul>
                    <li><strong>Provide a safe vehicle:</strong> Ensure the vehicle is in good working condition</li>
                    <li><strong>Valid insurance:</strong> Maintain valid insurance and registration</li>
                    <li><strong>Accurate photos:</strong> Upload clear, recent photos of the vehicle</li>
                    <li><strong>Document condition:</strong> Take photos before and after each rental</li>
                    <li><strong>Be available:</strong> Be on time for pickup and return</li>
                    <li><strong>Provide repair estimates:</strong> Submit valid repair bills for damages</li>
                    <li><strong>Fair pricing:</strong> No overcharging for damages</li>
                    <li><strong>Respond to disputes:</strong> Participate in dispute resolution process</li>
                </ul>
            </div>
        `;
    },

    renderZeroTolerance() {
        return `
            <div class="policy-section">
                <div class="zero-tolerance-box">
                    <h2>🚫 Zero-Tolerance Policy</h2>
                    <p><strong>You will be permanently banned for:</strong></p>
                    <ul>
                        <li>Theft or attempted theft of vehicle</li>
                        <li>Intentional damage to vehicle</li>
                        <li>Drunk driving or substance abuse</li>
                        <li>Rash or dangerous driving</li>
                        <li>Fraudulent claims or false documentation</li>
                        <li>Harassment or threatening behavior</li>
                        <li>Using vehicle for illegal activities</li>
                    </ul>
                    <p class="mt-3"><strong>Legal action will be taken for serious violations.</strong></p>
                </div>
            </div>
        `;
    }
};
