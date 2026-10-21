const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

// Each target is a deploy hook (Vercel or Render). The hook URL is a secret (anyone holding
// it can trigger a build), so it lives only in the environment — never in the
// client. To add a target, add an entry here and its env var.
const TARGETS = [
  { key: 'landing', label: 'Landing page', envVar: 'DEPLOY_HOOK_LANDING' },
  { key: 'server', label: 'Server', envVar: 'DEPLOY_HOOK_SERVER' },
  { key: 'staff', label: 'Staff portal', envVar: 'DEPLOY_HOOK_STAFF' },
  { key: 'student', label: 'Student portal', envVar: 'DEPLOY_HOOK_STUDENT' },
];

const findTarget = (key) => TARGETS.find((t) => t.key === key);

// GET /deployments
const listTargets = catchAsync(async (req, res) => {
  res.json({
    targets: TARGETS.map(({ key, label, envVar }) => ({
      key,
      label,
      configured: Boolean(process.env[envVar]),
    })),
  });
});

// POST /deployments/:target
const triggerDeployment = catchAsync(async (req, res) => {
  const target = findTarget(req.params.target);
  if (!target) throw new AppError(404, 'Unknown deployment target');

  const hookUrl = process.env[target.envVar];
  if (!hookUrl) {
    throw new AppError(400, { message: `${target.label} deploy hook is not configured` });
  }

  let response;
  try {
    response = await fetch(hookUrl, { method: 'POST', signal: AbortSignal.timeout(15000) });
  } catch {
    throw new AppError(502, { message: 'Could not reach the deployment service' });
  }
  if (!response.ok) {
    throw new AppError(502, { message: `Deployment service rejected the request (${response.status})` });
  }

  const body = await response.json().catch(() => ({}));
  console.log(`[Deployment] ${target.key} triggered by user ${req.user.id}`);
  res.status(202).json({
    message: `${target.label} deployment started`,
    jobId: body?.job?.id || body?.deploy?.id || null,
  });
});

module.exports = { listTargets, triggerDeployment };
