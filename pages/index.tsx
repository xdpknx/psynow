import Link from 'next/link';
import PrimaryLayout from '../components/layouts/primary/PrimaryLayout';
import { NextPageWithLayout } from './page';

const Home: NextPageWithLayout = () => {
  return (
    <section className="flex flex-col items-center gap-y-5 mt-12 sm:mt-36">
      <h1 className="text-xl font-bold">
        Welcome to the PsyNow personality test
      </h1>

      <p>
        This test works by asking you 3-5 questions . All questions are
        mandatory. Depending on the answers you will be graded as an Introvert
        or an Extrovert.
      </p>
      <Link href="questions/1" passHref>
        <button className="btn-primary">Start Test</button>
      </Link>
    </section>
  );
};

export default Home;

Home.getLayout = (page) => {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};
