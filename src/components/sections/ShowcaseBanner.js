/* // FILE: src/components/sections/ShowcaseBanner.js */

import React from 'react';
import './ShowcaseBanner.css'

const ShowcaseBanner = () => {
  return (
    <section className="showcase-banner">
      <div className="showcase-banner__container">
        <div className="showcase-banner__content">
          <h1 className="showcase-banner__title">
            Towards The New<br />Electrifying Direction
          </h1>
          <p className="showcase-banner__subtitle">
            Drive The New Age EV- The Ultimate T3EV UDAY
          </p>
          <button className="showcase-banner__btn">
            Explore EV Uday Today
          </button>
        </div>
        <div className="showcase-banner__image">
          <img src="/images/evall-ev-uday.png" alt="EVall EV Uday" />
        </div>
      </div>
    </section>
  );
};
export default ShowcaseBanner;