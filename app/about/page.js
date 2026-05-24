import { 
  BookmarkSquareIcon, 
  MagnifyingGlassIcon, 
  PlayCircleIcon 
} from '@heroicons/react/24/outline';

export default function AboutSection() {
  const features = [
    {
      title: 'Track Your Games',
      description: 'Keep a log of all the games you’ve played, mark your progress, and revisit old favorites anytime.',
      icon: BookmarkSquareIcon,
      iconColor: 'text-indigo-500 dark:text-indigo-400',
      iconBg: 'bg-indigo-100 dark:bg-indigo-500/20',
      hoverBorder: 'group-hover:border-indigo-500/50',
    },
    {
      title: 'Search & Discover',
      description: 'Easily search for any game, explore genres, and find new titles you’ve never heard of.',
      icon: MagnifyingGlassIcon,
      iconColor: 'text-purple-500 dark:text-purple-400',
      iconBg: 'bg-purple-100 dark:bg-purple-500/20',
      hoverBorder: 'group-hover:border-purple-500/50',
    },
    {
      title: 'Watch Trailers',
      description: 'Preview gameplay with trailers and see what excites you before jumping in.',
      icon: PlayCircleIcon,
      iconColor: 'text-rose-500 dark:text-rose-400',
      iconBg: 'bg-rose-100 dark:bg-rose-500/20',
      hoverBorder: 'group-hover:border-rose-500/50',
    },
  ];

  return (
    <section className="relative py-24 px-6 md:px-20 bg-gray-50 dark:bg-gray-950 transition-colors overflow-hidden min-h-screen">
      
      {/* Subtle Background Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-500/10 dark:bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/10 dark:bg-purple-500/5 blur-[120px] rounded-full pointer-events-none translate-y-1/2"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 pb-2">
            What is GameShelf?
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
            Your ultimate digital library. Keep track of the games you&apos;ve played, explore new worlds, and enjoy trailers — all in one place with a beautiful, personalized experience.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map(({ title, description, icon: Icon, iconColor, iconBg, hoverBorder }) => (
            <div
              key={title}
              className={`group bg-white/60 dark:bg-gray-900/40 backdrop-blur-xl p-8 rounded-3xl shadow-lg hover:shadow-2xl border border-gray-200 dark:border-white/5 transition-all duration-300 transform hover:-translate-y-2 ${hoverBorder}`}
            >
              {/* Icon Container */}
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 ${iconBg}`}>
                <Icon className={`w-7 h-7 ${iconColor}`} />
              </div>
              
              {/* Text Content */}
              <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white transition-colors duration-300">
                {title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}