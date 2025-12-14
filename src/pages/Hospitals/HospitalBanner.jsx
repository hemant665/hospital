import React, { useEffect, useState } from 'react';


const SERVICES = [
  'ICU',
  'OPD',
  'Emergency',
  'Lab',
  'Radiology',
  'Pharmacy',
  'Surgery',
];

export default function HospitalBanner({isOpen, onClose}) {

  const [hospitalName, setHospitalName] = useState('');
  const [city, setCity] = useState('');
  const [beds, setBeds] = useState('');
  const [contact, setContact] = useState('');
  const [selectedServices, setSelectedServices] = useState(new Set());
  const [errors, setErrors] = useState({});

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose?.(false);
    }
    if (isOpen) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) {
      // reset form when closed
      setHospitalName('');
      setCity('');
      setBeds('');
      setContact('');
      setSelectedServices(new Set());
      setErrors({});
    }
  }, [isOpen]);

  const toggleService = (svc) => {
    setSelectedServices((prev) => {
      const next = new Set(prev);
      if (next.has(svc)) next.delete(svc);
      else next.add(svc);
      return next;
    });
  };

  const validate = () => {
    const e = {};
    if (!hospitalName.trim()) e.hospitalName = 'Hospital name is required';
    if (!city.trim()) e.city = 'City is required';
    // beds optional but if given must be number
    if (beds && isNaN(Number(beds))) e.beds = 'Enter a valid number';
    // basic phone validation
    if (contact && !/^\+?\d[\d\s-]{6,}$/.test(contact)) e.contact = 'Enter a valid phone';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleAdd = () => {
    if (!validate()) return;
    const payload = {
      name: hospitalName.trim(),
      city: city.trim(),
      beds: beds ? Number(beds) : null,
      contact: contact.trim(),
      services: Array.from(selectedServices),
    };

    // call parent handler
    onAdd(payload);
    // close modal (parent might close itself in onAdd)
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="absolute h-full w-full left-0 top-0 flex items-center justify-center bg-black/50  z-40">
      {/* backdrop */}

      {/* modal */}
      <div className="relative z-50 bg-white w-full h-full max-w-[50rem] max-h-[34rem] rounded-xl shadow-2xl p-6 mx-4">
        {/* close X */}
        <button
          aria-label="Close"
          onClick={() => onClose(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 p-2 rounded-full"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M6 18L18 6M6 6l12 12" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-emerald-400 flex items-center justify-center text-white">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <rect x="3" y="7" width="18" height="13" rx="2" strokeWidth="1.5" />
              <path d="M8 7v-3h8v3" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Add New Hospital</h3>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Hospital Name <span className="text-rose-500">*</span></label>
            <input
              value={hospitalName}
              onChange={(e) => setHospitalName(e.target.value)}
              className={`mt-2 w-full px-4 py-3 rounded-md border text-black ${errors.hospitalName ? 'border-rose-300' : 'border-gray-200'} focus:outline-none`}
              placeholder="Enter hospital name"
            />
            {errors.hospitalName && <div className="text-rose-600 text-xs mt-1">{errors.hospitalName}</div>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">City <span className="text-rose-500">*</span></label>
              <input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className={`mt-2 w-full px-4 py-3 rounded-md border text-black ${errors.city ? 'border-rose-300' : 'border-gray-200'} focus:outline-none`}
                placeholder="Enter city"
              />
              {errors.city && <div className="text-rose-600 text-xs mt-1">{errors.city}</div>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Bed Capacity</label>
              <input
                value={beds}
                onChange={(e) => setBeds(e.target.value)}
                className={`mt-2 w-full px-4 py-3 rounded-md border text-black ${errors.beds ? 'border-rose-300' : 'border-gray-200'} focus:outline-none`}
                placeholder="e.g., 200"
              />
              {errors.beds && <div className="text-rose-600 text-xs mt-1">{errors.beds}</div>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Contact Number</label>
            <input
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className={`mt-2 w-full px-4 py-3 rounded-md border text-black ${errors.contact ? 'border-rose-300' : 'border-gray-200'} focus:outline-none`}
              placeholder="+91 XXXXXXXXXX"
            />
            {errors.contact && <div className="text-rose-600 text-xs mt-1">{errors.contact}</div>}
          </div>

          <div>
            <div className="text-sm font-medium text-gray-700 mb-2">Services Available</div>
            <div className="flex flex-wrap gap-3">
              {SERVICES.map((s) => {
                const selected = selectedServices.has(s);
                return (
                  <button
                    key={s}
                    type="button"
                    onClick={() => toggleService(s)}
                    className={`px-3 py-1.5 text-sm rounded-md border shadow-sm ${selected ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-white border-gray-200 text-gray-700'}`}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => onClose(false)}
            className="px-4 py-2 bg-white border border-gray-200 rounded-md shadow-sm text-black cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleAdd}
            className="px-5 py-2 rounded-md bg-emerald-300 text-white font-medium shadow-sm hover:opacity-95 cursor-pointer"
          >
            Add Hospital
          </button>
        </div>
      </div>
    </div>
  );
}
