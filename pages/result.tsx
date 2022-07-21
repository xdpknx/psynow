import PrimaryLayout from '@components/layouts/primary/PrimaryLayout';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { NextPageWithLayout } from './page';

const ResultPage: NextPageWithLayout = () => {
  const [result, setResult] = useState<string | null>(null);
  const getResult = () => {
    const total = localStorage.getItem('total');
    if (!total) {
      return;
    }
    Number(total) > 10 ? setResult('Extrovert') : setResult('Introvert');
    localStorage.removeItem('total');
  };
  useEffect(() => {
    getResult();
  }, []);

  return (
    <section className="psybox">
      <h2 className="font-bold text-lg text-indigo-500">Result</h2>
      <h1>{result}</h1>
      <Link href="/" passHref>
        <button className="btn-primary">Retake Test</button>
      </Link>
    </section>
  );
};

export default ResultPage;

ResultPage.getLayout = (page) => {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};
