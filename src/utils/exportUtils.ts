import { PurchaseBill } from "@/types/bill";
import { siteConfig } from "@/config/site";

/**
 * Capture invoice DOM node as high-quality PNG image and download
 */
export async function downloadBillAsImage(elementId: string, filename: string) {
  try {
    const html2canvas = (await import("html2canvas")).default;
    const element = document.getElementById(elementId);
    if (!element) {
      alert("Bill element not found for export.");
      return;
    }

    const canvas = await html2canvas(element, {
      scale: 2, // High resolution output
      useCORS: true,
      backgroundColor: "#ffffff",
      logging: false,
    });

    const image = canvas.toDataURL("image/png", 1.0);
    const link = document.createElement("a");
    link.download = `${filename}.png`;
    link.href = image;
    link.click();
  } catch (error) {
    console.error("Error generating image:", error);
    alert("Failed to generate bill image. Falling back to browser print.");
    window.print();
  }
}

/**
 * Capture invoice DOM node as PDF document and download
 */
export async function downloadBillAsPDF(elementId: string, filename: string) {
  try {
    const html2canvas = (await import("html2canvas")).default;
    const { jsPDF } = await import("jspdf");

    const element = document.getElementById(elementId);
    if (!element) {
      alert("Bill element not found for export.");
      return;
    }

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
      logging: false,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${filename}.pdf`);
  } catch (error) {
    console.error("Error generating PDF:", error);
    alert("Failed to generate PDF automatically. Opening print window instead.");
    window.print();
  }
}

/**
 * Format invoice into a clean WhatsApp text receipt message
 */
export function generateWhatsAppText(bill: PurchaseBill): string {
  const itemsText = bill.items
    .map(
      (item, idx) =>
        `${idx + 1}. *${item.name}*\n   ${item.quantity} ${item.unit} x ₹${item.rate}/${item.unit} = *₹${item.subtotal.toLocaleString("en-IN")}*`
    )
    .join("\n");

  const subtotal = bill.scrapSubtotal ?? bill.items.reduce((a, b) => a + b.subtotal, 0);
  const fee = bill.pickupFee ?? (subtotal > 0 && subtotal < 500 ? 100 : 0);

  let feeSection = "";
  if (fee > 0) {
    feeSection = `\n💵 *Scrap Subtotal:* ₹${subtotal.toLocaleString("en-IN")}\n🚗 *Pickup Charge:* -₹100 (Orders under ₹500)\n💡 *Note:* Sell scrap worth ₹500+ next time for 100% FREE pickup!\n`;
  } else if (subtotal >= 500) {
    feeSection = `\n🎉 *FREE Doorstep Pickup Applied!* (No pickup charge for ₹500+ orders)\n`;
  }

  const text = `
📜 *${siteConfig.name} - PURCHASE RECEIPT*
──────────────────────
🧾 *Bill No:* ${bill.invoiceNumber}
📅 *Date:* ${bill.date} | ${bill.time}
👤 *Customer:* ${bill.customer.name || "Valued Customer"}
📱 *Phone:* ${bill.customer.phone || "N/A"}
💳 *Payment Mode:* ${bill.customer.paymentMode}
${bill.customer.address ? `📍 *Address:* ${bill.customer.address}\n` : ""}
──────────────────────
📦 *SCRAP ITEMS BOUGHT:*
${itemsText}

──────────────────────
⚖️ *Total Weight:* ${bill.totalWeightKg.toFixed(2)} kg${feeSection}
💰 *TOTAL AMOUNT PAID:* *₹${bill.grandTotal.toLocaleString("en-IN")}*
──────────────────────
Thank you for recycling with *Scrapiva*! ♻️
📞 Contact: ${siteConfig.contact.phone}
  `.trim();

  return text;
}

/**
 * Open WhatsApp with pre-filled customer bill receipt
 */
export function sendBillToWhatsApp(bill: PurchaseBill) {
  const message = generateWhatsAppText(bill);
  let rawPhone = (bill.customer.phone || "").replace(/\D/g, "");
  
  if (rawPhone.length === 10) {
    rawPhone = "91" + rawPhone;
  }

  const encodedMsg = encodeURIComponent(message);
  
  if (rawPhone.length >= 10) {
    window.open(`https://wa.me/${rawPhone}?text=${encodedMsg}`, "_blank");
  } else {
    // If no valid customer phone, open general WhatsApp share
    window.open(`https://api.whatsapp.com/send?text=${encodedMsg}`, "_blank");
  }
}

/**
 * Trigger native window print for physical receipt printing
 */
export function printBill() {
  window.print();
}
