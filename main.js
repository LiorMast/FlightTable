let fields = ['type','operatorLong', 'number', 'schedueTime', 'actualTime', 'airport', 'terminal', 'status']

function createHeaders(){
    document.querySelector('.container').innerHTML = `
    <table id="maintable">
        <tr>
            <th onclick="sortBy(this)" id="`+fields[0]+`">Type<button></button></th>
            <th onclick="sortBy(this)" id="`+fields[1]+`">Airline<button></button></th>
            <th onclick="sortBy(this)" id="`+fields[2]+`">Flight Number<button></button></th>
            <th onclick="sortBy(this)" id="`+fields[3]+`">Scheduled Time<button></button></th>
            <th onclick="sortBy(this)" id="`+fields[4]+`">Estimated Time<button></button></th>
            <th onclick="sortBy(this)" id="`+fields[5]+`">Destination<button></button></th>
            <th onclick="sortBy(this)" id="`+fields[6]+`">Terminal<button></button></th>
            <th onclick="sortBy(this)" id="`+fields[7]+`">Status<button></button></th>
        </tr>
    </table>
    `
}

function buildTable(json){
    createHeaders();
    for (const flight of json) {
        let row = document.createElement('tr');
        if (flight['schedueTime'] != flight['actualTime']) {
            row.classList.add('timedelay')
        }
        for (const field of fields) {
            addToRow(flight,field, row);
        }
        document.getElementById('maintable').appendChild(row);   
    }
    
}

function addToRow(flight,key, row){
    let cell = document.createElement('td');
    if (key == 'type') {
        let img;
        if (flight[key] === 'A') {
            row.classList.add('A');
            img = addImage('./images/A.svg');
        }
        else{
            row.classList.add('D');
            img = addImage('./images/D.svg');
        }
        cell.appendChild(img);
        row.appendChild(cell);
        return;
    }else if (key == 'schedueTime' || key == 'actualTime') {
        cell.innerHTML = formatTime(flight[key]);
    }else{
        cell.innerHTML = flight[key];   
    }

    row.appendChild(cell);
}

function formatTime(timestring){
 let time = timestring.split(/\D+/);
 let res = time[2]+"/"+time[1]+"/"+time[0]+" "+time[3]+":"+time[4];
 return res;
}

function addImage(source){
    let img = document.createElement('img');
    img.height = 20;
    img.width = 40;
    img.src = source;
    return img;
}

function compareNames(a, b, field) {
    const nameA = a[field].toLowerCase();
    const nameB = b[field].toLowerCase();
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  }
  
  function compareNamesAsc(a, b, field) {
      const nameA = a[field].toLowerCase();
      const nameB = b[field].toLowerCase();
      if (nameA < nameB) return 1;
      if (nameA > nameB) return -1;
      return 0;
    }
function compareNumbers(a, b, field) {return a[field] - b[field];}
function compareNumbersAsc(a, b, field) {return b[field] - a[field];}

function compareType(a,b) {return compareNames(a, b, 'operatorLong')}

function sortBy(column){
    if (column.childNodes[1].innerHTML === "⇓") {
        if (column.id == 'number' || column.id == 'terminal') {
            buildTable([...jsonFlights].sort((a,b) => compareNumbersAsc(a,b,column.id)));
        } else {
            buildTable([...jsonFlights].sort((a,b) => compareNamesAsc(a,b,column.id)));
        }

        document.getElementById(column.id).childNodes[1].innerHTML = "⇑";
    } else {
        document.getElementById('maintable').remove();
        if (column.id == 'number' || column.id == 'terminal') {
            buildTable([...jsonFlights].sort((a,b) => compareNumbers(a,b,column.id)));
        } else {
            buildTable([...jsonFlights].sort((a,b) => compareNames(a,b,column.id)));
        }
    
        document.getElementById(column.id).childNodes[1].innerHTML = "⇓";
    }
}



// buildTable(jsonFlights.sort(compareNames));
buildTable(jsonFlights);
