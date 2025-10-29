// src/components/sections/ContactSection/ContactSection.js

import React from "react";
import "./ContactSection.css";
import ContactForm from "./forms/ContactForm";

const ContactSection = () => {
  return (
    <section className="contact-section" aria-labelledby="contact-heading">
      <div className="contact-section__wrapper">
        <aside className="contact-section__left">
          <div className="contact-section__left-content">
            <h2 id="contact-heading" className="contact-section__heading">
              How Can we Help You
            </h2>

            <p className="contact-section__description">
              Need help? Reach out now for quick assistance with sales, service,
              or product queries. Our dedicated team guarantees genuine spare parts
              availability and reliable support for all customers across India.
            </p>

            <h3 className="contact-section__subheading">Registered Office:</h3>

            <div className="contact-section__info-block">
              <div className="contact-section__icon-tile" aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 12q.825 0 1.413-.587T14 10t-.587-1.412T12 8t-1.412.588T10 10t.588 1.413T12 12m0 7.35q3.05-2.8 4.525-5.087T18 10.2q0-2.725-1.737-4.462T12 4T7.738 5.738T6 10.2q0 1.775 1.475 4.063T12 19.35M12 22q-4.025-3.425-6.012-6.362T4 10.2q0-3.75 2.413-5.975T12 2t5.588 2.225T20 10.2q0 2.5-1.987 5.438T12 22m0-12"></path></svg>
              </div>
              <div className="contact-section__info-text">
                <p className="contact-section__address">
                  D218, Phase 8B, Industrial Area, Sector 74,<br/>
                  Sahibzada Ajit Singh Nagar, Punjab -160055
                </p>
              </div>
            </div>

            <div className="contact-section__info-block">
              <div className="contact-section__icon-tile" aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M6.54 5c.06.89.21 1.76.45 2.59l-1.2 1.2c-.41-1.2-.67-2.47-.76-3.79zm9.86 12.02c.85.24 1.72.39 2.6.45v1.49c-1.32-.09-2.59-.35-3.8-.75zM7.5 3H4c-.55 0-1 .45-1 1c0 9.39 7.61 17 17 17c.55 0 1-.45 1-1v-3.49c0-.55-.45-1-1-1c-1.24 0-2.45-.2-3.57-.57a.8.8 0 0 0-.31-.05c-.26 0-.51.1-.71.29l-2.2 2.2a15.15 15.15 0 0 1-6.59-6.59l2.2-2.2c.28-.28.36-.67.25-1.02A11.4 11.4 0 0 1 8.5 4c0-.55-.45-1-1-1"></path></svg>
              </div>
              <div className="contact-section__info-text">
                <p className="contact-section__contact-line">Phone: (0172) 450 9386</p>
              </div>
            </div>

            <div className="contact-section__info-block">
              <div className="contact-section__icon-tile" aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M4 20q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h16q.825 0 1.413.588T22 6v12q0 .825-.587 1.413T20 20zm8-7L4 8v10h16V8zm0-2l8-5H4zM4 8V6v12z"></path></svg>
              </div>
              <div className="contact-section__info-text">
                <p className="contact-section__contact-line">Email: info@evall.co.in</p>
              </div>
            </div>
          </div>
        </aside>

        <main className="contact-section__right">
          <div className="contact-section__form-wrapper">
            <ContactForm />
          </div>
        </main>
      </div>
    </section>
  );
};

export default ContactSection;