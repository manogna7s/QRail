import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { Camera, Scan, Type, CheckCircle, AlertTriangle, Search, Upload } from 'lucide-react';

interface QRScannerProps {
  onNavigateToFitting: (fittingId: string) => void;
}

export function QRScanner({ onNavigateToFitting }: QRScannerProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [manualInput, setManualInput] = useState('');
  const [scanResult, setScanResult] = useState<any>(null);
  const [scanHistory, setScanHistory] = useState([
    { id: 'RF-2301-A45', timestamp: '2024-09-09 14:30', status: 'critical', location: 'KM 245.3' },
    { id: 'RF-2301-B12', timestamp: '2024-09-09 13:15', status: 'needs-inspection', location: 'KM 198.7' },
    { id: 'RF-2301-C78', timestamp: '2024-09-09 12:00', status: 'healthy', location: 'KM 312.1' }
  ]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mock scan result data
  const mockScanResult = {
    id: 'RF-2301-A45',
    type: 'Rail Clip',
    location: 'KM 245.3, Track 1',
    status: 'critical',
    lastInspection: '15 days ago',
    riskScore: 85,
    nextAction: 'Immediate replacement required'
  };

  const handleStartScanning = () => {
    setIsScanning(true);
    // Simulate camera scanning
    setTimeout(() => {
      setIsScanning(false);
      setScanResult(mockScanResult);
      setScanHistory(prev => [{
        id: mockScanResult.id,
        timestamp: new Date().toLocaleString(),
        status: mockScanResult.status,
        location: mockScanResult.location
      }, ...prev.slice(0, 4)]);
    }, 3000);
  };

  const handleManualSearch = () => {
    if (manualInput.trim()) {
      // Simulate manual ID lookup
      setScanResult({
        ...mockScanResult,
        id: manualInput.trim()
      });
      setManualInput('');
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Simulate QR code reading from uploaded image
      setTimeout(() => {
        setScanResult(mockScanResult);
      }, 1000);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'bg-green-100 text-green-800';
      case 'needs-inspection': return 'bg-yellow-100 text-yellow-800';
      case 'high-risk': return 'bg-orange-100 text-orange-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Scanner Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Camera Scanner */}
        <Card className="glass-effect border-white/20 shadow-xl animate-slide-in-left">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-lg font-bold text-blue-200">
              <div className="p-2 bg-gradient-to-br from-green-400 to-green-600 rounded-lg animate-glow">
                <Camera className="w-5 h-5 text-white" />
              </div>
              Camera QR Scanner
            </CardTitle>
            <CardDescription className="text-blue-200/70">
              Point your camera at a QR code on any track fitting
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <div className="aspect-square glass-effect border-white/20 rounded-xl flex items-center justify-center overflow-hidden shadow-inner">
                {isScanning ? (
                  <div className="relative w-full h-full bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
                    <div className="absolute inset-4 border-2 border-blue-400/70 rounded-lg animate-pulse">
                      <div className="absolute top-0 left-0 w-8 h-8 border-t-3 border-l-3 border-blue-400 animate-pulse"></div>
                      <div className="absolute top-0 right-0 w-8 h-8 border-t-3 border-r-3 border-blue-400 animate-pulse"></div>
                      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-3 border-l-3 border-blue-400 animate-pulse"></div>
                      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-3 border-r-3 border-blue-400 animate-pulse"></div>
                    </div>
                    <div className="text-center z-10">
                      <Scan className="w-16 h-16 mx-auto mb-4 text-blue-400 animate-spin" />
                      <p className="text-blue-200 font-bold mb-2">Scanning for QR Code...</p>
                      <p className="text-sm text-blue-300/70">Position the QR code within the frame</p>
                      <div className="flex justify-center mt-4 space-x-1">
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="relative inline-block mb-4">
                      <Camera className="w-20 h-20 mx-auto text-blue-300/50 animate-float" />
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center animate-pulse">
                        <Scan className="w-3 h-3 text-white" />
                      </div>
                    </div>
                    <p className="text-blue-200 font-medium mb-1">Camera view will appear here</p>
                    <p className="text-sm text-blue-300/70">Click "Start Scanning" to activate</p>
                  </div>
                )}
              </div>
            </div>
            
            <Button
              onClick={handleStartScanning}
              disabled={isScanning}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:-translate-y-1"
              size="lg"
            >
              {isScanning ? (
                <>
                  <Scan className="w-5 h-5 mr-2 animate-spin" />
                  Scanning...
                </>
              ) : (
                <>
                  <Camera className="w-5 h-5 mr-2" />
                  Start Scanning
                </>
              )}
            </Button>

            <div className="flex gap-2">
              <Button
                onClick={() => fileInputRef.current?.click()}
                className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:-translate-y-1"
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload Image
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
          </CardContent>
        </Card>

        {/* Manual Input */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Type className="w-5 h-5" />
              Manual ID Lookup
            </CardTitle>
            <CardDescription>
              Enter a fitting ID manually if QR code is not readable
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm">Fitting ID</label>
              <div className="flex gap-2">
                <Input
                  placeholder="e.g., RF-2301-A45"
                  value={manualInput}
                  onChange={(e) => setManualInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleManualSearch()}
                />
                <Button onClick={handleManualSearch} disabled={!manualInput.trim()}>
                  <Search className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm">Quick Access</h4>
              <div className="grid grid-cols-2 gap-2">
                {['RF-2301-A45', 'RF-2301-B12', 'RF-2301-C78', 'RF-2301-D33'].map((id) => (
                  <Button
                    key={id}
                    variant="outline"
                    size="sm"
                    onClick={() => onNavigateToFitting(id)}
                    className="font-mono text-xs"
                  >
                    {id}
                  </Button>
                ))}
              </div>
            </div>

            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                If QR code is damaged or unreadable, use the manual lookup feature or report the issue for re-marking.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>

      {/* Scan Result */}
      {scanResult && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              Scan Result
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg">{scanResult.id}</h3>
                  <p className="text-muted-foreground">{scanResult.location}</p>
                </div>
                
                <div className="flex items-center gap-2">
                  <span>Status:</span>
                  <Badge className={getStatusColor(scanResult.status)}>
                    {scanResult.status.replace('-', ' ').toUpperCase()}
                  </Badge>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Type:</span>
                    <span>{scanResult.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Last Inspection:</span>
                    <span>{scanResult.lastInspection}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Risk Score:</span>
                    <span className="font-semibold text-red-600">{scanResult.riskScore}/100</span>
                  </div>
                </div>

                {scanResult.nextAction && (
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Action Required:</strong> {scanResult.nextAction}
                    </AlertDescription>
                  </Alert>
                )}
              </div>

              <div className="space-y-2">
                <Button
                  onClick={() => onNavigateToFitting(scanResult.id)}
                  className="w-full"
                >
                  View Full Details
                </Button>
                <Button variant="outline" className="w-full">
                  Schedule Maintenance
                </Button>
                <Button variant="outline" className="w-full">
                  Generate Report
                </Button>
                <Button variant="outline" className="w-full">
                  Add to Inspection List
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Scan History */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Scans</CardTitle>
          <CardDescription>Your scanning history for this session</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {scanHistory.map((scan, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                onClick={() => onNavigateToFitting(scan.id)}
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <div>
                    <p className="font-mono text-sm">{scan.id}</p>
                    <p className="text-xs text-muted-foreground">{scan.location}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant="outline" className={getStatusColor(scan.status)}>
                    {scan.status.replace('-', ' ')}
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-1">{scan.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}