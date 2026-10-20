import Nav from './components/Nav'
import Hero from './components/Hero'
import Programs from './components/Programs'
import College from './components/College'
import Achievers from './components/Achievers'
import Admissions from './components/Admissions'
import Footer from './components/Footer'
import Legal, { legalPage } from './components/Legal'

export default function App() {
  const legal = legalPage(window.location.pathname)
  if (legal) return <Legal page={legal} />

  return (
    <div className="min-h-screen bg-paper text-text">
      <Nav />
      <main>
        <Hero />
        <Programs />
        <College />
        <Achievers />
        <Admissions />
      </main>
      <Footer />
    </div>
  )
}
