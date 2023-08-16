import React from "react"
import ContentLoader from "react-content-loader"
import st from '../Post/Post.module.scss';

const MyLoader = (props) => (
    <div className={st.post}>
        <ContentLoader className={st.container}
            speed={2}
            width={780}
            height={620}
            viewBox="0 0 780 620"
            backgroundColor="#c7c7c7"
            foregroundColor="#ecebeb"
            {...props}
        >
            <rect x="60" y="6" rx="3" ry="3" width="77" height="20" />
            <circle cx="21" cy="16" r="16" />
            <rect x="150" y="8" rx="2" ry="2" width="181" height="15" />
            <rect x="6" y="47" rx="2" ry="2" width="500" height="24" />
            <rect x="6" y="88" rx="2" ry="2" width="65" height="19" />
            <rect x="92" y="88" rx="2" ry="2" width="66" height="19" />
            <rect x="170" y="88" rx="2" ry="2" width="42" height="19" />
            <rect x="7" y="120" rx="2" ry="2" width="100" height="16" />
            <rect x="124" y="120" rx="2" ry="2" width="100" height="16" />
            <rect x="6" y="150" rx="0" ry="0" width="740" height="350" />
            <rect x="6" y="525" rx="2" ry="2" width="110" height="36" />
            <rect x="6" y="580" rx="2" ry="2" width="36" height="27" />
        </ContentLoader>
    </div>
)

export default MyLoader