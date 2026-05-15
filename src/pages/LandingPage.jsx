import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Play, ChevronDown, Bell, Search, Plus, MoreVertical, Send, ArrowRightLeft, ArrowDownToLine, Receipt, FileText, Settings } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="nexora-theme h-screen flex flex-col overflow-hidden relative" style={{ background: 'hsl(0 0% 100%)' }}>
      
      {/* Background Video */}
      <video 
        autoPlay 
        loop 
        muted 
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
        style={{ opacity: 0.15, mixBlendMode: 'luminosity' }}
      >
        <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260319_015952_e1deeb12-8fb7-4071-a42a-60779fc64ab6.mp4" type="video/mp4" />
      </video>

      {/* Content wrapper */}
      <div className="relative z-10 flex flex-col items-center w-full h-full">
        
        {/* Navbar */}
        <nav className="w-full flex items-center justify-between px-6 md:px-12 lg:px-20 py-5 font-inter shrink-0">
          {/* Left: Logo */}
          <div className="flex items-center gap-2">
            <span className="text-xl font-semibold tracking-tight text-nx-foreground">✦ Nexora</span>
          </div>

          {/* Center: Nav links (existing functional paths) */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/dashboard" className="text-sm text-nx-muted-foreground hover:text-nx-foreground transition-colors">Dashboard</Link>
            <Link to="/terminology" className="text-sm text-nx-muted-foreground hover:text-nx-foreground transition-colors">Study Library</Link>
            <Link to="/quiz" className="text-sm text-nx-muted-foreground hover:text-nx-foreground transition-colors">Practice Exams</Link>
            <Link to="/anatomy" className="text-sm text-nx-muted-foreground hover:text-nx-foreground transition-colors">Visualizer</Link>
          </div>

          {/* Right CTA */}
          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-3 mr-2">
              <button className="text-nx-muted-foreground hover:text-nx-foreground transition-colors">
                <Bell className="w-4 h-4" />
              </button>
              <div className="w-6 h-6 rounded-full overflow-hidden border border-nx-border">
                <img alt="Avatar" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBc1KrY3hAzs_b3mzGZkIzfzajdRzqAwyBk7b4QN7QmFTzfWyf7022-UjIx-ESAbie6iLUdWeK8xqKYZ-O4rkxzX_fazXz7rDV1E-tcBOq3RWgLgroK7ttKkFLA_Dki6uESzgYqFdHmy6yCyZiwDspQlEbGiX5gUoYb3WAQqX4Ce4vgczdtoQcaRgRwtHYldy5qr6MLeKizq_v6FmJENfhI9iQozpmU5KaewI-Q_wn04vlOv--wO7-w_j5sLRS4SC1VbZGjXlwq5xYm" />
              </div>
            </div>
            <Link to="/dashboard">
              <button className="rounded-full px-5 py-2 text-sm font-medium font-inter bg-nx-primary text-nx-primary-foreground hover:opacity-90 transition-opacity">
                Go Pro
              </button>
            </Link>
          </div>
        </nav>

        {/* Hero Section */}
        <main className="flex-1 w-full flex flex-col items-center pt-8 md:pt-14 px-4 overflow-hidden">
          
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-1.5 rounded-full border border-nx-border bg-nx-background px-4 py-1.5 text-sm text-nx-muted-foreground font-inter shadow-sm"
          >
            Now with GPT-5 support ✨
          </motion.div>

          {/* Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center font-display text-5xl md:text-6xl lg:text-[5rem] leading-[0.95] tracking-tight text-nx-foreground max-w-xl"
          >
            The Future of <em className="font-display italic not-italic" style={{ fontStyle: 'italic' }}>Smarter</em> Automation
          </motion.h1>

          {/* Subheadline */}
          <motion.p 
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-center text-base md:text-lg text-nx-muted-foreground max-w-[650px] leading-relaxed font-inter"
          >
            Automate your busywork with intelligent agents that learn, adapt, and execute—so your team can focus on what matters most.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-5 flex items-center gap-3"
          >
            <Link to="/dashboard">
              <button className="rounded-full px-6 py-3.5 text-sm font-medium font-inter bg-nx-primary text-nx-primary-foreground hover:opacity-90 transition-opacity">
                Book a demo
              </button>
            </Link>
            <button className="h-11 w-11 rounded-full border-0 bg-nx-background flex items-center justify-center hover:bg-nx-secondary transition-colors"
                    style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
              <Play className="h-4 w-4 fill-current text-nx-foreground" />
            </button>
          </motion.div>

          {/* Dashboard Preview */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-8 w-full max-w-5xl"
          >
            <div className="rounded-2xl overflow-hidden p-3 md:p-4" style={{
              background: 'rgba(255, 255, 255, 0.4)',
              border: '1px solid rgba(255, 255, 255, 0.5)',
              boxShadow: 'var(--nx-shadow-dashboard)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)'
            }}>
              <div className="flex w-full rounded-xl overflow-hidden bg-nx-background border border-nx-border shadow-sm text-[11px] select-none pointer-events-none font-inter" style={{ height: '55vh', minHeight: '400px', color: 'hsl(210 14% 17%)' }}>
                
                {/* Sidebar */}
                <div className="w-40 border-r border-nx-border bg-nx-background flex-col hidden sm:flex shrink-0">
                  <div className="flex items-center gap-2 p-4 border-b border-nx-border">
                    <div className="w-5 h-5 rounded bg-nx-foreground text-nx-background flex items-center justify-center font-bold text-xs">N</div>
                    <span className="font-semibold text-sm text-nx-foreground">Nexora</span>
                    <ChevronDown className="w-3 h-3 text-nx-muted-foreground ml-auto" />
                  </div>
                  <div className="flex-1 py-4 px-2 flex flex-col gap-0.5 text-nx-foreground">
                    <div className="flex items-center px-2 py-1.5 bg-nx-secondary rounded-md font-medium text-nx-foreground">Home</div>
                    <div className="flex items-center justify-between px-2 py-1.5 text-nx-muted-foreground rounded-md">
                      Tasks <span className="px-1.5 rounded-full text-[9px] font-medium" style={{ background: 'hsl(239 84% 67% / 0.1)', color: 'hsl(239 84% 67%)' }}>10</span>
                    </div>
                    <div className="flex items-center px-2 py-1.5 text-nx-muted-foreground rounded-md">Transactions</div>
                    <div className="flex items-center justify-between px-2 py-1.5 text-nx-muted-foreground rounded-md">
                      Payments <ChevronDown className="w-3 h-3" />
                    </div>
                    <div className="flex items-center px-2 py-1.5 text-nx-muted-foreground rounded-md">Cards</div>
                    <div className="flex items-center px-2 py-1.5 text-nx-muted-foreground rounded-md">Capital</div>
                    <div className="flex items-center justify-between px-2 py-1.5 text-nx-muted-foreground rounded-md">
                      Accounts <ChevronDown className="w-3 h-3" />
                    </div>
                    
                    <div className="mt-4 px-2 text-[10px] text-nx-muted-foreground font-semibold uppercase tracking-wider mb-1">Workflows</div>
                    <div className="flex items-center px-2 py-1.5 text-nx-muted-foreground rounded-md">Trade routes</div>
                    <div className="flex items-center px-2 py-1.5 text-nx-muted-foreground rounded-md">Payments</div>
                    <div className="flex items-center px-2 py-1.5 text-nx-muted-foreground rounded-md">Notifications</div>
                    <div className="flex items-center px-2 py-1.5 text-nx-muted-foreground rounded-md">Settings</div>
                  </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 flex flex-col" style={{ background: 'hsl(0 0% 96% / 0.3)' }}>
                  
                  {/* Top bar */}
                  <div className="h-12 border-b border-nx-border flex items-center justify-between px-4 bg-nx-background shrink-0">
                    <div className="flex items-center gap-2 px-2 py-1.5 rounded-md border border-nx-border text-nx-muted-foreground" style={{ background: 'hsl(0 0% 96% / 0.5)', width: 'clamp(120px, 20vw, 256px)' }}>
                      <Search className="w-3.5 h-3.5 shrink-0" />
                      <span>Search...</span>
                      <span className="ml-auto text-[9px] border border-nx-border px-1 rounded shrink-0">⌘K</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="hidden md:flex items-center gap-1.5 px-2 py-1 border border-nx-border rounded-md shadow-sm text-nx-foreground">
                        <span className="font-medium">Move Money</span>
                      </div>
                      <Bell className="w-4 h-4 text-nx-muted-foreground" />
                      <div className="w-6 h-6 rounded-full flex items-center justify-center font-medium text-[10px]" style={{ background: 'hsl(239 84% 67% / 0.2)', border: '1px solid hsl(239 84% 67% / 0.3)', color: 'hsl(239 84% 67%)' }}>JB</div>
                    </div>
                  </div>

                  {/* Dashboard Cards */}
                  <div className="p-4 md:p-6 flex flex-col gap-4 overflow-y-auto no-scrollbar">
                    <h2 className="text-sm font-semibold text-nx-foreground">Welcome, Jane</h2>
                    
                    {/* Action buttons row */}
                    <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar shrink-0">
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-medium shadow-sm whitespace-nowrap" style={{ background: 'hsl(239 84% 67%)', color: 'white' }}><Send className="w-3 h-3" /> Send</div>
                      <div className="flex items-center gap-1.5 bg-nx-background border border-nx-border px-3 py-1.5 rounded-full text-[10px] font-medium shadow-sm whitespace-nowrap text-nx-foreground"><ArrowRightLeft className="w-3 h-3" /> Request</div>
                      <div className="flex items-center gap-1.5 bg-nx-background border border-nx-border px-3 py-1.5 rounded-full text-[10px] font-medium shadow-sm whitespace-nowrap text-nx-foreground"><ArrowRightLeft className="w-3 h-3" /> Transfer</div>
                      <div className="flex items-center gap-1.5 bg-nx-background border border-nx-border px-3 py-1.5 rounded-full text-[10px] font-medium shadow-sm whitespace-nowrap text-nx-foreground"><ArrowDownToLine className="w-3 h-3" /> Deposit</div>
                      <div className="flex items-center gap-1.5 bg-nx-background border border-nx-border px-3 py-1.5 rounded-full text-[10px] font-medium shadow-sm whitespace-nowrap text-nx-foreground"><Receipt className="w-3 h-3" /> Pay Bill</div>
                      <div className="flex items-center gap-1.5 bg-nx-background border border-nx-border px-3 py-1.5 rounded-full text-[10px] font-medium shadow-sm whitespace-nowrap text-nx-foreground"><FileText className="w-3 h-3" /> Create Invoice</div>
                      <div className="ml-auto text-[10px] text-nx-muted-foreground flex items-center gap-1 whitespace-nowrap pl-2"><Settings className="w-3 h-3" /> Customize</div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 shrink-0">
                      {/* Balance Card */}
                      <div className="flex-1 basis-0 bg-nx-background border border-nx-border rounded-xl p-4 shadow-sm flex flex-col min-h-[160px]">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-4 h-4 rounded-full flex items-center justify-center" style={{ background: 'hsl(239 84% 67% / 0.2)' }}>
                            <div className="w-2 h-2 rounded-full" style={{ background: 'hsl(239 84% 67%)' }} />
                          </div>
                          <span className="font-medium text-nx-muted-foreground">Mercury Balance</span>
                        </div>
                        <div className="text-2xl font-semibold text-nx-foreground mb-2">$8,450,190<span className="text-xs text-nx-muted-foreground">.32</span></div>
                        
                        <div className="flex items-center justify-between text-[10px] mb-2">
                          <span className="text-nx-muted-foreground">Last 30 Days</span>
                          <div className="flex items-center gap-2">
                            <span className="text-emerald-500 font-medium">+$1.8M</span>
                            <span className="text-rose-500 font-medium">-$900K</span>
                          </div>
                        </div>

                        {/* SVG Chart */}
                        <div className="h-16 w-full mt-auto relative -mx-1">
                          <svg className="w-full h-full overflow-visible" viewBox="0 0 100 40" preserveAspectRatio="none">
                            <defs>
                              <linearGradient id="nxChartGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="hsl(239 84% 67%)" stopOpacity="0.15" />
                                <stop offset="100%" stopColor="hsl(239 84% 67%)" stopOpacity="0" />
                              </linearGradient>
                            </defs>
                            <path 
                              d="M 0 40 L 0 25 C 10 25 15 10 25 15 C 35 20 40 5 50 10 C 60 15 65 30 75 25 C 85 20 90 5 100 8 L 100 40 Z" 
                              fill="url(#nxChartGrad)" 
                            />
                            <path 
                              d="M 0 25 C 10 25 15 10 25 15 C 35 20 40 5 50 10 C 60 15 65 30 75 25 C 85 20 90 5 100 8" 
                              fill="none" 
                              stroke="hsl(239 84% 67%)" 
                              strokeWidth="1.5" 
                              vectorEffect="non-scaling-stroke"
                            />
                          </svg>
                        </div>
                      </div>

                      {/* Accounts Card */}
                      <div className="flex-1 basis-0 bg-nx-background border border-nx-border rounded-xl p-4 shadow-sm flex flex-col min-h-[160px]">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-sm text-nx-foreground">Accounts</span>
                          <div className="flex items-center gap-2">
                            <Plus className="w-4 h-4 text-nx-muted-foreground" />
                            <MoreVertical className="w-4 h-4 text-nx-muted-foreground" />
                          </div>
                        </div>
                        <div className="flex flex-col flex-1 justify-center">
                          <div className="flex items-center justify-between py-2" style={{ borderBottom: '1px solid hsl(0 0% 90% / 0.5)' }}>
                            <span className="text-nx-muted-foreground">Credit</span>
                            <span className="font-medium text-nx-foreground">$98,125.50</span>
                          </div>
                          <div className="flex items-center justify-between py-2" style={{ borderBottom: '1px solid hsl(0 0% 90% / 0.5)' }}>
                            <span className="text-nx-muted-foreground">Treasury</span>
                            <span className="font-medium text-nx-foreground">$6,750,200.00</span>
                          </div>
                          <div className="flex items-center justify-between py-2">
                            <span className="text-nx-muted-foreground">Operations</span>
                            <span className="font-medium text-nx-foreground">$1,592,864.82</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Transactions Table */}
                    <div className="bg-nx-background border border-nx-border rounded-xl p-4 shadow-sm flex-1 shrink-0">
                      <h3 className="font-semibold mb-3 text-sm text-nx-foreground">Recent Transactions</h3>
                      <div className="grid grid-cols-[1fr_2fr_1fr_1fr] gap-4 mb-2 text-nx-muted-foreground font-medium pb-2" style={{ borderBottom: '1px solid hsl(0 0% 90%)' }}>
                        <div>Date</div>
                        <div>Description</div>
                        <div className="text-right">Amount</div>
                        <div>Status</div>
                      </div>
                      <div className="flex flex-col gap-2 mt-2">
                        <div className="grid grid-cols-[1fr_2fr_1fr_1fr] gap-4 items-center py-1">
                          <div className="text-nx-muted-foreground">Today</div>
                          <div className="font-medium text-nx-foreground">AWS</div>
                          <div className="text-right font-medium text-nx-foreground">-$5,200.00</div>
                          <div><span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full text-[9px] font-medium border border-amber-200">Pending</span></div>
                        </div>
                        <div className="grid grid-cols-[1fr_2fr_1fr_1fr] gap-4 items-center py-1">
                          <div className="text-nx-muted-foreground">Yesterday</div>
                          <div className="font-medium text-nx-foreground">Client Payment</div>
                          <div className="text-right text-emerald-600 font-medium">+$125,000.00</div>
                          <div><span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full text-[9px] font-medium border border-emerald-200">Completed</span></div>
                        </div>
                        <div className="grid grid-cols-[1fr_2fr_1fr_1fr] gap-4 items-center py-1">
                          <div className="text-nx-muted-foreground">May 14</div>
                          <div className="font-medium text-nx-foreground">Payroll</div>
                          <div className="text-right font-medium text-nx-foreground">-$85,450.00</div>
                          <div><span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full text-[9px] font-medium border border-emerald-200">Completed</span></div>
                        </div>
                        <div className="grid grid-cols-[1fr_2fr_1fr_1fr] gap-4 items-center py-1">
                          <div className="text-nx-muted-foreground">May 12</div>
                          <div className="font-medium text-nx-foreground">Office Supplies</div>
                          <div className="text-right font-medium text-nx-foreground">-$1,200.00</div>
                          <div><span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full text-[9px] font-medium border border-emerald-200">Completed</span></div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            </div>
          </motion.div>

        </main>
      </div>
    </div>
  );
};

export default LandingPage;
