import React from 'react';
import { Button } from '@/components/ui/button';
import { Smartphone, Download, CheckCircle, ArrowRight } from 'lucide-react';

const MobileAppShowcase = () => {
  const appFeatures = [
    'Real-time sales tracking',
    'Inventory management on the go',
    'Push notifications for low stock',
    'Mobile receipt generation',
    'Customer management',
    'Offline functionality'
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-primary/5 to-primary/10 overflow-hidden relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="grid grid-cols-10 h-full">
          {Array.from({ length: 100 }).map((_, i) => (
            <div key={i} className="border-r border-t border-primary/5"></div>
          ))}
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary rounded-full px-4 py-1 text-sm font-medium mb-6">
              <Smartphone className="w-4 h-4" />
              <span>Mobile App</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Take Your Business <span className="text-primary">Anywhere</span> With Our Mobile App
            </h2>
            
            <p className="text-lg text-gray-600 mb-8">
              Our mobile app gives you the freedom to manage your business from anywhere. 
              Check sales, update inventory, and stay connected with your team—all from your smartphone.
            </p>
            
            <div className="space-y-4 mb-8">
              {appFeatures.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="group">
                Download for iOS
                <Download className="ml-2 w-5 h-5 group-hover:-translate-y-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="group">
                Download for Android
                <Download className="ml-2 w-5 h-5 group-hover:-translate-y-1 transition-transform" />
              </Button>
            </div>
          </div>
          
          {/* Right Content - Phone Mockup */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative animate-float">
              {/* iPhone Frame */}
              <div className="w-[300px] h-[620px] bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 rounded-[50px] p-[3px] shadow-2xl relative z-10">
                {/* Screen Container */}
                <div className="w-full h-full bg-black rounded-[47px] p-[10px] relative overflow-hidden">
                  {/* Dynamic Island */}
                  <div className="absolute top-[10px] left-1/2 transform -translate-x-1/2 w-[120px] h-[35px] bg-black rounded-[25px] z-50 shadow-lg border border-gray-900"></div>
                  
                  {/* Screen Content */}
                  <div className="w-full h-full bg-gradient-to-br from-gray-50 to-white rounded-[40px] overflow-hidden relative">
                    {/* Status Bar */}
                    <div className="absolute top-0 left-0 right-0 h-[50px] z-40 px-6 pt-3 flex justify-between items-center text-[11px] font-semibold">
                      <span className="text-gray-900">9:41</span>
                      <div className="flex items-center gap-1">
                        <div className="flex gap-[2px]">
                          <div className="w-[3px] h-[10px] bg-gray-900 rounded-full"></div>
                          <div className="w-[3px] h-[12px] bg-gray-900 rounded-full"></div>
                          <div className="w-[3px] h-[14px] bg-gray-900 rounded-full"></div>
                          <div className="w-[3px] h-[10px] bg-gray-400 rounded-full"></div>
                        </div>
                        <svg className="w-[18px] h-[12px] ml-1" viewBox="0 0 24 24" fill="none">
                          <rect x="2" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="2"/>
                          <path d="M20 10v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                      </div>
                    </div>
                    
                    {/* App Content */}
                    <div className="pt-[55px] px-5 pb-24 h-full overflow-hidden">
                      {/* Greeting */}
                      <div className="mb-6">
                        <h3 className="text-2xl font-bold text-gray-900 mb-1">Good Morning</h3>
                        <p className="text-sm text-gray-500">Here's your business overview</p>
                      </div>
                      
                      {/* Stats Cards */}
                      <div className="grid grid-cols-2 gap-3 mb-6">
                        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-2xl shadow-lg">
                          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mb-2 backdrop-blur-sm">
                            <div className="w-4 h-4 bg-white rounded"></div>
                          </div>
                          <p className="text-xs text-blue-100 font-medium">Today's Sales</p>
                          <p className="text-xl font-bold text-white mt-1">45K</p>
                          <p className="text-xs text-blue-100 mt-1">↑ 8% from yesterday</p>
                        </div>
                        <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-4 rounded-2xl shadow-lg">
                          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mb-2 backdrop-blur-sm">
                            <div className="w-4 h-4 bg-white rounded-full"></div>
                          </div>
                          <p className="text-xs text-purple-100 font-medium">Orders</p>
                          <p className="text-xl font-bold text-white mt-1">48</p>
                          <p className="text-xs text-purple-100 mt-1">5 new orders</p>
                        </div>
                      </div>
                      
                      {/* Recent Transactions */}
                      <div className="mb-5">
                        <div className="flex justify-between items-center mb-3">
                          <h4 className="font-semibold text-gray-900">Recent Orders</h4>
                          <button className="text-xs text-blue-600 font-medium">See All</button>
                        </div>
                        
                        <div className="space-y-2">
                          {[
                            { id: 1001, time: '2m ago', amount: 1200, icon: '🛍️' },
                            { id: 1002, time: '5m ago', amount: 850, icon: '📦' },
                            { id: 1003, time: '12m ago', amount: 2400, icon: '🎁' }
                          ].map((order) => (
                            <div key={order.id} className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center text-lg">
                                  {order.icon}
                                </div>
                                <div>
                                  <p className="text-sm font-semibold text-gray-900">Order #{order.id}</p>
                                  <p className="text-xs text-gray-500">{order.time}</p>
                                </div>
                              </div>
                              <p className="text-sm font-bold text-gray-900">Tzs {order.amount.toLocaleString()}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Quick Actions */}
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Quick Actions</h4>
                        <div className="grid grid-cols-4 gap-2">
                          {[
                            { name: 'New Sale', bg: 'from-green-400 to-green-500', icon: '💰' },
                            { name: 'Inventory', bg: 'from-orange-400 to-orange-500', icon: '📊' },
                            { name: 'Reports', bg: 'from-pink-400 to-pink-500', icon: '📈' },
                            { name: 'More', bg: 'from-gray-400 to-gray-500', icon: '⋯' }
                          ].map((action, i) => (
                            <div key={i} className="text-center">
                              <div className={`bg-gradient-to-br ${action.bg} w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-1.5 shadow-md text-xl`}>
                                {action.icon}
                              </div>
                              <p className="text-[10px] text-gray-700 font-medium">{action.name}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    {/* Bottom Tab Bar */}
                    <div className="absolute bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-gray-200 px-6 pt-2 pb-6 rounded-b-[40px]">
                      <div className="flex justify-around items-center">
                        {[
                          { name: 'Home', active: true },
                          { name: 'Sales', active: false },
                          { name: 'Products', active: false },
                          { name: 'Profile', active: false }
                        ].map((tab, i) => (
                          <div key={i} className="flex flex-col items-center">
                            <div className={`w-6 h-6 rounded-full ${tab.active ? 'bg-blue-600' : 'bg-gray-300'} mb-1`}></div>
                            <p className={`text-[9px] font-medium ${tab.active ? 'text-blue-600' : 'text-gray-500'}`}>{tab.name}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Home Indicator */}
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gray-900 rounded-full z-50"></div>
                  </div>
                </div>
              </div>
              
              {/* Decorative Glow Effects */}
              <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl z-0"></div>
              <div className="absolute -top-20 -left-20 w-72 h-72 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl z-0"></div>
            </div>
            
            {/* QR Code Card */}
            <div className="absolute -right-6 bottom-16 bg-white p-4 rounded-2xl shadow-xl transform rotate-6 hover:rotate-3 transition-transform duration-300 z-20 border border-gray-100">
              <div className="w-28 h-28 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl mb-3 flex items-center justify-center overflow-hidden">
                <div className="w-24 h-24 bg-gray-900 flex items-center justify-center rounded-lg">
                  <div className="grid grid-cols-4 gap-[3px] p-2">
                    {Array.from({ length: 16 }).map((_, i) => (
                      <div key={i} className={`w-2 h-2 ${i % 3 === 0 ? 'bg-white' : 'bg-gray-900'}`}></div>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-xs text-center font-semibold text-gray-900">Scan to Download</p>
              <p className="text-[10px] text-center text-gray-500 mt-0.5">iOS & Android</p>
            </div>
          </div>
       
        </div>
      </div>
    </section>
  );
};

export default MobileAppShowcase;