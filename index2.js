const transactions = [
    {
        id: 1,
        name: 'salary',
        amount: 5000,
        date: new Date(),
        type: 'income'
    },
    {
        id: 2,
        name: 'haircut',
        amount: 20,
        date: new Date(),
        type: 'expense'
    },
    {
        id: 3,
        name: 'concert ticket',
        amount: 350,
        date: new Date(),
        type: 'expense'
    },
];

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    signDisplay: "always",
})

const list = document.getElementById("transactionList");
const status = document.getElementById("status");

function renderList() {
    list.innerHTML = "";

    transactions.forEach(({ id, name, amount, date, type }) => {
        const li = document.createElement('li');

        li.innerHTML = `
            <div class="name">
                <h4>${name}</h4>
                <p>${new Date(date).toLocaleDateString()}</p>
            </div>

            <div class="amount ${type}">
                <span>${formatter.format(amount)}</span>
            </div>
        
            <div class="action">
            <svg xmlns="http://www.w3.org/2000/svg" fill="nome"
            viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9.75"
                9.7514.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            </div>
        `;

        list.appendChild(li);
    });
}

renderList(); 