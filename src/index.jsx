import React from 'react';
import { createRoot } from 'react-dom/client';
import ReactGA from 'react-ga4';
import 'regenerator-runtime';

import App from 'shell/Root';
import * as serviceWorker from './serviceWorker';

import './assets/main.css';
import 'shared/utils/eventListeners';
import 'shared/styles/fonts.css';
import 'shared/styles/index.css';
import 'react-toastify/dist/ReactToastify.css';

import 'external-tools/gtm';
import 'external-tools/hotjar';
import 'external-tools/activeCampaign';
import 'external-tools/activeCampaignModal';

import 'shared/amplitude/initialize'
import { initialize } from 'shared/amplitude/initialize';

const GOOGLE_ANALYTICS_CODE = import.meta.env.VITE_GOOGLE_ANALYTICS_CODE;
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

const VITE_AMPLITUDE_API_KEY = import.meta.env.VITE_AMPLITUDE_API_KEY;
initialize(VITE_AMPLITUDE_API_KEY)

ReactGA.initialize(GOOGLE_ANALYTICS_CODE, {
  testMode: import.meta.env.VITE_RUNNING_ENV !== 'production',
});
root.render(<App />);
serviceWorker.unregister();
