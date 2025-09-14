import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { FileText, Download, Calendar as CalendarIcon, Filter, TrendingUp, AlertTriangle } from 'lucide-react';

export function Reports() {
  const [selectedReport, setSelectedReport] = useState('maintenance-summary');
  const [dateRange, setDateRange] = useState<any>(null);

  const reportTypes = [
    { id: 'maintenance-summary', name: 'Maintenance Summary', description: 'Overview of all maintenance activities' },
    { id: 'risk-assessment', name: 'Risk Assessment', description: 'Fittings categorized by risk levels' },
    { id: 'failure-analysis', name: 'Failure Analysis', description: 'Component failure patterns and trends' },
    { id: 'inspection-schedule', name: 'Inspection Schedule', description: 'Upcoming and overdue inspections' },
    { id: 'cost-analysis', name: 'Cost Analysis', description: 'Maintenance and replacement costs' },
    { id: 'compliance-report', name: 'Compliance Report', description: 'Safety and regulatory compliance status' }
  ];

  // Mock data for charts
  const maintenanceByMonth = [
    { month: 'Jan', preventive: 45, corrective: 12, emergency: 3 },
    { month: 'Feb', preventive: 52, corrective: 8, emergency: 5 },
    { month: 'Mar', preventive: 48, corrective: 15, emergency: 2 },
    { month: 'Apr', preventive: 61, corrective: 10, emergency: 7 },
    { month: 'May', preventive: 55, corrective: 13, emergency: 4 },
    { month: 'Jun', preventive: 58, corrective: 9, emergency: 6 }
  ];

  const riskDistribution = [
    { name: 'Low Risk', value: 245, color: '#22c55e' },
    { name: 'Medium Risk', value: 89, color: '#f59e0b' },
    { name: 'High Risk', value: 34, color: '#f97316' },
    { name: 'Critical', value: 12, color: '#ef4444' }
  ];

  const costTrends = [
    { month: 'Jan', maintenance: 45000, replacement: 120000 },
    { month: 'Feb', maintenance: 52000, replacement: 85000 },
    { month: 'Mar', maintenance: 48000, replacement: 150000 },
    { month: 'Apr', maintenance: 61000, replacement: 95000 },
    { month: 'May', maintenance: 55000, replacement: 110000 },
    { month: 'Jun', maintenance: 58000, replacement: 135000 }
  ];

  const generateReport = () => {
    // Simulate report generation
    const reportData = {
      title: reportTypes.find(r => r.id === selectedReport)?.name || 'Report',
      generatedAt: new Date().toLocaleString(),
      data: 'Mock report data would be generated here...'
    };
    
    console.log('Generating report:', reportData);
    
    // Create and download mock PDF
    const element = document.createElement('a');
    const file = new Blob(['Mock PDF report content'], { type: 'application/pdf' });
    element.href = URL.createObjectURL(file);
    element.download = `${selectedReport}-${new Date().toISOString().split('T')[0]}.pdf`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const exportData = (format: string) => {
    const data = maintenanceByMonth.map(item => ({
      Month: item.month,
      'Preventive Maintenance': item.preventive,
      'Corrective Maintenance': item.corrective,
      'Emergency Repairs': item.emergency
    }));

    if (format === 'csv') {
      const csv = [
        Object.keys(data[0]).join(','),
        ...data.map(row => Object.values(row).join(','))
      ].join('\n');
      
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${selectedReport}.csv`;
      a.click();
      window.URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="space-y-6">
      {/* Report Generation Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Generate Reports
          </CardTitle>
          <CardDescription>
            Create comprehensive reports for maintenance, compliance, and analysis
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm">Report Type</label>
              <Select value={selectedReport} onValueChange={setSelectedReport}>
                <SelectTrigger>
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  {reportTypes.map((report) => (
                    <SelectItem key={report.id} value={report.id}>
                      {report.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm">Date Range</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start">
                    <CalendarIcon className="w-4 h-4 mr-2" />
                    {dateRange ? 'Custom Range' : 'Select dates'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="range"
                    selected={dateRange}
                    onSelect={setDateRange}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <label className="text-sm">Actions</label>
              <div className="flex gap-2">
                <Button onClick={generateReport} className="flex-1">
                  <Download className="w-4 h-4 mr-2" />
                  Generate PDF
                </Button>
                <Button variant="outline" onClick={() => exportData('csv')}>
                  Export CSV
                </Button>
              </div>
            </div>
          </div>

          <div className="p-3 bg-muted/20 rounded-lg">
            <p className="text-sm">
              <strong>{reportTypes.find(r => r.id === selectedReport)?.name}:</strong>{' '}
              {reportTypes.find(r => r.id === selectedReport)?.description}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Report Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Maintenance Summary Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Maintenance Activities by Month</CardTitle>
            <CardDescription>Breakdown of maintenance types</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={maintenanceByMonth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="preventive" stackId="a" fill="#22c55e" />
                <Bar dataKey="corrective" stackId="a" fill="#f59e0b" />
                <Bar dataKey="emergency" stackId="a" fill="#ef4444" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Risk Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Risk Distribution</CardTitle>
            <CardDescription>Current risk levels across all fittings</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={riskDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {riskDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Cost Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Cost Analysis Trends</CardTitle>
          <CardDescription>Monthly maintenance and replacement costs</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={costTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`₹${value.toLocaleString()}`, '']} />
              <Line type="monotone" dataKey="maintenance" stroke="#3b82f6" strokeWidth={2} />
              <Line type="monotone" dataKey="replacement" stroke="#ef4444" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Quick Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {reportTypes.map((report) => (
          <Card
            key={report.id}
            className={`cursor-pointer transition-all hover:shadow-md ${
              selectedReport === report.id ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => setSelectedReport(report.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  {report.id === 'maintenance-summary' && <TrendingUp className="w-5 h-5 text-primary" />}
                  {report.id === 'risk-assessment' && <AlertTriangle className="w-5 h-5 text-primary" />}
                  {report.id === 'failure-analysis' && <FileText className="w-5 h-5 text-primary" />}
                  {report.id === 'inspection-schedule' && <CalendarIcon className="w-5 h-5 text-primary" />}
                  {report.id === 'cost-analysis' && <TrendingUp className="w-5 h-5 text-primary" />}
                  {report.id === 'compliance-report' && <FileText className="w-5 h-5 text-primary" />}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{report.name}</h4>
                  <p className="text-xs text-muted-foreground">{report.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Report Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Report Statistics</CardTitle>
          <CardDescription>Usage and generation metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">156</div>
              <p className="text-sm text-muted-foreground">Reports Generated</p>
              <Badge variant="outline">This Month</Badge>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">23</div>
              <p className="text-sm text-muted-foreground">Scheduled Reports</p>
              <Badge variant="outline">Active</Badge>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">2.3GB</div>
              <p className="text-sm text-muted-foreground">Data Exported</p>
              <Badge variant="outline">Total</Badge>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">98%</div>
              <p className="text-sm text-muted-foreground">Delivery Success</p>
              <Badge className="bg-green-100 text-green-800">Excellent</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}