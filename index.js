let button = document.getElementById('button')
let DATE = document.getElementById('dateInput')
let AMOUNT = document.getElementById('amountInput')
let DESCRIPTION = document.getElementById('descriptionInput')
let TYPE = document.getElementById('type')
let table = document.getElementById('table')
let class_name;
let expense_records = []; // this will be for local storage

// Check to see if there is any date already stored in local storage
if(localStorage.getItem('expense_records')) {
    expense_records = JSON.parse(localStorage.getItem('expense_records'))
    renderTable() //we will initiate this function in a little bit, but rn it doesn't exist yet XD
}
let inputs = [DATE, AMOUNT, DESCRIPTION] // useful to have this inputs in an array if we need to loop over it

function add_expense(date = 'N/A', type = 'N/A', amount = 'N/A', description = 'N/A') {
    //essentially we created default parameters which will take precedence if the user doesn't input anything
    let DATE_OBJECT = new Date(DATE.value) // 'Date' and 'DATE' may be spelled the same but have diff. meanings in JS because it is case sensitive.
    let FORMATTED_DATE = DATE_OBJECT.toLocaleDateString('en-US', {month: '2-digit', day: '2-digit', year: 'numeric'})

    // now we are assigning values to the parameters, otherwise they will store "N/A" since that is defaulted
    date = FORMATTED_DATE
    type = TYPE.value
    amount = AMOUNT.value
    description = DESCRIPTION.value

    //This logic shown below is responsible for color-coding our different types of expenses to help you
    // get a good idea of which category you are spending the most on

    switch(TYPE.value){
        case 'Food':
            class_name = 'food';
        break;
        case 'Clothing':
            class_name ='clothing';
        break;
        case 'Transportation':
            class_name ='transportation';
            break;
        case 'Debt':
            class_name = 'debt';
            break;
        case 'Education':
            class_name = 'education'
            break;
        case 'Miscellaneous':
            class_name ='miscellaneous';
            break;
    }
    // Adds the expense to the expense_records array
    expense_records.push({date,type, amount, description, class_name})
    //Update the local storage with the expense_records array
    updateLocalStorage()  //we also need to init this function as well in a little bit
    //Renders the table  with the  updated expense_records array 
    renderTable();
}
function delete_expense(index) {
    //this function might be useful in case you typed in the wrong expense which will allow you to delete
    //similar to a TO-DO list
    expense_records.splice(index,1)
    updateLocalStorage()
    //render the table with the update expense_records array
    renderTable()
}

function renderTable(){
    //Clear the table before rendering the updated date

    table.innerHTML = `<tr>
                        <th>Date</th>
                        <th>Type</th>
                        <th>Amount</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>`

    //Render each expense record to the table

    expense_records.forEach((expense, index) => {
        let color_code = expense.class_name

        table.innerHTML += `<tr> 
                            <td class = "${color_code}">${expense.date}</td>
                            <td class = "${color_code}">${expense.type}</td>
                            <td class = "${color_code}">${expense.amount}</td>
                            <td class = "${color_code}">${expense.description}</td>
                            <td class = "${color_code}"><button onclick = "delete_expense(${index})" class = "btn btn-primary btn-sm">Delete</button></td>
        
                    </tr>`
    })

}

function updateLocalStorage() {
    localStorage.setItem('expense_records', JSON.stringify(expense_records));
}

button.addEventListener('click', add_expense)