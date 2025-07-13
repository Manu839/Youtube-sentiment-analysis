export default function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-green-600 to-lime-500 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-extrabold">YT Sentiment</h1>

        <ul className="flex gap-8 text-sm font-medium tracking-wide">
          {['Home', 'About', 'Contact'].map((item) => (
            <li
              key={item}
              className="hover:underline hover:underline-offset-4 cursor-pointer transition"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}


