export interface Frame {
  rolls: number[];
  isStrike: boolean;
  isSpare: boolean;
  score: number;
  cumulative: number;
}

export interface GameResult {
  frames: Frame[];
  totalScore: number;
  isComplete: boolean;
  isPerfect: boolean;
}

export function scoreGame(rolls: number[]): GameResult {
  const frames: Frame[] = [];
  let idx = 0;
  let cumulative = 0;

  for (let frame = 0; frame < 10 && idx < rolls.length; frame++) {
    if (frame === 9) {
      const frameRolls: number[] = [];
      let frameScore = 0;
      const maxRolls = 3;
      for (let r = 0; r < maxRolls && idx < rolls.length; r++) {
        frameRolls.push(rolls[idx]);
        frameScore += rolls[idx];
        idx++;
        if (r === 1 && frameRolls[0] !== 10 && frameRolls[0] + frameRolls[1] < 10) break;
      }
      cumulative += frameScore;
      frames.push({
        rolls: frameRolls,
        isStrike: frameRolls[0] === 10,
        isSpare: frameRolls[0] !== 10 && frameRolls.length >= 2 && frameRolls[0] + frameRolls[1] === 10,
        score: frameScore,
        cumulative,
      });
    } else if (rolls[idx] === 10) {
      const bonus1 = idx + 1 < rolls.length ? rolls[idx + 1] : 0;
      const bonus2 = idx + 2 < rolls.length ? rolls[idx + 2] : 0;
      const frameScore = 10 + bonus1 + bonus2;
      cumulative += frameScore;
      frames.push({
        rolls: [10],
        isStrike: true,
        isSpare: false,
        score: frameScore,
        cumulative,
      });
      idx++;
    } else {
      const first = rolls[idx];
      const second = idx + 1 < rolls.length ? rolls[idx + 1] : 0;
      const isSpare = first + second === 10;
      const bonus = isSpare && idx + 2 < rolls.length ? rolls[idx + 2] : 0;
      const frameScore = first + second + bonus;
      cumulative += frameScore;
      frames.push({
        rolls: [first, second],
        isStrike: false,
        isSpare,
        score: frameScore,
        cumulative,
      });
      idx += 2;
    }
  }

  const totalScore = cumulative;
  const isComplete = frames.length === 10;

  return {
    frames,
    totalScore,
    isComplete,
    isPerfect: totalScore === 300 && isComplete,
  };
}

export function perfectGame(): number[] {
  return [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10];
}

export function gutterGame(): number[] {
  return Array(20).fill(0);
}

export function allSpares(first: number): number[] {
  const rolls: number[] = [];
  for (let i = 0; i < 10; i++) {
    rolls.push(first, 10 - first);
  }
  rolls.push(first);
  return rolls;
}

export function frameCount(rolls: number[]): number {
  return scoreGame(rolls).frames.length;
}

export function currentFrame(rolls: number[]): number {
  return Math.min(frameCount(rolls), 10);
}

export function isStrike(roll: number): boolean {
  return roll === 10;
}

export function isSpareRoll(first: number, second: number): boolean {
  return first !== 10 && first + second === 10;
}

export function maxPossibleScore(rolls: number[]): number {
  const result = scoreGame(rolls);
  if (result.isComplete) return result.totalScore;

  const remaining = [...rolls];
  let framesLeft = 10 - result.frames.length;

  const lastFrame = result.frames[result.frames.length - 1];
  if (lastFrame && !lastFrame.isStrike && lastFrame.rolls.length === 1) {
    remaining.push(10 - lastFrame.rolls[0]);
    framesLeft++;
  }

  for (let i = 0; i < framesLeft; i++) {
    remaining.push(10);
  }
  if (remaining.length < 12) {
    while (remaining.length < 12) remaining.push(10);
  }

  return scoreGame(remaining).totalScore;
}

export function strikeCount(rolls: number[]): number {
  return scoreGame(rolls).frames.filter(f => f.isStrike).length;
}

export function spareCount(rolls: number[]): number {
  return scoreGame(rolls).frames.filter(f => f.isSpare).length;
}

export function openFrameCount(rolls: number[]): number {
  return scoreGame(rolls).frames.filter(f => !f.isStrike && !f.isSpare).length;
}

export function pinsPerBall(rolls: number[]): number {
  if (rolls.length === 0) return 0;
  return rolls.reduce((a, b) => a + b, 0) / rolls.length;
}

export function averageFrameScore(rolls: number[]): number {
  const result = scoreGame(rolls);
  if (result.frames.length === 0) return 0;
  return result.totalScore / result.frames.length;
}

export function formatScorecard(rolls: number[]): string {
  const result = scoreGame(rolls);
  const parts: string[] = [];
  for (let i = 0; i < result.frames.length; i++) {
    const f = result.frames[i];
    if (i === 9) {
      const symbols = f.rolls.map((r, idx) => {
        if (r === 10) return "X";
        if (idx > 0 && f.rolls[idx - 1] + r === 10) return "/";
        if (idx === 1 && f.rolls[0] === 10 && r + (f.rolls[2] ?? 0) === 10 && f.rolls.length > 2) return String(r);
        return r === 0 ? "-" : String(r);
      });
      parts.push(`[${symbols.join(" ")}]`);
    } else if (f.isStrike) {
      parts.push("[X]");
    } else if (f.isSpare) {
      parts.push(`[${f.rolls[0] === 0 ? "-" : f.rolls[0]} /]`);
    } else {
      const r1 = f.rolls[0] === 0 ? "-" : String(f.rolls[0]);
      const r2 = f.rolls[1] === 0 ? "-" : String(f.rolls[1]);
      parts.push(`[${r1} ${r2}]`);
    }
  }
  return parts.join(" ") + ` = ${result.totalScore}`;
}
