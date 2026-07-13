const STORAGE_KEY = "number-detective-progress";

const DEFAULT_PROGRESS = { stars: {}, stickers: [], unlockedLevel: 1, daily: {} };

export function loadProgress() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return DEFAULT_PROGRESS;
    }
    return { ...DEFAULT_PROGRESS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_PROGRESS;
  }
}

export function saveProgress(progress) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function resetProgress() {
  window.localStorage.removeItem(STORAGE_KEY);
  return DEFAULT_PROGRESS;
}

export function getStars(correctCount, totalCount) {
  if (correctCount >= totalCount) return 3;
  if (correctCount >= Math.ceil(totalCount * 0.6)) return 2;
  return 1;
}

export function updateProgress(progress, level, correctCount, totalCount) {
  const earnedStars = getStars(correctCount, totalCount);
  const previousStars = progress.stars[level.id] || 0;
  const stickers = progress.stickers.includes(level.sticker)
    ? progress.stickers
    : [...progress.stickers, level.sticker];

  const nextProgress = {
    ...progress,
    stars: {
      ...progress.stars,
      [level.id]: Math.max(previousStars, earnedStars),
    },
    stickers,
    unlockedLevel: Math.max(progress.unlockedLevel, level.id + 1),
  };

  saveProgress(nextProgress);
  return { progress: nextProgress, earnedStars };
}

export function updateDailyProgress(progress, dateKey, correctCount, totalCount) {
  const earnedStars = getStars(correctCount, totalCount);
  const previous = progress.daily?.[dateKey];
  const nextDaily = {
    ...(progress.daily || {}),
    [dateKey]: {
      stars: Math.max(previous?.stars || 0, earnedStars),
      correctCount: Math.max(previous?.correctCount || 0, correctCount),
      totalCount,
      completedAt: new Date().toISOString(),
    },
  };

  const nextProgress = {
    ...progress,
    daily: nextDaily,
  };

  saveProgress(nextProgress);
  return { progress: nextProgress, earnedStars };
}

export function isCorrect(question, value) {
  if (question.type === "compose") {
    const selected = Array.isArray(value) ? value : [];
    return selected.length === 2 && selected.reduce((sum, item) => sum + item, 0) === question.target;
  }
  return value === question.answer;
}

export function getEncouragement(correctCount, totalCount) {
  if (correctCount === totalCount) return "太棒了，今天的小侦探全都答对了！";
  if (correctCount >= Math.ceil(totalCount * 0.6)) return "很不错，线索已经找到了大半！";
  return "完成挑战就很棒，再练一次会更熟。";
}
