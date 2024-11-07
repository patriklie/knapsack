const weights1 = [20, 30 , 50];
const values1 = [50, 60, 100];
const capacity1 = 50;

const values2 = [10, 20, 30];
const weights2 = [5, 10, 15];
const capacity2 = 20;


// Enkel sekvensiell "løsning"
const sekvensiellKnapsack = (weights, values, capacity) => {
    let totalValue = 0;
    let currentWeight = 0;
    
    for (let i = 0; i < values.length; i++) {
        // if condition under sjekker om det er plass i baggen til itemet
        if (currentWeight + weights[i] < capacity) {
            totalValue += values[i]; // legger til verdien
            currentWeight += weights[i]; // legger til vekten
        }
    }

    return totalValue;
}

console.log(sekvensiellKnapsack(weights2, values2, capacity2));

// rekursiv løsning

const rekursivLøsning = (weights, values, capacity, index = 0) => {
    if (capacity === 0 || index === values.length) {
        return 0;
    }

    if (weights[index] > capacity) {
        return rekursivLøsning(values, weights, capacity, index + 1);
    } else {
        // Alternativ 1 er å ekskludere objektet
        const excludeItem = rekursivLøsning(values, weights, capacity, index + 1);

        // Alternativ 2 er å inkludere objektet
        const includeItem = values[index] + rekursivLøsning(values, weights, capacity - weights[index], index + 1);

        return Math.max(excludeItem, includeItem);
    }
}

console.log(rekursivLøsning(weights2, values2, capacity2));