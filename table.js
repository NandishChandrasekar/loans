import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import './Table.css'; // Import your custom CSS for the table styles
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Table = ({ data, itemsPerPage, onPageChange }) => {
  const [sortedField, setSortedField] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [filterValue, setFilterValue] = useState('');

  const handleSort = (field) => {
    if (field === sortedField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortedField(field);
      setSortDirection('asc');
    }
  };

  const handleFilter = (event) => {
    setFilterValue(event.target.value);
  };

  const sortedAndFilteredData = [...data]
    .filter((item) => !filterValue || item.status === filterValue)
    .sort((a, b) => {
      if (!sortedField) return 0;
      const aValue = a[sortedField];
      const bValue = b[sortedField];
      if (sortDirection === 'asc') {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    });

  return (
    <main className="list-queue">
      <section className="table-header">
        <div className="table-heading">
          <h1>Loan History</h1>
        </div>
        <div className="input-group">
          <input type="search" placeholder="Search Data..." />
          <FontAwesomeIcon icon={faSearch} />
        </div>
        <div className="filter-group">
          <select onChange={handleFilter} value={filterValue}>
            <option value="">All</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </section>
      <section className="table-body">
        <table className="table">
          <thead>
            <tr>
              <th onClick={() => handleSort('name')}>Name</th>
              <th onClick={() => handleSort('regId')}>Reg ID</th>
              <th onClick={() => handleSort('loanAmount')}>Loan Amount</th>
              <th onClick={() => handleSort('loanType')}>Loan Type</th>
              <th onClick={() => handleSort('annualIncome')}>Annual Income</th>
              <th onClick={() => handleSort('requestDate')}>Request Date</th>
              <th onClick={() => handleSort('status')}>Status</th>
            </tr>
          </thead>
          <tbody>
            {sortedAndFilteredData.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.regId}</td>
                <td>{item.loanAmount}</td>
                <td>{item.loanType}</td>
                <td>{item.annualIncome}</td>
                <td>{item.requestDate}</td>
                <td className={`status-cell status_${item.status.toLowerCase()}`}>
                  <p className={`status_delivered ${item.status.toLowerCase()}`}>
                    {item.status}
                  </p>
                </td>
                <td><FontAwesomeIcon icon={faEdit} /></td>
              </tr>
            ))}
          </tbody>
        </table>
        <ReactPaginate
          previousLabel={''}
          nextLabel={''}
          breakClassName={'break-me'}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={onPageChange}
          containerClassName={'pagination'}
          activeClassName={'active'}
        />
      </section>
    </main>
  );
};

export default Table;
