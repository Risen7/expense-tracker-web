const transactionss = JSON.parse(localStorage.getItem("transactionss")) || [];

const expenseHistory = JSON.parse(localStorage.getItem("expenseHistory")) || [];

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'PHP',
    signDisplay: "always",
})

const list = document.getElementById("transactionList");
const form = document.getElementById("transactionForm");
const status = document.getElementById("status");
const balance = document.getElementById("balance");
const income = document.getElementById("income");
const expense = document.getElementById("expense");
const expTransactions = document.getElementById("transaction");
const header = document.getElementById("header");
const expList = document.getElementById("expenseList");
const expStatus = document.getElementById("expStatus");



form.addEventListener('submit', addTransaction);
form.addEventListener('button', addHistory);


function updateTotal() {
    const incomeTotal = transactionss
        .filter((trx) => trx.type === "income")
        .reduce((total, trx) => total + trx.amount, 0);
    const expenseTotal = transactionss
        .filter((trx) => trx.type === "expense")
        .reduce((total, trx) => total + trx.amount, 0);

    const  balanceTotal = incomeTotal - expenseTotal;

    balance.textContent = formatter.format(balanceTotal).substring(1);
    income.textContent = formatter.format(incomeTotal);
    expense.textContent = formatter.format(expenseTotal * -1);
}

function renderList() {
    list.innerHTML = "";

    status.textContent = "";
    if(transactionss.length === 0) {
        status.textContent = "No transactions";
        return;
    }

    transactionss.forEach(({ id, name, amount, date, type }) => {
        const sign = 'income' === type ? 1 : -1;

        const li = document.createElement('li');

        li.innerHTML = `
            <div class="name">
                <h4>${name}</h4>
                <p>${new Date(date).toLocaleDateString()}</p>
            </div>

            <div class="amount ${type}">
                <span>${formatter.format(amount * sign)}</span>
            </div>
        
            <div class="action">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" onclick="deleteTransaction(${id})">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
         </div>
        `;

        list.appendChild(li);
    });
}

renderList(); 
updateTotal();

function deleteTransaction(id) {
    const index = transactionss.findIndex((trx) => trx.id === id)
    // const indexExp = expenseHistory.findIndex((try) => try.id === id)
    transactionss.splice(index, 1);
    // expenseHistory.splice(index, 1);

    updateTotal();
    saveTransactions(); 
    saveHistory();
    renderList();
    renderExp();
}

function addTransaction(e) {
    e.preventDefault();

    const formData = new FormData(this);

    transactionss.push({
        id: transactionss.length + 1,
        name: formData.get("name"),
        amount: parseFloat(formData.get("amount")),
        date: new Date(formData.get("date")),
        type: "on" === formData.get("type") ? "income" : "expense",
    });

    this.reset();

    updateTotal();
    saveTransactions();
    saveHistory();
    renderList();
    renderExp();
}

function addHistory() {
    console.log("add hist")
    expenseHistory.push(expTransactions)
    updateTotal();
    saveTransactions();
    saveHistory();
    renderList();
    renderExp();
}

function renderExp() {
    // console.log(expTransactions.innerHTML);
    expList.innerHTML = "";

    expStatus.textContent = "";
    if(expenseHistory.length === 0) {
        expStatus.textContent = "No transactions";
        return;
    }

    expenseHistory.forEach((expTransactions) => {
        const li = document.createElement('header');
        

        li.innerHTML = `${header.innerHTML}`;

        const li2 = document.createElement('section');

        li2.innerHTML = `${expTransactions.innerHTML}`;

        expList.appendChild(li);
        expList.appendChild(li2);
    });
}

function saveTransactions() {
    transactionss.sort((a,b) => new Date(b.date) - new Date(a.date));

    localStorage.setItem("transactionss", JSON.stringify(transactionss));
}



function saveHistory() { //save or transfer data of expense to history data

    localStorage.setItem("expenseHistory", JSON.stringify(expenseHistory));
}
