import { useMemo, useState } from "react";
import { levels } from "./data/levels.js";
import {
  generateDailyChallenge,
  generateLevelQuestions,
  getTodayKey,
} from "./data/questionGenerator.js";
import {
  getEncouragement,
  isCorrect,
  loadProgress,
  resetProgress,
  updateDailyProgress,
  updateProgress,
} from "./utils/game.js";

const symbols = [">", "<", "="];

function getFallbackQuestions(level) {
  return level.questions?.length ? level.questions : [];
}

function App() {
  const [screen, setScreen] = useState("home");
  const [progress, setProgress] = useState(() => loadProgress());
  const [activeLevelId, setActiveLevelId] = useState(1);
  const [activeLevelOverride, setActiveLevelOverride] = useState(null);
  const [activeQuestions, setActiveQuestions] = useState(() => getFallbackQuestions(levels[0]));
  const [questionIndex, setQuestionIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [result, setResult] = useState(null);

  const todayKey = getTodayKey();
  const activeLevel = useMemo(
    () => activeLevelOverride || levels.find((level) => level.id === activeLevelId) || levels[0],
    [activeLevelId, activeLevelOverride]
  );
  const activeQuestion = activeQuestions[questionIndex];
  const totalQuestions = activeQuestions.length;

  function resetRun(level, questions) {
    setActiveQuestions(questions.length ? questions : getFallbackQuestions(level));
    setQuestionIndex(0);
    setCorrectCount(0);
    setSelectedNumbers([]);
    setFeedback(null);
    setResult(null);
    setScreen("play");
  }

  function startLevel(levelId) {
    const level = levels.find((item) => item.id === levelId) || levels[0];
    let questions = [];
    try {
      questions = generateLevelQuestions(level);
    } catch {
      questions = getFallbackQuestions(level);
    }

    setActiveLevelId(level.id);
    setActiveLevelOverride(null);
    resetRun(level, questions);
  }

  function startDailyChallenge() {
    const daily = generateDailyChallenge(todayKey);
    setActiveLevelId(1);
    setActiveLevelOverride(daily.level);
    resetRun(daily.level, daily.questions);
  }

  function handleAnswer(value) {
    if (feedback?.status === "correct" || !activeQuestion) return;

    const ok = isCorrect(activeQuestion, value);
    if (ok) {
      const nextCorrectCount = correctCount + 1;
      setCorrectCount(nextCorrectCount);
      setFeedback({
        status: "correct",
        text: `找到第 ${nextCorrectCount} 条线索！${activeLevel.animal}正在给你鼓掌。`,
        correctCountAfter: nextCorrectCount,
      });
      return;
    }

    setFeedback({ status: "wrong", text: activeQuestion.hint || "换个方法再试一次。" });
  }

  function toggleNumber(number) {
    if (feedback?.status === "correct") return;
    setFeedback(null);
    setSelectedNumbers((current) => {
      const exists = current.includes(number);
      const next = exists ? current.filter((item) => item !== number) : [...current, number].slice(-2);
      if (next.length === 2) {
        window.setTimeout(() => handleAnswer(next), 80);
      }
      return next;
    });
  }

  function nextQuestion() {
    if (questionIndex < totalQuestions - 1) {
      setQuestionIndex((index) => index + 1);
      setSelectedNumbers([]);
      setFeedback(null);
      return;
    }

    const finalCorrect = feedback?.correctCountAfter ?? correctCount;
    const updater = activeLevel.isDaily
      ? updateDailyProgress(progress, todayKey, finalCorrect, totalQuestions)
      : updateProgress(progress, activeLevel, finalCorrect, totalQuestions);

    setProgress(updater.progress);
    setResult({ correctCount: finalCorrect, earnedStars: updater.earnedStars, dateKey: todayKey, isDaily: activeLevel.isDaily });
    setScreen("result");
  }

  function clearProgress() {
    const fresh = resetProgress();
    setProgress(fresh);
    setActiveLevelId(1);
    setActiveLevelOverride(null);
    setActiveQuestions(getFallbackQuestions(levels[0]));
    setScreen("home");
  }

  return (
    <main className="app-shell">
      {screen === "home" && (
        <HomeScreen
          progress={progress}
          todayKey={todayKey}
          onStart={() => setScreen("map")}
          onContinue={() => startLevel(Math.min(progress.unlockedLevel, levels.length))}
          onDaily={startDailyChallenge}
          onReset={clearProgress}
        />
      )}

      {screen === "map" && (
        <MapScreen
          progress={progress}
          onBack={() => setScreen("home")}
          onSelectLevel={startLevel}
        />
      )}

      {screen === "play" && activeQuestion && (
        <PlayScreen
          level={activeLevel}
          question={activeQuestion}
          questionIndex={questionIndex}
          totalQuestions={totalQuestions}
          correctCount={correctCount}
          selectedNumbers={selectedNumbers}
          feedback={feedback}
          onBack={() => activeLevel.isDaily ? setScreen("home") : setScreen("map")}
          onAnswer={handleAnswer}
          onToggleNumber={toggleNumber}
          onNext={nextQuestion}
        />
      )}

      {screen === "result" && result && (
        <ResultScreen
          level={activeLevel}
          result={result}
          total={totalQuestions}
          progress={progress}
          onMap={() => activeLevel.isDaily ? setScreen("home") : setScreen("map")}
          onNext={() => {
            const nextId = Math.min(activeLevel.id + 1, levels.length);
            startLevel(nextId);
          }}
        />
      )}
    </main>
  );
}

function HomeScreen({ progress, todayKey, onStart, onContinue, onDaily, onReset }) {
  const totalStars = Object.values(progress.stars).reduce((sum, item) => sum + item, 0);
  const nextLevel = levels.find((level) => level.id === Math.min(progress.unlockedLevel, levels.length)) || levels[0];
  const dailyRecord = progress.daily?.[todayKey];

  return (
    <section className="hero card home-card">
      <div className="forest-badge">森林侦探数学闯关</div>
      <div className="hero-animal">侦</div>
      <h1>数字小侦探</h1>
      <p>加入森林侦探队，帮助小动物收集线索、打开宝箱、拿到侦探徽章。</p>
      <button className="daily-challenge" onClick={onDaily}>
        <span>今日挑战 · {todayKey}</span>
        <strong>{dailyRecord ? `今日最好成绩：${dailyRecord.correctCount}/${dailyRecord.totalCount}` : "5 道每日自动生成题"}</strong>
        <em>{dailyRecord ? `${"★".repeat(dailyRecord.stars)}${"☆".repeat(3 - dailyRecord.stars)}，还可以再挑战一次` : "当天题目固定，明天自动换新"}</em>
      </button>
      <div className="daily-mission">
        <strong>今日任务</strong>
        <span>完成 1 个森林关卡，或挑战今天的猫头鹰谜题。</span>
      </div>
      <div className="next-mission">
        <span>下一站</span>
        <strong>{nextLevel.title}</strong>
        <em>{nextLevel.mission}</em>
      </div>
      <div className="summary-grid">
        <div><strong>{Math.min(progress.unlockedLevel, levels.length)}</strong><span>已解锁关卡</span></div>
        <div><strong>{totalStars}</strong><span>已获得星星</span></div>
        <div><strong>{progress.stickers.length}</strong><span>收集贴纸</span></div>
      </div>
      <div className="actions">
        <button className="primary" onClick={onStart}>进入森林地图</button>
        <button onClick={onContinue}>继续任务</button>
        <button className="ghost" onClick={onReset}>重置进度</button>
      </div>
    </section>
  );
}

function MapScreen({ progress, onBack, onSelectLevel }) {
  return (
    <section className="card">
      <Header title="森林关卡地图" onBack={onBack} />
      <div className="level-grid forest-route">
        {levels.map((level) => {
          const locked = level.id > progress.unlockedLevel;
          const stars = progress.stars[level.id] || 0;
          const completed = stars > 0;
          return (
            <button
              key={level.id}
              className={`level-card ${level.color} ${locked ? "locked" : ""}`}
              disabled={locked}
              onClick={() => onSelectLevel(level.id)}
            >
              <span className="level-number">第 {level.id} 关</span>
              <span className="animal-token">{level.animalMark}</span>
              <strong>{level.title}</strong>
              <em>{level.subtitle}</em>
              <small>{locked ? "先完成前一关" : `${level.mission} · 每次题目会变`}</small>
              <span className="treasure-line">{completed ? `已找到：${level.treasure}` : "等待侦探出发"}</span>
              <span className="stars">{"★".repeat(stars)}{"☆".repeat(3 - stars)}</span>
            </button>
          );
        })}
      </div>
      <StickerBook progress={progress} />
    </section>
  );
}

function StickerBook({ progress }) {
  return (
    <div className="sticker-book">
      <div>
        <strong>森林收藏册</strong>
        <p>完成关卡后，贴纸会被点亮。</p>
      </div>
      <div className="sticker-grid">
        {levels.map((level) => {
          const owned = progress.stickers.includes(level.sticker);
          return (
            <div key={level.id} className={`sticker-card ${owned ? "owned" : "missing"}`}>
              <span>{level.animalMark}</span>
              <strong>{owned ? level.sticker : "未获得"}</strong>
              <small>{owned ? level.treasure : level.title}</small>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function PlayScreen({ level, question, questionIndex, totalQuestions, correctCount, selectedNumbers, feedback, onBack, onAnswer, onToggleNumber, onNext }) {
  return (
    <section className={`card play-card theme-${level.color}`}>
      <Header title={level.title} onBack={onBack} />
      <div className="progress-line">
        <span>{level.subtitle}</span>
        <span>已找到 {correctCount} / {totalQuestions} 条线索</span>
      </div>
      <ClueTrail total={totalQuestions} found={correctCount} />
      <div className="play-layout">
        <aside className="character-card">
          <div className="character-face">{level.animalMark}</div>
          <strong>{level.animal}</strong>
          <span>{feedback?.status === "correct" ? "太棒了，又找到线索了！" : feedback?.status === "wrong" ? "别着急，我给你一点提示。" : level.dialog}</span>
          <small>任务：{level.mission}</small>
        </aside>
        <div className="question-box">
          <span className="scene-label">{level.scene}</span>
          <h2>{question.prompt}</h2>
          <QuestionInput
            question={question}
            selectedNumbers={selectedNumbers}
            feedback={feedback}
            onAnswer={onAnswer}
            onToggleNumber={onToggleNumber}
          />
        </div>
      </div>
      {feedback && (
        <div className={`feedback ${feedback.status}`}>
          <span>{feedback.status === "correct" ? "线索到手" : "侦探提示"}</span>
          {feedback.text}
        </div>
      )}
      <div className="actions end">
        {feedback?.status === "correct" ? (
          <button className="primary" onClick={onNext}>{questionIndex === totalQuestions - 1 ? "打开任务宝箱" : "继续寻找线索"}</button>
        ) : (
          <span className="hint-text">答错没关系，小侦探可以多试几次。</span>
        )}
      </div>
    </section>
  );
}

function ClueTrail({ total, found }) {
  return (
    <div className="clue-trail" aria-label={`已找到 ${found} 条线索，共 ${total} 条`}>
      {Array.from({ length: total }).map((_, index) => (
        <span key={index} className={index < found ? "found" : ""}>{index < found ? "线索" : index + 1}</span>
      ))}
    </div>
  );
}

function QuestionInput({ question, selectedNumbers, feedback, onAnswer, onToggleNumber }) {
  if (question.type === "compare") {
    return (
      <div className="option-grid symbol-grid">
        {symbols.map((symbol) => (
          <button key={symbol} disabled={feedback?.status === "correct"} onClick={() => onAnswer(symbol)}>{symbol}</button>
        ))}
      </div>
    );
  }

  if (question.type === "compose") {
    const sum = selectedNumbers.reduce((total, item) => total + item, 0);
    return (
      <>
        <div className="compose-target">目标：{question.target}，当前：{sum}</div>
        <div className="option-grid">
          {question.numbers.map((number, index) => (
            <button
              key={`${number}-${index}`}
              className={selectedNumbers.includes(number) ? "selected" : ""}
              disabled={feedback?.status === "correct"}
              onClick={() => onToggleNumber(number)}
            >
              {number}
            </button>
          ))}
        </div>
      </>
    );
  }

  return (
    <div className="option-grid">
      {question.options.map((option) => (
        <button key={option} disabled={feedback?.status === "correct"} onClick={() => onAnswer(option)}>{option}</button>
      ))}
    </div>
  );
}

function ResultScreen({ level, result, total, progress, onMap, onNext }) {
  const isLast = level.id >= levels.length;

  return (
    <section className={`card result-card theme-${level.color}`}>
      <div className="forest-badge">{level.isDaily ? "每日挑战完成" : "任务完成"}</div>
      <div className="hero-animal">{level.animalMark}</div>
      <h1>{level.title}</h1>
      <div className="big-stars">{"★".repeat(result.earnedStars)}{"☆".repeat(3 - result.earnedStars)}</div>
      <p>{getEncouragement(result.correctCount, total)}</p>
      <div className="reward-card">
        <span>{level.isDaily ? result.dateKey : "新收藏"}</span>
        <strong>{level.treasure}</strong>
        <em>{level.isDaily ? "明天会有新的每日谜题" : level.sticker}</em>
      </div>
      <div className="summary-grid">
        <div><strong>{result.correctCount}/{total}</strong><span>{level.isDaily ? "今日线索" : "本关线索"}</span></div>
        <div><strong>{level.isDaily ? Object.keys(progress.daily || {}).length : progress.stickers.length}</strong><span>{level.isDaily ? "挑战天数" : "收藏贴纸"}</span></div>
        <div><strong>{level.isDaily ? result.earnedStars : Math.min(progress.unlockedLevel, levels.length)}</strong><span>{level.isDaily ? "今日星星" : "已解锁到"}</span></div>
      </div>
      <div className="actions">
        <button onClick={onMap}>{level.isDaily ? "返回首页" : "返回地图"}</button>
        {!level.isDaily && !isLast && <button className="primary" onClick={onNext}>出发下一站</button>}
      </div>
    </section>
  );
}

function Header({ title, onBack }) {
  return (
    <header className="topbar">
      <button className="back" onClick={onBack}>返回</button>
      <h1>{title}</h1>
      <span />
    </header>
  );
}

export default App;
