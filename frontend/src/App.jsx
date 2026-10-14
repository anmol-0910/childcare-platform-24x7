import AdminLoginModal from './components/AdminLoginModal';
import React, { useState, useEffect } from 'react';
import { Phone, Mail, Share2, MapPin, ArrowUp, Sparkles, Calculator, CheckCircle2, X, MessageCircle } from 'lucide-react';
import { INITIAL_CENTERS, API_BASE } from './data/mockData';
import Navbar from './components/Navbar';
import FacilitiesSection from './components/FacilitiesSection';
import FilterBar from './components/FilterBar';
import CenterCard from './components/CenterCard';
import CenterDetailModal from './components/CenterDetailModal';
import ParentDashboard from './components/ParentDashboard';
import ProviderDashboard from './components/ProviderDashboard';
import AdminDashboard from './components/AdminDashboard';
import AuthModal from './components/AuthModal';

export default function App() {
  const [activeTab, setActiveTab] = useState('explore');
  const [centers, setCenters] = useState(INITIAL_CENTERS);
  const [bookings, setBookings] = useState([]);
  const [selectedCenter, setSelectedCenter] = useState(null);
  const [selectedFacility, setSelectedFacility] = useState('all');
  const [compareList, setCompareList] = useState([]);
  const [authOpen, setAuthOpen] = useState(false);
  const [adminAuthOpen, setAdminAuthOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user') || 'null'));

  // Interactive Cost Estimator State
  const [calcHours, setCalcHours] = useState(6);
  const [calcDays, setCalcDays] = useState(22);
  const [calcShift, setCalcShift] = useState('Day');

  const [filters, setFilters] = useState({
    search: '',
    ageGroup: 'all',
    shift: 'all',
    maxBudget: 999999,
    only24x7: false
  });

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  useEffect(() => {
    fetch(`${API_BASE}/centers`)
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : data.centers;
        if (list && list.length) {
          const enriched = list.map((c, i) => ({
            ...INITIAL_CENTERS[i % INITIAL_CENTERS.length],
            ...c,
            pricing: c.pricing || { hourly: 150, daily: 550, monthly: c.price || 4200 }
          }));
          setCenters(enriched);
        }
      })
      .catch(() => {});
  }, []);

  const filteredCenters = centers.filter((c) => {
    const q = (filters.search || '').toLowerCase();
    const matchSearch =
      (c.name || '').toLowerCase().includes(q) || (c.location || '').toLowerCase().includes(q);
    const matchAge = filters.ageGroup === 'all' || (c.ageGroups || []).includes(filters.ageGroup);
    const matchShift = filters.shift === 'all' || (c.shifts || []).includes(filters.shift);
    const matchBudget = (c.pricing?.monthly || 4000) <= filters.maxBudget;
    const match24x7 = !filters.only24x7 || c.is24x7;
    const matchFacility =
      selectedFacility === 'all' ||
      (c.facilities || []).includes(selectedFacility) ||
      (c.shifts || []).includes(selectedFacility) ||
      (c.ageGroups || []).includes(selectedFacility);

    return matchSearch && matchAge && matchShift && matchBudget && match24x7 && matchFacility;
  });

  const toggleCompare = (center) => {
    const exists = compareList.find((c) => c._id === center._id);
    if (exists) {
      setCompareList(compareList.filter((c) => c._id !== center._id));
    } else {
      if (compareList.length >= 3) {
        showToast('You can compare up to 3 centers side-by-side.');
        return;
      }
      setCompareList([...compareList, center]);
      showToast(`Added ${center.name} to comparison!`);
    }
  };

  const handleBookSlot = (newBooking) => {
    if (!user) {
      setSelectedCenter(null);
      setAuthOpen(true);
      showToast('Please login or register to confirm your booking.');
      return;
    }
    setBookings([newBooking, ...bookings]);
    setCenters(
      centers.map((c) =>
        c._id === newBooking.centerId ? { ...c, enrolled: Math.min(c.capacity, c.enrolled + 1) } : c
      )
    );
    setSelectedCenter(null);
    showToast(`🎉 Appointment & Slot confirmed for ${newBooking.childName}!`);
    setActiveTab('parent');
  };

  const estimatedMonthlyCost = Math.round(
    (calcHours * 30 + calcDays * 140) * 
    (calcShift === 'Emergency' ? 1.8 : calcShift === 'Night' ? 1.25 : 1)
  );
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800 relative">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        user={user}
        onOpenAuth={() => setAuthOpen(true)}
        onLogout={() => {
          localStorage.removeItem('user');
          setUser(null);
          showToast('Logged out successfully');
        }}
        onQuickBook={() => setSelectedCenter(centers[0])}
      />

      {/* Floating Right Action Dock */}
      <div className="fixed right-0 top-1/3 z-40 flex flex-col shadow-xl rounded-l-lg overflow-hidden">
        <a
          href="tel:+919244567677"
          className="bg-[#0f5a55] hover:bg-rose-500 text-white p-3 border-b border-teal-700 transition"
          title="Call 24×7 Helpline"
        >
          <Phone className="w-4 h-4" />
        </a>
        
        <a
          href="https://wa.me/919244567677"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#0f5a55] hover:bg-[#25D366] text-white p-3 border-b border-teal-700 transition"
          title="WhatsApp Us"
        >
          <MessageCircle className="w-4 h-4" />
        </a>

        <a
          href="mailto:care@littlestepsraipur.com"
          className="bg-[#0f5a55] hover:bg-rose-500 text-white p-3 border-b border-teal-700 transition"
          title="Email Us"
        >
          <Mail className="w-4 h-4" />
        </a>
        <a
          href="#facilities-section"
          className="bg-[#0f5a55] hover:bg-rose-500 text-white p-3 border-b border-teal-700 transition"
          title="Social & Community"
        >
          <Share2 className="w-4 h-4" />
        </a>
        <a
          href="#centers-section"
          className="bg-[#0f5a55] hover:bg-rose-500 text-white p-3 transition"
          title="Find Nearby Centers in Raipur"
        >
          <MapPin className="w-4 h-4" />
        </a>
      </div>

      {toast && (
        <div className="fixed bottom-6 left-6 z-50 bg-[#0f5a55] text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2 text-sm font-bold animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-amber-300" /> {toast}
        </div>
      )}

      <main className="flex-grow">
        {activeTab === 'explore' && (
          <>
            <section className="bg-gradient-to-br from-[#e6f5f3] via-white to-rose-50 border-b border-teal-100 py-12 px-4">
              <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-5">
                  <div className="inline-flex items-center gap-2 bg-white border border-teal-200 text-[#0f5a55] px-4 py-1.5 rounded-full text-xs font-extrabold shadow-sm">
                    <Sparkles className="w-4 h-4 text-rose-500" />
                    Raipur&apos;s #1 Verified 24×7 Crèche, Night-Shift & Pediatric Care Network
                  </div>
                  <h1 className="text-4xl sm:text-5xl font-black text-[#0f5a55] leading-tight">
                    Safe, Loving 24×7 Childcare While You Work Day or Night.
                  </h1>
                  <p className="text-slate-600 text-base leading-relaxed">
                    Whether you work hospital night shifts, corporate hours, or need emergency drop-in care, explore background-verified crèches with live slot tracking, pediatric supervision, and flexible <strong>Hourly, Daily & Monthly</strong> plans.
                  </p>
                  <div className="flex flex-wrap gap-3 pt-1">
                    <button
                      onClick={() => setSelectedCenter(centers[0])}
                      className="bg-[#0f5a55] hover:bg-[#0a413d] text-white font-extrabold px-6 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition"
                    >
                      📅 Book Instant Childcare Slot
                    </button>
                    <a
                      href="#facilities-section"
                      className="bg-white hover:bg-teal-50 text-[#0f5a55] border-2 border-[#0f5a55] font-extrabold px-6 py-3.5 rounded-xl transition"
                    >
                      Explore Facilities
                    </a>
                  </div>
                </div>

                <div className="lg:col-span-5 bg-white rounded-3xl p-6 shadow-xl border-2 border-teal-100 space-y-4">
                  <div className="flex items-center justify-between border-b pb-3">
                    <div className="flex items-center gap-2">
                      <div className="bg-teal-100 text-[#0f5a55] p-2 rounded-xl">
                        <Calculator className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-black text-[#0f5a55] text-base">Interactive Childcare Fee Estimator</h3>
                        <p className="text-xs text-slate-400">Customize your shift & hours</p>
                      </div>
                    </div>
                    <span className="bg-rose-100 text-rose-700 text-xs font-black px-2.5 py-1 rounded-full">
                      Live Quote
                    </span>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div>
                      <div className="flex justify-between font-bold text-slate-700 mb-1">
                        <span>Hours Needed Per Day:</span>
                        <span className="text-[#0f5a55] font-black">{calcHours} Hours / day</span>
                      </div>
                      <input
                        type="range"
                        min="2"
                        max="12"
                        value={calcHours}
                        onChange={(e) => setCalcHours(Number(e.target.value))}
                        className="w-full accent-[#0f5a55] cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between font-bold text-slate-700 mb-1">
                        <span>Days Per Month:</span>
                        <span className="text-[#0f5a55] font-black">{calcDays} Days / month</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="30"
                        value={calcDays}
                        onChange={(e) => setCalcDays(Number(e.target.value))}
                        className="w-full accent-[#0f5a55] cursor-pointer"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-2 pt-1">
                      {['Day', 'Night', 'Emergency'].map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setCalcShift(s)}
                          className={`py-2 rounded-xl font-extrabold border transition ${
                            calcShift === s
                              ? 'bg-[#0f5a55] text-white border-[#0f5a55]'
                              : 'bg-slate-50 text-slate-600 border-slate-200'
                          }`}
                        >
                          {s === 'Day' ? '☀️ Day' : s === 'Night' ? '🌙 Night' : '🚨 24×7'}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="bg-[#e6f5f3] p-4 rounded-2xl flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-teal-800">Estimated Monthly Plan</p>
                      <p className="text-[11px] text-teal-600">Includes meals & live activity updates</p>
                    </div>
                    <p className="text-2xl font-black text-[#0f5a55]">₹{estimatedMonthlyCost.toLocaleString()}/mo</p>
                  </div>
                </div>
              </div>
            </section>

            <FacilitiesSection
              selectedFacility={selectedFacility}
              onSelectFacility={setSelectedFacility}
            />

            <section id="centers-section" className="max-w-7xl mx-auto px-4 py-6 space-y-6">
              <FilterBar
                filters={filters}
                setFilters={setFilters}
                onReset={() => {
                  setSelectedFacility('all');
                  setFilters({ search: '', ageGroup: 'all', shift: 'all', maxBudget: 999999, only24x7: false });
                }}
              />

              {compareList.length > 0 && (
                <div className="bg-[#0f5a55] text-white p-4 rounded-2xl shadow-lg flex flex-wrap justify-between items-center gap-4">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="font-black text-sm">Comparing ({compareList.length}/3):</span>
                    {compareList.map((c) => (
                      <span key={c._id} className="bg-white/15 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-2">
                        {c.name} — ₹{c.pricing.monthly}/mo ({c.is24x7 ? '24×7' : 'Day'})
                        <button onClick={() => toggleCompare(c)}>
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => setCompareList([])}
                    className="text-xs bg-rose-500 px-3 py-1.5 rounded-lg font-bold"
                  >
                    Clear Comparison
                  </button>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 pb-12">
                {filteredCenters.map((center) => (
                  <CenterCard
                    key={center._id}
                    center={center}
                    onSelect={setSelectedCenter}
                    onCompareToggle={toggleCompare}
                    isCompared={compareList.some((c) => c._id === center._id)}
                  />
                ))}
              </div>
            </section>
          </>
        )}

        {activeTab === 'parent' && (
          <div className="max-w-7xl mx-auto px-4 py-8">
            <ParentDashboard bookings={bookings} onExplore={() => setActiveTab('explore')} />
          </div>
        )}

        {activeTab === 'provider' && (
          <div className="max-w-7xl mx-auto px-4 py-8">
            <ProviderDashboard
              centers={centers}
              bookings={bookings}
              onCreateCenter={(newCenter) => {
                setCenters([newCenter, ...centers]);
                showToast('New Center Published!');
                setActiveTab('explore');
              }}
              onUpdateBookingStatus={(idx, status) => {
                const updated = [...bookings];
                updated[idx].status = status;
                setBookings(updated);
                showToast(`Booking marked as ${status}`);
              }}
            />
          </div>
        )}

        {activeTab === 'admin' && (
          <div className="max-w-7xl mx-auto px-4 py-8">
            <AdminDashboard
              centers={centers}
              onToggleVerify={(idx) => {
                const updated = [...centers];
                updated[idx].verified = !updated[idx].verified;
                setCenters(updated);
                showToast('Verification badge updated!');
              }}
            />
          </div>
        )}
      </main>

      <div className="zigzag-top mt-10" />
      <footer className="bg-[#7ac5c0] text-[#083b37] pt-10 pb-8">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="bg-white/90 inline-block px-4 py-2 rounded-xl shadow-sm">
              <span className="text-xl font-black">
                <span className="text-rose-500">Little</span>{' '}
                <span className="text-[#0f5a55]">Steps</span>
              </span>
              <p className="text-[10px] font-bold text-slate-600">
                24×7 Childcare & Children&apos;s Platform
              </p>
            </div>
            <p className="text-xs leading-relaxed font-medium text-[#073632]">
              Little Steps & CareConnect is a one-stop digital platform for comprehensive 24×7 daycare, night-shift crèche care, and early childhood development (0–12 years) with verified caregivers and pediatric supervision.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-black text-[#0f5a55] mb-3">Quick Links</h4>
            <ul className="space-y-2 text-xs font-bold">
              <li><button onClick={() => setActiveTab('explore')} className="hover:underline">⦿ Home & Explore</button></li>
              <li><a href="#facilities-section" className="hover:underline">⦿ Available Facilities</a></li>
              <li><button onClick={() => setActiveTab('parent')} className="hover:underline">⦿ Parent Subscriptions</button></li>
              <li><button onClick={() => setActiveTab('provider')} className="hover:underline">⦿ Partner Crèche Portal</button></li>
              <li><button onClick={() => setActiveTab('admin')} className="hover:underline">⦿ Safety & Verification Audit</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-black text-[#0f5a55] mb-3">Specialities</h4>
            <ul className="space-y-2 text-xs font-bold">
              <li>⦿ 24×7 Day & Night Shift Crèche</li>
              <li>⦿ Infant & Neonatal Care (0–1.5 yrs)</li>
              <li>⦿ Montessori & Early Childhood Growth</li>
              <li>⦿ Child Nutrition & Dietetics</li>
              <li>⦿ Hourly, Daily & Monthly Plans</li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-black text-[#0f5a55] mb-3">Contact Us</h4>
            <ul className="space-y-2.5 text-xs font-bold">
              <li className="flex items-center gap-2"><Phone className="w-4 h-4" /> +91 92445-67677</li>
              <li className="flex items-center gap-2"><Phone className="w-4 h-4" /> 0771-7964942</li>
              <li className="flex items-center gap-2"><Mail className="w-4 h-4" /> care@littlestepsraipur.com</li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                <span>C-20, Shailendra Nagar, Near Bank of Baroda, Raipur - 492001</span>
              </li>
            </ul>
          </div>
        </div>
      </footer>

      {/* Centered Copyright & Action Bar */}
      <div className="bg-white py-4 px-6 text-xs font-bold text-slate-600 border-t flex flex-col md:flex-row items-center justify-between w-full relative">
        <div className="hidden md:block flex-1"></div>
        <span className="flex-1 text-center mb-3 md:mb-0">
          Copyright © 2026 Little Steps 24×7 Childcare Platform.
        </span>
        <div className="flex-1 flex items-center justify-center md:justify-end gap-4">
          {!user && (
            <button 
              onClick={() => setAdminAuthOpen(true)} 
              className="text-slate-400 hover:text-rose-500 transition underline"
            >
              Admin Access
            </button>
          )}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="bg-[#0f5a55] text-white p-2 rounded shadow hover:bg-rose-500 transition"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>

      <CenterDetailModal center={selectedCenter} onClose={() => setSelectedCenter(null)} onBook={handleBookSlot} />

      <AuthModal
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
        onAuthSuccess={(userData) => {
          localStorage.setItem('user', JSON.stringify(userData));
          setUser(userData);
          setAuthOpen(false);
          showToast(`Welcome, ${userData.name}!`);
        }}
      />

      <AdminLoginModal
        isOpen={adminAuthOpen}
        onClose={() => setAdminAuthOpen(false)}
        onAuthSuccess={(userData) => {
          localStorage.setItem('user', JSON.stringify(userData));
          setUser(userData);
          setAdminAuthOpen(false);
          setActiveTab('admin');
          showToast(`Secure System Access Granted.`);
        }}
      />
    </div>
  );
}