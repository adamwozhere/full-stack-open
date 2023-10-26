interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ExerciseInputs {
  exerciseHours: number[];
  targetHours: number;
}

const parseArgs = (args: string[]): ExerciseInputs => {
  if (args.length < 4) throw new Error('not enough arguments');

  const processed = args.slice(2).map((item) => {
    const value = Number(item);
    if (isNaN(value)) throw new Error('arguments must be numbers');

    return value;
  });

  const target = processed.shift();

  return {
    exerciseHours: processed,
    targetHours: target,
  };
};

const calculateExercises = (exerciseData: ExerciseInputs): ExerciseResult => {
  const { exerciseHours, targetHours } = exerciseData;
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

try {
  const result = calculateExercises(parseArgs(process.argv));
  console.log(result);
} catch (error) {
  if (error instanceof Error) {
    console.log('Error:', error.message);
  }
}

// test for when not using args: should return 'Not too bad but could be better' average: 1.9285...
// console.log(
//   calculateExercises({ exerciseHours: [3, 0, 2, 4.5, 0, 3, 1], targetHours: 2 })
// );

// adding an export treats the file as a module and not a script --
// if both this file and bmiCalculator.ts were scripts, then parseArgs would error as they are duplicates in same scope
export default calculateExercises;

