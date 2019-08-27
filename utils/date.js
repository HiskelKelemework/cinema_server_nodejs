function isLeap(year) {
    return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
}

// converts Gregorian Date to Ethiopian
// returns [dd, mm, yyyy]
function toETDate(gDate) {
    // jan, feb, mar, ...
    const days_in_months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var sep_10 = 253;
    var till_jan = 111;

    const y = gDate.getFullYear();
    const m = gDate.getMonth(); // starts off at 0--january
    const d = gDate.getDate();

    const leapYear = isLeap(y);
    if (leapYear) {
        days_in_months[1] = 29; // feb is 29 days
        sep_10 = 254;
    } else if (isLeap(y + 1)) {
        sep_10 = 254;
        till_jan = 112;
    }

    var total_days = 0;
    for (let i=0; i < m; i++) {
        total_days += days_in_months[i];
    }
    total_days += d;

    const past_sep_10 = total_days > sep_10;
    const temp_et_d = past_sep_10 ? (total_days - sep_10) : (total_days + till_jan); // all the days that passed since sep 1st E.C

    const et_y = past_sep_10 ? (y - 7) : (y - 8);
    var et_m = Math.floor(temp_et_d / 30) + 1;
    var et_d = temp_et_d % 30

    if (et_d == 0) {
        et_m -= 1; // previous month
        et_d = 30; // last day
    }

    return [et_d, et_m, et_y];
}

console.log(toETDate(new Date(2020, 1, 8)));