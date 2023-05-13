import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { startedCheckout } from 'shared/utils/activeCampaign';
import { getIsAuthenticated } from 'screens/auth/reducer';
import {
  getAvailableProducts,
  getPageLoading,
  getRecurringProducts,
} from 'screens/products/reducer';
import {
  getShowAddPaymentMethodModal,
  getShowSelectPaymentMethodModal,
} from 'screens/checkout/reducer';
import {
  showAddPaymentMethodModal,
  closeAddPaymentMethodModal,
  showSelectPaymentMethodModal,
  closeSelectPaymentMethodModal,
} from 'screens/checkout/actionCreators';
import { dropInProducts } from 'screens/products/utils';
import { getUserProfile } from 'screens/my-account/reducer';
import {
  initialLoad,
  setSelectedProduct,
  reactivateSubscription,
} from 'screens/products/actionCreators';
import PageLayout from 'shared/components/layout/PageLayout';
import SectionLayout from 'shared/components/layout/SectionLayout';
import Loading from 'shared/components/Loading';
import MembershipIsPausedModal from 'screens/memberships/components/MembershipIsPausedModal';
import Memberships from 'screens/products/components/Memberships';
import ReserveTeamMemberships from 'screens/products/components/reserve-team/Memberships';
import ReserveTeamMembershipsFeatures from 'screens/products/components/reserve-team/MembershipsFeatures';
import DropIns from 'screens/products/components/DropIns';
import SeasonPass from 'screens/products/components/SeasonPass';
import Scoutings from 'screens/products/components/Scoutings';
import FAQ from 'screens/products/components/FAQ';
import AmenitiesAndFeatures from 'screens/products/components/AmenitiesAndFeatures';
import NoSessionCredits from 'screens/products/components/NoSessionCredits';
import NoFreeSessionInformationModal from 'screens/products/components/NoFreeSessionInformationModal';
import EndMembershipModal from 'shared/components/EndMembershipModal';
import SelectPaymentMethodModal from 'screens/checkout/components/SelectPaymentMethodModal';
import PurchaseDetailsModal from 'screens/checkout/components/PurchaseDetailsModal';
import AddPaymentMethodModal from 'screens/checkout/components/AddPaymentMethodModal';
import triangleTexture from 'screens/products/images/triangle-texture.png';
import Link from 'shared/components/Link';
import ROUTES from 'shared/constants/routes';
import CompareMembershipsTable from 'screens/products/components/CompareMembershipsTable';

const ProductsPage = () => {
  const dispatch = useDispatch();
  const { state } = useLocation();

  const availableProducts = useSelector(getAvailableProducts);
  const isLoading = useSelector(getPageLoading);
  const isAuthenticated = useSelector(getIsAuthenticated);
  const userProfile = useSelector(getUserProfile);
  const addPaymentMethodModalOpen = useSelector(getShowAddPaymentMethodModal);
  const selectPaymentMethodModalOpen = useSelector(getShowSelectPaymentMethodModal);
  const recurringProducts = useSelector(getRecurringProducts);
  const { activeSubscription, reserveTeam } = userProfile;

  const showNoFreeSessionInformation = state?.showNoFreeSessionInformation;
  const showAnimation = state?.showNoCreditsAnimation;
  const comesFromCancelModal = state?.comesFromCancelModal;
  const showScouting = state?.showScouting;
  const priceForFirstTimersNoFreeSession =
    dropInProducts(availableProducts)[0]?.priceForFirstTimersNoFreeSession;

  const [showEndMembershipModal, setShowEndMembershipModal] = useState(false);
  const [showNoFreeSessionInformationModal, setShowNoFreeSessionInformationModal] = useState(
    !!showNoFreeSessionInformation
  );
  const [showMembershipIsPausedModal, setShowMembershipIsPausedModal] = useState(false);
  const [showPurchaseDetailsModal, setShowPurchaseDetailsModal] = useState(false);

  const showMemberships = !comesFromCancelModal && !showScouting;

  const selectProductHandler = (product) => {
    dispatch(setSelectedProduct(product));

    if (isAuthenticated) {
      startedCheckout({ email: userProfile.email, product });
    }

    dispatch(showSelectPaymentMethodModal());
  };

  const selectProductDropInHandler = (product) => {
    const subscriptionPaused = activeSubscription?.paused;

    if (subscriptionPaused) {
      setShowMembershipIsPausedModal(true);
    } else {
      selectProductHandler(product);
    }
  };

  const cancelMembership = () => {
    setShowEndMembershipModal(true);
  };

  const reactivateMembership = () => {
    dispatch(reactivateSubscription(activeSubscription));
  };

  const onSubmit = (isActiveSubscription, product) => {
    if (isActiveSubscription) {
      activeSubscription.canceled ? reactivateMembership() : cancelMembership();
    } else {
      selectProductHandler(product);
    }
  };

  const getSubmitText = (isActiveSubscription, activeSubscription) => {
    if (isActiveSubscription) {
      return activeSubscription.canceled ? 'Reactivate' : 'Cancel';
    }

    return activeSubscription ? 'Select' : 'Join';
  };

  useEffect(() => {
    dispatch(initialLoad());
    if (showAnimation) {
      document.body.setAttribute('data-page', 'no-session-credits');
    }
  }, [dispatch, showAnimation]);

  useEffect(() => {
    if (comesFromCancelModal) {
      window.scrollTo({ top: 0 });
    }
  }, [comesFromCancelModal]);

  if (isLoading) {
    return <Loading />;
  }

  const pageTitle = (() => {
    if (comesFromCancelModal) {
      return 'Season Pass';
    }

    if (showScouting) {
      return 'Player Evaluation';
    }

    if (reserveTeam) {
      return 'Reserve Team Memberships';
    }

    return 'Memberships';
  })();

  const pageDescription = (() => {
    if (comesFromCancelModal || showScouting || reserveTeam) {
      return;
    }

    return (
      'All memberships are designed to help you connect, create, and compete in the pursuit of ' +
      'progress. Each tier comes with full access to the club during operating hours, access ' +
      'to all physical and digital community experiences, and a number of other perks limited ' +
      'to Crosscourt members.'
    );
  })();

  return (
    <>
      <PageLayout noPadding className="relative">
        {showAnimation && <NoSessionCredits />}
        <SectionLayout className="relative mb-12 md:mb-24 pt-24 md:pt-28">
          <img
            className="scale-[2.5] md:scale-100 top-36 -left-48 bottom-0 inset-x-0 md:inset-0 absolute"
            src={triangleTexture}
            alt="triangle-texture"
          />
          <div className="relative">
            <h2
              className={`font-shapiro95_super_wide text-3xl sm:text-4xl ${
                pageDescription ? 'mb-10 md:mb-2' : 'mb-6 sm:mb-10'
              }`}
            >
              {pageTitle}
            </h2>
            {pageDescription && (
              <h4 className="hidden md:block text-sm max-w-3xl mb-6 sm:mb-10">{pageDescription}</h4>
            )}
            <div className="md:flex">
              {comesFromCancelModal && (
                <SeasonPass
                  selectProductHandler={selectProductHandler}
                  availableProducts={availableProducts}
                />
              )}
              {showScouting && (
                <Scoutings
                  selectProductHandler={selectProductHandler}
                  availableProducts={availableProducts}
                />
              )}
              {showMemberships && (
                <div className="flex flex-col">
                  {reserveTeam ? (
                    <ReserveTeamMemberships
                      onSubmit={onSubmit}
                      availableProducts={availableProducts}
                      activeSubscription={activeSubscription}
                      getSubmitText={getSubmitText}
                    />
                  ) : (
                    <Memberships
                      onSubmit={onSubmit}
                      availableProducts={availableProducts}
                      activeSubscription={activeSubscription}
                      getSubmitText={getSubmitText}
                    />
                  )}
                  <DropIns
                    selectProductHandler={selectProductDropInHandler}
                    availableProducts={availableProducts}
                  />
                  <div className="text-center">
                    <span>Cancel anytime.</span>
                    <span className="block text-xs">
                      <Link to={ROUTES.TERMS}>Terms and conditions</Link> apply.
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </SectionLayout>
        {showMemberships && reserveTeam && <ReserveTeamMembershipsFeatures />}
        {showMemberships && (
          <>
            <SectionLayout className="mb-12 md:mb-24">
              <CompareMembershipsTable products={recurringProducts} />
            </SectionLayout>
            <AmenitiesAndFeatures />
            <FAQ />
          </>
        )}
      </PageLayout>
      <MembershipIsPausedModal
        isOpen={showMembershipIsPausedModal}
        closeHandler={() => setShowMembershipIsPausedModal(false)}
      />
      <EndMembershipModal
        isOpen={showEndMembershipModal}
        closeHandler={() => setShowEndMembershipModal(false)}
      />
      <NoFreeSessionInformationModal
        price={priceForFirstTimersNoFreeSession}
        isOpen={showNoFreeSessionInformationModal}
        closeHandler={() => setShowNoFreeSessionInformationModal(false)}
      />
      <SelectPaymentMethodModal
        isOpen={selectPaymentMethodModalOpen}
        closeHandler={() => dispatch(closeSelectPaymentMethodModal())}
        openPurchaseDetailsModal={() => setShowPurchaseDetailsModal(true)}
        openAddPaymentMethodModal={() => dispatch(showAddPaymentMethodModal())}
      />
      <PurchaseDetailsModal
        isOpen={showPurchaseDetailsModal}
        closeHandler={() => setShowPurchaseDetailsModal(false)}
      />
      <AddPaymentMethodModal
        isOpen={addPaymentMethodModalOpen}
        closeHandler={() => dispatch(closeAddPaymentMethodModal())}
        openSelectPaymentMethodModal={() => dispatch(showSelectPaymentMethodModal())}
      />
    </>
  );
};

export default ProductsPage;
