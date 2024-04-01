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

function getNumbers(){
    let res = new Array();
    for (const i of getUnique('airport')) {
        res.push(searchTermGraph('airport',i).length)
    }
}

let airports = getUnique("airport");
console.log(airports);
let departures= searchTerm("")
let ingoingFlights = 

let A = ['a','b','c'];
let B = [10,15,20];