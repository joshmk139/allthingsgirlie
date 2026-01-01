// Cart Management System
class CartManager {
    constructor() {
        this.cart = this.loadCart();
        this.init();
    }

    init() {
        this.updateCartBadge();
        if (document.querySelector('.cart-items')) {
            this.renderCart();
        }
        if (document.querySelector('.checkout-items')) {
            this.renderCheckoutSummary();
        }
        this.attachEventListeners();
    }

    // Product data
    products = {
        'IMG_0537.JPG': {
            id: 'nourishing-lip-oil',
            name: 'Nourishing Lip Oil',
            description: 'Intensive care with a touch of color',
            price: 28,
            image: 'IMG_0537.JPG'
        },
        'IMG_0538.JPG': {
            id: 'satin-lipstick',
            name: 'Satin Lipstick',
            description: 'Rich, creamy color with a luxurious satin finish',
            price: 32,
            image: 'IMG_0538.JPG'
        },
        'IMG_0539.JPG': {
            id: 'hydrating-lip-balm',
            name: 'Hydrating Lip Balm',
            description: 'A buttery-soft balm infused with nourishing oils',
            price: 18,
            image: 'IMG_0539.JPG'
        },
        'IMG_0540.JPG': {
            id: 'matte-lipstick',
            name: 'Matte Lipstick',
            description: 'Bold, vibrant color with a velvety matte finish',
            price: 30,
            image: 'IMG_0540.JPG'
        },
        'IMG_0541.JPG': {
            id: 'glossy-tint',
            name: 'Glossy Tint',
            description: 'Sheer, buildable color with a glossy finish',
            price: 22,
            image: 'IMG_0541.JPG'
        },
        'IMG_0542.JPG': {
            id: 'sugar-lip-scrub',
            name: 'Sugar Lip Scrub',
            description: 'Gentle exfoliation with natural sugars',
            price: 16,
            image: 'IMG_0542.JPG'
        },
        'IMG_0543.JPG': {
            id: 'overnight-lip-mask',
            name: 'Overnight Lip Mask',
            description: 'Intensive overnight treatment for deeply nourished lips',
            price: 26,
            image: 'IMG_0543.JPG'
        }
    };

    loadCart() {
        const saved = localStorage.getItem('atg_cart');
        return saved ? JSON.parse(saved) : [];
    }

    saveCart() {
        localStorage.setItem('atg_cart', JSON.stringify(this.cart));
        this.updateCartBadge();
    }

    addToCart(productId, quantity = 1) {
        const product = Object.values(this.products).find(p => p.id === productId);
        if (!product) return;

        const existingItem = this.cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.cart.push({
                id: productId,
                name: product.name,
                description: product.description,
                price: product.price,
                image: product.image,
                quantity: quantity
            });
        }
        
        this.saveCart();
        this.showNotification(`${product.name} added to cart!`);
        
        // If on cart page, re-render
        if (document.querySelector('.cart-items')) {
            this.renderCart();
        }
    }

    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.saveCart();
        if (document.querySelector('.cart-items')) {
            this.renderCart();
        }
        if (document.querySelector('.checkout-items')) {
            this.renderCheckoutSummary();
        }
        this.showNotification('Item removed from cart');
    }

    updateQuantity(productId, newQuantity) {
        if (newQuantity <= 0) {
            this.removeFromCart(productId);
            return;
        }
        
        const item = this.cart.find(item => item.id === productId);
        if (item) {
            item.quantity = newQuantity;
            this.saveCart();
            if (document.querySelector('.cart-items')) {
                this.renderCart();
            }
            if (document.querySelector('.checkout-items')) {
                this.renderCheckoutSummary();
            }
        }
    }

    getTotal() {
        const subtotal = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shipping = subtotal > 0 ? 5 : 0;
        const total = subtotal + shipping;
        return { subtotal, shipping, total };
    }

    formatPrice(amount) {
        // Convert USD to NGN (rate: 1450 NGN = 1 USD)
        const ngnAmount = Math.round(amount * 1450);
        return `₦${ngnAmount.toLocaleString()}`;
    }

    formatPriceUSD(amount) {
        return `$${amount.toFixed(2)}`;
    }

    updateCartBadge() {
        const badges = document.querySelectorAll('.cart-badge');
        const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        
        badges.forEach(badge => {
            if (totalItems > 0) {
                badge.textContent = totalItems;
                badge.style.display = 'flex';
            } else {
                badge.style.display = 'none';
            }
        });
    }

    renderCart() {
        const cartItemsContainer = document.querySelector('.cart-items');
        if (!cartItemsContainer) return;

        const itemsContainer = cartItemsContainer.querySelector('.cart-items-list') || 
                              cartItemsContainer.querySelector('div:not(.section-title)');
        
        // Clear existing items (except title)
        const title = cartItemsContainer.querySelector('.section-title');
        cartItemsContainer.innerHTML = '';
        if (title) {
            cartItemsContainer.appendChild(title);
        }

        if (this.cart.length === 0) {
            const emptyCart = document.createElement('div');
            emptyCart.className = 'empty-cart';
            emptyCart.innerHTML = `
                <div style="text-align: center; padding: 3rem 1rem;">
                    <div style="font-size: 4rem; margin-bottom: 1rem;">🛒</div>
                    <h3 style="color: var(--black); margin-bottom: 1rem;">Your cart is empty</h3>
                    <p style="color: var(--text-light); margin-bottom: 2rem;">Start adding items to your cart!</p>
                    <a href="shop.html" class="btn btn-primary" style="text-decoration: none; display: inline-block;">Continue Shopping</a>
                </div>
            `;
            cartItemsContainer.appendChild(emptyCart);
            this.updateSummary();
            return;
        }

        const itemsList = document.createElement('div');
        itemsList.className = 'cart-items-list';

        this.cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.dataset.productId = item.id;
            
            cartItem.innerHTML = `
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <h4 class="cart-item-name">${item.name}</h4>
                    <p class="cart-item-description">${item.description}</p>
                    <div class="cart-item-controls">
                        <div class="quantity-control">
                            <button class="quantity-btn decrease" data-id="${item.id}">-</button>
                            <span class="quantity" data-id="${item.id}">${item.quantity}</span>
                            <button class="quantity-btn increase" data-id="${item.id}">+</button>
                        </div>
                        <p class="cart-item-price">${this.formatPriceUSD(item.price)} <span style="font-size: 0.85rem; color: var(--text-light);">(${this.formatPrice(item.price)})</span></p>
                    </div>
                </div>
                <button class="remove-btn" data-id="${item.id}">Remove</button>
            `;
            
            itemsList.appendChild(cartItem);
        });

        cartItemsContainer.appendChild(itemsList);
        this.updateSummary();
        this.attachCartEventListeners();
    }

    updateSummary() {
        const totals = this.getTotal();
        const summarySubtotal = document.querySelector('.summary-row:first-of-type span:last-child');
        const summaryShipping = document.querySelectorAll('.summary-row')[1]?.querySelector('span:last-child');
        const summaryTotal = document.querySelector('.summary-total span:last-child');
        const summaryUSD = document.querySelector('.summary-total + p');

        if (summarySubtotal) {
            summarySubtotal.textContent = this.formatPriceUSD(totals.subtotal);
        }
        if (summaryShipping) {
            summaryShipping.textContent = totals.shipping > 0 ? this.formatPriceUSD(totals.shipping) : 'Free';
        }
        if (summaryTotal) {
            summaryTotal.textContent = this.formatPrice(totals.total);
        }
        if (summaryUSD) {
            summaryUSD.textContent = `(Approx. ${this.formatPriceUSD(totals.total)} USD)`;
        }
    }

    attachEventListeners() {
        // Add to cart buttons
        document.querySelectorAll('.btn-product, .btn[data-add-to-cart]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const productCard = btn.closest('.product-card');
                if (productCard) {
                    const img = productCard.querySelector('img');
                    if (img) {
                        // Get image filename from src
                        const imgSrc = img.getAttribute('src');
                        const imgFilename = imgSrc.split('/').pop();
                        
                        // Find product by image filename
                        const product = Object.values(this.products).find(p => p.image === imgFilename);
                        if (product) {
                            this.addToCart(product.id, 1);
                        }
                    }
                }
            });
        });
    }

    attachCartEventListeners() {
        // Quantity buttons
        document.querySelectorAll('.quantity-btn.increase').forEach(btn => {
            btn.addEventListener('click', () => {
                const productId = btn.dataset.id;
                const item = this.cart.find(item => item.id === productId);
                if (item) {
                    this.updateQuantity(productId, item.quantity + 1);
                }
            });
        });

        document.querySelectorAll('.quantity-btn.decrease').forEach(btn => {
            btn.addEventListener('click', () => {
                const productId = btn.dataset.id;
                const item = this.cart.find(item => item.id === productId);
                if (item) {
                    this.updateQuantity(productId, item.quantity - 1);
                }
            });
        });

        // Remove buttons
        document.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const productId = btn.dataset.id;
                this.removeFromCart(productId);
            });
        });
    }

    renderCheckoutSummary() {
        const checkoutItems = document.querySelector('.checkout-items');
        if (!checkoutItems) return;

        checkoutItems.innerHTML = '';

        if (this.cart.length === 0) {
            checkoutItems.innerHTML = '<p style="color: var(--text-light); text-align: center; padding: 1rem;">No items in cart</p>';
            this.updateCheckoutSummary();
            return;
        }

        this.cart.forEach(item => {
            const checkoutItem = document.createElement('div');
            checkoutItem.className = 'checkout-item';
            const itemTotal = item.price * item.quantity;
            checkoutItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="checkout-item-image">
                <div class="checkout-item-info">
                    <h4>${item.name}</h4>
                    <p>Quantity: ${item.quantity}</p>
                    <p class="checkout-item-price">${this.formatPrice(itemTotal)}</p>
                </div>
            `;
            checkoutItems.appendChild(checkoutItem);
        });

        this.updateCheckoutSummary();
    }

    updateCheckoutSummary() {
        const totals = this.getTotal();
        const subtotalEl = document.querySelector('.checkout-subtotal');
        const shippingEl = document.querySelector('.checkout-shipping');
        const totalEl = document.querySelector('.checkout-total');
        const usdEl = document.querySelector('.checkout-usd');

        // Show all prices in NGN for consistency with Paystack
        if (subtotalEl) subtotalEl.textContent = this.formatPrice(totals.subtotal);
        if (shippingEl) shippingEl.textContent = totals.shipping > 0 ? this.formatPrice(totals.shipping) : 'Free';
        if (totalEl) totalEl.textContent = this.formatPrice(totals.total);
        if (usdEl) usdEl.textContent = `(Approx. ${this.formatPriceUSD(totals.total)} USD)`;
    }

    showNotification(message) {
        // Remove existing notification
        const existing = document.querySelector('.cart-notification');
        if (existing) existing.remove();

        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('show');
        }, 10);

        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    }
}

// Initialize cart manager when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.cartManager = new CartManager();
});

// Update cart badge on page load
window.addEventListener('load', () => {
    if (window.cartManager) {
        window.cartManager.updateCartBadge();
    }
});

