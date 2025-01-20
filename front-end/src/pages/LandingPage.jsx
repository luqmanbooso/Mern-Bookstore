import React from 'react'
import { NavbarDefault } from '../components/landing/NavbarDefault'
import { CarouselWithContent } from '../components/landing/CarouselWithContent'

const LandingPage = () => {
  return (
    <div>LandingPage
      <div>
        <NavbarDefault />
      </div>
    <div>
      <CarouselWithContent />
    </div>

      <div className="text-blue-500 bg-gray-200 p-4">Test Colors</div>

    </div>
  )
}

export default LandingPage