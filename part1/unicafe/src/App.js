import { useState } from "react";

const Button = ({ children, clickHandler }) => {
  return <button onClick={clickHandler}>{children}</button>;
};

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const totalFeedbacks = good + neutral + bad;

  const avgScore = ((good + bad) / totalFeedbacks).toFixed(1);

  const positiveRate = ((good / totalFeedbacks) * 100).toFixed(1);

  return (
    <table>
      <tbody>
        <StatisticLine text={"good"} value={good}></StatisticLine>
        <StatisticLine text={"neutral"} value={neutral}></StatisticLine>
        <StatisticLine text={"bad"} value={bad}></StatisticLine>

        <StatisticLine text={"all"} value={totalFeedbacks}></StatisticLine>
        <StatisticLine text={"average"} value={avgScore}></StatisticLine>
        <StatisticLine
          text={"positive"}
          value={`${positiveRate} %`}
        ></StatisticLine>
      </tbody>
    </table>
  );
};

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const goodFeedback = () => {
    setGood(good + 1);
  };

  const neutralFeedback = () => {
    setNeutral(neutral + 1);
  };

  const badFeedback = () => {
    setBad(bad + 1);
  };

  const isFeedbackGiven = good + neutral + bad;

  return (
    <div className="App">
      <h1>give feedback</h1>

      <Button clickHandler={goodFeedback}>good</Button>
      <Button clickHandler={neutralFeedback}>neutral</Button>
      <Button clickHandler={badFeedback}>bad</Button>

      <h1>Statistics</h1>

      {isFeedbackGiven ? (
        <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
      ) : (
        <p>No feedback given</p>
      )}
    </div>
  );
}

export default App;
