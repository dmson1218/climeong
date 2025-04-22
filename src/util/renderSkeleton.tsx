import React from "react";

const parseClassString = (classString: string | undefined) => {
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

    return skeletonClassString;
};

const renderSkeleton = (
    isLoading: boolean,
    children: React.ReactElement<{ className?: string }>
) => {
    if (!React.isValidElement(children)) return children;

    const classString = children.props.className ?? "";
    const skeletonClassString = parseClassString(classString);

    if (isLoading) {
        return <div className={`skeleton ${skeletonClassString}`} />;
    }

    return children;
};

export default renderSkeleton;
