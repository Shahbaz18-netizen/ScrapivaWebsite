"use client";

import React, { useState } from "react";
import { PurchaseBill } from "@/types/bill";
import { Search, History, Trash2, Eye, X, MessageSquare, Download } from "lucide-react";
import { sendBillToWhatsApp, downloadBillAsPDF, downloadBillAsImage } from "@/utils/exportUtils";
import styles from "./BillingSection.module.css";

interface BillHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedBills: PurchaseBill[];
  onSelectBill: (bill: PurchaseBill) => void;
  onDeleteBill: (invoiceNumber: string) => void;
  onClearHistory: () => void;
}

export const BillHistoryModal: React.FC<BillHistoryModalProps> = ({
  isOpen,
  onClose,
  savedBills,
  onSelectBill,
  onDeleteBill,
  onClearHistory,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  if (!isOpen) return null;

  const filteredBills = savedBills.filter((bill) => {
    const term = searchTerm.toLowerCase();
    return (
      bill.invoiceNumber.toLowerCase().includes(term) ||
      (bill.customer.name && bill.customer.name.toLowerCase().includes(term)) ||
      (bill.customer.phone && bill.customer.phone.includes(term))
    );
  });

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <div>
            <h2 className={styles.modalTitle}>
              <History size={20} className={styles.titleIcon} /> Saved Purchase Bills History
            </h2>
            <p className={styles.modalSub}>
              View, search, or re-export bills created during scrap pickups.
            </p>
          </div>
          <button className={styles.closeBtn} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Search Toolbar */}
        <div className={styles.rateToolbar}>
          <div className={styles.searchBox} style={{ width: "100%", maxWidth: "400px" }}>
            <Search size={16} />
            <input
              type="text"
              placeholder="Search by Invoice #, Customer Name, or Phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {savedBills.length > 0 && (
            <button
              type="button"
              className={styles.resetBtn}
              onClick={() => {
                if (confirm("Are you sure you want to clear all saved bill history?")) {
                  onClearHistory();
                }
              }}
            >
              <Trash2 size={16} /> Clear All History
            </button>
          )}
        </div>

        {/* Bill List Table */}
        <div className={styles.tableScroll}>
          {filteredBills.length === 0 ? (
            <div className={styles.emptyState}>
              <History size={40} opacity={0.4} />
              <p>No saved purchase bills found.</p>
            </div>
          ) : (
            <table className={styles.ratesTable}>
              <thead>
                <tr>
                  <th>Invoice #</th>
                  <th>Date & Time</th>
                  <th>Customer</th>
                  <th>Items / Weight</th>
                  <th>Grand Total</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBills.map((bill) => (
                  <tr key={bill.invoiceNumber}>
                    <td>
                      <span className={styles.invoiceBadge}>{bill.invoiceNumber}</span>
                    </td>
                    <td>
                      <div>{bill.date}</div>
                      <div className={styles.timeSub}>{bill.time}</div>
                    </td>
                    <td>
                      <strong>{bill.customer.name || "Customer"}</strong>
                      {bill.customer.phone && (
                        <div className={styles.phoneSub}>{bill.customer.phone}</div>
                      )}
                    </td>
                    <td>
                      {bill.items.length} items ({bill.totalWeightKg.toFixed(2)} kg)
                    </td>
                    <td>
                      <span className={styles.totalAmountHighlight}>
                        ₹{bill.grandTotal.toLocaleString("en-IN")}
                      </span>
                    </td>
                    <td>
                      <div className={styles.actionGroup}>
                        <button
                          type="button"
                          className={styles.iconBtn}
                          title="Open & Preview Bill"
                          onClick={() => {
                            onSelectBill(bill);
                            onClose();
                          }}
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          type="button"
                          className={styles.iconBtnWhatsApp}
                          title="Send to WhatsApp"
                          onClick={() => sendBillToWhatsApp(bill)}
                        >
                          <MessageSquare size={16} />
                        </button>
                        <button
                          type="button"
                          className={styles.iconBtnDanger}
                          title="Delete Bill"
                          onClick={() => onDeleteBill(bill.invoiceNumber)}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className={styles.modalFooter}>
          <button type="button" className={styles.cancelBtn} onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
