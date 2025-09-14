import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { AlertTriangle, CheckCircle, Clock, Wrench, TrendingUp, MapPin } from 'lucide-react';

interface DashboardProps {
  onNavigateToFitting: (fittingId: string) => void;
}

export function Dashboard({ onNavigateToFitting }: DashboardProps) {
  const stats = {
    totalFittings: 12547,
    criticalAlerts: 23,
    dueInspections: 156,
    completedMaintenance: 89
  };

  const failureData = [
    { name: 'Rail Clips', failures: 45, total: 2300 },
    { name: 'Bolts', failures: 32, total: 3200 },
    { name: 'Plates', failures: 28, total: 1800 },
    { name: 'Anchors', failures: 15, total: 1500 },
    { name: 'Joints', failures: 12, total: 900 }
  ];

  const ageDistributionData = [
    { name: '0-1 Years', value: 2500, color: '#22c55e' },
    { name: '1-3 Years', value: 3800, color: '#3b82f6' },
    { name: '3-5 Years', value: 2900, color: '#f59e0b' },
    { name: '5+ Years', value: 3347, color: '#ef4444' }
  ];

  const maintenanceTrendData = [
    { month: 'Jan', scheduled: 120, completed: 118, emergency: 8 },
    { month: 'Feb', scheduled: 135, completed: 132, emergency: 12 },
    { month: 'Mar', scheduled: 148, completed: 145, emergency: 6 },
    { month: 'Apr', scheduled: 162, completed: 158, emergency: 15 },
    { month: 'May', scheduled: 171, completed: 169, emergency: 9 },
    { month: 'Jun', scheduled: 156, completed: 154, emergency: 11 }
  ];

  const criticalFittings = [
    { id: 'RF-2301-A45', location: 'KM 245.3, Track 1', risk: 'High', lastInspection: '15 days ago' },
    { id: 'RF-2301-B12', location: 'KM 198.7, Track 2', risk: 'Critical', lastInspection: '22 days ago' },
    { id: 'RF-2301-C78', location: 'KM 312.1, Track 1', risk: 'High', lastInspection: '18 days ago' }
  ];

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Total Fittings</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{stats.totalFittings.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Across all tracks</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Critical Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-destructive">{stats.criticalAlerts}</div>
            <p className="text-xs text-muted-foreground">Require immediate attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Due Inspections</CardTitle>
            <Clock className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-amber-600">{stats.dueInspections}</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Maintenance Complete</CardTitle>
            <Wrench className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-green-600">{stats.completedMaintenance}%</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Failure Analysis Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Failure Analysis by Component Type</CardTitle>
            <CardDescription>Number of failures in the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={failureData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="failures" fill="#ef4444" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Age Distribution Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Fitting Age Distribution</CardTitle>
            <CardDescription>Distribution by installation age</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={ageDistributionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {ageDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Maintenance Trend */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Maintenance Trends</CardTitle>
            <CardDescription>Monthly maintenance activities</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={maintenanceTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="scheduled" stroke="#3b82f6" strokeWidth={2} />
                <Line type="monotone" dataKey="completed" stroke="#22c55e" strokeWidth={2} />
                <Line type="monotone" dataKey="emergency" stroke="#ef4444" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Critical Fittings */}
        <Card>
          <CardHeader>
            <CardTitle>Critical Fittings</CardTitle>
            <CardDescription>Requiring immediate attention</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {criticalFittings.map((fitting) => (
              <div
                key={fitting.id}
                className="p-3 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => onNavigateToFitting(fitting.id)}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-sm">{fitting.id}</span>
                  <Badge variant={fitting.risk === 'Critical' ? 'destructive' : 'secondary'}>
                    {fitting.risk}
                  </Badge>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="w-3 h-3" />
                  {fitting.location}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Last inspected: {fitting.lastInspection}
                </p>
              </div>
            ))}
            <Button variant="outline" className="w-full" size="sm">
              View All Critical Fittings
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Risk Zones Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Risk Zone Overview</CardTitle>
          <CardDescription>Track sections categorized by risk level</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Low Risk Zones</span>
                <span>78%</span>
              </div>
              <Progress value={78} className="h-2" />
              <p className="text-xs text-muted-foreground">245 sections</p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Medium Risk Zones</span>
                <span>18%</span>
              </div>
              <Progress value={18} className="h-2" />
              <p className="text-xs text-muted-foreground">56 sections</p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>High Risk Zones</span>
                <span>4%</span>
              </div>
              <Progress value={4} className="h-2" />
              <p className="text-xs text-muted-foreground">12 sections</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}