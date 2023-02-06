import React, { useState } from 'react';
import runtimeEnv from '@mars/heroku-js-runtime-env';
import PropTypes from 'prop-types';

import Modal from 'shared/components/Modal';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';

export const CancelModal = ({
  isOpen,
  closeHandler,
  cancelSessionAction,
  sessionInfo,
  unlimitedCredits,
}) => {
  const env = runtimeEnv();
  const [disableBtn, setDisableBtn] = useState(false);

  const inCancellationTime = sessionInfo?.userSession?.inCancellationTime;
  const isFreeSession = sessionInfo?.userSession?.isFreeSession;
  const scouting = sessionInfo?.userSession?.scouting;
  const shootingMachineReservations = sessionInfo.userSession?.shootingMachineReservations;
  const isOpenClub = sessionInfo?.isOpenClub;

  const onCancelClick = () => {
    setDisableBtn(true);
    cancelSessionAction();
  };

  const cancellationText = (() => {
    if (isOpenClub) {
      if (!shootingMachineReservations?.length) {
        return;
      }

      const shootingMachineReservationsPrice = shootingMachineReservations.reduce(
        (totalPrice, shootingMachineReservation) =>
          shootingMachineReservation.charged
            ? totalPrice + shootingMachineReservation.price
            : totalPrice,
        0
      );

      if (shootingMachineReservationsPrice > 0) {
        return (
          `Due to the late cancellation, the $${shootingMachineReservationsPrice} ` +
          'shooting machine(s) rental price will not be refunded'
        );
      }

      return 'You will not be charged for the shooting machine(s) rental';
    }

    const lateCancelFee = env.REACT_APP_CANCELED_OUT_OF_TIME_PRICE;
    const hasLateCancelFee = Number(lateCancelFee);

    if (unlimitedCredits) {
      if (inCancellationTime) {
        return null;
      }

      if (hasLateCancelFee) {
        return `You will be charged a $${lateCancelFee} late cancellation fee`;
      }

      return 'You will not be charged a late cancellation fee';
    }

    if (inCancellationTime) {
      return scouting
        ? 'The session and evaluation credits will be refunded to your account'
        : 'The credit will be refunded to your account';
    }

    if (isFreeSession) {
      return `Your free session credit will remain in your account, but we do charge a \
                $${env.REACT_APP_FREE_SESSION_CANCELED_OUT_OF_TIME_PRICE} late cancellation fee`;
    }

    let message = scouting
      ? 'The session and evaluation credits will not be refunded because of the late cancellation'
      : 'The credit will not be refunded because of the late cancellation';

    if (Number(lateCancelFee) > 0) {
      message += `. You will also be charged a $${lateCancelFee} late cancellation fee`;
    }

    return message;
  })();

  return (
    <Modal isOpen={isOpen} closeHandler={closeHandler} title="Cancel Reservation">
      <div className="text-center">
        <div className="mb-6">
          <div>Are you sure you want to cancel your session?</div>
          {cancellationText && <div className="mt-6 mb-8 font-bold">{cancellationText}</div>}
        </div>
        <PrimaryButton onClick={onCancelClick} inverted disabled={disableBtn}>
          Cancel Reservation
        </PrimaryButton>
      </div>
    </Modal>
  );
};

CancelModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  unlimitedCredits: PropTypes.bool.isRequired,
  closeHandler: PropTypes.func.isRequired,
  cancelSessionAction: PropTypes.func.isRequired,
  sessionInfo: PropTypes.shape(),
};

export default CancelModal;
