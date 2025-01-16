const calculateBmi = (height: string | undefined, weight: string | undefined) => {
    if (!height || !weight) {
        throw new ReferenceError('height and weight arguments are required');
    } else if (isNaN(Number(height)) || isNaN(Number(weight))) {
        throw new TypeError('height and weight need to be numbers');
    } else {
        const bmi = Number(weight) / ((Number(height)/100) ** 2);
        if (bmi < 18.5) {
            return "underweight";
        } else if (bmi >= 18.5 && bmi < 25) {
            return "normal weight";
        } else if (bmi >= 25 && bmi < 30) {
            return "overweight";
        } else {
            return "obese";
        }
    }
};

if (require.main === module) {
    const args: string[] = process.argv.slice(3);
    try {
        console.log(calculateBmi(args[0], args[1]));
    } catch(error) {
        if (error instanceof ReferenceError || error instanceof TypeError) {
            console.log(error.message);
        } else {
            console.log(error);
        }
    }
} 

export default calculateBmi;