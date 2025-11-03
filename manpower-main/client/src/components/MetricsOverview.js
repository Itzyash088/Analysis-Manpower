import React from 'react';

const MetricsOverview = ({ data }) => {
  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const formatCurrency = (num) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);
  };

  return (
    <div className="results-grid">
      <div className="metric-card">
        <h3>📏 Project Size</h3>
        <div className="value">{formatNumber(data.sizeEstimation.estimatedKLOC)}</div>
        <div className="unit">KLOC (Thousands of Lines)</div>
        <div style={{ marginTop: '10px', fontSize: '0.9rem' }}>
          {formatNumber(data.sizeEstimation.functionPoints)} Function Points
        </div>
      </div>

      <div className="metric-card">
        <h3>💼 Effort Required</h3>
        <div className="value">{data.effortEstimation.effort}</div>
        <div className="unit">Person-Months</div>
        <div style={{ marginTop: '10px', fontSize: '0.9rem' }}>
          Total work effort needed
        </div>
      </div>

      <div className="metric-card">
        <h3>⏱️ Duration</h3>
        <div className="value">{data.effortEstimation.duration}</div>
        <div className="unit">Months</div>
        <div style={{ marginTop: '10px', fontSize: '0.9rem' }}>
          Estimated project timeline
        </div>
      </div>

      <div className="metric-card">
        <h3>👥 Team Size</h3>
        <div className="value">{data.effortEstimation.teamSize}</div>
        <div className="unit">People</div>
        <div style={{ marginTop: '10px', fontSize: '0.9rem' }}>
          Average team members
        </div>
      </div>

      <div className="metric-card">
        <h3>💰 Total Cost</h3>
        <div className="value" style={{ fontSize: '2rem' }}>
          {formatCurrency(data.costEstimation.totalCost)}
        </div>
        <div className="unit">USD</div>
        <div style={{ marginTop: '10px', fontSize: '0.9rem' }}>
          Estimated project budget
        </div>
      </div>

      <div className="metric-card">
        <h3>📅 Monthly Cost</h3>
        <div className="value" style={{ fontSize: '2rem' }}>
          {formatCurrency(data.costEstimation.monthlyCost)}
        </div>
        <div className="unit">USD/Month</div>
        <div style={{ marginTop: '10px', fontSize: '0.9rem' }}>
          Average monthly spend
        </div>
      </div>
    </div>
  );
};

export default MetricsOverview;
