interface TotalProps {
    totalExercises: number;
};

const Total = ({ totalExercises }: TotalProps) => {
    return <p> Total number of exercises {totalExercises} </p>;
};

export default Total;