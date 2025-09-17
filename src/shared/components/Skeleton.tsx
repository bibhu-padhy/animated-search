const Skeleton = ({ isActive = false, count = 1 }) => {

    return (
        <>
            {
                isActive &&
                Array.from({ length: count }).map((_, index) => (
                    <div key={index} className="skeleton"
                        style={{ '--skeleton-index': index } as React.CSSProperties}>
                        <div className="skeleton_icon"></div>
                        <div className="skeleton_strips">
                            <div className="skeleton_strip_1"></div>
                            <div className="skeleton_strip_2"></div>
                        </div>
                    </div >
                ))
            }
        </>
    )

}

export default Skeleton