const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const COCOMOEstimator = require('./models/cocomo');
const FPAEstimator = require('./models/fpa');
const TechnologyRecommender = require('./models/technology');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Initialize estimators
const cocomoEstimator = new COCOMOEstimator();
const fpaEstimator = new FPAEstimator();
const techRecommender = new TechnologyRecommender();

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Manpower Analysis API is running' });
});

/**
 * Main estimation endpoint
 * Combines COCOMO, FPA, and technology recommendations
 */
app.post('/api/estimate', (req, res) => {
  try {
    const projectParams = req.body;

    // Validate required parameters
    const requiredFields = ['projectName', 'domain', 'projectType', 'complexity', 'expectedUsers'];
    const missingFields = requiredFields.filter(field => !projectParams[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({
        error: 'Missing required fields',
        missingFields
      });
    }

    // Step 1: FPA Estimation
    const fpaResults = fpaEstimator.estimate({
      projectType: projectParams.projectType,
      features: projectParams.features || 20,
      apiEndpoints: projectParams.apiEndpoints || 15,
      databaseTables: projectParams.databaseTables || 10,
      externalIntegrations: projectParams.externalIntegrations || 3,
      complexity: projectParams.complexity,
      primaryLanguage: projectParams.primaryLanguage || 'javascript'
    });

    // Step 2: COCOMO Estimation
    const developmentMode = determineDevelopmentMode(
      projectParams.complexity,
      projectParams.domain,
      projectParams.expectedUsers
    );

    const cocomoResults = cocomoEstimator.estimate({
      kloc: fpaResults.estimatedKLOC,
      mode: developmentMode,
      complexity: projectParams.complexity
    });

    // Step 3: Technology Recommendations
    const techRecommendations = techRecommender.recommendStack({
      projectType: projectParams.projectType,
      domain: projectParams.domain,
      expectedUsers: projectParams.expectedUsers,
      complexity: projectParams.complexity,
      teamExpertise: projectParams.teamExpertise || 'medium',
      budget: projectParams.budget || 'medium',
      timeline: projectParams.timeline || 'medium'
    });

    // Combine all results
    const completeEstimation = {
      projectInfo: {
        name: projectParams.projectName,
        domain: projectParams.domain,
        type: projectParams.projectType,
        complexity: projectParams.complexity,
        expectedUsers: projectParams.expectedUsers,
        developmentMode
      },
      sizeEstimation: {
        functionPoints: fpaResults.functionPoints,
        estimatedLOC: fpaResults.estimatedLOC,
        estimatedKLOC: fpaResults.estimatedKLOC
      },
      effortEstimation: {
        effort: cocomoResults.effort,
        duration: cocomoResults.duration,
        teamSize: cocomoResults.teamSize
      },
      costEstimation: {
        totalCost: cocomoResults.totalCost,
        costPerPersonMonth: cocomoResults.costPerPersonMonth,
        monthlyCost: Math.round(cocomoResults.totalCost / cocomoResults.duration)
      },
      manpowerDistribution: cocomoResults.manpowerDistribution,
      technologyStack: techRecommendations.recommendations,
      recommendations: techRecommendations.reasoning,
      timestamp: new Date().toISOString()
    };

    res.json(completeEstimation);

  } catch (error) {
    console.error('Estimation error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
});

/**
 * COCOMO-only estimation endpoint
 */
app.post('/api/estimate/cocomo', (req, res) => {
  try {
    const { kloc, mode, complexity } = req.body;

    if (!kloc || !mode || !complexity) {
      return res.status(400).json({
        error: 'Missing required parameters: kloc, mode, complexity'
      });
    }

    const results = cocomoEstimator.estimate({ kloc, mode, complexity });
    res.json(results);

  } catch (error) {
    console.error('COCOMO estimation error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
});

/**
 * FPA-only estimation endpoint
 */
app.post('/api/estimate/fpa', (req, res) => {
  try {
    const params = req.body;
    const results = fpaEstimator.estimate(params);
    res.json(results);

  } catch (error) {
    console.error('FPA estimation error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
});

/**
 * Technology recommendation endpoint
 */
app.post('/api/recommend/technology', (req, res) => {
  try {
    const params = req.body;
    const recommendations = techRecommender.recommendStack(params);
    res.json(recommendations);

  } catch (error) {
    console.error('Technology recommendation error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
});

/**
 * Get available options for dropdowns
 */
app.get('/api/options', (req, res) => {
  res.json({
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
    projectTypes: [
      'Web',
      'Mobile',
      'Desktop',
      'Hybrid',
      'API/Microservices'
    ],
    complexityLevels: [
      { value: 'veryLow', label: 'Very Low' },
      { value: 'low', label: 'Low' },
      { value: 'nominal', label: 'Nominal' },
      { value: 'high', label: 'High' },
      { value: 'veryHigh', label: 'Very High' }
    ],
    developmentModes: [
      { value: 'organic', label: 'Organic (Small, experienced team)' },
      { value: 'semiDetached', label: 'Semi-Detached (Medium complexity)' },
      { value: 'embedded', label: 'Embedded (Complex, critical systems)' }
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
});

// Helper function to determine development mode
function determineDevelopmentMode(complexity, domain, expectedUsers) {
  // Embedded mode for critical, complex systems
  if (
    complexity === 'veryHigh' || 
    domain === 'fintech' || 
    domain === 'banking' || 
    domain === 'healthcare' ||
    expectedUsers > 500000
  ) {
    return 'embedded';
  }
  
  // Semi-detached for medium complexity
  if (
    complexity === 'high' || 
    complexity === 'nominal' ||
    expectedUsers > 50000
  ) {
    return 'semiDetached';
  }
  
  // Organic for simple projects
  return 'organic';
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    message: err.message
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Manpower Analysis API Server running on port ${PORT}`);
  console.log(`📊 COCOMO and FPA estimation models loaded`);
  console.log(`🛠️  Technology recommendation engine initialized`);
});

module.exports = app;
