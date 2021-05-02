import React, { useEffect } from 'react';

import Landing from './components/Landing';

import Modal from 'shared/components/Modal';
import SurveyModal from 'screens/survey/SurveyModal';

import { getUserProfile, getPreviousSessions } from 'screens/my-account/reducer';
import { getIsAuthenticated } from 'screens/auth/reducer';
import { initialLoadInit } from 'screens/my-account/actionCreators';

import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

const HomePageContainer = styled.div`
  .covid-19 {
    background-color: #9999ff;
    border-bottom: 3px solid white;
    font-size: 14px;
    left: 0;
    line-height: 18px;
    height: 67px;
    padding: 14px;
    position: fixed;
    right: 0;
    text-align: center;
    top: 0;
    z-index: 10;
    color: white;
    font-weight: bold;
    transition: 300ms opacity ease;

    a {
      margin: 0px 3px;
      color: white;
      :hover {
        opacity: 0.6;
    }

    @media (min-width: 710px) {
      font-size: 16px;
      line-height: 36px;
    }
  }
`;

const HomePage = () => {
  const history = useHistory();

  const dispatch = useDispatch();
  const userInfo = useSelector(getUserProfile);
  const previousSessions = useSelector(getPreviousSessions);
  previousSessions.sort((a, b) => b.id - a.id);
  const isAuthenticated = useSelector(getIsAuthenticated);

  const redirectUrl = window.localStorage.getItem('redirect');
  const shouldShowSurveyModal =
    isAuthenticated &&
    userInfo &&
    userInfo.id &&
    previousSessions &&
    previousSessions.length &&
    previousSessions[0].surveyAnswers.length === 0 &&
    previousSessions[0].inCancellationTime === false &&
    previousSessions[0].inConfirmationTime === false;
  const maybeGoBackToSessionToBook = () => {
    if (isAuthenticated && redirectUrl) {
      window.localStorage.removeItem('redirect');
      history.push(redirectUrl);
    }
  };

  useEffect(() => {
    dispatch(initialLoadInit());

    if (shouldShowSurveyModal) {
      window.localStorage.setItem('surveyLock', 'true');
    } else {
      maybeGoBackToSessionToBook();
    }
  }, [dispatch, shouldShowSurveyModal]);

  return (
    <HomePageContainer>
      <section className="covid-19">
        Click
        <a href="/documents/COVID_guidelinesv2.pdf" target="_blank">
          here
        </a>
        to see the changes we&apos;re making in response to COVID-19.
      </section>
      {shouldShowSurveyModal && (
        <Modal isOpen={shouldShowSurveyModal}>
          <SurveyModal isOpen={shouldShowSurveyModal} />
        </Modal>
      )}
      <Landing />
    </HomePageContainer>
  );
};

export default HomePage;
