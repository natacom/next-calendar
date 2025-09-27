import React from 'react';
import styles from './calendar.module.css'

const DoWShortNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const defColours = ['#fde', '#fff', '#fff', '#fff', '#fff', '#fff', '#dff']

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate();
}
function getFirstDayOfWeek(year: number, month: number): number {
  return new Date(year, month - 1, 1).getDay();
}
function toYYYYMMDD(dt: Date) {
  return dt.getFullYear()
    + (dt.getMonth() + 1).toString().padStart(2, '0')
    + dt.getDate().toString().padStart(2, '0')
}

type CalendarType = {
  year: number,
  month: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12,
  startDoWIndex?: 0 | 1 | 2 | 3 | 4 | 5 | 6,
  DoWColors?: [string, string, string, string, string, string, string],
  contents?: { [YYYYMMDD: string]: React.ReactNode },
  tableStyle?: React.CSSProperties,
  cellStyles?: { [YYYYMMDD: string]: React.CSSProperties },
  dateStyles?: { [YYYYMMDD: string]: React.CSSProperties },
}
export default function Calendar(params: CalendarType) {
  const {
    year,
    month,
    startDoWIndex = 0,
    DoWColors = defColours,
    contents = {},
    tableStyle = {},
    cellStyles = {},
    dateStyles = {},
  } = params

  function getDatesArray() {
    // The difference between first DoW and DoW of 1st
    let diffDoW = getFirstDayOfWeek(year, month) - startDoWIndex
    if (diffDoW < 0) {
      diffDoW += 7
    }
    // The first date of the calendar
    const baseDate = 1 - diffDoW
    // Start filling
    const retArray = []
    let index = 0
    while (true) {
      const d = new Date(year, month - 1, baseDate + index++)
      // If Y or M is more than the target YM, finish the loop
      const isOver = d.getFullYear() > year || (d.getFullYear() == year && d.getMonth() + 1 > month)
      if (isOver && d.getDay() == startDoWIndex) {
        break
      }
      // Push date to the week list and push the week list to whole list.
      retArray.push(d)
    }
    return retArray
  }

  function isTargetMonth(d: Date) {
    return d.getFullYear() == year && d.getMonth() + 1 == month
  }

  return (<>
    <div
      className={styles.container}
      style={tableStyle}
    >
      {
        Array.from(
          { length: 7 },
          (_, i) => (i + startDoWIndex) % 7
        ).map(DoWIndex =>
          <div key={DoWIndex} className={styles.header}>
            {DoWShortNames[DoWIndex]}
          </div>
        )
      }
      {
        getDatesArray().map(date =>
          <div
            className={isTargetMonth(date) ? styles.in : styles.out}
            style={{backgroundColor: DoWColors[date.getDay()]}}
          >
            <div
              className={styles.date}
              style={dateStyles[toYYYYMMDD(date)]}
            >
              {date.getDate()}
            </div>
            <div
              className={styles.contents}
              style={cellStyles[toYYYYMMDD(date)]}
            >
              {contents[toYYYYMMDD(date)]}
            </div>
          </div>
        )
      }
    </div>
  </>)
}