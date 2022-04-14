import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { isNil } from 'ramda';

import ROUTES from 'shared/constants/routes';
import { getSelectedProduct } from 'screens/products/reducer';
import { getProrate, getProrateLoading } from 'screens/checkout/reducer';
import { getSelectedCard } from 'screens/payment-methods/reducer';
import BackButton from 'shared/components/BackButton';
import { createPurchase, createSubscription, updateSubscription } from './actionCreators';
import { subscriptionProrate } from 'screens/checkout/actionCreators';
import PurchaseDetails from './components/PurchaseDetails';
import { getUserProfile } from 'screens/my-account/reducer';
import { RECURRING } from 'screens/products/constants';

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const productDetails = useSelector(getSelectedProduct);
  const paymentMethod = useSelector(getSelectedCard);
  const userProfile = useSelector(getUserProfile);
  const prorate = useSelector(getProrate);
  const prorateLoading = useSelector(getProrateLoading);
  const userHasActiveSubscription = !!userProfile.activeSubscription;
  const isSubscription = productDetails?.productType === RECURRING;

  useEffect(() => {
    if (isSubscription && productDetails.id && userHasActiveSubscription) {
      dispatch(subscriptionProrate(productDetails.id));
    }
  }, [userHasActiveSubscription, dispatch, isSubscription, productDetails.id]);

  if (isNil(productDetails) || isNil(paymentMethod)) {
    return <Redirect to={ROUTES.LOCATIONS} />;
  }
  let action;
  if (isSubscription && userHasActiveSubscription) {
    action = updateSubscription();
  } else if (isSubscription && !userHasActiveSubscription) {
    action = createSubscription();
  } else {
    action = createPurchase();
  }

  const createPurchaseHandler = () => dispatch(action);

  return (
    <>
      <BackButton className="mt-10 w-max" />
      <div className="text-2xl md:text-base pt-20 flex flex-col items-center justify-center">
        <h1 className="mb-8 font-shapiro95_super_wide text-lg">PURCHASE DETAILS</h1>
        <PurchaseDetails
          prorate={prorate}
          prorateLoading={prorateLoading}
          productDetails={productDetails}
          paymentMethod={paymentMethod}
          createPurchaseHandler={createPurchaseHandler}
          userHasActiveSubscription={userHasActiveSubscription}
        />
      </div>
    </>
  );
};

export default CheckoutPage;
