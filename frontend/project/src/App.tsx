import React from 'react';
import { Leaf, ArrowLeftRight, Shield, BarChart2, Globe2 } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">

      <nav className="bg-white/80 backdrop-blur-sm fixed w-full z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Leaf className="h-8 w-8 text-green-600" />
              <span className="text-2xl font-bold text-green-800">TerraToken</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-600 hover:text-green-600">Platform</a>
              <a href="#" className="text-gray-600 hover:text-green-600">Market</a>
              <a href="#" className="text-gray-600 hover:text-green-600">About</a>
              <a href="#" className="text-gray-600 hover:text-green-600">Contact</a>
            </div>
            <button className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition-colors">
              Start Trading
            </button>
          </div>
        </div>
      </nav>


      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold text-gray-900 leading-tight mb-6">
                Trade Carbon Credits with Confidence
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Join the global movement towards sustainability. Trade verified carbon credits on our secure blockchain platform.
              </p>
              <div className="flex space-x-4">
                <button className="bg-green-600 text-white px-8 py-3 rounded-full hover:bg-green-700 transition-colors">
                  Get Started
                </button>
                <button className="border-2 border-green-600 text-green-600 px-8 py-3 rounded-full hover:bg-green-50 transition-colors">
                  Learn More
                </button>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=800"
                alt="Sustainable Future"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <ArrowLeftRight className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Instant Trading</h3>
              <p className="text-gray-600">Execute trades instantly with our advanced blockchain technology</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Secure Platform</h3>
              <p className="text-gray-600">Your transactions are protected by state-of-the-art security</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <BarChart2 className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Market Analytics</h3>
              <p className="text-gray-600">Make informed decisions with real-time market data</p>
            </div>
          </div>
        </div>
      </section>


      <section className="py-20 bg-green-600">
        <div className="max-w-4xl mx-auto text-center px-4">
          <Globe2 className="h-16 w-16 text-white mx-auto mb-6" />
          <h2 className="text-4xl font-bold text-white mb-6">
            Join the Sustainable Future
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Start trading carbon credits today and make a real impact on our planet's future
          </p>
          <button className="bg-white text-green-600 px-8 py-3 rounded-full hover:bg-green-50 transition-colors">
            Create Account
          </button>
        </div>
      </section>


      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <Leaf className="h-6 w-6 text-green-400" />
                <span className="text-xl font-bold">TeeraToken</span>
              </div>
              <p className="text-gray-400">
                Making carbon credit trading accessible and secure for everyone.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="https://en.wikipedia.org/wiki/Carbon_offsets_and_credits" className="hover:text-green-400">How it Works</a></li>
                <li><a href="#" className="hover:text-green-400">Trading</a></li>
                <li><a href="#" className="hover:text-green-400">Security</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-green-400">About Us</a></li>
                <li><a href="#" className="hover:text-green-400">Careers</a></li>
                <li><a href="#" className="hover:text-green-400">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-green-400">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-green-400">Terms of Service</a></li>
                <li><a href="#" className="hover:text-green-400">Compliance</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 TeeraToken. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;