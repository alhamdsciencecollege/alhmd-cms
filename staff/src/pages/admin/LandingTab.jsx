import {useCallback, useEffect, useMemo, useState} from 'react'
import * as Yup from 'yup'
import {Button} from '@/components/ui/button'
import {Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle} from '@/components/ui/dialog'
import {Table, TableBody, TableHead, TableHeader, TableRow} from '@/components/ui/table'
import {FormField, FormSelect, ServerError} from '@/components/ui/form-fields'
import useAppForm from '@/hooks/useAppForm'
import {deploymentsAPI, honourRollAPI, landingConfigAPI} from '@/services/api'
import {useToast} from '@/hooks/use-toast'
import {cn} from '@/lib/utils'
import {
    AlertTriangle, ArrowDown, ArrowUp, Award, BarChart3, BookOpen, Calendar, ClipboardList, Eye, EyeOff,
    GraduationCap, Hash, Home, Info, Link2, Loader2, Mail, MapPin, MessageCircle, Phone, Plus, Quote, Rocket, Save,
    Sparkles, Trash2, Trophy, Type, User, Users,
} from 'lucide-react'
import {ActionButtons, PagePanel, TableEmpty, TableSpinner} from '@/components/shared/admin-table'
import IconPicker from '@/components/shared/IconPicker'

// ── Small building blocks ────────────────────────────────────────────────────

function Section({icon: Icon, title, description, children}) {
    return (
        <div className="card">
            <div className="card-header flex items-start gap-3 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-500/10 dark:bg-primary-500/15">
                    <Icon className="h-5 w-5 text-primary-600 dark:text-primary-400"/>
                </div>
                <div>
                    <h3 className="font-semibold text-lg tracking-tight text-gray-800 dark:text-dark-100">{title}</h3>
                    {description && <p className="text-xs text-gray-400 dark:text-dark-500">{description}</p>}
                </div>
            </div>
            <div className="space-y-4 p-3 sm:p-6">{children}</div>
        </div>
    )
}

const ListError = ({message}) =>
    message ? (
        <p className="flex items-center gap-1 text-xs text-red-500 dark:text-red-400">
            <AlertTriangle className="h-3 w-3 shrink-0"/>
            {message}
        </p>
    ) : null

const FieldLabelText = ({children}) => (
    <span className="block text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-dark-400">{children}</span>
)

const move = (list, from, to) => {
    if (to < 0 || to >= list.length) return list
    const next = [...list]
    const [item] = next.splice(from, 1)
    next.splice(to, 0, item)
    return next
}

// Row of reorder / remove controls shared by both list editors.
function RowControls({index, count, onMove, onRemove, canRemove}) {
    return (
        <div className="flex shrink-0 items-center gap-1">
            <Button type="button" variant="ghost" size="icon" className="h-8 w-8" disabled={index === 0}
                    onClick={() => onMove(index, index - 1)} aria-label="Move up">
                <ArrowUp className="h-4 w-4"/>
            </Button>
            <Button type="button" variant="ghost" size="icon" className="h-8 w-8" disabled={index === count - 1}
                    onClick={() => onMove(index, index + 1)} aria-label="Move down">
                <ArrowDown className="h-4 w-4"/>
            </Button>
            <Button type="button" variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-600"
                    disabled={!canRemove} onClick={() => onRemove(index)} aria-label="Remove">
                <Trash2 className="h-4 w-4"/>
            </Button>
        </div>
    )
}

// Ordered list of plain strings (e.g. the documents checklist).
function StringListEditor({label, items, onChange, error, placeholder, addLabel, max}) {
    return (
        <div className="space-y-2">
            <FieldLabelText>{label}</FieldLabelText>
            {items.map((value, i) => (
                <div key={i} className="flex flex-col gap-1 sm:flex-row sm:items-end sm:gap-2">
                    <div className="min-w-0 flex-1">
                        <FormField
                            label={`${label} ${i + 1}`}
                            name={`${label}-${i}`}
                            icon={<ClipboardList className="h-4 w-4"/>}
                            placeholder={placeholder}
                            value={value}
                            onChange={(e) => onChange(items.map((v, idx) => (idx === i ? e.target.value : v)))}
                        />
                    </div>
                    <div className="flex justify-end sm:pb-1">
                        <RowControls index={i} count={items.length} canRemove={items.length > 1}
                                     onMove={(a, b) => onChange(move(items, a, b))}
                                     onRemove={(idx) => onChange(items.filter((_, n) => n !== idx))}/>
                    </div>
                </div>
            ))}
            <ListError message={error}/>
            <Button type="button" variant="outline" size="sm" disabled={items.length >= max}
                    onClick={() => onChange([...items, ''])}>
                <Plus className="mr-1.5 h-4 w-4"/>{addLabel}
            </Button>
        </div>
    )
}

// Ordered list of cards. `fields` describes each card's inputs:
//   { key, label, kind: 'text' | 'textarea' | 'icon', placeholder }
function CardListEditor({label, items, onChange, error, fields, blank, addLabel, itemName, max, iconOptions}) {
    const update = (i, key, value) => onChange(items.map((it, idx) => (idx === i ? {...it, [key]: value} : it)))

    return (
        <div className="space-y-3">
            <FieldLabelText>{label}</FieldLabelText>
            {items.map((item, i) => (
                <div key={i} className="rounded-lg border border-gray-200 bg-gray-50/60 p-2.5 sm:p-3 dark:border-dark-700 dark:bg-dark-850/60">
                    <div className="mb-3 flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700 dark:text-dark-200">
                            {itemName} {i + 1}
                        </span>
                        <RowControls index={i} count={items.length} canRemove={items.length > 1}
                                     onMove={(a, b) => onChange(move(items, a, b))}
                                     onRemove={(idx) => onChange(items.filter((_, n) => n !== idx))}/>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                        {fields.map((f) =>
                            f.kind === 'icon' ? (
                                <IconPicker
                                    key={f.key}
                                    label={f.label}
                                    value={item[f.key] || ''}
                                    options={iconOptions}
                                    onChange={(name) => update(i, f.key, name)}
                                />
                            ) : (
                                <div key={f.key} className={f.kind === 'textarea' ? 'sm:col-span-2' : ''}>
                                    <FormField
                                        label={f.label}
                                        name={`${label}-${i}-${f.key}`}
                                        icon={<Type className="h-4 w-4"/>}
                                        placeholder={f.placeholder}
                                        textarea={f.kind === 'textarea'}
                                        rows={2}
                                        value={item[f.key] || ''}
                                        onChange={(e) => update(i, f.key, e.target.value)}
                                    />
                                </div>
                            )
                        )}
                    </div>
                </div>
            ))}
            <ListError message={error}/>
            <Button type="button" variant="outline" size="sm" disabled={items.length >= max}
                    onClick={() => onChange([...items, {...blank}])}>
                <Plus className="mr-1.5 h-4 w-4"/>{addLabel}
            </Button>
        </div>
    )
}

// ── Honour roll ──────────────────────────────────────────────────────────────

const currentYear = new Date().getFullYear()

const honourSchema = Yup.object({
    batchYear: Yup.number().typeError('Enter a year').integer().min(2000, 'Year is too early')
        .max(currentYear + 1, 'Year is too far ahead').required('Batch year is required'),
    name: Yup.string().trim().max(80, 'Must be 80 characters or fewer').required('Name is required'),
    rollNumber: Yup.string().trim().max(30, 'Must be 30 characters or fewer'),
    program: Yup.string().trim().required('Choose a program'),
    marks: Yup.number().typeError('Enter the marks').integer().min(0).required('Marks are required')
        .when('totalMarks', (total, schema) => (Number(total) ? schema.max(Number(total), 'Cannot exceed total marks') : schema)),
    totalMarks: Yup.number().typeError('Enter total marks').integer().min(1).max(2000).required('Total marks are required'),
    note: Yup.string().trim().max(120, 'Must be 120 characters or fewer'),
})

const EMPTY_HONOUR = {batchYear: currentYear, name: '', rollNumber: '', program: '', marks: '', totalMarks: 1100, note: '', isPublished: true}

function HonourRollSection({programNames}) {
    const [entries, setEntries] = useState([])
    const [loading, setLoading] = useState(true)
    const [dialogOpen, setDialogOpen] = useState(false)
    const [editing, setEditing] = useState(null)
    const {toast} = useToast()

    const fetchEntries = useCallback(async () => {
        setLoading(true)
        try {
            const res = await honourRollAPI.getAll()
            setEntries(res.data.entries)
        } catch {
            toast({variant: 'destructive', title: 'Error', description: 'Failed to load the honour roll'})
        } finally {
            setLoading(false)
        }
    }, [toast])

    useEffect(() => {
        void fetchEntries()
    }, [fetchEntries])

    const {formik, isSubmitting, serverError, clearServerError} = useAppForm({
        initialValues: EMPTY_HONOUR,
        validationSchema: honourSchema,
        onSubmit: async (values) => {
            if (editing) await honourRollAPI.update(editing.id, values)
            else await honourRollAPI.create(values)
            return editing ? 'edit' : 'create'
        },
        onSuccess: (mode) => {
            toast({title: 'Success', description: mode === 'edit' ? 'Entry updated' : 'Entry added'})
            setDialogOpen(false)
            void fetchEntries()
        },
    })

    useEffect(() => {
        if (!dialogOpen) return
        formik.resetForm({
            values: editing
                ? {
                    batchYear: editing.batchYear, name: editing.name, rollNumber: editing.rollNumber || '',
                    program: editing.program, marks: editing.marks, totalMarks: editing.totalMarks,
                    note: editing.note || '', isPublished: editing.isPublished,
                }
                : EMPTY_HONOUR,
        })
        clearServerError()
    }, [dialogOpen]) // eslint-disable-line react-hooks/exhaustive-deps

    const openDialog = (row = null) => {
        setEditing(row)
        setDialogOpen(true)
    }

    const handleDelete = async (row) => {
        if (!window.confirm(`Remove ${row.name} (${row.batchYear}) from the honour roll?`)) return
        try {
            await honourRollAPI.delete(row.id)
            toast({title: 'Success', description: 'Entry removed'})
            void fetchEntries()
        } catch (error) {
            toast({variant: 'destructive', title: 'Error', description: error.response?.data?.errors?.message || 'Failed to remove entry'})
        }
    }

    // Keep the entry's current program selectable even if it was later renamed away.
    const programOptions = useMemo(() => {
        const names = new Set(programNames.filter(Boolean))
        if (formik.values.program) names.add(formik.values.program)
        return [...names].map((n) => ({value: n, label: n}))
    }, [programNames, formik.values.program])

    const f = (name) => ({
        name,
        value: formik.values[name],
        error: formik.touched[name] && formik.errors[name],
        onChange: formik.handleChange,
        onBlur: formik.handleBlur,
    })

    return (
        <>
            <PagePanel
                icon={Trophy}
                title="Honour Roll"
                count={entries.length}
                countLabel="entries"
                addLabel="Add Entry"
                onAdd={() => openDialog()}
            >
                <p className="mb-4 flex items-start gap-2 rounded-lg bg-primary-500/5 p-3 text-xs text-gray-500 dark:text-dark-400">
                    <Info className="mt-0.5 h-4 w-4 shrink-0"/>
                    Honour roll entries are saved immediately. They appear on the website after the next
                    deployment. Roll numbers are for your records only and are never published.
                </p>
                {loading ? (
                    <TableSpinner label="Loading honour roll..."/>
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Year</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Program</TableHead>
                                <TableHead>Marks</TableHead>
                                <TableHead>Note</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {entries.map((row) => (
                                <TableRow key={row.id}>
                                    <td className="px-4 py-3 align-middle font-medium text-gray-800 dark:text-dark-100">{row.batchYear}</td>
                                    <td className="px-4 py-3 align-middle text-gray-800 dark:text-dark-100">
                                        {row.name}
                                        {row.rollNumber && (
                                            <span className="block font-mono text-xs text-gray-400 dark:text-dark-500">{row.rollNumber}</span>
                                        )}
                                    </td>
                                    <td className="px-4 py-3 align-middle text-gray-600 dark:text-dark-300">{row.program}</td>
                                    <td className="px-4 py-3 align-middle text-gray-600 dark:text-dark-300">{row.marks} / {row.totalMarks}</td>
                                    <td className="max-w-xs truncate px-4 py-3 align-middle text-gray-500 dark:text-dark-400">{row.note || '—'}</td>
                                    <td className="px-4 py-3 align-middle">
                                        <span className={cn(
                                            'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium',
                                            row.isPublished
                                                ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400'
                                                : 'bg-gray-500/10 text-gray-500'
                                        )}>
                                            {row.isPublished ? <Eye className="h-3 w-3"/> : <EyeOff className="h-3 w-3"/>}
                                            {row.isPublished ? 'Published' : 'Hidden'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 align-middle">
                                        <ActionButtons onEdit={() => openDialog(row)} onDelete={() => handleDelete(row)}/>
                                    </td>
                                </TableRow>
                            ))}
                            {entries.length === 0 && (
                                <TableEmpty icon={Trophy} label="No honour roll entries yet — the website shows its built-in sample list until you add some" colSpan={7}/>
                            )}
                        </TableBody>
                    </Table>
                )}
            </PagePanel>

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent className="max-h-[90vh] max-w-lg overflow-y-auto bg-white p-4 dark:bg-dark-900 sm:p-6">
                    <DialogHeader>
                        <DialogTitle className="text-lg">{editing ? 'Edit Honour Roll Entry' : 'Add Honour Roll Entry'}</DialogTitle>
                    </DialogHeader>

                    <form onSubmit={formik.handleSubmit} className="space-y-4 pt-1">
                        <ServerError message={serverError} onDismiss={clearServerError}/>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <FormField label="Batch Year" icon={<Calendar className="h-4 w-4"/>} type="number" required {...f('batchYear')}/>
                            <FormSelect label="Program" icon={<GraduationCap className="h-4 w-4"/>} required
                                        placeholder="Select program" options={programOptions} {...f('program')}/>
                        </div>
                        <FormField label="Student Name" icon={<User className="h-4 w-4"/>} placeholder="Full name" required {...f('name')}/>
                        <FormField label="Roll Number (private)" icon={<Hash className="h-4 w-4"/>}
                                   placeholder="Optional — for your records, never shown on the website" {...f('rollNumber')}/>
                        <div className="grid gap-4 sm:grid-cols-2">
                            <FormField label="Marks Obtained" icon={<Award className="h-4 w-4"/>} type="number" required {...f('marks')}/>
                            <FormField label="Total Marks" icon={<Award className="h-4 w-4"/>} type="number" required {...f('totalMarks')}/>
                        </div>
                        <FormField label="Note" icon={<Quote className="h-4 w-4"/>}
                                   placeholder='e.g. "College topper" or "Mathematics 100/100"' {...f('note')}/>

                        <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-700 dark:text-dark-200">
                            <input type="checkbox" className="h-4 w-4 rounded" checked={!!formik.values.isPublished}
                                   onChange={(e) => formik.setFieldValue('isPublished', e.target.checked)}/>
                            Show on the website
                        </label>

                        <DialogFooter className="gap-2">
                            <Button type="button" variant="outline" onClick={() => setDialogOpen(false)} disabled={isSubmitting}>Cancel</Button>
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
                                {editing ? 'Update' : 'Add'} Entry
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    )
}

// ── Landing tab ──────────────────────────────────────────────────────────────

const HERO_FEATURE_FIELDS = [
    {key: 'icon', label: 'Icon', kind: 'icon'},
    {key: 'title', label: 'Title', kind: 'text', placeholder: 'e.g. Experienced Faculty'},
    {key: 'subtitle', label: 'Subtitle', kind: 'text', placeholder: 'Short supporting line'},
]
const ABOUT_FEATURE_FIELDS = [
    {key: 'icon', label: 'Icon', kind: 'icon'},
    {key: 'title', label: 'Title', kind: 'text', placeholder: 'e.g. Dedicated science labs'},
    {key: 'body', label: 'Description', kind: 'textarea', placeholder: 'One or two sentences'},
]
const PROGRAM_FIELDS = [
    {key: 'code', label: 'Program name', kind: 'text', placeholder: 'e.g. Pre-Medical'},
    {key: 'badge', label: 'Badge', kind: 'text', placeholder: 'e.g. For doctors'},
    {key: 'icon', label: 'Icon', kind: 'icon'},
    {key: 'subjects', label: 'Subjects', kind: 'text', placeholder: 'Biology, Chemistry, Physics, English'},
    {key: 'leads', label: 'Leads to', kind: 'text', placeholder: 'MBBS, BDS and allied health degrees'},
]

const snapshot = (form) => JSON.stringify(form)

export default function LandingTab() {
    const {toast} = useToast()
    const [form, setForm] = useState(null)
    const [saved, setSaved] = useState('')
    const [updatedAt, setUpdatedAt] = useState(null)
    const [icons, setIcons] = useState([])
    const [errors, setErrors] = useState({})
    const [loadError, setLoadError] = useState('')
    const [stage, setStage] = useState(null) // null | 'saving' | 'deploying'
    const [confirmOpen, setConfirmOpen] = useState(false)
    const [deployReady, setDeployReady] = useState(null) // null = checking

    const dirty = form !== null && snapshot(form) !== saved

    const load = useCallback(async () => {
        setLoadError('')
        try {
            const res = await landingConfigAPI.get()
            const {updatedAt: stamp, ...rest} = res.data.config
            delete rest.id
            setForm(rest)
            setSaved(snapshot(rest))
            setUpdatedAt(stamp)
            setIcons(res.data.icons)
            setErrors({})
        } catch (err) {
            setLoadError(err.response?.data?.errors?.message || 'Failed to load the landing page settings')
        }
    }, [])

    useEffect(() => {
        void load()
        deploymentsAPI.getTargets()
            .then((res) => setDeployReady(Boolean(res.data.targets.find((t) => t.key === 'landing')?.configured)))
            .catch(() => setDeployReady(false))
    }, [load])

    // Warn before the tab is closed with unsaved edits.
    useEffect(() => {
        if (!dirty) return undefined
        const warn = (e) => {
            e.preventDefault()
            e.returnValue = ''
        }
        window.addEventListener('beforeunload', warn)
        return () => window.removeEventListener('beforeunload', warn)
    }, [dirty])

    const set = (key, value) => {
        setForm((prev) => ({...prev, [key]: value}))
        if (errors[key]) setErrors((prev) => ({...prev, [key]: undefined}))
    }
    const field = (key) => ({name: key, value: form?.[key] ?? '', error: errors[key], onChange: (e) => set(key, e.target.value)})

    // Saves to the database. Returns true on success.
    const persist = async () => {
        try {
            const res = await landingConfigAPI.update({...form, updatedAt})
            const {updatedAt: stamp, ...rest} = res.data.config
            delete rest.id
            setForm(rest)
            setSaved(snapshot(rest))
            setUpdatedAt(stamp)
            setErrors({})
            return true
        } catch (err) {
            const data = err.response?.data?.errors
            if (err.response?.status === 400 && data) {
                setErrors(data)
                toast({variant: 'destructive', title: 'Please check the form', description: 'Some fields need attention — they are highlighted below.'})
            } else {
                toast({variant: 'destructive', title: 'Not saved', description: data?.message || 'Failed to save the landing page settings'})
            }
            return false
        }
    }

    const handleSave = async () => {
        setStage('saving')
        const ok = await persist()
        setStage(null)
        if (ok) toast({title: 'Saved', description: 'Landing page settings saved. Deploy to publish them on the website.'})
    }

    const handleSaveAndDeploy = async () => {
        setConfirmOpen(false)
        setStage('saving')
        const ok = await persist()
        if (!ok) {
            setStage(null)
            return
        }
        setStage('deploying')
        try {
            await deploymentsAPI.trigger('landing')
            toast({title: 'Saved and deploying', description: 'The website is rebuilding with your changes. It usually goes live within a few minutes.'})
        } catch (err) {
            toast({
                variant: 'destructive',
                title: 'Saved, but not deployed',
                description: `Your changes are saved. ${err.response?.data?.errors?.message || 'The deployment could not be started'} — try "Redeploy" in the Deployment tab.`,
            })
        } finally {
            setStage(null)
        }
    }

    if (loadError) {
        return (
            <div className="card flex flex-col items-center gap-3 p-10 text-center">
                <AlertTriangle className="h-8 w-8 text-red-500"/>
                <p className="text-sm text-gray-600 dark:text-dark-300">{loadError}</p>
                <Button variant="outline" onClick={() => void load()}>Try again</Button>
            </div>
        )
    }
    if (!form) return <TableSpinner label="Loading landing page settings..."/>

    const busy = stage !== null
    const programNames = form.programs.map((p) => (p.code || '').trim())

    return (
        <div className="space-y-6">
            <Section icon={Phone} title="Contact details" description="Shown in the header, hero, admissions section and footer.">
                <div className="grid gap-4 sm:grid-cols-2">
                    <FormField label="Phone (as displayed)" icon={<Phone className="h-4 w-4"/>} placeholder="0300 1234567" required {...field('phoneDisplay')}/>
                    <FormField label="Phone link" icon={<Link2 className="h-4 w-4"/>} placeholder="tel:+923001234567" required {...field('phoneHref')}/>
                    <FormField label="WhatsApp (as displayed)" icon={<MessageCircle className="h-4 w-4"/>} placeholder="0300 1234567" required {...field('whatsappDisplay')}/>
                    <FormField label="WhatsApp link" icon={<Link2 className="h-4 w-4"/>} placeholder="https://wa.me/923001234567" required {...field('whatsappHref')}/>
                    <FormField label="Email" icon={<Mail className="h-4 w-4"/>} placeholder="info@example.com" required {...field('email')}/>
                    <FormField label="Address" icon={<MapPin className="h-4 w-4"/>} placeholder="City, Province, Country" required {...field('address')}/>
                    <div className="sm:col-span-2">
                        <FormField label="Map link" icon={<Link2 className="h-4 w-4"/>} placeholder="https://maps.google.com/…" required {...field('mapUrl')}/>
                    </div>
                </div>
            </Section>

            <Section icon={Home} title="Hero" description="The large banner at the top of the website.">
                <div className="grid gap-4 sm:grid-cols-2">
                    <FormField label="Headline" icon={<Type className="h-4 w-4"/>} placeholder="A college seat is open to" required {...field('heroHeadline')}/>
                    <FormField label="Highlighted words" icon={<Sparkles className="h-4 w-4"/>} placeholder="every student." required {...field('heroHeadlineHighlight')}/>
                </div>
                <FormField label="Paragraph" icon={<Quote className="h-4 w-4"/>} textarea rows={3} required {...field('heroParagraph')}/>
                <div className="grid gap-4 sm:grid-cols-2">
                    <FormField label="Tagline" icon={<Type className="h-4 w-4"/>} placeholder="Quality education • Strong values" required {...field('heroTagline')}/>
                    <FormField label="Green strip text" icon={<Type className="h-4 w-4"/>} placeholder="Visit any day 8am–4pm" required {...field('heroStripText')}/>
                </div>
                <CardListEditor label="Feature cards" items={form.heroFeatures} onChange={(v) => set('heroFeatures', v)}
                                error={errors.heroFeatures} fields={HERO_FEATURE_FIELDS} iconOptions={icons}
                                blank={{icon: 'Star', title: '', subtitle: ''}} addLabel="Add feature card" itemName="Card" max={8}/>
            </Section>

            <Section icon={BookOpen} title="About the college" description="The dark “About” section, its numbers, and the footer description.">
                <FormField label="Heading" icon={<Type className="h-4 w-4"/>} required {...field('aboutHeading')}/>
                <FormField label="Description" icon={<Quote className="h-4 w-4"/>} textarea rows={3} required {...field('aboutDescription')}/>
                <div className="grid gap-4 sm:grid-cols-3">
                    <FormField label="Years serving" icon={<BarChart3 className="h-4 w-4"/>} placeholder="22 years" required {...field('statYears')}/>
                    <FormField label="Teachers" icon={<Users className="h-4 w-4"/>} placeholder="40+" required {...field('statTeachers')}/>
                    <FormField label="Pass rate" icon={<BarChart3 className="h-4 w-4"/>} placeholder="92%" required {...field('statPassRate')}/>
                </div>
                <CardListEditor label="Feature blocks" items={form.aboutFeatures} onChange={(v) => set('aboutFeatures', v)}
                                error={errors.aboutFeatures} fields={ABOUT_FEATURE_FIELDS} iconOptions={icons}
                                blank={{icon: 'Star', title: '', body: ''}} addLabel="Add feature block" itemName="Block" max={8}/>
                <FormField label="Footer description" icon={<Quote className="h-4 w-4"/>} textarea rows={2} required {...field('footerBlurb')}/>
            </Section>

            <Section icon={ClipboardList} title="Admissions & programs" description="Admission status, the documents checklist and the program cards.">
                <div className="grid items-end gap-4 sm:grid-cols-2">
                    <FormSelect
                        label="Admissions status"
                        name="admissionsOpen"
                        icon={<ClipboardList className="h-4 w-4"/>}
                        value={form.admissionsOpen ? 'open' : 'closed'}
                        options={[{value: 'open', label: 'Open'}, {value: 'closed', label: 'Closed'}]}
                        error={errors.admissionsOpen}
                        onChange={(e) => set('admissionsOpen', e.target.value === 'open')}
                    />
                    <FormField label="Status text" icon={<Type className="h-4 w-4"/>} placeholder="Admissions open now" required {...field('admissionsLabel')}/>
                </div>
                <StringListEditor label="Documents needed" items={form.documentsNeeded} onChange={(v) => set('documentsNeeded', v)}
                                  error={errors.documentsNeeded} placeholder="e.g. Matric result card (copy)" addLabel="Add document" max={20}/>
                <CardListEditor label="Programs" items={form.programs} onChange={(v) => set('programs', v)}
                                error={errors.programs} fields={PROGRAM_FIELDS} iconOptions={icons}
                                blank={{code: '', badge: '', icon: 'GraduationCap', subjects: '', leads: ''}}
                                addLabel="Add program" itemName="Program" max={10}/>
            </Section>

            <HonourRollSection programNames={programNames}/>

            {/* Action bar — the end of the page; stays in view while scrolling. */}
            <div className="sticky bottom-0 z-10 rounded-xl border border-gray-200 bg-white/95 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-lg backdrop-blur dark:border-dark-700 dark:bg-dark-900/95 sm:p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="text-xs text-gray-500 dark:text-dark-400">
                        {dirty ? (
                            <span className="flex items-center gap-1.5 font-medium text-amber-600 dark:text-amber-400">
                                <AlertTriangle className="h-3.5 w-3.5"/>You have unsaved changes
                            </span>
                        ) : (
                            <span>All changes saved{updatedAt ? ` · last saved ${new Date(updatedAt).toLocaleString()}` : ''}</span>
                        )}
                        {deployReady === false && (
                            <span className="mt-0.5 block text-red-500">The landing deploy hook is not configured on the server, so deploying is unavailable.</span>
                        )}
                    </div>
                    <div className="grid grid-cols-2 gap-2 sm:flex">
                        <Button type="button" variant="outline" disabled={busy || !dirty} onClick={handleSave}>
                            {stage === 'saving' ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <Save className="mr-2 h-4 w-4"/>}
                            Save
                        </Button>
                        <Button type="button" disabled={busy || deployReady !== true} onClick={() => setConfirmOpen(true)}>
                            {busy ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <Rocket className="mr-2 h-4 w-4"/>}
                            {stage === 'saving' ? 'Saving…' : stage === 'deploying' ? 'Starting deployment…' : 'Save & Deploy'}
                        </Button>
                    </div>
                </div>
            </div>

            <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
                <DialogContent className="max-w-md bg-white p-4 dark:bg-dark-900 sm:p-6">
                    <DialogHeader>
                        <DialogTitle>Publish to the live website?</DialogTitle>
                        <DialogDescription>
                            Your changes will be saved, then the website will be rebuilt from the database. The public
                            site updates once the build finishes, usually within a few minutes.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setConfirmOpen(false)}>Cancel</Button>
                        <Button onClick={handleSaveAndDeploy}>
                            <Rocket className="mr-2 h-4 w-4"/>Save & Deploy
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
