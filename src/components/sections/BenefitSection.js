// src/components/sections/BenefitSection.js

import React from "react";
import "./BenefitSection.css";

const BenefitSection = ({ data = [] }) => {
  return (
    <section className="benefits">
      <div className="benefits__wrap">
        <h2 className="benefits__heading">Benefits</h2>

        <div className="benefits__grid">
          {data.map((item, idx) => (
            <article key={idx} className="benefits__card">
              <h3 className="benefits__title">{item.title}</h3>
              <p className="benefits__desc">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitSection;
