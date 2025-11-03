import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const ManpowerDistribution = ({ distribution, teamSize }) => {
  const COLORS = ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#43e97b', '#fa709a', '#fee140', '#30cfd0'];

  // Convert distribution object to array for chart
  const chartData = Object.entries(distribution).map(([role, count]) => ({
    name: formatRoleName(role),
    value: count,
    percentage: ((count / teamSize) * 100).toFixed(1)
  }));

  function formatRoleName(role) {
    return role
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .trim();
  }

  return (
    <div className="card">
      <h2 className="card-title">👥 Manpower Distribution</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', alignItems: 'center' }}>
        <div>
          <div className="manpower-grid">
            {Object.entries(distribution).map(([role, count], index) => (
              <div key={role} className="role-card">
                <div className="role-name">{formatRoleName(role)}</div>
                <div className="role-count">{count}</div>
                <div className="role-label">
                  {((count / teamSize) * 100).toFixed(1)}% of team
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percentage }) => `${name}: ${percentage}%`}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="info-box" style={{ marginTop: '20px' }}>
        <p>
          <strong>Note:</strong> This distribution is based on industry best practices and the 
          selected development mode. Actual team composition may vary based on project phase, 
          specific requirements, and organizational structure.
        </p>
      </div>
    </div>
  );
};

export default ManpowerDistribution;
