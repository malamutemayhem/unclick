interface Activity {
  start: number;
  end: number;
  id?: string;
}

export class ActivitySelection {
  static select(activities: Activity[]): Activity[] {
    const sorted = [...activities].sort((a, b) => a.end - b.end);
    const selected: Activity[] = [];
    let lastEnd = -Infinity;

    for (const activity of sorted) {
      if (activity.start >= lastEnd) {
        selected.push(activity);
        lastEnd = activity.end;
      }
    }
    return selected;
  }

  static maxActivities(activities: Activity[]): number {
    return ActivitySelection.select(activities).length;
  }

  static weightedSelect(
    activities: (Activity & { weight: number })[]
  ): { selected: Activity[]; totalWeight: number } {
    const sorted = [...activities].sort((a, b) => a.end - b.end);
    const n = sorted.length;
    const dp = new Array(n + 1).fill(0);
    const prev = new Array(n).fill(-1);

    for (let i = 0; i < n; i++) {
      for (let j = i - 1; j >= 0; j--) {
        if (sorted[j].end <= sorted[i].start) {
          prev[i] = j;
          break;
        }
      }
    }

    for (let i = 0; i < n; i++) {
      const include = sorted[i].weight + (prev[i] >= 0 ? dp[prev[i] + 1] : 0);
      dp[i + 1] = Math.max(dp[i], include);
    }

    const selected: Activity[] = [];
    let i = n - 1;
    let w = dp[n];
    while (i >= 0 && w > 0) {
      const include = sorted[i].weight + (prev[i] >= 0 ? dp[prev[i] + 1] : 0);
      if (include >= dp[i]) {
        selected.push(sorted[i]);
        w -= sorted[i].weight;
        i = prev[i];
      } else {
        i--;
      }
    }

    return { selected: selected.reverse(), totalWeight: dp[n] };
  }

  static conflicts(activities: Activity[]): [number, number][] {
    const pairs: [number, number][] = [];
    for (let i = 0; i < activities.length; i++) {
      for (let j = i + 1; j < activities.length; j++) {
        if (activities[i].start < activities[j].end &&
            activities[j].start < activities[i].end) {
          pairs.push([i, j]);
        }
      }
    }
    return pairs;
  }
}
