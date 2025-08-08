import React from "react";
import { FaAngleDown } from "react-icons/fa";
import "./Filters.css";

const Filters = ({
  selectedMonth,
  selectedCategory,
  months,
  categories,
  onMonthChange,
  onCategoryChange,
  minAmount,
  maxAmount,
  onMinAmountChange,
  onMaxAmountChange,
  sortOption,
  onSortChange,
}) => {
  return (
    <div className="filters-card">
      <div className="filters-container">

        {/* Month Filter */}
        <div className="filter-group">
          <label className="filter-label">Month</label>
          <div className="filter-select-wrapper">
            <select
              value={selectedMonth}
              onChange={(e) => onMonthChange(e.target.value)}
              className="filter-select"
            >
              <option value="">All</option>
              {months?.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
            <FaAngleDown className="dropdown-icon" />
          </div>
        </div>

        {/* Category Filter */}
        <div className="filter-group">
          <label className="filter-label">Category</label>
          <div className="filter-select-wrapper">
            <select
              value={selectedCategory}
              onChange={(e) => onCategoryChange(e.target.value)}
              className="filter-select"
            >
              <option value="">All</option>
              {categories?.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <FaAngleDown className="dropdown-icon" />
          </div>
        </div>

        {/* Amount Range */}
        <div className="filter-group amount-group">
          <label className="filter-label">Amount Range</label>
          <div className="amount-inputs">
            <input
              type="number"
              placeholder="Min"
              value={minAmount}
              onChange={(e) => onMinAmountChange(e.target.value)}
              className="amount-input"
            />
            <span className="amount-separator">–</span>
            <input
              type="number"
              placeholder="Max"
              value={maxAmount}
              onChange={(e) => onMaxAmountChange(e.target.value)}
              className="amount-input"
            />
          </div>
        </div>

        {/* Sort By Filter (moved below) */}
        <div className="filter-group full-width">
          <label className="filter-label">Sort By</label>
          <div className="filter-select-wrapper">
            <select
              value={sortOption}
              onChange={(e) => onSortChange(e.target.value)}
              className="filter-select"
            >
              <option value="">Default</option>
              <option value="date-desc">Date: Newest</option>
              <option value="date-asc">Date: Oldest</option>
              <option value="amount-desc">Amount: High to Low</option>
              <option value="amount-asc">Amount: Low to High</option>
            </select>
            <FaAngleDown className="dropdown-icon" />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Filters;
