import Link from "next/link";
import styles from './layout.module.css'
import utilStyles from '../styles/home.module.css'

export default function Layout({ children, home, name }) {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        {home ? (
          <>
            <h1 className={utilStyles.heading2Xl}>Forms</h1>
          </>
        ) : (
          <>
            <div>
              <Link href="/">
                <a className={utilStyles.colorInherit}>← {name}</a>
              </Link>
            </div>
          </>
        )}
      </header>
      <main>{children}</main>
    </div>
  );
}
