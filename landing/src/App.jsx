import Nav from './components/Nav'
import Hero from './components/Hero'
import Programs from './components/Programs'
import College from './components/College'
import Achievers from './components/Achievers'
import Admissions from './components/Admissions'
import Footer from './components/Footer'

export default function App() {
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
