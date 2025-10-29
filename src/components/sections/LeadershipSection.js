// src/components/common/LeadershipSection.js
import React from 'react';
import './LeadershipSection.css';

const PersonCard = ({ person }) => {
  return (
    <div className="person-card">
      <div className="person-card__image-wrapper">
        <img 
          src={person.img.src} 
          alt={person.img.alt}
          className="person-card__image"
        />
      </div>

      <div className="person-card__content">
        <div className="person-card__info">
            <h3 className="person-card__name">{person.name}</h3>
            <p className="person-card__position">{person.position}</p>
            <p className="person-card__about">{person.about}</p>
        </div>
        <div className="person-card__social">
          {person.links.linkedin && (
            <a 
              href={person.links.linkedin} 
              className="person-card__social-link person-card__social-link--linkedin"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
          )}
          {person.links.facebook && (
            <a 
              href={person.links.facebook} 
              className="person-card__social-link person-card__social-link--facebook"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
          )}
          {person.links.x && (
            <a 
              href={person.links.x} 
              className="person-card__social-link person-card__social-link--x"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (Twitter)"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
          )}
          {person.links.youtube && (
            <a 
              href={person.links.youtube} 
              className="person-card__social-link person-card__social-link--youtube"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const LeadershipSection = ({ data }) => {
  return (
    <section className="leadership-section">
      <div className="container">
        <div className="leadership-section__header">
          <h2 className="leadership-section__heading">{data.heading}</h2>
          <p className="leadership-section__subtitle">{data.subtitle}</p>
        </div>

        <div className="leadership-section__grid">
          {data.persons.map((person, index) => (
            <PersonCard key={index} person={person} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LeadershipSection;