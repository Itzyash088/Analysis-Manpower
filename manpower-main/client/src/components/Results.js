import React from 'react';
import MetricsOverview from './MetricsOverview';
import ManpowerDistribution from './ManpowerDistribution';
import TechnologyStack from './TechnologyStack';
import CostBreakdown from './CostBreakdown';

const Results = ({ data }) => {
  return (
    <div>
      <div className="card">
        <h2 className="card-title">📊 Estimation Results for: {data.projectInfo.name}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginBottom: '20px' }}>
          <div style={{ background: '#f0f5ff', padding: '15px', borderRadius: '8px' }}>
            <strong>Domain:</strong> {data.projectInfo.domain}
          </div>
          <div style={{ background: '#f0f5ff', padding: '15px', borderRadius: '8px' }}>
            <strong>Type:</strong> {data.projectInfo.type}
          </div>
          <div style={{ background: '#f0f5ff', padding: '15px', borderRadius: '8px' }}>
            <strong>Complexity:</strong> {data.projectInfo.complexity}
          </div>
          <div style={{ background: '#f0f5ff', padding: '15px', borderRadius: '8px' }}>
            <strong>Development Mode:</strong> {data.projectInfo.developmentMode}
          </div>
        </div>
      </div>

      <MetricsOverview data={data} />
      
      <ManpowerDistribution 
        distribution={data.manpowerDistribution} 
        teamSize={data.effortEstimation.teamSize}
      />
      
      <CostBreakdown data={data} />
      
      <TechnologyStack 
        stack={data.technologyStack}
        recommendations={data.recommendations}
      />
    </div>
  );
};

export default Results;
