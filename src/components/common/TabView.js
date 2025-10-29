// src/components/common/TabView.js
import React, { useState } from 'react';
import './TabView.css';

const TabView = ({ data }) => {
  const [activeTab, setActiveTab] = useState(data[0]?.id || 1);

  const activeContent = data.find(item => item.id === activeTab);

  return (
    <section className="tab-view">
      <div className="container">
        {/* Tab Navigation */}
        <div className="tab-view__nav">
          {data.map(tab => (
            <button
              key={tab.id}
              className={`tab-view__tab ${activeTab === tab.id ? 'tab-view__tab--active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.tabName}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeContent && (
          <div key={activeContent.id} className="tab-view__content">
            <div className="tab-view__image-wrapper">
              <img 
                src={activeContent.img.src} 
                alt={activeContent.img.alt}
                className="tab-view__image"
              />
            </div>

            <div className="tab-view__text">
              <h2 className="tab-view__title">{activeContent.title}</h2>
              
              {activeContent.paragraphs.map((paragraph, index) => (
                <p key={index} className="tab-view__paragraph">
                  {paragraph}
                </p>
              ))}

              {activeContent.bullets.length > 0 && (
                <ul className="tab-view__bullets">
                  {activeContent.bullets.map((bullet, index) => (
                    <li key={index} className="tab-view__bullet-item">
                      {typeof bullet === 'string' ? (
                        bullet
                      ) : (
                        <>
                          <strong className="tab-view__bullet-title">{bullet.title}:</strong>{' '}
                          {bullet.text}
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default TabView;