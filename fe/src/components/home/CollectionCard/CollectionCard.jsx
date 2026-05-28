import { FiArrowRight } from "react-icons/fi";

export default function CollectionCard({
  image,
  category,
  title,
  offset,
}) {
  return (
    <div className={`${offset ? "md:mt-24" : ""} group cursor-pointer`}>
      {/* Image */}
      <div className="mb-5 aspect-[4/5] overflow-hidden rounded-sm">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 sm:text-xs dark:text-zinc-400">
            {category}
          </p>

          <h3 className="mt-2 text-xl text-[#131313] sm:text-2xl md:text-3xl dark:text-white ">
            {title}
          </h3>
        </div>

        <FiArrowRight className="text-xl transition-transform group-hover:translate-x-2 dark:text-white" />
      </div>
    </div>
  );
}