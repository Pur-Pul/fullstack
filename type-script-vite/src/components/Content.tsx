interface Course {
    name: string;
    exerciseCount: number;
}

interface ContentProps {
    courseParts: Course[];
}

const Content = ({ courseParts }: ContentProps) => {
    return (
        <div>
            {courseParts.map(course => <p key={course.name}>{course.name} {course.exerciseCount}</p>)}
        </div>
    );
}

export default Content;