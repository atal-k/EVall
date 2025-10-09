// ============================================================================
// FILE: src/pages/VanDetail.js
// ============================================================================

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useVan from '../hooks/useVan';
import ImageZoomer from '../components/common/ImageZoomer';
import './VanDetail.css';

const VanDetail = () => {
  const { id } = useParams(); // Get ID from URL
  const { van, loading, error } = useVan(id);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 20px' }}>
        <p>Loading van details...</p>
      </div>
    );
  }

  if (error || !van) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 20px' }}>
        <p style={{ color: 'red' }}>Error: {error || 'Van not found'}</p>
        <button onClick={() => window.history.back()}>Go Back</button>
      </div>
    );
  }
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN').format(price);
  };
  return (
    <div className="van-detail">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="van-detail__breadcrumb">
          <button onClick={() => navigate('/')} className="van-detail__breadcrumb-link">
            Home
          </button>
          <span className="van-detail__breadcrumb-separator">/</span>
          <button onClick={() => navigate('/vans')} className="van-detail__breadcrumb-link">
            Vans
          </button>
          <span className="van-detail__breadcrumb-separator">/</span>
          <span className="van-detail__breadcrumb-current">{van.name}</span>
        </nav>

        

        {/* Main Content */}
        <div className="van-detail__content">
          {/* Gallery */}
          <div className="van-detail__gallery">
            <div className="van-detail__main-image">
              <ImageZoomer
                src={`/images/${van.images?.[selectedImageIndex] || van.images[0]}`}
                alt={`${van.name} - image ${selectedImageIndex + 1}`}
                zoomFactor={2.5}
                selectorSize={140}
              />
            </div>

            {Array.isArray(van.images) && van.images.length > 0 && (
              <div className="van-detail__thumbnails">
                {van.images.slice(0, 8).map((imgName, idx) => (
                  <button
                    key={`${imgName}-${idx}`}
                    className={`van-detail__thumb ${idx === selectedImageIndex ? 'van-detail__thumb--active' : ''}`}
                    onClick={() => setSelectedImageIndex(idx)}
                    onMouseEnter={() => setSelectedImageIndex(idx)}
                    onTouchStart={() => setSelectedImageIndex(idx)}
                    aria-label={`Select image ${idx + 1}`}
                  >
                    <img src={`/images/${imgName}`} alt={`Thumbnail ${idx + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info Panel */}
          <div className="van-detail__info">
            {/* Header */}
        <div className="van-detail__info__header">
          <div className="van-detail__header-content">
            <div>
              <h1 className="van-detail__title">{van.name}</h1>
              <p className="van-detail__tagline">{van.tagline}</p>
            </div>
            <div className="van-detail__header-actions">
              <div className="van-detail__price">
                <span className="van-detail__currency">{van.currency}</span>
                <span className="van-detail__amount">{formatPrice(van.price)}</span>
              </div>
              {/* <button
                className={`van-detail__wishlist-btn ${isWishlisted ? 'van-detail__wishlist-btn--active' : ''}`}
                onClick={handleWishlistToggle}
                aria-label="Add to wishlist"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path 
                    d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    fill={isWishlisted ? 'currentColor' : 'none'}
                  />
                </svg>
              </button> */}
            </div>
          </div>
          
          {/* Status Badge */}
          {/* <div className={`van-detail__badge van-detail__badge--${van.badgeColor}`}>
            {van.badge}
          </div> */}
        </div>
        <div className='van-detail__info__content'>
            {/* Tabs */}
            <div className="van-detail__tabs">
              <button 
                className={`van-detail__tab ${activeTab === 'overview' ? 'van-detail__tab--active' : ''}`}
                onClick={() => setActiveTab('overview')}
              >
                Overview
              </button>
              <button 
                className={`van-detail__tab ${activeTab === 'specs' ? 'van-detail__tab--active' : ''}`}
                onClick={() => setActiveTab('specs')}
              >
                Specifications
              </button>
            </div>

            {/* Tab Content */}
            <div className="van-detail__tab-content">
              {activeTab === 'overview' && (
                <div className="van-detail__overview">
                  <h3 className="van-detail__section-title">Key Features</h3>
                  <ul className="van-detail__features-list">
                    <li className="van-detail__feature-item">
                      <span className="van-detail__feature-label">Category</span>
                      <span className="van-detail__feature-value">
                        {van.category === 'light-duty' && 'Light Duty Truck'}
                        {van.category === 'medium-duty' && 'Medium-Duty Truck'}
                        {van.category === 'heavy-duty' && 'Heavy-Duty Truck'}
                      </span>
                    </li>
                    <li className="van-detail__feature-item">
                      <span className="van-detail__feature-label">Availability</span>
                      <span className="van-detail__feature-value">{van.status === 'available' ? 'In Stock' : 'Pre-Order'}</span>
                    </li>
                    <li className="van-detail__feature-item">
                      <span className="van-detail__feature-label">Charging Type</span>
                      <span className="van-detail__feature-value">
                        {van.chargingType === 'fast' ? 'Fast Charging' : 'Standard Charging'}
                      </span>
                    </li>
                  </ul>

                  <div className="van-detail__quick-specs">
                    <div className="van-detail__quick-spec">
                      <svg className="van-detail__spec-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                      <div>
                        <div className="van-detail__spec-value">{van.specs.range} {van.specs.rangeUnit}</div>
                        <div className="van-detail__spec-label">Range</div>
                      </div>
                    </div>

                    <div className="van-detail__quick-spec">
                      <svg className="van-detail__spec-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <div>
                        <div className="van-detail__spec-value">{van.specs.power} {van.specs.powerUnit}</div>
                        <div className="van-detail__spec-label">Power</div>
                      </div>
                    </div>

                    <div className="van-detail__quick-spec">
                      <svg className="van-detail__spec-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="2" y="7" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2"/>
                        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" stroke="currentColor" strokeWidth="2"/>
                        <line x1="6" y1="11" x2="6" y2="11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        <line x1="10" y1="11" x2="10" y2="11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                      <div>
                        <div className="van-detail__spec-value">{van.specs.batteryCapacity} {van.specs.batteryUnit}</div>
                        <div className="van-detail__spec-label">Battery Capacity</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'specs' && (
                <div className="van-detail__specifications">
                  <h3 className="van-detail__section-title">Technical Specifications</h3>
                  <table className="van-detail__specs-table">
                    <tbody>
                      <tr>
                        <td className="van-detail__specs-label">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2"/>
                          </svg>
                          Range
                        </td>
                        <td className="van-detail__specs-value">{van.specs.range} {van.specs.rangeUnit}</td>
                      </tr>
                      <tr>
                        <td className="van-detail__specs-label">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          Power
                        </td>
                        <td className="van-detail__specs-value">{van.specs.power} {van.specs.powerUnit}</td>
                      </tr>
                      <tr>
                        <td className="van-detail__specs-label">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="2" y="7" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2"/>
                            <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" stroke="currentColor" strokeWidth="2"/>
                          </svg>
                          Battery Capacity
                        </td>
                        <td className="van-detail__specs-value">{van.specs.batteryCapacity} {van.specs.batteryUnit}</td>
                      </tr>
                      <tr>
                        <td className="van-detail__specs-label">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="1" y="3" width="15" height="13" stroke="currentColor" strokeWidth="2"/>
                            <path d="M16 8h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2" stroke="currentColor" strokeWidth="2"/>
                          </svg>
                          Payload Capacity
                        </td>
                        <td className="van-detail__specs-value">{van.specs.payload} tons</td>
                      </tr>
                      <tr>
                        <td className="van-detail__specs-label">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                            <polyline points="12 6 12 12 16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                          </svg>
                          Charging Type
                        </td>
                        <td className="van-detail__specs-value">
                          {van.chargingType === 'fast' ? 'Fast Charging' : 'Standard Charging'}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="van-detail__actions">
              <button className="btn btn--primary">Schedule Test Drive</button>
              <button className="btn btn--secondary">Get Quote</button>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VanDetail;