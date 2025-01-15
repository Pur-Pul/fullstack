const calculateBmi = () => {
    const arguments = process.argv.slice(3)
    if (arguments.length < 2) {
        return 'height and weight arguments are required'
    } else if (isNaN(Number(arguments[0])) || isNaN(Number(arguments[1]))) {
        return 'height and weight need to be numbers'
    } else {
        const height: number = Number(arguments[0])
        const weight: number = Number(arguments[1])
        const bmi = weight / ((height/100) ** 2)
        if (bmi < 18.5) {
            return "underweight"
        } else if (bmi >= 18.5 && bmi < 25) {
            return "normal weight"
        } else if (bmi >= 25 && bmi < 30) {
            return "overweight"
        } else {
            return "obese"
        }
    }
}

console.log(calculateBmi())