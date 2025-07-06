# GuerillaBox Upgrade Modal Component

A responsive popup/modal component for GuerillaBox's box limit upgrade flow with A/B testing capabilities.

## Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Smooth Animations**: Premium feel with subtle interactions
- **A/B Testing Ready**: 4 copy variations with analytics tracking
- **Accessibility**: Full keyboard navigation and screen reader support
- **Gorilla Mascot Integration**: Animated gorilla emoji with brand personality
- **Mobile-First**: Optimized for mobile experience

## Files

- `upgrade-popup.html` - Complete demo page with modal implementation
- `upgrade-popup.css` - Responsive styles with animations
- `upgrade-popup.js` - Interactive functionality and A/B testing logic
- `copy-variations.md` - Detailed copy strategy and variants

## Usage

### Basic Implementation
```html
<!-- Include the CSS and JS files -->
<link rel="stylesheet" href="upgrade-popup.css">
<script src="upgrade-popup.js"></script>

<!-- Trigger button -->
<button id="add-box-btn">+ Add New Box</button>

<!-- Modal will be shown automatically when user hits box limit -->
```

### Programmatic Control
```javascript
// Show modal manually
showUpgradeModal();

// Check box limit before allowing new box
if (checkBoxLimit(currentBoxCount)) {
    // Add new box
} else {
    // Modal shown automatically
}

// Switch A/B test variant
setModalCopyVariant(2); // Use variant 2
```

## Copy Variants

1. **Collector Theme**: "Whoa there, box collector!" (Default)
2. **Direct & Energetic**: "Time to level up your box game"
3. **Empathetic**: "We see you trying to add that 4th box..."
4. **Achievement**: "Box collector achievement: Unlocked!"

## Brand Voice

- Experienced compassionate business partner
- Conversational with subtle dry humor
- Quirky, plainspoken, genuine
- Like advice from a knowledgeable colleague

## Technical Details

### Responsive Breakpoints
- Desktop: 769px+
- Tablet: 481px - 768px
- Mobile: 320px - 480px

### Browser Support
- Modern browsers (Chrome 60+, Firefox 55+, Safari 12+, Edge 79+)
- Graceful degradation for older browsers
- Reduced motion support for accessibility

### Performance
- CSS animations use transform/opacity for GPU acceleration
- Lazy-loaded analytics to prevent blocking
- Optimized for mobile performance

## Analytics Integration

The modal includes hooks for popular analytics services:
- Google Analytics 4
- Mixpanel
- Segment
- Custom analytics endpoints

Events tracked:
- Modal opened/closed
- Copy variant exposure
- Upgrade button clicks
- Conversion completions

## Testing

Open `upgrade-popup.html` in a browser to test:
1. Click "Add New Box" to trigger modal
2. Test responsive design by resizing window
3. Test keyboard navigation (Tab, Escape)
4. Verify animations and interactions

## Deployment Notes

- Copy variants are randomly assigned on page load
- Analytics events logged to console (replace with actual service)
- Success flow simulated (integrate with actual payment system)
- Mobile-first responsive design optimized for touch interactions