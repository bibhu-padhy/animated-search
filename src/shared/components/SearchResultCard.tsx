import { File, User, Folder, Link, ExternalLink } from "lucide-react"
import { useState } from "react"
import type { SearchResult, PersonResult, FileResult, FolderResult } from "../../hooks/useSearch"

interface SearchResultProps {
    searchResult: SearchResult[]
}

const SearchResultCard = ({ searchResult }: SearchResultProps) => {
    const [showTooltip, setShowTooltip] = useState<string | null>(null);

    const handleCopyLink = (id: string) => {
        // Copy link logic here
        navigator.clipboard.writeText(`https://example.com/${id}`);
        setShowTooltip(id);
        setTimeout(() => setShowTooltip(null), 2000);
    };

    return (
        <>

            {searchResult.length && searchResult.map((result, index) => {
                const { name, id, type } = result
                return (
                    <div
                        key={id}
                        className="search_result_item"
                        style={{ '--list-index': index } as React.CSSProperties}
                    >
                        {type === "person" && (
                            <>
                                <div className="search_result_icon">
                                    <div className="person_avatar">
                                        <User size={16} />
                                        {(result as PersonResult).presence === "online" && <div className="status_online"></div>}
                                        {(result as PersonResult).presence === "away" && <div className="status_away"></div>}
                                        {(result as PersonResult).presence === "offline" && <div className="status_offline"></div>}
                                    </div>
                                </div>
                                <div className="search_result_content">
                                    <div className="search_result_name">{result.name}</div>
                                    <div className="search_result_meta">{(result as PersonResult).status}</div>
                                </div>
                            </>
                        )}

                        {type === "file" && (
                            <>
                                <div className="search_result_icon">
                                    <div className="file_icon">
                                        <File size={20} />
                                    </div>
                                </div>
                                <div className="search_result_content">
                                    <div className="search_result_name">{result.name}</div>
                                    <div className="search_result_meta">
                                        in {(result as FileResult).location}
                                        {(result as FileResult).edited && ` • Edited ${(result as FileResult).edited}`}
                                        {(result as FileResult).added && ` • Added ${(result as FileResult).added}`}
                                    </div>
                                </div>
                                {(result as FileResult).icon === "image" && (
                                    <div className="search_result_actions">
                                        <button
                                            className="action_button"
                                            onClick={() => handleCopyLink(id)}
                                            style={{ position: 'relative' }}
                                        >
                                            <Link size={14} />
                                            <div className={`link_copied_tooltip ${showTooltip === id ? 'show' : ''}`}>
                                                ✓ Link copied!
                                            </div>
                                        </button>
                                        <button className="action_button">
                                            <ExternalLink size={14} />
                                            <span>New Tab</span>
                                        </button>
                                    </div>
                                )}
                            </>
                        )}

                        {type === "folder" && (
                            <>
                                <div className="search_result_icon">
                                    <div className="folder_icon">
                                        <Folder size={20} />
                                    </div>
                                </div>
                                <div className="search_result_content">
                                    <div className="search_result_name">{result.name} <span style={{ color: '#6b7280', fontWeight: 400 }}>{(result as FolderResult).filesCount} Files</span></div>
                                    <div className="search_result_meta">in {(result as FolderResult).location} • Edited {(result as FolderResult).edited}</div>
                                </div>
                            </>
                        )}
                    </div>
                )
            })}
        </>

    )

}

export default SearchResultCard