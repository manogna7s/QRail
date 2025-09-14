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
      <Card>
        <CardHeader>
          <CardTitle>Interactive Track Map</CardTitle>
          <CardDescription>
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
          <div className="border rounded-lg overflow-hidden bg-muted/20">
            <div className="relative">
              <svg
                width="100%"
                height="400"
                viewBox="0 0 600 400"
                style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center' }}
                className="transition-transform duration-200"
              >
                {/* Railway Track Lines */}
                <g>
                  {/* Track 1 */}
                  <line x1="50" y1="150" x2="550" y2="150" stroke="#374151" strokeWidth="8" />
                  <line x1="50" y1="160" x2="550" y2="160" stroke="#374151" strokeWidth="8" />
                  
                  {/* Track 2 */}
                  <line x1="50" y1="200" x2="550" y2="200" stroke="#374151" strokeWidth="8" />
                  <line x1="50" y1="210" x2="550" y2="210" stroke="#374151" strokeWidth="8" />
                  
                  {/* Track 3 */}
                  <line x1="50" y1="250" x2="550" y2="250" stroke="#374151" strokeWidth="8" />
                  <line x1="50" y1="260" x2="550" y2="260" stroke="#374151" strokeWidth="8" />

                  {/* Railway Sleepers */}
                  {Array.from({ length: 20 }, (_, i) => (
                    <g key={i}>
                      <rect x={50 + i * 25} y="130" width="4" height="150" fill="#8b5cf6" />
                    </g>
                  ))}
                </g>

                {/* Fittings */}
                {fittings.map((fitting) => (
                  <g key={fitting.id}>
                    <circle
                      cx={fitting.x}
                      cy={fitting.y}
                      r="8"
                      fill={getStatusColor(fitting.status)}
                      stroke="#ffffff"
                      strokeWidth="2"
                      className="cursor-pointer hover:r-10 transition-all"
                      onClick={() => onNavigateToFitting(fitting.id)}
                    />
                    <text
                      x={fitting.x}
                      y={fitting.y - 15}
                      textAnchor="middle"
                      className="text-xs fill-current font-mono"
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Track Section Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Total Sections</span>
                <Badge variant="outline">15</Badge>
              </div>
              <div className="flex justify-between">
                <span>Active Monitoring</span>
                <Badge className="bg-green-100 text-green-800">12</Badge>
              </div>
              <div className="flex justify-between">
                <span>Requires Attention</span>
                <Badge variant="destructive">3</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span>Inspection completed at KM 245</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                <span>New fitting installed at KM 312</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full" />
                <span>Alert: High vibration detected</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full justify-start" size="sm">
              <MapPin className="w-4 h-4 mr-2" />
              Generate Route Plan
            </Button>
            <Button variant="outline" className="w-full justify-start" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter Critical Fittings
            </Button>
            <Button variant="outline" className="w-full justify-start" size="sm">
              Export Map Data
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}