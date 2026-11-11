
    -- =====================================================
    -- AHMED WARDROBE - COMPLETE E-COMMERCE DATABASE
    -- MySQL 8+
    -- =====================================================

    -- CREATE DATABASE IF NOT EXISTS ahmed_wardrobe
    -- CHARACTER SET utf8mb4
    -- COLLATE utf8mb4_unicode_ci;

    -- USE ahmed_wardrobe;

    -- =====================================================
    -- 1. USERS
    -- Supports email/password and Google authentication
    -- =====================================================

    CREATE TABLE IF NOT EXISTS users (
        id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

        user_name VARCHAR(150) NOT NULL,
        user_email VARCHAR(255) NOT NULL UNIQUE,

        user_password VARCHAR(255) NULL,
        google_id VARCHAR(255) NULL UNIQUE,
        profile_image VARCHAR(500) NULL,

        role ENUM('User', 'Admin', 'Super_Admin')
            NOT NULL DEFAULT 'User',

        is_active BOOLEAN NOT NULL DEFAULT TRUE,
        email_verified_at DATETIME NULL,

        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB;


    -- =====================================================
    -- 2. EMPLOYEES
    -- Retained for your existing emp.model.js
    -- =====================================================

    -- CREATE TABLE IF NOT EXISTS emp (
    --     id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    --     name VARCHAR(150) NOT NULL,
    --     email VARCHAR(255) NOT NULL UNIQUE,
    --     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    -- ) ENGINE=InnoDB;


    -- =====================================================
    -- 3. PRODUCTS
    -- Matches your existing product.model.js columns
    -- =====================================================

    CREATE TABLE IF NOT EXISTS products (
        id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

        slug VARCHAR(255) NOT NULL UNIQUE,
        name VARCHAR(255) NOT NULL,
        category VARCHAR(150) NOT NULL,

        price DECIMAL(12,2) NOT NULL,
        image VARCHAR(1000) NOT NULL,

        color VARCHAR(100) NULL,
        description TEXT NULL,
        badge VARCHAR(100) NULL,

        is_active BOOLEAN NOT NULL DEFAULT TRUE,
        stock_quantity INT UNSIGNED NOT NULL DEFAULT 0,

        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            ON UPDATE CURRENT_TIMESTAMP,

        INDEX idx_products_category (category),
        INDEX idx_products_active (is_active),
        INDEX idx_products_name (name)
    ) ENGINE=InnoDB;


    -- =====================================================
    -- 4. PRODUCT IMAGES
    -- Additional images for product galleries
    -- =====================================================

    CREATE TABLE IF NOT EXISTS product_images (
        id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

        product_id BIGINT UNSIGNED NOT NULL,
        image_url VARCHAR(1000) NOT NULL,
        sort_order INT NOT NULL DEFAULT 0,

        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

        CONSTRAINT fk_product_images_product
            FOREIGN KEY (product_id)
            REFERENCES products(id)
            ON DELETE CASCADE,

        INDEX idx_product_images_product (product_id)
    ) ENGINE=InnoDB;


    -- =====================================================
    -- 5. PRODUCT VARIANTS
    -- Different sizes and stock quantities
    -- =====================================================

    CREATE TABLE IF NOT EXISTS product_variants (
        id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

        product_id BIGINT UNSIGNED NOT NULL,
        size VARCHAR(50) NOT NULL,
        color VARCHAR(100) NULL,

        stock_quantity INT UNSIGNED NOT NULL DEFAULT 0,
        additional_price DECIMAL(12,2) NOT NULL DEFAULT 0.00,

        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

        CONSTRAINT fk_variants_product
            FOREIGN KEY (product_id)
            REFERENCES products(id)
            ON DELETE CASCADE,

        UNIQUE KEY unique_product_variant
            (product_id, size, color)
    ) ENGINE=InnoDB;


    -- =====================================================
    -- 6. CUSTOMER ADDRESSES
    -- =====================================================

    CREATE TABLE IF NOT EXISTS addresses (
        id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

        user_id BIGINT UNSIGNED NOT NULL,

        full_name VARCHAR(150) NOT NULL,
        phone VARCHAR(20) NOT NULL,

        address_line1 VARCHAR(255) NOT NULL,
        address_line2 VARCHAR(255) NULL,

        city VARCHAR(100) NOT NULL,
        state VARCHAR(100) NOT NULL,
        postal_code VARCHAR(20) NOT NULL,
        country VARCHAR(100) NOT NULL DEFAULT 'India',

        address_type ENUM('Home', 'Work', 'Other')
            NOT NULL DEFAULT 'Home',

        is_default BOOLEAN NOT NULL DEFAULT FALSE,

        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

        CONSTRAINT fk_addresses_user
            FOREIGN KEY (user_id)
            REFERENCES users(id)
            ON DELETE CASCADE,

        INDEX idx_addresses_user (user_id)
    ) ENGINE=InnoDB;


    -- =====================================================
    -- 7. CART
    -- =====================================================

    CREATE TABLE IF NOT EXISTS cart_items (
        id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

        user_id BIGINT UNSIGNED NOT NULL,
        product_id BIGINT UNSIGNED NOT NULL,
        variant_id BIGINT UNSIGNED NULL,

        quantity INT UNSIGNED NOT NULL DEFAULT 1,

        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            ON UPDATE CURRENT_TIMESTAMP,

        CONSTRAINT fk_cart_user
            FOREIGN KEY (user_id)
            REFERENCES users(id)
            ON DELETE CASCADE,

        CONSTRAINT fk_cart_product
            FOREIGN KEY (product_id)
            REFERENCES products(id)
            ON DELETE CASCADE,

        CONSTRAINT fk_cart_variant
            FOREIGN KEY (variant_id)
            REFERENCES product_variants(id)
            ON DELETE SET NULL,

        INDEX idx_cart_user (user_id)
    ) ENGINE=InnoDB;


    -- =====================================================
    -- 8. WISHLIST
    -- =====================================================

    CREATE TABLE IF NOT EXISTS wishlist (
        id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

        user_id BIGINT UNSIGNED NOT NULL,
        product_id BIGINT UNSIGNED NOT NULL,

        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

        CONSTRAINT fk_wishlist_user
            FOREIGN KEY (user_id)
            REFERENCES users(id)
            ON DELETE CASCADE,

        CONSTRAINT fk_wishlist_product
            FOREIGN KEY (product_id)
            REFERENCES products(id)
            ON DELETE CASCADE,

        UNIQUE KEY unique_wishlist_item (user_id, product_id)
    ) ENGINE=InnoDB;


    -- =====================================================
    -- 9. ORDERS
    -- =====================================================

    CREATE TABLE IF NOT EXISTS orders (
        id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

        order_number VARCHAR(50) NOT NULL UNIQUE,
        user_id BIGINT UNSIGNED NOT NULL,
        address_id BIGINT UNSIGNED NULL,

        subtotal DECIMAL(12,2) NOT NULL,
        shipping_amount DECIMAL(12,2) NOT NULL DEFAULT 0.00,
        discount_amount DECIMAL(12,2) NOT NULL DEFAULT 0.00,
        total_amount DECIMAL(12,2) NOT NULL,

        order_status ENUM(
            'Pending',
            'Confirmed',
            'Processing',
            'Shipped',
            'Delivered',
            'Cancelled',
            'Returned'
        ) NOT NULL DEFAULT 'Pending',

        payment_status ENUM(
            'Pending',
            'Paid',
            'Failed',
            'Refunded'
        ) NOT NULL DEFAULT 'Pending',

        customer_name VARCHAR(150) NOT NULL,
        customer_email VARCHAR(255) NOT NULL,
        customer_phone VARCHAR(20) NOT NULL,

        shipping_address TEXT NOT NULL,

        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            ON UPDATE CURRENT_TIMESTAMP,

        CONSTRAINT fk_orders_user
            FOREIGN KEY (user_id)
            REFERENCES users(id),

        CONSTRAINT fk_orders_address
            FOREIGN KEY (address_id)
            REFERENCES addresses(id)
            ON DELETE SET NULL,

        INDEX idx_orders_user (user_id),
        INDEX idx_orders_status (order_status),
        INDEX idx_orders_created (created_at)
    ) ENGINE=InnoDB;


    -- =====================================================
    -- 10. ORDER ITEMS
    -- Stores the product and price at purchase time
    -- =====================================================

    CREATE TABLE IF NOT EXISTS order_items (
        id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

        order_id BIGINT UNSIGNED NOT NULL,
        product_id BIGINT UNSIGNED NULL,
        variant_id BIGINT UNSIGNED NULL,

        product_name VARCHAR(255) NOT NULL,
        product_image VARCHAR(1000) NULL,
        selected_size VARCHAR(50) NULL,
        selected_color VARCHAR(100) NULL,

        quantity INT UNSIGNED NOT NULL,
        unit_price DECIMAL(12,2) NOT NULL,
        total_price DECIMAL(12,2) NOT NULL,

        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

        CONSTRAINT fk_order_items_order
            FOREIGN KEY (order_id)
            REFERENCES orders(id)
            ON DELETE CASCADE,

        CONSTRAINT fk_order_items_product
            FOREIGN KEY (product_id)
            REFERENCES products(id)
            ON DELETE SET NULL,

        CONSTRAINT fk_order_items_variant
            FOREIGN KEY (variant_id)
            REFERENCES product_variants(id)
            ON DELETE SET NULL,

        INDEX idx_order_items_order (order_id)
    ) ENGINE=InnoDB;


    -- =====================================================
    -- 11. PAYMENTS
    -- Supports online payments and cash on delivery
    -- =====================================================

    CREATE TABLE IF NOT EXISTS payments (
        id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

        order_id BIGINT UNSIGNED NOT NULL,

        payment_method ENUM(
            'Razorpay',
            'UPI',
            'Card',
            'Net Banking',
            'COD'
        ) NOT NULL,

        transaction_id VARCHAR(255) NULL UNIQUE,
        payment_amount DECIMAL(12,2) NOT NULL,

        payment_status ENUM(
            'Pending',
            'Success',
            'Failed',
            'Refunded'
        ) NOT NULL DEFAULT 'Pending',

        paid_at DATETIME NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

        CONSTRAINT fk_payments_order
            FOREIGN KEY (order_id)
            REFERENCES orders(id),

        INDEX idx_payments_order (order_id)
    ) ENGINE=InnoDB;


    -- =====================================================
    -- 12. COUPONS
    -- =====================================================

    CREATE TABLE IF NOT EXISTS coupons (
        id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

        coupon_code VARCHAR(50) NOT NULL UNIQUE,

        discount_type ENUM('Percentage', 'Fixed')
            NOT NULL,

        discount_value DECIMAL(12,2) NOT NULL,
        minimum_order_amount DECIMAL(12,2) NOT NULL DEFAULT 0.00,
        maximum_discount DECIMAL(12,2) NULL,

        usage_limit INT UNSIGNED NULL,
        used_count INT UNSIGNED NOT NULL DEFAULT 0,

        expires_at DATETIME NULL,
        is_active BOOLEAN NOT NULL DEFAULT TRUE,

        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB;


    -- =====================================================
    -- 13. REVIEWS
    -- =====================================================

    CREATE TABLE IF NOT EXISTS product_reviews (
        id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

        user_id BIGINT UNSIGNED NOT NULL,
        product_id BIGINT UNSIGNED NOT NULL,

        rating TINYINT UNSIGNED NOT NULL,
        review TEXT NULL,

        is_approved BOOLEAN NOT NULL DEFAULT FALSE,

        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

        CONSTRAINT fk_reviews_user
            FOREIGN KEY (user_id)
            REFERENCES users(id)
            ON DELETE CASCADE,

        CONSTRAINT fk_reviews_product
            FOREIGN KEY (product_id)
            REFERENCES products(id)
            ON DELETE CASCADE,

        CONSTRAINT chk_review_rating
            CHECK (rating BETWEEN 1 AND 5),

        UNIQUE KEY unique_user_product_review
            (user_id, product_id)
    ) ENGINE=InnoDB;


    -- =====================================================
    -- 14. AUTHENTICATION SESSIONS
    -- Optional custom database session storage
    -- =====================================================

    CREATE TABLE IF NOT EXISTS auth_sessions (
        id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

        user_id BIGINT UNSIGNED NOT NULL,
        session_token VARCHAR(500) NOT NULL UNIQUE,
        expires_at DATETIME NOT NULL,

        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

        CONSTRAINT fk_auth_sessions_user
            FOREIGN KEY (user_id)
            REFERENCES users(id)
            ON DELETE CASCADE,

        INDEX idx_auth_sessions_user (user_id),
        INDEX idx_auth_sessions_expiry (expires_at)
    ) ENGINE=InnoDB;


    -- =====================================================
    -- 15. SAMPLE CUSTOMER
    -- No password is set: this is a Google-login-ready
    -- example record. Replace or remove as needed.
    -- =====================================================

    -- Do not use a real customer's email for test data.
    -- INSERT INTO users (user_name, email, role)
    -- VALUES ('Test Customer', 'test@example.com', 'User');


    -- =====================================================
    -- DATABASE CREATED SUCCESSFULLY
    -- =====================================================
