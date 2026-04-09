import { useEffect, useState } from "react";
import { questions } from "./questions";

const TEST_SIZE = 30;
const CORRECT_POINTS = 3;
const WRONG_POINTS = -1;
const STORAGE_KEY = "ripasso-linux-quiz-session-v5";

const SCORE_FORMATTER = new Intl.NumberFormat("it-IT", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});

const questionMap = new Map(questions.map((question) => [question.id, question]));
const allQuestionIds = questions.map((question) => question.id);
const validIdSet = new Set(allQuestionIds);

function shuffleArray(items) {
  const shuffled = [...items];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
  }

  return shuffled;
}

function sanitizeIds(items) {
  if (!Array.isArray(items)) {
    return [];
  }

  const seen = new Set();
  const sanitized = [];

  items.forEach((item) => {
    if (validIdSet.has(item) && !seen.has(item)) {
      seen.add(item);
      sanitized.push(item);
    }
  });

  return sanitized;
}

function createPool(excludedIds = []) {
  const excludedSet = new Set(excludedIds);
  const freshIds = shuffleArray(allQuestionIds.filter((id) => !excludedSet.has(id)));
  const excludedPoolIds = shuffleArray(allQuestionIds.filter((id) => excludedSet.has(id)));

  return [...freshIds, ...excludedPoolIds];
}

function createSessionFromPool(poolIds, metadata) {
  return {
    testIds: poolIds.slice(0, TEST_SIZE),
    remainingIds: poolIds.slice(TEST_SIZE),
    answers: {},
    flagged: {},
    currentIndex: 0,
    completed: false,
    ...metadata
  };
}

function createInitialSession() {
  return createSessionFromPool(createPool(), {
    testNumber: 1,
    cycleNumber: 1
  });
}

function loadStoredSession() {
  if (typeof window === "undefined") {
    return createInitialSession();
  }

  try {
    const rawSession = window.localStorage.getItem(STORAGE_KEY);

    if (!rawSession) {
      return createInitialSession();
    }

    const parsedSession = JSON.parse(rawSession);
    const testIds = sanitizeIds(parsedSession.testIds);
    const remainingIds = sanitizeIds(parsedSession.remainingIds);

    if (testIds.length === 0) {
      return createInitialSession();
    }

    const answers = {};
    const flagged = {};
    const activeTestIdSet = new Set(testIds);

    Object.entries(parsedSession.answers || {}).forEach(([id, value]) => {
      const numericId = Number(id);

      if (activeTestIdSet.has(numericId) && Number.isInteger(value)) {
        answers[numericId] = value;
      }
    });

    Object.entries(parsedSession.flagged || {}).forEach(([id, value]) => {
      const numericId = Number(id);

      if (activeTestIdSet.has(numericId) && value) {
        flagged[numericId] = true;
      }
    });

    const completed =
      Boolean(parsedSession.completed) &&
      testIds.every((questionId) => answers[questionId] !== undefined);

    return {
      testIds,
      remainingIds,
      answers,
      flagged,
      currentIndex: Math.min(
        Math.max(Number(parsedSession.currentIndex) || 0, 0),
        Math.max(testIds.length - 1, 0)
      ),
      completed,
      testNumber: Math.max(Number(parsedSession.testNumber) || 1, 1),
      cycleNumber: Math.max(Number(parsedSession.cycleNumber) || 1, 1)
    };
  } catch {
    return createInitialSession();
  }
}

function buildNextSession(currentSession) {
  let nextPool = sanitizeIds(currentSession.remainingIds);
  let nextCycle = currentSession.cycleNumber;

  if (nextPool.length < TEST_SIZE) {
    nextCycle += 1;
    nextPool = createPool(currentSession.testIds);
  }

  return createSessionFromPool(nextPool, {
    testNumber: currentSession.testNumber + 1,
    cycleNumber: nextCycle
  });
}

function getOptionState(question, optionIndex, selectedIndex, revealResults = false) {
  if (selectedIndex === undefined) {
    return "";
  }

  if (!revealResults) {
    return optionIndex === selectedIndex ? "is-selected" : "";
  }

  if (optionIndex === question.answer) {
    return "is-correct";
  }

  if (optionIndex === selectedIndex) {
    return "is-wrong";
  }

  return "is-muted";
}

function formatScore(value) {
  return SCORE_FORMATTER.format(value);
}

function getOptionLabel(question, optionIndex) {
  return `${String.fromCharCode(97 + optionIndex)}. ${question.options[optionIndex]}`;
}

export default function App() {
  const [session, setSession] = useState(loadStoredSession);

  const activeQuestions = session.testIds
    .map((questionId) => questionMap.get(questionId))
    .filter(Boolean);
  const currentQuestion = activeQuestions[session.currentIndex] ?? activeQuestions[0];

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  }, [session]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [session.currentIndex, session.completed]);

  if (!currentQuestion) {
    return null;
  }

  const selectedIndex = session.answers[currentQuestion.id];
  const answeredCount = activeQuestions.filter(
    (question) => session.answers[question.id] !== undefined
  ).length;
  const correctCount = activeQuestions.filter(
    (question) => session.answers[question.id] === question.answer
  ).length;
  const wrongCount = answeredCount - correctCount;
  const unansweredCount = activeQuestions.length - answeredCount;
  const canCompleteQuiz = answeredCount === activeQuestions.length;
  const totalScoreValue = correctCount * CORRECT_POINTS + wrongCount * WRONG_POINTS;
  const maxScoreValue = activeQuestions.length * CORRECT_POINTS;
  const remainingPoolCount = session.remainingIds.length;

  const reviewItems = activeQuestions.map((question, index) => {
    const answerIndex = session.answers[question.id];
    const isCorrect = answerIndex === question.answer;

    return {
      question,
      index,
      answerIndex,
      isCorrect,
      score: isCorrect ? CORRECT_POINTS : WRONG_POINTS
    };
  });

  function handleAnswer(optionIndex) {
    if (session.completed) {
      return;
    }

    setSession((currentSession) => ({
      ...currentSession,
      answers: {
        ...currentSession.answers,
        [currentQuestion.id]: optionIndex
      }
    }));
  }

  function goToQuestion(nextIndex) {
    if (session.completed || nextIndex < 0 || nextIndex >= activeQuestions.length) {
      return;
    }

    setSession((currentSession) => ({
      ...currentSession,
      currentIndex: nextIndex
    }));
  }

  function handleQuestionJump(event) {
    goToQuestion(Number(event.target.value));
  }

  function toggleFlag() {
    if (session.completed) {
      return;
    }

    setSession((currentSession) => ({
      ...currentSession,
      flagged: {
        ...currentSession.flagged,
        [currentQuestion.id]: !currentSession.flagged[currentQuestion.id]
      }
    }));
  }

  function resetCurrentTest() {
    setSession((currentSession) => ({
      ...currentSession,
      answers: {},
      flagged: {},
      currentIndex: 0,
      completed: false
    }));
  }

  function startNextTest() {
    setSession((currentSession) => buildNextSession(currentSession));
  }

  function completeQuiz() {
    if (!canCompleteQuiz) {
      return;
    }

    setSession((currentSession) => ({
      ...currentSession,
      completed: true
    }));
  }

  if (session.completed) {
    return (
      <main className="page-shell">
        <header className="page-header">
          <p className="page-kicker">Linux</p>
          <h1>Resoconto finale</h1>
          <div className="status-row">
            <span className="status-item">Domande: {activeQuestions.length}</span>
            <span className="status-item">Corrette: {correctCount}</span>
            <span className="status-item">Sbagliate: {wrongCount}</span>
            <span className="status-item">
              Punteggio finale {formatScore(totalScoreValue)} su {formatScore(maxScoreValue)}
            </span>
          </div>
        </header>

        <section className="review-list" aria-label="Resoconto delle risposte">
          {reviewItems.map((item) => (
            <article
              key={item.question.id}
              className={`review-card ${item.isCorrect ? "is-correct" : "is-wrong"}`}
            >
              <div className="review-topline">
                <span>Domanda {item.index + 1}</span>
                <span className="review-score">
                  {item.score > 0 ? `+${item.score}` : item.score}
                </span>
              </div>

              <h2>{item.question.prompt}</h2>
              <p>
                <strong>Tua risposta:</strong> {getOptionLabel(item.question, item.answerIndex)}
              </p>
              <p>
                <strong>Risposta corretta:</strong> {getOptionLabel(item.question, item.question.answer)}
              </p>
              <p className="review-explanation">{item.question.explanation}</p>
            </article>
          ))}
        </section>

        <footer className="summary-row">
          <p>
            Il resoconto mostra tutte le {activeQuestions.length} risposte del test concluso e il
            punteggio complessivo calcolato con la regola +3 / -1.
          </p>
          <div className="summary-actions">
            <button type="button" className="reset-link" onClick={resetCurrentTest}>
              Rifai questo test
            </button>
            <button type="button" className="reset-link strong" onClick={startNextTest}>
              Genera nuovo test
            </button>
          </div>
        </footer>
      </main>
    );
  }

  return (
    <main className="page-shell">
      <header className="page-header">
        <p className="page-kicker">Linux</p>
        <h1>Domanda {session.currentIndex + 1}</h1>
        <div className="status-row">
          <span className="status-item">
            {selectedIndex !== undefined ? "Risposta registrata" : "Da completare"}
          </span>
          <span className="status-item">
            Progresso {answeredCount} / {activeQuestions.length}
          </span>
          <span className="status-item">Pool residua: {remainingPoolCount}</span>
          <span className="status-item">Regola: +3 corretta / -1 sbagliata</span>
          <button
            type="button"
            className={`flag-button ${session.flagged[currentQuestion.id] ? "is-active" : ""}`}
            onClick={toggleFlag}
          >
            {session.flagged[currentQuestion.id] ? "Domanda contrassegnata" : "Contrassegna domanda"}
          </button>
        </div>
      </header>

      <section className="question-panel" aria-labelledby="question-text">
        <h2 id="question-text">{currentQuestion.prompt}</h2>

        <div className="answers-list">
          {currentQuestion.options.map((option, optionIndex) => (
            <label
              key={`${currentQuestion.id}-${option}`}
              className={`answer-row ${getOptionState(
                currentQuestion,
                optionIndex,
                selectedIndex,
                false
              )}`}
            >
              <input
                type="radio"
                name={`question-${currentQuestion.id}`}
                checked={selectedIndex === optionIndex}
                onChange={() => handleAnswer(optionIndex)}
              />
              <span className="answer-letter">{String.fromCharCode(97 + optionIndex)}.</span>
              <span className="answer-text">{option}</span>
            </label>
          ))}
        </div>
      </section>

      <section className="feedback-panel">
        {selectedIndex !== undefined ? (
          <>
            <strong>Risposta registrata.</strong>
            <p>La valutazione verrà mostrata solo nel resoconto finale del test.</p>
          </>
        ) : (
          <>
            <strong>Risposta non registrata.</strong>
            <p>Seleziona una delle quattro opzioni per salvare la risposta della domanda corrente.</p>
          </>
        )}
      </section>

      <div className="next-row">
        <button
          type="button"
          className="nav-button primary"
          onClick={() => goToQuestion(session.currentIndex + 1)}
          disabled={session.currentIndex === activeQuestions.length - 1}
        >
          Pagina successiva ▶
        </button>
      </div>

      <section className="jump-row" aria-label="Navigazione rapida">
        <button
          type="button"
          className="nav-button secondary"
          onClick={() => goToQuestion(session.currentIndex - 1)}
          disabled={session.currentIndex === 0}
        >
          ◀ Domanda precedente
        </button>

        <select value={session.currentIndex} onChange={handleQuestionJump} aria-label="Vai a una domanda">
          {activeQuestions.map((question, index) => {
            const answered = session.answers[question.id] !== undefined;
            const marked = session.flagged[question.id];
            const pieces = [`Domanda ${index + 1}`];

            if (answered) {
              pieces.push("completata");
            }

            if (marked) {
              pieces.push("contrassegnata");
            }

            return (
              <option key={question.id} value={index}>
                {pieces.join(" · ")}
              </option>
            );
          })}
        </select>

        <button
          type="button"
          className="nav-button secondary"
          onClick={() => goToQuestion(session.currentIndex + 1)}
          disabled={session.currentIndex === activeQuestions.length - 1}
        >
          Domanda successiva ▶
        </button>
      </section>

      <section className="quiz-nav">
        <h3>Navigazione quiz</h3>
        <div className="quiz-grid">
          {activeQuestions.map((question, index) => {
            const answered = session.answers[question.id] !== undefined;
            const marked = session.flagged[question.id];

            return (
              <button
                key={question.id}
                type="button"
                className={`quiz-index ${answered ? "is-answered" : ""} ${
                  index === session.currentIndex ? "is-current" : ""
                } ${marked ? "is-flagged" : ""}`}
                onClick={() => goToQuestion(index)}
                aria-label={`Vai alla domanda ${index + 1}`}
              >
                {index + 1}
              </button>
            );
          })}
        </div>
      </section>

      <footer className="summary-row">
        <p>
          Test da {activeQuestions.length} domande | Risposte registrate {answeredCount} | Mancano{" "}
          {unansweredCount}
        </p>
        <div className="summary-actions">
          <button type="button" className="reset-link" onClick={resetCurrentTest}>
            Reimposta questo test
          </button>
          <button
            type="button"
            className="reset-link strong"
            onClick={completeQuiz}
            disabled={!canCompleteQuiz}
          >
            Concludi quiz e mostra resoconto
          </button>
        </div>
      </footer>
    </main>
  );
}
