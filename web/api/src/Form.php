<?php

namespace App;

class Form {
    use IntegerNormalizerTrait;

    /** @var int $howManyChildrenUnder18 */
    public $howManyChildrenUnder18;

    /** @var int $howManyAdults */
    public $howManyAdults;

    /** @var int $howManyAdultsOver60 */
    public $howManyAdultsOver60;

    /** @var Income $income */
    public $income;

    /** @var Address $address */
    public $address;

    /** @var Contact $contact */
    public $contact;

    /** @var string $childAttendsSchool */
    public $childAttendsSchool;

    public function setHowManyChildrenUnder18($count) {
        $this->howManyChildrenUnder18 = $this->integerNormalizer($count);
    }

    public function setHowManyAdults($count) {
        $this->howManyAdults = $this->integerNormalizer($count);
    }

    public function setHowManyAdultsOver60($count) {
        $this->howManyAdultsOver60 = $this->integerNormalizer($count);
    }

    public function setIncome(Income $income) {
        $this->income = $income;
    }

    public function setAddress(Address $address) {
        $this->address = $address;
    }

    public function setContact(Contact $contact) {
        $this->contact = $contact;
    }

    /**
     * Evaluate eligibility
     *
     * @return bool
     */
    public function eligible() {
        $monthly_income = $this->income->monthly();

        $persons = $this->howManyChildrenUnder18
                 + $this->howManyAdults
                 + $this->howManyAdultsOver60;

        $formula = ($adultsOver60 > 0) ? $this->table_3() : $this->table_1();

        $limit = $formula->calculate_limit($persons);

        return $limit >= $monthly_income;
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
    private function table_1() {
        $add = 479;
        $table = [
            0 => 0,
            1 => 1354,
            2 => 1832,
            3 => 2311,
            4 => 2790,
            5 => 3269,
            6 => 3748,
            7 => 4227,
            8 => 4705,
        ];

        return new Formula($add, $table);
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
    private function table_3() {
        $add = 608;
        $table = [
            0 => 0,
            1 => 1718,
            2 => 2326,
            3 => 2933,
            4 => 3541,
            5 => 4149,
            6 => 4757,
            7 => 5364,
            8 => 5972,
        ];

        return new Formula($add, $table);
    }
}
