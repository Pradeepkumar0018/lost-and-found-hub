import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLostFound } from '../../context/LostFoundContext';
import { useAuth } from '../../context/AuthContext';
import { CATEGORIES } from '../../constants/categories';
import { Button } from '../common/Button';
import {
  Smartphone,
  FileText,
  ShoppingBag,
  Dog,
  Laptop,
  Key,
  CreditCard,
  Watch,
  HelpCircle,
  Box,
  MapPin,
  Calendar,
  Clock,
  Lock,
  User,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Camera,
  ShieldAlert,
  Sparkles
} from 'lucide-react';

export const ReportLostWizard = () => {
  const navigate = useNavigate();
  const { addReport } = useLostFound();
  const { currentUser } = useAuth();

  const [currentStep, setCurrentStep] = useState(1);

  // Form State
  const [category, setCategory] = useState('phone');
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [color, setColor] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  const [area, setArea] = useState('');
  const [city, setCity] = useState('Chennai');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [time, setTime] = useState('10:00 AM');

  const [privateDetail, setPrivateDetail] = useState('');

  const [reporterName, setReporterName] = useState(currentUser ? currentUser.name : '');
  const [reporterEmail, setReporterEmail] = useState(currentUser ? currentUser.email : '');
  const [reporterPhone, setReporterPhone] = useState(currentUser ? currentUser.phone : '');
  const [anonymous, setAnonymous] = useState(false);

  const [validationError, setValidationError] = useState('');

  const categoryIcons = {
    phone: Smartphone,
    document: FileText,
    bag: ShoppingBag,
    pet: Dog,
    electronics: Laptop,
    keys: Key,
    wallet: CreditCard,
    accessories: Watch,
    mystery: HelpCircle,
    other: Box
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const validateCurrentStep = () => {
    setValidationError('');

    if (currentStep === 1) {
      if (!category) {
        setValidationError('Please select an item category.');
        return false;
      }
    } else if (currentStep === 2) {
      if (!name.trim()) {
        setValidationError('Item name is required.');
        return false;
      }
      if (!description.trim()) {
        setValidationError('Detailed description is required.');
        return false;
      }
    } else if (currentStep === 3) {
      if (!area.trim() || !city.trim()) {
        setValidationError('Area and City are required.');
        return false;
      }
    } else if (currentStep === 4) {
      if (!date) {
        setValidationError('Date last seen is required.');
        return false;
      }
    } else if (currentStep === 5) {
      if (!privateDetail.trim() || privateDetail.trim().length < 4) {
        setValidationError('Private verification detail must be at least 4 characters long.');
        return false;
      }
    } else if (currentStep === 6) {
      if (!anonymous && (!reporterName.trim() || !reporterEmail.trim())) {
        setValidationError('Name and email are required unless kept anonymous.');
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      setCurrentStep((prev) => Math.min(prev + 1, 7));
    }
  };

  const handlePrev = () => {
    setValidationError('');
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newReportData = {
      type: 'lost',
      category,
      item: {
        name,
        brand,
        model,
        color,
        description,
        image: image || 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=800&q=80'
      },
      location: {
        area,
        city,
        latitude: 12.9716,
        longitude: 77.5946
      },
      date,
      time,
      privateVerificationDetail: privateDetail,
      reporter: {
        name: anonymous ? 'Anonymous Reporter' : reporterName,
        email: anonymous ? 'protected@lafhub.org' : reporterEmail,
        phone: anonymous ? '' : reporterPhone,
        anonymous
      }
    };

    const createdReport = addReport(newReportData);
    navigate(`/item/${createdReport.id}`);
  };

  return (
    <div className="max-w-3xl mx-auto my-8 px-4">
      
      {/* Wizard Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-2">
          <span>Step {currentStep} of 7</span>
          <span className="text-red-600 dark:text-red-400 font-extrabold uppercase tracking-wider">
            🔴 Create Lost Item Report
          </span>
        </div>

        <div className="h-2 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-red-500 to-amber-500 transition-all duration-300 rounded-full"
            style={{ width: `${(currentStep / 7) * 100}%` }}
          />
        </div>
      </div>

      {/* Main Wizard Form Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
        {validationError && (
          <div className="mb-6 p-4 rounded-2xl bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs font-semibold flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 shrink-0" />
            <span>{validationError}</span>
          </div>
        )}

        {/* STEP 1: CATEGORY */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
                Select Item Category
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Choose the category that best fits your missing item.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {CATEGORIES.map((cat) => {
                const IconComp = categoryIcons[cat.id] || Box;
                const isSelected = category === cat.id;

                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setCategory(cat.id)}
                    className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between space-y-3 ${
                      isSelected
                        ? 'bg-red-50 dark:bg-red-950/60 border-red-500 text-red-700 dark:text-red-300 ring-2 ring-red-500/20 shadow-md'
                        : 'bg-slate-50/50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                        isSelected ? 'bg-red-500 text-white' : 'bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      <IconComp className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold">{cat.label}</h4>
                      <p className="text-[10px] text-slate-400 line-clamp-1">{cat.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 2: ITEM DETAILS */}
        {currentStep === 2 && (
          <div className="space-y-4 animate-fade-in">
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
              Item Details & Description
            </h2>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Item Title / Name *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. iPhone 15 Pro, Milo Golden Retriever, Leather Wallet"
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Brand / Make
                </label>
                <input
                  type="text"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  placeholder="e.g. Apple, Samsonite"
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Model / Variant
                </label>
                <input
                  type="text"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  placeholder="e.g. 256GB, M3 Max"
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Color
                </label>
                <input
                  type="text"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  placeholder="e.g. Natural Titanium, Black"
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Detailed Public Description *
              </label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe visible features, cover/case type, stickers, or condition..."
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
                <Camera className="w-4 h-4 text-red-500" /> Item Photo (Upload or Preview)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-red-50 file:text-red-700 dark:file:bg-red-950 dark:file:text-red-300 hover:file:bg-red-100"
              />
              {image && (
                <div className="mt-3 h-32 w-32 rounded-2xl overflow-hidden border-2 border-red-400">
                  <img src={image} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
          </div>
        )}

        {/* STEP 3: LOCATION */}
        {currentStep === 3 && (
          <div className="space-y-4 animate-fade-in">
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
              Last Known Location
            </h2>
            <p className="text-xs text-slate-500">
              Where did you last have or notice the item missing?
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Specific Area / Venue *
                </label>
                <input
                  type="text"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  placeholder="e.g. SRM Campus Dining Hall, Gate 3"
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  City *
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g. Chennai, Bengaluru, Delhi"
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>

            {/* Map Location Selector Mock */}
            <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300">
                <MapPin className="w-4 h-4 text-red-500" /> Map Location Visualizer Pin
              </div>
              <p className="text-[11px] text-slate-500">
                Coordinates auto-calibrated to {city} ({area || 'Central Area'}).
              </p>
            </div>
          </div>
        )}

        {/* STEP 4: DATE & TIME */}
        {currentStep === 4 && (
          <div className="space-y-4 animate-fade-in">
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
              Date & Approximate Time
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
                  <Calendar className="w-4 h-4 text-red-500" /> Date Lost *
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
                  <Clock className="w-4 h-4 text-red-500" /> Approx Time *
                </label>
                <input
                  type="text"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  placeholder="e.g. 10:20 AM"
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-900 dark:text-white"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: PRIVATE VERIFICATION DETAIL */}
        {currentStep === 5 && (
          <div className="space-y-4 animate-fade-in">
            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800/60 text-amber-900 dark:text-amber-200 space-y-1">
              <h4 className="text-xs font-bold flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-amber-600" /> Signature Feature: Private Ownership Detail
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Add one secret detail that only you as the legitimate owner would know. This value is <strong>NEVER displayed publicly</strong> and will be required during ownership claim verification.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Private Verification Detail *
              </label>
              <input
                type="text"
                value={privateDetail}
                onChange={(e) => setPrivateDetail(e.target.value)}
                placeholder="e.g. Tiny crack near back camera lens, specific lock screen wallpaper..."
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>
        )}

        {/* STEP 6: CONTACT & PRIVACY */}
        {currentStep === 6 && (
          <div className="space-y-4 animate-fade-in">
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
              Reporter Contact & Privacy
            </h2>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  Keep Reporter Identity Anonymous
                </span>
                <p className="text-[11px] text-slate-400">
                  Hides personal name and phone from public listing
                </p>
              </div>
              <input
                type="checkbox"
                checked={anonymous}
                onChange={(e) => setAnonymous(e.target.checked)}
                className="w-4 h-4 text-red-600 rounded focus:ring-red-500"
              />
            </div>

            {!anonymous && (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    value={reporterName}
                    onChange={(e) => setReporterName(e.target.value)}
                    placeholder="e.g. Rohan Sharma"
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-900 dark:text-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={reporterEmail}
                      onChange={(e) => setReporterEmail(e.target.value)}
                      placeholder="rohan@example.com"
                      className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={reporterPhone}
                      onChange={(e) => setReporterPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* STEP 7: REVIEW & PUBLISH */}
        {currentStep === 7 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
                Review & Publish Lost Report
              </h2>
              <p className="text-xs text-slate-500">
                Confirm your details before launching the Missing Trail timeline.
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-3">
                <span className="text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-wider">
                  🔴 Lost Report Summary
                </span>
                <span className="text-xs font-mono text-slate-400">Category: {category}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-slate-400 block">Item Name:</span>
                  <strong className="text-slate-900 dark:text-white font-bold">{name}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block">Location:</span>
                  <strong className="text-slate-900 dark:text-white font-bold">{area}, {city}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block">Date & Time:</span>
                  <strong className="text-slate-900 dark:text-white font-bold">{date} ({time})</strong>
                </div>
                <div>
                  <span className="text-slate-400 block">Private Secret Set:</span>
                  <strong className="text-emerald-600 dark:text-emerald-400 font-bold">Encrypted / Saved</strong>
                </div>
              </div>

              <div>
                <span className="text-slate-400 text-xs block mb-1">Public Description:</span>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                  {description}
                </p>
              </div>
            </div>

            <Button
              onClick={handleSubmit}
              variant="primary"
              size="lg"
              className="w-full bg-red-600 hover:bg-red-700 text-white shadow-xl shadow-red-500/25"
            >
              Publish Lost Report & Launch Missing Trail
            </Button>
          </div>
        )}

        {/* Wizard Controls */}
        <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <Button
            type="button"
            variant="ghost"
            onClick={handlePrev}
            disabled={currentStep === 1}
            icon={ArrowLeft}
          >
            Previous Step
          </Button>

          {currentStep < 7 && (
            <Button type="button" variant="primary" onClick={handleNext} className="bg-red-600 hover:bg-red-700">
              Next Step
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
