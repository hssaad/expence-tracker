let transactions = [];

document.getElementById('expenseForm').addEventListener('submit', e => {
    e.preventDefault();
    addTransaction('expense');
});

document.getElementById('incomeForm').addEventListener('submit', e => {
    e.preventDefault();
    addTransaction('income');
});

function addTransaction(type) {
    const transaction = {
        type,
        name: document.getElementById(`${type}Name`).value,
        amount: parseFloat(document.getElementById(`${type}Amount`).value),
        date: document.getElementById(`${type}Date`).value
    };
    transactions.push(transaction);
    updateTable();
    document.getElementById(`${type}Form`).reset();
}

function updateTable() {
    const tbody = document.querySelector('#transactionTable tbody');
    tbody.innerHTML = transactions.map((t,i) => `
        <tr>
            <td>${t.type}</td>
            <td>${t.name}</td>
            <td>${t.amount}</td>
            <td>${t.date}</td>
            <td><button onclick="deleteTx(${i})" class="del-btn">❌</button></td>
        </tr>`
    ).join('');
    calculateTotals();
}

function deleteTx(i) {
    transactions.splice(i, 1);
    updateTable();
}

function calculateTotals(start, end) {
    let expenses = 0, income = 0;
    transactions.forEach(t => {
        if (!dateInRange(t.date, start, end)) return;
        t.type === 'expense' ? expenses += t.amount : income += t.amount;
    });
    document.getElementById('totalExpenses').textContent = expenses.toFixed(2);
    document.getElementById('totalIncome').textContent = income.toFixed(2);
    document.getElementById('netBalance').textContent = (income - expenses).toFixed(2);
}

function dateInRange(date, start, end) {
    if (!start || !end) return true;
    const d = new Date(date);
    return d >= new Date(start) && d <= new Date(end);
}

document.getElementById('periodForm').addEventListener('submit', e => {
    e.preventDefault();
    calculateTotals(
        document.getElementById('startDate').value,
        document.getElementById('endDate').value
    );
});