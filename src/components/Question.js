import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);


  useEffect(() => {
    let timer;

    const handleTimeout = () => {
      setTimeRemaining((prevTimeRemaining) => {
        if (prevTimeRemaining === 1) {
          onAnswered(false);
          setTimeRemaining(10)
        }
        return prevTimeRemaining - 1;
      })
    }

    if (timeRemaining > 0) {
      timer = setTimeout(handleTimeout, 1000)
    }

    return () => clearTimeout(timer)

  }, [timeRemaining, onAnswered])

  function handleAnswer(isCorrect) {
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
