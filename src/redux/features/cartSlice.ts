import { createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";

const initialState = {
  products: [] as any[],
  compareProducts: [] as any[],
  selectedItems: 0,
  totalPrice: 0,
  grandTotal: 0,
  couponCode: "",
  discount: 0, // Total discount amount
  recentProducts: [] as any[], // Add recent products to the state
  search: "",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const incomingProduct = action.payload;

      // Check if cart is empty
      if (state.products.length === 0) {
        state.products.push({ ...incomingProduct, quantity: 1 });
      } else {
        const existingShop = state.products[0]?.shop?.id;
        const incomingShop = incomingProduct?.shop?.id;

        if (existingShop === incomingShop) {
          // Same shop, add product
          const isExist = state.products.find(
            (product) => product?.id === incomingProduct?.id,
          );

          if (!isExist) {
            state.products.push({ ...incomingProduct, quantity: 1 });
          } else {
            toast.error("Product already exists in the cart.");
          }
        } else {
          // Different shop, prompt user
          const confirmClear = window.confirm(
            "Your cart contains items from another shop. Do you want to clear the cart and add this product?",
          );

          if (confirmClear) {
            state.products = [{ ...incomingProduct, quantity: 1 }];
          } else {
            toast.error(
              "Action canceled. Cannot add product from a different shop.",
            );
          }
        }
      }

      state.selectedItems = selectSelectedItems(state);
      state.totalPrice = selectTotalPrice(state);
      state.grandTotal = selectGrandTotal(state);
      state.discount = calculateDiscount(state);
    },

    setCompareProducts: (state, action) => {
      // Set compared products in state
      state.compareProducts = action.payload;
    },

    updateQuantity: (state, action) => {
      const products = state.products.map((product) => {
        if (product.id === action.payload.id) {
          if (action.payload.type === "increment") {
            product.quantity += 1;
          } else if (action.payload.type === "decrement") {
            product.quantity -= 1;
          }
        }

        return product;
      });

      state.products = products.filter((product) => product.quantity > 0);

      if (state.products.length === 0) {
        state.couponCode = "";
        state.discount = 0;
      }

      state.selectedItems = selectSelectedItems(state);
      state.totalPrice = selectTotalPrice(state);
      state.discount = calculateDiscount(state);
      state.grandTotal = selectGrandTotal(state);
    },

    removeFromCart: (state, action) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload.id,
      );

      if (state.products.length === 0) {
        state.couponCode = "";
        state.discount = 0;
      }

      state.selectedItems = selectSelectedItems(state);
      state.totalPrice = selectTotalPrice(state);
      state.discount = calculateDiscount(state);
      state.grandTotal = selectGrandTotal(state);
    },

    clearCart: (state) => {
      state.products = [];
      state.selectedItems = 0;
      state.totalPrice = 0;
      state.grandTotal = 0;
      state.couponCode = "";
      state.discount = 0;
    },

    applyCoupon: (state, action) => {
      const { couponCode } = action.payload;

      if (state.products.length === 0) {
        // Reset discount system if cart is empty
        state.couponCode = "";
        state.discount = 0;
        state.grandTotal = state.totalPrice;

        return;
      }

      let totalDiscount = 0;

      state.products.forEach((product) => {
        const { shop, quantity } = product;
        const coupon = shop?.coupon;

        if (
          coupon &&
          coupon.code === couponCode &&
          new Date(coupon.validFrom) <= new Date() &&
          new Date(coupon.validTo) >= new Date()
        ) {
          totalDiscount += (product.price * quantity * coupon.discount) / 100;
        }
      });

      if (totalDiscount > 0) {
        state.couponCode = couponCode;
        state.discount = totalDiscount;
        state.grandTotal = state.totalPrice - totalDiscount;

        toast.success("Coupon applied successfully!");
      } else {
        state.couponCode = "";
        state.discount = 0;
        state.grandTotal = state.totalPrice;

        toast.error("Invalid or expired coupon code.");
      }
    },

    viewProduct: (state, action) => {
      const product = action.payload;
      const isAlreadyViewed = state.recentProducts.find(
        (p) => p.id === product.id,
      );

      if (!isAlreadyViewed) {
        state.recentProducts.unshift(product);

        // Ensure only the last 10 products are stored
        if (state.recentProducts.length > 10) {
          state.recentProducts.pop();
        }
      }
    },

    updateSearchValue: (state, action) => {
      state.search = action.payload;
    },
  },
});

// Utility functions
const calculateDiscount = (state: any) => {
  if (!state.couponCode) return 0;

  let totalDiscount = 0;

  state.products.forEach((product: any) => {
    const { shop, quantity } = product;
    const coupon = shop?.coupon;

    if (
      coupon &&
      coupon.code === state.couponCode &&
      new Date(coupon.validFrom) <= new Date() &&
      new Date(coupon.validTo) >= new Date()
    ) {
      totalDiscount += (product.price * quantity * coupon.discount) / 100;
    }
  });

  return totalDiscount;
};

export const selectSelectedItems = (state: any) =>
  state.products.reduce(
    (total: any, product: any) => total + product.quantity,
    0,
  );

export const selectTotalPrice = (state: any) =>
  state.products.reduce((total: any, product: any) => {
    const discountedPrice =
      product?.price && product?.discount
        ? product.price * (1 - product.discount / 100)
        : product.price || 0;

    return total + product.quantity * discountedPrice;
  }, 0);

export const selectGrandTotal = (state: any) =>
  state.totalPrice - state.discount;

export const {
  addToCart,
  updateQuantity,
  removeFromCart,
  clearCart,
  applyCoupon,
  viewProduct,
  setCompareProducts,
  updateSearchValue,
} = cartSlice.actions;

export default cartSlice.reducer;
