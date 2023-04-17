interface BmiValues {
	height: number;
	weight: number;
}

const calculateBmi = (height: number, weight: number): string => {
	const heightInMeters = height / 100
	const heightPower = (heightInMeters) * (heightInMeters)
	const bmi = weight / heightPower
	if (bmi < 18) {
		return 'Too low (underweight)'
	} else if (bmi >= 18 && bmi < 25) {
		return 'Normal (healthy weight)'
	} else if (bmi >= 25 && bmi < 30) {
		return 'Too high (overweight)'
	} else {
		return 'Too high (obese)'
	}
}

const parseBmiArguments = (args: string[]): BmiValues => {
	if (args.length < 4) throw new Error('Not enough arguments');
	if (args.length > 4) throw new Error('Too many arguments');
	if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
		return {
		  height: Number(args[2]),
		  weight: Number(args[3])
		}
	} else {
		throw new Error('Provided values were not numbers!');
	}
}


try {
	const { height, weight } = parseBmiArguments(process.argv)
	console.log(calculateBmi(height, weight))
} catch (error: unknown) {
	let errorMessage = 'Something bad happened'
	if (error instanceof Error) {
		errorMessage += ' Error: ' + error.message
	}
	console.log(errorMessage)
}