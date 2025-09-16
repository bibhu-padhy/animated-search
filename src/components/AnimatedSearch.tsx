import { Search, Paperclip, User, Settings, LoaderCircle } from 'lucide-react';
import { useSearch } from '../hooks/useSearch';
import { useCountUp } from '../hooks/useCountUp';
const AnimatedSearch = () => {

    const { query, setQuery, loading, searchResult } = useSearch()

    const AnimatedCount = ({ value }: { value: number }) => {
        const animatedValue = useCountUp(value || 0, 800);
        return <div className='result_count'>{animatedValue}</div>;
    };
    const setCardHeight = () => {
        if (query.length > 0) {
            return "400px"
        }
        return "60px"
    }

    return (
        <div className={`search_card ${query.length > 0 ? 'active' : ''}`} style={{ height: setCardHeight() }}>
            <div className="search_input_section">

                {
                    loading && query.length > 0 ?
                        <LoaderCircle style={{
                            animation: 'spin 1s linear infinite'
                        }} color='grey' /> :
                        <Search color='grey' />
                }


                <input placeholder="Searching is esier" value={query}
                    onChange={(e) => setQuery(e.target.value)} />
                {query.length > 0 ?
                    <button className='clear' onClick={() => setQuery("")}> clear</button>
                    :
                    <div className='quick_access'>
                        <button className='quick_access_btn'>S</button>
                        <span style={{ marginLeft: "5px" }}> quick access</span>
                    </div>
                }
            </div>

            {
                query.length > 0 &&
                < div className='search_result' >
                    <div className='search_result_header'>

                        <div className='filters_tab'>
                            <div className='tab'>
                                <div className='tab_lable'>All</div>
                                <div className='result_count'>
                                    <AnimatedCount value={searchResult?.counts.all || 0} />
                                </div>
                            </div>
                            <div className='tab'>
                                <Paperclip />
                                <div className='tab_lable'>Files</div>
                                <div className='result_count'>
                                    <AnimatedCount value={searchResult?.counts.files || 0} />
                                </div>
                            </div>
                            <div className='tab'>
                                <User />
                                <div className='tab_lable'>People</div>
                                <div className='result_count'>
                                    <AnimatedCount value={searchResult?.counts.people || 0} />
                                </div>
                            </div>
                        </div>
                        <div>
                            <Settings />
                        </div>
                    </div>
                </div>
            }
        </div >
    )
}

export default AnimatedSearch