// Chaos Derby (Side-scroll) - balance.js (SPEC LOCKED)
// Units: meters, seconds. Velocities: m/s. boost and startBoost are additive speed terms.

window.BAL = {
  // Tempo / Course
  courseDistance: 850,       // m
  courseWidth: 14,           // m (Y range [-w/2, +w/2])
  sectionsN: 7,
  mixCountBySection: [1,1,2,2,3,3,4],
  countBySection:    [2,3,3,4,4,5,6],
  minGapX: 18,
  minGapY: 1.2,
  yMarginRatio: 0.12,
  minClearWidthRatio: 0.25,
  placeTries: 30,
  xSamplesPerSection: 6,

  // ROW obstacles
  rowSlots: 8,
  rowPlaceTries: 25,
  rowGapStart: 3,
  rowGapEnd: 1,
  rowFullProbStart: 0.14,
  rowFullProbEnd: 0.34,

  // Horse base
  horseR: 0.72,              // collision radius (m)
  baseSpeed: 14,             // m/s
  vMaxExtra: 5,              // extra headroom
  vyMax: 18,                 // m/s (final clamp)

  // Whip (boost)
  whipCDSec: 0.20,
  whipCost: 12,
  whipBoost: 12,
  boostDecayK: 1.7,
  boostCutoff: 0.05,
  boostMax: 30,

  // Stamina
  staminaMax: 100,
  staminaRegen: 22,
  regenDelaySec: 0.35,

  // Jump physics (z axis)
  jumpV: 18,                 // m/s
  g: 40,                     // m/s^2
  airControlMul: 0.55,
  maxRiseSpeed: 18,
  maxFallSpeed: 22,
  vyZeroSnap: 0.05,

  // Pads (good effects) - ground only
  padBoost: 12,              // boost += padBoost (clamped by boostMax)
  bigJumpV: 34,              // vz = bigJumpV
  bigJumpBoost: 4,           // boost += bigJumpBoost (clamped)

  // Bad effects (unified slow)
  hitSlowMul: 0.75,
  hitSlowSec: 0.60,
  vBaseFloorMul: 0.55,
  obstacleGhostSec: 0.25,    // only the hit obstacle becomes ghost for this horse

  // Barrel angle-based knock
  barrelKnockY: 14,
  barrelSideNyEps: 0.05,
  vyMaxKnock: 22,            // clamp after applying knock

  // Dash hit (horse vs horse)
  knockDashY: 10,            // vy += sign * knockDashY on victim
  hitSpeedMul: 0.80,         // temporary vx multiplier on victim
  pairHitCDSec: 0.35,        // per-pair hit cooldown

  // Walls (D): friction + return only while touching wall
  wallFrictionVy: 0.50,
  wallReturnK: 6.0,
  wallVyDead: 0.20,

  // Catchup (baseSpeed only; not boost)
  catchupRankFrom: 7,
  catchupMulByRank: {7:1.02,8:1.04},
  dropOnPassTop3: true,
  dropCooldownSec: 0.45,

  // Start dash (separate startBoost var; NOT Dash)
  countdownSec: 3.0,         // 3..2..1..GO
  goWindowSec: 0.18,         // success input window after GO
  startBoostAdd: 16,         // startBoost += startBoostAdd on success
  startBoostDecayK: 3.0,     // startBoost *= exp(-k*dt)
  startPenaltyStopSec: 0.35, // on failure, stop vx base part temporarily
  startMoveLockSec: 0.35,    // forbid up/down right after GO
  startWhipLockSec: 0.55,    // forbid whip right after GO

  // Result
  resultDelaySec: 2.5,
  photoFinishEpsM: 0.15,

  // Camera / Zoom
  lookAheadX: 14,
  camExtraAheadX: -(0.72*2*2), // ★キャラが画面内で右に寄る（2キャラ分）= -2.88m
  camFollowLerp: 0.12,
  camScaleBase: 1.0,
  zoomStartDelta: 3,
  zoomRange: 14,
  camScaleMin: 0.78,
  zoomLerp: 0.10,

  // Shake
  shakeWhip: 0.6,
  shakeKnock: 1.4,
  shakeObstacle: 1.0,
  shakeDecayK: 7.0,
  shakeMax: 2.4,

  // UI / Debug
  goTextSec: 0.8,
  goalTextSec: 1.2,
  hitLabelSec: 0.6,
  mapMarginPx: 16,
  hudFontPx: 14,

  // AI (retro rough)
  aiThinkIntervalSec: 0.20,
  aiLaneChangeCooldownSec: 0.35,
  aiJamDistX: 14,
  aiJamDistY: 1.2,
  aiStepY: 1.0,
  aiMistakeProb: 0.26,
  aiWhipTryIntervalSec: 0.12,
  aiWhipProbBase: 0.50,
  aiWhipProbLowStam: 0.18,
  aiWhipProbNearObs: 0.22,

  // Seed
  defaultSeed: 123456,
};
