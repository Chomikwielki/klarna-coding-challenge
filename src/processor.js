const processor = {
    getBalance: (transactions = [], category, start, end) => {
        return (!Array.isArray(transactions) || !transactions.length) ? 0 : (!category ? transactions : transactions.filter(transaction => { // If a category is undefined, the balance would be the total of all transactions based on natural user expectation, but this would be mentioned and discussed before going to prod.
                return (new Date(transaction.time) >= start) 
                    && (new Date(transaction.time) < end)
                    && transaction.category === category;
        })).reduce((balance, currentAmount) => balance + currentAmount.amount, 0);
    },
    checkForDuplicates: (array, object) => {
            if(array.length){
                return Math.abs(processor.transactionTimeDifference(array[array.length-1]) - processor.transactionTimeDifference(object)) > 60000;
            }
            return false;
    },
    findDuplicateTransactions: (transactions = []) => {
        if(transactions.length == 0){
            return [];
        }
        let result = Object.values(processor.sortTransactionsInAscendingOrder(transactions).reduce((accumulate, current) => {
            let key = [current.sourceAccount, current.targetAccount, current.category, current.amount].join('-')
            accumulate[key] = processor.checkForDuplicates(accumulate[key] || [], current) ? accumulate[key] : [...accumulate[key] || [], current]
                return accumulate;
        }, {}))
        return result.filter(a => a.length > 1);
    },
    sortTransactionsInAscendingOrder: (array) => {
        return array.sort((a,b) =>`${a.time}`.localeCompare(`${b.time}`));
    },
    transactionTimeDifference: (object) => new Date(object.time).getTime()
}

module.exports = processor;