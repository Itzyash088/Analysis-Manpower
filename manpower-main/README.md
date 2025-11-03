# 🚀 Manpower & Technology Analysis System

## Overview

A comprehensive decision-support system for software project planning that analyzes project requirements and provides evidence-based recommendations for manpower distribution and technology stack selection. The system leverages industry-standard estimation models including:

- **COCOMO II (Constructive Cost Model)** - For effort, duration, and cost estimation
- **Function Point Analysis (FPA)** - For project size estimation
- **Rule-Based Technology Recommendations** - For optimal tech stack selection

## 🌟 Features

### 📊 Project Estimation
- **Effort Estimation**: Calculate required person-months using COCOMO II
- **Duration Estimation**: Predict project timeline with high accuracy
- **Size Estimation**: Determine project size using Function Point Analysis
- **Cost Analysis**: Comprehensive cost breakdown by role and phase

### 👥 Manpower Planning
- **Team Size Calculation**: Optimal team size based on project parameters
- **Role Distribution**: Detailed breakdown of required roles (PM, developers, QA, etc.)
- **Seniority Mix**: Balanced distribution of junior, mid, and senior positions
- **Visual Charts**: Interactive pie charts and role-based visualizations

### 🛠️ Technology Recommendations
- **Frontend Stack**: Framework and styling library recommendations
- **Backend Stack**: Server framework and language selection
- **Database Selection**: SQL/NoSQL recommendations based on requirements
- **Cloud & DevOps**: Platform and tooling suggestions
- **Additional Tools**: Authentication, monitoring, testing frameworks

### 💰 Cost Management
- **Total Cost Estimation**: Complete project budget calculation
- **Monthly Burn Rate**: Average monthly cost tracking
- **Role-Based Costs**: Cost breakdown by team member roles
- **Visual Reports**: Interactive charts and detailed tables

## 🏗️ Architecture

### Backend (Node.js + Express)
```
server/
├── models/
│   ├── cocomo.js          # COCOMO II estimation model
│   ├── fpa.js             # Function Point Analysis model
│   └── technology.js      # Technology recommendation engine
└── index.js               # Express API server
```

### Frontend (React)
```
client/src/
├── components/
│   ├── ProjectForm.js           # Input form for project parameters
│   ├── Results.js               # Main results container
│   ├── MetricsOverview.js       # Key metrics display
│   ├── ManpowerDistribution.js  # Team composition charts
│   ├── TechnologyStack.js       # Tech recommendations
│   └── CostBreakdown.js         # Cost analysis and charts
├── App.js                # Main application component
└── index.css             # Global styles
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd manpower
```

2. **Install all dependencies**
```bash
npm run install-all
```

This will install dependencies for the root project, server, and client.

### Running the Application

#### Option 1: Run Both Services Concurrently (Recommended)
```bash
npm run dev
```

This will start both the backend server (port 5000) and frontend development server (port 3000).

#### Option 2: Run Separately

**Terminal 1 - Backend Server:**
```bash
npm run server
```

**Terminal 2 - Frontend Client:**
```bash
npm run client
```

### Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Health Check**: http://localhost:5000/api/health

## 📖 API Documentation

### Main Estimation Endpoint
```
POST /api/estimate
```

**Request Body:**
```json
{
  "projectName": "E-commerce Platform",
  "domain": "ecommerce",
  "projectType": "web",
  "complexity": "high",
  "expectedUsers": 50000,
  "features": 30,
  "apiEndpoints": 25,
  "databaseTables": 15,
  "externalIntegrations": 5,
  "primaryLanguage": "javascript",
  "teamExpertise": "medium",
  "budget": "medium",
  "timeline": "medium"
}
```

## 🧮 Estimation Models

### COCOMO II Model

The system implements COCOMO II (COnstructive COst MOdel) for effort and duration estimation:

**Effort Calculation:**
```
Effort = a × (KLOC)^b × EAF
```

**Duration Calculation:**
```
Duration = c × (Effort)^d
```

**Development Modes:**
- **Organic**: Small, experienced teams (2.4, 1.05)
- **Semi-Detached**: Medium complexity (3.0, 1.12)
- **Embedded**: Complex, critical systems (3.6, 1.20)

### Function Point Analysis

FPA calculates project size based on functional requirements:

**Components:**
- External Inputs
- External Outputs
- External Inquiries
- Internal Files
- External Interfaces

**Formula:**
```
FP = UFP × TCF
Where:
  UFP = Unadjusted Function Points
  TCF = Technical Complexity Factor (0.65 + 0.01 × TDI)
```

## 🎯 Use Cases

1. **Project Planning**: Estimate required resources before project kickoff
2. **Budget Approval**: Generate cost estimates for stakeholder approval
3. **Resource Allocation**: Determine optimal team composition
4. **Technology Selection**: Choose the right tech stack for your project
5. **Feasibility Analysis**: Assess project viability and requirements
6. **Vendor Evaluation**: Compare estimates with vendor proposals

## 🔧 Technology Stack

### Frontend
- **React 18**: Modern UI library
- **Recharts**: Data visualization and charts
- **CSS3**: Custom responsive styling

### Backend
- **Node.js**: JavaScript runtime
- **Express**: Web application framework
- **CORS**: Cross-origin resource sharing

## 📊 Project Complexity Levels

- **Very Low**: Simple CRUD applications, prototypes
- **Low**: Basic web applications with standard features
- **Nominal**: Moderate complexity with multiple integrations
- **High**: Complex business logic, real-time features
- **Very High**: Mission-critical, distributed systems

## 🌐 Supported Domains

- Web Applications
- Mobile Applications
- E-commerce Platforms
- Social Media
- Enterprise Software
- Fintech/Banking
- Healthcare
- Education
- Real-time/Chat Applications
- Analytics/BI
- ML/AI Systems
- IoT Platforms
- Gaming
- Content Management Systems

---

**Made with ❤️ for better software project planning**