import React, { useMemo, useState } from "react";
import HospitalBanner from "./HospitalBanner";

// Hospitals.jsx
// Recreates the "Hospital Management" UI from the provided screenshot using Tailwind CSS.
// - Responsive layout
// - Top stat cards, search bar
// - Table with avatar/icon, services badges, capacity, contact, status, actions
// - Simple client-side search/filtering

const HOSPITALS = [
  {
    id: 1,
    name: "Apollo Multi-Speciality Hospital",
    city: "Mumbai",
    services: ["ICU", "OPD", "Emergency"],
    extraServicesCount: 3,
    capacity: "350 beds",
    contact: "+91 22 2345 6789",
    status: "Active",
  },
  {
    id: 2,
    name: "Fortis Healthcare",
    city: "Delhi",
    services: ["ICU", "OPD", "Emergency"],
    extraServicesCount: 2,
    capacity: "280 beds",
    contact: "+91 11 4567 8901",
    status: "Active",
  },
  {
    id: 3,
    name: "Max Super Speciality",
    city: "Bangalore",
    services: ["ICU", "OPD", "Lab"],
    extraServicesCount: 2,
    capacity: "420 beds",
    contact: "+91 80 5678 9012",
    status: "Active",
  },
  {
    id: 4,
    name: "AIIMS Regional Center",
    city: "Chennai",
    services: ["ICU", "OPD", "Emergency"],
    extraServicesCount: 3,
    capacity: "500 beds",
    contact: "+91 44 6789 0123",
    status: "Active",
  },
  {
    id: 5,
    name: "Medanta - The Medicity",
    city: "Gurgaon",
    services: ["ICU", "OPD", "Emergency"],
    extraServicesCount: 2,
    capacity: "380 beds",
    contact: "+91 124 7890 1234",
    status: "Active",
  },
  {
    id: 6,
    name: "Manipal Hospital",
    city: "Hyderabad",
    services: ["OPD", "Emergency", "Lab"],
    extraServicesCount: 0,
    capacity: "150 beds",
    contact: "+91 40 8901 2345",
    status: "Maintenance",
  },
];

function IconHospital() {
  return (
    <svg
      className="w-5 h-5 text-white"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <rect x="3" y="7" width="18" height="13" rx="2" strokeWidth="1.5" />
      <path d="M8 7v-3h8v3" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 11v6" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function IconSearch() {
  return (
    <svg
      className="w-4 h-4 text-gray-400"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path
        d="M21 21l-4.35-4.35"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="11"
        cy="11"
        r="6"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconEdit() {
  return (
    <svg
      className="w-5 h-5 text-gray-600"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path
        d="M15.232 5.232l3.536 3.536"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 20l7.586-7.586"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconTrash() {
  return (
    <svg
      className="w-5 h-5 text-gray-600"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path
        d="M19 7L5 7"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 7l1 12a2 2 0 002 2h6a2 2 0 002-2l1-12"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Hospitals() {
  const [query, setQuery] = useState("");
  const [isForm, setIsForm] = useState(false);
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return HOSPITALS;
    return HOSPITALS.filter((h) => {
      return (
        h.name.toLowerCase().includes(q) || h.city.toLowerCase().includes(q)
      );
    });
  }, [query]);

  const totalHospitals = HOSPITALS.length;
  const activeCount = HOSPITALS.filter((h) => h.status === "Active").length;
  const totalBeds =
    HOSPITALS.reduce((sum, h) => sum + parseInt(h.capacity, 10), 0) || 2080; // fallback
  const citiesCovered = new Set(HOSPITALS.map((h) => h.city)).size;

  return (
    <div className="min-h-screen bg-gray-50 p-6 lg:p-10">
      <div className="max-w-[1200px] mx-auto">
        <header className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">
              Hospital Management
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage healthcare facilities in the network
            </p>
          </div>

          <div>
            <button className="inline-flex items-center gap-2 bg-emerald-500 text-white px-4 py-2 rounded-lg shadow cursor-pointer hover:bg-emerald-600"
              onClick={() => setIsForm(!isForm)}
            >
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  d="M12 5v14M5 12h14"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Add Hospital
            </button>
          </div>
        </header>

        {isForm && (<div>
          <HospitalBanner onClose={setIsForm} isOpen={isForm}/>
        </div>)}

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="p-5 rounded-xl bg-white shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-emerald-700">
              {totalHospitals}
            </div>
            <div className="text-sm text-gray-400 mt-1">Total Hospitals</div>
          </div>

          <div className="p-5 rounded-xl bg-white shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-emerald-700">
              {activeCount}
            </div>
            <div className="text-sm text-gray-400 mt-1">Active</div>
          </div>

          <div className="p-5 rounded-xl bg-white shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-indigo-600">2080</div>
            <div className="text-sm text-gray-400 mt-1">Total Beds</div>
          </div>

          <div className="p-5 rounded-xl bg-white shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-purple-600">
              {citiesCovered}
            </div>
            <div className="text-sm text-gray-400 mt-1">Cities Covered</div>
          </div>
        </div>

        {/* Search */}
        <div className="mb-4">
          <div className="max-w-xl">
            <label className="relative block">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <IconSearch />
              </span>
              <input
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-100"
                placeholder="Search hospitals by name or city..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </label>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow border border-gray-100 overflow-x-auto">
          <table className="min-w-full table-fixed">
            <thead className="bg-white">
              <tr className="text-sm text-gray-600">
                <th
                  scope="col"
                  className="px-6 py-4 text-left font-medium col-span-2"
                >
                  Hospital
                </th>
                <th scope="col" className="px-6 py-4 text-left font-medium">
                  Services
                </th>
                <th scope="col" className="px-6 py-4 text-left font-medium">
                  Capacity
                </th>
                <th scope="col" className="px-6 py-4 text-left font-medium">
                  Contact
                </th>
                <th scope="col" className="px-6 py-4 text-left font-medium">
                  Status
                </th>
                <th scope="col" className="px-6 py-4 text-right font-medium">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filtered.map((h) => (
                <React.Fragment key={h.id}>
                  {/* Desktop row (table row) */}
                  <tr className="hidden md:table-row hover:bg-gray-50">
                    <td className="px-6 py-4 align-middle">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-lg bg-emerald-500 flex items-center justify-center text-white mr-4">
                          <IconHospital />
                        </div>
                        <div>
                          <div className="font-medium text-sm text-gray-800">
                            {h.name}
                          </div>
                          <div className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                            <svg
                              className="w-3 h-3 text-gray-400"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                            >
                              <path
                                d="M12 11a4 4 0 100-8 4 4 0 000 8z"
                                strokeWidth="1.2"
                              />
                              <path d="M12 2v0" strokeWidth="1.2" />
                            </svg>
                            <span>{h.city}</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 align-middle text-sm">
                      <div className="flex items-center gap-2 text-black">
                        {h.services.map((s) => (
                          <span
                            key={s}
                            className="inline-block text-xs px-2 py-1 rounded-md bg-gray-50 border border-gray-200"
                          >
                            {s}
                          </span>
                        ))}
                        {h.extraServicesCount > 0 && (
                          <span className="inline-block text-xs px-2 py-1 rounded-md bg-gray-50 border border-gray-200">
                            +{h.extraServicesCount}
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="px-6 py-4 align-middle text-sm text-gray-700">
                      {h.capacity}
                    </td>

                    <td className="px-6 py-4 align-middle text-sm text-gray-700">
                      {h.contact}
                    </td>

                    <td className="px-6 py-4 align-middle">
                      <span
                        className={`inline-flex items-center px-3 py-1 text-sm font-semibold rounded-full ${
                          h.status === "Active"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                            : "bg-amber-50 text-amber-700 border border-amber-100"
                        }`}
                      >
                        {h.status}
                      </span>
                    </td>

                    <td className="px-6 py-4 align-middle text-right">
                      <button className="p-2 rounded hover:bg-gray-100 inline-flex items-center mr-2">
                        <IconEdit />
                      </button>
                      <button className="p-2 rounded hover:bg-gray-100 inline-flex items-center">
                        <IconTrash />
                      </button>
                    </td>
                  </tr>

                  {/* Mobile stacked card (kept as before) */}
                  <tr className="md:hidden">
                    <td colSpan={6} className="px-4 py-4">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-lg bg-emerald-500 flex items-center justify-center text-white">
                          <IconHospital />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium text-gray-800">
                                {h.name}
                              </div>
                              <div className="text-xs text-gray-400 mt-1">
                                {h.city}
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <button className="p-2 rounded hover:bg-gray-100">
                                <IconEdit />
                              </button>
                              <button className="p-2 rounded hover:bg-gray-100">
                                <IconTrash />
                              </button>
                            </div>
                          </div>

                          <div className="mt-3 grid grid-cols-2 gap-2 text-sm text-gray-700">
                            <div>
                              <div className="text-xs text-gray-400">
                                Services
                              </div>
                              <div className="mt-1 flex flex-wrap gap-2">
                                {h.services.map((s) => (
                                  <span
                                    key={s}
                                    className="text-xs px-2 py-1 rounded-md bg-gray-50 border border-gray-200"
                                  >
                                    {s}
                                  </span>
                                ))}
                                {h.extraServicesCount > 0 && (
                                  <span className="text-xs px-2 py-1 rounded-md bg-gray-50 border border-gray-200">
                                    +{h.extraServicesCount}
                                  </span>
                                )}
                              </div>
                            </div>

                            <div>
                              <div className="text-xs text-gray-400">
                                Capacity
                              </div>
                              <div className="mt-1">{h.capacity}</div>
                            </div>

                            <div className="col-span-2">
                              <div className="text-xs text-gray-400">
                                Contact
                              </div>
                              <div className="mt-1">{h.contact}</div>
                            </div>

                            <div className="col-span-2">
                              <div className="text-xs text-gray-400">
                                Status
                              </div>
                              <div className="mt-1">
                                <span
                                  className={`inline-flex items-center px-3 py-1 text-sm font-semibold rounded-full ${
                                    h.status === "Active"
                                      ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                                      : "bg-amber-50 text-amber-700 border border-amber-100"
                                  }`}
                                >
                                  {h.status}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 text-sm text-gray-500">
          © 2024 Digiihospital. Built for Healthcare Hackathon.
        </div>
      </div>
    </div>
  );
}
