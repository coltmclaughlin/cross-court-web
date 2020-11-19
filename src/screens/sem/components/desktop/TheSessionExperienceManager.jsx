import React, { useState } from 'react';
import runtimeEnv from '@mars/heroku-js-runtime-env';

import useWindowSize from 'shared/hooks/useWindowSize';
import ReactPlayer from 'react-player';
import ReactModal from 'react-modal';
import { size } from 'shared/styles/mediaQueries';

import playButtonPurpleIcon from 'shared/images/play-button-purple.png';
import playButtonWhiteIcon from 'shared/images/play-button-white.png';

import theSessionExperienceManagerMobileImg from 'screens/sem/images/the-session-experience-manager.png';

const SessionExperienceManager = () => {
  const env = runtimeEnv();
  const SEM_LINK = env.REACT_APP_FOUNTAIN_SEM_LINK;

  const [showModal, setShowModal] = useState(false);
  const { width: windowSize } = useWindowSize();

  const modalStyle = {
    overlay: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      zIndex: 100,
    },
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      border: 'none',
      borderRadius: '0',
      transform: 'translate(-50%, -50%)',
      background: 'none',
      padding: 0,
      width: '80%',
      height: windowSize < size.desktop ? '25%' : '70%',
    },
  };

  return (
    <section className="the-session-experience-manager section-block text-black">
      <section className="title-and-description-block shift-left">
        <p className="heading-sprite" />
        <p className="description">
          Crosscourt&apos;s SEMs are the face of Crosscourt at each session. Part host, part DJ, and
          part coordinator, you represent Crosscourt at each session you manage. You bring the
          energy and hold it in each session. If you are charismatic, empowering, and hospitable,
          then you may be a perfect Session Experience Manager.
        </p>
        <div className="button-wrapper">
          <a
            className="ar-button double inverted apply-button"
            href={SEM_LINK}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="ar-button-inner">APPLY</div>
            <div className="double-drop" />
          </a>
          <a
            className="ar-button double inverted learn-more"
            onClick={(e) => {
              e.preventDefault();
              setShowModal(true);
            }}
            href="#modal"
          >
            <div className="ar-button-inner">
              <img alt="" className="play-button-white" src={playButtonWhiteIcon} />
              <img alt="" className="play-button-purple" src={playButtonPurpleIcon} />
              <span className="text">LEARN MORE</span>
            </div>
            <div className="double-drop" />
          </a>
          <ReactModal
            shouldCloseOnOverlayClick
            style={modalStyle}
            onRequestClose={() => setShowModal(false)}
            isOpen={showModal}
          >
            <ReactPlayer
              controls
              playing
              width="100%"
              height="100%"
              url="https://player.vimeo.com/video/438002072?title=0&byline=0&portrait=0&playsinline=0&autopause=0&app_id=122963"
            />
          </ReactModal>
        </div>
      </section>
      <img alt="" className="mobile-image" src={theSessionExperienceManagerMobileImg} />
    </section>
  );
};

export default SessionExperienceManager;
