import QuestionCard from '@components/cards/questioncard/QuestionCard';
import PrimaryLayout from '@components/layouts/primary/PrimaryLayout';
import { Answer, PrismaClient, Question } from '@prisma/client';
import { GetServerSideProps } from 'next';
import { NextPageWithLayout } from '.././page';

type Question_ = Question & {
  answers: Answer[];
};
interface Props {
  question: Question_;
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
