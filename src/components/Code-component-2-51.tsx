import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Calendar } from './ui/calendar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Calendar as CalendarIcon, Plus, User, Clock, MapPin, Wrench, CheckCircle, AlertTriangle } from 'lucide-react';

interface MaintenanceTask {
  id: string;
  title: string;
  fittingId: string;
  location: string;
  type: 'inspection' | 'maintenance' | 'replacement' | 'emergency';
  priority: 'low' | 'medium' | 'high' | 'critical';
  assignee: string;
  dueDate: string;
  estimatedDuration: string;
  status: 'pending' | 'in-progress' | 'completed' | 'overdue';
  description: string;
}

export function MaintenanceScheduler() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');

  const tasks: MaintenanceTask[] = [
    {
      id: '1',
      title: 'Critical Rail Clip Replacement',
      fittingId: 'RF-2301-A45',
      location: 'KM 245.3, Track 1',
      type: 'replacement',
      priority: 'critical',
      assignee: 'Priya Patel',
      dueDate: '2024-09-15',
      estimatedDuration: '4 hours',
      status: 'pending',
      description: 'Replace critically worn rail clip showing 85% failure probability'
    },
    {
      id: '2',
      title: 'Routine Bolt Inspection',
      fittingId: 'RF-2301-B12',
      location: 'KM 198.7, Track 2',
      type: 'inspection',
      priority: 'medium',
      assignee: 'Kumar Singh',
      dueDate: '2024-09-18',
      estimatedDuration: '2 hours',
      status: 'pending',
      description: 'Monthly bolt tension and wear inspection'
    },
    {
      id: '3',
      title: 'Preventive Plate Maintenance',
      fittingId: 'RF-2301-C78',
      location: 'KM 312.1, Track 1',
      type: 'maintenance',
      priority: 'low',
      assignee: 'Amit Kumar',
      dueDate: '2024-09-20',
      estimatedDuration: '3 hours',
      status: 'pending',
      description: 'Cleaning and lubrication of base plates'
    },
    {
      id: '4',
      title: 'Emergency Joint Repair',
      fittingId: 'RF-2301-D33',
      location: 'KM 267.5, Track 3',
      type: 'emergency',
      priority: 'critical',
      assignee: 'Rajesh Sharma',
      dueDate: '2024-09-10',
      estimatedDuration: '6 hours',
      status: 'completed',
      description: 'Emergency repair of damaged rail joint'
    },
    {
      id: '5',
      title: 'Anchor Bolt Tightening',
      fittingId: 'RF-2301-E89',
      location: 'KM 189.2, Track 2',
      type: 'maintenance',
      priority: 'medium',
      assignee: 'Priya Patel',
      dueDate: '2024-09-12',
      estimatedDuration: '2 hours',
      status: 'in-progress',
      description: 'Retightening anchor bolts to specification'
    }
  ];

  const team = [
    { id: '1', name: 'Rajesh Sharma', role: 'Senior Technician', avatar: 'RS' },
    { id: '2', name: 'Priya Patel', role: 'Inspector', avatar: 'PP' },
    { id: '3', name: 'Kumar Singh', role: 'Auditor', avatar: 'KS' },
    { id: '4', name: 'Amit Kumar', role: 'Technician', avatar: 'AK' },
    { id: '5', name: 'Sunita Gupta', role: 'Inspector', avatar: 'SG' }
  ];

  const getTasksForDate = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    return tasks.filter(task => task.dueDate === dateString);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'inspection': return <CheckCircle className="w-4 h-4" />;
      case 'maintenance': return <Wrench className="w-4 h-4" />;
      case 'replacement': return <AlertTriangle className="w-4 h-4" />;
      case 'emergency': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const upcomingTasks = tasks.filter(task => 
    new Date(task.dueDate) >= new Date() && task.status === 'pending'
  ).sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());

  const overdueTasks = tasks.filter(task => 
    new Date(task.dueDate) < new Date() && task.status !== 'completed'
  );

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="w-5 h-5" />
            Maintenance Scheduler
          </CardTitle>
          <CardDescription>
            Schedule, assign, and track maintenance tasks for railway fittings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex gap-2">
              <Button 
                variant={viewMode === 'calendar' ? 'default' : 'outline'}
                onClick={() => setViewMode('calendar')}
              >
                Calendar View
              </Button>
              <Button 
                variant={viewMode === 'list' ? 'default' : 'outline'}
                onClick={() => setViewMode('list')}
              >
                List View
              </Button>
            </div>
            
            <div className="flex gap-2">
              <Dialog open={isAddTaskOpen} onOpenChange={setIsAddTaskOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Schedule Task
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Schedule New Maintenance Task</DialogTitle>
                    <DialogDescription>
                      Create a new maintenance task and assign it to a team member
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="Task Title" />
                    <Input placeholder="Fitting ID (e.g., RF-2301-A45)" />
                    <Input placeholder="Location" />
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Task Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="inspection">Inspection</SelectItem>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
                        <SelectItem value="replacement">Replacement</SelectItem>
                        <SelectItem value="emergency">Emergency</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="critical">Critical</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Assign to" />
                      </SelectTrigger>
                      <SelectContent>
                        {team.map(member => (
                          <SelectItem key={member.id} value={member.name}>
                            {member.name} - {member.role}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input placeholder="Due Date" type="date" />
                    <Input placeholder="Estimated Duration" />
                  </div>
                  <Textarea placeholder="Task Description" className="mt-4" />
                  <div className="flex gap-2 mt-4">
                    <Button className="flex-1">Create Task</Button>
                    <Button variant="outline" onClick={() => setIsAddTaskOpen(false)}>
                      Cancel
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{upcomingTasks.length}</div>
              <p className="text-sm text-muted-foreground">Upcoming Tasks</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{overdueTasks.length}</div>
              <p className="text-sm text-muted-foreground">Overdue Tasks</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {tasks.filter(t => t.status === 'completed').length}
              </div>
              <p className="text-sm text-muted-foreground">Completed This Month</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {tasks.filter(t => t.status === 'in-progress').length}
              </div>
              <p className="text-sm text-muted-foreground">In Progress</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar/List View */}
        <div className="lg:col-span-2">
          {viewMode === 'calendar' ? (
            <Card>
              <CardHeader>
                <CardTitle>Calendar View</CardTitle>
                <CardDescription>Click on a date to view scheduled tasks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-6">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border"
                    components={{
                      Day: ({ date, ...props }) => {
                        const tasksForDate = getTasksForDate(date);
                        const hasCritical = tasksForDate.some(t => t.priority === 'critical');
                        return (
                          <div className="relative">
                            <button {...props} />
                            {tasksForDate.length > 0 && (
                              <div className={`absolute -top-1 -right-1 w-2 h-2 rounded-full ${
                                hasCritical ? 'bg-red-500' : 'bg-blue-500'
                              }`} />
                            )}
                          </div>
                        );
                      }
                    }}
                  />
                  
                  {/* Tasks for Selected Date */}
                  <div className="flex-1">
                    <h4 className="font-medium mb-3">
                      Tasks for {selectedDate?.toLocaleDateString()}
                    </h4>
                    <div className="space-y-2">
                      {selectedDate && getTasksForDate(selectedDate).length === 0 ? (
                        <p className="text-sm text-muted-foreground">No tasks scheduled for this date</p>
                      ) : (
                        getTasksForDate(selectedDate || new Date()).map(task => (
                          <div key={task.id} className="p-3 border rounded-lg">
                            <div className="flex items-center gap-2 mb-1">
                              {getTypeIcon(task.type)}
                              <span className="font-medium text-sm">{task.title}</span>
                              <Badge className={getPriorityColor(task.priority)}>
                                {task.priority}
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {task.location} • {task.estimatedDuration} • {task.assignee}
                            </p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            /* List View */
            <Card>
              <CardHeader>
                <CardTitle>All Tasks</CardTitle>
                <CardDescription>Complete list of maintenance tasks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {tasks.map(task => (
                    <div key={task.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {getTypeIcon(task.type)}
                          <h4 className="font-medium">{task.title}</h4>
                          <Badge className={getPriorityColor(task.priority)}>
                            {task.priority}
                          </Badge>
                        </div>
                        <Badge className={getStatusColor(task.status)}>
                          {task.status.replace('-', ' ')}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {task.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {task.assignee}
                        </div>
                        <div className="flex items-center gap-1">
                          <CalendarIcon className="w-3 h-3" />
                          {task.dueDate}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {task.estimatedDuration}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">{task.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Urgent Tasks */}
          <Card>
            <CardHeader>
              <CardTitle className="text-red-600">Urgent Tasks</CardTitle>
              <CardDescription>Tasks requiring immediate attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {tasks.filter(t => t.priority === 'critical' || overdueTasks.includes(t)).map(task => (
                  <div key={task.id} className="p-3 border-l-4 border-red-500 bg-red-50 rounded">
                    <h5 className="font-medium text-sm">{task.title}</h5>
                    <p className="text-xs text-muted-foreground">{task.location}</p>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-xs">{task.assignee}</span>
                      <Badge variant="destructive" className="text-xs">
                        {task.status === 'overdue' ? 'OVERDUE' : task.priority.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Team Availability */}
          <Card>
            <CardHeader>
              <CardTitle>Team Status</CardTitle>
              <CardDescription>Current team availability</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {team.map(member => {
                  const memberTasks = tasks.filter(t => t.assignee === member.name && t.status === 'in-progress');
                  return (
                    <div key={member.id} className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>{member.avatar}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{member.name}</p>
                        <p className="text-xs text-muted-foreground">{member.role}</p>
                      </div>
                      <Badge variant={memberTasks.length > 0 ? 'secondary' : 'outline'}>
                        {memberTasks.length > 0 ? `${memberTasks.length} active` : 'Available'}
                      </Badge>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <CalendarIcon className="w-4 h-4 mr-2" />
                Export Schedule
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <User className="w-4 h-4 mr-2" />
                Assign Bulk Tasks
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <AlertTriangle className="w-4 h-4 mr-2" />
                Emergency Schedule
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}