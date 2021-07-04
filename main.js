const saveInput = document.getElementById('input-btn');
const inputText = document.getElementById('input-el');
let myLead = [];
let myLeadIndex = [];
const ulEl = document.getElementById('ul-el');
const deleteBtn = document.getElementById('delete-btn');
const saveTab = document.getElementById('input-tab-btn');
const singleDeleteBtn = document.getElementsByClassName('fa-trash');

const myLeadFromLocalStorage = JSON.parse(localStorage.getItem('myLead'));


//if local storage has key,values reassign that array in string
if (myLeadFromLocalStorage) {
    myLead = myLeadFromLocalStorage;
    renderList(myLead);
}

//display the unordered list
function renderList(leads) {
    let listItems = ''
    for (let elem = 0; elem < leads.length; elem++) {
        listItems += `
            <li>
               <a href='${leads[elem]}' target='_blank' >
                    ${leads[elem]}
               </a>
               <i class="fa fa-trash fa-lg" onclick='deleteLink(${elem})'></i>
            </li>
        `;
    }
    ulEl.innerHTML = listItems;
}

//save button working
saveInput.addEventListener('click', function() {
    if (inputText.value) {
        myLead.push(inputText.value);
        localStorage.setItem('myLead', JSON.stringify(myLead));

        inputText.value = '';
        renderList(myLead);
    }
});

//delete button working
deleteBtn.addEventListener('click', function() {
    localStorage.clear()
    myLead = []
    renderList(myLead);
});

// save tab button working
saveTab.addEventListener('click', function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        myLead.push(tabs[0].url);
        localStorage.setItem("myLead", JSON.stringify(myLead));
        renderList(myLead);
    })
});

//delete icon working
function deleteLink(leadIndex) {
    myLead.splice(leadIndex, 1);
    localStorage.setItem('myLead', JSON.stringify(myLead));
    renderList(myLead);
}