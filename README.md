# All things girlie - E-commerce Website

A beautiful, responsive e-commerce website for All things girlie beauty products.

## 🚀 Getting Started

### Prerequisites
- A web server (can use local server like Live Server, Python's http.server, or deploy to hosting)
- Paystack account for payment processing
- Domain name (for production)

### Installation

1. **Clone or download the project files**

2. **Configure Paystack API Key**
   - Open `config.js`
   - Replace `pk_test_YOUR_PUBLIC_KEY` with your Paystack public key
   - Get your API keys from: https://dashboard.paystack.com/#/settings/developer
   - For testing: Use `pk_test_...` key
   - For production: Use `pk_live_...` key

3. **Update Business Information**
   - Open `config.js`
   - Update all contact information:
     - Email address
     - Phone number
     - WhatsApp number
     - Instagram URL
     - TikTok URL

4. **Update Contact Information in HTML Files**
   - Search and replace placeholder contact info in all HTML files:
     - `hello@allthingsgirlie.com` → Your actual email
     - `+1 (555) 123-4567` → Your actual phone number
     - Social media links → Your actual social media URLs

5. **Add Your Logo**
   - Ensure `IMG_2357.PNG` is in the root directory
   - Or update logo paths in all HTML files if using a different filename

6. **Test the Site**
   - Open `index.html` in a web server (not file://)
   - Test cart functionality
   - Test checkout process (use Paystack test mode)

## 📁 File Structure

```
All things girlie/
├── index.html          # Home page
├── shop.html           # Product listing page
├── cart.html           # Shopping cart page
├── checkout.html        # Checkout page
├── about.html           # About page
├── contact.html         # Contact page
├── hampers.html         # Custom hampers page
├── coming-soon.html     # Coming soon page
├── style.css            # Main stylesheet
├── cart.js              # Cart management JavaScript
├── mobile-menu.js       # Mobile navigation JavaScript
├── config.js            # Configuration file (API keys, business info)
├── IMG_2357.PNG         # Logo file
└── [Product Images]     # Product images (IMG_*.JPG)
```

## ⚙️ Configuration

### config.js

All configuration is centralized in `config.js`:

- **Paystack API Key**: Set your public key for payment processing
- **Business Information**: Update contact details
- **Currency Settings**: Exchange rate and currency display
- **Shipping Settings**: Shipping costs and thresholds

## 💳 Payment Setup

1. **Create Paystack Account**
   - Sign up at https://paystack.com
   - Complete business verification
   - Get your API keys

2. **Configure in config.js**
   ```javascript
   PAYSTACK: {
       PUBLIC_KEY: 'pk_live_YOUR_LIVE_KEY', // Production
       // or
       PUBLIC_KEY: 'pk_test_YOUR_TEST_KEY', // Testing
   }
   ```

3. **Test Payments**
   - Use test cards from Paystack dashboard
   - Verify payment callbacks work
   - Test error handling

## 🎨 Customization

### Colors
Edit CSS variables in `style.css`:
```css
:root {
    --rose-gold: #D4A574;
    --warm-brown: #8B6F5E;
    /* ... */
}
```

### Products
Add/remove products in `cart.js`:
```javascript
products = {
    'IMAGE_NAME.JPG': {
        id: 'product-id',
        name: 'Product Name',
        description: 'Product description',
        price: 28,
        image: 'IMAGE_NAME.JPG'
    }
}
```

## 📱 Features

- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Shopping cart with localStorage persistence
- ✅ Paystack payment integration
- ✅ Product catalog
- ✅ Custom hampers section
- ✅ Contact forms
- ✅ Mobile-friendly navigation

## 🔒 Security Considerations

- **API Keys**: Never commit `config.js` with production keys to public repositories
- **HTTPS**: Always use HTTPS in production
- **Input Validation**: Form inputs are validated client-side (add server-side validation for production)
- **Payment Security**: Paystack handles all payment processing securely

## 📊 Analytics (Optional)

To add analytics, uncomment and configure in `config.js`:
```javascript
ANALYTICS: {
    GOOGLE_ANALYTICS_ID: 'G-XXXXXXXXXX',
    FACEBOOK_PIXEL_ID: 'XXXXXXXXXX',
}
```

Then add tracking scripts to HTML files.

## 🚢 Deployment

### Recommended Hosting Options:
- **Netlify**: Easy deployment, free SSL
- **Vercel**: Fast, free hosting
- **GitHub Pages**: Free static hosting
- **Traditional Web Hosting**: cPanel, FTP, etc.

### Deployment Checklist:
- [ ] Update all contact information
- [ ] Configure Paystack live API key
- [ ] Test all functionality
- [ ] Add analytics (optional)
- [ ] Set up custom domain
- [ ] Enable HTTPS/SSL
- [ ] Test payment processing
- [ ] Verify all links work
- [ ] Test on multiple devices

## 📝 License

© 2026 All things girlie. All rights reserved.
Made by NeuroLoom Tech

## 🆘 Support

For issues or questions:
- Email: hello@allthingsgirlie.com
- Check Paystack documentation: https://paystack.com/docs

## 🔄 Updates

To update the site:
1. Make changes to HTML/CSS/JS files
2. Test locally
3. Deploy to production
4. Clear browser cache if needed

---

**Important**: Before going live, ensure:
- ✅ All placeholder content is replaced
- ✅ Paystack is configured with live keys
- ✅ All contact information is correct
- ✅ Products and prices are accurate
- ✅ Terms of service and privacy policy are added (if required)
- ✅ SSL certificate is installed
- ✅ Site is tested on multiple devices and browsers

