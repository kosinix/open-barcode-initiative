const lodash = _

/**
 * Generate an array containing numbers 1 to count
 * 
 * @param {number} count
 * @return {Array} 
 */
const generateArray = (count) => {
    return Array.from(Array(count).keys()).map((e, i) => i + 1); // 1-count
}

/**
 * Returns the timezone of the server.
 * 
 * @return {number}  Eg. for UTC+8:00, returns 8. for UTC-3:00 returns -3.
 */
const getTimeZone = () => {
    // Returns timezone in minutes relative to local time. Which means UTC+8:00 is -480. Yup.
    var offset = new Date().getTimezoneOffset();
    // Note: The 0 is to negate the offset because JS returns a negative number instead of a sane positive one.
    return 0 - (offset / 60);
}

/**
 * Get weekdays in an array
 * 
 * @param {number} weekStart The start of the week. Range from 0 to 6. Eg. 0-Sun, 1-Mon, ... 6-Sat
 * @return {Array} Array containing string names
 */
const getWeekDays = (weekStart = 0) => {
    var weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return lodash.concat(lodash.slice(weekDays, weekStart), lodash.slice(weekDays, 0, weekStart));
}

const getPrefix = (momentDate, weekStart = 0) => {

    if (weekStart < 0 || weekStart > 6) {
        throw new Error('Invalid param. Weekstart must be 0-6.')
    }

    let weekDayFirst = parseInt(momentDate.clone().startOf('month').format('d')); // First day of week. Zero-based. 0-6

    // Prefix length formula
    var prefixLength = weekDayFirst - weekStart;
    if (prefixLength < 0) {
        prefixLength += 7;
    }

    var prefix = generateArray(momentDate.clone().subtract(1, 'month').daysInMonth()); // Get previous month's total number of days and place it in an array
    prefix = lodash.takeRight(prefix, prefixLength); // Cut the parts we need
    prefix = lodash.map(prefix, (day) => {
        return momentDate.clone().subtract(1, 'month').date(day).format('YYYY-MM-DD')
    })
    return prefix
}

const getSuffix = (momentDate, weekStart = 0) => {

    if (weekStart < 0 || weekStart > 6) {
        throw new Error('Invalid param. Weekstart must be 0-6.')
    }

    let weekDayLast = parseInt(momentDate.clone().endOf('month').format('d')); // This months last day of week. Zero-based. 0-6

    // Suffix length formula
    const weekDays = 6; // 0-6 (7) days in a week
    var suffixLength = weekDays - (weekDayLast - weekStart);
    if (suffixLength > 6) {
        suffixLength = suffixLength - weekDays - 1;
    }

    var suffix = generateArray(suffixLength); // Get previous month's total number of days and place it in an array
    suffix = lodash.map(suffix, (day) => {
        return momentDate.clone().add(1, 'month').date(day).format('YYYY-MM-DD')
    })
    return suffix
}

const getDays = (momentDate, weekStart = 0) => {

    let totalDays = momentDate.daysInMonth()
    let daysArray = generateArray(totalDays)

    daysArray = lodash.map(daysArray, (day) => {
        return momentDate.clone().date(day).format('YYYY-MM-DD')
    })

    daysArray = lodash.concat(getPrefix(momentDate, weekStart), daysArray, getSuffix(momentDate, weekStart))


    return daysArray
}

const getMatrix = (momentDate, weekStart = 0) => {
    let weekDays = getWeekDays(weekStart)
    let daysArray = getDays(momentDate, weekStart)

    daysArray = lodash.concat(weekDays, daysArray)

    let matrix = lodash.chunk(daysArray, 7);
    return matrix
}

