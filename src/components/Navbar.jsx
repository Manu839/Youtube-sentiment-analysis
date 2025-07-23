export default function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 text-white shadow-lg backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
            <span className="text-2xl font-bold">YT</span>
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-white to-green-100 bg-clip-text text-transparent">
            YT-Sentiment
          </h1>
        </div>

        <ul className="flex gap-8 text-sm font-medium tracking-wide">
          {['Home', 'About', 'Contact'].map((item) => (
            <li
              key={item}
              className="hover:text-green-200 cursor-pointer transition-all duration-300 hover:scale-105 px-3 py-2 rounded-lg hover:bg-white/10"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}


