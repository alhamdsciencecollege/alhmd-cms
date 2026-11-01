const prisma = require('../lib/prisma');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

// Board toppers shown on the public landing page. Entered by hand — Board
// results are not recorded anywhere else in the CMS.
//
// rollNumber is an admin-only reference. It is the student's login ID, so the
// landing build script deliberately never selects it.

const ORDER = [{ batchYear: 'desc' }, { marks: 'desc' }, { name: 'asc' }];

const toInt = (v) => (v === '' || v === null || v === undefined ? NaN : Number(v));

const parse = (body) => {
  const errors = {};
  const nowYear = new Date().getFullYear();

  const batchYear = toInt(body.batchYear);
  if (!Number.isInteger(batchYear) || batchYear < 2000 || batchYear > nowYear + 1) {
    errors.batchYear = `Enter a year between 2000 and ${nowYear + 1}`;
  }

  const name = typeof body.name === 'string' ? body.name.trim() : '';
  if (!name) errors.name = 'Name is required';
  else if (name.length > 80) errors.name = 'Must be 80 characters or fewer';

  const program = typeof body.program === 'string' ? body.program.trim() : '';
  if (!program) errors.program = 'Program is required';
  else if (program.length > 40) errors.program = 'Must be 40 characters or fewer';

  const totalMarks = body.totalMarks === undefined || body.totalMarks === '' ? 1100 : toInt(body.totalMarks);
  if (!Number.isInteger(totalMarks) || totalMarks < 1 || totalMarks > 2000) {
    errors.totalMarks = 'Enter total marks between 1 and 2000';
  }

  const marks = toInt(body.marks);
  if (!Number.isInteger(marks) || marks < 0) errors.marks = 'Enter the marks obtained';
  else if (Number.isInteger(totalMarks) && marks > totalMarks) errors.marks = 'Cannot be more than the total marks';

  const rollNumber = typeof body.rollNumber === 'string' ? body.rollNumber.trim() : '';
  if (rollNumber.length > 30) errors.rollNumber = 'Must be 30 characters or fewer';

  const note = typeof body.note === 'string' ? body.note.trim() : '';
  if (note.length > 120) errors.note = 'Must be 120 characters or fewer';

  if (Object.keys(errors).length > 0) throw new AppError(400, errors);

  return {
    batchYear, name, program, marks, totalMarks,
    rollNumber: rollNumber || null,
    note: note || null,
    isPublished: body.isPublished === undefined ? true : Boolean(body.isPublished),
  };
};

const assertNotDuplicate = async ({ batchYear, name }, ignoreId) => {
  const clash = await prisma.honourRoll.findFirst({
    where: { batchYear, name: { equals: name, mode: 'insensitive' }, ...(ignoreId && { NOT: { id: ignoreId } }) },
    select: { id: true },
  });
  if (clash) throw new AppError(409, { name: `${name} is already listed for ${batchYear}` });
};

// GET /honour-roll
const listHonourRoll = catchAsync(async (req, res) => {
  const entries = await prisma.honourRoll.findMany({ orderBy: ORDER });
  res.json({ entries });
});

// POST /honour-roll
const createHonourRoll = catchAsync(async (req, res) => {
  const data = parse(req.body || {});
  await assertNotDuplicate(data);
  const entry = await prisma.honourRoll.create({ data });
  res.status(201).json({ message: 'Honour roll entry added', entry });
});

// PUT /honour-roll/:id
const updateHonourRoll = catchAsync(async (req, res) => {
  const id = Number(req.params.id);
  const existing = await prisma.honourRoll.findUnique({ where: { id }, select: { id: true } });
  if (!existing) throw new AppError(404, 'Honour roll entry not found');

  const data = parse(req.body || {});
  await assertNotDuplicate(data, id);
  const entry = await prisma.honourRoll.update({ where: { id }, data });
  res.json({ message: 'Honour roll entry updated', entry });
});

// DELETE /honour-roll/:id
const deleteHonourRoll = catchAsync(async (req, res) => {
  const id = Number(req.params.id);
  const existing = await prisma.honourRoll.findUnique({ where: { id }, select: { id: true } });
  if (!existing) throw new AppError(404, 'Honour roll entry not found');

  await prisma.honourRoll.delete({ where: { id } });
  res.json({ message: 'Honour roll entry deleted' });
});

module.exports = { listHonourRoll, createHonourRoll, updateHonourRoll, deleteHonourRoll };
