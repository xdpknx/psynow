import { PrismaClient } from '@prisma/client';
import { GetServerSideProps } from 'next';
import QuestionCard from '../../components/cards/questioncard/QuestionCard';
import PrimaryLayout from '../../components/layouts/primary/PrimaryLayout';
import { Question } from '../../types';
import { NextPageWithLayout } from '.././page';

interface Props {
  question: Question;
}
const QuestionPage: NextPageWithLayout<Props> = ({ question }) => {
  return (
    <section className="psybox">
      <QuestionCard
        title={question.title}
        id={question.id}
        answers={question.answers}
      />
    </section>
  );
};

export default QuestionPage;

QuestionPage.getLayout = (page) => {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  const prisma = new PrismaClient();
  const question = await prisma.question.findFirst({
    where: {
      id: Number(id),
    },
    select: {
      id: true,
      title: true,
      answers: true,
    },
  });
  if (!question) {
    context.res.setHeader('location', '/result');
    context.res.statusCode = 302;
    context.res.end();
  }
  return {
    props: {
      question,
    },
  };
};
