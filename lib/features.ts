export type Plan = "ANON" | "FREE" | "PRO";

export const featureLimits = (plan: Plan) => ({
  maxWorkspaces: plan === "PRO" ? 100 : plan === "FREE" ? 5 : 1,
  maxDiagramsPerWorkspace: plan === "PRO" ? 1000 : plan === "FREE" ? 50 : 5,
  historyDepth: plan === "PRO" ? Infinity : plan === "FREE" ? 20 : 5,
  canExport: plan !== "ANON",
  canPrivateWorkspace: plan === "PRO",
  canCollab: plan !== "ANON",
});

export class FeatureLockedError extends Error {
  code = "ERR_FEATURE_LOCKED";
  constructor(msg: string) {
    super(msg);
  }
}

export function assertAllowed(
  plan: Plan,
  check: (limits: ReturnType<typeof featureLimits>) => string | null
) {
  const msg = check(featureLimits(plan));
  if (msg) throw new FeatureLockedError(msg);
}
