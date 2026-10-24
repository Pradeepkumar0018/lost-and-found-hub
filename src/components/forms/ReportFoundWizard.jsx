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
  User,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Camera,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export const ReportFoundWizard = () => {
  const navigate = useNavigate();
  const { addReport } = useLostFound();
  const { currentUser } = useAuth();

  const [currentStep, setCurrentStep] = useState(1);

  // Form State
  const [category, setCategory] = useState('wallet');
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [color, setColor] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  const [area, setArea] = useState('');
  const [city, setCity] = useState('Bengaluru');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [time, setTime] = useState('11:00 AM');

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
        setValidationError('Please select a category.');
        return false;
      }
    } else if (currentStep === 2) {
      if (!name.trim()) {
        setValidationError('Item name is required.');
        return false;
      }
      if (!description.trim()) {
        setValidationError('Found item description is required.');
        return false;
      }
    } else if (currentStep === 3) {
      if (!area.trim() || !city.trim()) {
        setValidationError('Found location area and city are required.');
        return false;
      }
    } else if (currentStep === 4) {
      if (!date) {
        setValidationError('Date found is required.');
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
      type: 'found',
      category,
      item: {
        name,
        brand,
        model,
        color,
        description,
        image: image || 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80'
      },
      location: {
        area,
        city,
        latitude: 12.9716,
        longitude: 77.5946
      },
      date,
      time,
      privateVerificationDetail: privateDetail || 'Verification detail provided by finder',
      reporter: {
        name: anonymous ? 'Anonymous Finder' : reporterName,
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
          <span className="text-emerald-600 dark:text-emerald-400 font-extrabold uppercase tracking-wider">
            🟢 Create Found Item Report
          </span>
        </div>

        <div className="h-2 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-300 rounded-full"
            style={{ width: `${(currentStep / 7) * 100}%` }}
          />
        </div>
      </div>

      {/* Main Wizard Form Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
        {validationError && (
          <div className="mb-6 p-4 rounded-2xl bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs font-semibold">
            {validationError}
          </div>
        )}

        {/* STEP 1: CATEGORY */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
                Select Found Item Category
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Help owners locate their missing item faster.
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
                        ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-700 dark:text-emerald-300 ring-2 ring-emerald-500/20 shadow-md'
                        : 'bg-slate-50/50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                        isSelected ? 'bg-emerald-500 text-white' : 'bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300'
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

        {/* STEP 2: DETAILS */}
        {currentStep === 2 && (
          <div className="space-y-4 animate-fade-in">
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
              Found Item Description
            </h2>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Found Item Title / Name *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Leather Wallet, Samsung Galaxy Phone, Key Ring"
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
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
                  placeholder="e.g. Tommy Hilfiger"
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
                  placeholder="e.g. Bifold Classic"
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
                  placeholder="e.g. Black"
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Public Description *
              </label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe where it was secured and public observable features..."
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
                <Camera className="w-4 h-4 text-emerald-500" /> Photo of Found Item
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-700 dark:file:bg-emerald-950 dark:file:text-emerald-300 hover:file:bg-emerald-100"
              />
              {image && (
                <div className="mt-3 h-32 w-32 rounded-2xl overflow-hidden border-2 border-emerald-400">
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
              Where Was It Found?
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Area / Location Found *
                </label>
                <input
                  type="text"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  placeholder="e.g. Metro Station Gate 2 Escalator"
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
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
                  placeholder="e.g. Bengaluru, Mumbai"
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: DATE */}
        {currentStep === 4 && (
          <div className="space-y-4 animate-fade-in">
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
              Date & Time Found
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
                  <Calendar className="w-4 h-4 text-emerald-500" /> Date Found *
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
                  <Clock className="w-4 h-4 text-emerald-500" /> Time Found *
                </label>
                <input
                  type="text"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  placeholder="e.g. 09:10 AM"
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-900 dark:text-white"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: VERIFICATION DETAIL (OPTIONAL) */}
        {currentStep === 5 && (
          <div className="space-y-4 animate-fade-in">
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
              Private Detail Verification (Optional for Finder)
            </h2>
            <p className="text-xs text-slate-500">
              If you noticed a hidden detail (e.g. card name inside wallet, custom sticker), enter it here so claimants can verify against it.
            </p>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Private Verification Key
              </label>
              <input
                type="text"
                value={privateDetail}
                onChange={(e) => setPrivateDetail(e.target.value)}
                placeholder="e.g. Library card named David Miller inside hidden flap"
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-900 dark:text-white"
              />
            </div>
          </div>
        )}

        {/* STEP 6: CONTACT */}
        {currentStep === 6 && (
          <div className="space-y-4 animate-fade-in">
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
              Finder Contact & Privacy
            </h2>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  Keep Finder Identity Private
                </span>
                <p className="text-[11px] text-slate-400">
                  Protects your contact details until an owner claim is verified.
                </p>
              </div>
              <input
                type="checkbox"
                checked={anonymous}
                onChange={(e) => setAnonymous(e.target.checked)}
                className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
              />
            </div>

            {!anonymous && (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Finder Name *
                  </label>
                  <input
                    type="text"
                    value={reporterName}
                    onChange={(e) => setReporterName(e.target.value)}
                    placeholder="e.g. Sneha Kapur"
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
                      placeholder="sneha@example.com"
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
                      placeholder="+91 94455 66778"
                      className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* STEP 7: REVIEW */}
        {currentStep === 7 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
                Review & Publish Found Report
              </h2>
              <p className="text-xs text-slate-500">
                Confirm your found item listing to enable community recovery.
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-3">
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                  🟢 Found Report Summary
                </span>
                <span className="text-xs font-mono text-slate-400">Category: {category}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-slate-400 block">Item Name:</span>
                  <strong className="text-slate-900 dark:text-white font-bold">{name}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block">Location Found:</span>
                  <strong className="text-slate-900 dark:text-white font-bold">{area}, {city}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block">Date Found:</span>
                  <strong className="text-slate-900 dark:text-white font-bold">{date} ({time})</strong>
                </div>
              </div>
            </div>

            <Button
              onClick={handleSubmit}
              variant="primary"
              size="lg"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-xl shadow-emerald-500/25"
            >
              Publish Found Report
            </Button>
          </div>
        )}

        {/* Controls */}
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
            <Button type="button" variant="primary" onClick={handleNext} className="bg-emerald-600 hover:bg-emerald-700">
              Next Step
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
