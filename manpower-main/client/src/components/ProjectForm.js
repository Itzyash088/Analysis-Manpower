import React, { useState, useEffect } from 'react';

const ProjectForm = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    projectName: '',
    domain: '',
    projectType: '',
    complexity: 'nominal',
    expectedUsers: 10000,
    features: 20,
    apiEndpoints: 15,
    databaseTables: 10,
    externalIntegrations: 3,
    primaryLanguage: 'javascript',
    teamExpertise: 'medium',
    budget: 'medium',
    timeline: 'medium'
  });

  const [options, setOptions] = useState({
    domains: [
      'Web Application',
      'Mobile Application',
      'E-commerce',
      'Social Media',
      'Enterprise Software',
      'Fintech/Banking',
      'Healthcare',
      'Education',
      'Real-time/Chat',
      'Analytics/BI',
      'ML/AI',
      'IoT',
      'Gaming',
      'CMS'
    ],
    projectTypes: ['Web', 'Mobile', 'Desktop', 'Hybrid', 'API/Microservices'],
    complexityLevels: [
      { value: 'veryLow', label: 'Very Low' },
      { value: 'low', label: 'Low' },
      { value: 'nominal', label: 'Nominal' },
      { value: 'high', label: 'High' },
      { value: 'veryHigh', label: 'Very High' }
    ],
    languages: [
      'JavaScript',
      'TypeScript',
      'Python',
      'Java',
      'C#',
      'PHP',
      'Ruby',
      'Go',
      'Swift',
      'Kotlin'
    ]
  });

  useEffect(() => {
    // Fetch options from API (will override defaults if available)
    fetch('/api/options')
      .then(res => {
        if (!res.ok) throw new Error('API not available');
        return res.json();
      })
      .then(data => setOptions(data))
      .catch(err => {
        console.log('Using default options (API not available):', err.message);
        // Keep using default options
      });
  }, []);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value) || 0 : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="projectName">Project Name *</label>
          <input
            type="text"
            id="projectName"
            name="projectName"
            value={formData.projectName}
            onChange={handleChange}
            required
            placeholder="e.g., E-commerce Platform"
          />
        </div>

        <div className="form-group">
          <label htmlFor="domain">Domain *</label>
          <select
            id="domain"
            name="domain"
            value={formData.domain}
            onChange={handleChange}
            required
          >
            <option value="">Select Domain</option>
            {options.domains.map(domain => (
              <option key={domain} value={domain.toLowerCase().replace(/\s+/g, '')}>{domain}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="projectType">Project Type *</label>
          <select
            id="projectType"
            name="projectType"
            value={formData.projectType}
            onChange={handleChange}
            required
          >
            <option value="">Select Type</option>
            {options.projectTypes.map(type => (
              <option key={type} value={type.toLowerCase()}>{type}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="complexity">Project Complexity *</label>
          <select
            id="complexity"
            name="complexity"
            value={formData.complexity}
            onChange={handleChange}
            required
          >
            {options.complexityLevels.map(level => (
              <option key={level.value} value={level.value}>{level.label}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="expectedUsers">Expected Users *</label>
          <input
            type="number"
            id="expectedUsers"
            name="expectedUsers"
            value={formData.expectedUsers}
            onChange={handleChange}
            required
            min="100"
            step="1000"
          />
          <small>Number of concurrent/active users</small>
        </div>

        <div className="form-group">
          <label htmlFor="features">Number of Features</label>
          <input
            type="number"
            id="features"
            name="features"
            value={formData.features}
            onChange={handleChange}
            min="1"
          />
          <small>Major functional features</small>
        </div>

        <div className="form-group">
          <label htmlFor="apiEndpoints">API Endpoints</label>
          <input
            type="number"
            id="apiEndpoints"
            name="apiEndpoints"
            value={formData.apiEndpoints}
            onChange={handleChange}
            min="1"
          />
          <small>Estimated API routes</small>
        </div>

        <div className="form-group">
          <label htmlFor="databaseTables">Database Tables</label>
          <input
            type="number"
            id="databaseTables"
            name="databaseTables"
            value={formData.databaseTables}
            onChange={handleChange}
            min="1"
          />
          <small>Number of data models</small>
        </div>

        <div className="form-group">
          <label htmlFor="externalIntegrations">External Integrations</label>
          <input
            type="number"
            id="externalIntegrations"
            name="externalIntegrations"
            value={formData.externalIntegrations}
            onChange={handleChange}
            min="0"
          />
          <small>Third-party APIs/services</small>
        </div>

        <div className="form-group">
          <label htmlFor="primaryLanguage">Primary Language</label>
          <select
            id="primaryLanguage"
            name="primaryLanguage"
            value={formData.primaryLanguage}
            onChange={handleChange}
          >
            {options.languages.map(lang => (
              <option key={lang} value={lang.toLowerCase()}>{lang}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="teamExpertise">Team Expertise Level</label>
          <select
            id="teamExpertise"
            name="teamExpertise"
            value={formData.teamExpertise}
            onChange={handleChange}
          >
            <option value="low">Low (Junior developers)</option>
            <option value="medium">Medium (Mixed experience)</option>
            <option value="high">High (Senior developers)</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="budget">Budget Constraint</label>
          <select
            id="budget"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
          >
            <option value="low">Low (Cost-conscious)</option>
            <option value="medium">Medium (Balanced)</option>
            <option value="high">High (Premium solutions)</option>
          </select>
        </div>
      </div>

      <button 
        type="submit" 
        className="btn btn-primary" 
        disabled={loading}
      >
        {loading ? '⏳ Analyzing...' : '🔍 Analyze Project'}
      </button>
    </form>
  );
};

export default ProjectForm;
