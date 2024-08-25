let items = [];
let total = 0;
let maxFunds = 0; // Initially set to 0

function setMaxFunds() {
    const inputMaxFunds = parseFloat(document.getElementById('maxFunds').value);
    if (!isNaN(inputMaxFunds) && inputMaxFunds > 0) {
        maxFunds = inputMaxFunds; // Set the max funds
        document.getElementById('remainingFunds').textContent = `Remaining Funds: R${maxFunds.toFixed(2)}`;
        document.getElementById('maxFundsDisplay').style.display = 'block'; // Show max funds
        document.getElementById('maxFundsValue').textContent = `R${maxFunds.toFixed(2)}`;
        document.getElementById('maxFunds').disabled = true; // Disable input after setting
        alert(`Max allocated funds set to R${maxFunds.toFixed(2)}`);
    } else {
        alert('Please enter a valid maximum allocated funds amount.');
    }
}

function addItem() {
    const description = document.getElementById('description').value.trim();
    const amount = parseFloat(document.getElementById('amount').value);

    if (description && !isNaN(amount)) {
        if (total + amount > maxFunds) {
            alert('Adding this item would exceed your maximum allocated funds.');
            return;
        }

        items.push({ description, amount });
        total += amount;

        const itemList = document.getElementById('itemList');
        const listItem = document.createElement('tr');
        listItem.innerHTML = `<td>${description}</td><td>R${amount.toFixed(2)}</td>`;
        itemList.appendChild(listItem);

        document.getElementById('totalAmount').textContent = `R${total.toFixed(2)}`;
        document.getElementById('remainingFunds').textContent = `Remaining Funds: R${(maxFunds - total).toFixed(2)}`;

        document.getElementById('balanceSheetForm').reset();
    } else {
        alert('Please enter both a valid description and amount.');
    }
}

function generatePDF() {
    const element = document.getElementById('tableContainer');
    const date = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-GB', options);
    const formattedTime = date.toLocaleTimeString('en-GB');

    // Add header content
    const headerContent = `<h2>Balance Sheet - Nathan Diambamba</h2>
                           <p>Date: ${formattedDate}</p>
                           <p>Time: ${formattedTime}</p>`;
    
    // Create a new div to hold the content for the PDF
    const pdfContent = document.createElement('div');
    pdfContent.innerHTML = headerContent + element.innerHTML;

    // Change total and remaining funds to red and bold in the PDF content
    const totalElement = pdfContent.querySelector('#totalAmount');
    const remainingElement = pdfContent.querySelector('#remainingFunds');
    
    if (totalElement) {
        totalElement.classList.add('red-text'); // Add red-text class
    }
    
    if (remainingElement) {
        remainingElement.classList.add('red-text'); // Add red-text class
    }

    const optionsPDF = {
        margin:       1,
        filename:     'balance-sheet-NSD.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    
    html2pdf().from(pdfContent).set(optionsPDF).save();
}
