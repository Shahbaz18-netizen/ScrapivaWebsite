"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ScrapMaterialRate, BillItem, CustomerInfo, PurchaseBill } from "@/types/bill";
import { scrapPrices, scrapCategories } from "@/data/scrapPrices";
import { siteConfig } from "@/config/site";
import { RateManagerModal } from "./RateManagerModal";
import { BillHistoryModal } from "./BillHistoryModal";
import {
  downloadBillAsImage,
  downloadBillAsPDF,
  sendBillToWhatsApp,
  printBill,
} from "@/utils/exportUtils";
import {
  Receipt,
  Search,
  Plus,
  Trash2,
  Edit3,
  History,
  Share2,
  Printer,
  Download,
  FileText,
  Image as ImageIcon,
  CheckCircle,
  Sparkles,
  UserCheck,
  CreditCard,
  MapPin,
  Phone,
  ArrowLeft,
} from "lucide-react";
import styles from "./BillingSection.module.css";

export const BillingSection: React.FC = () => {
  // Rates Catalog State (Synced with localStorage)
  const [ratesCatalog, setRatesCatalog] = useState<ScrapMaterialRate[]>([]);
  
  // Modals state
  const [isRateModalOpen, setIsRateModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);

  // Customer Form State
  const [customer, setCustomer] = useState<CustomerInfo>({
    name: "",
    phone: "",
    address: "",
    paymentMode: "Cash",
    notes: "",
  });

  // Invoice Meta State
  const [invoiceNumber, setInvoiceNumber] = useState<string>("");
  const [billDate, setBillDate] = useState<string>("");
  const [billTime, setBillTime] = useState<string>("");
  const [staffName, setStaffName] = useState<string>("Scrapiva Executive");

  // Bill Items State
  const [billItems, setBillItems] = useState<BillItem[]>([]);

  // Saved Bills History State
  const [savedBills, setSavedBills] = useState<PurchaseBill[]>([]);

  // Item Picker Search & Filter State
  const [pickerSearch, setPickerSearch] = useState("");
  const [pickerCategory, setPickerCategory] = useState("All");

  // Custom Item Form State
  const [customName, setCustomName] = useState("");
  const [customRate, setCustomRate] = useState("");
  const [customWeight, setCustomWeight] = useState("1");
  const [customUnit, setCustomUnit] = useState("kg");

  // Initialize Rates & History on mount
  useEffect(() => {
    // Generate Invoice ID & Date
    const now = new Date();
    const invId = `INV-SCRAP-${Math.floor(1000 + Math.random() * 9000)}`;
    setInvoiceNumber(invId);
    setBillDate(now.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }));
    setBillTime(now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true }));

    // Load custom rates if saved
    const savedRatesStr = localStorage.getItem("scrapiva_dynamic_rates");
    if (savedRatesStr) {
      try {
        setRatesCatalog(JSON.parse(savedRatesStr));
      } catch (e) {
        setRatesCatalog(scrapPrices);
      }
    } else {
      setRatesCatalog(scrapPrices);
    }

    // Load saved bills history
    const savedBillsStr = localStorage.getItem("scrapiva_saved_bills");
    if (savedBillsStr) {
      try {
        setSavedBills(JSON.parse(savedBillsStr));
      } catch (e) {
        setSavedBills([]);
      }
    }
  }, []);

  // Save updated rates to state & localStorage
  const handleSaveRates = (updatedRates: ScrapMaterialRate[]) => {
    setRatesCatalog(updatedRates);
    localStorage.setItem("scrapiva_dynamic_rates", JSON.stringify(updatedRates));
  };

  // Reset rates to initial scrapPrices defaults
  const handleResetRates = () => {
    setRatesCatalog(scrapPrices);
    localStorage.removeItem("scrapiva_dynamic_rates");
  };

  // Add Item to Bill
  const handleAddItem = (rateItem: ScrapMaterialRate) => {
    const existingIndex = billItems.findIndex((item) => item.id === rateItem.id);
    const parsedRate = parseFloat(rateItem.price) || 0;

    if (existingIndex > -1) {
      // Increase quantity by 1
      const updated = [...billItems];
      const item = updated[existingIndex];
      const newQty = item.quantity + 1;
      updated[existingIndex] = {
        ...item,
        quantity: newQty,
        subtotal: newQty * item.rate,
      };
      setBillItems(updated);
    } else {
      // Add new line item
      const newItem: BillItem = {
        id: rateItem.id,
        name: rateItem.name,
        category: rateItem.category,
        rate: parsedRate,
        unit: rateItem.unit,
        quantity: 1,
        subtotal: parsedRate * 1,
      };
      setBillItems((prev) => [...prev, newItem]);
    }
  };

  // Add Custom Manual Item
  const handleAddCustomItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName || !customRate) return;

    const rateVal = parseFloat(customRate) || 0;
    const qtyVal = parseFloat(customWeight) || 1;

    const newItem: BillItem = {
      id: `custom-${Date.now()}`,
      name: customName,
      category: "Custom Item",
      rate: rateVal,
      unit: customUnit,
      quantity: qtyVal,
      subtotal: rateVal * qtyVal,
    };

    setBillItems((prev) => [...prev, newItem]);
    setCustomName("");
    setCustomRate("");
    setCustomWeight("1");
  };

  // Update item quantity/weight
  const handleQuantityChange = (id: string, newQtyStr: string) => {
    const newQty = parseFloat(newQtyStr) || 0;
    setBillItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: newQty, subtotal: newQty * item.rate }
          : item
      )
    );
  };

  // Update item inline rate override
  const handleRateChange = (id: string, newRateStr: string) => {
    const newRate = parseFloat(newRateStr) || 0;
    setBillItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, rate: newRate, subtotal: item.quantity * newRate }
          : item
      )
    );
  };

  // Remove item
  const handleRemoveItem = (id: string) => {
    setBillItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Clear current bill builder
  const handleNewBill = () => {
    const now = new Date();
    const newInvId = `INV-SCRAP-${Math.floor(1000 + Math.random() * 9000)}`;
    setInvoiceNumber(newInvId);
    setBillDate(now.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }));
    setBillTime(now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true }));
    setBillItems([]);
    setCustomer({
      name: "",
      phone: "",
      address: "",
      paymentMode: "Cash",
      notes: "",
    });
  };

  // Calculate Totals & Pickup Deduction
  const totalWeightKg = billItems.reduce((acc, item) => {
    return item.unit.toLowerCase() === "kg" ? acc + item.quantity : acc;
  }, 0);

  const scrapSubtotal = billItems.reduce((acc, item) => acc + item.subtotal, 0);
  const pickupFee = scrapSubtotal > 0 && scrapSubtotal < 500 ? 100 : 0;
  const grandTotal = Math.max(0, scrapSubtotal - pickupFee);

  // Construct Current Bill Object
  const currentBill: PurchaseBill = {
    invoiceNumber: invoiceNumber || "INV-SCRAP-1001",
    date: billDate || new Date().toLocaleDateString("en-IN"),
    time: billTime || "12:00 PM",
    customer,
    items: billItems,
    totalWeightKg,
    totalItems: billItems.length,
    scrapSubtotal,
    pickupFee,
    grandTotal,
    staffName,
  };

  // Save current bill to history
  const handleSaveBillToHistory = () => {
    if (billItems.length === 0) {
      alert("Please add at least one scrap item before saving the bill.");
      return;
    }

    const updated = [currentBill, ...savedBills.filter((b) => b.invoiceNumber !== currentBill.invoiceNumber)];
    setSavedBills(updated);
    localStorage.setItem("scrapiva_saved_bills", JSON.stringify(updated));
    alert(`Bill ${currentBill.invoiceNumber} saved to History successfully!`);
  };

  // Filter items in picker
  const filteredPickerItems = ratesCatalog.filter((item) => {
    const matchesCat = pickerCategory === "All" || item.category === pickerCategory;
    const matchesSearch = item.name.toLowerCase().includes(pickerSearch.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className={styles.billingWrapper}>
      <div className={styles.billingContainer}>
        {/* Top Header */}
        <header className={styles.billingHeader}>
          <div className={styles.headerLeft}>
            <span className={styles.portalBadge}>Internal Staff Portal</span>
            <div>
              <h1 className={styles.portalTitle}>Purchase Bill & Receipt Generator</h1>
              <p className={styles.portalSub}>
                Issue itemized scrap purchase receipts with live rate calculations for customers
              </p>
            </div>
          </div>

          <div className={styles.headerActions}>
            <button type="button" className={styles.actionPill} onClick={handleNewBill}>
              <Plus size={16} /> New Bill
            </button>
          </div>
        </header>

        {/* Workspace Two-Column Grid */}
        <div className={styles.billingGrid}>
          {/* LEFT PANEL: Bill Builder */}
          <div className={styles.builderCard}>
            <h3 className={styles.cardSectionTitle}>
              <UserCheck size={18} className={styles.titleIcon} /> Customer & Transaction Info
            </h3>

            {/* Customer Inputs */}
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>Customer Name</label>
                <input
                  type="text"
                  placeholder="e.g. Rahul Sharma"
                  value={customer.name}
                  onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Mobile Number (WhatsApp)</label>
                <input
                  type="tel"
                  placeholder="10 digit mobile number"
                  value={customer.phone}
                  onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                />
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>Address / Location</label>
                <input
                  type="text"
                  placeholder="e.g. Sevoke Road, Siliguri"
                  value={customer.address}
                  onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Payment Mode</label>
                <select
                  value={customer.paymentMode}
                  onChange={(e) =>
                    setCustomer({
                      ...customer,
                      paymentMode: e.target.value as any,
                    })
                  }
                >
                  <option value="Cash">Cash</option>
                  <option value="UPI">UPI (PhonePe / GPay / Paytm)</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                </select>
              </div>
            </div>

            {/* Scrap Item Picker */}
            <div className={styles.itemPickerSection}>
              <h3 className={styles.cardSectionTitle}>
                <Sparkles size={18} className={styles.titleIcon} /> Select Scrap Material
              </h3>

              <div className={styles.searchAndFilter}>
                <div className={styles.searchBox}>
                  <Search size={16} />
                  <input
                    type="text"
                    placeholder="Search scrap item (e.g. Copper, Newspaper, Battery)..."
                    value={pickerSearch}
                    onChange={(e) => setPickerSearch(e.target.value)}
                  />
                </div>

                <div className={styles.categoryPills}>
                  {scrapCategories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      className={`${styles.catPill} ${
                        pickerCategory === cat ? styles.catPillActive : ""
                      }`}
                      onClick={() => setPickerCategory(cat)}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Item Buttons Grid */}
              <div className={styles.itemGrid}>
                {filteredPickerItems.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={styles.itemBtn}
                    onClick={() => handleAddItem(item)}
                  >
                    <span className={styles.itemName}>{item.name}</span>
                    <span className={styles.itemPriceTag}>
                      ₹{item.price} /{item.unit}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Items Table / Mobile Card List */}
            <div className={styles.selectedItemsWrapper}>
              {/* Desktop Table */}
              <div className={styles.desktopTableOnly}>
                <table className={styles.builderTable}>
                  <thead>
                    <tr>
                      <th>Scrap Item</th>
                      <th>Rate (₹)</th>
                      <th>Qty / Weight</th>
                      <th>Subtotal</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {billItems.length === 0 ? (
                      <tr>
                        <td colSpan={5} style={{ textAlign: "center", padding: "1.5rem", color: "#9ca3af" }}>
                          Click scrap items above to add them to the bill.
                        </td>
                      </tr>
                    ) : (
                      billItems.map((item) => (
                        <tr key={item.id}>
                          <td>
                            <strong>{item.name}</strong>
                            <div style={{ fontSize: "0.7rem", color: "#9ca3af" }}>{item.category}</div>
                          </td>
                          <td>
                            <input
                              type="number"
                              step="0.5"
                              className={styles.rateInputInline}
                              value={item.rate}
                              onChange={(e) => handleRateChange(item.id, e.target.value)}
                            />
                            /{item.unit}
                          </td>
                          <td>
                            <div className={styles.qtyControlWrapper}>
                              <button
                                type="button"
                                className={styles.stepperBtn}
                                onClick={() =>
                                  handleQuantityChange(
                                    item.id,
                                    Math.max(0.1, Math.round((item.quantity - 1) * 10) / 10).toString()
                                  )
                                }
                                title="Decrease quantity"
                              >
                                -
                              </button>
                              <input
                                type="number"
                                step="0.1"
                                min="0.1"
                                className={styles.qtyInput}
                                value={item.quantity}
                                onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                              />
                              <button
                                type="button"
                                className={styles.stepperBtn}
                                onClick={() =>
                                  handleQuantityChange(
                                    item.id,
                                    (Math.round((item.quantity + 1) * 10) / 10).toString()
                                  )
                                }
                                title="Increase quantity"
                              >
                                +
                              </button>
                            </div>
                            <span className={styles.unitLabel}>{item.unit}</span>
                          </td>
                          <td>
                            <strong style={{ color: "#34d399" }}>
                              ₹{item.subtotal.toLocaleString("en-IN")}
                            </strong>
                          </td>
                          <td>
                            <button
                              type="button"
                              className={styles.deleteItemBtn}
                              onClick={() => handleRemoveItem(item.id)}
                              title="Remove line"
                            >
                              <Trash2 size={14} />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card List View (Fits 100% on phone screens) */}
              <div className={styles.mobileCardsOnly}>
                {billItems.length === 0 ? (
                  <div style={{ textAlign: "center", padding: "1.25rem", color: "#9ca3af", fontSize: "0.85rem" }}>
                    Click scrap items above to add them to the bill.
                  </div>
                ) : (
                  billItems.map((item) => (
                    <div key={item.id} className={styles.mobileItemCardRow}>
                      <div className={styles.mobileItemCardTop}>
                        <div>
                          <strong className={styles.mobileItemCardTitle}>{item.name}</strong>
                          <span className={styles.mobileItemCardCategory}>{item.category}</span>
                        </div>
                        <button
                          type="button"
                          className={styles.deleteItemBtn}
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      <div className={styles.mobileItemCardBottom}>
                        <div className={styles.mobileRateBox}>
                          <label>Rate (₹):</label>
                          <input
                            type="number"
                            step="0.5"
                            className={styles.rateInputInline}
                            value={item.rate}
                            onChange={(e) => handleRateChange(item.id, e.target.value)}
                          />
                          <span>/{item.unit}</span>
                        </div>

                        <div className={styles.mobileQtyBox}>
                          <label>Qty:</label>
                          <div className={styles.qtyControlWrapper}>
                            <button
                              type="button"
                              className={styles.stepperBtn}
                              onClick={() =>
                                handleQuantityChange(
                                  item.id,
                                  Math.max(0.1, Math.round((item.quantity - 1) * 10) / 10).toString()
                                )
                              }
                            >
                              -
                            </button>
                            <input
                              type="number"
                              step="0.1"
                              min="0.1"
                              className={styles.qtyInput}
                              value={item.quantity}
                              onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                            />
                            <button
                              type="button"
                              className={styles.stepperBtn}
                              onClick={() =>
                                handleQuantityChange(
                                  item.id,
                                  (Math.round((item.quantity + 1) * 10) / 10).toString()
                                )
                              }
                            >
                              +
                            </button>
                          </div>
                          <span className={styles.unitLabel}>{item.unit}</span>
                        </div>

                        <div className={styles.mobileSubtotalBox}>
                          <label>Subtotal:</label>
                          <strong style={{ color: "#34d399", fontSize: "0.95rem" }}>
                            ₹{item.subtotal.toLocaleString("en-IN")}
                          </strong>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Form to Add Custom Manual Item */}
            <div style={{ marginTop: "1rem" }}>
              <form onSubmit={handleAddCustomItem} className={styles.addMaterialForm} style={{ margin: 0 }}>
                <h4 style={{ margin: "0 0 0.5rem 0", fontSize: "0.85rem", color: "#e5e7eb" }}>
                  + Add Custom Unlisted Scrap Item
                </h4>
                <div className={styles.addGrid}>
                  <input
                    type="text"
                    placeholder="Custom Item Name"
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                  />
                  <input
                    type="number"
                    placeholder="Rate ₹"
                    value={customRate}
                    onChange={(e) => setCustomRate(e.target.value)}
                  />
                  <input
                    type="number"
                    step="0.1"
                    placeholder="Qty/Weight"
                    value={customWeight}
                    onChange={(e) => setCustomWeight(e.target.value)}
                  />
                  <button type="submit" className={styles.saveAddBtn}>
                    <Plus size={14} /> Add Line
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* RIGHT PANEL: Formatted Invoice Sheet & Export Controls */}
          <div className={styles.previewWrapper}>
            {/* Printable Light-Theme Purchase Bill Invoice Card */}
            <div id="printable-invoice-card" className={styles.invoiceSheet}>
              {/* Header */}
              <div className={styles.invoiceHeader}>
                <div>
                  <h2 className={styles.brandLogo}>{siteConfig.name}</h2>
                  <div className={styles.brandTag}>Scrap Purchase Receipt & Payout Voucher</div>
                  <div className={styles.companyContact}>
                    📍 {siteConfig.contact.address} <br />
                    📞 Phone: {siteConfig.contact.phone} | ✉️ {siteConfig.contact.email}
                  </div>
                </div>

                <div className={styles.invoiceMeta}>
                  <div className={styles.invoiceTitle}>PURCHASE BILL</div>
                  <div className={styles.invoiceNumber}>{currentBill.invoiceNumber}</div>
                  <div className={styles.invoiceDate}>Date: {currentBill.date}</div>
                  <div className={styles.invoiceDate}>Time: {currentBill.time}</div>
                </div>
              </div>

              {/* Customer Info Box */}
              <div className={styles.customerMetaBox}>
                <div>
                  <div className={styles.metaLabel}>Customer Payout Details</div>
                  <div className={styles.metaVal}>{currentBill.customer.name || "Walk-in Customer"}</div>
                  {currentBill.customer.phone && (
                    <div className={styles.metaSubVal}>📱 {currentBill.customer.phone}</div>
                  )}
                  {currentBill.customer.address && (
                    <div className={styles.metaSubVal}>📍 {currentBill.customer.address}</div>
                  )}
                </div>

                <div>
                  <div className={styles.metaLabel}>Payment Status</div>
                  <div className={styles.paymentPill}>
                    PAID ({currentBill.customer.paymentMode})
                  </div>
                </div>
              </div>

              {/* Itemized Table */}
              <table className={styles.printTable}>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Scrap Material</th>
                    <th>Rate</th>
                    <th>Weight / Qty</th>
                    <th>Total (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  {currentBill.items.length === 0 ? (
                    <tr>
                      <td colSpan={5} style={{ textAlign: "center", color: "#6b7280", padding: "1.5rem" }}>
                        No scrap items added yet. Select items from builder.
                      </td>
                    </tr>
                  ) : (
                    currentBill.items.map((item, idx) => (
                      <tr key={item.id}>
                        <td>{idx + 1}</td>
                        <td>
                          <strong>{item.name}</strong>
                          <span className={styles.itemCatBadge}>{item.category}</span>
                        </td>
                        <td>
                          ₹{item.rate}/{item.unit}
                        </td>
                        <td>
                          {item.quantity} {item.unit}
                        </td>
                        <td>
                          <strong>₹{item.subtotal.toLocaleString("en-IN")}</strong>
                        </td>
                      </tr>
                    ))
                  )}

                  {/* Automatic Pickup Charge Deduction Row for orders under 500 */}
                  {pickupFee > 0 && (
                    <tr style={{ background: "#fff5f5" }}>
                      <td>-</td>
                      <td>
                        <strong style={{ color: "#dc2626" }}>Doorstep Pickup Charge</strong>
                        <span className={styles.itemCatBadge} style={{ color: "#ef4444" }}>Applicable for scrap values under ₹500</span>
                      </td>
                      <td>Fixed</td>
                      <td>1 trip</td>
                      <td>
                        <strong style={{ color: "#dc2626" }}>- ₹100</strong>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              {/* Invoice Footer Total */}
              <div className={styles.invoiceTotalSection}>
                <div className={styles.totalWeightsInfo}>
                  <div>Total Line Items: <strong>{currentBill.items.length}</strong></div>
                  <div>Total Net Weight: <strong>{currentBill.totalWeightKg.toFixed(2)} kg</strong></div>
                  {pickupFee > 0 ? (
                    <>
                      <div>Scrap Subtotal: <strong>₹{scrapSubtotal.toLocaleString("en-IN")}</strong></div>
                      <div style={{ color: "#dc2626" }}>Doorstep Pickup Fee: <strong>- ₹100</strong></div>
                      <div style={{ marginTop: "0.5rem", padding: "0.6rem 0.85rem", background: "#fff7ed", border: "1px solid #ffedd5", borderRadius: "8px", color: "#c2410c", fontSize: "0.78rem", lineHeight: "1.4" }}>
                        💡 <strong>Friendly Reminder:</strong> A pickup charge of ₹100 is deducted for scrap values under ₹500. Sell scrap worth <strong>₹500 or more</strong> next time to get <strong>100% FREE pickup</strong>!
                      </div>
                    </>
                  ) : (
                    <>
                      {scrapSubtotal >= 500 && (
                        <div style={{ marginTop: "0.5rem", padding: "0.6rem 0.85rem", background: "#ecfdf5", border: "1px solid #a7f3d0", borderRadius: "8px", color: "#047857", fontSize: "0.78rem", lineHeight: "1.4" }}>
                          🎉 <strong>100% FREE Pickup Applied!</strong> No doorstep pickup charges for scrap values ₹500 and above.
                        </div>
                      )}
                    </>
                  )}
                  <div style={{ marginTop: "0.35rem", color: "#047857", fontSize: "0.75rem" }}>
                    ✓ Materials weighed & verified on certified digital scale.
                  </div>
                </div>

                <div className={styles.grandTotalBox}>
                  <div className={styles.grandTotalLabel}>Grand Total Payout</div>
                  <div className={styles.grandTotalAmount}>
                    ₹{currentBill.grandTotal.toLocaleString("en-IN")}
                  </div>
                </div>
              </div>

              {/* Footer Note & Signature */}
              <div className={styles.invoiceFooterNote}>
                <div>
                  Thank you for contributing to a greener environment with <strong>Scrapiva</strong>! ♻️
                </div>
                <div className={styles.signatureBox}>
                  Authorized Signatory <br />
                  <span style={{ fontSize: "0.65rem", color: "#9ca3af" }}>Scrapiva Recycling</span>
                </div>
              </div>
            </div>

            {/* Quick Export Toolbar (Placed directly below generated invoice bill) */}
            <div className={styles.exportToolbar} style={{ marginTop: "1rem" }}>
              <button
                type="button"
                className={`${styles.exportBtn} ${styles.btnPng}`}
                onClick={() => downloadBillAsImage("printable-invoice-card", currentBill.invoiceNumber)}
                title="Download pixel-perfect image for WhatsApp sharing"
              >
                <ImageIcon size={16} /> Image (PNG)
              </button>

              <button
                type="button"
                className={`${styles.exportBtn} ${styles.btnPdf}`}
                onClick={() => downloadBillAsPDF("printable-invoice-card", currentBill.invoiceNumber)}
                title="Download PDF document"
              >
                <FileText size={16} /> PDF Document
              </button>

              <button
                type="button"
                className={`${styles.exportBtn} ${styles.btnWhatsApp}`}
                onClick={() => sendBillToWhatsApp(currentBill)}
                title="Send bill directly to Customer WhatsApp"
              >
                <Share2 size={16} /> WhatsApp
              </button>

              <button
                type="button"
                className={`${styles.exportBtn} ${styles.btnPrint}`}
                onClick={printBill}
                title="Print receipt on physical printer"
              >
                <Printer size={16} /> Print
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Rate Manager Modal */}
      <RateManagerModal
        isOpen={isRateModalOpen}
        onClose={() => setIsRateModalOpen(false)}
        rates={ratesCatalog}
        onSaveRates={handleSaveRates}
        onResetDefaults={handleResetRates}
      />

      {/* Bill History Modal */}
      <BillHistoryModal
        isOpen={isHistoryModalOpen}
        onClose={() => setIsHistoryModalOpen(false)}
        savedBills={savedBills}
        onSelectBill={(selected) => {
          setInvoiceNumber(selected.invoiceNumber);
          setBillDate(selected.date);
          setBillTime(selected.time);
          setCustomer(selected.customer);
          setBillItems(selected.items);
        }}
        onDeleteBill={(invNo) => {
          const updated = savedBills.filter((b) => b.invoiceNumber !== invNo);
          setSavedBills(updated);
          localStorage.setItem("scrapiva_saved_bills", JSON.stringify(updated));
        }}
        onClearHistory={() => {
          setSavedBills([]);
          localStorage.removeItem("scrapiva_saved_bills");
        }}
      />
    </div>
  );
};
