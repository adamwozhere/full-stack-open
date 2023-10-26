interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (
  exerciseHours: number[],
  targetHours: number
): ExerciseResult => {
  const periodLength = exerciseHours.length;
  const trainingDays = exerciseHours.filter((hours) => hours > 0).length;
  const target = targetHours;
  const totalHours = exerciseHours.reduce((acc, current) => acc + current);
  const average = totalHours / periodLength;
  const success = average >= target;

  let rating: number;
  let ratingDescription: string;

  const ratingPercent = (average / target) * 100;

  if (ratingPercent < 90) {
    rating = 1;
    ratingDescription = 'Could be a lot better';
  } else if (ratingPercent < 96.5) {
    rating = 2;
    ratingDescription = 'Not too bad but could be better';
  } else {
    rating = 3;
    ratingDescription = 'Great!';
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));

