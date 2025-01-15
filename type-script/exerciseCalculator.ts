interface Result { 
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
} 

const calculateExercises = () => {
    const args = process.argv.slice(3)
    if (args.length < 2) {
        return 'target and exercise hours are required.'
    } else {
        const target = Number(args[0])
        var return_val = {
            periodLength: args.length - 1,
            trainingDays: 0,
            success: false,
            rating: 0,
            ratingDescription: "",
            target: target,
            average: 0
        }
        for (var i = 1; i < args.length; i++) {
            const day = Number(args[i])
            if (!isNaN(day)) {
                if (day) { return_val.trainingDays++ }
                return_val.success = return_val.success && day >= target
                return_val.average += day
            } else {
                return 'target and exercise hours need to be numbers.'
            }
        }
        return_val.average /= return_val.periodLength

        if (return_val.average / target < 0.5) { 
            return_val.rating = 1
            return_val.ratingDescription = "room for improvement"
        }
        else if (return_val.average / target >= 0.5 && return_val.average / target < 1) { 
            return_val.rating = 2 
            return_val.ratingDescription = "not too bad but could be better"
        }
        else { 
            return_val.rating = 3 
            return_val.ratingDescription = "perfect"
        }
        
        return return_val
    }
}


console.log(calculateExercises())