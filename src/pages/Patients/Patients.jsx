import React, { useMemo, useState } from "react";

// Patients.jsx
// A single-file React component that reproduces the provided "Patient Management" UI using Tailwind CSS.
// - Responsive: table on wide screens, stacked cards on small screens
// - Search by name / ABHA ID / linked hospital
// - Top stat cards, search input, table with avatar, ABHA badge, blood group, hospital, contact, actions

const patientsData = [
  {
    id: 1,
    name: "Rahul Sharma",
    age: 35,
    gender: "Male",
    abha: "91–2345–6789–0123",
    blood: "B+",
    hospital: "Apollo Multi-Speciality Hospital",
    contact: "+91 98765 43210",
  },
  {
    id: 2,
    name: "Priya Patel",
    age: 28,
    gender: "Female",
    abha: "91–3456–7890–1234",
    blood: "A+",
    hospital: "Fortis Healthcare",
    contact: "+91 87654 32109",
  },
  {
    id: 3,
    name: "Amit Kumar",
    age: 45,
    gender: "Male",
    abha: "91–4567–8901–2345",
    blood: "O+",
    hospital: "Max Super Speciality",
    contact: "+91 76543 21098",
  },
  {
    id: 4,
    name: "Sneha Reddy",
    age: 32,
    gender: "Female",
    abha: "91–5678–9012–3456",
    blood: "AB+",
    hospital: "AIIMS Regional Center",
    contact: "+91 65432 10987",
  },
  {
    id: 5,
    name: "Vikram Singh",
    age: 52,
    gender: "Male",
    abha: "91–6789–0123–4567",
    blood: "B-",
    hospital: "Medanta - The Medicity",
    contact: "+91 54321 09876",
  },
  {
    id: 6,
    name: "Anita Desai",
    age: 41,
    gender: "Female",
    abha: "91–7890–1234–5678",
    blood: "A-",
    hospital: "Apollo Multi-Speciality Hospital",
    contact: "+91 43210 98765",
  },
  {
    id: 7,
    name: "Rajesh Gupta",
    age: 38,
    gender: "Male",
    abha: "91–8901–2345–6789",
    blood: "O-",
    hospital: "Manipal Hospital",
    contact: "+91 32109 87654",
  },
  {
    id: 8,
    name: "Kavitha Nair",
    age: 29,
    gender: "Female",
    abha: "91–9012–3456–7890",
    blood: "AB-",
    hospital: "Fortis Healthcare",
    contact: "+91 21098 76543",
  },
];

function StatCard({ value, label, bg = "bg-white" }) {
  return (
    <div className={`flex-1 p-5 rounded-xl shadow-sm ${bg}`}>
      <div className="text-2xl font-bold text-indigo-600">{value}</div>
      <div className="text-sm text-gray-500 mt-1">{label}</div>
    </div>
  );
}

function IconSearch() {
  return (
    <svg
      className="w-5 h-5 text-gray-400"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
      />
    </svg>
  );
}

function IconHospital() {
  return (
    <svg
      className="w-4 h-4 inline-block mr-2 text-teal-600"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 21h18M4 10h16v11H4zM10 2v6M14 2v6M10 8h4"
      />
    </svg>
  );
}

export default function Patients() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return patientsData;
    return patientsData.filter((p) => {
      return (
        p.name.toLowerCase().includes(q) ||
        p.abha.toLowerCase().includes(q) ||
        p.hospital.toLowerCase().includes(q)
      );
    });
  }, [query]);

  const total = patientsData.length;
  const male = patientsData.filter((p) => p.gender === "Male").length;
  const female = patientsData.filter((p) => p.gender === "Female").length;
  const hospitalLinked = new Set(patientsData.map((p) => p.hospital)).size;

  return (
    <div className="p-6 lg:p-10 bg-gray-50 min-h-screen">
      <div className="max-w-[1200px] mx-auto">
        <header className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">
              Patient Management
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Register and manage patient records
            </p>
          </div>
          <div>
            <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg shadow hover:bg-emerald-700">
              + Register Patient
            </button>
          </div>
        </header>

        {/* stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard value={total} label="Total Patients" bg="bg-white" />
          <StatCard
            value={hospitalLinked - 0}
            label="Hospital Linked"
            bg="bg-white"
          />
          <StatCard value={male} label="Male Patients" bg="bg-white" />
          <StatCard value={female} label="Female Patients" bg="bg-white" />
        </div>

        {/* Search */}
        <div className="mb-4">
          <div className="max-w-xl">
            <label className="relative block">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <IconSearch />
              </span>
              <input
                type="search"
                placeholder="Search by name, ABHA ID, or hospital..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-100"
              />
            </label>
          </div>
        </div>

        {/* Table / List */}
        <div className="bg-white rounded-xl shadow border border-gray-100 overflow-hidden">
          {/* Header row for large screens */}
          <div className="hidden md:grid grid-cols-6 gap-4 px-6 py-4 text-sm text-gray-600 border-b">
            <div className="col-span-2 font-medium">Patient</div>
            <div className="font-medium">ABHA ID</div>
            <div className="font-medium">Blood Group</div>
            <div className="font-medium">Linked Hospital</div>
            <div className="font-medium">Contact</div>
            <div className="font-medium text-right">Actions</div>
          </div>

          {/* table wrapper */}
          <div className="bg-white rounded-xl shadow border border-gray-100 overflow-x-auto">
            <table className="min-w-full table-fixed">
              <thead className="bg-white">
                <tr className="text-sm text-gray-600">
                  <th
                    scope="col"
                    className="px-6 py-4 text-left font-medium col-span-2"
                  >
                    Patient
                  </th>
                  <th scope="col" className="px-6 py-4 text-left font-medium">
                    ABHA ID
                  </th>
                  <th scope="col" className="px-6 py-4 text-left font-medium">
                    Blood Group
                  </th>
                  <th scope="col" className="px-6 py-4 text-left font-medium">
                    Linked Hospital
                  </th>
                  <th scope="col" className="px-6 py-4 text-left font-medium">
                    Contact
                  </th>
                  <th scope="col" className="px-6 py-4 text-right font-medium">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {filtered.map((p) => (
                  <React.Fragment key={p.id}>
                    {/* Desktop/table row */}
                    <tr className="hidden md:table-row hover:bg-gray-50">
                      <td className="px-6 py-4 align-middle">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white font-semibold mr-4">
                            {p.name
                              .split(" ")
                              .map((s) => s[0])
                              .slice(0, 2)
                              .join("")}
                          </div>
                          <div>
                            <div className="font-medium text-gray-800">
                              {p.name}
                            </div>
                            <div className="text-xs text-gray-400">
                              {p.age} yrs · {p.gender}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 align-middle">
                        <div className="inline-flex items-center text-sm bg-gray-50 border border-gray-200 rounded px-3 py-2">
                          <svg
                            className="w-4 h-4 mr-2 text-gray-400"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                          >
                            <path
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7M16 3v4M8 3v4"
                            />
                          </svg>
                          <span className="text-gray-700">{p.abha}</span>
                        </div>
                      </td>

                      <td className="px-6 py-4 align-middle">
                        <span className="inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold bg-pink-50 text-pink-700 border border-pink-100">
                          <svg
                            className="w-4 h-4 mr-2 text-pink-500"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                          >
                            <path
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 21s-6-4.35-8.25-7.25A6 6 0 1118.25 4.75C15.4 7.9 12 21 12 21z"
                            />
                          </svg>
                          {p.blood}
                        </span>
                      </td>

                      <td className="px-6 py-4 align-middle text-sm text-gray-700">
                        <IconHospital />
                        <span className="ml-2">{p.hospital}</span>
                      </td>

                      <td className="px-6 py-4 align-middle text-sm text-gray-700">
                        {p.contact}
                      </td>

                      <td className="px-6 py-4 align-middle text-right">
                        <button
                          aria-label="edit"
                          className="inline-flex items-center p-2 rounded hover:bg-gray-100 mr-2"
                        >
                          <svg
                            className="w-5 h-5 text-gray-600"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                          >
                            <path
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15.232 5.232l3.536 3.536M4 20l7.586-7.586"
                            />
                          </svg>
                        </button>
                        <button
                          aria-label="delete"
                          className="inline-flex items-center p-2 rounded hover:bg-gray-100"
                        >
                          <svg
                            className="w-5 h-5 text-gray-600"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                          >
                            <path
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19 7L5 7M10 11v6M14 11v6M6 7l1 12a2 2 0 002 2h6a2 2 0 002-2l1-12"
                            />
                          </svg>
                        </button>
                      </td>
                    </tr>

                    {/* Mobile stacked card as a single table row */}
                    <tr className="md:hidden">
                      <td colSpan={6} className="px-4 py-4">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-full bg-indigo-500 flex items-center justify-center text-white font-semibold text-lg">
                            {p.name
                              .split(" ")
                              .map((s) => s[0])
                              .slice(0, 2)
                              .join("")}
                          </div>
                          <div className="flex-1 py-1">
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="font-medium text-gray-800">
                                  {p.name}
                                </div>
                                <div className="text-xs text-gray-400">
                                  {p.age} yrs · {p.gender}
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <button
                                  aria-label="edit"
                                  className="p-2 rounded hover:bg-gray-100"
                                >
                                  <svg
                                    className="w-5 h-5 text-gray-600"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeWidth="1.5"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M15.232 5.232l3.536 3.536M4 20l7.586-7.586"
                                    />
                                  </svg>
                                </button>
                                <button
                                  aria-label="delete"
                                  className="p-2 rounded hover:bg-gray-100"
                                >
                                  <svg
                                    className="w-5 h-5 text-gray-600"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeWidth="1.5"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M19 7L5 7M10 11v6M14 11v6M6 7l1 12a2 2 0 002 2h6a2 2 0 002-2l1-12"
                                    />
                                  </svg>
                                </button>
                              </div>
                            </div>

                            <div className="mt-3 grid grid-cols-2 gap-2 text-sm text-gray-700">
                              <div className="col-span-1">
                                <div className="text-xs text-gray-400">
                                  ABHA ID
                                </div>
                                <div className="inline-flex items-center text-sm bg-gray-50 border border-gray-200 rounded px-2 py-1 mt-1">
                                  {p.abha}
                                </div>
                              </div>

                              <div className="col-span-1">
                                <div className="text-xs text-gray-400">
                                  Blood
                                </div>
                                <div className="mt-1 inline-flex items-center rounded-full px-2 py-1 text-sm font-semibold bg-pink-50 text-pink-700 border border-pink-100">
                                  {p.blood}
                                </div>
                              </div>

                              <div className="col-span-2">
                                <div className="text-xs text-gray-400">
                                  Hospital
                                </div>
                                <div className="mt-1 text-sm text-gray-700">
                                  <IconHospital />
                                  {p.hospital}
                                </div>
                              </div>

                              <div className="col-span-2">
                                <div className="text-xs text-gray-400">
                                  Contact
                                </div>
                                <div className="mt-1 text-sm text-gray-700">
                                  {p.contact}
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
        </div>

        <div className="mt-6 text-sm text-gray-500">
          Showing {filtered.length} of {patientsData.length} patients
        </div>
      </div>
    </div>
  );
}
