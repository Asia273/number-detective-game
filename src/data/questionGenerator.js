const DAILY_LEVEL = {
  id: "daily",
  title: "今日森林挑战",
  subtitle: "每日100以内混合题",
  animal: "猫头鹰老师",
  animalMark: "鹰",
  mission: "完成 5 道今日专属的 100 以内题目",
  scene: "猫头鹰老师每天都会带来一组新的 100 以内森林谜题。",
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

function uniqueOptions(answer, candidates, random, min = 0, max = 100) {
  const values = new Set([answer]);
  candidates.forEach((item) => {
    if (item >= min && item <= max) values.add(item);
  });

  while (values.size < 3) {
    values.add(numberBetween(random, min, max));
  }

  return shuffle([...values].slice(0, 3), random);
}

function makeAddSubQuestion(random, limit, id) {
  const useAdd = random() > 0.45;
  const isSmallRange = limit <= 20;
  const addLeftMin = isSmallRange ? 1 : 10;
  const addRightMin = isSmallRange ? 1 : 5;
  const optionOffsets = isSmallRange ? [answer => answer - 1, answer => answer + 1, answer => answer + 2] : [answer => answer - 10, answer => answer - 2, answer => answer + 2, answer => answer + 10];

  if (useAdd) {
    const left = numberBetween(random, addLeftMin, Math.max(addLeftMin, limit - addRightMin));
    const right = numberBetween(random, addRightMin, limit - left);
    const answer = left + right;
    return {
      id,
      type: "choice",
      prompt: `${left} + ${right} = ?`,
      options: uniqueOptions(answer, optionOffsets.map((makeOffset) => makeOffset(answer)), random, 0, limit),
      answer,
      hint: isSmallRange ? `可以从 ${left} 开始，往后数 ${right} 个。` : `可以先加整十，再处理个位：${left} 加 ${right}。`,
    };
  }

  const left = numberBetween(random, isSmallRange ? 2 : 20, limit);
  const right = numberBetween(random, addRightMin, left - 1);
  const answer = left - right;
  return {
    id,
    type: "choice",
    prompt: `${left} - ${right} = ?`,
    options: uniqueOptions(answer, optionOffsets.map((makeOffset) => makeOffset(answer)), random, 0, limit),
    answer,
    hint: isSmallRange ? `可以从 ${left} 开始，往前数 ${right} 步。` : `可以先减整十，再处理个位：${left} 减 ${right}。`,
  };
}

function makeComposeQuestion(random, target, id) {
  const minValue = target <= 20 ? 1 : 10;
  const first = numberBetween(random, minValue, target - minValue);
  const second = target - first;
  const numbers = new Set([first, second]);
  while (numbers.size < 6) {
    numbers.add(numberBetween(random, minValue, target - minValue));
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
  const left = numberBetween(random, 10, 100);
  const right = random() > 0.2 ? numberBetween(random, 10, 100) : left;
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
  const step = numberBetween(random, 5, 15);
  const isUp = random() > 0.3;
  const start = isUp ? numberBetween(random, 5, 100 - step * 3) : numberBetween(random, 1 + step * 3, 100);
  const direction = isUp ? 1 : -1;
  const sequence = [start, start + direction * step, start + direction * step * 2];
  const answer = start + direction * step * 3;
  return {
    id,
    type: "pattern",
    prompt: `${sequence.join("、")}、?`,
    sequence,
    options: uniqueOptions(answer, [answer - step, answer + step, answer + direction], random, 0, 100),
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
    const first = numberBetween(random, 10, Math.max(20, limit - 10));
    const second = numberBetween(random, 5, limit - first);
    const answer = first + second;
    return {
      id,
      type: "story",
      prompt: `${name}有 ${first} 个${thing}，又找到 ${second} 个，现在有几个？`,
      options: uniqueOptions(answer, [answer - 10, answer - 2, answer + 2, answer + 10], random, 0, limit),
      answer,
      hint: `把 ${first} 和 ${second} 合在一起，结果不超过 ${limit}。`,
    };
  }

  const first = numberBetween(random, 20, limit);
  const second = numberBetween(random, 5, first - 1);
  const answer = first - second;
  return {
    id,
    type: "story",
    prompt: `${name}有 ${first} 个${thing}，送出 ${second} 个，还剩几个？`,
    options: uniqueOptions(answer, [answer - 10, answer - 2, answer + 2, answer + 10], random, 0, limit),
    answer,
    hint: `用 ${first} 减去 ${second}。`,
  };
}

function makeNearHundredQuestion(random, id) {
  const base = numberBetween(random, 35, 95);
  const answer = 100 - base;
  return {
    id,
    type: "choice",
    prompt: `${base} + ? = 100`,
    options: uniqueOptions(answer, [answer - 10, answer - 1, answer + 1, answer + 10], random, 0, 100),
    answer,
    hint: `${base} 到 100 还差 ${answer}。`,
  };
}

function makeMixedQuestion(random, id) {
  const makers = [
    () => makeAddSubQuestion(random, 100, id),
    () => makeComposeQuestion(random, 100, id),
    () => makeNearHundredQuestion(random, id),
    () => makeCompareQuestion(random, id),
    () => makePatternQuestion(random, id),
    () => makeStoryQuestion(random, 100, id),
  ];
  return makers[numberBetween(random, 0, makers.length - 1)]();
}

function makeQuestionByMode(mode, random, id) {
  if (mode === "addSub10") return makeAddSubQuestion(random, 10, id);
  if (mode === "compose10") return makeComposeQuestion(random, 10, id);
  if (mode === "compare") return makeCompareQuestion(random, id);
  if (mode === "pattern") return makePatternQuestion(random, id);
  if (mode === "addSub20") return makeAddSubQuestion(random, 20, id);
  if (mode === "addSub100") return makeAddSubQuestion(random, 100, id);
  if (mode === "compose100") return random() > 0.25 ? makeComposeQuestion(random, 100, id) : makeNearHundredQuestion(random, id);
  if (mode === "compare100") return makeCompareQuestion(random, id);
  if (mode === "pattern100") return makePatternQuestion(random, id);
  if (mode === "story100") return random() > 0.35 ? makeStoryQuestion(random, 100, id) : makeAddSubQuestion(random, 100, id);
  if (mode === "mixed100") return makeMixedQuestion(random, id);
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
  const mode = level.generator?.mode || "mixed100";
  const total = level.generator?.count || count;
  const random = createRandom();
  return Array.from({ length: total }).map((_, index) => makeQuestionByMode(mode, random, `level-${level.id}-${Date.now()}-${index}`));
}

export function generateDailyChallenge(dateKey = getTodayKey()) {
  const random = createRandom(`daily-${dateKey}`);
  const modes = ["addSub100", "compose100", "compare100", "pattern100", "story100"];
  const questions = modes.map((mode, index) => makeQuestionByMode(mode, random, `daily-${dateKey}-${index}`));
  return {
    level: {
      ...DAILY_LEVEL,
      mission: `完成 ${dateKey} 的 5 道 100 以内专属题目`,
    },
    questions,
    dateKey,
  };
}
