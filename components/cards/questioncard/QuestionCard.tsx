import { yupResolver } from '@hookform/resolvers/yup';
import { Answer } from '@types';
import router from 'next/router';
import { useForm } from 'react-hook-form';
import { number, object } from 'yup';
import styles from './QuestionCard.module.css';

export interface IQuestionCard {
  title: string;
  id: number;
  answers: Answer[];
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
      {answers.map((answer: Answer) => {
        return (
          <div key={answer.id} className="flex flex-row">
            <input
              type="radio"
              id={answer.text}
              value={answer.score}
              {...register('score')}
            ></input>
            <label>{answer.text}</label>
          </div>
        );
      })}
      {errors.score?.message && (
        <p className="font-bold text-red-500">{errors.score.message} </p>
      )}
      <button className="border-1 p-2 px-4 sm:px-6 bg-blue-500 rounded text-white w-full">
        Submit
      </button>
    </form>
  );
};

export default QuestionCard;
