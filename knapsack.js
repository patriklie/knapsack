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

/* console.log(sekvensiellKnapsack(weights2, values2, capacity2)); */

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

/* console.log(rekursivLøsning(weights2, values2, capacity2)); */

// Dynamisk knapsack løsning

const dynamiskKnapsack = (weights, values, capacity) => {
    const n = values.length;

    // Lager tabellen vi skal fylle ut
    const dp = Array(n + 1).fill().map(() => Array(capacity + 1).fill(0));

    // Fyller ut tabellen
    // i = element vi sjekker
    // w = vekta til elementet vi sjekker
    for (let i = 1; i <= n; i++) {
        for (let w = 1; w <= capacity; w++) {
            // Hvis vi kan inkludere elementet
            if (weights[i - 1] <= w) {
                // Velg mellom å ekskludere eller inkludere elementet, vi math.maxer verdien som gir høyest value
                dp[i][w] = Math.max(dp[i - 1][w], values[i - 1] + dp[i - 1][w - weights[i - 1]]);
            } else {
                // Hvis vi ikke kan inkludere elementet så bruker vi verdien fra tidligere nivå i tabellen over
                dp[i][w] = dp[i - 1][w];
            }
        }
    }

    // Returner den maksimale verdien som kan oppnås med full kapasitet
    return dp[n][capacity];
}

const weights = [2, 3, 4];
const values = [3, 4, 5];
const capacity = 5;

console.log(dynamiskKnapsack(weights, values, capacity));  // Forventet resultat: 7
