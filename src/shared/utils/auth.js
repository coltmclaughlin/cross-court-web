const setTokens = loginPayload => {
  localStorage.setItem('CLIENT', loginPayload.client);
  localStorage.setItem('UID', loginPayload.uid);
  localStorage.setItem('ACCESS-TOKEN', loginPayload.accessToken);
  localStorage.setItem('isAuthenticated', true);
};

const getTokens = () => {
  const CLIENT = localStorage.getItem('CLIENT');
  const UID = localStorage.getItem('UID');
  const ACCESS_TOKEN = localStorage.getItem('ACCESS-TOKEN');

  return {
    uid: UID,
    client: CLIENT,
    accessToken: ACCESS_TOKEN,
  };
};

export const getHeaders = (extraStuff = {}) => {
  const { uid, client, accessToken } = getTokens();

  const headers = {
    'Content-Type': 'application/json',
    uid,
    client,
    'access-token': accessToken,
  };

  return { ...headers, ...extraStuff };
};

const isAuthenticated = () => {
  return Boolean(localStorage.getItem('isAuthenticated'));
};

export default {
  setTokens,
  getTokens,
  getHeaders,
  isAuthenticated,
};
