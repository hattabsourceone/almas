import Loading from "@components/shared/Loading/Loading";
import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

// Lazy load components
const Profile = lazy(() => import("./private/_Profile"));
const EditPersonalDetails = lazy(() => import("./private/EditPersonalDetails"));
const EditPassword = lazy(() => import("./private/EditPassword"));
const ThankYouPage = lazy(() => import("./private/ThankYouPage"));
const WishlistPage = lazy(() => import("./private/WishlistPage"));
const OrdersHistoryPage = lazy(() => import("./private/OrderHistoryPage"));
const AddressBookPage = lazy(() => import("./private/AddressBookPage"));
const EditAddressBilling = lazy(() => import("./private/EditAddressBilling"));
const EditAddressShipping = lazy(() => import("./private/EditAddressShipping"));
const AddAddressBilling = lazy(() => import("./private/AddAddressBilling"));
const AddAddressShipping = lazy(() => import("./private/AddAddressShipping"));
const OrderStatusPage = lazy(() => import("./private/OrderStatusPage"));

const PrivateRoutes: React.FC = () => {
  return (
    <Suspense
      fallback={
        <div className="container h-screen">
          <Loading />
        </div>
      }
    >
      <Routes>
        <Route path="/profile" element={<Profile />} />
        <Route
          path="/profile/personal-details"
          element={<EditPersonalDetails />}
        />
        <Route path="/profile/update-password" element={<EditPassword />} />
        <Route path="/thank-you" element={<ThankYouPage />} />
        <Route path="/profile/wishlist" element={<WishlistPage />} />
        <Route path="/profile/orders-history" element={<OrdersHistoryPage />} />
        <Route path="/profile/address-book" element={<AddressBookPage />} />
        <Route
          path="/profile/address-book/edit-billing-address"
          element={<EditAddressBilling />}
        />
        <Route
          path="/profile/address-book/add-billing-address"
          element={<AddAddressBilling />}
        />
        <Route
          path="/profile/address-book/edit-shipping-address"
          element={<EditAddressShipping />}
        />
        <Route
          path="/profile/address-book/add-shipping-address"
          element={<AddAddressShipping />}
        />
        <Route
          path="/profile/orders-history/order-status"
          element={<OrderStatusPage />}
        />
      </Routes>
    </Suspense>
  );
};

export default PrivateRoutes;
