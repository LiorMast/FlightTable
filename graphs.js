
// get the unique airline companies and airports for the graphs
function getFieldFromFlights(field){
    let res = new Array();
    for (const flight of jsonFlights) {
        res.push(flight[field])
    }
}
function getDepartures(airports){
    for(const i in airports){
        
    }
}

function searchTermGraph(field, term){
    let results = new Array();
        for (const flight of jsonFlights) {
            if (flight[field] == term) {
                results.push(flight);
            }
        }
        return results;
}

let airports = Array.from(getUnique("airport"));
let D = new Array();
let A = new Array();     

for (const airport of airports) {
    let Dtype=0;
    let Atype=0;
    for (const flight of jsonFlights) {
        if (flight['airport'] == airport) {
            if (flight['type'] == 'D') {
                Dtype++;
            } else{
                Atype++;
            }
        }
    }
    D.push(Dtype);
    A.push(Atype);
    
}

// ploting the graphs
let trace1 = {
    x: airports, //index
    y: D,        //Departures
    name: 'סיטות יוצאות',
    type: 'bar'
};
let trace2 = {
    x: airports, //index
    y: A,        //ingoing flights
    name: 'טיסות נכנסות',
    type: 'bar'
};
let layout = {
    barmode: 'group',
    width:window.innerWidth*0.98,
    title:{ text:' טיסות יוצאות ונכנסות לפי שדה תעופה',
    font: {
        size: 24 
    }
    },
    yaxis: { title: 'מספר טיסות' }
}; 
//plot
let plot = Plotly.newPlot('plot', [trace1,trace2], layout);


let companies = Array.from(getUnique('operatorLong'));
let companyCounts = new Array();

for (const company of companies) {
    let counter = 0;
    for (const flight of jsonFlights) {
        if (flight['operatorLong'] == company) {
            counter++;
        }
    }
    companyCounts.push(counter);
    
}
 let trace3 = {
    labels: companies, //index
    values: companyCounts, //sum of flights by each company
    type: 'pie'
 };
 let layout1 ={
    title: {text:"התפלגות טיסות לפי חברות תעופה",
    font: {
        size: 24    
    }
    },
    width:window.innerWidth*0.98,
    height:600
 };
 //plot pie chart
 let plot2 = Plotly.newPlot('pieplot', [trace3], layout1);
