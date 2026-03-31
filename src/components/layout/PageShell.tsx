import Footer from './Footer'
import styles from './PageShell.module.css'

interface Props {
  title: string
  right?: React.ReactNode
  children: React.ReactNode
  noFooter?: boolean
}

export default function PageShell({ title, right, children, noFooter }: Props) {
  return (
    <div className={styles.shell}>
      <div className={`${styles.header} reveal`}>
        <h1 className={styles.title}>{title}</h1>
        {right && <div>{right}</div>}
      </div>
      <div className={styles.body}>{children}</div>
      {!noFooter && <Footer />}
    </div>
  )
}
