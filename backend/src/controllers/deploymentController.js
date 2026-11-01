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

  // Env values pasted into a hosting dashboard often carry stray whitespace or quotes.
  const hookUrl = (process.env[target.envVar] || '').trim().replace(/^["']|["']$/g, '');
  if (!hookUrl) {
    throw new AppError(400, { message: `${target.label} deploy hook is not configured` });
  }

  // Hosts occasionally answer a valid hook with a transient 404/429/5xx, so a
  // failed attempt is retried once before giving up. The real status and body
  // are logged — that is what tells you why a hook refused.
  const RETRY_STATUSES = new Set([404, 408, 425, 429, 500, 502, 503, 504]);
  let response;
  let detail = '';
  for (let attempt = 1; attempt <= 2; attempt += 1) {
    try {
      response = await fetch(hookUrl, { method: 'POST', signal: AbortSignal.timeout(15000) });
    } catch (err) {
      console.error(`[Deployment] ${target.key} attempt ${attempt}: could not reach the hook (${err.message})`);
      response = null;
      detail = err.message;
      if (attempt === 2) throw new AppError(502, { message: 'Could not reach the deployment service' });
      await new Promise((r) => setTimeout(r, 1500));
      continue;
    }
    if (response.ok) break;

    detail = (await response.text().catch(() => '')).slice(0, 300);
    console.error(`[Deployment] ${target.key} attempt ${attempt}: hook answered ${response.status} ${detail}`);
    if (attempt === 2 || !RETRY_STATUSES.has(response.status)) break;
    await new Promise((r) => setTimeout(r, 1500));
  }

  if (!response || !response.ok) {
    throw new AppError(502, {
      message: `Deployment service rejected the request (${response?.status ?? 'no response'})${detail ? `: ${detail}` : ''}`,
    });
  }

  const body = await response.json().catch(() => ({}));
  console.log(`[Deployment] ${target.key} triggered by user ${req.user.id}`);
  res.status(202).json({
    message: `${target.label} deployment started`,
    jobId: body?.job?.id || body?.deploy?.id || null,
  });
});

module.exports = { listTargets, triggerDeployment };
