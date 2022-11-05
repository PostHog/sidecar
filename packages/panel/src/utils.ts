import dayjs, { Dayjs as DayjsOriginal } from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import duration from "dayjs/plugin/duration";
import quarterOfYear from "dayjs/plugin/quarterOfYear";

// necessary for any localized date formatting to work
dayjs.extend(LocalizedFormat);
dayjs.extend(relativeTime);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(duration);
dayjs.extend(quarterOfYear);

const now = (): Dayjs => dayjs();

export { dayjs, now };

/** Parse UTC datetime string using Day.js, taking into account time zone conversion edge cases. */
export function dayjsUtcToTimezone(
  isoString: string,
  timezone: string,
  explicitOffset = true,
  format?: dayjs.OptionType,
  strict?: boolean
): Dayjs {
  // Strings from the API have the timezone offset set to UTC ("Z" suffix), so they are explicitly non-local.
  // When there's no timezone offset in the string though, Day.js assumes it's a local datetime,
  // which we need to correct - in that case the `explicitOffset` arg should be `false`.
  let datetime = dayjs(isoString, format, strict).utc(!explicitOffset);
  if (!["GMT", "UTC"].includes(timezone)) {
    datetime = datetime.tz(timezone); // If the target is non-UTC, perform conversion
  }
  return datetime;
}

/** Parse local datetime string using Day.js, taking into account time zone conversion edge cases. */
export function dayjsLocalToTimezone(
  isoString: string,
  timezone: string,
  format?: dayjs.OptionType,
  strict?: boolean
): Dayjs {
  let datetime = dayjs(isoString, format, strict);
  if (["GMT", "UTC"].includes(timezone)) {
    datetime = datetime.utc(true);
  } else {
    datetime = datetime.tz(timezone, true);
  }
  return datetime;
}

// The lines below are copied from "node_modules/dayjs/index.ts" to help typescript and typegen.
// We could only use types like "dayjs.OpUnitType", causing errors such as:
// error TS2312: An interface can only extend an object type or intersection of object types with statically known members.

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Dayjs extends DayjsOriginal {}

export type UnitTypeShort = "d" | "M" | "y" | "h" | "m" | "s" | "ms";

export type UnitTypeLong =
  | "millisecond"
  | "second"
  | "minute"
  | "hour"
  | "day"
  | "month"
  | "year"
  | "date";

export type UnitTypeLongPlural =
  | "milliseconds"
  | "seconds"
  | "minutes"
  | "hours"
  | "days"
  | "months"
  | "years"
  | "dates";

export type UnitType = UnitTypeLong | UnitTypeLongPlural | UnitTypeShort;

export type OpUnitType = UnitType | "week" | "weeks" | "w";
export type QUnitType = UnitType | "quarter" | "quarters" | "Q";
export type ManipulateType = Omit<OpUnitType, "date" | "dates">;

export function humanFriendlyDetailedTime(
  date: dayjs.Dayjs | string | null,
  formatDate = "MMMM DD, YYYY",
  formatTime = "h:mm:ss A"
): string {
  if (!date) {
    return "Never";
  }
  const parsedDate = dayjs(date);
  const today = dayjs().startOf("day");
  const yesterday = today.clone().subtract(1, "days").startOf("day");
  if (parsedDate.isSame(dayjs(), "m")) {
    return "Just now";
  }
  let formatString: string;
  if (parsedDate.isSame(today, "d")) {
    formatString = `[Today] ${formatTime}`;
  } else if (parsedDate.isSame(yesterday, "d")) {
    formatString = `[Yesterday] ${formatTime}`;
  } else {
    formatString = `${formatDate} ${formatTime}`;
  }
  return parsedDate.format(formatString);
}

export const zeroPad = (num: number, places: number): string => String(num).padStart(places, '0')

export function colonDelimitedDuration(d: string | number | null | undefined, numUnits: number = 3): string {
    // Convert `d` (seconds) to a colon delimited duration. includes `numUnits` no. of units starting from right
    // Example: `01:10:09:08 = 1d 10hrs 9mins 8s`
    if (d === '' || d === null || d === undefined) {
        return ''
    }
    d = Number(d)

    let s = d
    let weeks = 0,
        days = 0,
        h = 0,
        m = 0

    if (numUnits >= 5) {
        weeks = Math.floor(s / 604800)
        s -= weeks * 604800
    }
    if (numUnits >= 4) {
        days = Math.floor(s / 86400)
        s -= days * 86400
    }
    if (numUnits >= 3) {
        h = Math.floor(s / 3600)
        s -= h * 3600
    }
    if (numUnits >= 2) {
        m = Math.floor(s / 60)
        s -= m * 60
    }
    s = Math.floor(s)

    const units = [zeroPad(weeks, 2), zeroPad(days, 2), zeroPad(h, 2), zeroPad(m, 2), zeroPad(s, 2)]

    // get the last `numUnits` elements
    return units.slice(0).slice(-Math.min(numUnits, 5)).join(':')
}
