import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ZoomIn, ZoomOut, MapPin, Search, Filter } from 'lucide-react';

interface TrackMapProps {
  onNavigateToFitting: (fittingId: string) => void;
}

interface Fitting {
  id: string;
  x: number;
  y: number;
  status: 'healthy' | 'needs-inspection' | 'high-risk' | 'critical';
  type: string;
  location: string;
}

export function TrackMap({ onNavigateToFitting }: TrackMapProps) {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [selectedTrack, setSelectedTrack] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock fitting data for the map
  const fittings: Fitting[] = [
    { id: 'RF-2301-A45', x: 150, y: 120, status: 'critical', type: 'Rail Clip', location: 'KM 245.3' },
    { id: 'RF-2301-B12', x: 280, y: 180, status: 'high-risk', type: 'Bolt', location: 'KM 198.7' },
    { id: 'RF-2301-C78', x: 420, y: 140, status: 'needs-inspection', type: 'Plate', location: 'KM 312.1' },
    { id: 'RF-2301-D33', x: 350, y: 220, status: 'healthy', type: 'Anchor', location: 'KM 267.5' },
    { id: 'RF-2301-E89', x: 200, y: 300, status: 'healthy', type: 'Joint', location: 'KM 189.2' },
    { id: 'RF-2301-F56', x: 480, y: 260, status: 'needs-inspection', type: 'Rail Clip', location: 'KM 398.1' },
    { id: 'RF-2301-G23', x: 120, y: 250, status: 'high-risk', type: 'Bolt', location: 'KM 156.8' },
    { id: 'RF-2301-H91', x: 390, y: 320, status: 'healthy', type: 'Plate', location: 'KM 334.7' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return '#22c55e';
      case 'needs-inspection': return '#f59e0b';
      case 'high-risk': return '#f97316';
      case 'critical': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'healthy': return 'Healthy';
      case 'needs-inspection': return 'Needs Inspection';
      case 'high-risk': return 'High Risk';
      case 'critical': return 'Critical';
      default: return 'Unknown';
    }
  };

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.2, 3));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.2, 0.5));

  return (
    <div className="space-y-6">
      {/* Map Controls */}
      <Card className="glass-effect border-white/20 shadow-xl animate-slide-in-left">
        <CardHeader>
          <CardTitle className="text-xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent flex items-center gap-2">
            <div className="p-2 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg animate-glow">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            Interactive Track Map
          </CardTitle>
          <CardDescription className="text-blue-200/70">
            Click on any fitting to view detailed information. Use zoom controls to explore track sections.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 mb-4">
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4" />
              <Input
                placeholder="Search by fitting ID or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64"
              />
            </div>
            <Select value={selectedTrack} onValueChange={setSelectedTrack}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Select track" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tracks</SelectItem>
                <SelectItem value="track-1">Track 1</SelectItem>
                <SelectItem value="track-2">Track 2</SelectItem>
                <SelectItem value="track-3">Track 3</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleZoomOut}>
                <ZoomOut className="w-4 h-4" />
              </Button>
              <span className="text-sm px-2">{Math.round(zoomLevel * 100)}%</span>
              <Button variant="outline" size="sm" onClick={handleZoomIn}>
                <ZoomIn className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Status Legend */}
          <div className="flex flex-wrap gap-4 mb-6">
            {[
              { status: 'healthy', count: 3 },
              { status: 'needs-inspection', count: 2 },
              { status: 'high-risk', count: 2 },
              { status: 'critical', count: 1 }
            ].map(({ status, count }) => (
              <div key={status} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: getStatusColor(status) }}
                />
                <span className="text-sm">{getStatusLabel(status)} ({count})</span>
              </div>
            ))}
          </div>

          {/* Map Container */}
          <div className="border border-white/20 rounded-xl overflow-hidden glass-effect shadow-inner">
            <div className="relative bg-gradient-to-br from-slate-800 to-slate-900">
              <svg
                width="100%"
                height="400"
                viewBox="0 0 600 400"
                style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center' }}
                className="transition-transform duration-300"
              >
                <defs>
                  <linearGradient id="trackGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#64748b" />
                    <stop offset="100%" stopColor="#475569" />
                  </linearGradient>
                  <linearGradient id="railGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#cbd5e1" />
                    <stop offset="100%" stopColor="#94a3b8" />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                    <feMerge> 
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>

                {/* Railway Track Lines */}
                <g>
                  {/* Track bed */}
                  <rect x="40" y="140" width="520" height="30" fill="url(#trackGradient)" rx="15" />
                  <rect x="40" y="190" width="520" height="30" fill="url(#trackGradient)" rx="15" />
                  <rect x="40" y="240" width="520" height="30" fill="url(#trackGradient)" rx="15" />

                  {/* Track 1 */}
                  <line x1="50" y1="150" x2="550" y2="150" stroke="url(#railGradient)" strokeWidth="6" />
                  <line x1="50" y1="160" x2="550" y2="160" stroke="url(#railGradient)" strokeWidth="6" />
                  
                  {/* Track 2 */}
                  <line x1="50" y1="200" x2="550" y2="200" stroke="url(#railGradient)" strokeWidth="6" />
                  <line x1="50" y1="210" x2="550" y2="210" stroke="url(#railGradient)" strokeWidth="6" />
                  
                  {/* Track 3 */}
                  <line x1="50" y1="250" x2="550" y2="250" stroke="url(#railGradient)" strokeWidth="6" />
                  <line x1="50" y1="260" x2="550" y2="260" stroke="url(#railGradient)" strokeWidth="6" />

                  {/* Railway Sleepers */}
                  {Array.from({ length: 20 }, (_, i) => (
                    <g key={i}>
                      <rect 
                        x={50 + i * 25} 
                        y="130" 
                        width="6" 
                        height="150" 
                        fill="#8b5a3c" 
                        rx="3"
                        className="animate-track-pulse"
                        style={{ animationDelay: `${i * 0.1}s` }}
                      />
                    </g>
                  ))}

                  {/* Electric lines */}
                  <line x1="50" y1="100" x2="550" y2="100" stroke="#3b82f6" strokeWidth="2" opacity="0.8" className="animate-pulse" />
                  <line x1="50" y1="300" x2="550" y2="300" stroke="#3b82f6" strokeWidth="2" opacity="0.8" className="animate-pulse" />
                </g>

                {/* Fittings */}
                {fittings.map((fitting, index) => (
                  <g key={fitting.id} className="animate-float" style={{ animationDelay: `${index * 0.2}s` }}>
                    <circle
                      cx={fitting.x}
                      cy={fitting.y}
                      r="10"
                      fill={getStatusColor(fitting.status)}
                      stroke="#ffffff"
                      strokeWidth="3"
                      className="cursor-pointer transition-all duration-300"
                      onClick={() => onNavigateToFitting(fitting.id)}
                      filter="url(#glow)"
                    />
                    <circle
                      cx={fitting.x}
                      cy={fitting.y}
                      r="15"
                      fill="none"
                      stroke={getStatusColor(fitting.status)}
                      strokeWidth="2"
                      opacity="0.3"
                      className={fitting.status === 'critical' ? 'animate-pulse' : ''}
                    />
                    <text
                      x={fitting.x}
                      y={fitting.y - 25}
                      textAnchor="middle"
                      className="text-xs fill-white font-mono font-bold"
                      style={{ fontSize: '10px' }}
                    >
                      {fitting.id.split('-').pop()}
                    </text>
                  </g>
                ))}

                {/* Distance markers */}
                {Array.from({ length: 6 }, (_, i) => (
                  <text
                    key={i}
                    x={100 + i * 80}
                    y="100"
                    textAnchor="middle"
                    className="text-xs fill-muted-foreground"
                    style={{ fontSize: '12px' }}
                  >
                    KM {150 + i * 50}
                  </text>
                ))}
              </svg>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Track Section Information */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass-effect border-white/20 shadow-xl card-hover animate-slide-in-left">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-blue-200">Track Section Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-blue-200">Total Sections</span>
                <Badge className="bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg">15</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-blue-200">Active Monitoring</span>
                <Badge className="bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg animate-pulse">12</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-blue-200">Requires Attention</span>
                <Badge className="bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg animate-pulse">3</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect border-white/20 shadow-xl card-hover animate-slide-in-left" style={{ animationDelay: '0.1s' }}>
          <CardHeader>
            <CardTitle className="text-lg font-bold text-blue-200">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3 animate-slide-in-right">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                <span className="text-blue-200">Inspection completed at KM 245</span>
              </div>
              <div className="flex items-center gap-3 animate-slide-in-right" style={{ animationDelay: '0.1s' }}>
                <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse" />
                <span className="text-blue-200">New fitting installed at KM 312</span>
              </div>
              <div className="flex items-center gap-3 animate-slide-in-right" style={{ animationDelay: '0.2s' }}>
                <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse" />
                <span className="text-blue-200">Alert: High vibration detected</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect border-white/20 shadow-xl card-hover animate-slide-in-left" style={{ animationDelay: '0.2s' }}>
          <CardHeader>
            <CardTitle className="text-lg font-bold text-blue-200">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:-translate-y-1" size="sm">
              <MapPin className="w-4 h-4 mr-2" />
              Generate Route Plan
            </Button>
            <Button className="w-full justify-start bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:-translate-y-1" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter Critical Fittings
            </Button>
            <Button className="w-full justify-start bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:-translate-y-1" size="sm">
              Export Map Data
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}