import { useEffect, useState } from "react"

type Presence = "online" | "offline" | "away";


interface BaseResult {
    id: string;
    name: string;
    type: "person" | "file" | "folder";
}

interface PersonResult extends BaseResult {
    type: "person";
    status: string;
    avatar: string;
    presence: Presence;
}

interface FileResult extends BaseResult {
    type: "file";
    location: string;
    icon: "image" | "video" | "doc";
    edited?: string;
    added?: string;
}

interface FolderResult extends BaseResult {
    type: "folder";
    location: string;
    icon: "folder";
    filesCount: number;
    edited: string;
}

type SearchResult = PersonResult | FileResult | FolderResult;


interface SearchFilters {
    files: boolean;
    people: boolean;
    chats: boolean;
    lists: boolean;
}


interface SearchCounts {
    all: number;
    files: number;
    people: number;
}

interface SearchData {
    query: string;
    filters: SearchFilters;
    results: {
        all: SearchResult[];
    };
    counts: SearchCounts;
}

const data: SearchData = {
    "query": "Drib",
    "filters": {
        "files": true,
        "people": true,
        "chats": false,
        "lists": false
    },
    "results": {
        "all": [
            {
                "type": "person",
                "id": "u1",
                "name": "Caroline Dribsson",
                "status": "Unactivated",
                "avatar": "https://example.com/avatar1.png",
                "presence": "offline"
            },
            {
                "type": "person",
                "id": "u2",
                "name": "Adam Cadribean",
                "status": "Active 1w ago",
                "avatar": "https://example.com/avatar2.png",
                "presence": "away"
            },
            {
                "type": "file",
                "id": "f1",
                "name": "final_dribbble_presentation.jpg",
                "location": "Presentations",
                "edited": "1w ago",
                "icon": "image"
            },
            {
                "type": "person",
                "id": "u3",
                "name": "Margareth Cendribbssen",
                "status": "Active 1w ago",
                "avatar": "https://example.com/avatar3.png",
                "presence": "away"
            },
            {
                "type": "file",
                "id": "f2",
                "name": "dribbble_animation.avi",
                "location": "Videos",
                "added": "1y ago",
                "icon": "video"
            },
            {
                "type": "folder",
                "id": "d1",
                "name": "Dribbble Folder",
                "location": "Projects",
                "filesCount": 12,
                "edited": "2m ago",
                "icon": "folder"
            }
        ]
    },
    "counts": {
        "all": 9,
        "files": 6,
        "people": 3
    }
}

export const useSearch = () => {
    const [query, setQuery] = useState("")
    const [searchResult, SetSearchResult] = useState<SearchData | null>(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        (() => {
            fetchData()
        })()
    }, [query])


    const fetchData = async () => {
        try {
            setLoading(true)
            setTimeout(() => {
                SetSearchResult(data)
                setLoading(false)
            }, 1000);
        } catch (error) {
            console.log(error);
            setLoading(false)

        } finally {

        }
    }

    return { query, setQuery, loading, searchResult }
}
