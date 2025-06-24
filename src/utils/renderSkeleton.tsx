const parseClassString = (() => {
  const cache = new Map<string, string>();

  return (classString: string | undefined) => {
    const cacheKey = classString ?? "";

    if (cache.has(cacheKey)) {
      return cache.get(cacheKey)!;
    }

    const classList = (classString ?? "").split(" ");

    const filterByPrefix = (prefixes: string[]) =>
      classList.filter((cls) =>
        prefixes.some(
          (prefix) => cls.startsWith(prefix) || cls.includes(`:${prefix}`),
        ),
      );

    const sizeClassList = filterByPrefix([
      "w-",
      "h-",
      "size-",
      "min-w-",
      "min-h-",
      "max-w-",
      "max-h-",
    ]);

    const marginClassList = filterByPrefix([
      "m-",
      "mt-",
      "mb-",
      "ml-",
      "mr-",
      "mx-",
      "my-",
    ]);

    const paddingClassList = filterByPrefix([
      "p-",
      "pt-",
      "pb-",
      "pl-",
      "pr-",
      "px-",
      "py-",
    ]);

    const layoutClassList = filterByPrefix([
      "flex",
      "items-",
      "justify-",
      "text-center",
      "grow",
    ]);

    const visibilityClassList = filterByPrefix([
      "hidden",
      "line-clamp-",
      "prose",
      "overflow-",
    ]);

    const skeletonClassString = [
      ...sizeClassList,
      ...marginClassList,
      ...paddingClassList,
      ...layoutClassList,
      ...visibilityClassList,
    ].join(" ");

    cache.set(cacheKey, skeletonClassString);
    return skeletonClassString;
  };
})();

const renderSkeleton = (
  isLoading: boolean,
  children: React.ReactElement<{ className?: string }>,
) => {
  const classString = children.props.className ?? "";
  const skeletonClassString = parseClassString(classString);

  if (isLoading) {
    if (classString.includes("prose")) {
      return (
        <div className={`${skeletonClassString} flex flex-col gap-2`}>
          <div className="skeleton h-5 w-full" />
          <div className="skeleton h-5 w-full" />
          <div className="skeleton h-5 w-5/6" />
        </div>
      );
    }

    return <div className={`${skeletonClassString} skeleton`} />;
  }

  return children;
};

export default renderSkeleton;
