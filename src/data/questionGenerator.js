const DAILY_LEVEL = {
  id: "daily",
  title: "今日森林挑战",
  subtitle: "每日混合题",
  animal: "猫头鹰老师",
  animalMark: "鹰",
  mission: "完成 5 道今日专属题目",
  scene: "猫头鹰老师每天都会带来一组新的森林谜题。",
  dialog: "今天的题目当天固定，明天会自动换一组。",
  treasure: "每日挑战奖章",
  sticker: "今日奖章",
  color: "badge",
  isDaily: true,
};

function hashString(text) {
  let hash = 2166136261;
  for (let index = 0; index < text.length; index += 1) {
    hash ^= text.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function mulberry32(seed) {
  return function next() {
    let value = seed += 0x6d2b79f5;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function createRandom(seedText) {
  return seedText ? mulberry32(hashString(seedText)) : Math.random;
}

function numberBetween(random, min, max) {
  return Math.floor(random() * (max - min + 1)) + min;
}

function shuffle(items, random) {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }
  return result;
}

function uniqueOptions(answer, candidates, random, min = 0, max = 20) {
  const values = new Set([answer, ...candidates.filter((item) => item >= min && item <= max)]);
  while (values.size < 3) {
    values.add(numberBetween(random, min, max));
  }
  return shuffle([...values].slice(0, 3), random);
}

function makeAddSubQuestion(random, limit, id) {
  const useAdd = random() > 0.45;

  if (useAdd) {
    const left = numberBetween(random, 1, Math.max(2, limit - 2));
    const right = numberBetween(random, 1, limit - left);
    const answer = left + right;
    return {
      id,
      type: "choice",
      prompt: `${left} + ${right} = ?`,
      options: uniqueOptions(answer, [answer - 1, answer + 1, answer + 2], random, 0, limit),
      answer,
      hint: `可以从 ${left} 开始，往后数 ${right} 个。`,
    };
  }

  const left = numberBetween(random, 2, limit);
  const right = numberBetween(random, 1, left - 1);
  const answer = left - right;
  return {
    id,
    type: "choice",
    prompt: `${left} - ${right} = ?`,
    options: uniqueOptions(answer, [answer - 1, answer + 1, answer + 2], random, 0, limit),
    answer,
    hint: `可以从 ${left} 开始，往前数 ${right} 步。`,
  };
}

function makeComposeQuestion(random, target, id) {
  const first = numberBetween(random, 1, target - 1);
  const second = target - first;
  const numbers = new Set([first, second]);
  while (numbers.size < 6) {
    numbers.add(numberBetween(random, 1, target - 1));
  }

  return {
    id,
    type: "compose",
    prompt: `选两个数字凑成 ${target}`,
    target,
    numbers: shuffle([...numbers], random),
    answer: [first, second],
    hint: `${first} 离 ${target} 还差 ${second}。`,
  };
}

function makeCompareQuestion(random, id) {
  const left = numberBetween(random, 1, 20);
  const right = random() > 0.22 ? numberBetween(random, 1, 20) : left;
  const answer = left > right ? ">" : left < right ? "<" : "=";
  const hint = answer === "=" ? "两边一样多。" : `${Math.max(left, right)} 更大。`;
  return {
    id,
    type: "compare",
    prompt: `${left} ○ ${right}`,
    left,
    right,
    answer,
    hint,
  };
}

function makePatternQuestion(random, id) {
  const step = numberBetween(random, 1, 5);
  const isUp = random() > 0.25;
  const start = isUp ? numberBetween(random, 1, 8) : numberBetween(random, 10, 20);
  const sequence = [start, start + (isUp ? step : -step), start + (isUp ? step * 2 : -step * 2)];
  const answer = start + (isUp ? step * 3 : -step * 3);
  return {
    id,
    type: "pattern",
    prompt: `${sequence.join("、")}、?`,
    sequence,
    options: uniqueOptions(answer, [answer - step, answer + step, answer + 1], random, 0, 30),
    answer,
    hint: `每次${isUp ? "多" : "少"} ${step}。`,
  };
}

function makeStoryQuestion(random, limit, id) {
  const names = ["小兔", "小熊", "小鹿", "小松鼠", "小狐狸"];
  const things = ["胡萝卜", "蜂蜜罐", "桥板", "松果", "宝石"];
  const name = names[numberBetween(random, 0, names.length - 1)];
  const thing = things[numberBetween(random, 0, things.length - 1)];
  const useAdd = random() > 0.45;

  if (useAdd) {
    const first = numberBetween(random, 2, Math.max(3, limit - 4));
    const second = numberBetween(random, 1, limit - first);
    const answer = first + second;
    return {
      id,
      type: "story",
      prompt: `${name}有 ${first} 个${thing}，又找到 ${second} 个，现在有几个？`,
      options: uniqueOptions(answer, [answer - 1, answer + 1, answer + 2], random, 0, limit),
      answer,
      hint: `把 ${first} 和 ${second} 合在一起。`,
    };
  }

  const first = numberBetween(random, 4, limit);
  const second = numberBetween(random, 1, first - 1);
  const answer = first - second;
  return {
    id,
    type: "story",
    prompt: `${name}有 ${first} 个${thing}，送出 ${second} 个，还剩几个？`,
    options: uniqueOptions(answer, [answer - 1, answer + 1, answer + 2], random, 0, limit),
    answer,
    hint: `用 ${first} 减去 ${second}。`,
  };
}

function makeMixedQuestion(random, id) {
  const makers = [
    () => makeAddSubQuestion(random, 20, id),
    () => makeComposeQuestion(random, random() > 0.5 ? 10 : 20, id),
    () => makeCompareQuestion(random, id),
    () => makePatternQuestion(random, id),
    () => makeStoryQuestion(random, 20, id),
  ];
  return makers[numberBetween(random, 0, makers.length - 1)]();
}

function makeQuestionByMode(mode, random, id) {
  if (mode === "addSub10") return makeAddSubQuestion(random, 10, id);
  if (mode === "compose10") return makeComposeQuestion(random, 10, id);
  if (mode === "compare") return makeCompareQuestion(random, id);
  if (mode === "pattern") return makePatternQuestion(random, id);
  if (mode === "addSub20") return random() > 0.35 ? makeAddSubQuestion(random, 20, id) : makeStoryQuestion(random, 20, id);
  return makeMixedQuestion(random, id);
}

export function getTodayKey() {
  const now = new Date();
  const year = now.getFullYear();
  const month = `${now.getMonth() + 1}`.padStart(2, "0");
  const day = `${now.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function generateLevelQuestions(level, count = 5) {
  const mode = level.generator?.mode || "mixed";
  const total = level.generator?.count || count;
  const random = createRandom();
  return Array.from({ length: total }).map((_, index) => makeQuestionByMode(mode, random, `level-${level.id}-${Date.now()}-${index}`));
}

export function generateDailyChallenge(dateKey = getTodayKey()) {
  const random = createRandom(`daily-${dateKey}`);
  const modes = ["addSub10", "compose10", "compare", "pattern", "addSub20"];
  const questions = modes.map((mode, index) => makeQuestionByMode(mode, random, `daily-${dateKey}-${index}`));
  return {
    level: {
      ...DAILY_LEVEL,
      mission: `完成 ${dateKey} 的 5 道今日专属题目`,
    },
    questions,
    dateKey,
  };
}
