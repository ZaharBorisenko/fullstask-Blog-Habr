import {useEffect} from 'react';

const BecomeAuthor = () => {
    useEffect(() => {
        document.title = "IT Odyssey | Author"
    },[])
    return (
        <div>
            СТРАНИЦА О ТОМ КАК НАЧАТЬ ПИСАТЬ СТАТЬИИИИИ
        </div>
    );
};

export default BecomeAuthor;