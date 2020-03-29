export const Eligibility = (data) => {
  const monthlyIncome = makeMonthly(data.income.amount, data.income.period);
  const persons = Number(data.howManyChildrenUnder18) 
                + Number(data.howManyAdults) 
                + Number(data.howManyAdultsOver60);

  const tableData = (data.howManyadultsOver60 > 0) ? table_3() : table_1();

  const maxIncome = findMaxIncome(tableData, persons)

  return (maxIncome >= monthlyIncome) ? "eligible" : "ineligible"
}

export default Eligibility

function makeMonthly(amount, period) {
  switch (period) {
      case 'monthly':
        return amount;
      case 'yearly':
        return Math.round(amount / 12);
      case 'weekly':
        return Math.round((amount * 52) / 12);
      case '2-weeks':
        return Math.round((amount * (52 / 2)) / 12);
      default:
        throw new Error(`Invalid period: ${period}`)
  }
}

/**
 * Table I. Maximum Gross Monthly Income Standards - Without Elderly/Disabled Members
 *
 * Gross monthly income is set at 130 percent of the federal poverty level (FPL). For each
 * person over eight, add $479 to the maximum gross income ($4,705) for eight persons. Refer
 * to SNAP policy located at OAC 340:50-9-1 (b)(1).
 *
 * @return Formula
 */
function table_1() {
    const adder = 479;
    const table = [
        0,
        1354,
        1832,
        2311,
        2790,
        3269,
        3748,
        4227,
        4705,
    ];

    return {adder, table};
}

/**
 * Table III. Maximum Gross Monthly Income Standards
 *
 * Use this table for entire household when a person 60 years of age or
 * older lives with others and is unable to purchase and prepare meals
 * separately because of a permanent disability.
 *
 * Gross monthly income is set at 165 percent of FPL. The 165 percent FPL
 * by household size refers to everyone who lives in the home and only if
 * everyone’s total gross income is less than or equal to 165 percent FPL,
 * can the elderly and disabled person (and his/her spouse if appropriate)
 * be determined eligible as a separate household. For each person over
 * eight, add $608 to the maximum gross income ($5,972) for eight persons.
 *
 * When eligible as a separate householde, the total net monthly income of
 * the person and his or her spouse, if appropriate, must be at or below
 * Table II’s maximum net income for a 1 or 2 person household. Refer to
 * SNAP policy located at OAC 340:50-5-1(5).
 *
 * @return Formula
 */
function table_3() {
    const adder = 608;
    const table = [
        0,
        1718,
        2326,
        2933,
        3541,
        4149,
        4757,
        5364,
        5972,
    ];

    return {adder, table};
}

function findMaxIncome(tableData, persons) {
  const max = tableData.table[tableData.table.length-1]
  if (tableData.table[persons]) {
    return tableData.table[persons];
  } else {
    return max + ((persons - 8) * tableData.adder)
  }
}

