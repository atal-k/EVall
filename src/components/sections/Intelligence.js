// ============================================================================
// FILE: src/components/sections/Intelligence.js
// ============================================================================

import React, { useState } from 'react';
import Logo from '../common/Logo';
import './Intelligence.css';

const Intelligence = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const tabs = [
    {
      id: 'dashboard',
      label: 'Smart Dashboard',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="3.5em" height="3.5em" viewBox="0 0 24 24">
          <path fill="currentColor" d="M12 16c1.66 0 3-1.34 3-3c0-1.12-.61-2.1-1.5-2.61L3.79 4.77l5.53 9.58c.5.98 1.51 1.65 2.68 1.65m0-13c-1.81 0-3.5.5-4.97 1.32l2.1 1.21C10 5.19 11 5 12 5c4.42 0 8 3.58 8 8c0 2.21-.89 4.21-2.34 5.65h-.01a.996.996 0 0 0 0 1.41c.39.39 1.03.39 1.42.01A9.97 9.97 0 0 0 22 13c0-5.5-4.5-10-10-10M2 13c0 2.76 1.12 5.26 2.93 7.07c.39.38 1.02.38 1.41-.01a.996.996 0 0 0 0-1.41A7.95 7.95 0 0 1 4 13c0-1 .19-2 .54-2.9L3.33 8C2.5 9.5 2 11.18 2 13" />
        </svg>
      ),
      iconColor: '#ff00cc',
      image: '/images/intelligence-tab1.webp',
      content: [
        'The smart dashboard provides real-time insights on battery, range, and energy consumption for efficient driving.',
        'It tracks vehicle health, predictive maintenance, and safety alerts to ensure uptime and safety.',
      ],
      position: 'top-left'
    },
    {
      id: 'connectivity',
      label: 'Connectivity',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="3.5em" height="3.5em" viewBox="0 0 20 20">
          <g fill="currentColor">
            <path d="M13.696 11.282a1 1 0 1 1-1.392 1.436a2 2 0 0 0-.102-.09a2.4 2.4 0 0 0-.623-.348c-.453-.18-1-.28-1.579-.28c-.914 0-1.733.251-2.202.629q-.056.044-.102.089a1 1 0 1 1-1.392-1.436q.114-.11.24-.212C7.395 10.387 8.656 10 10 10c.827 0 1.624.146 2.316.42c.43.17.815.389 1.14.65q.126.102.24.212" />
            <path d="M16.213 8.689a1 1 0 1 1-1.426 1.402a4 4 0 0 0-.312-.285a5.4 5.4 0 0 0-.767-.521a6 6 0 0 0-.932-.425a7 7 0 0 0-1.057-.298a8 8 0 0 0-1.137-.153a9 9 0 0 0-1.74.058a8 8 0 0 0-1.102.227a7 7 0 0 0-1 .364a6 6 0 0 0-.854.477a5 5 0 0 0-.361.27a4 4 0 0 0-.312.286A1 1 0 1 1 3.787 8.69q.218-.22.462-.424q.243-.201.512-.384a7.5 7.5 0 0 1 1.15-.643a9 9 0 0 1 1.286-.469a10 10 0 0 1 1.379-.284A10.5 10.5 0 0 1 10 6.39a11 11 0 0 1 1.424.095a10 10 0 0 1 1.38.284a9 9 0 0 1 1.285.469a8 8 0 0 1 1.15.643q.27.183.512.384q.244.204.462.424" />
            <path d="M18.245 6.222a1 1 0 0 1-1.49 1.333a6 6 0 0 0-.456-.459a7 7 0 0 0-.52-.43a8.4 8.4 0 0 0-1.215-.747a9 9 0 0 0-1.408-.563a10 10 0 0 0-1.542-.35A11 11 0 0 0 10 4.89a11 11 0 0 0-1.614.117a10.5 10.5 0 0 0-1.542.35a9.6 9.6 0 0 0-1.407.564a8 8 0 0 0-.635.353a8 8 0 0 0-.58.393a7 7 0 0 0-.52.43a6 6 0 0 0-.457.46a1 1 0 0 1-1.49-1.334q.28-.314.6-.604q.316-.29.668-.553q.351-.262.732-.496a10.4 10.4 0 0 1 1.62-.813a11.6 11.6 0 0 1 1.785-.554a12.5 12.5 0 0 1 1.883-.279a13.2 13.2 0 0 1 2.864.105a12.5 12.5 0 0 1 1.842.418a11.6 11.6 0 0 1 1.71.686a10.4 10.4 0 0 1 1.518.933q.351.264.669.553t.6.604M12 15.25a2 2 0 1 1-4 0a2 2 0 0 1 4 0" />
          </g>
        </svg>
      ),
      iconColor: '#405FF2',
      image: '/images/intelligence-tab2.webp',
      content: [
        'Connectivity transforms EV commercial vehicles into smart, data-driven machines, allowing real-time monitoring, efficient fleet management, predictive maintenance, and seamless interaction with infrastructure and devices.'
      ],
      position: 'bottom-center'
    },
    {
      id: 'braking',
      label: 'Regenerative Braking',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="3.5em" height="3.5em" viewBox="0 0 48 48">
          <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4">
            <path d="M24 40c8.837 0 16-7.163 16-16S32.837 8 24 8S8 15.163 8 24s7.163 16 16 16" />
            <path fill="currentColor" d="M24 28a4 4 0 1 0 0-8a4 4 0 0 0 0 8m0-24a20 20 0 0 1 20 20h-7.994A12.006 12.006 0 0 0 24 11.994z" />
          </g>
        </svg>
      ),
      iconColor: '#C0C0C0',
      image: '/images/intelligence-tab3.webp',
      content: [
        'Regenerative braking is a technology in electric vehicles (EVs) that recovers kinetic energy during deceleration and converts it into electrical energy to recharge the battery'
      ],
      position: 'bottom-left'
    },
    {
      id: 'ai',
      label: 'AI assisted driving',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="3.5em" height="3.5em" viewBox="0 0 24 24">
          <path fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.2" d="M15 19c1.2-3.678 2.526-5.005 6-6c-3.474-.995-4.8-2.322-6-6c-1.2 3.678-2.526 5.005-6 6c3.474.995 4.8 2.322 6 6Zm-8-9c.6-1.84 1.263-2.503 3-3c-1.737-.497-2.4-1.16-3-3c-.6 1.84-1.263 2.503-3 3c1.737.497 2.4 1.16 3 3Zm1.5 10c.3-.92.631-1.251 1.5-1.5c-.869-.249-1.2-.58-1.5-1.5c-.3.92-.631 1.251-1.5 1.5c.869.249 1.2.58 1.5 1.5Z" />
        </svg>
      ),
      iconColor: '#75E890',
      image: '/images/intelligence-tab4.webp',
      content: [
        'AI-assisted driving uses artificial intelligence and machine learning algorithms to help drivers operate vehicles more safely and efficiently. It combines sensor data, cameras, radar, and GPS to analyze road conditions, detect obstacles, and assist with driving tasks.'
      ],
      position: 'bottom-right'
    }
  ];

  const activeTabData = tabs.find(tab => tab.id === activeTab);

  return (
    <section className="intelligence-section">
      <div className="container">
        {/* Header */}
        <h2 className="intelligence-section__title">Vehicle Intelligence</h2>

        {/* Main Container (MacBook-style Frame) */}
        <div className="intelligence-container">
          <div className="intelligence-container__frame">
            <div className="intelligence-container__screen">
              {/* Top Bar with Logo */}
              <div className="intelligence-topbar">
                <Logo size="medium" />
              </div>

              {/* Content Area */}
              <div className="intelligence-content">
                {/* Left Sidebar - Tabs */}
                <div className="intelligence-tabs">
                  {tabs.map((tab, index) => (
                    <React.Fragment key={tab.id}>
                      <button
                        className={`intelligence-tab ${activeTab === tab.id ? 'intelligence-tab--active' : ''}`}
                        onClick={() => setActiveTab(tab.id)}
                        style={{
                          '--tab-icon-color': tab.iconColor
                        }}
                      >
                        <span className="intelligence-tab__icon">
                          {tab.icon}
                        </span>
                        <span className="intelligence-tab__label">{tab.label}</span>
                      </button>
                      {index < tabs.length - 1 && (
                        <div className="intelligence-tab__divider"></div>
                      )}
                    </React.Fragment>
                  ))}
                </div>

                {/* Main Display Area */}
                <div className="intelligence-display">
                  {/* Background Image */}
                  <div
                    className="intelligence-display__image"
                    style={{ backgroundImage: `url(${activeTabData.image})` }}
                    key={activeTab}
                  ></div>

                  {/* Glassmorphic Content Card */}
                  <div
                    className={`intelligence-glass-card intelligence-glass-card--${activeTabData.position}`}
                    key={`${activeTab}-card`}
                  >
                    {Array.isArray(activeTabData.content) ? (
                      <ul className="intelligence-glass-card__list">
                        {activeTabData.content.map((text, idx) => (
                          <li key={idx}>{text}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="intelligence-glass-card__text">
                        {activeTabData.content}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Intelligence;