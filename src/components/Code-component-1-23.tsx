import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { Progress } from './ui/progress';
import { ArrowLeft, QrCode, MapPin, Calendar, Wrench, AlertTriangle, Download, Edit } from 'lucide-react';

interface FittingDetailsProps {
  fittingId?: string;
  onBack: () => void;
}

export function FittingDetails({ fittingId = 'RF-2301-A45', onBack }: FittingDetailsProps) {
  // Mock fitting data
  const fitting = {
    id: fittingId,
    qrCode: `data:image/svg+xml;base64,${btoa(`
      <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" fill="white"/>
        <g fill="black">
          <rect x="10" y="10" width="5" height="5"/>
          <rect x="20" y="10" width="5" height="5"/>
          <rect x="30" y="10" width="5" height="5"/>
          <rect x="50" y="10" width="5" height="5"/>
          <rect x="70" y="10" width="5" height="5"/>
          <rect x="80" y="10" width="5" height="5"/>
          <rect x="10" y="20" width="5" height="5"/>
          <rect x="80" y="20" width="5" height="5"/>
          <rect x="10" y="30" width="5" height="5"/>
          <rect x="25" y="30" width="5" height="5"/>
          <rect x="35" y="30" width="5" height="5"/>
          <rect x="55" y="30" width="5" height="5"/>
          <rect x="80" y="30" width="5" height="5"/>
          <rect x="10" y="40" width="5" height="5"/>
          <rect x="25" y="40" width="5" height="5"/>
          <rect x="35" y="40" width="5" height="5"/>
          <rect x="55" y="40" width="5" height="5"/>
          <rect x="80" y="40" width="5" height="5"/>
          <rect x="10" y="50" width="5" height="5"/>
          <rect x="25" y="50" width="5" height="5"/>
          <rect x="35" y="50" width="5" height="5"/>
          <rect x="55" y="50" width="5" height="5"/>
          <rect x="80" y="50" width="5" height="5"/>
          <rect x="10" y="60" width="5" height="5"/>
          <rect x="80" y="60" width="5" height="5"/>
          <rect x="10" y="70" width="5" height="5"/>
          <rect x="20" y="70" width="5" height="5"/>
          <rect x="30" y="70" width="5" height="5"/>
          <rect x="50" y="70" width="5" height="5"/>
          <rect x="70" y="70" width="5" height="5"/>
          <rect x="80" y="70" width="5" height="5"/>
        </g>
      </svg>
    `)}`,
    type: 'Rail Clip',
    location: 'KM 245.3, Track 1, Section A',
    coordinates: { lat: 28.6139, lng: 77.2090 },
    installationDate: '2021-03-15',
    lastMaintenance: '2024-08-20',
    nextInspection: '2024-10-15',
    status: 'critical',
    riskScore: 85,
    material: 'High Carbon Steel',
    manufacturer: 'Indian Railway Components Ltd.',
    batchNumber: 'IRC-2021-03-455',
    specifications: {
      weight: '2.5 kg',
      dimensions: '150mm x 80mm x 30mm',
      torqueSpec: '180 Nm',
      temperatureRange: '-40°C to 60°C'
    }
  };

  const maintenanceHistory = [
    {
      date: '2024-08-20',
      type: 'Preventive Maintenance',
      technician: 'R. Sharma',
      notes: 'Routine inspection and cleaning. Minor wear detected.',
      status: 'completed'
    },
    {
      date: '2024-05-12',
      type: 'Emergency Repair',
      technician: 'K. Patel',
      notes: 'Loose fitting tightened. Torque adjusted to specification.',
      status: 'completed'
    },
    {
      date: '2024-02-08',
      type: 'Preventive Maintenance',
      technician: 'A. Singh',
      notes: 'Regular inspection. No issues found.',
      status: 'completed'
    },
    {
      date: '2023-11-15',
      type: 'Replacement',
      technician: 'M. Kumar',
      notes: 'Replaced worn rail clip with new component.',
      status: 'completed'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'bg-green-100 text-green-800';
      case 'needs-inspection': return 'bg-yellow-100 text-yellow-800';
      case 'high-risk': return 'bg-orange-100 text-orange-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskColor = (score: number) => {
    if (score >= 80) return 'text-red-600';
    if (score >= 60) return 'text-orange-500';
    if (score >= 40) return 'text-yellow-500';
    return 'text-green-600';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl">Fitting Details: {fitting.id}</h1>
          <p className="text-muted-foreground">{fitting.location}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Edit className="w-4 h-4 mr-2" />
            Edit Details
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* QR Code and Basic Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <QrCode className="w-5 h-5" />
              QR Code & Basic Info
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-center">
              <img 
                src={fitting.qrCode} 
                alt={`QR Code for ${fitting.id}`}
                className="w-32 h-32 border rounded"
              />
            </div>
            <div className="text-center">
              <p className="font-mono text-sm">{fitting.id}</p>
              <Badge className={getStatusColor(fitting.status)}>
                {fitting.status.replace('-', ' ').toUpperCase()}
              </Badge>
            </div>
            <Separator />
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Type:</span>
                <span>{fitting.type}</span>
              </div>
              <div className="flex justify-between">
                <span>Material:</span>
                <span>{fitting.material}</span>
              </div>
              <div className="flex justify-between">
                <span>Manufacturer:</span>
                <span className="text-right text-xs">{fitting.manufacturer}</span>
              </div>
              <div className="flex justify-between">
                <span>Batch:</span>
                <span className="font-mono text-xs">{fitting.batchNumber}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Status and Risk Assessment */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Status & Risk Assessment
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span>Risk Score</span>
                <span className={`font-bold ${getRiskColor(fitting.riskScore)}`}>
                  {fitting.riskScore}/100
                </span>
              </div>
              <Progress value={fitting.riskScore} className="h-2" />
              <p className="text-xs text-muted-foreground mt-1">
                Based on age, usage, and maintenance history
              </p>
            </div>
            
            <Separator />
            
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-sm">Next Inspection</p>
                  <p className="text-xs text-muted-foreground">{fitting.nextInspection}</p>
                </div>
                <Badge variant="outline">Due Soon</Badge>
              </div>
              
              <div className="flex items-center gap-2">
                <Wrench className="w-4 h-4 text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-sm">Last Maintenance</p>
                  <p className="text-xs text-muted-foreground">{fitting.lastMaintenance}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-sm">Installed</p>
                  <p className="text-xs text-muted-foreground">{fitting.installationDate}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Technical Specifications */}
        <Card>
          <CardHeader>
            <CardTitle>Technical Specifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Weight:</span>
                <span>{fitting.specifications.weight}</span>
              </div>
              <div className="flex justify-between">
                <span>Dimensions:</span>
                <span className="text-right">{fitting.specifications.dimensions}</span>
              </div>
              <div className="flex justify-between">
                <span>Torque Spec:</span>
                <span>{fitting.specifications.torqueSpec}</span>
              </div>
              <div className="flex justify-between">
                <span>Temperature Range:</span>
                <span className="text-right">{fitting.specifications.temperatureRange}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span>Coordinates:</span>
                <span className="font-mono text-xs">
                  {fitting.coordinates.lat}, {fitting.coordinates.lng}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Maintenance History */}
      <Card>
        <CardHeader>
          <CardTitle>Maintenance History Timeline</CardTitle>
          <CardDescription>Complete maintenance and inspection record</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {maintenanceHistory.map((record, index) => (
              <div key={index} className="flex gap-4 pb-4 border-b last:border-b-0">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 bg-primary rounded-full" />
                  {index < maintenanceHistory.length - 1 && (
                    <div className="w-0.5 h-16 bg-border mt-2" />
                  )}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{record.type}</h4>
                    <Badge variant="outline">{record.status}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {record.date} • Technician: {record.technician}
                  </p>
                  <p className="text-sm">{record.notes}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button variant="default">
              Schedule Inspection
            </Button>
            <Button variant="outline">
              Request Maintenance
            </Button>
            <Button variant="outline">
              Generate Report
            </Button>
            <Button variant="outline">
              View on Map
            </Button>
            <Button variant="destructive">
              Mark for Replacement
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}