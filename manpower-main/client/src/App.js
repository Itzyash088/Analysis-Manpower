import React, { useState } from 'react';
import ProjectForm from './components/ProjectForm';
import Results from './components/Results';
import './index.css';

function App() {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleEstimate = async (projectData) => {
    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const response = await fetch('https://analysis-manpower.vercel.app/api/estimate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to get estimation');
      }

      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError(err.message || 'An error occurred while processing your request. Please check if the backend server is running.');
      console.error('Estimation error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResults(null);
    setError(null);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>🚀 Manpower & Technology Analysis System</h1>
        <p>
          Evidence-based decision support for software project planning using COCOMO, 
          Function Point Analysis, and intelligent technology recommendations
        </p>
      </header>

      <div className="results-container">
        {error && (
          <div className="error-message">
            <strong>Error:</strong> {error}
          </div>
        )}

        {!results && (
          <div className="card">
            <h2 className="card-title">Project Requirements</h2>
            <div className="info-box">
              <p>
                <strong>About this system:</strong> This tool analyzes your software project 
                requirements and provides scientific estimations for manpower, timeline, and 
                costs using industry-standard models (COCOMO II & FPA). It also recommends 
                the optimal technology stack based on your specific needs.
              </p>
            </div>
            <ProjectForm onSubmit={handleEstimate} loading={loading} />
          </div>
        )}

        {loading && (
          <div className="card">
            <div className="loading">
              <div className="spinner"></div>
              <p>Analyzing project requirements and generating recommendations...</p>
            </div>
          </div>
        )}

        {results && !loading && (
          <>
            <Results data={results} />
            <div style={{ textAlign: 'center', marginTop: '30px' }}>
              <button className="btn btn-primary" onClick={handleReset}>
                📊 Analyze Another Project
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
