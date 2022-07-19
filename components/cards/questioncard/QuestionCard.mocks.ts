import { IQuestionCard } from './QuestionCard';

const base: IQuestionCard = {
  title:
    'You’re really busy at work and a colleague is telling you their life story and personal woes. You:',
  id: 1,
  answers: [
    { id: 1, text: 'Don’t dare to interrupt them', score: 4 },
    {
      id: 2,
      text: 'Think it’s more important to give them some of your time; work can wait',
      score: 3,
    },
    { id: 3, text: 'Listen, but with only with half an ear', score: 2 },
    {
      id: 4,
      text: 'Interrupt and explain that you are really busy at the moment',
      score: 1,
    },
  ],
};

export const mockQuestionCardProps = {
  base,
};
