interface ReturnStats {
	periodLength: number,
	trainingDays: number,
	success: boolean,
	rating: number,
	ratingDescription: string,
	target: number,
	average: number
}

interface ExerciseArguments {
	target: number,
	hours: Array<number>
}

const calculateExercises = (hours: Array<number>, goal: number): ReturnStats => {
	const periodLength = hours.length
	const trainingDays = hours.filter(a => a > 0).length

	const hourSum = hours.reduce((a, b) => a + b, 0)

	const average = hourSum / periodLength

	const success = average > goal ? true : false
	let rating = 0
	let ratingDescription = ''
	if (average < (goal / 2)) {
		rating = 1
		ratingDescription = 'you can always try harder next time'
	} else if (average < goal) {
		rating = 2
		ratingDescription = 'not too bad but could be better'
	} else if (average > goal * 2) {
		rating = 4
		ratingDescription = 'above and beyond'
	} else if (average >= goal) {
		rating = 3
		ratingDescription = 'great work, keep it up'
	}

	const stats = {
		periodLength: periodLength,
		trainingDays: trainingDays,
		success: success,
		rating: rating,
		ratingDescription: ratingDescription,
		target: goal,
		average: average
	}

	return stats
}

const parseExerciseArguments = (args: string[]): ExerciseArguments => {
	if (args.length < 4) throw new Error('Not enough arguments');
	const hourArray: number[] = []
	for (let i = 3; i < process.argv.length; i++){
		if (!isNaN(Number(process.argv[i]))){
			hourArray.push(Number(process.argv[i]))
		} else {
			throw new Error('Provided values were not numbers!')
		}
	}

	if (!isNaN(Number(args[2]))){
		return {
			target: Number(process.argv[2]),
			hours: hourArray
		}
	} else {
		throw new Error('Provided values were not numbers!');
	}
}

try {
	const { target, hours } = parseExerciseArguments(process.argv)
	console.log(calculateExercises(hours, target))
} catch (error) {
	let errorMessage = 'Something bad happened.'
	if (error instanceof Error) {
		errorMessage += ' Error: ' + error.message;
	}
	console.log(errorMessage);
}