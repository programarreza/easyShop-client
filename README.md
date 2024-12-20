# Project Name: Easy Shop

## Project Description
A robust multi-vendor e-commerce platform where vendors can manage their shops, products, and orders, while customers can browse, compare, and purchase products efficiently. Admins have full control over monitoring and managing platform operations.

---

## Live URL
- **Frontend Deployment:** [Live Frontend URL](https://easyshopclient.vercel.app)
- **Backend Deployment:** [Live Backend URL](https://easyshopserver.vercel.app)

## User Info
- **admin@gmail.com**
- **vendor@gmail.com**
- **customer@gmail.com**
- **pass: 123456**

---

## Technology Stack & Packages
### **Backend**
- **Node.js** & **Express.js** - Server & API management
- **Prisma** - Database
- **JWT** - Authentication
- **Cloudinary** - Image storage
- **TypeScript** *(Optional)* - Strong typing for maintainable code

### **Frontend**
- **Next.js** - Frontend framework
- **Redux Toolkit** - State management
- **Tailwind CSS** - Styling
- **Aamarpay/Stripe** - Payment integration
- **TypeScript** *(Optional)* - Strong typing

---

## Setup Instructions
### **Backend**
1. Clone the repository:
   ```bash
   git clone https://github.com/programarreza/easyShop-server.git
   cd easyShop-client
   ```
2. Install dependencies:
   ```bash
   yarn install
   ```
3. Set environment variables:
   Create a `.env` file and add:
   ```
   PORT=5000
   DATABASE_URL=<YourURI>
   JWT_SECRET=<Your JWT Secret>
   CLOUDINARY_URL=<Your Cloudinary URL>
   ```
4. Start the server:
   ```bash
   yarn start:dev
   ```

### **Frontend**
1. Clone the repository:
   ```bash
   git clone https://github.com/programarreza/easyShop-client.git
   cd easyShop-server
   ```
2. Install dependencies:
   ```bash
   yarn install
   ```
3. Set environment variables:
   Create a `.env` file and add:
   ```
   REACT_APP_API_URL=<Your Backend URL>
   STRIPE_PUBLIC_KEY=<Your Stripe Public Key>
   ```
4. Start the development server:
   ```bash
   yarn dev
   ```

---

## Key Features & Functionality
### **Roles and Responsibilities**
#### Admin
- Full control over platform monitoring and moderation.
- Manage users (vendors/customers), suspend accounts, and blacklist shops.
- Dynamically manage product categories.
- Monitor transactions and activities.

#### Vendor
- Create and manage a shop (name, logo, description, etc.).
- Add, duplicate, or update products with details like name, price, category, and inventory.
- Manage product inventory and order history.
- Respond to customer reviews.

#### User (Customer)
- Browse and filter products across vendor shops.
- Add products to the cart and make purchases.
- Leave reviews and ratings for purchased products.
- Access recent products and order history.
- Compare up to 3 products of the same category.

---

### **Main Features**
- **Home Page:** Infinite scrolling, product filtering, followed shop prioritization.
- **Product Details Page:** Product information, related products, and reviews.
- **Shop Page:** Vendor shop details, follower counts, and product management.
- **Cart Functionality:** Vendor-restricted carts with warnings and options.
- **Checkout:** Coupon codes and Stripe/Aamarpay payment processing.
- **Order History:** For vendors and customers, with pagination.
- **Authentication:** Secure JWT-based login, signup, and password reset.
- **Comparison Feature:** Compare up to 3 products from the same category.
- **Vendor Dashboard:** Manage products, shops, and orders efficiently.
- **Responsive Design:** Mobile and desktop-friendly interface.
- **Scalability:** Paginated APIs for products and orders.

---

## Known Issues/Bugs
- None currently reported.


