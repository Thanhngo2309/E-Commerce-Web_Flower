import React from 'react'
import { Button } from './ui/button'

const Hero = () => {
  return (
   <section className="relative overflow-hidden">
  {/* Background gradient */}
  <div className="absolute inset-0 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400"></div>

  <div className="relative max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center text-white">

    {/* Left content */}
    <div>
      <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
        Fresh Flowers for <br /> Every Special Moment
      </h1>
      <p className="text-lg md:text-xl text-white/90 mb-8">
        Beautiful hand-picked flowers delivered with love and care.
      </p>

      <div className="flex gap-4">
        <button className="bg-white text-pink-500 px-6 py-3 rounded-full font-semibold hover:bg-pink-100 transition">
          Shop Now
        </button>
        <button className="border border-white px-6 py-3 rounded-full hover:bg-white hover:text-pink-500 transition">
          View Collections
        </button>
      </div>
    </div>

    {/* Right image */}
    <div className="relative pt-20">
      <div className="absolute -inset-4 bg-white/20 blur-3xl rounded-3xl"></div>
      <img
        src="/heroBg.png"
        alt="Flowers"
        className="relative rounded-3xl shadow-2xl object-cover"
      />
    </div>

  </div>
</section>

  )
}

export default Hero
