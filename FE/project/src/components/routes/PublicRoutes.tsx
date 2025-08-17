import Loading from "@components/shared/Loading/Loading.tsx";
import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

// Lazy load components
const LandingPage = lazy(() => import("./public/LandingPage/_LandingPage"));
const SearchDiamond = lazy(
  () => import("./public/SearchDiamond/_SearchDiamond")
);
const DiamondDetailes = lazy(
  () => import("./public/DiamondDetailes/_DiamondDetailes")
);
const AboutUs = lazy(() => import("./public/AboutUs/_AboutUs"));
const BuyingGuide = lazy(() => import("./public/BuyingGuide/_BuyingGuide"));
const SocialResponsibility = lazy(
  () => import("./public/SocialResponsibility/_SocialResponsibility")
);
const CustomerCare = lazy(() => import("./public/CustomerCare/_CustomerCare"));
const WhyAlmas = lazy(() => import("./public/WhyAlmas/_WhyAlmas"));
const Jewellery = lazy(() => import("./public/Jewellery/_Jewellery"));
const CategoriesJewellery = lazy(
  () => import("./public/Jewellery/CategoriesJewellery")
);
const TypesJewellery = lazy(() => import("./public/Jewellery/TypesJewellery"));
const MakeJewelleryDiamondSelect = lazy(
  () => import("./public/Jewellery/SelectedSetting/MakeJewelleryDiamondSelect")
);
const SelectedDiamondDetails = lazy(
  () => import("./public/Jewellery/SelectedSetting/SelectedDiamondDetails")
);
const MakeOrder = lazy(
  () => import("./public/Jewellery/SelectedSetting/MakeOrder")
);
const Authentification = lazy(
  () => import("./public/Authentification/_Authentification")
);
const RegisterForm = lazy(
  () => import("./public/Authentification/RegisterForm")
);
const ForgottenPassword = lazy(
  () => import("./public/Authentification/ForgottenPassword")
);
const MakeJewellerySettingStep = lazy(
  () => import("./public/Jewellery/JewelleryDetails/MakeJewellerySettingStep")
);
const CustomOrderPage = lazy(() => import("./public/Jewellery/CustomOrder"));
const ShoppingCartPage = lazy(() => import("./private/ShoppingCartPage"));
const CheckoutPage = lazy(() => import("./public/checkout/CheckoutPage"));
const Privacy = lazy(() => import("./public/Overview/privacy"));
const ShippingPolicy = lazy(() => import("./public/Overview/shipping_policy"));
const PaymentPolicy = lazy(() => import("./public/Overview/payment_policy"));
const InternationalReturnPolicy = lazy(
  () => import("./public/Overview/international_return_policy.tsx")
);
const TermsConditions = lazy(
  () => import("./public/Overview/terms_conditions")
);

const PublicRoutes: React.FC = () => {
  return (
    <Suspense
      fallback={
        <div className="container h-screen">
          <Loading />
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/search-inventory/*" element={<SearchDiamond />} />
        <Route path="/diamond-details/:id" element={<DiamondDetailes />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/buying-guide" element={<BuyingGuide />} />
        <Route
          path="/social-responsibility"
          element={<SocialResponsibility />}
        />
        <Route path="/customer-care" element={<CustomerCare />} />
        <Route path="/why-almas" element={<WhyAlmas />} />
        <Route path="/profile/shopping-cart" element={<ShoppingCartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route
          path="/jewellery/:categorie_name"
          element={<CategoriesJewellery />}
        />
        <Route
          path="/jewellery/:category_name/:type_name/:design?"
          element={<TypesJewellery showFilter={true} />}
        />
        <Route path="/jewellery" element={<Jewellery />} />
        <Route path="/contact" element={<CustomerCare />} />
        <Route
          path="/jewellery-details/:model_id"
          element={<MakeJewellerySettingStep />}
        />
        <Route
          path="/jewellery-details/:model_id/selected_setting"
          element={<MakeJewelleryDiamondSelect />}
        />
        <Route
          path="/jewellery-details/:model_id/selected_setting/SelectedDiamondDetails/:id"
          element={<SelectedDiamondDetails />}
        />
        <Route
          path="/jewellery-details/:model_id/selected_setting/SelectedDiamondDetails/:id/make-order"
          element={<MakeOrder />}
        />
        <Route path="/authentification" element={<Authentification />} />
        <Route path="/authentification/register" element={<RegisterForm />} />
        <Route
          path="/authentification/reset-password"
          element={<ForgottenPassword />}
        />
        <Route path="/custom-order" element={<CustomOrderPage />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/shipping-policy" element={<ShippingPolicy />} />
        <Route path="/payment-policy" element={<PaymentPolicy />} />
        <Route
          path="/international-return-policy"
          element={<InternationalReturnPolicy />}
        />
        <Route path="/terms" element={<TermsConditions />} />
      </Routes>
    </Suspense>
  );
};

export default PublicRoutes;
