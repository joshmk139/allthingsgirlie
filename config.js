// Configuration file for All things girlie
// IMPORTANT: Replace these values with your actual production credentials

const CONFIG = {
    // Paystack Configuration
    // Get your API keys from: https://dashboard.paystack.com/#/settings/developer
    PAYSTACK: {
        // Use 'pk_live_...' for production, 'pk_test_...' for testing
        PUBLIC_KEY: 'pk_live_YOUR_PUBLIC_KEY', // Replace with your Paystack public key
        
        // For production, use your live key:
        // PUBLIC_KEY: 'pk_live_YOUR_LIVE_PUBLIC_KEY',
    },
    
    // Business Information
    BUSINESS: {
        NAME: 'All things girlie',
        EMAIL: 'hello@allthingsgirlie.com', // Replace with your actual email
        PHONE: '+1 (555) 123-4567', // Replace with your actual phone number
        WHATSAPP: '+1 (555) 123-4567', // Replace with your actual WhatsApp number
        INSTAGRAM: 'https://instagram.com/allthingsgirlie', // Replace with your actual Instagram
        TIKTOK: 'https://tiktok.com/@allthingsgirlie', // Replace with your actual TikTok
    },
    
    // Currency Configuration
    CURRENCY: {
        BASE: 'USD',
        DISPLAY: 'NGN',
        EXCHANGE_RATE: 1450, // 1 USD = 1450 NGN
    },
    
    // Shipping Configuration
    SHIPPING: {
        FREE_THRESHOLD: 0, // Free shipping threshold in USD (0 = always free)
        STANDARD_COST: 5, // Standard shipping cost in USD
    },
    
    // Analytics (Optional)
    // Uncomment and configure when ready
    // ANALYTICS: {
    //     GOOGLE_ANALYTICS_ID: 'G-XXXXXXXXXX', // Your Google Analytics ID
    //     FACEBOOK_PIXEL_ID: 'XXXXXXXXXX', // Your Facebook Pixel ID
    // },
};

// Make config available globally
if (typeof window !== 'undefined') {
    window.CONFIG = CONFIG;
}

