# KLARNA ASSESSMENT
Please complete the following challenges to the best of your ability.

# Transaction Processing
You will be provided with a list of transactions from a consumer bank account and you need to process them.

Take your time and make sure that you consider your solutions production-ready. Although a timer is shown, there is no limit and we do not take time into consideration when reviewing your solution. The editor supports most modern language constructs, so feel free to use whatever you think makes your solution easier to read.

Some information to help you:
Each transaction has the following information:

# Transaction ID
Source account number
Target account number
Amount (expenses are negative values, income transactions are positive values)
Transaction time (date and time to seconds precision)
Category (one of the following values: 'groceries', 'eating_out', 'other', 'salary')
The transactions are not sorted in any particular order.

# Example transaction objects
Expense:

{
  id: 123,
  sourceAccount: 'my_account',
  targetAccount: 'coffee_shop',
  amount: -30,
  category: 'eating_out',
  time: '2018-03-12T12:34:00Z'
}
Income:

{
  id: 123,
  sourceAccount: 'the_company',
  targetAccount: 'my_account',
  amount: 10000,
  category: 'salary',
  time: '2018-03-01T08:00:00Z'
}

# Questions
1. Calculate the balance in a specific category within the specified time period
2. Find all transactions that have the same source, target, category, amount, and with a time difference of less than 1 minute.