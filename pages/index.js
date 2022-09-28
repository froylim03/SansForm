import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Layout from '../components/layout'
import Link from 'next/link'
import { getFormsList } from '../lib/forms'


export default function Home({allForms}) {
  return (
    <Layout home>
      <Head>
        <title>Sans</title>
      </Head>

      <section className={`${styles.headingMd} ${styles.padding1px}`}>
        <ul className={styles.list}>
          {allForms.map(({ id, title }) => (
            <li className={styles.listItem} key={id}>
              <Link href={`/forms/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}

export async function getStaticProps() {
  const allForms = getFormsList() 
  
  return {
    props: {
      allForms
    }
  }
}
