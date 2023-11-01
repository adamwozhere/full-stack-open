interface Props {
  courseParts: CoursePart[];
}

interface CoursePart {
  name: string;
  exerciseCount: number;
}

const Total = ({ courseParts }: Props) => {
  const totalExercises = courseParts.reduce(
    (sum, part) => sum + part.exerciseCount,
    0
  );

  return <h3>Total number of exercises: {totalExercises}</h3>;
};

export default Total;

