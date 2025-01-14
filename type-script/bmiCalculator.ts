const calculateBmi = (height: number, weight: number) => {
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
console.log(calculateBmi(180, 74))