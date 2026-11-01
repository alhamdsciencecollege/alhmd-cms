// The landing page's editable content. It comes from src/data/site-data.json,
// which scripts/fetch-site-data.mjs generates from the database on every build
// (admins edit it under Configurations → Landing in the staff portal).
import { createElement } from 'react'
import {
  Award, Bus, Building2, Calculator, Clock, Cog, Cpu, Dumbbell, FlaskConical, GraduationCap, Heart, Laptop,
  Languages, Library, Microscope, Monitor, Palette, ShieldCheck, Star, Stethoscope, Trophy, Users, Wallet, BookOpen,
} from 'lucide-react'
import data from './data/site-data.json'

export const config = data.config
export const honourRoll = data.honourRoll

// Icon names an admin can pick. Keep in sync with the list in
// backend/src/controllers/landingConfigController.js.
const ICONS = {
  Users, BookOpen, Star, ShieldCheck, GraduationCap, FlaskConical, Wallet, Stethoscope, Cog, Monitor, Cpu, Award,
  Heart, Clock, Library, Microscope, Trophy, Laptop, Calculator, Languages, Building2, Bus, Dumbbell, Palette,
}

// <SiteIcon name="Star" className="h-4 w-4" /> — renders the named icon, or a star if unknown.
export function SiteIcon({ name, ...props }) {
  return createElement(ICONS[name] || Star, props)
}

// "Pre-Medical, Pre-Engineering and F.A" — for sentences that list the programs.
export const programList = (conjunction = 'or') => {
  const names = config.programs.map((p) => p.code)
  if (names.length <= 1) return names.join('')
  return `${names.slice(0, -1).join(', ')} ${conjunction} ${names[names.length - 1]}`
}

const NUMBER_WORDS = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten']
export const numberWord = (n) => NUMBER_WORDS[n] ?? String(n)
