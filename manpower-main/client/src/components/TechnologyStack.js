import React from 'react';

const TechnologyStack = ({ stack, recommendations }) => {
  const renderTechSection = (title, icon, content) => {
    if (!content) return null;

    return (
      <div className="tech-section">
        <h3>{icon} {title}</h3>
        <div className="tech-content">
          {typeof content === 'object' && content.primary && (
            <>
              <h4>Recommended: {content.primary}</h4>
              {content.styling && <p><strong>Styling:</strong> {content.styling}</p>}
              {content.language && <p><strong>Language:</strong> {content.language}</p>}
              {content.cache && <p><strong>Cache Layer:</strong> {content.cache}</p>}
              {content.search && <p><strong>Search Engine:</strong> {content.search}</p>}
              {content.containerization && <p><strong>Containerization:</strong> {content.containerization}</p>}
              {content.ci_cd && <p><strong>CI/CD:</strong> {content.ci_cd}</p>}
              {content.platform && <p><strong>Platform:</strong> {content.platform}</p>}
              
              {content.alternatives && content.alternatives.length > 0 && (
                <div style={{ marginTop: '10px' }}>
                  <strong>Alternatives:</strong>
                  <div className="tech-tags">
                    {content.alternatives.map((alt, idx) => (
                      <span key={idx} className="tech-tag alternative">{alt}</span>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
          
          {typeof content === 'string' && <p>{content}</p>}
          
          {Array.isArray(content) && (
            <div>
              {content.map((item, idx) => (
                <div key={idx} style={{ marginBottom: '15px' }}>
                  <h4>{item.category}</h4>
                  <div className="tech-tags">
                    {item.tools.map((tool, toolIdx) => (
                      <span key={toolIdx} className="tech-tag">{tool}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="card">
      <h2 className="card-title">🛠️ Recommended Technology Stack</h2>
      
      {renderTechSection('Frontend Technologies', '🎨', stack.frontend)}
      {renderTechSection('Backend Technologies', '⚙️', stack.backend)}
      {renderTechSection('Database & Storage', '💾', stack.database)}
      {renderTechSection('Cloud & DevOps', '☁️', stack.cloud)}
      {renderTechSection('Additional Tools & Services', '🔧', stack.additional)}

      <div style={{ marginTop: '30px' }}>
        <h3 style={{ color: '#667eea', marginBottom: '15px' }}>💡 Recommendations & Reasoning</h3>
        <ul className="recommendation-list">
          {recommendations.map((rec, idx) => (
            <li key={idx} className="recommendation-item">
              <strong>{rec.category}:</strong>
              <p>{rec.reason}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="info-box" style={{ marginTop: '20px' }}>
        <p>
          <strong>Technology Selection Criteria:</strong> Recommendations are based on project 
          domain, expected user load, complexity, team expertise, and industry best practices. 
          Consider your team's existing skills and infrastructure when making final decisions.
        </p>
      </div>
    </div>
  );
};

export default TechnologyStack;
