import { yearsFrom } from 'shared/utils/date';

export const isUserInFirstFreeSessionFlow = (userProfile) => {
  if (!userProfile) return false;

  const freeSessionNotExpired = new Date(userProfile.freeSessionExpirationDate) > new Date();
  const freeSessionNotClaimed = userProfile.freeSessionState === 'not_claimed';

  return freeSessionNotExpired && freeSessionNotClaimed;
};

export const isUserInLegalAge = (userProfile) => {
  if (!userProfile.birthday) {
    // If user not logged in it should return true
    // If user does not have a birthday value, that means is an old system user
    // who are considered adults
    return true;
  }

  const userAge = yearsFrom(new Date(userProfile.birthday));

  return userAge >= 18;
};
