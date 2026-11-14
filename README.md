# SSR Bullion Management System
### SSR Bullion, Hallmark & Assay Center

A comprehensive, fully responsive enterprise web application integrating all 6 Bureau of Indian Standards (BIS) IS 1417:2019 compliant modules designed in Google Stitch.

---

## 🌟 Modules Included

1. **Dashboard (`#/dashboard`)**
   - Shift operation overview and live lab throughput telemetry (94.2% efficiency).
   - 5 KPI Analytical Bento Cards: Total Received, Pieces Intake, Pending Delivery, Dispatched, Registered Jewellers.
   - Live intake batch feed with detailed metallurgical status chips and quick "Details" modal inspection.
   - Live Mettler Toledo precision balance telemetry and cupellation furnace temp sensors.
   - Fineness breakdown across 22K (916), 18K (750), 24K (999), and 14K (585) lots.
   - Dual-station laser inscribing telemetry (Nd:YAG and Fiber 50W) and BIS audit certification stamps.

2. **Receive Batch & Intake (`#/receive`)**
   - Section A: Job & Depositor Authorization with customer auto-linking, BIS license validation, docket numbering, and box/tray assignments.
   - Section B: Dual Stream Classification (Main Line Assay vs Off Side Priority Stream) with interactive selection.
   - Section C: High-precision weight telemetry with automatic Tare/Inclusions calculation (`Gross - Net`), digital scale reading simulation, and tolerance checking.
   - Today's Received Intake Batches table with multi-parameter filter toolbar, instant search, and Excel export.

3. **Customer Information (`#/customer-information`)**
   - Central Jeweller Directorate and BIS IS 1417:2019 Registry.
   - Bento analytics with client tier breakdown and live BIS portal sync ping.
   - Expandable slide-down customer registration drawer with instant validation.
   - Dynamic search, region/hub filter (Zaveri Bazaar, Karol Bagh, Commercial Street, etc.), CSV export, and print registry.
   - Interactive table with Customer Profile Modal, inline editing, and record deletion.

4. **Bill Generation (`#/bill-generation`)**
   - Dual-pane layout: Billing Builder on the left, Live Synchronized Tax Invoice Preview on the right.
   - Dynamic particular items table with add/remove rows, quantities, weights, rates, and automatic line totals.
   - Real-time statutory tax computations: Subtotal, CGST 9.0%, SGST 9.0%, and Total Payable.
   - Automatic conversion of total amounts into Indian Rupees in words.
   - Print-optimized archival certificate layout with BIS Care verification QR code and official watermark.

5. **Records / History (`#/records-history`)**
   - Immutable audit ledger with SHA-256 integrity verification.
   - Dual switcher tabs: Historical Intake Entries (1,420) vs Historical Invoices (894).
   - Multi-parameter filter console (Job ID, Request ID, Customer, Period range, Status chips).
   - Forensic Record Detail Modal with XRF elemental spectrum readouts (Au, Ag, Cu) and complete chronological verification timeline.

6. **Laboratory Control & Settings (`#/settings`)**
   - BIS Legal Entity identification (Center Recognition #AHC/WZ/2019/88492, GSTIN, registered lab address).
   - Document & Invoice preferences, default barcode symbology, and anti-fraud micro-guilloche patterns.
   - Official Laboratory Seal vector upload & SVG download.
   - NABL-accredited assay scale calibrations (Gold 916, Gold 999, Silver 999).

---

## 📱 Responsive Design Breakpoints

The application has been tested and optimized across all major device widths:
- **Large Desktop Displays**: 1920px, 1600px, 1440px
- **Laptops & Standard Desktops**: 1366px, 1280px
- **Tablets (Landscape & Portrait)**: 1024px, 820px, 768px (collapsible sidebar rail, touch-scrolling tables, adapted form grids)
- **Mobile Phones**: 430px, 414px, 390px, 375px, 360px, 320px (off-canvas drawer navigation, single-column forms, touch targets &ge; 44px, zero horizontal clipping)

---

## 🚀 How to Run

Simply open `index.html` in any modern web browser:
- Double-click `index.html` directly in File Explorer.
- Or start a local development server:
  ```bash
  python -m http.server 8080
  # or
  npx serve
  ```
  Then navigate to `http://localhost:8080`.
