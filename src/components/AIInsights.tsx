import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, ScatterChart, Scatter } from 'recharts';
import { Brain, TrendingUp, AlertTriangle, Target, Lightbulb, Zap, Activity } from 'lucide-react';

export function AIInsights() {
  const [selectedInsight, setSelectedInsight] = useState('predictive-maintenance');

  // Mock AI prediction data
  const predictiveMaintenanceData = [
    { component: 'Rail Clips', currentRisk: 65, predictedRisk: 85, daysToFailure: 45, confidence: 87 },
    { component: 'Bolts', currentRisk: 45, predictedRisk: 70, daysToFailure: 75, confidence: 82 },
    { component: 'Plates', currentRisk: 30, predictedRisk: 55, daysToFailure: 120, confidence: 78 },
    { component: 'Anchors', currentRisk: 25, predictedRisk: 40, daysToFailure: 180, confidence: 85 },
    { component: 'Joints', currentRisk: 55, predictedRisk: 80, daysToFailure: 60, confidence: 80 }
  ];

  const failurePredictionTrend = [
    { month: 'Jul', predicted: 12, actual: 11 },
    { month: 'Aug', predicted: 15, actual: 14 },
    { month: 'Sep', predicted: 18, actual: 17 },
    { month: 'Oct', predicted: 22, actual: null },
    { month: 'Nov', predicted: 19, actual: null },
    { month: 'Dec', predicted: 16, actual: null }
  ];

  const riskHeatmapData = [
    { section: 'KM 150-200', trackLoad: 85, weatherExposure: 60, vibration: 70, riskScore: 72 },
    { section: 'KM 200-250', trackLoad: 95, weatherExposure: 80, vibration: 85, riskScore: 87 },
    { section: 'KM 250-300', trackLoad: 70, weatherExposure: 45, vibration: 55, riskScore: 57 },
    { section: 'KM 300-350', trackLoad: 80, weatherExposure: 65, vibration: 75, riskScore: 73 },
    { section: 'KM 350-400', trackLoad: 60, weatherExposure: 40, vibration: 50, riskScore: 50 }
  ];

  const aiRecommendations = [
    {
      id: 1,
      priority: 'high',
      title: 'Immediate Attention Required',
      description: 'Rail clips in KM 245.3 section show 85% failure probability within 45 days',
      action: 'Schedule replacement within 2 weeks',
      confidence: 87,
      potentialSavings: '₹2,50,000'
    },
    {
      id: 2,
      priority: 'medium',
      title: 'Preventive Maintenance Opportunity',
      description: 'Bolts in Track 2 sections showing early wear patterns',
      action: 'Implement enhanced lubrication schedule',
      confidence: 82,
      potentialSavings: '₹1,20,000'
    },
    {
      id: 3,
      priority: 'low',
      title: 'Optimization Suggestion',
      description: 'Weather-protected sections showing better longevity',
      action: 'Consider protective coating for exposed areas',
      confidence: 75,
      potentialSavings: '₹5,00,000'
    }
  ];

  const modelPerformance = {
    accuracy: 87,
    precision: 84,
    recall: 89,
    f1Score: 86,
    lastTrained: '2024-09-01',
    dataPoints: 15420
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskColor = (risk: number) => {
    if (risk >= 80) return 'text-red-600';
    if (risk >= 60) return 'text-orange-500';
    if (risk >= 40) return 'text-yellow-500';
    return 'text-green-600';
  };

  return (
    <div className="space-y-6">
      {/* AI Insights Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5" />
            AI-Powered Insights
          </CardTitle>
          <CardDescription>
            Machine learning driven predictions and recommendations for railway fitting maintenance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{modelPerformance.accuracy}%</div>
              <p className="text-sm text-muted-foreground">Model Accuracy</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{predictiveMaintenanceData.length}</div>
              <p className="text-sm text-muted-foreground">Active Predictions</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{aiRecommendations.filter(r => r.priority === 'high').length}</div>
              <p className="text-sm text-muted-foreground">High Priority Alerts</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">₹8.7L</div>
              <p className="text-sm text-muted-foreground">Potential Savings</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Predictive Maintenance Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Predictive Maintenance Alerts
            </CardTitle>
            <CardDescription>AI predictions for component failures</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {predictiveMaintenanceData.map((item, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">{item.component}</h4>
                    <Badge className={item.currentRisk >= 60 ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}>
                      {item.daysToFailure} days
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Risk Level</span>
                      <span className={getRiskColor(item.predictedRisk)}>
                        {item.currentRisk}% → {item.predictedRisk}%
                      </span>
                    </div>
                    <Progress value={item.predictedRisk} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Confidence: {item.confidence}%</span>
                      <span>Days to predicted failure: {item.daysToFailure}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Risk Heatmap */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Risk Heatmap Analysis
            </CardTitle>
            <CardDescription>Risk distribution across track sections</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <ScatterChart data={riskHeatmapData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="trackLoad" name="Track Load" />
                <YAxis dataKey="weatherExposure" name="Weather Exposure" />
                <Tooltip 
                  formatter={(value, name) => [value, name]}
                  labelFormatter={(label, payload) => {
                    if (payload && payload[0]) {
                      return `${payload[0].payload.section} - Risk Score: ${payload[0].payload.riskScore}`;
                    }
                    return label;
                  }}
                />
                <Scatter 
                  dataKey="riskScore" 
                  fill="#8884d8"
                  fillOpacity={0.6}
                />
              </ScatterChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* AI Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5" />
            AI Recommendations
          </CardTitle>
          <CardDescription>Intelligent suggestions based on data analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {aiRecommendations.map((rec) => (
              <div key={rec.id} className="p-4 border rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Badge className={getPriorityColor(rec.priority)}>
                      {rec.priority.toUpperCase()}
                    </Badge>
                    <h4 className="font-medium">{rec.title}</h4>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-green-600">{rec.potentialSavings}</p>
                    <p className="text-xs text-muted-foreground">Potential Savings</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{rec.description}</p>
                <div className="flex items-center justify-between">
                  <p className="text-sm"><strong>Recommended Action:</strong> {rec.action}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs">Confidence: {rec.confidence}%</span>
                    <Button size="sm" variant="outline">Implement</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Prediction Accuracy Trends */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Prediction vs Reality
          </CardTitle>
          <CardDescription>Model accuracy tracking over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={failurePredictionTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="predicted" 
                stroke="#3b82f6" 
                strokeWidth={2}
                strokeDasharray="5 5"
                name="AI Prediction"
              />
              <Line 
                type="monotone" 
                dataKey="actual" 
                stroke="#ef4444" 
                strokeWidth={2}
                name="Actual Failures"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Model Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Model Performance
            </CardTitle>
            <CardDescription>Current AI model statistics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Accuracy</span>
                <div className="flex items-center gap-2">
                  <Progress value={modelPerformance.accuracy} className="w-20 h-2" />
                  <span className="text-sm font-medium">{modelPerformance.accuracy}%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span>Precision</span>
                <div className="flex items-center gap-2">
                  <Progress value={modelPerformance.precision} className="w-20 h-2" />
                  <span className="text-sm font-medium">{modelPerformance.precision}%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span>Recall</span>
                <div className="flex items-center gap-2">
                  <Progress value={modelPerformance.recall} className="w-20 h-2" />
                  <span className="text-sm font-medium">{modelPerformance.recall}%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span>F1 Score</span>
                <div className="flex items-center gap-2">
                  <Progress value={modelPerformance.f1Score} className="w-20 h-2" />
                  <span className="text-sm font-medium">{modelPerformance.f1Score}%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Training Information</CardTitle>
            <CardDescription>Model training and data details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Last Trained:</span>
                <span className="font-medium">{modelPerformance.lastTrained}</span>
              </div>
              <div className="flex justify-between">
                <span>Training Data Points:</span>
                <span className="font-medium">{modelPerformance.dataPoints.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Model Version:</span>
                <span className="font-medium">v2.1.3</span>
              </div>
              <div className="flex justify-between">
                <span>Next Training:</span>
                <span className="font-medium">2024-10-01</span>
              </div>
              <div className="pt-3 space-y-2">
                <Button variant="outline" className="w-full">
                  Retrain Model
                </Button>
                <Button variant="outline" className="w-full">
                  Download Model Report
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}