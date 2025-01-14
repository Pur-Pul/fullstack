interface Result { 
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
} 

const calculateExercises = (exercise_hours : number[], target : number) => {
    var return_val = {
        periodLength: exercise_hours.length,
        trainingDays: 0,
        success: false,
        rating: 0,
        ratingDescription: "",
        target: target,
        average: exercise_hours.reduce((sum, val) => sum + val, 0) / exercise_hours.length
    }
    for (var i = 0; i < exercise_hours.length; i++) {
        if (exercise_hours[i]) { return_val.trainingDays++ }
        return_val.success = return_val.success && exercise_hours[i] >= target
    }
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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))