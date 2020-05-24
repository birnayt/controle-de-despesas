const transactionsUl = document.querySelector('#transactions');
const form = document.querySelector('#form');
const inputTransactionName = document.querySelector('#text');
const inputTransactionAmount = document.querySelector('#amount');
const balance = document.querySelector('#balance');
const income = document.querySelector('#money-plus');
const expansive = document.querySelector('#money-minus');
const localStorageTransactions = JSON.parse(localStorage
    .getItem('transactions'));
let transactions = localStorage
    .getItem('transactions') !== null ? localStorageTransactions : [];

const updateLocalStorage = () => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
};

form.addEventListener('submit', event => {
    event.preventDefault();

    const transactionName = inputTransactionName.value;
    const transactionAmount = Number(inputTransactionAmount.value);
    
    transactions.push({
        id: Math.round(Math.random() * 1000),
        name: transactionName,
        amount: transactionAmount
    }); 
    init();
    updateLocalStorage();

    inputTransactionName.value = '';
    inputTransactionAmount.value = '';
})

const removeTransaction = ID => {
    transactions = transactions.filter((transaction) => transaction.id != ID);
    updateLocalStorage();
    init();
};

const addTransactionsToDOM = () => {
    transactions.forEach(transaction => {
        const operator = transaction.amount < 0 ? '-': '';
        const li = document.createElement('li');
        const amount = Math.abs(transaction.amount).toFixed(2);

        li.classList.add(operator === '-' ? 'minus' : 'plus');
        li.innerHTML = 
        `
        ${transaction.name}
        <span>${operator} R$ ${amount}</span>
        <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
        `;
        transactionsUl.append(li);
    });
};

const updateBalance = () => {
    const balanceValue = transactions
        .reduce((accumulator, transaction) => accumulator + transaction.amount, 0)
        .toFixed(2);
    const incomeValue = transactions
        .filter(transactions => transactions.amount > 0)
        .reduce((accumulator, transaction) => accumulator + transaction.amount, 0)
        .toFixed(2);
    const expansiveValue = transactions
        .filter(transactions => transactions.amount < 0)
        .reduce((accumulator, transaction) => accumulator + transaction.amount, 0)
        .toFixed(2);

    balance.innerHTML = `R$ ${balanceValue}`;
    income.innerHTML = `R$ ${incomeValue}`;
    expansive.innerHTML = `R$ ${expansiveValue}`;

};

const init = () => {
    transactionsUl.innerHTML = '';
    addTransactionsToDOM(transactions);
    updateBalance();
};

init();



