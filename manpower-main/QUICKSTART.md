# Quick Start Guide

## Installation and Setup

### 1. Install Dependencies
```bash
# Install root dependencies
npm install

# Install server dependencies
cd server && npm install

# Install client dependencies
cd ../client && npm install
```

### 2. Start the Application

#### Option A: Run both services concurrently (recommended)
```bash
npm run dev
```

#### Option B: Run services separately

**Terminal 1 - Start Backend:**
```bash
npm run server
```

**Terminal 2 - Start Frontend:**
```bash
npm run client
```

### 3. Access the Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- API Health Check: http://localhost:5000/api/health

## How to Use

### 1. Fill in Project Details
- Enter your project name
- Select domain (e.g., E-commerce, Healthcare, etc.)
- Choose project type (Web, Mobile, Hybrid, etc.)
- Set complexity level (Very Low to Very High)
- Specify expected users

### 2. Configure Project Parameters
- Number of features
- API endpoints
- Database tables
- External integrations
- Primary programming language
- Team expertise level
- Budget constraints

### 3. Get Results
Click "Analyze Project" to receive:
- Project size estimation (KLOC, Function Points)
- Effort and duration estimates
- Team size and composition
- Detailed manpower distribution
- Complete cost breakdown
- Technology stack recommendations
- Implementation reasoning

## Example Test Case

Try this sample project to see the system in action:

**Project Details:**
- Project Name: "E-commerce Platform"
- Domain: "E-commerce"
- Project Type: "Web"
- Complexity: "High"
- Expected Users: 50000
- Features: 30
- API Endpoints: 25
- Database Tables: 15
- External Integrations: 5
- Primary Language: "JavaScript"

**Expected Results:**
- Project Size: ~13-15 KLOC
- Effort: ~55-65 person-months
- Duration: ~11-13 months
- Team Size: 5-7 people
- Total Cost: ~$400,000-$500,000

## API Testing

You can test the API directly using curl or Postman:

```bash
curl -X POST http://localhost:5000/api/estimate \
  -H "Content-Type: application/json" \
  -d '{
    "projectName": "Test Project",
    "domain": "webapplication",
    "projectType": "web",
    "complexity": "nominal",
    "expectedUsers": 10000,
    "features": 20,
    "apiEndpoints": 15,
    "databaseTables": 10,
    "externalIntegrations": 3,
    "primaryLanguage": "javascript"
  }'
```

## Troubleshooting

### Port Already in Use
If port 3000 or 5000 is already in use:

```bash
# Kill process on port 5000 (server)
lsof -ti:5000 | xargs kill -9

# Kill process on port 3000 (client)
lsof -ti:3000 | xargs kill -9
```

### Dependencies Issues
```bash
# Clear npm cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### CORS Issues
Make sure the server is running on port 5000 and the client has the proxy configured in package.json.

## Key Features

✅ COCOMO II implementation for effort estimation
✅ Function Point Analysis for size estimation
✅ Intelligent technology recommendations
✅ Interactive data visualizations
✅ Responsive design
✅ Real-time calculations
✅ Comprehensive cost analysis
✅ Role-based manpower distribution

## Project Structure

```
manpower/
├── client/                 # React frontend
│   ├── public/
│   └── src/
│       ├── components/    # React components
│       ├── App.js
│       └── index.js
├── server/                # Node.js backend
│   ├── models/           # Estimation models
│   │   ├── cocomo.js
│   │   ├── fpa.js
│   │   └── technology.js
│   └── index.js          # Express server
├── package.json          # Root package
└── README.md
```

## Support

For issues or questions:
1. Check the main README.md
2. Review API documentation
3. Check console for errors
4. Verify all dependencies are installed

---

Happy Estimating! 🚀
