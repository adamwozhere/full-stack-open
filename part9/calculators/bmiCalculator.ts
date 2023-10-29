interface HeightAndWeight {
  height: number;
  weight: number;
}

const parseArgs = (args: string[]): HeightAndWeight => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

const calculateBmi = (heightCM: number, weightKG: number) => {
  const heightM = heightCM / 100;
  let bmi = weightKG / (heightM * heightM);
  let result = '';

  if (bmi < 18.5) {
    result = 'Underweight';
  } else if (bmi < 25) {
    result = 'Normal (healthy weight)';
  } else if (bmi < 30) {
    result = 'Overweight';
  } else {
    result = 'Obese';
  }

  console.log(`bmi: ${bmi.toFixed(2)} - ${result}`);
  return {
    weight: weightKG,
    height: heightCM,
    bmi: result,
  };
};

try {
  const { height, weight } = parseArgs(process.argv);
  calculateBmi(height, weight);
} catch (error) {
  if (error instanceof Error) {
    console.log('Error:', error.message);
  }
}

export default calculateBmi;

