import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

/**
 * Generates a PDF with a title and a table, then triggers a download.
 * columns: [{ key, label }]  rows: [{ key: value, ... }]
 */
export function exportToPDF(title, columns, rows) {
  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.setTextColor(11, 31, 77);
  doc.text(title, 14, 18);

  doc.setFontSize(9);
  doc.setTextColor(150, 150, 150);
  doc.text(`KERA — Generated ${new Date().toLocaleDateString()}`, 14, 24);

  autoTable(doc, {
    startY: 30,
    head: [columns.map((c) => c.label)],
    body: rows.map((row) => columns.map((c) => row[c.key] ?? "")),
    headStyles: { fillColor: [11, 31, 77], textColor: 255, fontSize: 9 },
    bodyStyles: { fontSize: 8.5 },
    alternateRowStyles: { fillColor: [245, 247, 250] },
  });

  doc.save(`${slug(title)}.pdf`);
}

/**
 * Generates an .xlsx workbook from the same shape and downloads it.
 */
export function exportToExcel(title, columns, rows) {
  const worksheetData = rows.map((row) => {
    const obj = {};
    columns.forEach((c) => {
      obj[c.label] = row[c.key] ?? "";
    });
    return obj;
  });

  const worksheet = XLSX.utils.json_to_sheet(worksheetData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, title.slice(0, 31)); // sheet names cap at 31 chars

  XLSX.writeFile(workbook, `${slug(title)}.xlsx`);
}

/**
 * Opens a clean, print-only window with just the title + table, then
 * triggers the browser print dialog. Doesn't touch the current page's
 * layout, so the sidebar/navbar never end up in the printout.
 */
export function printReport(title, columns, rows) {
  const win = window.open("", "_blank", "width=900,height=700");
  if (!win) {
    alert("Please allow pop-ups to print this report.");
    return;
  }

  const tableRows = rows
    .map(
      (row) =>
        `<tr>${columns.map((c) => `<td>${row[c.key] ?? ""}</td>`).join("")}</tr>`
    )
    .join("");

  win.document.write(`
    <html>
      <head>
        <title>${title}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 32px; color: #1a1f36; }
          h1 { font-size: 18px; color: #0b1f4d; margin-bottom: 2px; }
          .meta { color: #9aa0b4; font-size: 11px; margin-bottom: 20px; }
          table { width: 100%; border-collapse: collapse; font-size: 12px; }
          th, td { text-align: left; padding: 8px 10px; border-bottom: 1px solid #eef0f6; }
          th { background: #0b1f4d; color: #fff; }
          tr:nth-child(even) { background: #f5f7fa; }
        </style>
      </head>
      <body>
        <h1>${title}</h1>
        <div class="meta">KERA — Generated ${new Date().toLocaleDateString()}</div>
        <table>
          <thead><tr>${columns.map((c) => `<th>${c.label}</th>`).join("")}</tr></thead>
          <tbody>${tableRows}</tbody>
        </table>
      </body>
    </html>
  `);
  win.document.close();
  win.focus();
  win.print();
}

function slug(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}