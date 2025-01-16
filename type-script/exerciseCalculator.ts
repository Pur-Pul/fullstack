const calculateExercises = (target_string: string, daily_exercises: string[]) => {
    if (!target_string) {
        throw new ReferenceError('Target is required.');
    } else if (!daily_exercises || daily_exercises.length == 0) {
        throw new ReferenceError('Daily exercises is required.');
    } else {
        const target = Number(target_string);
        if (isNaN(target)) {
            throw new TypeError('Target needs to be a number.');
        }
        const return_val = {
            periodLength: daily_exercises.length,
            trainingDays: 0,
            success: false,
            rating: 0,
            ratingDescription: "",
            target: target,
            average: 0
        };
        for (let i = 0; i < daily_exercises.length; i++) {
            const day = Number(daily_exercises[i]);
            if (!isNaN(day)) {
                if (day) { return_val.trainingDays++; }
                return_val.success = return_val.success && day >= target;
                return_val.average += day;
            } else {
                throw new TypeError('Exercise hours need to be numbers.');
            }
        }
        return_val.average /= return_val.periodLength;

        if (return_val.average / target < 0.5) { 
            return_val.rating = 1;
            return_val.ratingDescription = "room for improvement";
        }
        else if (return_val.average / target >= 0.5 && return_val.average / target < 1) { 
            return_val.rating = 2;
            return_val.ratingDescription = "not too bad but could be better";
        }
        else { 
            return_val.rating = 3;
            return_val.ratingDescription = "perfect";
        }
        return return_val;
    }
};




if (require.main === module) {
    const args: string[] = process.argv.slice(3);
    try {
        console.log(calculateExercises(args[0], args.slice(1, args.length)));;
    } catch(error) {
        if (error instanceof ReferenceError || error instanceof TypeError) {
            console.log(error.message);
        } else {
            console.log(error);
        }
    }
} 
export default calculateExercises;