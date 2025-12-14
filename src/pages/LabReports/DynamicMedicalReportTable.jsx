import React from "react";


const data1 = [
  { section: "Patient", field: "Name", value: "Ramesh Kumar" },
  { section: "Patient", field: "Patient ID", value: "202111110156" },
  { section: "Patient", field: "Gender", value: "Male" },
  { section: "Patient", field: "Age", value: "26" },
  { section: "Patient", field: "Nationality", value: "Indian" },

  { section: "Hospital", field: "Name", value: "NIMS Hospital" },
  { section: "Hospital", field: "Location", value: "Jaipur, Rajasthan, India" },
  {
    section: "Hospital",
    field: "Department",
    value: "Biochemistry / General Medicine",
  },

  { section: "Lipid Profile", field: "Report Date", value: "15 Apr 2025" },
  {
    section: "Lipid Profile",
    field: "Total Cholesterol",
    value: "180 mg/dl",
  },
  {
    section: "Lipid Profile",
    field: "Triglycerides",
    value: "High",
  },
  {
    section: "Lipid Profile",
    field: "HDL",
    value: "40–60 mg/dl (reference)",
  },
  { section: "Lipid Profile", field: "LDL", value: "See reference" },
  {
    section: "Lipid Profile",
    field: "VLDL",
    value: "18–30 mg/dl (reference)",
  },

  {
    section: "Vitamin & Metabolic Report",
    field: "Vitamin D (25-OH)",
    value: "22.8 ng/ml (Low)",
  },
  {
    section: "Vitamin & Metabolic Report",
    field: "Blood Sugar (Random)",
    value: "97 mg/dl",
  },
  {
    section: "Vitamin & Metabolic Report",
    field: "Serum Creatinine",
    value: "0.8 mg/dl",
  },
  {
    section: "Vitamin & Metabolic Report",
    field: "Serum Urea",
    value: "17 mg/dl (Low)",
  },
  {
    section: "Vitamin & Metabolic Report",
    field: "Sodium",
    value: "143 mmol/L",
  },
  {
    section: "Vitamin & Metabolic Report",
    field: "Potassium",
    value: "4.0 mmol/L",
  },

  {
    section: "Liver Function Test",
    field: "Bilirubin (Total)",
    value: "2.3 mg/dl (High)",
  },
  {
    section: "Liver Function Test",
    field: "SGOT / AST",
    value: "23 U/L",
  },
  {
    section: "Liver Function Test",
    field: "SGPT / ALT",
    value: "21 U/L",
  },

  {
    section: "Stress Test (TMT)",
    field: "Test Type",
    value: "Bruce Protocol",
  },
  {
    section: "Stress Test (TMT)",
    field: "Result",
    value: "Normal",
  },
];


const getBadgeStyle = (value) => {
  if (!value) return badgeStyle.default;
  if (value.toLowerCase().includes("high")) return badgeStyle.high;
  if (value.toLowerCase().includes("low")) return badgeStyle.low;
  if (value.toLowerCase().includes("normal")) return badgeStyle.normal;
  return badgeStyle.default;
};


const DynamicMedicalReportTable = ({data}) => {
  let lastSection = "";

  
  return (
    <div className="w-full h-full" style={pageStyle}>
      <div style={cardStyle}>
        <div className="flex relative items-center justify-between w-full">
            <h2 style={titleStyle}>Medical Examination Report</h2>
            {/* <button className="p-1 absolute top-0 right-0 text-xl cursor-pointer text-black" onClick={() => onClose(false)}>X</button> */}
        </div>



        <div style={{ overflowX: "auto" }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Field</th>
                <th style={thStyle}>Value</th>
              </tr>
            </thead>

            <tbody>
              {data1.map((row, index) => {
                const showSection = row.section !== lastSection;
                lastSection = row.section;

                return (
                  <React.Fragment key={index}>
                    {showSection && (
                      <tr>
                        <td colSpan={2} style={sectionStyle}>
                          {row.section}
                        </td>
                      </tr>
                    )}

                    <tr
                      style={{
                        backgroundColor:
                          index % 2 === 0 ? "#fafafa" : "#ffffff",
                      }}
                    >
                      <td style={tdStyle}>{row.field}</td>
                      <td style={tdStyle}>
                        <span style={getBadgeStyle(row.value)}>
                          {row.value || "—"}
                        </span>
                      </td>
                    </tr>
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

/* -------------------- Styles -------------------- */

const pageStyle = {
  width: "100%",
  padding: "24px",
  background: "#f3f4f6",
  fontFamily: "Inter, Arial, sans-serif",
};

const cardStyle = {
  maxWidth: "1000px",
  margin: "0 auto",
  background: "#ffffff",
  borderRadius: "12px",
  padding: "20px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
};

const titleStyle = {
  marginBottom: "16px",
  fontSize: "22px",
  fontWeight: "700",
  color: "#111827",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  fontSize: "14px",
};

const thStyle = {
  textAlign: "left",
  padding: "12px",
  background: "#111827",
  color: "#ffffff",
  fontWeight: "600",
};

const sectionStyle = {
  padding: "10px 12px",
  background: "#e5e7eb",
  fontWeight: "700",
  color: "#111827",
};

const tdStyle = {
  padding: "10px 12px",
  borderBottom: "1px solid #e5e7eb",
  verticalAlign: "top",
};

const badgeStyle = {
  high: {
    background: "#fee2e2",
    color: "#991b1b",
    padding: "4px 8px",
    borderRadius: "6px",
    fontWeight: "600",
  },
  low: {
    background: "#fef3c7",
    color: "#92400e",
    padding: "4px 8px",
    borderRadius: "6px",
    fontWeight: "600",
  },
  normal: {
    background: "#dcfce7",
    color: "#166534",
    padding: "4px 8px",
    borderRadius: "6px",
    fontWeight: "600",
  },
  default: {
    background: "#f3f4f6",
    color: "#374151",
    padding: "4px 8px",
    borderRadius: "6px",
  },
};

export default DynamicMedicalReportTable;
