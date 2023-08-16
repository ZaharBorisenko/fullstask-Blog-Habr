import React from "react"
import ContentLoader from "react-content-loader"

const MyLoader = (props) => (
    <div style={{maxHeight: "410px"}}>
        <ContentLoader
            speed={2}
            width={780}
            height={620}
            viewBox="0 0 780 620"
            backgroundColor="#c7c7c7"
            foregroundColor="#ecebeb"
            {...props}
        >
            <rect x="5" y="5" rx="2" ry="2" width="200" height="112" />
            <rect x="5" y="140" rx="2" ry="2" width="120" height="16" />
            <rect x="5" y="165" rx="2" ry="2" width="120" height="31" />
            <rect x="5" y="217" rx="2" ry="2" width="120" height="16" />
            <rect x="5" y="243" rx="2" ry="2" width="120" height="31" />
        </ContentLoader>
    </div>
)

export default MyLoader