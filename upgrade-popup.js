// GuerillaBox Upgrade Modal JavaScript

class UpgradeModal {
    constructor() {
        this.modal = document.getElementById('upgrade-modal');
        this.addBoxBtn = document.getElementById('add-box-btn');
        this.closeBtn = this.modal.querySelector('.close-btn');
        this.upgradeButtons = this.modal.querySelectorAll('.btn');
        this.currentCopyVariant = 1;
        this.copyVariants = this.loadCopyVariants();
        
        this.init();
    }

    init() {
        // Event listeners
        this.addBoxBtn.addEventListener('click', () => this.show());
        this.closeBtn.addEventListener('click', () => this.hide());
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) this.hide();
        });
        
        // Escape key listener
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isVisible()) {
                this.hide();
            }
        });

        // Upgrade button listeners
        this.upgradeButtons.forEach(btn => {
            btn.addEventListener('click', (e) => this.handleUpgrade(e));
        });

        // A/B testing - randomly select copy variant
        this.setCopyVariant(this.getRandomVariant());

        // Analytics event setup
        this.setupAnalytics();
    }

    show() {
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
        
        // Show modal with animation
        this.modal.style.display = 'flex';
        
        // Trigger animation after display
        requestAnimationFrame(() => {
            this.modal.classList.add('show');
        });

        // Focus management for accessibility
        this.modal.setAttribute('aria-hidden', 'false');
        this.closeBtn.focus();

        // Track modal open event
        this.trackEvent('modal_opened', {
            copy_variant: this.currentCopyVariant,
            trigger: 'add_box_button'
        });

        // Auto-focus first upgrade button after animation
        setTimeout(() => {
            const firstUpgradeBtn = this.modal.querySelector('.btn-primary');
            if (firstUpgradeBtn) {
                firstUpgradeBtn.focus();
            }
        }, 300);
    }

    hide() {
        // Remove animation class
        this.modal.classList.remove('show');
        
        // Hide after animation completes
        setTimeout(() => {
            this.modal.style.display = 'none';
            document.body.style.overflow = '';
            this.modal.setAttribute('aria-hidden', 'true');
        }, 300);

        // Return focus to trigger button
        this.addBoxBtn.focus();

        // Track modal close event
        this.trackEvent('modal_closed', {
            copy_variant: this.currentCopyVariant
        });
    }

    isVisible() {
        return this.modal.style.display === 'flex';
    }

    handleUpgrade(event) {
        const button = event.target;
        const option = button.closest('.option');
        const isPremium = option.classList.contains('premium-option');
        const isTrial = option.classList.contains('trial-option');

        // Visual feedback
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = '';
        }, 150);

        // Track upgrade button click
        this.trackEvent('upgrade_button_clicked', {
            option_type: isPremium ? 'premium' : 'trial',
            copy_variant: this.currentCopyVariant,
            button_text: button.textContent
        });

        // Simulate upgrade flow
        if (isPremium) {
            this.showUpgradeSuccess('premium');
        } else if (isTrial) {
            this.showUpgradeSuccess('trial');
        }
    }

    showUpgradeSuccess(type) {
        // Replace modal content with success message
        const modalContent = this.modal.querySelector('.modal-content');
        const successHTML = `
            <div class="success-content" style="text-align: center; padding: 40px 20px;">
                <div class="gorilla-mascot">
                    <div class="gorilla-emoji">🎉</div>
                </div>
                <h2 style="color: #10b981; margin-bottom: 16px;">
                    ${type === 'premium' ? 'Welcome to Premium!' : 'Free Trial Started!'}
                </h2>
                <p style="color: #6b7280; font-size: 16px; margin-bottom: 24px;">
                    ${type === 'premium' 
                        ? 'You now have unlimited boxes. Go forth and communicate!' 
                        : 'Enjoy 14 days of premium features. Add all the boxes you want!'}
                </p>
                <button class="btn btn-primary" onclick="location.reload()">
                    Continue to Dashboard
                </button>
            </div>
        `;
        
        modalContent.innerHTML = successHTML;

        // Auto-close after 3 seconds
        setTimeout(() => {
            this.hide();
        }, 3000);
    }

    loadCopyVariants() {
        // Load copy variants from hidden HTML elements
        const variants = {};
        const variantElements = document.querySelectorAll('[data-copy-variant]');
        
        variantElements.forEach(element => {
            const variant = element.getAttribute('data-copy-variant');
            if (!variants[variant]) variants[variant] = {};
            
            if (element.tagName === 'H2') {
                variants[variant].title = element.textContent;
            } else if (element.tagName === 'P') {
                variants[variant].description = element.textContent;
            }
        });
        
        return variants;
    }

    setCopyVariant(variantNumber) {
        this.currentCopyVariant = variantNumber;
        
        // Update visible copy if variant exists
        if (this.copyVariants[variantNumber]) {
            const title = this.modal.querySelector('.modal-title');
            const description = this.modal.querySelector('.modal-description');
            
            if (this.copyVariants[variantNumber].title) {
                title.textContent = this.copyVariants[variantNumber].title;
            }
            if (this.copyVariants[variantNumber].description) {
                description.textContent = this.copyVariants[variantNumber].description;
            }
        }
    }

    getRandomVariant() {
        // For A/B testing - returns 1-4 randomly
        return Math.floor(Math.random() * 4) + 1;
    }

    setupAnalytics() {
        // Placeholder for analytics integration
        // In production, this would integrate with your analytics service
        console.log('Analytics setup complete for copy variant:', this.currentCopyVariant);
    }

    trackEvent(eventName, properties = {}) {
        // Placeholder for event tracking
        // In production, this would send events to your analytics service
        console.log('Event tracked:', eventName, properties);
        
        // Example integration with common analytics services:
        
        // Google Analytics 4
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, properties);
        }
        
        // Mixpanel
        if (typeof mixpanel !== 'undefined') {
            mixpanel.track(eventName, properties);
        }
        
        // Segment
        if (typeof analytics !== 'undefined') {
            analytics.track(eventName, properties);
        }
    }

    // Public methods for external control
    openModal() {
        this.show();
    }

    closeModal() {
        this.hide();
    }

    switchCopyVariant(variantNumber) {
        this.setCopyVariant(variantNumber);
    }
}

// Initialize modal when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.upgradeModal = new UpgradeModal();
});

// Additional utility functions for advanced usage

// Function to simulate box limit check
function checkBoxLimit(currentBoxCount) {
    const FREE_PLAN_LIMIT = 3;
    
    if (currentBoxCount >= FREE_PLAN_LIMIT) {
        if (window.upgradeModal) {
            window.upgradeModal.openModal();
        }
        return false; // Prevent adding new box
    }
    
    return true; // Allow adding new box
}

// Function for external A/B testing control
function setModalCopyVariant(variantNumber) {
    if (window.upgradeModal && variantNumber >= 1 && variantNumber <= 4) {
        window.upgradeModal.switchCopyVariant(variantNumber);
    }
}

// Function to trigger modal programmatically
function showUpgradeModal() {
    if (window.upgradeModal) {
        window.upgradeModal.openModal();
    }
}

// Export for module systems if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { UpgradeModal, checkBoxLimit, setModalCopyVariant, showUpgradeModal };
}