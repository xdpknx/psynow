import Link from 'next/link';
import { useEffect, useState } from 'react';
import PrimaryLayout from '../components/layouts/primary/PrimaryLayout';
import { NextPageWithLayout } from './page';

const ResultPage: NextPageWithLayout = () => {
  const [result, setResult] = useState<string | null>(null);
  const getResult = () => {
    const result = localStorage.getItem('total');

    if (!result) {
      return;
    }

    Number(result) > 10 ? setResult('Extrovert') : setResult('Introvert');

    localStorage.removeItem('total');
  };
  useEffect(() => {
    getResult();
  }, []);

  return (
    <section className="flex flex-col items-center gap-y-5 mt-12 sm:mt-36">
      <h2 className="font-bold text-lg text-indigo-500">Result</h2>
      {result}
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
