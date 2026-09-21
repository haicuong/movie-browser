export default function MovieCard({
  title,
  description,
  imgUrl,
}: {
  title: string;
  description: string;
  imgUrl: string;
}) {
  return (
    <article className="bg-gray-300 w-fit min-w-64 md:max-w-[25vw] dark:bg-[#343434] rounded-md p-4 shadow-gray-400 dark:shadow-gray-600 shadow-md hover:shadow-lg transition-shadow duration-300">
      <img
        src={imgUrl}
        alt={title}
        className="w-full flex-1 object-cover mb-2"
      />
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300 line-clamp-3">
        {description}
      </p>
    </article>
  );
}
