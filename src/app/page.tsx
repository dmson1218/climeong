import Category from "@/components/Category";

export default function Home() {
    return (
        <div className="w-full h-full">
            <Category titles={["클라이밍 뉴스", "장비 정보", "커뮤니티", "크루 홍보"]} />
        </div>
    );
}
