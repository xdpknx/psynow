export type Answer = {
  id: number;
  text: string;
  score: number;
};

export type Question = {
  id: number;
  title: string;
  answers: Answer[];
};
