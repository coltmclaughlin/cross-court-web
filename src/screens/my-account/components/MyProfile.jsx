import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

import ROUTES from 'shared/constants/routes';
import { formatPhoneNumber } from 'shared/utils/helpers';
import missingProfileImg from 'shared/images/missing-profile-image.png';
import EditIcon from 'shared/components/svg/EditIcon.svg';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';

import { editProfileInit, showEditProfile } from '../actionCreators';
import { getEditProfileLoading, getShowEditProfile } from '../reducer';
import EditProfileForm from './EditProfileForm';

const detailRowClasses = 'flex flex-col mb-8 text-lg';
const titleClasses = 'font-shapiro95_super_wide';

const MyProfile = ({ profile, showTitle = true }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const [inviteFriendTextCopied, setInviteFriendTextCopied] = useState(false);

  const editProfileAction = (values) => dispatch(editProfileInit(values));
  const showEditProfileAction = () => dispatch(showEditProfile());

  const editProfileLoading = useSelector(getEditProfileLoading);
  const showEditProfileForm = useSelector(getShowEditProfile);

  const dateOfBirth = new Date(profile.birthday);
  const defaultPaymentMethod = profile.defaultPaymentMethod;
  const inviteFriendText =
    `Use my referral code ${profile.referralCode} at checkout to receive 50% off ` +
    'on your first month of any Crosscourt membership';

  return (
    <div className="relative p-8">
      <button type="button" onClick={showEditProfileAction} className="absolute right-8 top-10">
        <EditIcon />
      </button>
      {showTitle && <h3 className="font-shapiro95_super_wide mb-3 text-3xl">MY ACCOUNT</h3>}

      <div className={detailRowClasses}>
        <span className={titleClasses}>EMAIL</span>
        <span className="truncate">{profile.email}</span>
      </div>
      {showEditProfileForm ? (
        <EditProfileForm
          profile={profile}
          editProfileAction={editProfileAction}
          editProfileLoading={editProfileLoading}
        />
      ) : (
        <>
          <div className={detailRowClasses}>
            <span className={titleClasses}>PROFILE IMAGE</span>
            <img
              className="w-16 h-16 object-cover rounded-full"
              src={profile.imageUrl ? profile.imageUrl : missingProfileImg}
              alt="Profile"
            />
          </div>

          <div className={detailRowClasses}>
            <span className={titleClasses}>FULL NAME</span>
            <span className="truncate">{`${profile.firstName} ${profile.lastName}`}</span>
          </div>
          <div className={detailRowClasses}>
            <span className={titleClasses}>DATE OF BIRTH</span>
            <span className="truncate">
              {profile.birthday
                ? dateOfBirth.toLocaleDateString('en-US', { timeZone: 'UTC' })
                : '-'}
            </span>
          </div>
          <div className={detailRowClasses}>
            <span className={titleClasses}>PHONE</span>
            <span className="truncate">
              {profile.phoneNumber ? formatPhoneNumber(profile.phoneNumber) : 'No phone'}
            </span>
          </div>
          <div className={detailRowClasses}>
            <span className={titleClasses}>BILLING</span>
            <span className="mr-7">
              {defaultPaymentMethod ? `Card ending in ${defaultPaymentMethod.last4}` : 'Not set'}
            </span>
            <PrimaryButton
              className="text-left"
              fontSize="0.75rem"
              lineHeight="1"
              onClick={() => history.push(ROUTES.PAYMENT_METHODS_DEFAULT)}
            >
              Edit
            </PrimaryButton>
          </div>
          <div className={detailRowClasses}>
            <span className={titleClasses}>SKILL RATING</span>
            <span className="mr-7">{profile?.skillRating ?? 'Not set'}</span>
            <PrimaryButton
              className="text-left"
              fontSize="0.75rem"
              lineHeight="1"
              onClick={() =>
                history.push({
                  pathname: ROUTES.RATING,
                  state: {
                    isEdit: true,
                    currentValue: profile.skillRating,
                    from: location.pathname,
                  },
                })
              }
            >
              Edit
            </PrimaryButton>
          </div>
          <div className={detailRowClasses}>
            <span className={titleClasses}>REFERRAL CODE</span>
            <span>{profile.referralCode}</span>
          </div>
          <div className="text-lg mb-3">
            <span className={titleClasses}>REFERRAL CREDITS</span>
            <span className="font-shapiro95_super_wide text-3xl block">{`$${Number(
              profile.ccCash
            )}`}</span>
          </div>
          <CopyToClipboard onCopy={() => setInviteFriendTextCopied(true)} text={inviteFriendText}>
            <PrimaryButton w="100%" className="mb-2">
              <FontAwesomeIcon icon={faExternalLinkAlt} />{' '}
              {inviteFriendTextCopied ? 'Copied' : 'Invite a friend'}
            </PrimaryButton>
          </CopyToClipboard>
          <PrimaryButton to={ROUTES.REFERRALS} inverted w="100%">
            Referral History
          </PrimaryButton>
        </>
      )}
    </div>
  );
};

MyProfile.propTypes = {
  profile: PropTypes.shape().isRequired,
  showTitle: PropTypes.bool,
};

export default MyProfile;
