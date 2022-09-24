import React from 'react';
import { Formik, Form } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import InputTextField from 'shared/components/InputTextField';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';

import { checkPromoCode } from '../actionCreators';
import { getPromoCodeLoading, getPromoCodeValid } from '../reducer';

const PromoCode = ({ className }) => {
  const dispatch = useDispatch();

  const isLoading = useSelector(getPromoCodeLoading);
  const isPromoCodeValid = useSelector(getPromoCodeValid);

  const checkPromoCodeAction = (promoCode) => dispatch(checkPromoCode(promoCode));

  const initialValues = {
    promoCode: '',
  };

  return (
    <Formik
      validateOnChange={false}
      validateOnBlur={false}
      initialValues={initialValues}
      onSubmit={({ promoCode }) => {
        if (promoCode.length > 0) {
          checkPromoCodeAction(promoCode);
        }
      }}
    >
      {() => (
        <Form className={className}>
          <div className="flex flex-col md:flex-row">
            <InputTextField
              name="promoCode"
              label="Discount Code"
              placeholder="Enter your code"
              disabled={isPromoCodeValid}
              className="mb-4 md:mb-0"
            />
            {isPromoCodeValid ? (
              <span className="text-right text-sm md:text-base md:ml-2 md:mt-10">
                DISCOUNT ADDED!
              </span>
            ) : (
              <PrimaryButton type="submit" loading={isLoading} py="11px" className="self-end ml-4">
                USE CODE
              </PrimaryButton>
            )}
          </div>
        </Form>
      )}
    </Formik>
  );
};

PromoCode.defaultProps = {
  className: '',
};

PromoCode.propTypes = {
  className: PropTypes.string,
};

export default PromoCode;
