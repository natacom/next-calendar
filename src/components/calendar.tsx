import styles from './calendar.module.css'

type CalendarType = { test: string }
export default function Calendar(params: CalendarType) {
  return <>
    <div className={styles.test}>{params.test}</div>
  </>
}