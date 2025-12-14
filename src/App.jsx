import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Sidebar from './pages/sidebar/SideBar';
import Dashboard from './pages/dashboard/Dashboard';

import LabReports from './pages/LabReports/LabReports';
import Patients from './pages/Patients/Patients';
import Hospitals from './pages/Hospitals/Hospitals';
import Doctor from './pages/doctor/Doctor';




function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <Router>
      <div className="w-full grid grid-cols-[auto_1fr] h-screen bg-gray-50">
        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

        {/* Main Content */}
        <div className="w-full flex-1 flex flex-col overflow-hidden">
       

          {/* Page Content */}
          <main className="w-full flex-1 overflow-auto">
            <div className="w-full p-6">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/hospitals" element={<Hospitals />} />
                <Route path="/patients" element={<Patients />} />
                <Route path="/lab-reports" element={<LabReports />} />
                <Route path="/doctor-profile" element={<Doctor />} />
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </Router>
  )
}

export default App
