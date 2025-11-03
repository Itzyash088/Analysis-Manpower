/**
 * COCOMO II Estimation Model
 * Calculates effort, duration, and team size based on project parameters
 */

class COCOMOEstimator {
  constructor() {
    // Scale factors for COCOMO II
    this.scaleFactor = {
      organic: 1.05,
      semiDetached: 1.12,
      embedded: 1.20
    };

    // Effort multiplier constants
    this.effortConstants = {
      organic: { a: 2.4, b: 1.05 },
      semiDetached: { a: 3.0, b: 1.12 },
      embedded: { a: 3.6, b: 1.20 }
    };

    // Duration constants
    this.durationConstants = {
      organic: { c: 2.5, d: 0.38 },
      semiDetached: { c: 2.5, d: 0.35 },
      embedded: { c: 2.5, d: 0.32 }
    };

    // Complexity cost drivers
    this.costDrivers = {
      veryLow: 0.75,
      low: 0.88,
      nominal: 1.00,
      high: 1.15,
      veryHigh: 1.40,
      extraHigh: 1.65
    };
  }

  /**
   * Calculate effort in person-months
   * @param {number} kloc - Thousands of Lines of Code
   * @param {string} mode - Development mode (organic, semiDetached, embedded)
   * @param {string} complexity - Project complexity
   * @returns {number} Effort in person-months
   */
  calculateEffort(kloc, mode, complexity) {
    const { a, b } = this.effortConstants[mode];
    const costDriver = this.costDrivers[complexity] || 1.0;
    
    // COCOMO II: Effort = a * (KLOC)^b * EAF
    const effort = a * Math.pow(kloc, b) * costDriver;
    return Math.round(effort * 10) / 10;
  }

  /**
   * Calculate development duration in months
   * @param {number} effort - Effort in person-months
   * @param {string} mode - Development mode
   * @returns {number} Duration in months
   */
  calculateDuration(effort, mode) {
    const { c, d } = this.durationConstants[mode];
    
    // Duration = c * (Effort)^d
    const duration = c * Math.pow(effort, d);
    return Math.round(duration * 10) / 10;
  }

  /**
   * Calculate average team size
   * @param {number} effort - Effort in person-months
   * @param {number} duration - Duration in months
   * @returns {number} Average team size
   */
  calculateTeamSize(effort, duration) {
    return Math.ceil(effort / duration);
  }

  /**
   * Estimate manpower distribution across roles
   * @param {number} teamSize - Total team size
   * @param {string} mode - Development mode
   * @returns {object} Role distribution
   */
  estimateManpowerDistribution(teamSize, mode) {
    let distribution = {};

    if (mode === 'organic') {
      distribution = {
        projectManager: 1,
        techLead: 1,
        seniorDevelopers: Math.ceil(teamSize * 0.25),
        developers: Math.ceil(teamSize * 0.40),
        qaEngineers: Math.ceil(teamSize * 0.20),
        uiuxDesigners: Math.max(1, Math.ceil(teamSize * 0.10)),
        devOps: Math.max(1, Math.ceil(teamSize * 0.05))
      };
    } else if (mode === 'semiDetached') {
      distribution = {
        projectManager: 1,
        techLead: Math.max(1, Math.ceil(teamSize * 0.10)),
        seniorDevelopers: Math.ceil(teamSize * 0.30),
        developers: Math.ceil(teamSize * 0.35),
        qaEngineers: Math.ceil(teamSize * 0.15),
        uiuxDesigners: Math.max(1, Math.ceil(teamSize * 0.05)),
        devOps: Math.max(1, Math.ceil(teamSize * 0.05))
      };
    } else { // embedded
      distribution = {
        projectManager: Math.max(1, Math.ceil(teamSize * 0.08)),
        techLead: Math.max(1, Math.ceil(teamSize * 0.12)),
        architects: Math.max(1, Math.ceil(teamSize * 0.10)),
        seniorDevelopers: Math.ceil(teamSize * 0.30),
        developers: Math.ceil(teamSize * 0.25),
        qaEngineers: Math.ceil(teamSize * 0.10),
        securityEngineers: Math.max(1, Math.ceil(teamSize * 0.03)),
        devOps: Math.max(1, Math.ceil(teamSize * 0.02))
      };
    }

    return distribution;
  }

  /**
   * Complete COCOMO estimation
   * @param {object} params - Project parameters
   * @returns {object} Complete estimation results
   */
  estimate(params) {
    const { kloc, mode, complexity } = params;
    
    const effort = this.calculateEffort(kloc, mode, complexity);
    const duration = this.calculateDuration(effort, mode);
    const teamSize = this.calculateTeamSize(effort, duration);
    const manpowerDistribution = this.estimateManpowerDistribution(teamSize, mode);

    // Calculate costs (assuming $8000 per person-month)
    const costPerPersonMonth = 8000;
    const totalCost = effort * costPerPersonMonth;

    return {
      effort,
      duration,
      teamSize,
      manpowerDistribution,
      totalCost,
      costPerPersonMonth
    };
  }
}

module.exports = COCOMOEstimator;
