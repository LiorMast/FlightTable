/////////////////globals////////////////////////////////////////////////////////////////////

const fields = ['type','operatorLong', 'number', 'schedueTime', 'actualTime', 'airport', 'terminal', 'status']
let currentView = jsonFlights;
let currentpage = 1;
let waveActive = false;
let popupActive = false;


const searchBtn = document.getElementById("searchBtn");
const departureBtn = document.getElementById("departures");
const ingoing = document.getElementById("ingoing");

function init(){
    setUniqueLists();
    departureBtn.style.backgroundColor="white";
    ingoing.style.backgroundColor="white";
    switchPage(1);
}
/////////////////////createtable//////////////////////////////////

function buildTable(json){
    let maintable = document.createElement('table');
    maintable.id = 'maintable';
    if (document.getElementById('maintable')) {
        let headers = document.getElementById('tableHeaders');
        document.getElementById('maintable').remove();
        maintable.appendChild(headers);
    }else{
        maintable.innerHTML = `<tr id='tableHeaders'><th onclick="sortBy(this)" id="`+fields[0]+`">סוג<button></button></th><th onclick="sortBy(this)" id="`+fields[1]+`">חברת תעופה<button></button></th><th onclick="sortBy(this)" id="`+fields[2]+`">מספר טיסה<button></button></th><th onclick="sortBy(this)" id="`+fields[3]+`">זמן מתוכנן<button></button></th><th onclick="sortBy(this)" id="`+fields[4]+`">זמן עדכני<button></button></th><th onclick="sortBy(this)" id="`+fields[5]+`">יעד<button></button></th><th onclick="sortBy(this)" id="`+fields[6]+`">טרמינל<button></button></th><th onclick="sortBy(this)" id="`+fields[7]+`">סטטוס<button></button></th></tr>`;
    }
    let i = 1;
    for (const flight of json) {
        let row = document.createElement('tr');
        row.id = "tr" + i;
        i++;
        row.setAttribute('onclick', 'createPopup(this)');
        row.setAttribute('onmouseover', 'setSVGWhite(this)');
        row.setAttribute('onmouseout', 'setSVGBlack(this)');
        if (flight['schedueTime'] != flight['actualTime']) {
            row.classList.add('timedelay')
        }
        for (const field of fields) {
            addToRow(flight,field, row);
        }
        maintable.appendChild(row);
    }
    document.querySelector('.flighttable').appendChild(maintable);
    
}

function addToRow(flight,key, row){
    let cell = document.createElement('td');
    if (key == 'type') {
            row.classList.add(flight[key]);
            cell.innerHTML = addImage(flight[key]);
    }else if (key == 'schedueTime' || key == 'actualTime') {
        cell.innerHTML = formatTime(flight[key]);
    }else if (key == 'number') {
        cell.innerHTML = flight['operatorShort'] + " " + flight[key];
    }else{
        cell.innerHTML = flight[key];   
    }

    row.appendChild(cell);
}

function formatTime(timestring){
 let time = timestring.split(/\D+/);
 let res = time[3]+":"+time[4]+" "+time[2]+"/"+time[1]+"/"+time[0];
 return res;
}

///////////////////////////image///////////////////////////////////

function addImage(source){
    let svgD = `
    <svg fill="#000000" height = 30  version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
	 viewBox="0 0 485.794 485.794" xml:space="preserve">
<g>
	<!-- <rect x="15.794" y="404.368" width="460" height="20"/> -->
	<path d="M468.829,89.302c-33.408-19.471-71.368-9.128-97.325,2.976l-77.378,36.082l-133.08-66.934l-79.253,3.405l109.893,111.408
		l-70.035,33.269l-72.865-27.731L0,204.525l44.089,54.749c-4.658,5.557-8.879,13.381-5.047,21.599
		c5.005,10.732,19.798,16.141,44.063,16.14c4.976,0,10.351-0.227,16.12-0.683c26.636-2.104,55.514-8.903,73.571-17.323
		l276.596-128.979c23.89-11.141,35.79-22.839,36.38-35.765C486.078,107.559,483.387,97.784,468.829,89.302z M440.938,131.901
		L164.343,260.881c-15.384,7.174-40.641,13.185-64.345,15.313c-24.228,2.175-37.182-0.556-41.5-2.875
		c0.889-1.217,2.549-3.129,5.612-5.825l7.184-6.323l-39.708-49.308l17.986-8.388l72.943,27.763l103.169-49.009l-98-99.352
		l29.021-1.247l137.089,68.949l86.16-40.176c31.467-14.673,57.979-15.957,78.803-3.823l0.001,0.001
		c5.247,3.057,7.081,5.724,7.033,6.77C465.789,113.423,465.188,120.595,440.938,131.901z"/>
</g>
</svg>
    `
    let svgA =`
    <svg fill="#000000" height = 30  version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
	 viewBox="0 0 493.378 493.378" xml:space="preserve">
<g>
	<path d="M456.294,308.726L456.294,308.726c-6.49-37.701-38.456-59.887-64.129-71.858l-76.396-35.623L281.919,58.042L228.807,0
		l-14.54,154.024l-69.455-31.787l-25.286-72.758L71.142,26.918L57.696,95.109c-7.177,0.02-15.767,1.824-19.563,9.966
		c-5.981,12.829,2.949,31.502,26.545,55.501c18.517,18.832,42.016,36.38,59.868,44.705l273.273,127.43
		c13.83,6.448,25.197,9.663,34.293,9.663c6.456,0,11.77-1.621,16.002-4.855C453.41,333.472,459.129,325.191,456.294,308.726z
		 M435.972,321.627c-0.056,0.041-5.811,4.097-29.699-7.043l-273.274-127.43c-15.152-7.065-35.693-22.319-52.33-38.861
		c-16.913-16.817-23.135-28.325-24.204-33.127c1.491-0.085,3.95-0.029,7.806,0.557l9.462,1.438l12.094-61.329l17.585,8.2
		l25.313,72.838l102.811,47.051l12.948-137.164l19.169,20.949l34.884,147.569l85.177,39.719
		c31.051,14.479,48.839,33.698,52.871,57.125v0.001C437.593,317.98,436.771,321.017,435.972,321.627z"/>
	<path d="M164.912,297.148c0.854,0.074,1.705,0.111,2.552,0.111c6.733,0,13.191-2.342,18.411-6.722
		c5.876-4.931,9.48-11.854,10.149-19.496c0.668-7.642-1.679-15.086-6.609-20.962c-10.178-12.132-28.328-13.72-40.46-3.541v0.001
		c-5.876,4.931-9.48,11.854-10.149,19.496c-0.668,7.642,1.679,15.087,6.61,20.963C150.347,292.875,157.271,296.479,164.912,297.148z
		 M158.73,267.779c0.203-2.32,1.297-4.422,3.081-5.919c3.683-3.089,9.193-2.608,12.283,1.076c1.497,1.783,2.21,4.043,2.007,6.362
		c-0.203,2.32-1.297,4.422-3.081,5.919c-1.784,1.496-4.043,2.207-6.364,2.007c-2.32-0.203-4.422-1.297-5.919-3.081
		S158.527,270.099,158.73,267.779z"/>
	<path d="M229.683,326.27c6.516,0,13.066-2.2,18.438-6.706c12.13-10.18,13.717-28.33,3.538-40.459
		c-10.177-12.13-28.327-13.72-40.458-3.54c-5.877,4.931-9.481,11.854-10.15,19.496c-0.668,7.643,1.679,15.087,6.61,20.963
		C213.332,322.783,221.48,326.27,229.683,326.27z M220.974,296.805c0.203-2.32,1.298-4.423,3.082-5.92
		c1.783-1.496,4.046-2.206,6.363-2.006c2.32,0.203,4.422,1.297,5.919,3.082c1.497,1.783,2.21,4.043,2.007,6.363
		c-0.203,2.319-1.298,4.422-3.081,5.918c-3.683,3.09-9.194,2.608-12.283-1.075C221.484,301.384,220.772,299.124,220.974,296.805z"/>
	<path d="M371.955,392.612c6.516,0,13.067-2.2,18.438-6.706c5.876-4.931,9.479-11.855,10.148-19.497
		c0.668-7.642-1.68-15.086-6.61-20.962c-10.178-12.131-28.326-13.72-40.458-3.54c-12.131,10.179-13.719,28.328-3.54,40.46
		C355.606,389.127,363.753,392.612,371.955,392.612z M366.328,357.228c1.783-1.497,4.045-2.21,6.363-2.006
		c2.32,0.203,4.422,1.297,5.919,3.082c1.497,1.783,2.21,4.043,2.007,6.363c-0.203,2.319-1.298,4.422-3.081,5.919
		c-3.684,3.087-9.192,2.606-12.283-1.075C362.163,365.828,362.646,360.318,366.328,357.228z"/>
	<!-- <rect x="46.318" y="473.378" width="400.734" height="20"/> -->
</g>
</svg>
    `

    if (source === 'A') {
        return svgA;
    } else {
        return svgD;
    }
}

function setSVGWhite(element){
    return element.querySelector("svg").style.fill = 'white'
}

function setSVGBlack(element){
    return element.querySelector("svg").style.fill = 'black'
}

//////////////////////////sort//////////////////////////////

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

// function compareType(a,b) {return compareNames(a, b, 'operatorLong')}

function sortBy(column){
    if (column.childNodes[1].innerHTML === "🔽") {
        if (column.id == 'number' || column.id == 'terminal') {
            currentView = [...jsonFlights].sort((a,b) => compareNumbersAsc(a,b,column.id));
        } else {
            currentView = [...jsonFlights].sort((a,b) => compareNamesAsc(a,b,column.id));
        }

        refreshHeaders();
        switchPage(currentpage);

        document.getElementById(column.id).childNodes[1].innerHTML = "🔼";
    } else {
        
        if (column.id == 'number' || column.id == 'terminal') {
            currentView = [...jsonFlights].sort((a,b) => compareNumbers(a,b,column.id));
        } else {
            currentView = [...jsonFlights].sort((a,b) => compareNames(a,b,column.id));
        }
        refreshHeaders();
        switchPage(currentpage);
        
        document.getElementById(column.id).childNodes[1].innerHTML = "🔽";
    }

    function refreshHeaders(){
        for (const i of document.getElementById('tableHeaders').childNodes) {
            if ((i.childNodes[1].innerHTML === "🔽" || i.childNodes[1].innerHTML === "🔼") && i.id != column.id) {
                i.childNodes[1].innerHTML = "";
            }
        }
    }
    
}

//////////////page selector///////////////////////////

function switchPage(page){
    currentpage = page;
    document.querySelector('.pageSelector').removeAttribute('style');
    refresh();
    document.getElementById('rdobtn'+page).checked = true;
}

function getEntries(start, end ,json){return [...json].slice(start,end);}

function getPageCount(){
    return Math.ceil(currentView.length/document.getElementById('viewsSelector').value);
}

function getPageInfo(){
    return "מציג עמוד "+currentpage+" מתוך " + getPageCount() + ", שורות " + (document.getElementById('viewsSelector').value*(currentpage-1)+1) + " עד " + (currentpage === getPageCount() ? currentView.length:document.getElementById('viewsSelector').value*(currentpage)) + " מתוך " + currentView.length;
}

function getPageLinks(){
    if(document.getElementById('pageList')) document.getElementById('pageList').remove();
    if(document.getElementById('infotxt')) document.getElementById('infotxt').remove();
    let info = document.createElement('p');
    info.id = 'infotxt';
    info.textContent = getPageInfo();
    let pageList = document.createElement('ul');
    pageList.id = 'pageList';
    for (let i = 1; i < getPageCount()+1; i++) {
        let pageLink = document.createElement('li');
        let rdobtn = document.createElement('input');
        let lbl = document.createElement('label');
        rdobtn.id = 'rdobtn' + i;
        rdobtn.name = 'pageLinks';
        rdobtn.value = i;
        rdobtn.type = 'radio';
        lbl.textContent = i;
        lbl.for = rdobtn.id;
        lbl.setAttribute('onclick','switchPage('+i+')');
        pageLink.appendChild(rdobtn);
        pageLink.appendChild(lbl);
        pageList.appendChild(pageLink);
    }
    
    document.querySelector('.pageSelector').appendChild(info);
    document.querySelector('.pageSelector').appendChild(pageList);
}

//////////////////////popup///////////////////////////////

function createPopup(element){
    if(document.getElementById('popup')) document.getElementById('popup').remove();
    let popup = document.createElement('div');
    let popupDetails = document.createElement('div');
    let title = document.createElement('h3');
    popupDetails.id = 'popupDetails'
    popup.id = 'popup';
    let info = currentView[document.getElementById('viewsSelector').value*(currentpage-1)+parseInt(element.id.slice(2))-1];

    popupDetails.innerHTML += `<h6>קוד חברת התעופה: </h6><h6>מספר הטיסה: </h6><h6>שם מלא של חברת התעופה: </h6><h6>זמן מתוכנן: </h6><h6>זמן בפועל: </h6><h6>סוג הטיסה: </h6><h6>קוד נמל התעופה ביעד / במקור: </h6><h6>שם שדה התעופה ביעד / במקור: </h6><h6>שם העיר ביעד / במקור: </h6><h6>ארץ היעד / המקור: </h6><h6>טרמינל: </h6><h6>דלפק לביצוע צ'ק אין: </h6><h6>איזור הדלפק: </h6><h6>סטטוס: </h6>`;
    let titles = popupDetails.childNodes
    let i = 0;
    for (const key in info) {
        titles[i].innerText += info[key];
        i++;
    }
    popup.appendChild(title);
    popup.appendChild(popupDetails);
    popup.innerHTML += `
    <?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="45px" height="45px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22ZM8.96965 8.96967C9.26254 8.67678 9.73742 8.67678 10.0303 8.96967L12 10.9394L13.9696 8.96969C14.2625 8.6768 14.7374 8.6768 15.0303 8.96969C15.3232 9.26258 15.3232 9.73746 15.0303 10.0303L13.0606 12L15.0303 13.9697C15.3232 14.2625 15.3232 14.7374 15.0303 15.0303C14.7374 15.3232 14.2625 15.3232 13.9696 15.0303L12 13.0607L10.0303 15.0303C9.73744 15.3232 9.26256 15.3232 8.96967 15.0303C8.67678 14.7374 8.67678 14.2626 8.96967 13.9697L10.9393 12L8.96965 10.0303C8.67676 9.73744 8.67676 9.26256 8.96965 8.96967Z" fill="#1C274C"/>
</svg>
    `
    popup.querySelector('svg').setAttribute('onclick', 'closePopup()');
    document.body.appendChild(popup);
    showPopup();
    function showPopup(){
        if (!popupActive) {
            popup.setAttribute('style','animation: rolldown 0.5s ease-in-out forwards');
        }
        else{
            popup.setAttribute('style','transform: translateY(-15px)');

        }
        popupActive = true;
    }
}

function closePopup(){
    popup.setAttribute('style','animation: rollup 0.5s ease-in-out forwards');

    setTimeout(function(){document.getElementById('popup').remove()},1000)
    popupActive = false;
}

//////////////////////refresh/////////////////////////////

function refresh() {
    buildTable(getEntries(document.getElementById('viewsSelector').value*(currentpage-1),document.getElementById('viewsSelector').value*(currentpage)>currentView.length ? currentView.length:document.getElementById('viewsSelector').value*(currentpage), currentView));
    getPageLinks();
    if (waveActive) startWave();    
    
    
}



////////////////////////////search/////////////////////////////



function isValidSearch(){

    var txtBox = document.getElementById("flightNum");

    if(departureBtn.style.backgroundColor ==="white" && txtBox.value.trim()==="" && ingoing.style.backgroundColor ==="white" && document.getElementById("airline_company").value.trim()==="בחר מהרשימה..."&& document.getElementById("airport_search").value.trim()==="בחר מהרשימה..."&& document.getElementById("terminal_search").value.trim()==="בחר מהרשימה..."){
        searchBtn.disabled=true;
    }
    else{
        searchBtn.disabled=false;
    }
}

function clicked_btn(inp) {
    if(inp.style.backgroundColor == "white")
    {
        inp.style.backgroundColor = "yellow";
    }
    
    else{
        inp.style.backgroundColor = "white";
    }
}

function getUnique(type){
    let unique = new Set();
    for (const flight of jsonFlights) {
        unique.add(flight[type])
    }
    return unique;   
}

function setUniqueList(type, listid){
     let unique = getUnique(type);
     let lst = document.getElementById(listid);
     lst.classList.add('dir-right')
     let optn = document.createElement('option');
     optn.value = ""
     optn.innerText = "בחר מהרשימה...";
     lst.appendChild(optn);
     for (const i of unique) {
        optn = document.createElement('option');
        optn.value = i;
        optn.innerText = i;
        lst.appendChild(optn);
     }
}

function setUniqueLists(){
    setUniqueList('operatorLong', "airline_company");
    setUniqueList('airport', "airport_search");
    setUniqueList('terminal', "terminal_search");
}

function getSearchResults(field, term){
let results = new Array();
    for (const flight of jsonFlights) {
        if (flight[field] == term) {
            results.push(flight);
        }
    }

    return results;
}

function showSearchResults(){
    currentView = search(field, term);
    switchPage(1);
}

/////////////////////wave animation//////////////////////////////////

function startWave(){
    let rows = Array.from(document.querySelectorAll('#maintable tr'))
    rows.push(document.querySelector('.pageSelector'))
    let delay = 0;
    for (const row of rows) {
        row.setAttribute('style','animation: side2side 1.3s infinite '+delay+'s ease-in-out;');
        delay+=0.05;    
    }
}

function stopWave(){
    let rows = Array.from(document.querySelectorAll('#maintable tr'))
    rows.push(document.querySelector('.pageSelector'))
    for (const row of rows) {
        row.removeAttribute('style');
    }
}

function toggleWave(){
    if (waveActive) {
        stopWave();
    } else {
        startWave();
    }
    waveActive = !waveActive;    
}

/////////////////////init function call//////////////////////////////
init();

/////////////////////////////////////////////////////////////////////
function isValidSearch(){

    var txtBox = document.getElementById("flightNum");

    if(departureBtn.style.backgroundColor ==="white" && txtBox.value.trim()==="" && 
    ingoing.style.backgroundColor ==="white" && document.getElementById("airline_company").selectedOptions[0].textContent==="בחר מהרשימה..."&& 
    document.getElementById("airport_search").selectedOptions[0].textContent==="בחר מהרשימה..."&& 
    document.getElementById("terminal_search").selectedOptions[0].textContent==="בחר מהרשימה..." &&
    document.getElementById("from_date").value===""&&
    document.getElementById("to_date").value===""){
        searchBtn.disabled=true;
    }
    else{
        searchBtn.disabled=false;
    }
}

function search(){
    var flightNum = document.getElementById("flightNum").value.trim();
    console.log(flightNum);

    var terminal = document.getElementById("terminal_search");
    var terminalIndex = terminal.selectedIndex;
    var terminalVal = terminal[terminalIndex].value; 
    console.log(terminalVal);

    var airport = document.getElementById("airport_search");
    var airportIndex = airport.selectedIndex;
    var airportlVal = airport[airportIndex].value; 
    console.log(airportlVal);

    var airlineCompany = document.getElementById("airline_company");
    var airlineCompanyIndex = airlineCompany.selectedIndex;
    var airlineCompanylVal = airlineCompany[airlineCompanyIndex].value; 
    console.log(airlineCompanylVal);

    var leavingDate = document.getElementById("from_date").value;
    console.log(leavingDate)

    var returnDate = document.getElementById("to_date").value;
    console.log(returnDate)
    
    var departing;
    if(document.getElementById("departures").style.backgroundColor==="yellow"){
        departing=true;
    }
    else{departing=false;}
    var ingoing;
    if(document.getElementById("ingoing").style.backgroundColor==="yellow"){
        ingoing=true;
    }
    else{ingoing=false;}
    console.log(departing);
    console.log(ingoing);
}