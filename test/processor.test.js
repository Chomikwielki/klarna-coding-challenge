const processor = require("../src/processor");
const assert = require("chai").assert;

describe("Process transactions using transaction()", () => {
    it("SATISFIED CASE OF NO TRANSACTIONS - Balance equals zero when there are no transactions", () => {
        const transactions = [];
        let today = new Date();
        let tomorrow = new Date(new Date().setDate(new Date().getDate() + 1));
        assert.equal(
            processor.getBalance(
                transactions,
                "salary",
                today,
                tomorrow
            ),
            0
        );
    });
    it("SATISFIED CASE OF TIME PERIOD AND CATEGORY - Outputs all eating_out expenses from 2020-03-01T08:00:00Z to 2020-03-28T08:00:00Z", () => {
        const transactions = [
            {
                id: 123,
                sourceAccount: 'my_account',
                targetAccount: 'coffee_shop',
                amount: -12,
                category: 'eating_out',
                time: '2020-03-12T12:34:00Z'
            },
            {
                id: 124,
                sourceAccount: 'the_company',
                targetAccount: 'my_account',
                amount: 10000,
                category: 'salary',
                time: '2020-03-01T08:00:00Z'
            },
            {
                id: 125,
                sourceAccount: 'my_account',
                targetAccount: 'chocolate_factory',
                amount: -20,
                category: 'eating_out',
                time: '2020-03-22T08:00:00Z'
            },
            {
                id: 126,
                sourceAccount: 'my_account',
                targetAccount: 'paczki_munchki',
                amount: -2.5,
                category: 'eating_out',
                time: '2020-03-28T08:00:00Z'
            }
        ];
        let startDate = new Date("2020-03-01T08:00:00Z");
        let endDate = new Date("2020-03-28T08:00:00Z"); 
        assert.equal(
            processor.getBalance(
                transactions,
                "eating_out",
                startDate,
                endDate
            ),
            -32
        );
    })
    it("SATISFIED CASE OF CHANGING START DATE - Outputs all eating_out expenses from 2020-03-22T08:00:00Z to 2020-03-28T08:00:00Z", () => {
        const transactions = [
            {
                id: 123,
                sourceAccount: 'my_account',
                targetAccount: 'coffee_shop',
                amount: -12,
                category: 'eating_out',
                time: '2020-03-12T12:34:00Z'
            },
            {
                id: 124,
                sourceAccount: 'the_company',
                targetAccount: 'my_account',
                amount: 10000,
                category: 'salary',
                time: '2020-03-01T08:00:00Z'
            },
            {
                id: 125,
                sourceAccount: 'my_account',
                targetAccount: 'chocolate_factory',
                amount: -20,
                category: 'eating_out',
                time: '2020-03-22T08:00:00Z'
            },
            {
                id: 126,
                sourceAccount: 'my_account',
                targetAccount: 'paczki_munchki',
                amount: -2.5,
                category: 'eating_out',
                time: '2020-03-28T08:00:00Z'
            }
        ];
        let startDate = new Date("2020-03-22T08:00:00Z");
        let endDate = new Date("2020-03-28T08:00:00Z"); 
        assert.equal(
            processor.getBalance(
                transactions,
                "eating_out",
                startDate,
                endDate
            ),
            -20
        );
    })
    it("SATISFIED CASE OF CHANGING END DATE - Outputs all eating_out expenses from 2020-03-22T08:00:00Z to 2020-03-22T08:00:00Z", () => {
        const transactions = [
            {
                id: 123,
                sourceAccount: 'my_account',
                targetAccount: 'coffee_shop',
                amount: -12,
                category: 'eating_out',
                time: '2020-03-12T12:34:00Z'
            },
            {
                id: 124,
                sourceAccount: 'the_company',
                targetAccount: 'my_account',
                amount: 10000,
                category: 'salary',
                time: '2020-03-01T08:00:00Z'
            },
            {
                id: 125,
                sourceAccount: 'my_account',
                targetAccount: 'chocolate_factory',
                amount: -20,
                category: 'eating_out',
                time: '2020-03-22T08:00:00Z'
            },
            {
                id: 126,
                sourceAccount: 'my_account',
                targetAccount: 'paczki_munchki',
                amount: -2.5,
                category: 'eating_out',
                time: '2020-03-28T08:00:00Z'
            }
        ];
        let startDate = new Date("2020-03-22T08:00:00Z");
        let endDate = new Date("2020-03-22T08:00:00Z"); 
        assert.equal(
            processor.getBalance(
                transactions,
                "eating_out",
                startDate,
                endDate
            ),
            0
        );
    })
    it("SATISFIED CASE OF GRABBING TOTAL - Outputs all expenses from 2020-03-01T08:00:00Z to 2020-03-28T08:00:00Z", () => {
        const transactions = [
            {
                id: 123,
                sourceAccount: 'my_account',
                targetAccount: 'coffee_shop',
                amount: -12,
                category: 'eating_out',
                time: '2020-03-12T12:34:00Z'
            },
            {
                id: 124,
                sourceAccount: 'the_company',
                targetAccount: 'my_account',
                amount: 10000,
                category: 'salary',
                time: '2020-03-01T08:00:00Z'
            },
            {
                id: 125,
                sourceAccount: 'my_account',
                targetAccount: 'chocolate_factory',
                amount: -20,
                category: 'eating_out',
                time: '2020-03-22T08:00:00Z'
            },
            {
                id: 126,
                sourceAccount: 'my_account',
                targetAccount: 'paczki_munchki',
                amount: -2.5,
                category: 'eating_out',
                time: '2020-03-28T08:00:00Z'
            }
        ];
        let startDate = new Date("2020-03-01T08:00:00Z");
        let endDate = new Date("2020-03-28T08:00:00Z"); 
        assert.equal(
            processor.getBalance(
                transactions,
                "",
                startDate,
                endDate
            ),
            9965.50
        );
    })
})

describe("Filter out duplicate transactions that are within 1 minute of each other using showAllDuplicates()", () => {
    it("SATISFIED CASE OF REMOVING DUPLICATES AND SORTING TRANSACTIONS IN ASCENDING ORDER - ", () => {
        const transactions = [
            {
                id: 123,
                sourceAccount: 'my_account',
                targetAccount: 'coffee_shop',
                amount: -12,
                category: 'eating_out',
                time: '2020-03-12T12:34:00Z'
            },
            {
                id: 124,
                sourceAccount: 'the_company',
                targetAccount: 'my_account',
                amount: 10000,
                category: 'salary',
                time: '2020-03-01T08:00:00Z'
            },
            {
                id: 125,
                sourceAccount: 'my_account',
                targetAccount: 'chocolate_factory',
                amount: -20,
                category: 'eating_out',
                time: '2020-03-22T08:00:00Z'
            },
            {
                id: 126,
                sourceAccount: 'my_account',
                targetAccount: 'paczki_munchki',
                amount: -2.5,
                category: 'eating_out',
                time: '2020-03-28T08:00:00Z'
            },
            {
                id: 127,
                sourceAccount: 'my_account',
                targetAccount: 'paczki_munchki',
                amount: -2.5,
                category: 'eating_out',
                time: '2020-03-28T08:00:01Z'
            },
            {
                id: 128,
                sourceAccount: 'my_account',
                targetAccount: 'paczki_munchki',
                amount: -2.5,
                category: 'eating_out',
                time: '2020-03-30T08:00:01Z'
            }
        ];
        const result = [
            [
                {
                    id: 126,
                    sourceAccount: 'my_account',
                    targetAccount: 'paczki_munchki',
                    amount: -2.5,
                    category: 'eating_out',
                    time: '2020-03-28T08:00:00Z'
                },
                {
                    id: 127,
                    sourceAccount: 'my_account',
                    targetAccount: 'paczki_munchki',
                    amount: -2.5,
                    category: 'eating_out',
                    time: '2020-03-28T08:00:01Z'
                }
            ]
        ];
        let startDate = new Date("2020-03-01T08:00:00Z");
        let endDate = new Date("2020-03-28T08:00:00Z"); 
        assert.deepEqual(
            processor.findDuplicateTransactions(transactions),
            result
        );
    })
})