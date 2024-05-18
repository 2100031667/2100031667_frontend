const data = [
    { name: "Alice", age: 25, city: "New York", country: "USA" },
    { name: "Bob", age: 30, city: "London", country: "UK" },
    { name: "Charlie", age: 28, city: "Paris", country: "France" },
  
  ];
  
  function populateTable(data) {
    const tableBody = document.getElementById('tableData');
    tableBody.innerHTML = ""; // Clear existing content
  
    data.forEach(row => {
      const tableRow = document.createElement('tr');
      for (const key in row) {
        const tableCell = document.createElement('td');
        tableCell.textContent = row[key];
        tableRow.appendChild(tableCell);
      }
      tableBody.appendChild(tableRow);
    });
  }
  
  function sortData(column) {
    data.sort((a, b) => {
      const valueA = a[column];
      const valueB = b[column];
      if (valueA < valueB) return -1;
      if (valueA > valueB) return 1;
      return 0; // No change
    });
  
    populateTable(data); // Re-populate with sorted data
  }
  
  const tableHeaders = document.querySelectorAll('thead th');
  tableHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const sortColumn = header.textContent.toLowerCase();
      sortData(sortColumn);
    });
  });
  
  // Pagination logic (optional)
  const pageSize = 10; // Number of items per page
  let currentPage = 1;
  
  function paginateData() {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedData = data.slice(startIndex, endIndex);
    populateTable(pagininatedData);
  }
  
  const prevButton = document.getElementById('prevButton');
  const nextButton = document.getElementById('nextButton');
  
  prevButton.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      paginateData();
      prevButton.disabled = currentPage === 1;
      nextButton.disabled = false;
    }
  });
  
  nextButton.addEventListener('click', () => {
    if (currentPage * pageSize < data.length) {
      currentPage++;
      paginateData();
      prevButton.disabled = false;
      nextButton.disabled = currentPage === Math.ceil(data.length / pageSize);
    }
  });
  
  const filterInput = document.getElementById('filterInput');
  filterInput.addEventListener('keyup', () => {
    const filterText = filterInput.value.toLowerCase();
    const filteredData = data.filter(row => {
     
      return Object.values(row).some(value => value.toString().toLowerCase().includes(filterText));
    });
  
    
    populateTable(filteredData);
    currentPage = 1;
  });
  
  paginateData(); 