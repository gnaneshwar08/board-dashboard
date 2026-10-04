import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import './TopProductsChart.css';

const TopProductsChart = ({ data }) => {
  const COLORS = ['var(--pie-green)', 'var(--pie-yellow)', 'var(--pie-red)'];

  return (
    <div className="top-products-card">
      <div className="products-header">
        <h3>Top products</h3>
        <select>
          <option>May - June 2021</option>
        </select>
      </div>
      
      <div className="products-content">
        <div style={{ width: '150px', height: '150px' }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={data}
                innerRadius={0}
                outerRadius={75}
                paddingAngle={0}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="products-legend">
          {data.map((item, index) => (
            <div className="product-legend-item" key={index}>
              <div className="product-color" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
              <div className="product-info">
                <span className="product-name">{item.name}</span>
                <span className="product-value">{item.value}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopProductsChart;
