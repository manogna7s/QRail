import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Search, Filter, Download, MapPin, Calendar, AlertTriangle } from 'lucide-react';

interface SearchPanelProps {
  onNavigateToFitting: (fittingId: string) => void;
}

interface Fitting {
  id: string;
  type: string;
  location: string;
  status: string;
  installDate: string;
  lastInspection: string;
  riskScore: number;
  nextInspection: string;
}

export function SearchPanel({ onNavigateToFitting }: SearchPanelProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  // Mock fitting data
  const allFittings: Fitting[] = [
    {
      id: 'RF-2301-A45',
      type: 'Rail Clip',
      location: 'KM 245.3, Track 1',
      status: 'critical',
      installDate: '2021-03-15',
      lastInspection: '2024-08-20',
      riskScore: 85,
      nextInspection: '2024-10-15'
    },
    {
      id: 'RF-2301-B12',
      type: 'Bolt',
      location: 'KM 198.7, Track 2',
      status: 'high-risk',
      installDate: '2020-11-22',
      lastInspection: '2024-08-18',
      riskScore: 72,
      nextInspection: '2024-10-18'
    },
    {
      id: 'RF-2301-C78',
      type: 'Plate',
      location: 'KM 312.1, Track 1',
      status: 'needs-inspection',
      installDate: '2022-01-10',
      lastInspection: '2024-08-25',
      riskScore: 45,
      nextInspection: '2024-10-25'
    },
    {
      id: 'RF-2301-D33',
      type: 'Anchor',
      location: 'KM 267.5, Track 3',
      status: 'healthy',
      installDate: '2023-06-12',
      lastInspection: '2024-09-01',
      riskScore: 25,
      nextInspection: '2024-12-01'
    },
    {
      id: 'RF-2301-E89',
      type: 'Joint',
      location: 'KM 189.2, Track 2',
      status: 'healthy',
      installDate: '2023-04-08',
      lastInspection: '2024-08-30',
      riskScore: 30,
      nextInspection: '2024-11-30'
    },
    {
      id: 'RF-2301-F56',
      type: 'Rail Clip',
      location: 'KM 398.1, Track 1',
      status: 'needs-inspection',
      installDate: '2021-09-14',
      lastInspection: '2024-08-22',
      riskScore: 55,
      nextInspection: '2024-10-22'
    },
    {
      id: 'RF-2301-G23',
      type: 'Bolt',
      location: 'KM 156.8, Track 3',
      status: 'high-risk',
      installDate: '2020-07-20',
      lastInspection: '2024-08-15',
      riskScore: 68,
      nextInspection: '2024-10-15'
    },
    {
      id: 'RF-2301-H91',
      type: 'Plate',
      location: 'KM 334.7, Track 2',
      status: 'healthy',
      installDate: '2022-12-05',
      lastInspection: '2024-09-02',
      riskScore: 35,
      nextInspection: '2024-12-02'
    }
  ];

  // Filter fittings based on search criteria
  const filteredFittings = allFittings.filter(fitting => {
    const matchesSearch = searchTerm === '' || 
      fitting.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fitting.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fitting.type.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = selectedType === 'all' || fitting.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || fitting.status === selectedStatus;
    const matchesLocation = selectedLocation === 'all' || fitting.location.includes(selectedLocation);

    return matchesSearch && matchesType && matchesStatus && matchesLocation;
  });

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

  const handleSelectAll = () => {
    if (selectedItems.length === filteredFittings.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredFittings.map(f => f.id));
    }
  };

  const handleItemSelect = (fittingId: string) => {
    setSelectedItems(prev => 
      prev.includes(fittingId)
        ? prev.filter(id => id !== fittingId)
        : [...prev, fittingId]
    );
  };

  const exportResults = () => {
    const csvContent = [
      ['ID', 'Type', 'Location', 'Status', 'Install Date', 'Last Inspection', 'Risk Score', 'Next Inspection'],
      ...filteredFittings.map(f => [
        f.id, f.type, f.location, f.status, f.installDate, f.lastInspection, f.riskScore.toString(), f.nextInspection
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'fitting_search_results.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Search and Filter Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Search & Filter Fittings
          </CardTitle>
          <CardDescription>
            Find specific fittings by ID, location, type, or condition
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Main Search */}
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search by fitting ID, location, or type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
            <Button variant="outline" onClick={exportResults}>
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>

          {/* Advanced Filters */}
          {showAdvancedFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-lg bg-muted/20">
              <div>
                <label className="text-sm mb-2 block">Fitting Type</label>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Rail Clip">Rail Clip</SelectItem>
                    <SelectItem value="Bolt">Bolt</SelectItem>
                    <SelectItem value="Plate">Plate</SelectItem>
                    <SelectItem value="Anchor">Anchor</SelectItem>
                    <SelectItem value="Joint">Joint</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm mb-2 block">Status</label>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="healthy">Healthy</SelectItem>
                    <SelectItem value="needs-inspection">Needs Inspection</SelectItem>
                    <SelectItem value="high-risk">High Risk</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm mb-2 block">Track</label>
                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Tracks" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Tracks</SelectItem>
                    <SelectItem value="Track 1">Track 1</SelectItem>
                    <SelectItem value="Track 2">Track 2</SelectItem>
                    <SelectItem value="Track 3">Track 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Results Summary */}
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>
              Showing {filteredFittings.length} of {allFittings.length} fittings
              {selectedItems.length > 0 && ` (${selectedItems.length} selected)`}
            </span>
            {selectedItems.length > 0 && (
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Bulk Export
                </Button>
                <Button variant="outline" size="sm">
                  Schedule Inspections
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Results Table */}
      <Card>
        <CardHeader>
          <CardTitle>Search Results</CardTitle>
          <CardDescription>
            Click on any fitting to view detailed information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedItems.length === filteredFittings.length}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead>Fitting ID</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Risk Score</TableHead>
                  <TableHead>Last Inspection</TableHead>
                  <TableHead>Next Inspection</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredFittings.map((fitting) => (
                  <TableRow
                    key={fitting.id}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => onNavigateToFitting(fitting.id)}
                  >
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      <Checkbox
                        checked={selectedItems.includes(fitting.id)}
                        onCheckedChange={() => handleItemSelect(fitting.id)}
                      />
                    </TableCell>
                    <TableCell className="font-mono">{fitting.id}</TableCell>
                    <TableCell>{fitting.type}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {fitting.location}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(fitting.status)}>
                        {fitting.status.replace('-', ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className={getRiskColor(fitting.riskScore)}>
                        {fitting.riskScore}/100
                      </span>
                    </TableCell>
                    <TableCell>{fitting.lastInspection}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {fitting.nextInspection}
                      </div>
                    </TableCell>
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm" onClick={() => onNavigateToFitting(fitting.id)}>
                          View
                        </Button>
                        {fitting.status === 'critical' && (
                          <Button variant="ghost" size="sm">
                            <AlertTriangle className="w-3 h-3" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Quick Filter Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="cursor-pointer hover:bg-muted/50 transition-colors" onClick={() => setSelectedStatus('critical')}>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              <div>
                <p className="font-semibold">Critical Fittings</p>
                <p className="text-sm text-muted-foreground">1 fitting</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:bg-muted/50 transition-colors" onClick={() => setSelectedStatus('high-risk')}>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-orange-500" />
              <div>
                <p className="font-semibold">High Risk</p>
                <p className="text-sm text-muted-foreground">2 fittings</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:bg-muted/50 transition-colors" onClick={() => setSelectedStatus('needs-inspection')}>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-yellow-500" />
              <div>
                <p className="font-semibold">Due Inspection</p>
                <p className="text-sm text-muted-foreground">2 fittings</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:bg-muted/50 transition-colors" onClick={() => setSelectedStatus('healthy')}>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-green-500 rounded-full" />
              <div>
                <p className="font-semibold">Healthy</p>
                <p className="text-sm text-muted-foreground">3 fittings</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}