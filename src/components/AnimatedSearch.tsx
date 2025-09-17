import { Search, Paperclip, User, Settings, LoaderCircle, File, MessageCircle, List } from 'lucide-react';
import { useState, useMemo, useEffect, useRef, memo } from 'react';
import { useSearch } from '../hooks/useSearch';
import { useCountUp } from '../hooks/useCountUp';
import Skeleton from '../shared/components/Skeleton';
import SearchResultCard from '../shared/components/SearchResultCard';

// Memoized AnimatedCount component
const AnimatedCount = memo(({ value }: { value: number }) => {
    const animatedValue = useCountUp(value || 0, 800);
    return <div className='result_count'>{animatedValue}</div>;
});

const AnimatedSearch = () => {
    const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const { query, setQuery, loading, searchResult, filters, toggleFilter, activeTab, setActiveTab } = useSearch()

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowSettingsDropdown(false);
            }
        };

        if (showSettingsDropdown) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showSettingsDropdown]);

    // Focus input when user presses 'S' key and input is empty
    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            // Only trigger if input is empty and not already focused
            if (query.length === 0 && document.activeElement !== inputRef.current && event.key.toLowerCase() === 's') {
                event.preventDefault();
                inputRef.current?.focus();
            }
        };

        document.addEventListener('keydown', handleKeyPress);

        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [query]);

    // Memoize count values to prevent re-animation when filters change
    const countValues = useMemo(() => ({
        all: searchResult?.counts.all || 0,
        files: searchResult?.counts.files || 0,
        people: searchResult?.counts.people || 0
    }), [searchResult?.counts.all, searchResult?.counts.files, searchResult?.counts.people]);
    const setCardHeight = () => {
        if (query.length > 0) {
            return "450px"
        }
        return "60px"
    }

    return (
        <div className={`search_card ${query.length > 0 ? 'active' : ''}`}
            style={{ height: setCardHeight() }}>
            <div className="search_input_section">

                {
                    loading && query.length > 0 ?
                        <LoaderCircle style={{
                            animation: 'spin 1s linear infinite'
                        }} color='grey' /> :
                        <Search color='grey' />
                }


                <input
                    ref={inputRef}
                    placeholder="Searching is esier"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                {query.length > 0 ?
                    <button className='clear' onClick={() => setQuery("")}> clear</button>
                    :
                    <div className='quick_access'>
                        <button
                            className='quick_access_btn'
                            onClick={() => inputRef.current?.focus()}
                        >
                            S
                        </button>
                        <span style={{ marginLeft: "5px" }}> quick access</span>
                    </div>
                }
            </div>

            {
                query.length > 0 &&
                <div className='search_result' >
                    <div className='search_result_header'>
                        <div className='filters_tab'>
                            <div className={`tab ${activeTab === 'all' ? 'active' : ''}`} onClick={() => setActiveTab('all')}>
                                <div className='tab_lable'>All</div>
                                <AnimatedCount value={countValues.all} />
                            </div>
                            {filters.files && (
                                <div className={`tab ${activeTab === 'files' ? 'active' : ''}`} onClick={() => setActiveTab('files')}>
                                    <Paperclip />
                                    <div className='tab_lable'>Files</div>
                                    <AnimatedCount value={countValues.files} />
                                </div>
                            )}
                            {filters.people && (
                                <div className={`tab ${activeTab === 'people' ? 'active' : ''}`} onClick={() => setActiveTab('people')}>
                                    <User />
                                    <div className='tab_lable'>People</div>
                                    <AnimatedCount value={countValues.people} />
                                </div>
                            )}
                            {filters.chats && (
                                <div className={`tab ${activeTab === 'chats' ? 'active' : ''}`} onClick={() => setActiveTab('chats')}>
                                    <MessageCircle />
                                    <div className='tab_lable'>Chats</div>
                                    <AnimatedCount value={0} />
                                </div>
                            )}
                            {filters.lists && (
                                <div className={`tab ${activeTab === 'lists' ? 'active' : ''}`} onClick={() => setActiveTab('lists')}>
                                    <List />
                                    <div className='tab_lable'>Lists</div>
                                    <AnimatedCount value={0} />
                                </div>
                            )}
                        </div>
                        <div style={{ position: 'relative' }} ref={dropdownRef}>
                            <Settings
                                onClick={() => setShowSettingsDropdown(!showSettingsDropdown)}
                                style={{ cursor: 'pointer' }}
                            />
                            {showSettingsDropdown && (
                                <div className='settings_dropdown'>
                                    <div className='filter_option' onClick={() => toggleFilter('files')}>
                                        <div className='filter_option_label'>
                                            <File size={18} />
                                            <span>Files</span>
                                        </div>
                                        <div className={`toggle_switch ${filters.files ? 'active' : ''}`}>
                                            <div className='toggle_switch_handle'></div>
                                        </div>
                                    </div>
                                    <div className='filter_option' onClick={() => toggleFilter('people')}>
                                        <div className='filter_option_label'>
                                            <User size={18} />
                                            <span>People</span>
                                        </div>
                                        <div className={`toggle_switch ${filters.people ? 'active' : ''}`}>
                                            <div className='toggle_switch_handle'></div>
                                        </div>
                                    </div>
                                    <div className='filter_option' onClick={() => toggleFilter('chats')}>
                                        <div className='filter_option_label'>
                                            <MessageCircle size={18} />
                                            <span>Chats</span>
                                        </div>
                                        <div className={`toggle_switch ${filters.chats ? 'active' : ''}`}>
                                            <div className='toggle_switch_handle'></div>
                                        </div>
                                    </div>
                                    <div className='filter_option' onClick={() => toggleFilter('lists')}>
                                        <div className='filter_option_label'>
                                            <List size={18} />
                                            <span>Lists</span>
                                        </div>
                                        <div className={`toggle_switch ${filters.lists ? 'active' : ''}`}>
                                            <div className='toggle_switch_handle'></div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='search_result_body'>
                        {loading ? <Skeleton isActive={true} count={5} /> :
                            searchResult?.results.all ? (
                                <SearchResultCard searchResult={searchResult.results.all} />
                            ) : (
                                <div>No results found</div>
                            )
                        }
                    </div>
                </div>
            }
        </div >
    )
}

export default AnimatedSearch