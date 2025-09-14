import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Users, UserPlus, Settings, Shield, Eye, Edit, Trash2, Search } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'inspector' | 'auditor' | 'technician';
  department: string;
  lastActive: string;
  status: 'active' | 'inactive';
  permissions: string[];
}

export function UserManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);

  const users: User[] = [
    {
      id: '1',
      name: 'Rajesh Sharma',
      email: 'rajesh.sharma@indianrailways.gov.in',
      role: 'admin',
      department: 'Maintenance Engineering',
      lastActive: '2024-09-09 14:30',
      status: 'active',
      permissions: ['view_all', 'edit_all', 'manage_users', 'generate_reports']
    },
    {
      id: '2',
      name: 'Priya Patel',
      email: 'priya.patel@indianrailways.gov.in',
      role: 'inspector',
      department: 'Track Maintenance',
      lastActive: '2024-09-09 13:45',
      status: 'active',
      permissions: ['view_assigned', 'edit_fittings', 'scan_qr', 'create_reports']
    },
    {
      id: '3',
      name: 'Kumar Singh',
      email: 'kumar.singh@indianrailways.gov.in',
      role: 'auditor',
      department: 'Quality Assurance',
      lastActive: '2024-09-09 12:20',
      status: 'active',
      permissions: ['view_all', 'audit_reports', 'compliance_check']
    },
    {
      id: '4',
      name: 'Amit Kumar',
      email: 'amit.kumar@indianrailways.gov.in',
      role: 'technician',
      department: 'Field Operations',
      lastActive: '2024-09-08 16:15',
      status: 'active',
      permissions: ['view_assigned', 'scan_qr', 'update_status']
    },
    {
      id: '5',
      name: 'Sunita Gupta',
      email: 'sunita.gupta@indianrailways.gov.in',
      role: 'inspector',
      department: 'Track Maintenance',
      lastActive: '2024-09-07 10:30',
      status: 'inactive',
      permissions: ['view_assigned', 'edit_fittings', 'scan_qr']
    }
  ];

  const rolePermissions = {
    admin: {
      name: 'Administrator',
      description: 'Full system access with user management capabilities',
      color: 'bg-red-100 text-red-800',
      permissions: ['Full Access', 'User Management', 'System Configuration']
    },
    inspector: {
      name: 'Inspector',
      description: 'Field inspection and maintenance recording',
      color: 'bg-blue-100 text-blue-800',
      permissions: ['QR Scanning', 'Fitting Updates', 'Reports Creation']
    },
    auditor: {
      name: 'Auditor',
      description: 'Quality assurance and compliance monitoring',
      color: 'bg-green-100 text-green-800',
      permissions: ['View All Data', 'Audit Reports', 'Compliance Checks']
    },
    technician: {
      name: 'Technician',
      description: 'Field operations and basic data entry',
      color: 'bg-yellow-100 text-yellow-800',
      permissions: ['QR Scanning', 'Status Updates', 'Basic Reports']
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = searchTerm === '' || 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.department.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    
    return matchesSearch && matchesRole;
  });

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            User Management
          </CardTitle>
          <CardDescription>
            Manage user accounts, roles, and permissions for the railway fitting management system
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-64">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search users by name, email, or department..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="inspector">Inspector</SelectItem>
                <SelectItem value="auditor">Auditor</SelectItem>
                <SelectItem value="technician">Technician</SelectItem>
              </SelectContent>
            </Select>
            <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
              <DialogTrigger asChild>
                <Button>
                  <UserPlus className="w-4 h-4 mr-2" />
                  Add User
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New User</DialogTitle>
                  <DialogDescription>
                    Create a new user account with appropriate role and permissions
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <Input placeholder="Full Name" />
                  <Input placeholder="Email Address" type="email" />
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="inspector">Inspector</SelectItem>
                      <SelectItem value="auditor">Auditor</SelectItem>
                      <SelectItem value="technician">Technician</SelectItem>
                      <SelectItem value="admin">Administrator</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input placeholder="Department" />
                  <div className="flex gap-2">
                    <Button className="flex-1">Create User</Button>
                    <Button variant="outline" onClick={() => setIsAddUserOpen(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Showing {filteredUsers.length} of {users.length} users</span>
            <div className="flex gap-4">
              <span>Active: {users.filter(u => u.status === 'active').length}</span>
              <span>Inactive: {users.filter(u => u.status === 'inactive').length}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>User Accounts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Last Active</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={rolePermissions[user.role].color}>
                        {rolePermissions[user.role].name}
                      </Badge>
                    </TableCell>
                    <TableCell>{user.department}</TableCell>
                    <TableCell className="text-sm">{user.lastActive}</TableCell>
                    <TableCell>
                      <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-3 h-3" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Role Permissions Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(rolePermissions).map(([roleKey, role]) => (
          <Card key={roleKey}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                {role.name}
              </CardTitle>
              <CardDescription>{role.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm">
                  <strong>Users:</strong> {users.filter(u => u.role === roleKey).length}
                </p>
                <div>
                  <p className="text-sm mb-2"><strong>Permissions:</strong></p>
                  <div className="space-y-1">
                    {role.permissions.map((permission, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {permission}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* System Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>User login and system access logs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { user: 'Rajesh Sharma', action: 'Generated maintenance report', time: '5 minutes ago' },
              { user: 'Priya Patel', action: 'Scanned QR code RF-2301-A45', time: '15 minutes ago' },
              { user: 'Kumar Singh', action: 'Completed audit checklist', time: '1 hour ago' },
              { user: 'Amit Kumar', action: 'Updated fitting status', time: '2 hours ago' },
              { user: 'System', action: 'Automated backup completed', time: '3 hours ago' }
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <div>
                    <p className="text-sm"><strong>{activity.user}</strong> {activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <Eye className="w-3 h-3" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}