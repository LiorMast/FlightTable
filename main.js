/////////////////globals////////////////////////////////////////////////////////////////////

let fields = ['type','operatorLong', 'number', 'schedueTime', 'actualTime', 'airport', 'terminal', 'status']
let currentView = jsonFlights;
let currentpage = 1;

function createHeaders(){
    document.querySelector('.flighttable').innerHTML = `
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

/////////////////////createtable//////////////////////////////////

function buildTable(json){
    createHeaders();
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
        document.getElementById('maintable').appendChild(row);   
    }
    
}

function addToRow(flight,key, row){
    let cell = document.createElement('td');
    if (key == 'type') {
        let img;
        
            row.classList.add(flight[key]);
            cell.innerHTML = addImage(flight[key]);
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

function compareType(a,b) {return compareNames(a, b, 'operatorLong')}

function sortBy(column){
    if (column.childNodes[1].innerHTML === "⇓") {
        if (column.id == 'number' || column.id == 'terminal') {
            currentView = [...jsonFlights].sort((a,b) => compareNumbersAsc(a,b,column.id));
        } else {
            currentView = [...jsonFlights].sort((a,b) => compareNamesAsc(a,b,column.id));
        }

        refresh();
        document.getElementById(column.id).childNodes[1].innerHTML = "⇑";
    } else {
        document.getElementById('maintable').remove();
        if (column.id == 'number' || column.id == 'terminal') {
            currentView = [...jsonFlights].sort((a,b) => compareNumbers(a,b,column.id));
        } else {
            currentView = [...jsonFlights].sort((a,b) => compareNames(a,b,column.id));
        }
        
        refresh();
        document.getElementById(column.id).childNodes[1].innerHTML = "⇓";
    }
    
}


//////////////page selector///////////////////////////

function switchPage(page){
    currentpage = page;
    refresh();
}

function getEntries(start, end ,json){return [...json].slice(start,end);}

function getPageCount(){
    return Math.ceil(jsonFlights.length/document.getElementById('viewsSelector').value);
}

function getPageInfo(){
    document.querySelector('.pageSelector span').innerText = "Showing Page "+currentpage+" of " + getPageCount() + " Entries " + (document.getElementById('viewsSelector').value*(currentpage-1)+1) + " to " + (currentpage === getPageCount() ? currentView.length:document.getElementById('viewsSelector').value*(currentpage)) + " of " + currentView.length;
}

function getPageLinks(){
    if(document.getElementById('pageList')) document.getElementById('pageList').remove();
    let pageList = document.createElement('ul');
    pageList.id = 'pageList';
    for (let i = 1; i < getPageCount()+1; i++) {
        let pageLink = document.createElement('li');
        let btn = document.createElement('button');
        btn.textContent = i;
        btn.setAttribute('onclick','switchPage('+i+')');
        pageLink.appendChild(btn);
        pageList.appendChild(pageLink);
    }
    document.querySelector('.pageSelector').appendChild(pageList);
}

//////////////////////popup///////////////////////////////

function createPopup(element){
    if(document.getElementById('popup')) document.getElementById('popup').remove();
    let popup = document.createElement('div');
    popup.id = 'popup';
    let details = document.createElement('p');
    let info = currentView[document.getElementById('viewsSelector').value*(currentpage-1)+parseInt(element.id.slice(2))-1];
    for (const key in info) {
        details.innerText += key + ":" + info[key] + "\n";
    }
    popup.appendChild(details);
    element.appendChild(popup);
    

}

//////////////////////refresh/////////////////////////////

function refresh() {
    buildTable(getEntries(document.getElementById('viewsSelector').value*(currentpage-1),document.getElementById('viewsSelector').value*(currentpage)>currentView.length ? currentView.length:document.getElementById('viewsSelector').value*(currentpage), currentView));
    getPageInfo();
    getPageLinks();
}

refresh();

