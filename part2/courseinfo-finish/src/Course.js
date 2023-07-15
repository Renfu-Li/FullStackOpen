const Header = ({ name }) => {
  return <h3>{name}</h3>;
};

const Content = ({ parts }) => {
  return parts.map((part) => <Part key={part.id} part={part}></Part>);
};

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  );
};

const Course = ({ course }) => {
  const { name, parts } = course;
  const totalExercises = parts.reduce(
    (sum, exercise) => sum + exercise.exercises,
    0
  );

  return (
    <>
      <Header name={name}></Header>
      <Content parts={parts}></Content>
      <p>
        <strong>total of {totalExercises} exercises</strong>
      </p>
    </>
  );
};

export default Course;
