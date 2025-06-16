// /app/search/SearchResult.tsx

interface SearchResultProps {
    keyword: string
}

export function SearchResult({ keyword }: SearchResultProps) {
    const fakeData = [
        { id: 1, name: "제주도" },
        { id: 2, name: "한라산 등반" },
    ]

    const filtered = fakeData.filter(item =>
        item.name.toLowerCase().includes(keyword.toLowerCase())
    )

    if (filtered.length === 0) {
        return <p>😥 관련된 여행지를 찾을 수 없습니다.</p>
    }

    return (
        <ul className="list-disc pl-5">
            {filtered.map(item => (
                <li key={item.id}>{item.name}</li>
            ))}
        </ul>
    )
}


