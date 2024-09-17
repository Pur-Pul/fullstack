const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ parts }) => {
  let sum = parts.reduce((s, p) => s + p)
  return(<p>Number of exercises {sum}</p>)
}

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => {
  return(
    <div>
      {parts.map(part => <Part key = {part.id} part={part} />)}
    </div>
  )
}

const Course = ({course}) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts.map(part => part.exercises)} />
    </div>
  )
}

export default Course