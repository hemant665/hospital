// StructuredReportFinal.js
import React from "react";

/**
 Props:
  - data: the object you posted (hospital, patient, test, timestamps, reference_notes, notes, signatures)
  - title?: optional title string
 Usage:
  <StructuredReportFinal data={data} title="Medical Examination Report" />
*/

const LABELS = {
  reg_no: "Reg No",
  accession_no: "Accession No",
  bill_ipd_no: "Bill / IPD No",
  opd_ipd: "OPD / IPD",
  ref_by: "Ref By",
  sample_collected_at: "Sample Collected",
  report_date: "Report Date",
  accept_time: "Accepted At",
};

const formatLabel = (k) =>
  LABELS[k] || String(k).replace(/_/g, " ").replace(/\b\w/g, (s) => s.toUpperCase());

const formatDateShort = (s) => {
  if (!s) return "";
  const d = new Date(s);
  if (!isNaN(d.getTime())) {
    return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
  }
  return String(s);
};

const getBadgeStyle = (value) => {
  if (value === null || value === undefined || value === "") return styles.badgeDefault;
  const s = String(value).toLowerCase();
  if (s.includes("borderline")) return styles.badgeBorderline;
  if (s.includes("high") || s === "h") return styles.badgeHigh;
  if (s.includes("low") || s === "l") return styles.badgeLow;
  if (s.includes("normal") || s.includes("within") || s.includes("ok")) return styles.badgeNormal;
  return styles.badgeDefault;
};

const Chip = ({ children }) => <span style={styles.chip}>{children}</span>;
const Badge = ({ children, status }) => <span style={{ ...styles.badgeBase, ...getBadgeStyle(status) }}>{children}</span>;

export default function StructuredReportFinal({ data = {}, title = "Medical Examination Report" }) {
  const patient = data.patient || {};
  const hospital = data.hospital || {};
  const test = data.test || null;
  const timestamps = data.timestamps || {};
  const refNotes = data.reference_notes || {};
  const notes = Array.isArray(data.notes) ? data.notes : [];
  const signatures = data.signatures || {};

  // preferred order for patient and hospital
  const patientOrder = ["name", "reg_no", "sex", "age", "opd_ipd", "ref_by", "department", "unit", "accession_no", "bill_ipd_no"];
  const hospitalOrder = ["name", "unit", "department", "address", "phone"];

  const renderObjectRows = (obj, preferredOrder = []) => {
    if (!obj || typeof obj !== "object") return null;
    const rendered = [];

    // preferred keys first
    preferredOrder.forEach((k) => {
      if (obj[k] !== undefined) rendered.push({ label: formatLabel(k), value: obj[k] });
    });

    // other keys
    Object.keys(obj).forEach((k) => {
      if (!preferredOrder.includes(k)) rendered.push({ label: formatLabel(k), value: obj[k] });
    });

    return rendered.map((r, i) => (
      <tr key={r.label + i}>
        <td style={styles.td}><div style={styles.fadedLabel}>{r.label}</div></td>
        <td style={styles.td}>
          <Chip>{r.value === null || r.value === undefined || r.value === "" ? "—" : r.value}</Chip>
        </td>
      </tr>
    ));
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>{title}</h2>

        <div style={{ overflowX: "auto" }}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Field</th>
                <th style={styles.th}>Value</th>
              </tr>
            </thead>

            <tbody>
              {/* Patient */}
              <tr><td colSpan={2} style={styles.section}>Patient</td></tr>
              {renderObjectRows(patient, patientOrder)}

              {/* Hospital */}
              <tr><td colSpan={2} style={styles.section}>Hospital</td></tr>
              {renderObjectRows(hospital, hospitalOrder)}

              {/* Lipid Profile / Test */}
              {test && (
                <>
                  <tr><td colSpan={2} style={styles.section}>{test.name || "Test"}</td></tr>

                  {/* test meta */}
                  {test.sample_type && (
                    <tr>
                      <td style={styles.td}><div style={styles.fadedLabel}>Sample</div></td>
                      <td style={styles.td}><Chip>{test.sample_type}</Chip></td>
                    </tr>
                  )}
                  {timestamps.report_date && (
                    <tr>
                      <td style={styles.td}><div style={styles.fadedLabel}>{formatLabel("report_date")}</div></td>
                      <td style={styles.td}><Chip>{formatDateShort(timestamps.report_date)}</Chip></td>
                    </tr>
                  )}

                  {/* results */}
                  {Array.isArray(test.results) && test.results.length > 0 ? (
                    test.results.map((r, idx) => {
                      const label = r.investigation || r.name || `Parameter ${idx + 1}`;
                      const valueText = r.result === null || r.result === undefined || r.result === "" ? "—" : `${r.result}${r.unit ? " " + r.unit : ""}`;
                      const status = r.status || r.flag || "";

                      return (
                        <React.Fragment key={idx}>
                          <tr style={{ backgroundColor: idx % 2 === 0 ? "#fafafa" : "#fff" }}>
                            <td style={styles.td}><div style={styles.fadedLabel}>{label}</div></td>
                            <td style={styles.td}>
                              {status ? (
                                <Badge status={status}>{valueText} {status ? `(${status})` : ""}</Badge>
                              ) : (
                                <Chip>{valueText}</Chip>
                              )}
                            </td>
                          </tr>

                          {/* reference_range row */}
                          {r.reference_range && (
                            <tr>
                              <td style={styles.td}><div style={styles.fadedLabel}>{label} (reference)</div></td>
                              <td style={styles.td}><span style={styles.refText}>{r.reference_range}</span></td>
                            </tr>
                          )}
                        </React.Fragment>
                      );
                    })
                  ) : (
                    <tr><td style={styles.td} colSpan={2}>No results available</td></tr>
                  )}
                </>
              )}

              {/* Reference Notes */}
              {Object.keys(refNotes).length > 0 && (
                <>
                  <tr><td colSpan={2} style={styles.section}>Reference Notes</td></tr>
                  {Object.entries(refNotes).map(([k, obj]) => (
                    <React.Fragment key={k}>
                      <tr>
                        <td style={styles.td}><div style={styles.fadedLabel}>{formatLabel(k)}</div></td>
                        <td style={styles.td}>
                          {obj && typeof obj === "object" ? (
                            <div>
                              {Object.entries(obj).map(([subk, subv]) => (
                                <div key={subk} style={{ marginBottom: 6 }}>
                                  <small style={{ color: "#6b7280" }}>{subk.replace(/_/g, " ")}:</small>{" "}
                                  <span style={styles.refText}>{subv}</span>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <span style={styles.refText}>{String(obj)}</span>
                          )}
                        </td>
                      </tr>
                    </React.Fragment>
                  ))}
                </>
              )}

              {/* Notes */}
              {notes.length > 0 && (
                <>
                  <tr><td colSpan={2} style={styles.section}>Notes</td></tr>
                  {notes.map((n, i) => (
                    <tr key={i}>
                      <td style={styles.td}><div style={styles.fadedLabel}>{`Note ${i + 1}`}</div></td>
                      <td style={styles.td}><Chip>{n}</Chip></td>
                    </tr>
                  ))}
                </>
              )}

              {/* Signatures */}
              {Object.keys(signatures).length > 0 && (
                <>
                  <tr><td colSpan={2} style={styles.section}>Signatures</td></tr>
                  {Object.entries(signatures).map(([k, v]) => (
                    <tr key={k}>
                      <td style={styles.td}><div style={styles.fadedLabel}>{formatLabel(k)}</div></td>
                      <td style={styles.td}><Chip>{v}</Chip></td>
                    </tr>
                  ))}
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* -------------------- Styles -------------------- */
const styles = {
  page: {
    width: "100%",
    padding: 24,
    background: "#f3f4f6",
    fontFamily: "Inter, Arial, sans-serif",
  },
  card: {
    maxWidth: 1000,
    margin: "0 auto",
    background: "#fff",
    borderRadius: 12,
    padding: 20,
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
  },
  title: {
    marginBottom: 16,
    fontSize: 22,
    fontWeight: 700,
    color: "#111827",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: 14,
  },
  th: {
    textAlign: "left",
    padding: "12px",
    background: "#0f1724",
    color: "#fff",
    fontWeight: 600,
  },
  section: {
    padding: "10px 12px",
    background: "#e9e9ee",
    fontWeight: 700,
    color: "#111827",
  },
  td: {
    padding: "12px",
    borderBottom: "1px solid #ececec",
    verticalAlign: "top",
  },
  fadedLabel: {
    color: "#9ca3af",
    fontSize: 13,
  },
  chip: {
    display: "inline-block",
    background: "#f3f4f6",
    color: "#374151",
    padding: "6px 10px",
    borderRadius: 12,
    fontWeight: 600,
  },
  refText: {
    display: "inline-block",
    background: "#fff",
    color: "#374151",
    padding: "4px 8px",
    borderRadius: 6,
    border: "1px solid #e5e7eb",
    fontSize: 13,
  },
  badgeBase: {
    display: "inline-block",
    padding: "6px 10px",
    borderRadius: 12,
    fontWeight: 700,
  },
  badgeHigh: {
    background: "#fee2e2",
    color: "#991b1b",
  },
  badgeBorderline: {
    background: "#fff4e6",
    color: "#9a5800",
  },
  badgeLow: {
    background: "#fffbe6",
    color: "#92400e",
  },
  badgeNormal: {
    background: "#dcfce7",
    color: "#166534",
  },
  badgeDefault: {
    background: "#eef2ff",
    color: "#374151",
  },
};

// small helper to merge getBadgeStyle results to style object
Object.assign(styles, {
  badgeHigh: styles.badgeHigh,
  badgeBorderline: styles.badgeBorderline,
  badgeLow: styles.badgeLow,
  badgeNormal: styles.badgeNormal,
  badgeDefault: styles.badgeDefault,
});
