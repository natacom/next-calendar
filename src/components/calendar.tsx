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
  tableClassName?: string,
  tableStyle?: React.CSSProperties,
  cellClassNames?: { [YYYYMMDD: string]: string },
  cellStyles?: { [YYYYMMDD: string]: React.CSSProperties },
}
export default function Calendar(params: CalendarType) {
  const {
    year,
    month,
    startDoWIndex = 0,
    DoWColors = defColours,
    contents = {},
    tableClassName = "",
    tableStyle = {},
    cellClassNames = {},
    cellStyles = {},
  } = params

  function getDates() {
    let diffDoW = getFirstDayOfWeek(year, month) - startDoWIndex
    if (diffDoW < 0) {
      diffDoW += 7
    }
    const baseDate = 1 - diffDoW
    let dateArray = []
    const WeekArray = []
    let index = 0
    while (true) {
      const d = new Date(year, month - 1, baseDate + index)
      const isOver = d.getFullYear() > year || (d.getFullYear() == year && d.getMonth() + 1 > month)
      if (isOver && d.getDay() == startDoWIndex) {
        break
      }
      dateArray.push(d)
      if (++index % 7 == 0) {
        WeekArray.push(dateArray)
        dateArray = []
      }
    }
    return WeekArray
  }

  function isTargetMonth(d: Date) {
    return d.getFullYear() == year && d.getMonth() + 1 == month
  }

  return (
    <table className={`${styles.table} ${tableClassName}`} style={tableStyle}><tbody>
      <tr>
        {
          Array.from(
            { length: 7 },
            (_, i) => (i + startDoWIndex) % 7
          ).map(DoWIndex =>
            <th key={DoWIndex}>
              {DoWShortNames[DoWIndex]}
            </th>
          )
        }
      </tr>
      {
        getDates().map((week) =>
          <tr key={week[0].toISOString()}>
            {
              week.map(date =>
                <td
                  key={date.toISOString()}
                  className={isTargetMonth(date) ? styles.in : styles.out}
                  style={{ backgroundColor: DoWColors[date.getDay()] }}
                >
                  <div
                    className={cellClassNames[toYYYYMMDD(date)]}
                    style={cellStyles[toYYYYMMDD(date)]}
                  >
                    <div className={styles.date}>
                      {date.getDate()}
                    </div>
                    <div className={styles.contents}>
                      {contents[toYYYYMMDD(date)]}
                    </div>
                  </div>
                </td>
              )
            }
          </tr>
        )
      }
    </tbody></table>
  )
}