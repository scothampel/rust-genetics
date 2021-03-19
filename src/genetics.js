export const geneticsDirections = (gene, geneList) => {
    const tempDirections = [['Start by inputting your near perfect gene above!', '', -1]];
    let geneString = Object.values(gene).join('');

    let valids = geneticsHelper(geneString, geneList);
    if (valids) {
        if (valids.length > 0) {

            let bestRoute = getBestRoute(valids);
            let current;
            // Format array properly if provided near perfect gene is already perfect
            if(Array.isArray(valids[0])) {
                current = [...valids[bestRoute[0]]];
            }
            else {
                current = valids;
            }
            let letterCount = (current[2].match(/[YG]/g) || []).length;
            // Remove instructions first
            tempDirections.pop();
            // Don't add step 1 if provided near perfect gene is already perfect
            if ((geneString.match(/[YG]/g) || []).length !== 6) {
                tempDirections.push([`Crossbreed your near perfect clone ${geneString} with clones ${current[0]} and ${current[1]}`, current[2], letterCount]);
            }
            // Add each instruction based on best route
            for (let i = 1; i < bestRoute.length; i+=2) { 
                geneString = current[2];
                // If in containing array
                if (i !== bestRoute.length - 1) {
                    current = [...current[3][bestRoute[i+1]]];
                    letterCount = (current[2].match(/[YG]/g) || []).length;
                    
                    tempDirections.push([`Crossbreed your near perfect clone ${geneString} with clones ${current[0]} and ${current[1]}`, current[2], letterCount]);
                }
            }
            // Add success message
            if (letterCount === 6){
                tempDirections.push(['Perfect Gene Achieved!', current[2], -2]);
            }
        }
        else if (geneString.length === 6) {
            tempDirections.push(['Now, input the clones you currently have in the textbox (One at a time).', '', -1]);
        }
    }
    return tempDirections;
}

const geneticsHelper = (geneString, geneList) => {
    const yCount = (geneString.match(/Y/g) || []).length;
    const gCount = (geneString.match(/G/g) || []).length;
    const hCount = (geneString.match(/H/g) || []).length;
    let tempGeneList = [...geneList];
    if (geneString.length === 6) {
        if (!(yCount === 3 && gCount === 3)) {
            let valids = [];
            geneList.forEach((first, index) => {
                if (RegExp('[GY]').test(first)) {
                    // Efficiency, don't reiterate over already used value on next loop
                    tempGeneList.splice(index, 1);
                    tempGeneList.forEach(second => {
                        if (RegExp('[GY]').test(second)) {
                            // Check full strings for basic validity
                            if (first !== second && first !== geneString && second !== geneString) {
                                let valid = true;
                                // Check each letter for basic validity
                                for (let i = 0; i < 6; i++) {
                                    if (valid) {
                                        if (first[i] === second[i]) {
                                            const current = first[i];
                                            switch (current) {
                                                case 'G':
                                                    valid = gCount < 3 || (gCount >= 3 && geneString[i] === 'G');
                                                    break;
                                                case 'Y':
                                                    valid = yCount < 3 || (yCount >= 3 && geneString[i] === 'Y');
                                                    break;
                                                case 'H':
                                                    valid = geneString[i] === 'H'
                                                    break;
                                                case 'W':
                                                case 'X':
                                                    valid = false;
                                                    break;
                                                default:
                                                    valid = false;
                                            }
                                        }
                                    }
                                    else {
                                        break;
                                    }
                                }
                                if (valid) {
                                    // Apend next step
                                    let next = '';
                                    for (let i = 0; i < 6; i++) {
                                        if (first[i] === second[i]) {
                                            next = next + first[i];
                                        }
                                        else {
                                            next = next + geneString[i];
                                        }
                                    }
                                    const nextYCount = (next.match(/Y/g) || []).length;
                                    const nextGCount = (next.match(/G/g) || []).length;
                                    const nextHCount = (next.match(/H/g) || []).length;
                                    // Valid verification
                                    if ((yCount >= gCount && nextYCount < yCount && nextYCount >= 3) || (gCount >= yCount && nextGCount < gCount && nextGCount >= 3) || (nextYCount === 3 && nextGCount === 3) || ((nextGCount > gCount || nextYCount > yCount) && nextHCount < hCount)) {
                                        const newDirection = [first, second, next];
                                        valids = valids.concat([newDirection]);
                                    }
                                }

                            }

                        }

                    });
                }
            });
            valids.forEach(current => {
                if (current[0] !== '') {
                    let next = geneticsHelper(current[2], geneList);
                    if (next.length !== 0) {
                        current.push(next);
                    }
                }
            });
            return [...valids];
        }
        return ['', '', geneString];
    }
    return false;
}

const getBestRoute = (valids) => {
    // Get Y and G counts at each index 2 through all valid paths
    const getCounts = (value, index) => {
        if (!Array.isArray(value)) {
            const yCount = (value.match(/Y/g) || []).length;
            const gCount = (value.match(/G/g) || []).length;
            return index === 2 ? yCount + gCount : 0;
        }
        else {
            let counts = value.map(getCounts);
            // Reduce array to just index 2 (resulting gene)
            if (counts[0] === 0) {
                counts = counts.slice(2, counts.length);
            }
            // Map down through all valid routes, ignore highest level containing array
            else if (Array.isArray(counts[0]) && index !== -1) {
                counts = counts.map(val => val.length === 1 ? val[0] : val)
            }
            return counts;
        }
    }

    // Get max value found in nested array
    const getMax = (value) => {
        return Array.isArray(value) ? Math.max(...value.map(getMax)) : value
    }

    // Get all possible routes to traverse in nested array
    const getRoutes = (value) => {
        const temp = [];
        value.forEach((current, index) => {
            if (Array.isArray(current)) {
                const next = getRoutes(current);
                next.forEach(val => temp.push([index, ...val]));
            }
            else {
                temp.push([index]);
            }
        });
        return temp;
    }

    // Find routes in route array that end with the max value found
    const getRoutesWithMax = (routes, counts) => {
        const temp = [];
        routes.forEach((currentRoute, index) => {
            let tempCount = counts[currentRoute[0]];
            // Use currentRoute array to guide traversal
            for (let i = 1; i < currentRoute.length; i++) {
                tempCount = tempCount[currentRoute[i]];
            }
            if (tempCount === getMax(counts)) {
                temp.push(index);
            }
        });
        return temp;
    }

    const counts = getCounts(valids, -1);
    const routes = getRoutes(counts);
    const routesWithMax = getRoutesWithMax(routes, counts);
    const routeDepths = routesWithMax.map(val => routes[val].length);

    const bestRoute = routes[routesWithMax[routeDepths.indexOf(Math.min(...routeDepths))]]


    return bestRoute;
}