this.createConditions = (attributes, values) => {
    let conditions = '';
    for (let i = 0; i < attributes.length; i++) {
        if (i < attributes.length - 1) {
            conditions += `u.${attributes[i]} = '${values[i]}' and `;
        } else {
            conditions += `u.${attributes[i]} = '${values[i]}'`;
        }
    }
    return conditions;
}

this.createSignUpColumns = (user) => {
    let columns = '';
    let userKeys = Object.keys(user);
    for (let i = 0; i < userKeys.length; i++) {
        if (i === userKeys.length - 1) {
            columns += `${userKeys[i]}`;
        }
        else {
            columns += `${userKeys[i]}, `;
        }
    }
    return columns;
}

this.createSignUpColumnValues = (user) => {
    let columnValues = '';
    let userValues = Object.values(user);
    for (let i = 0; i < userValues.length; i++) {
        if (i === userValues.length - 1) {
            columnValues += `'${userValues[i]}'`;
        }
        else {
            columnValues += `'${userValues[i]}', `;
        }
    }
    return columnValues;
}

this.createRowsString = (beerIDs, email) => {
    let rowsString = ''
    for (let i = 0; i < beerIDs.length; i++) {
        if (i < beerIDs.length - 1) {
            rowsString += `('${email}', '${beerIDs[i]}'), `
        } else {
            rowsString += `('${email}', '${beerIDs[i]}')`
        }
    }
    return rowsString;
}

this.createIDConditions = (beerIDs) => {
    let IDConditionsString = '';
    for (let i = 0; i < beerIDs.length; i++) {
        if (i < beerIDs.length - 1) {
            IDConditionsString += `f.beerid = '${beerIDs[i]}' or `;
        } else {
            IDConditionsString += `f.beerid = '${beerIDs[i]}'`;
        }
    }
    return IDConditionsString;
}