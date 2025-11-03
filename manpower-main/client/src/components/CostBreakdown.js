import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CostBreakdown = ({ data }) => {
  const formatCurrency = (num) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);
  };

  // Calculate role-based costs
  const roleCosts = Object.entries(data.manpowerDistribution).map(([role, count]) => {
    // Estimate cost multipliers based on role seniority
    const multipliers = {
      projectManager: 1.8,
      architects: 1.7,
      techLead: 1.6,
      seniorDevelopers: 1.4,
      securityEngineers: 1.5,
      developers: 1.0,
      qaEngineers: 1.0,
      uiuxDesigners: 1.2,
      devOps: 1.3
    };

    const multiplier = multipliers[role] || 1.0;
    const baseSalary = data.costEstimation.costPerPersonMonth;
    const roleCost = count * baseSalary * multiplier * data.effortEstimation.duration;

    return {
      role: role.replace(/([A-Z])/g, ' $1').trim(),
      count,
      monthlyCost: Math.round(count * baseSalary * multiplier),
      totalCost: Math.round(roleCost)
    };
  });

  return (
    <div className="card">
      <h2 className="card-title">💰 Cost Breakdown & Analysis</h2>
      
      <div className="cost-breakdown">
        <h4>📋 Project Cost Summary</h4>
        <div className="cost-item">
          <span>Total Effort (Person-Months)</span>
          <span>{data.effortEstimation.effort} PM</span>
        </div>
        <div className="cost-item">
          <span>Project Duration</span>
          <span>{data.effortEstimation.duration} Months</span>
        </div>
        <div className="cost-item">
          <span>Average Team Size</span>
          <span>{data.effortEstimation.teamSize} People</span>
        </div>
        <div className="cost-item">
          <span>Cost per Person-Month</span>
          <span>{formatCurrency(data.costEstimation.costPerPersonMonth)}</span>
        </div>
        <div className="cost-item">
          <span>Average Monthly Cost</span>
          <span>{formatCurrency(data.costEstimation.monthlyCost)}</span>
        </div>
        <div className="cost-item" style={{ borderTop: '2px solid #667eea', paddingTop: '15px', marginTop: '10px' }}>
          <span>Total Project Cost</span>
          <span style={{ color: '#667eea', fontSize: '1.3rem' }}>
            {formatCurrency(data.costEstimation.totalCost)}
          </span>
        </div>
      </div>

      <div style={{ marginTop: '30px' }}>
        <h4 style={{ marginBottom: '20px', color: '#333' }}>💼 Role-Based Cost Distribution</h4>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={roleCosts}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="role" angle={-45} textAnchor="end" height={120} />
            <YAxis />
            <Tooltip 
              formatter={(value) => formatCurrency(value)}
              labelStyle={{ color: '#333' }}
            />
            <Legend />
            <Bar dataKey="monthlyCost" fill="#667eea" name="Monthly Cost" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div style={{ marginTop: '30px' }}>
        <h4 style={{ marginBottom: '15px', color: '#333' }}>📊 Detailed Role Costs</h4>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f8f9fa', borderBottom: '2px solid #667eea' }}>
                <th style={{ padding: '12px', textAlign: 'left' }}>Role</th>
                <th style={{ padding: '12px', textAlign: 'center' }}>Count</th>
                <th style={{ padding: '12px', textAlign: 'right' }}>Monthly Cost</th>
                <th style={{ padding: '12px', textAlign: 'right' }}>Total Cost</th>
              </tr>
            </thead>
            <tbody>
              {roleCosts.map((role, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '12px' }}>{role.role}</td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>{role.count}</td>
                  <td style={{ padding: '12px', textAlign: 'right' }}>
                    {formatCurrency(role.monthlyCost)}
                  </td>
                  <td style={{ padding: '12px', textAlign: 'right', fontWeight: 'bold', color: '#667eea' }}>
                    {formatCurrency(role.totalCost)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="info-box" style={{ marginTop: '20px' }}>
        <p>
          <strong>Cost Assumptions:</strong> Estimates are based on industry-standard rates 
          (${data.costEstimation.costPerPersonMonth.toLocaleString()}/person-month) and adjusted 
          for role seniority. Actual costs may vary based on location, market conditions, and 
          specific hiring needs. Additional costs for infrastructure, tools, and overhead are 
          not included.
        </p>
      </div>
    </div>
  );
};

export default CostBreakdown;
