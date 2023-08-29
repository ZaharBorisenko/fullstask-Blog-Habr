import ContentLoader from "react-content-loader"

const MyLoader = () => (
    <div style={{marginTop: "30px"}}>
        <ContentLoader
            speed={2}
            width={780}
            height={620}
            viewBox="0 0 780 620"
            backgroundColor="#c7c7c7"
            foregroundColor="#ecebeb"
        >
            <circle cx="31" cy="26" r="26" />
            <rect x="70" y="7" rx="2" ry="2" width="76" height="16" />
            <rect x="70" y="30" rx="2" ry="2" width="76" height="16" />
        </ContentLoader>
    </div>
)

export default MyLoader