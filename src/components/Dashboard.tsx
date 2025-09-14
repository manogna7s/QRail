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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="glass-effect border-white/20 card-hover animate-slide-in-left shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-bold text-blue-100">Total Fittings</CardTitle>
            <div className="p-2 bg-gradient-to-br from-green-400 to-green-600 rounded-lg animate-pulse">
              <CheckCircle className="h-5 w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              {stats.totalFittings.toLocaleString()}
            </div>
            <p className="text-xs text-blue-200/70 font-medium">Across all tracks</p>
          </CardContent>
        </Card>

        <Card className="glass-effect border-white/20 card-hover animate-slide-in-left shadow-xl" style={{ animationDelay: '0.1s' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-bold text-blue-100">Critical Alerts</CardTitle>
            <div className="p-2 bg-gradient-to-br from-red-400 to-red-600 rounded-lg animate-pulse">
              <AlertTriangle className="h-5 w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-400">{stats.criticalAlerts}</div>
            <p className="text-xs text-blue-200/70 font-medium">Require immediate attention</p>
          </CardContent>
        </Card>

        <Card className="glass-effect border-white/20 card-hover animate-slide-in-left shadow-xl" style={{ animationDelay: '0.2s' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-bold text-blue-100">Due Inspections</CardTitle>
            <div className="p-2 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg animate-pulse">
              <Clock className="h-5 w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-amber-400">{stats.dueInspections}</div>
            <p className="text-xs text-blue-200/70 font-medium">This week</p>
          </CardContent>
        </Card>

        <Card className="glass-effect border-white/20 card-hover animate-slide-in-left shadow-xl" style={{ animationDelay: '0.3s' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-bold text-blue-100">Maintenance Complete</CardTitle>
            <div className="p-2 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg animate-pulse">
              <Wrench className="h-5 w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-400">{stats.completedMaintenance}%</div>
            <p className="text-xs text-blue-200/70 font-medium">This month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Failure Analysis Chart */}
        <Card className="glass-effect border-white/20 shadow-xl animate-slide-in-right">
          <CardHeader>
            <CardTitle className="text-lg font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-400" />
              Failure Analysis by Component Type
            </CardTitle>
            <CardDescription className="text-blue-200/70">Number of failures in the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={failureData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" tick={{ fill: '#bfdbfe', fontSize: 12 }} />
                <YAxis tick={{ fill: '#bfdbfe', fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(30, 58, 138, 0.95)', 
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '8px',
                    color: 'white'
                  }} 
                />
                <Bar dataKey="failures" fill="url(#barGradient)" radius={4} />
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#1e40af" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Age Distribution Pie Chart */}
        <Card className="glass-effect border-white/20 shadow-xl animate-slide-in-right" style={{ animationDelay: '0.1s' }}>
          <CardHeader>
            <CardTitle className="text-lg font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent flex items-center gap-2">
              <div className="p-1 bg-gradient-to-br from-purple-400 to-purple-600 rounded">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
              Fitting Age Distribution
            </CardTitle>
            <CardDescription className="text-blue-200/70">Distribution by installation age</CardDescription>
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
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(30, 58, 138, 0.95)', 
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '8px',
                    color: 'white'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Maintenance Trend */}
        <Card className="lg:col-span-2 glass-effect border-white/20 shadow-xl animate-slide-in-left">
          <CardHeader>
            <CardTitle className="text-xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent flex items-center gap-2">
              <div className="p-1 bg-gradient-to-br from-green-400 to-green-600 rounded animate-pulse">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              Maintenance Trends
            </CardTitle>
            <CardDescription className="text-blue-200/70">Monthly maintenance activities</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={maintenanceTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="month" tick={{ fill: '#bfdbfe', fontSize: 12 }} />
                <YAxis tick={{ fill: '#bfdbfe', fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(30, 58, 138, 0.95)', 
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '8px',
                    color: 'white'
                  }} 
                />
                <Line type="monotone" dataKey="scheduled" stroke="#3b82f6" strokeWidth={3} dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }} />
                <Line type="monotone" dataKey="completed" stroke="#22c55e" strokeWidth={3} dot={{ fill: '#22c55e', strokeWidth: 2, r: 4 }} />
                <Line type="monotone" dataKey="emergency" stroke="#ef4444" strokeWidth={3} dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Critical Fittings */}
        <Card className="glass-effect border-white/20 shadow-xl animate-slide-in-right">
          <CardHeader>
            <CardTitle className="text-lg font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent flex items-center gap-2">
              <div className="p-1 bg-gradient-to-br from-red-400 to-red-600 rounded animate-pulse">
                <AlertTriangle className="w-4 h-4 text-white" />
              </div>
              Critical Fittings
            </CardTitle>
            <CardDescription className="text-blue-200/70">Requiring immediate attention</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {criticalFittings.map((fitting, index) => (
              <div
                key={fitting.id}
                className="p-4 border border-white/20 rounded-xl cursor-pointer hover:bg-white/10 transition-all duration-300 hover:transform hover:translate-x-1 glass-effect animate-slide-in-left"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => onNavigateToFitting(fitting.id)}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-sm text-blue-200 font-bold">{fitting.id}</span>
                  <Badge 
                    className={fitting.risk === 'Critical' 
                      ? 'bg-gradient-to-r from-red-500 to-red-600 text-white animate-pulse' 
                      : 'bg-gradient-to-r from-orange-400 to-orange-500 text-white'
                    }
                  >
                    {fitting.risk}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-xs text-blue-200/80">
                  <MapPin className="w-3 h-3 text-blue-400" />
                  {fitting.location}
                </div>
                <p className="text-xs text-blue-200/60 mt-1">
                  Last inspected: {fitting.lastInspection}
                </p>
              </div>
            ))}
            <Button 
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:-translate-y-1" 
              size="sm"
            >
              View All Critical Fittings
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Risk Zones Progress */}
      <Card className="glass-effect border-white/20 shadow-xl animate-scale-in">
        <CardHeader>
          <CardTitle className="text-xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent flex items-center gap-2">
            <div className="p-2 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg animate-glow">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            Risk Zone Overview
          </CardTitle>
          <CardDescription className="text-blue-200/70">Track sections categorized by risk level</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3 animate-slide-in-left">
              <div className="flex justify-between text-sm">
                <span className="text-blue-200 font-medium">Low Risk Zones</span>
                <span className="text-green-400 font-bold">78%</span>
              </div>
              <div className="relative">
                <Progress value={78} className="h-3 bg-white/10" />
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 rounded-full opacity-80" style={{ width: '78%' }} />
              </div>
              <p className="text-xs text-blue-200/70 font-medium">245 sections</p>
            </div>
            <div className="space-y-3 animate-slide-in-left" style={{ animationDelay: '0.1s' }}>
              <div className="flex justify-between text-sm">
                <span className="text-blue-200 font-medium">Medium Risk Zones</span>
                <span className="text-yellow-400 font-bold">18%</span>
              </div>
              <div className="relative">
                <Progress value={18} className="h-3 bg-white/10" />
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-80" style={{ width: '18%' }} />
              </div>
              <p className="text-xs text-blue-200/70 font-medium">56 sections</p>
            </div>
            <div className="space-y-3 animate-slide-in-left" style={{ animationDelay: '0.2s' }}>
              <div className="flex justify-between text-sm">
                <span className="text-blue-200 font-medium">High Risk Zones</span>
                <span className="text-red-400 font-bold">4%</span>
              </div>
              <div className="relative">
                <Progress value={4} className="h-3 bg-white/10" />
                <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-600 rounded-full opacity-80 animate-pulse" style={{ width: '4%' }} />
              </div>
              <p className="text-xs text-blue-200/70 font-medium">12 sections</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}