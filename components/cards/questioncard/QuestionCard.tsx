import { yupResolver } from '@hookform/resolvers/yup';
import { Answer, Question } from '@prisma/client';
import router from 'next/router';
import { useForm } from 'react-hook-form';
import { Optional } from 'utility-types';
import { number, object } from 'yup';
import styles from './QuestionCard.module.css';

type QuestionCardAnswer = Optional<Answer, 'questionId'>;
export interface IQuestionCard extends Question {
  answers: QuestionCardAnswer[];
}
interface IFormData {
  score: number;
}

const schema = object({
  score: number().typeError('Please select an option').required(),
});

const QuestionCard: React.FC<IQuestionCard> = ({ title, id, answers }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: IFormData) => {
    const { score } = data;
    if (score) {
      const currentScore = localStorage.getItem('total');
      if (!currentScore) {
        localStorage.setItem('total', score.toString());
      } else {
        const newScore = Number(currentScore) + score;
        localStorage.setItem('total', newScore.toString());
      }
      reset();
      router.push(`/questions/${id + 1}`);
    }
  };

  return (
    <form className={styles.box} onSubmit={handleSubmit(onSubmit)}>
      <h1 className="font-bold">Question {id}</h1>
      <h2 className="font-bold text-lg ">{title}</h2>
      {answers.map((answer: QuestionCardAnswer) => {
        return (
          <div key={answer.id} className="flex flex-row">
            <input
              type="radio"
              id={answer.text}
              value={answer.score}
              {...register('score')}
            ></input>
            <label className="px-4">{answer.text}</label>
          </div>
        );
      })}
      {errors.score?.message && (
        <span className="font-bold text-red-500">{errors.score.message} </span>
      )}
      <button className="btn-primary">Submit</button>
    </form>
  );
};

export default QuestionCard;
