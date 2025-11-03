/**
 * Function Point Analysis (FPA) Model
 * Calculates project size based on functional requirements
 */

class FPAEstimator {
  constructor() {
    // Complexity weights for function types
    this.weights = {
      externalInputs: { simple: 3, average: 4, complex: 6 },
      externalOutputs: { simple: 4, average: 5, complex: 7 },
      externalInquiries: { simple: 3, average: 4, complex: 6 },
      internalFiles: { simple: 7, average: 10, complex: 15 },
      externalInterfaces: { simple: 5, average: 7, complex: 10 }
    };

    // Technical complexity factors
    this.tcfFactors = [
      'dataComm',
      'distributedProcessing',
      'performance',
      'heavilyUsedConfig',
      'transactionRate',
      'onlineDataEntry',
      'endUserEfficiency',
      'onlineUpdate',
      'complexProcessing',
      'reusability',
      'installationEase',
      'operationalEase',
      'multipleSites',
      'facilitateChange'
    ];
  }

  /**
   * Calculate Unadjusted Function Points (UFP)
   * @param {object} functionCounts - Counts of different function types
   * @returns {number} UFP value
   */
  calculateUFP(functionCounts) {
    let ufp = 0;

    for (const [functionType, counts] of Object.entries(functionCounts)) {
      if (this.weights[functionType]) {
        const weights = this.weights[functionType];
        ufp += (counts.simple || 0) * weights.simple;
        ufp += (counts.average || 0) * weights.average;
        ufp += (counts.complex || 0) * weights.complex;
      }
    }

    return ufp;
  }

  /**
   * Calculate Technical Complexity Factor (TCF)
   * @param {object} tcfValues - Technical complexity factor values (0-5)
   * @returns {number} TCF value
   */
  calculateTCF(tcfValues) {
    let totalDegreeOfInfluence = 0;

    for (const factor of this.tcfFactors) {
      totalDegreeOfInfluence += tcfValues[factor] || 3; // Default to 3 (average)
    }

    // TCF = 0.65 + (0.01 * TDI)
    const tcf = 0.65 + (0.01 * totalDegreeOfInfluence);
    return Math.round(tcf * 100) / 100;
  }

  /**
   * Calculate Adjusted Function Points (AFP)
   * @param {number} ufp - Unadjusted Function Points
   * @param {number} tcf - Technical Complexity Factor
   * @returns {number} AFP value
   */
  calculateAFP(ufp, tcf) {
    return Math.round(ufp * tcf);
  }

  /**
   * Convert Function Points to Lines of Code
   * @param {number} fp - Function Points
   * @param {string} language - Programming language
   * @returns {number} Estimated lines of code
   */
  convertToLOC(fp, language) {
    const conversionFactors = {
      'java': 53,
      'javascript': 47,
      'python': 38,
      'csharp': 54,
      'php': 64,
      'ruby': 42,
      'go': 50,
      'typescript': 48,
      'cpp': 55,
      'swift': 49
    };

    const factor = conversionFactors[language] || 50;
    return Math.round(fp * factor);
  }

  /**
   * Estimate based on simple project parameters
   * @param {object} params - Project parameters
   * @returns {object} FPA estimation results
   */
  estimateFromParams(params) {
    const { 
      projectType, 
      features, 
      apiEndpoints, 
      databaseTables, 
      externalIntegrations,
      complexity 
    } = params;

    // Heuristic estimation based on project parameters
    const functionCounts = {
      externalInputs: {
        simple: Math.floor(features * 0.3),
        average: Math.floor(features * 0.5),
        complex: Math.floor(features * 0.2)
      },
      externalOutputs: {
        simple: Math.floor(apiEndpoints * 0.4),
        average: Math.floor(apiEndpoints * 0.4),
        complex: Math.floor(apiEndpoints * 0.2)
      },
      externalInquiries: {
        simple: Math.floor(features * 0.2),
        average: Math.floor(features * 0.3),
        complex: Math.floor(features * 0.1)
      },
      internalFiles: {
        simple: Math.floor(databaseTables * 0.3),
        average: Math.floor(databaseTables * 0.5),
        complex: Math.floor(databaseTables * 0.2)
      },
      externalInterfaces: {
        simple: Math.floor(externalIntegrations * 0.3),
        average: Math.floor(externalIntegrations * 0.4),
        complex: Math.floor(externalIntegrations * 0.3)
      }
    };

    // Technical complexity based on project complexity
    const tcfValues = {};
    const baseComplexity = complexity === 'veryHigh' ? 5 : 
                          complexity === 'high' ? 4 : 
                          complexity === 'nominal' ? 3 : 2;

    this.tcfFactors.forEach(factor => {
      tcfValues[factor] = baseComplexity;
    });

    const ufp = this.calculateUFP(functionCounts);
    const tcf = this.calculateTCF(tcfValues);
    const afp = this.calculateAFP(ufp, tcf);

    return {
      functionPoints: afp,
      ufp,
      tcf,
      functionCounts
    };
  }

  /**
   * Complete FPA estimation
   * @param {object} params - Project parameters
   * @returns {object} Complete estimation results
   */
  estimate(params) {
    const fpaResults = this.estimateFromParams(params);
    const loc = this.convertToLOC(fpaResults.functionPoints, params.primaryLanguage || 'javascript');
    const kloc = Math.round(loc / 1000 * 10) / 10;

    return {
      ...fpaResults,
      estimatedLOC: loc,
      estimatedKLOC: kloc
    };
  }
}

module.exports = FPAEstimator;
