// components/AboutSection.tsx
export default function AboutSection() {
  const features = [
    {
      title: 'Track Your Games',
      description: 'Keep a log of all the games you’ve played, mark your progress, and revisit old favorites anytime.',
    },
    {
      title: 'Search & Discover',
      description: 'Easily search for any game, explore genres, and find new titles you’ve never heard of.',
    },
    {
      title: 'Watch Trailers',
      description: 'Preview gameplay with trailers and see what excites you before jumping in.',
    },
  ];

  return (
    <section className="py-16 px-6 md:px-20 bg-gray-100 dark:bg-gray-900 transition-colors">
      <h2 className="text-4xl font-bold text-center mb-10 text-gray-800 dark:text-white">
        What is GameTracker?
      </h2>
      <p className="text-center max-w-3xl mx-auto text-gray-600 dark:text-gray-300 mb-16 text-lg">
        GameTracker helps you keep track of the games you've played, explore new ones, and enjoy trailers
        — all in one place with a beautiful, personalized experience.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map(({ title, description }) => (
          <div
            key={title}
            className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl border dark:border-gray-700"
          >
            <h3 className="text-2xl font-semibold mb-3 text-gray-800 dark:text-white">{title}</h3>
            <p className="text-gray-600 dark:text-gray-300 text-base">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
