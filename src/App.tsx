import React, { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { TrackMap } from './components/TrackMap';
import { FittingDetails } from './components/FittingDetails';
import { QRScanner } from './components/QRScanner';
import { SearchPanel } from './components/SearchPanel';
import { Reports } from './components/Reports';
import { UserManagement } from './components/UserManagement';
import { AIInsights } from './components/AIInsights';
import { MaintenanceScheduler } from './components/MaintenanceScheduler';
import { NotificationPanel } from './components/NotificationPanel';
import { RailwayTrack3D, Train3D, FloatingQRCodes, ParticleBackground } from './components/RailwayGraphics';
import { WelcomeAnimation } from './components/WelcomeAnimation';
import { PageTransition } from './components/PageTransition';
import { Badge } from './components/ui/badge';
import { Button } from './components/ui/button';
import { Bell, Calendar, Home, Map, QrCode, Search, FileText, Users, Brain, Zap, Train, Menu } from 'lucide-react';

type ActivePage = 'dashboard' | 'trackmap' | 'scanner' | 'search' | 'reports' | 'users' | 'insights' | 'scheduler' | 'fitting-details';

interface PageState {
  page: ActivePage;
  fittingId?: string;
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [pageState, setPageState] = useState<PageState>({ page: 'dashboard' });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [notifications] = useState([
    { id: 1, type: 'critical', message: 'High-risk fitting detected at KM 245.3', time: '5m ago' },
    { id: 2, type: 'warning', message: '15 fittings due for inspection this week', time: '1h ago' },
    { id: 3, type: 'info', message: 'Weekly maintenance report generated', time: '3h ago' }
  ]);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'trackmap', label: 'Track Map', icon: Map },
    { id: 'scanner', label: 'QR Scanner', icon: QrCode },
    { id: 'search', label: 'Search & Filter', icon: Search },
    { id: 'scheduler', label: 'Maintenance', icon: Calendar },
    { id: 'insights', label: 'AI Insights', icon: Brain },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'users', label: 'User Management', icon: Users },
  ];

  const navigateToFitting = (fittingId: string) => {
    setPageState({ page: 'fitting-details', fittingId });
  };

  const navigateToPage = (page: ActivePage) => {
    setPageState({ page });
  };

  const renderActivePage = () => {
    switch (pageState.page) {
      case 'dashboard':
        return <Dashboard onNavigateToFitting={navigateToFitting} />;
      case 'trackmap':
        return <TrackMap onNavigateToFitting={navigateToFitting} />;
      case 'fitting-details':
        return <FittingDetails fittingId={pageState.fittingId} onBack={() => setPageState({ page: 'dashboard' })} />;
      case 'scanner':
        return <QRScanner onNavigateToFitting={navigateToFitting} />;
      case 'search':
        return <SearchPanel onNavigateToFitting={navigateToFitting} />;
      case 'reports':
        return <Reports />;
      case 'users':
        return <UserManagement />;
      case 'insights':
        return <AIInsights />;
      case 'scheduler':
        return <MaintenanceScheduler />;
      default:
        return <Dashboard onNavigateToFitting={navigateToFitting} />;
    }
  };

  if (isLoading) {
    return <WelcomeAnimation onComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className="min-h-screen w-full relative">
      {/* Enhanced Background Effects */}
      <ParticleBackground />
      <FloatingQRCodes />
      
      {/* Railway Track at Bottom */}
      <div className="fixed bottom-0 left-0 right-0 z-0 opacity-20">
        <RailwayTrack3D />
      </div>

      {/* Floating Train */}
      <div className="fixed top-1/2 right-10 z-0 opacity-15 transform -translate-y-1/2">
        <Train3D />
      </div>

      {/* Top Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 navbar-glass animate-navbar-slide-down">
        <div className="max-w-full mx-auto px-4 lg:px-6 py-3 lg:py-4">
          <div className="flex items-center justify-between">
            {/* Left: Logo and Brand */}
            <div className="flex items-center gap-4 lg:gap-6 animate-slide-in-left">
              <div className="flex items-center gap-3 lg:gap-4">
                <div className="relative animate-gentle-float">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 rounded-xl lg:rounded-2xl flex items-center justify-center animate-glow shadow-xl subtle-glow">
                    <Train className="w-5 h-5 lg:w-7 lg:h-7 text-white animate-pulse" />
                  </div>
                  <div className="absolute -top-1 lg:-top-2 -right-1 lg:-right-2 w-4 h-4 lg:w-5 lg:h-5 bg-gradient-to-br from-blue-300 via-blue-400 to-blue-500 rounded-full flex items-center justify-center animate-spin" style={{ animationDuration: '3s' }}>
                    <QrCode className="w-2 h-2 lg:w-3 lg:h-3 text-white" />
                  </div>
                  <div className="absolute -bottom-1 -left-1 w-3 h-3 lg:w-4 lg:h-4 bg-gradient-to-br from-green-400 to-green-500 rounded-full animate-pulse" />
                </div>
                <div>
                  <h1 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-100 via-white to-blue-200 bg-clip-text text-transparent tracking-tight">
                    QRail
                  </h1>
                  <p className="text-xs lg:text-sm text-blue-200/90 -mt-1 font-medium tracking-wide">Smart Railway Management</p>
                </div>
              </div>

              {/* Desktop Navigation Menu */}
              <div className="hidden lg:flex items-center space-x-1 xl:space-x-2 ml-6 xl:ml-8">
                {menuItems.map((item, index) => (
                  <Button
                    key={item.id}
                    variant="ghost"
                    onClick={() => navigateToPage(item.id as ActivePage)}
                    className={`
                      relative flex items-center gap-2 px-3 xl:px-4 py-2 rounded-lg transition-all duration-300 hover:bg-white/10 animate-fade-in-up text-sm
                      ${pageState.page === item.id 
                        ? 'bg-gradient-to-r from-blue-500/20 to-blue-600/20 text-white shadow-lg' 
                        : 'text-blue-200 hover:text-white hover:transform hover:scale-105'
                      }
                    `}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <item.icon className="w-4 h-4" />
                    <span className="font-medium hidden xl:inline">{item.label}</span>
                    <span className="font-medium xl:hidden">{item.label.split(' ')[0]}</span>
                    {pageState.page === item.id && (
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-400 rounded-full animate-pulse" />
                    )}
                  </Button>
                ))}
              </div>
            </div>

            {/* Right: Notifications and User */}
            <div className="flex items-center gap-2 lg:gap-4 animate-slide-in-right">
              <NotificationPanel notifications={notifications} />
              <div className="flex items-center gap-2 lg:gap-3">
                <Badge className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-blue-400/30 shadow-lg text-xs hidden sm:flex">
                  <Zap className="w-3 h-3 mr-1" />
                  Inspector View
                </Badge>
                <div className="relative">
                  <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center shadow-lg animate-glow">
                    <span className="text-xs lg:text-sm font-bold text-white">JD</span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 lg:w-4 lg:h-4 bg-green-400 rounded-full border-2 border-white animate-pulse" />
                </div>
              </div>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden hover:bg-white/10 text-blue-200 p-2"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <Menu className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-white/10 navbar-glass animate-fade-in-up">
            <div className="px-4 py-3 space-y-1">
              {menuItems.map((item, index) => (
                <Button
                  key={item.id}
                  variant="ghost"
                  onClick={() => {
                    navigateToPage(item.id as ActivePage);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`
                    w-full justify-start flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-300 animate-fade-in-up text-sm
                    ${pageState.page === item.id 
                      ? 'bg-gradient-to-r from-blue-500/20 to-blue-600/20 text-white shadow-lg' 
                      : 'text-blue-200 hover:text-white hover:bg-white/10'
                    }
                  `}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="font-medium">{item.label}</span>
                  {pageState.page === item.id && (
                    <div className="ml-auto w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                  )}
                </Button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="navbar-safe-area px-4 lg:px-6 pb-6 min-h-screen relative z-10">
        <div className="max-w-full mx-auto">
          <PageTransition>
            {renderActivePage()}
          </PageTransition>
        </div>
      </main>
    </div>
  );
}