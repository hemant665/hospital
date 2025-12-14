// SideBar.js
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";



const Icon = {
  Logo: ({ size = 36 }) => (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect rx="10" width="48" height="48" fill="#5FB39E" />
      <path d="M12 28c2-6 4-8 7-8 2 0 3 2 5 2s3-1 5-4 4-3 5 0" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
  ),
  Dashboard: ({ size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="7" height="7" rx="1.6" stroke="currentColor" strokeWidth="1.4" />
      <rect x="14" y="3" width="7" height="7" rx="1.6" stroke="currentColor" strokeWidth="1.4" />
      <rect x="3" y="14" width="7" height="7" rx="1.6" stroke="currentColor" strokeWidth="1.4" />
      <rect x="14" y="14" width="7" height="7" rx="1.6" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  ),
  Building: ({ size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M4 21V3h10v18" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 21h8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 7h2M8 11h2M8 15h2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Users: ({ size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M16 11a4 4 0 1 0-8 0" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M3 21c1.5-4 6-6 9-6s7.5 2 9 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  FileText: ({ size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M14 2v6h6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 13h8M8 17h5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  ChevronLeft: ({ size = 16, rotated = false }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ transform: rotated ? "rotate(180deg)" : undefined }}>
      <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
  )
};

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation ? useLocation() : { pathname: "/" };

  const menuItems = [
    { icon: Icon.Dashboard, label: "Overview", path: "/" },
    { icon: Icon.Building, label: "Hospitals", path: "/hospitals" },
    { icon: Icon.Users, label: "Patients", path: "/patients" },
    { icon: Icon.FileText, label: "Lab Reports", path: "/lab-reports" },
  ];

  const isActive = (path) => location && location.pathname === path;

  const styles = {
    aside: {
      boxSizing: "border-box",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      background: "#fff",
      borderRight: "1px solid #eef3f4",
      boxShadow: "0 6px 18px rgba(20,40,40,0.03)",
      padding: isOpen ? 22 : 12,
      width: isOpen ? 320 : 80,
      transition: "width .22s ease, padding .22s ease",
      position: "relative",
      overflow: "hidden",
    },
    headerRow: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      paddingBottom: 14,
      borderBottom: "1px solid #f3f7f7",
    },
    brandTitle: {
      margin: 0,
      fontSize: 18,
      fontWeight: 800,
      color: "#142d2d",
      letterSpacing: -0.2,
    },
    brandSub: {
      fontSize: 12,
      color: "#8b97a0",
      marginTop: 4,
    },
    collapseBtn: {
      marginLeft: "auto",
      background: "transparent",
      border: "none",
      cursor: "pointer",
      padding: 8,
      borderRadius: 8,
      color: "#6b7280",
    },
    mainMenuLabel: {
      marginTop: 18,
      marginBottom: 8,
      fontSize: 12,
      fontWeight: 700,
      letterSpacing: 1,
      color: "#a9b3bb",
    },
    nav: {
      display: "flex",
      flexDirection: "column",
      gap: 12,
      flex: 1,
      paddingRight: 8,
      paddingTop: 6,
    },
    link: {
      display: "flex",
      alignItems: "center",
      gap: 14,
      padding: "12px 14px",
      borderRadius: 14,
      textDecoration: "none",
      cursor: "pointer",
      transition: "all .16s ease",
      color: "#475569",
      fontSize: 15,
      fontWeight: 700,
    },
    iconBox: {
      minWidth: 44,
      minHeight: 44,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 12,
    },
    activePill: {
      background: "linear-gradient(90deg,#68b79a,#3f9f8c)",
      color: "white",
      boxShadow: "0 12px 30px rgba(63,159,140,0.12)",
    },
    activeIndicator: {
      marginLeft: "auto",
      width: 6,
      height: 36,
      borderRadius: 8,
      background: "#0f8660",
    },
    footerWrap: {
      paddingTop: 18,
      borderTop: "1px solid #f3f7f7",
    },
    card: {
      borderRadius: 12,
      padding: 14,
      boxShadow: "0 10px 30px rgba(16,24,40,0.03)",
      border: "1px solid rgba(17,24,39,0.04)",
      background: "linear-gradient(180deg, rgba(249,252,252,1), rgba(246,251,250,1))",
      display: "flex",
      flexDirection: "column",
      gap: 8,
      alignItems: "flex-start",
      width: "100%",
    },
    cardHeader: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      width: "100%",
    },
    cardTitle: {
      fontSize: 15,
      fontWeight: 800,
      color: "#12323a",
      margin: 0,
    },
    cardSub: {
      fontSize: 12,
      color: "#7b8790",
      marginTop: 3,
    },
    tagsWrap: {
      display: "flex",
      gap: 8,
      marginTop: 8,
      flexWrap: "wrap",
    },
    tag: {
      padding: "6px 10px",
      borderRadius: 999,
      background: "#fff",
      border: "1px solid #e6eef0",
      fontSize: 12,
      color: "#334155",
      fontWeight: 700,
      boxShadow: "0 2px 6px rgba(16,24,40,0.03)",
    },
  };

  return (
    <>
      <aside style={styles.aside}>
        <div style={styles.headerRow}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon.Logo size={44} />
            </div>

            {isOpen && (
              <div>
                <h1 style={styles.brandTitle}>
                  Digii<span style={{ color: "#1fa284", fontWeight: 900 }}>hospital</span>
                </h1>
                <div style={styles.brandSub}>Healthcare Portal</div>
              </div>
            )}
          </div>

          <button
            aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
            onClick={() => setIsOpen(!isOpen)}
            style={styles.collapseBtn}
          >
            <Icon.ChevronLeft rotated={!isOpen} />
          </button>
        </div>

        <div style={styles.mainMenuLabel}>MAIN MENU</div>

        <nav style={styles.nav}>
          {menuItems.map((item) => {
            const Active = isActive(item.path);
            const IconComp = item.icon;
            const linkStyle = {
              ...styles.link,
              ...(Active ? styles.activePill : {}),
              ...(isOpen ? {} : { justifyContent: "center", padding: 10 }),
            };

            const iconBoxStyle = {
              ...styles.iconBox,
              ...(Active ? { background: "rgba(255,255,255,0.12)", color: "#fff" } : { color: "#9aa3ab" }),
            };

            return (
              <Link
                key={item.path}
                to={item.path}
                title={!isOpen ? item.label : undefined}
                aria-current={Active ? "page" : undefined}
                style={linkStyle}
              >
                <div style={iconBoxStyle}>
                  <IconComp />
                </div>

                {isOpen && <span style={{ fontSize: 15 }}>{item.label}</span>}

                {Active && <div style={styles.activeIndicator} />}
              </Link>
            );
          })}
        </nav>

        <div style={styles.footerWrap}>
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <div style={{ width: 44, height: 44, borderRadius: 8, background: "#eaf8f4", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon.Logo size={28} />
              </div>

              <div>
                <p style={styles.cardTitle}>Healthcare Portal</p>
                <p style={styles.cardSub}>v1.0.0 - Hackathon</p>
              </div>
            </div>

            <div style={styles.tagsWrap}>
              <div style={styles.tag}>React</div>
              <div style={styles.tag}>Tailwind</div>
              <div style={styles.tag}>AI</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile-like dismissal when expanded */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.28)",
            zIndex: 40,
            display: "none", // keep hidden by default; set to 'block' in small screens if you want
          }}
        />
      )}
    </>
  );
};

export default SideBar;
