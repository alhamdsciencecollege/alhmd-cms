// The college's contact details, read from the database-backed site data so
// there's one place to change them (Configurations → Landing in the staff portal).
import { config } from './siteData'

export const PHONE_DISPLAY = config.phoneDisplay
export const PHONE_HREF = config.phoneHref

export const WHATSAPP_DISPLAY = config.whatsappDisplay
export const WHATSAPP_HREF = config.whatsappHref

export const EMAIL = config.email

export const ADDRESS = config.address
export const MAP_URL = config.mapUrl

// The student portal (a separate app). Update this if it moves to its own domain.
export const STUDENT_PORTAL_URL = 'https://student-alhamd-cms.onrender.com'
