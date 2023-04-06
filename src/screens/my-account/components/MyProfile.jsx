import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import PropTypes from 'prop-types';

import { formatDateShortYear, formatShortMonthFullYearDate } from 'shared/utils/date';
import SectionLayout from 'shared/components/layout/SectionLayout';
import Tooltip from 'shared/components/Tooltip';
import ROUTES from 'shared/constants/routes';
import missingProfileImg from 'shared/images/missing-profile-image.jpg';
import { formatPhoneNumber, pluralize } from 'shared/utils/helpers';
import ToggleButton from 'shared/components/ToggleButton';
import Button from 'shared/components/Button';
import Link from 'shared/components/Link';
import MembershipBadgeSvg from 'shared/components/svg/MembershipBadgeSvg';
import { logoutInit } from 'screens/auth/actionCreators';
import { ZERO_SKLZ_CREDITS_NOTICE } from 'screens/my-account/constants';
import { referralText } from 'shared/constants/referrals';
import { editProfileInit } from '../actionCreators';

const MyProfile = ({ profile }) => {
  const dispatch = useDispatch();

  const [inviteFriendTextCopied, setInviteFriendTextCopied] = useState(false);
  const [applyCCCashToSubscription, setApplyCCCashToSubscription] = useState(
    profile.applyCcCashToSubscription
  );

  const editProfileAction = (values) => dispatch(editProfileInit(values));
  const logoutAction = () => dispatch(logoutInit());

  const handleApplyCCCashToSubscriptionChange = () => {
    const value = !applyCCCashToSubscription;
    setApplyCCCashToSubscription(value);
    editProfileAction({ applyCcCashToSubscription: value });
  };

  const {
    defaultPaymentMethod,
    activeSubscription,
    imageUrl,
    maxCcCashSubscriptionDiscount,
    newMember,
    firstName,
    lastName,
    phoneNumber,
    email,
    instagramUsername,
    instagramProfile,
    referralCode,
    totalCredits,
    unlimitedCredits,
    scoutingCredits,
    unlimitedSkillSessionCredits,
    subscriptionSkillSessionCredits,
  } = profile;

  const subscriptionSkillSessionsCreditsPerMonth = activeSubscription?.product?.skillSessionCredits;

  const ccCashExplanationTooltip =
    'Accumulate CC CA$H through membership referrals and attending certain sessions that have a discount offer';
  const ccCashTooltip = `
    Only one discount can apply to an invoice; it’s not possible to stack two or more discounts.
    If a discount is already being applied to your membership, CC CA$H discount will not be applied.
    The maximum amount of CC CA$H that can be applied to a subscription is
    $${maxCcCashSubscriptionDiscount}
  `;

  return (
    <SectionLayout className="mb-6">
      <div className="flex flex-col md:flex-row justify-between">
        <div className="md:flex items-center">
          <div className="relative md:mr-6 mb-4 md:mb-0">
            <img
              className="w-48 h-48 object-cover rounded-full relative z-10 my-0 mx-auto"
              src={imageUrl || missingProfileImg}
              alt="Profile"
            />
            {newMember && (
              <div className="font-shapiro95_super_wide text-black bg-cream absolute px-3 py-1 text-sm z-10 right-0 top-0">
                NEW
              </div>
            )}
            <div className="absolute w-40 h-40 rounded-full bg-cc-purple filter blur-lg top-8 md:top-10 left-20 md:left-4 z-0" />
          </div>
          <div className="flex flex-col items-start gap-2">
            <h2 className="flex md:flex-col gap-1 text-2xl md:text-4xl font-shapiro95_super_wide max-w-xs md:max-w-2xl">
              <span>{firstName}</span>
              <span className="truncate">{lastName}</span>
            </h2>
            <div className="text-sm md:text-md max-w-xs md:max-w-2xl truncate flex flex-col md:flex-row gap-1 md:gap-2">
              <span>
                <span className="font-shapiro95_super_wide">Phone:</span>{' '}
                {phoneNumber ? formatPhoneNumber(phoneNumber) : '-'}
              </span>
              <span className="max-w-lg truncate">
                <span className="font-shapiro95_super_wide">Email:</span> {email}
              </span>
            </div>
            {instagramUsername ? (
              <Link isExternal to={instagramProfile} target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon
                  icon={faInstagram}
                  className="cursor-pointer text-white text-2xl"
                />
              </Link>
            ) : (
              '-'
            )}
          </div>
        </div>
        <div className="flex flex-col md:items-end gap-2 mt-4 md:mt-0">
          <Button
            className="w-full md:w-auto"
            variant="outline-purple"
            onClick={() => {
              // TODO: handle settings
            }}
          >
            SETTINGS
          </Button>
          <Link
            className="w-full md:w-auto text-center md:text-right"
            onClick={() => logoutAction()}
          >
            Log out
          </Link>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-6 mt-20">
        <div className="bg-cc-blue-700 p-6 flex gap-6 md:w-1/3">
          <div className="flex items-center justify-center text-9xl font-dharma_gothic_cheavy bg-cc-blue-300 py-3 px-6">
            {unlimitedCredits ? 'Unl' : totalCredits}
          </div>
          <div className="flex flex-col">
            <span className="font-shapiro95_super_wide text-lg">
              {unlimitedCredits
                ? 'Unl Sessions left'
                : `${totalCredits} ${pluralize('Session', totalCredits)} left`}
            </span>
            <span className="opacity-60">{activeSubscription ? 'This month' : 'Left'}</span>
            {activeSubscription && (
              <>
                <span className="text-xs mt-4">
                  <span className="font-shapiro95_super_wide mr-2">Membership:</span>
                  {activeSubscription.product.name}
                </span>
                {activeSubscription.canceled && (
                  <span className="font-shapiro95_super_wide text-red-300 text-xs my-1">
                    Canceled at end of bill period
                  </span>
                )}
                {activeSubscription.paused && (
                  <span className="font-shapiro95_super_wide text-orange-200 text-xs my-1">
                    Paused
                  </span>
                )}
                <span className="text-xs mt-1">
                  <span className="font-shapiro95_super_wide mr-2">Billing period:</span>
                  {formatDateShortYear(activeSubscription.currentPeriodStart)}
                  {' - '}
                  {formatDateShortYear(activeSubscription.currentPeriodEnd)}
                </span>
              </>
            )}
            <span className="text-xs mt-1">
              <span className="font-shapiro95_super_wide mr-2">
                Eval {pluralize('credit', scoutingCredits)}:
              </span>
              {scoutingCredits}
            </span>
            {activeSubscription && (
              <>
                {(subscriptionSkillSessionsCreditsPerMonth !== 0 ||
                  subscriptionSkillSessionCredits !== 0) && (
                  <>
                    <span className="text-xs mt-1">
                      <span className="font-shapiro95_super_wide mr-2">
                        SKLZ {pluralize('credit', subscriptionSkillSessionCredits)}:
                      </span>
                      {unlimitedSkillSessionCredits ? 'Unl' : subscriptionSkillSessionCredits}
                    </span>
                    {subscriptionSkillSessionCredits === 0 && (
                      <div className="text-2xs">{ZERO_SKLZ_CREDITS_NOTICE}</div>
                    )}
                  </>
                )}
                <span className="text-sm mt-2">
                  <Link to={ROUTES.MEMBERSHIPS}>Manage membership</Link>
                </span>
              </>
            )}
          </div>
        </div>
        <div className="bg-cc-blue-700 p-6 md:w-1/4 flex flex-col justify-between">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <span className="font-shapiro95_super_wide text-lg">CC CA$H</span>
              <Tooltip variant="black" tooltip={ccCashExplanationTooltip} className="ml-2">
                <FontAwesomeIcon icon={faInfoCircle} className="text-gray-400 cursor-pointer" />
              </Tooltip>
            </div>
            <span className="text-xl font-shapiro95_super_wide">${Number(profile.ccCash)}</span>
          </div>
          <hr className="my-3 md:my-0" />
          <div className="flex justify-between items-center">
            <div>
              <span className="text-sm mr-10 md:mr-0">Apply CC CA$H to membership</span>
              <Tooltip variant="black" tooltip={ccCashTooltip} className="inline ml-2">
                <FontAwesomeIcon icon={faInfoCircle} className="text-gray-400 cursor-pointer" />
              </Tooltip>
            </div>
            <ToggleButton
              size="4xl"
              value={applyCCCashToSubscription}
              onChange={handleApplyCCCashToSubscriptionChange}
            />
          </div>
          <hr className="my-3 md:my-0" />
          <div className="text-sm flex justify-between items-center">
            <span>
              {defaultPaymentMethod ? `Card ending in ${defaultPaymentMethod.last4}` : 'Not set'}
            </span>
            {defaultPaymentMethod && (
              <Link className="text-sm" to={ROUTES.PAYMENT_METHODS_DEFAULT}>
                Edit
              </Link>
            )}
          </div>
        </div>
        <div className="bg-cc-blue-700 p-6 md:w-1/4 flex flex-col gap-3 justify-between">
          <span className="font-shapiro95_super_wide text-lg">Referral code</span>
          <div className="text-cc-purple bg-cc-blue-300 py-2 px-4 truncate">{referralCode}</div>
          <CopyToClipboard
            onCopy={() => setInviteFriendTextCopied(true)}
            text={referralText(referralCode)}
          >
            <Button variant="outline-purple" className="w-full">
              {inviteFriendTextCopied ? 'Copied' : 'Invite friend'}
            </Button>
          </CopyToClipboard>
          <Link className="text-sm" to={ROUTES.REFERRALS}>
            Referral history
          </Link>
        </div>
        <div className="bg-cc-blue-700 p-6 md:w-1/6 flex flex-col items-center justify-evenly">
          {activeSubscription && <MembershipBadgeSvg className="text-cc-purple" />}
          <span className="font-shapiro95_super_wide">
            {activeSubscription ? 'Member since' : 'Not member'}
          </span>
          {activeSubscription && `${formatShortMonthFullYearDate(activeSubscription.createdAt)}`}
        </div>
      </div>
    </SectionLayout>
  );
};

MyProfile.propTypes = {
  profile: PropTypes.shape().isRequired,
};

export default MyProfile;
