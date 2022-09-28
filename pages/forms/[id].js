import Layout from "../../components/layout";
import Head from "next/head";
import { getForm, getFormsIds } from "../../lib/forms";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";


export default function Forms({ content }) {
  const router = useRouter();

  const id = router.query.id;
  const Content = dynamic(() => import(`../forms/content/${id}`));
  
  return (
    <Layout name={content.title}>
      <Head>
        <title>{content.title}</title>
      </Head>
      <section>
        <Content/>
      </section>
      
    </Layout>
  );
}



export async function getStaticPaths() {
  const paths = await getFormsIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const content = await getForm(params.id);
  return {
    props: {
      content,
    },
  };
}
