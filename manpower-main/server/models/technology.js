/**
 * Technology Stack Recommendation Engine
 * Provides technology recommendations based on project requirements
 */

class TechnologyRecommender {
  constructor() {
    this.technologyDatabase = this.initializeTechnologyDatabase();
  }

  initializeTechnologyDatabase() {
    return {
      // Frontend Technologies
      frontend: {
        web: {
          frameworks: [
            { name: 'React', use: ['spa', 'dashboard', 'social', 'ecommerce'], complexity: 'medium', learning: 'medium', ecosystem: 'large' },
            { name: 'Vue.js', use: ['spa', 'dashboard', 'cms'], complexity: 'low', learning: 'easy', ecosystem: 'medium' },
            { name: 'Angular', use: ['enterprise', 'dashboard', 'complex'], complexity: 'high', learning: 'hard', ecosystem: 'large' },
            { name: 'Next.js', use: ['ssr', 'seo', 'ecommerce', 'blog'], complexity: 'medium', learning: 'medium', ecosystem: 'large' },
            { name: 'Svelte', use: ['spa', 'performance'], complexity: 'low', learning: 'easy', ecosystem: 'small' }
          ],
          styling: [
            { name: 'Tailwind CSS', use: ['rapid', 'utility'], type: 'utility' },
            { name: 'Material-UI', use: ['dashboard', 'enterprise'], type: 'component' },
            { name: 'Bootstrap', use: ['rapid', 'responsive'], type: 'framework' },
            { name: 'Styled Components', use: ['react', 'dynamic'], type: 'css-in-js' }
          ]
        },
        mobile: {
          frameworks: [
            { name: 'React Native', use: ['crossplatform', 'hybrid'], type: 'hybrid' },
            { name: 'Flutter', use: ['crossplatform', 'performance'], type: 'hybrid' },
            { name: 'Swift', use: ['ios', 'native'], type: 'native' },
            { name: 'Kotlin', use: ['android', 'native'], type: 'native' }
          ]
        }
      },

      // Backend Technologies
      backend: {
        frameworks: [
          { name: 'Node.js + Express', use: ['api', 'realtime', 'microservices'], language: 'javascript', async: true, performance: 'high' },
          { name: 'Django', use: ['rapid', 'admin', 'monolithic'], language: 'python', batteries: true, performance: 'medium' },
          { name: 'FastAPI', use: ['api', 'ml', 'async'], language: 'python', async: true, performance: 'high' },
          { name: 'Spring Boot', use: ['enterprise', 'microservices', 'banking'], language: 'java', enterprise: true, performance: 'high' },
          { name: 'ASP.NET Core', use: ['enterprise', 'microsoft'], language: 'csharp', enterprise: true, performance: 'high' },
          { name: 'Ruby on Rails', use: ['rapid', 'startup', 'mvp'], language: 'ruby', rapid: true, performance: 'medium' },
          { name: 'Go', use: ['microservices', 'performance', 'cloud'], language: 'go', performance: 'very-high', concurrent: true }
        ]
      },

      // Databases
      databases: {
        relational: [
          { name: 'PostgreSQL', use: ['complex', 'acid', 'geospatial'], type: 'sql', scale: 'medium-large', features: 'advanced' },
          { name: 'MySQL', use: ['web', 'simple', 'read-heavy'], type: 'sql', scale: 'medium', features: 'standard' },
          { name: 'SQLite', use: ['small', 'embedded', 'mobile'], type: 'sql', scale: 'small', features: 'basic' }
        ],
        nosql: [
          { name: 'MongoDB', use: ['flexible', 'document', 'rapid'], type: 'document', scale: 'medium-large', schemaless: true },
          { name: 'Redis', use: ['cache', 'session', 'realtime'], type: 'key-value', scale: 'any', inmemory: true },
          { name: 'Cassandra', use: ['bigdata', 'timeseries', 'distributed'], type: 'wide-column', scale: 'large', distributed: true },
          { name: 'Elasticsearch', use: ['search', 'analytics', 'logs'], type: 'search', scale: 'large', fulltext: true }
        ]
      },

      // Cloud & DevOps
      cloud: {
        platforms: [
          { name: 'AWS', use: ['enterprise', 'scalable', 'comprehensive'], ecosystem: 'largest' },
          { name: 'Google Cloud', use: ['ml', 'kubernetes', 'bigdata'], ecosystem: 'large' },
          { name: 'Azure', use: ['microsoft', 'enterprise', 'hybrid'], ecosystem: 'large' },
          { name: 'DigitalOcean', use: ['startup', 'simple', 'cost'], ecosystem: 'medium' },
          { name: 'Heroku', use: ['rapid', 'prototype', 'simple'], ecosystem: 'small' }
        ],
        containers: [
          { name: 'Docker', use: ['containerization', 'consistency'] },
          { name: 'Kubernetes', use: ['orchestration', 'scaling', 'enterprise'] }
        ],
        ci_cd: [
          { name: 'GitHub Actions', use: ['github', 'simple', 'integrated'] },
          { name: 'Jenkins', use: ['enterprise', 'flexible', 'plugins'] },
          { name: 'GitLab CI', use: ['gitlab', 'integrated', 'comprehensive'] }
        ]
      }
    };
  }

  /**
   * Recommend technology stack based on project requirements
   * @param {object} params - Project parameters
   * @returns {object} Recommended technology stack
   */
  recommendStack(params) {
    const {
      projectType,
      domain,
      expectedUsers,
      complexity,
      teamExpertise,
      budget,
      timeline
    } = params;

    const recommendations = {
      frontend: this.recommendFrontend(projectType, domain, complexity),
      backend: this.recommendBackend(projectType, domain, expectedUsers, complexity, teamExpertise),
      database: this.recommendDatabase(projectType, domain, expectedUsers, complexity),
      cloud: this.recommendCloud(expectedUsers, budget, complexity),
      additional: this.recommendAdditional(projectType, domain, expectedUsers)
    };

    return {
      recommendations,
      reasoning: this.generateReasoning(recommendations, params)
    };
  }

  recommendFrontend(projectType, domain, complexity) {
    const recommendations = {
      primary: null,
      styling: null,
      alternatives: []
    };

    // Primary framework recommendation
    if (projectType === 'web') {
      if (domain === 'ecommerce' || domain === 'blog') {
        recommendations.primary = 'Next.js (React with SSR)';
        recommendations.alternatives = ['React', 'Vue.js'];
      } else if (complexity === 'high' || complexity === 'veryHigh') {
        recommendations.primary = 'React';
        recommendations.alternatives = ['Angular', 'Vue.js'];
      } else {
        recommendations.primary = 'React';
        recommendations.alternatives = ['Vue.js', 'Svelte'];
      }
      
      // Styling recommendation
      if (complexity === 'low' || complexity === 'nominal') {
        recommendations.styling = 'Tailwind CSS';
      } else {
        recommendations.styling = 'Material-UI or Tailwind CSS';
      }
    } else if (projectType === 'mobile') {
      recommendations.primary = 'React Native';
      recommendations.alternatives = ['Flutter'];
    } else if (projectType === 'hybrid') {
      recommendations.primary = 'React Native or Flutter';
      recommendations.alternatives = ['Ionic'];
    }

    return recommendations;
  }

  recommendBackend(projectType, domain, expectedUsers, complexity, teamExpertise) {
    const recommendations = {
      primary: null,
      alternatives: [],
      language: null
    };

    // High performance / high scale requirements
    if (expectedUsers > 100000 || complexity === 'veryHigh') {
      if (domain === 'fintech' || domain === 'banking' || domain === 'enterprise') {
        recommendations.primary = 'Spring Boot (Java)';
        recommendations.language = 'Java';
        recommendations.alternatives = ['ASP.NET Core', 'Go'];
      } else {
        recommendations.primary = 'Node.js + Express';
        recommendations.language = 'JavaScript/TypeScript';
        recommendations.alternatives = ['Go', 'FastAPI'];
      }
    }
    // ML/AI domain
    else if (domain === 'ml' || domain === 'ai' || domain === 'datascience') {
      recommendations.primary = 'FastAPI (Python)';
      recommendations.language = 'Python';
      recommendations.alternatives = ['Django', 'Flask'];
    }
    // Rapid development / MVP
    else if (complexity === 'low' || domain === 'startup') {
      recommendations.primary = 'Node.js + Express or Django';
      recommendations.language = 'JavaScript or Python';
      recommendations.alternatives = ['Ruby on Rails', 'Laravel'];
    }
    // General purpose
    else {
      recommendations.primary = 'Node.js + Express';
      recommendations.language = 'JavaScript/TypeScript';
      recommendations.alternatives = ['Django', 'FastAPI', 'Spring Boot'];
    }

    return recommendations;
  }

  recommendDatabase(projectType, domain, expectedUsers, complexity) {
    const recommendations = {
      primary: null,
      cache: null,
      search: null,
      alternatives: []
    };

    // Determine primary database
    if (domain === 'fintech' || domain === 'banking' || domain === 'healthcare') {
      recommendations.primary = 'PostgreSQL (ACID compliance critical)';
      recommendations.alternatives = ['MySQL'];
    } else if (domain === 'social' || domain === 'cms' || complexity === 'low') {
      recommendations.primary = 'MongoDB (Flexible schema)';
      recommendations.alternatives = ['PostgreSQL'];
    } else if (domain === 'analytics' || domain === 'bigdata') {
      recommendations.primary = 'PostgreSQL + Cassandra';
      recommendations.alternatives = ['MongoDB', 'ClickHouse'];
    } else {
      recommendations.primary = 'PostgreSQL';
      recommendations.alternatives = ['MongoDB', 'MySQL'];
    }

    // Cache layer for high traffic
    if (expectedUsers > 10000) {
      recommendations.cache = 'Redis';
    }

    // Search engine for specific domains
    if (domain === 'ecommerce' || domain === 'search' || expectedUsers > 50000) {
      recommendations.search = 'Elasticsearch';
    }

    return recommendations;
  }

  recommendCloud(expectedUsers, budget, complexity) {
    const recommendations = {
      platform: null,
      containerization: null,
      ci_cd: null,
      alternatives: []
    };

    // Cloud platform
    if (budget === 'low') {
      recommendations.platform = 'DigitalOcean or Heroku';
      recommendations.alternatives = ['AWS Free Tier', 'Vercel'];
    } else if (expectedUsers > 100000 || complexity === 'veryHigh') {
      recommendations.platform = 'AWS or Google Cloud';
      recommendations.alternatives = ['Azure'];
    } else {
      recommendations.platform = 'AWS or DigitalOcean';
      recommendations.alternatives = ['Google Cloud', 'Azure'];
    }

    // Containerization
    if (complexity !== 'low') {
      recommendations.containerization = 'Docker';
      if (expectedUsers > 50000) {
        recommendations.containerization += ' + Kubernetes';
      }
    }

    // CI/CD
    recommendations.ci_cd = 'GitHub Actions';
    recommendations.alternatives = ['GitLab CI', 'Jenkins'];

    return recommendations;
  }

  recommendAdditional(projectType, domain, expectedUsers) {
    const tools = [];

    // Monitoring
    if (expectedUsers > 10000) {
      tools.push({
        category: 'Monitoring',
        tools: ['Prometheus + Grafana', 'DataDog', 'New Relic']
      });
    }

    // Authentication
    tools.push({
      category: 'Authentication',
      tools: ['Auth0', 'Firebase Auth', 'JWT + Passport.js']
    });

    // Real-time features
    if (domain === 'social' || domain === 'chat' || projectType === 'realtime') {
      tools.push({
        category: 'Real-time',
        tools: ['Socket.io', 'WebSockets', 'Firebase Realtime DB']
      });
    }

    // Payment processing
    if (domain === 'ecommerce' || domain === 'fintech') {
      tools.push({
        category: 'Payments',
        tools: ['Stripe', 'PayPal', 'Razorpay']
      });
    }

    // Testing
    tools.push({
      category: 'Testing',
      tools: ['Jest', 'React Testing Library', 'Cypress', 'Selenium']
    });

    return tools;
  }

  generateReasoning(recommendations, params) {
    const reasoning = [];

    reasoning.push({
      category: 'Frontend',
      reason: `${recommendations.frontend.primary} recommended for ${params.complexity} complexity ${params.projectType} projects with good ecosystem support and performance.`
    });

    reasoning.push({
      category: 'Backend',
      reason: `${recommendations.backend.primary} chosen for scalability to ${params.expectedUsers} users and strong community support in ${params.domain} domain.`
    });

    reasoning.push({
      category: 'Database',
      reason: `${recommendations.database.primary} provides the right balance of consistency, scalability, and features for your requirements.`
    });

    if (recommendations.database.cache) {
      reasoning.push({
        category: 'Caching',
        reason: `${recommendations.database.cache} recommended to handle high traffic and improve response times.`
      });
    }

    reasoning.push({
      category: 'Cloud',
      reason: `${recommendations.cloud.platform} offers the best cost-to-performance ratio for your expected user base and budget constraints.`
    });

    return reasoning;
  }
}

module.exports = TechnologyRecommender;
