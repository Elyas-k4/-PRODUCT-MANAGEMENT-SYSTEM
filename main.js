// getting the data from HTML
let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let btnScroll = document.getElementById('btnScroll')

// creating glubel varble
let mood = 'create';
let tm;

// gettotal function
function getTotal(){
    if(price.value != ''){
        let result = (+price.value + +taxes.value + +ads.value)
         - +discount.value;
         total.innerHTML = result;
         total.style.background = 'green';
    }else{
        total.innerHTML = '';
        total.style.background = '#ff4d4d';
    }
}

// create product 
// creating array
let proArr;

// chaking the localstorage
if(localStorage.product != null){
    proArr = JSON.parse(localStorage.product);
}else{
    proArr = [];
}

// create button
submit.onclick = ()=>{
    // creating the object
    let proObj = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    }
    // count / clean data
    if(title.value != '' 
    && price.value != '' 
    && category.value != '' 
    && total != '' 
    && proObj.count < 100){
        if(mood === 'create'){
            if(proObj.count > 1){
                for(let i = 0; i < proObj.count; i++){
                // adding the count array to the object
                proArr.push(proObj);
            }
            }else{ 
            // adding the array to object
                proArr.push(proObj);     
        }
        }else{
            proArr[tm] = proObj;
            mood = 'create';
            submit.innerHTML = 'Create';
            count.style.display = 'block';
        }
        clearData();
    }
    
    // save loocalstorage and line 30,31,32,33,34
    localStorage.setItem('product', JSON.stringify(proArr)); 
    
    // reading the data
    showData();
}

// clear inputs
function clearData(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}

// reading the data to the brwoser
function showData(){
    getTotal();
    let table = '';
    for(let i = 0; i < proArr.length ; i++){
        table += `
          <tr>
              <td>${i+1}</td>
              <td>${proArr[i].title}</td>
              <td>${proArr[i].price}</td>
              <td>${proArr[i].taxes}</td>
              <td>${proArr[i].ads}</td>
              <td>${proArr[i].discount}</td>
              <td>${proArr[i].total}</td>
              <td>${proArr[i].category}</td>
              <td><button onclick ="updateData(${i})" id="update">UPDATE</button></td>
              <td><button onclick ="deleteData(${i})" id="delete">DELETE</button></td>
          </tr>
        `;
    }
    document.getElementById('tbody').innerHTML = table;

    let deleteAll = document.getElementById('deleteAll');
    if(proArr.length > 0){
        deleteAll.innerHTML = `
        <button onclick = deleteAll()>DELETE ALL (${proArr.length})</button>
        `
    }else{
        deleteAll.innerHTML = '';
    }
}

// delete
function deleteData(i){
    proArr.splice(i,1);
    localStorage.product = JSON.stringify(proArr);
    showData()
}

// delete all
function deleteAll(){
    localStorage.clear();
    proArr.splice(0);
    showData();
}

// update
function updateData(i){
    title.value = proArr[i].title,
    price.value = proArr[i].price,
    taxes.value = proArr[i].taxes,
    ads.value = proArr[i].ads,
    discount.value = proArr[i].discount,
    category.value = proArr[i].category,
    count.style.display = 'none';
    submit.innerHTML = 'Update';
    mood = 'update';
    tm = i;
    scroll({
        top: 0,
        behavior: 'smooth',
    })
    getTotal()
}
showData();

// search by two mood
// creating new varable for two mood (title / category)
let moodSearch = 'title';

function getMood(id)
{
    let search = document.getElementById('search');

    for(let i = 0; i < proArr.length; i++){
        if(id == 'searchTitle'){
            moodSearch = 'title';
            search.placeholder = 'Search By Title';
        }else{
            moodSearch = 'category';
            search.placeholder = 'Search By category';
        }
    }
    search.focus();
    search.value = '';
    showData();
}

//the search function
function searchData(value){
    let table ='';
    for(i = 0; i < proArr.length; i++){
        if(moodSearch == 'title'){
            if(proArr[i].title.includes(value.toLowerCase())){
                table += `
                    <tr>
                        <td>${i}</td>
                        <td>${proArr[i].title}</td>
                        <td>${proArr[i].price}</td>
                        <td>${proArr[i].taxes}</td>
                        <td>${proArr[i].ads}</td>
                        <td>${proArr[i].discount}</td>
                        <td>${proArr[i].total}</td>
                        <td>${proArr[i].category}</td>
                        <td><button onclick ="updateData(${i})" id="update">UPDATE</button></td>
                        <td><button onclick ="deleteData(${i})" id="delete">DELETE</button></td>
                    </tr>
                `;
            }
        }
        else{
            if(proArr[i].category.includes(value.toLowerCase())){
                table += `
                    <tr>
                        <td>${i}</td>
                        <td>${proArr[i].title}</td>
                        <td>${proArr[i].price}</td>
                        <td>${proArr[i].taxes}</td>
                        <td>${proArr[i].ads}</td>
                        <td>${proArr[i].discount}</td>
                        <td>${proArr[i].total}</td>
                        <td>${proArr[i].category}</td>
                        <td><button onclick ="updateData(${i})" id="update">UPDATE</button></td>
                        <td><button onclick ="deleteData(${i})" id="delete">DELETE</button></td>
                    </tr>
                `;
            }
        }
    }
    document.getElementById('tbody').innerHTML = table;
}

// the scroll function
onscroll = function(){
    if(scrollY >= 100){
        btnScroll.style.display = 'block';
    }else{
        btnScroll.style.display = 'none';
    }
}
// onclick scroll btn function
btnScroll.onclick = ()=>{
    scroll({
        top: 0,
        behavior: 'smooth'
    })
}