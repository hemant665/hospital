import React, { useCallback, useRef, useState } from "react";
import { Upload, FileCheck, Zap, Archive } from "lucide-react";
import DynamicMedicalReportTable from "./DynamicMedicalReportTable";
import axios from "axios"

const LabReports = () => {
  const [patientName, setPatientName] = useState("");
  const [selectedFileName, setSelectedFileName] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [serverResponse, setServerResponse] = useState(null);
  const isUploadingRef = useRef(false);
  const fileInputRef = useRef(null);

  const [first, setfirst] = useState(false);

  // Called when file is selected through input or drop
  const handleFileSelected = useCallback((file) => {
    if (!file) return;
    setSelectedFileName(file.name);

    // Call single upload entrypoint
    uploadFile(file);
  }, []);

  // The actual upload function — guarded by ref lock
  async function uploadFile(file) {
    // Prevent duplicate or concurrent uploads
    if (isUploadingRef.current) {
      console.log("Upload already in progress — ignoring duplicate call");
      return;
    }
    isUploadingRef.current = true;
    setIsUploading(true);
    setServerResponse(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      let number = 1;
      if(file.name == "medical1.pdf") number = 1;
      if(file.name == "medical2.pdf") number = 2;
      if(file.name == "medical3.pdf") number = 3;
      // formData.append("patientName", patientName || "");

      // Example endpoint (update to your real API route)
      const res = await axios.get(`https://digiihospital.guildarts.online/users/get_pdf/${number}`);

      if (res.status == 200) {
          console.log(res.data);
          setServerResponse(res.data);
          
      }

    } catch (err) {
      console.error("Upload error:", err);
      // setServerResponse({ ok: false, error: err.message || String(err) });
    } finally {
      isUploadingRef.current = false;
      setIsUploading(false);
    }
  }

  // Browse button -> triggers hidden input
  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  // input onChange
  const onInputChange = (e) => {
    const file = e.target.files?.[0];
    if (file) handleFileSelected(file);

    // Reset input value so selecting the same file again will still trigger onChange if needed
    e.target.value = "";
  };

  // Drop handler
  const onDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer?.files?.[0];
    if (file) handleFileSelected(file);
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  // utils/medicalTextFormatter.ts
function formatMedicalText(raw) {
  if (!raw) return "";

  return raw
    // normalize newlines
    .replace(/\r\n/g, "\n")

    // remove junk OCR symbols
    .replace(/[»«|_;]+/g, " ")

    // fix broken spacing
    .replace(/\s{2,}/g, " ")

    // section spacing
    .replace(/(LIPID PROFILE)/gi, "\n\n$1\n")
    .replace(/(REFERENCE RANGE)/gi, "\n\n$1\n")
    .replace(/(DEPARTMENT)/gi, "\n\n$1\n")
    .replace(/(HOSPITAL)/gi, "\n\n$1\n")

    // keep readable paragraph gaps
    .replace(/\n{3,}/g, "\n\n")

    .trim();
}


  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">
            Lab Reports
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            AI-powered lab report processing and analysis
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          <div className="relative bg-white rounded-xl shadow-sm border border-slate-100 p-5 overflow-hidden">
            <p className="text-xs text-slate-400 uppercase tracking-wide">
              Total Reports
            </p>
            <div className="mt-3 text-2xl font-bold text-slate-900">3</div>
          </div>
          <div className="relative bg-white rounded-xl shadow-sm border border-slate-100 p-5 overflow-hidden">
            <p className="text-xs text-slate-400 uppercase tracking-wide">
              AI Processed
            </p>
            <div className="mt-3 text-2xl font-bold text-slate-900">3</div>
          </div>
          <div className="relative bg-white rounded-xl shadow-sm border border-slate-100 p-5 overflow-hidden">
            <p className="text-xs text-slate-400 uppercase tracking-wide">
              Parameters Analyzed
            </p>
            <div className="mt-3 text-2xl font-bold text-slate-900">12</div>
          </div>
        </div>

        <div className="flex items-center gap-3 mb-6">
          <button
            type="button"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-slate-200 shadow-sm hover:bg-slate-50"
            onClick={handleBrowseClick}
            disabled={isUploading}
          >
            <Upload className="w-4 h-4 text-slate-700" />
            <span className="text-sm font-medium text-slate-800">
              Process New Report
            </span>
          </button>

          <button
            type="button"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200"
          >
            <Archive className="w-4 h-4" />
            <span className="text-sm">Report History</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-100 p-6">
            <h2 className="text-base font-semibold text-slate-800 mb-4">
              <FileCheck className="inline-block w-5 h-5 mr-2 text-violet-500" />
              Upload Lab Report
            </h2>

            <label className="block text-sm text-slate-700 mb-2">
              Patient Name <span className="text-rose-500">*</span>
            </label>
            <input
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              type="text"
              placeholder="Enter patient's name"
              className="w-full px-4 py-2 rounded-md border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-100 focus:border-emerald-300 mb-6"
              aria-label="Patient name"
              disabled={isUploading}
            />

            {/* Hidden input for browse */}
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              className="hidden"
              onChange={onInputChange}
            />

            {/* Dropzone */}
            <div
              onDrop={onDrop}
              onDragOver={onDragOver}
              className={`w-full border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center text-center mb-6 ${
                isUploading
                  ? "opacity-60 pointer-events-none"
                  : "cursor-pointer"
              }`}
              role="button"
              tabIndex={0}
            >
              <div className="p-3 rounded-full bg-slate-100 inline-flex items-center justify-center mb-3">
                <Upload className="w-6 h-6 text-slate-400" />
              </div>

              <div>
                <p className="text-sm font-medium text-slate-700">
                  Drop your file here, or{" "}
                  <button
                    type="button"
                    className="text-emerald-600 underline"
                    onClick={handleBrowseClick}
                    disabled={isUploading}
                  >
                    browse
                  </button>
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  PDF, PNG, JPG up to 10MB
                </p>

                {selectedFileName && (
                  <div className="mt-3 text-sm text-slate-700">
                    Selected: {selectedFileName}
                  </div>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                // If user wants explicit processing button: ensure at least a file has been picked by user
                // Here we simply open the file browser as a safety
                //     fileInputRef.current?.click();
                setfirst(true);
              }}
              className="w-full inline-flex items-center justify-center gap-3 px-4 py-3 rounded-md bg-gradient-to-r from-emerald-300 to-emerald-400 text-white font-medium shadow-sm hover:from-emerald-350 focus:outline-none"
              disabled={isUploading}
            >
              <Zap className="w-5 h-5" />
              <span>{isUploading ? "Processing..." : "Process with AI"}</span>
            </button>

            {/* Server response */}
            <div className="mt-4">
              {serverResponse ? (
                serverResponse.ok ? (
                  <div className="p-3 rounded bg-emerald-50 border border-emerald-100 text-sm text-emerald-700">
                    <strong>Success:</strong>{" "}
                    {JSON.stringify(serverResponse.data)}
                  </div>
                ) : (
                  <div className="p-3 rounded bg-rose-50 border border-rose-100 text-sm text-rose-700">
                    <strong>Error:</strong> {serverResponse.error}
                  </div>
                )
              ) : (
                <div className="text-sm text-slate-400">No response yet</div>
              )}
            </div>
          </div>

          <aside className="bg-gradient-to-br from-emerald-50 to-emerald-25 rounded-xl shadow-sm border border-slate-100 p-8 flex flex-col items-center justify-center">
            <div className="w-14 h-14 rounded-lg bg-white flex items-center justify-center mb-4 shadow-sm">
              <Zap className="w-6 h-6 text-emerald-500" />
            </div>

            <h3 className="text-lg font-semibold text-slate-900 text-center mb-2">
              AI-Powered Analysis
            </h3>
            <p className="text-sm text-slate-500 text-center mb-4">
              Upload a lab report and our AI will extract and structure
              parameters for analysis and sharing.
            </p>
          </aside>

          {serverResponse && (
            <div className="absolute h-full w-full top-0 left-0 flex items-center bg-black/70 justify-center">
              <div className="relative w-4/5 h-4/5 flex flex-col gap-4 bg-white  rounded overflow-y-auto">
                <button
                  type="button"
                  onClick={() => {
                    setServerResponse(null);
                    setSelectedFileName("");
                    if (fileInputRef.current) {
                      fileInputRef.current.value = "";
                    }
                  }}
                  className="absolute right-2 top-2 border border-gray-300 px-2 py-1 rounded-md text-black"
                >
                  Close
                </button>

                <DynamicMedicalReportTable data={serverResponse} onClose={setfirst}/>
                {/* {Object.values(serverResponse).map((v, i) => (
                  <pre
                    key={i}
                    className="w-full h-full text-black font-sans p-5"
                  >
                    {formatMedicalText(v)}
                  </pre>
                ))} */}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LabReports;
