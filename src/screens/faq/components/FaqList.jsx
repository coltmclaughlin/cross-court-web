import React, { useState } from 'react';
import runtimeEnv from '@mars/heroku-js-runtime-env';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

import Accordion from 'shared/components/Accordion';

const LINK_CLASSES = 'text-cc-purple hover:text-opacity-60';
const NUMBER_QUESTIONS = 20;

const FaqList = ({ dark, showInBatches, className }) => {
  const env = runtimeEnv();
  const [questionsShown, setQuestionsShow] = useState(showInBatches);

  return (
    <div className={className}>
      <Accordion
        title="What is Crosscourt?"
        dark={dark}
        className={`${questionsShown < 1 ? 'hidden' : ''} mb-2`}
      >
        Crosscourt's a team-sport based fitness company. We offer a high-intensity, basketball-based
        fitness experience. Each session's one hour, limited to 15 players, and has a dedicated
        Experience Team. Built for the modern athlete, we emphasize a seamless and sweat-inducing
        experience. Our continuous games to 11 have a 5-minute time limit to keep the session
        fast-paced, while the presence of our Session Officials ensures the vibes are always on
        point.
      </Accordion>
      <Accordion
        title="What is the format of a session?"
        dark={dark}
        className={`${questionsShown < 2 ? 'hidden' : ''} mb-2`}
      >
        <ul>
          <li>
            - The 60 minute session is made up of games to 5 minutes or 11 points by 2's and 3's,
            whichever happens first
          </li>
          <li>- Winner stays on for a max of 3 games in a row</li>
          <li>- All fouls are taken out of bounds closest to the foul</li>
          <li>- All And 1's result in the basket and ball back, taken out of bounds</li>
          <li>
            - Each team gets 5 fouls/game, then all additional fouls result in a single free throw
            worth 2 points
          </li>
          <li>- All 1 and 1's are instead a single free throw that counts as 2 points</li>
          <li>- All fouls under 10 seconds result in a free throw that counts as two points</li>
          <li>- The clock only stops under 10 seconds</li>
          <li>
            - If a game is tied after 5 minutes, then we tip off for a "next basket wins" scenario
          </li>
        </ul>
        <p className="mt-4">
          If you'd like to see the Crosscourt Rules and Format in more detail, click{' '}
          <a className={LINK_CLASSES} href="rules">
            HERE
          </a>
        </p>
      </Accordion>
      <Accordion
        title="What if I'm not good at basketball?"
        dark={dark}
        className={`${questionsShown < 3 ? 'hidden' : ''} mb-2`}
      >
        "Everybody's an athlete" is one of our core values because we believe everyone deserves
        space on the court, regardless of ability, identity, or status. We provide sessions for all
        skill level ranges. Each session is categorized into a beginner, intermediate, or advanced
        tier. Use the skill level assessment questionnaire provided during profile creation or find
        it in the "My Account" section to see which sessions are right for you.
      </Accordion>
      <Accordion
        title="How many calories are burned per session?"
        dark={dark}
        className={`${questionsShown < 4 ? 'hidden' : ''} mb-2`}
      >
        60 minutes of non stop action gets those competitive juices flowing and makes for quite a
        burn. While it depends on the person, you can expect to burn 500 to 1,000+ calories per
        session. Our team-sport based workout engages the entire body through significant
        cardiovascular strain, constant plyometric movement, and natural high-intensity interval
        training. Can't spell ball out without all out!
      </Accordion>
      <Accordion
        title="Do you offer membership or can I purchase a single session?"
        dark={dark}
        className={`${questionsShown < 5 ? 'hidden' : ''} mb-2`}
      >
        While we do offer a drop in option, the Crosscourt community is mostly comprised of members
        who either purchase our 4 sessions per month package, our 8 sessions per month package, or
        our Unlimited sessions package. Check out our Memberships page to learn more.
      </Accordion>
      <Accordion
        title="Do I need to be on a team to join or can I sign up by myself?"
        dark={dark}
        className={`${questionsShown < 6 ? 'hidden' : ''} mb-2`}
      >
        We exist to remove the barriers that make sports more work than workout. All you have to do
        is find a session that works for your schedule and sign up. When you arrive, we create the
        teams--first 5 members to the gym begin the session against the next 5 members to arrive.
      </Accordion>
      <Accordion
        title="How old do you need to be to sweat with the #ccteam?"
        dark={dark}
        className={`${questionsShown < 7 ? 'hidden' : ''} mb-2`}
      >
        You must be 18 or older to participate.
      </Accordion>
      <Accordion
        title="What do I need to wear and bring?"
        dark={dark}
        className={`${questionsShown < 8 ? 'hidden' : ''} mb-2`}
      >
        Please bring athletic shoes (preferably basketball shoes), a water bottle (water filler
        station on site), and towel if you've got 'em. If you purchased a jersey, bring that as
        well. If not, you can rent one when you check in, unless it's your first time, in that case
        we lend you one for no additional cost. Please leave your basketball at home. We set it up,
        you lay it up!
      </Accordion>
      <Accordion
        title="What's the cancellation policy?"
        dark={dark}
        className={`${questionsShown < 9 ? 'hidden' : ''} mb-2`}
      >
        You can cancel your reservation up to 5 hours before your session begins in order to receive
        a refund. Cancellations made less than 5 hours before your session will result in a fee or
        lost session credit.
      </Accordion>
      <Accordion
        title="What happens if I forget to cancel outside the cancellation window or don't show up?"
        dark={dark}
        className={`${questionsShown < 10 ? 'hidden' : ''} mb-2`}
      >
        In order to cancel a reservation and return your purchased session to your account, you must
        cancel your reservation at least 5 hours prior to the start time of such reservation. Once
        your reservation is cancelled on time, your session credit will be returned to your account
        to be used at a future date. If you haven’t cancelled by the deadline listed above, your
        session credit will be used for the reservation and will no longer be shown in your account.
        Any individual who cancels inside the 5 hour cancellation window will be automatically
        charged a ${env.REACT_APP_CANCELED_OUT_OF_TIME_PRICE} penalty in addition to losing a
        session credit. In case you're cancelling your first free session out of time, your session
        credit will be returned to your account for later use, but you will be charged a $
        {env.REACT_APP_FREE_SESSION_CANCELED_OUT_OF_TIME_PRICE} fee. Booking a reservation and "no
        showing" without cancelling a session you are signed up for, will result in a lost of the
        session credit and a ${env.REACT_APP_NO_SHOW_UP_FEE} no show penalty.
      </Accordion>
      <Accordion
        title="How early should I arrive?"
        dark={dark}
        className={`${questionsShown < 11 ? 'hidden' : ''} mb-2`}
      >
        We suggest arriving at least 10 minutes early since the first 10 players checked into our
        system will begin the session.
      </Accordion>
      <Accordion
        title="What happens when I arrive?"
        dark={dark}
        className={`${questionsShown < 12 ? 'hidden' : ''} mb-2`}
      >
        After signing up, we'll send you a “What to Expect” video. When you arrive, our Session
        Experience Manager will check you in and give you the low down. After finding out what color
        jersey to wear, we recommend putting your stuff in a locker, using the restrooms, stretching
        out, and getting to know your teammates.
      </Accordion>
      <Accordion
        title="Can I request to be on a specific team?"
        dark={dark}
        className={`${questionsShown < 13 ? 'hidden' : ''} mb-2`}
      >
        We cannot make specific arrangements. Crosscourt is a social form of exercise, and as such
        we recommend getting to know some of the other players in your session. If you enjoy going
        to the same location at the same time each week, then you will likely see the same players
        frequently. Also note, teams will be rotated if there are less than 15 players in a session.
        We do offer private rentals if you and your friends want to book the facility.
      </Accordion>
      <Accordion
        title="How do I book a Session?"
        dark={dark}
        className={`${questionsShown < 14 ? 'hidden' : ''} mb-2`}
      >
        Go to the <a href="locations">Schedule</a> tab on our website and find a session that works
        for you. Filter by date/time and just click “Reserve.” If you don't have any session
        credits, then you'll be asked to purchase before confirming your reservation.
      </Accordion>
      <Accordion
        title="How can I become a Session Experience Manager or Session Official?"
        dark={dark}
        className={`${questionsShown < 15 ? 'hidden' : ''} mb-2`}
      >
        We're always looking for brand advocates to join the Crosscourt Experience Team! Just click
        the JOIN THE TEAM button on our website and fill out an application.
      </Accordion>
      <Accordion
        title="Do you offer corporate events or private parties?"
        dark={dark}
        className={`${questionsShown < 16 ? 'hidden' : ''} mb-2`}
      >
        Yes, please email{' '}
        <a className={LINK_CLASSES} href="mailto:ccteam@cross-court.com">
          ccteam@cross-court.com
        </a>{' '}
        or hit the CONTACT button below for all private event inquiries.
      </Accordion>
      <Accordion
        title="How does the waitlist work?"
        dark={dark}
        className={`${questionsShown < 17 ? 'hidden' : ''} mb-2`}
      >
        Our waitlist is first come first serve. Join the waitlist for a session you're interested
        in, and we'll notify you if someone cancels!
      </Accordion>
      <Accordion
        title="How does upgrading or downgrading your membership works?"
        dark={dark}
        className={`${questionsShown < 18 ? 'hidden' : ''} mb-2`}
      >
        Changes to a membership such as upgrading or downgrading can result in prorated charges. For
        example, if a member upgrades from a 10 USD per month membership to a 20 USD option, they're
        charged prorated amounts for the time spent on each option. Assuming the change occurred
        halfway through the billing period, the member is billed an additional 5 USD: -5 USD for
        unused time on the initial price, and 10 USD for the remaining time on the new price.
      </Accordion>
      <Accordion
        title="How did Crosscourt start?"
        dark={dark}
        className={`${questionsShown < 19 ? 'hidden' : ''} mb-2`}
      >
        Crosscourt was started by two friends who were passionate about solving a problem they dealt
        with all too often: finding an efficient way to play pickup basketball. Both founders grew
        up around athletics and, after meeting at USC, bonded over their shared appreciation for
        sport, fitness, and culture. Following graduation from school and struggling to find a way
        to easily play pick up basketball, considering their busy work schedules, the founders
        decided to explore an original concept that would not only break the mold around pick-up
        basketball, but also redefine group fitness. Something that would allow the modern athlete
        to continue engaging in the sports they loved in an indoor gym setting, while improving
        their physical and mental wellbeing. Today, Crosscourt’s a diverse destination where modern
        athletes come to sweat and shed stress as equals.
      </Accordion>
      <Accordion
        title="Want to see our terms & conditions?"
        dark={dark}
        className={questionsShown < 20 ? 'hidden' : ''}
      >
        Link{' '}
        <a className={LINK_CLASSES} href="terms-and-conditions">
          HERE
        </a>
        .
      </Accordion>
      {questionsShown < NUMBER_QUESTIONS && (
        <div
          onClick={() => setQuestionsShow(questionsShown + showInBatches)}
          className={`${
            dark ? 'bg-cc-blue-900 text-white' : 'border border-cc-blue-900 text-black'
          } px-4 py-2 text-center text-xs cursor-pointer`}
        >
          Show More
          <FontAwesomeIcon className="ml-2" icon={faChevronDown} />
        </div>
      )}
    </div>
  );
};

FaqList.defaultProps = {
  dark: true,
  showInBatches: NUMBER_QUESTIONS,
  className: '',
};

FaqList.propTypes = {
  dark: PropTypes.bool,
  showInBatches: PropTypes.number,
  className: PropTypes.string,
};

export default FaqList;
