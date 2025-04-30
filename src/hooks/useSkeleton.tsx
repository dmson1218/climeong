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
                prefixes.some((prefix) => cls.startsWith(prefix) || cls.includes(`:${prefix}`))
            );

        const widthClassList = filterByPrefix(["w-"]);
        const heightClassList = filterByPrefix(["h-"]);
        const marginClassList = filterByPrefix(["m-", "mt-", "mb-", "ml-", "mr-", "mx-", "my-"]);
        const paddingClassList = filterByPrefix(["p-", "pt-", "pb-", "pl-", "pr-", "px-", "py-"]);
        const layoutClassList = filterByPrefix(["flex", "items-", "justify-", "text-center"]);

        const skeletonClassString = [
            ...widthClassList,
            ...heightClassList,
            ...marginClassList,
            ...paddingClassList,
            ...layoutClassList,
        ].join(" ");

        cache.set(cacheKey, skeletonClassString);
        return skeletonClassString;
    };
})();

const useSkeleton = (isLoading: boolean, children: React.ReactElement<{ className?: string }>) => {
    const classString = children.props.className ?? "";
    const skeletonClassString = parseClassString(classString);

    if (isLoading) {
        return <div className={`skeleton ${skeletonClassString}`} />;
    }

    return children;
};

export default useSkeleton;
