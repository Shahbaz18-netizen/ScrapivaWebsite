"use client";

import React, { useState } from "react";
import { ScrapMaterialRate } from "@/types/bill";
import { scrapCategories } from "@/data/scrapPrices";
import { Search, Save, RotateCcw, Plus, X, Edit3, Check } from "lucide-react";
import styles from "./BillingSection.module.css";

interface RateManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  rates: ScrapMaterialRate[];
  onSaveRates: (updatedRates: ScrapMaterialRate[]) => void;
  onResetDefaults: () => void;
}

export const RateManagerModal: React.FC<RateManagerModalProps> = ({
  isOpen,
  onClose,
  rates,
  onSaveRates,
  onResetDefaults,
}) => {
  const [editableRates, setEditableRates] = useState<ScrapMaterialRate[]>(rates);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [newMaterial, setNewMaterial] = useState<{
    name: string;
    category: "Paper Scrap" | "Metal Scraps" | "Plastic Scrap" | "E-waste Scraps";
    price: string;
    unit: string;
  }>({
    name: "",
    category: "Metal Scraps",
    price: "",
    unit: "kg",
  });
  const [showAddForm, setShowAddForm] = useState(false);

  // Sync state if props change when opening
  React.useEffect(() => {
    setEditableRates(rates);
  }, [rates, isOpen]);

  if (!isOpen) return null;

  const filteredRates = editableRates.filter((item) => {
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handlePriceChange = (id: string, newPrice: string) => {
    setEditableRates((prev) =>
      prev.map((item) => (item.id === id ? { ...item, price: newPrice } : item))
    );
  };

  const handleAddMaterial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMaterial.name || !newMaterial.price) return;

    const id = `custom-${Date.now()}`;
    const newItem: ScrapMaterialRate = {
      id,
      name: newMaterial.name,
      category: newMaterial.category,
      price: newMaterial.price,
      unit: newMaterial.unit || "kg",
      isPopular: false,
    };

    setEditableRates((prev) => [newItem, ...prev]);
    setNewMaterial({
      name: "",
      category: "Metal Scraps",
      price: "",
      unit: "kg",
    });
    setShowAddForm(false);
  };

  const handleSave = () => {
    onSaveRates(editableRates);
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <div>
            <h2 className={styles.modalTitle}>
              <Edit3 size={20} className={styles.titleIcon} /> Manage Scrap Rates Catalog
            </h2>
            <p className={styles.modalSub}>
              Edit default buying rates per item. These rates will apply to all new bills.
            </p>
          </div>
          <button className={styles.closeBtn} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Toolbar: Search, Filters & Actions */}
        <div className={styles.rateToolbar}>
          <div className={styles.searchBox}>
            <Search size={16} />
            <input
              type="text"
              placeholder="Search material..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className={styles.categoryPills}>
            {scrapCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`${styles.catPill} ${
                  selectedCategory === cat ? styles.catPillActive : ""
                }`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <button
            type="button"
            className={styles.addBtn}
            onClick={() => setShowAddForm(!showAddForm)}
          >
            <Plus size={16} /> Add New Item
          </button>
        </div>

        {/* Form to Add New Scrap Item */}
        {showAddForm && (
          <form className={styles.addMaterialForm} onSubmit={handleAddMaterial}>
            <h4>Add New Material Rate</h4>
            <div className={styles.addGrid}>
              <input
                type="text"
                placeholder="Item Name (e.g. Copper Wire Grade A)"
                value={newMaterial.name}
                onChange={(e) =>
                  setNewMaterial({ ...newMaterial, name: e.target.value })
                }
                required
              />
              <select
                value={newMaterial.category}
                onChange={(e) =>
                  setNewMaterial({
                    ...newMaterial,
                    category: e.target.value as any,
                  })
                }
              >
                <option value="Paper Scrap">Paper Scrap</option>
                <option value="Metal Scraps">Metal Scraps</option>
                <option value="Plastic Scrap">Plastic Scrap</option>
                <option value="E-waste Scraps">E-waste Scraps</option>
              </select>
              <input
                type="number"
                placeholder="Rate (₹)"
                value={newMaterial.price}
                onChange={(e) =>
                  setNewMaterial({ ...newMaterial, price: e.target.value })
                }
                required
              />
              <select
                value={newMaterial.unit}
                onChange={(e) =>
                  setNewMaterial({ ...newMaterial, unit: e.target.value })
                }
              >
                <option value="kg">per kg</option>
                <option value="piece">per piece</option>
              </select>
            </div>
            <div className={styles.addFormActions}>
              <button type="submit" className={styles.saveAddBtn}>
                <Check size={16} /> Add to Rate Catalog
              </button>
              <button
                type="button"
                className={styles.cancelAddBtn}
                onClick={() => setShowAddForm(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* Rate Table */}
        <div className={styles.tableScroll}>
          <table className={styles.ratesTable}>
            <thead>
              <tr>
                <th>Scrap Material</th>
                <th>Category</th>
                <th>Unit</th>
                <th>Standard Rate (₹)</th>
              </tr>
            </thead>
            <tbody>
              {filteredRates.map((item) => (
                <tr key={item.id}>
                  <td className={styles.itemNameCell}>{item.name}</td>
                  <td>
                    <span className={styles.categoryBadge}>{item.category}</span>
                  </td>
                  <td>/{item.unit}</td>
                  <td>
                    <div className={styles.priceInputWrapper}>
                      <span className={styles.currencySymbol}>₹</span>
                      <input
                        type="number"
                        min="0"
                        step="0.5"
                        value={item.price}
                        onChange={(e) =>
                          handlePriceChange(item.id, e.target.value)
                        }
                        className={styles.rateInput}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal Footer */}
        <div className={styles.modalFooter}>
          <button
            type="button"
            className={styles.resetBtn}
            onClick={() => {
              if (
                confirm(
                  "Are you sure you want to reset all rates back to initial default scrap values?"
                )
              ) {
                onResetDefaults();
                onClose();
              }
            }}
          >
            <RotateCcw size={16} /> Reset Defaults
          </button>

          <div className={styles.rightFooterActions}>
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className={styles.saveRatesBtn}
              onClick={handleSave}
            >
              <Save size={16} /> Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
