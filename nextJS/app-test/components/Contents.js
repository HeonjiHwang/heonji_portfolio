import Image from 'next/image'

const Contents = ({contents})=>{
    const BASE_URL = 'https://image.tmdb.org/t/p/original';
    
    return(
        <div style={{"userSelect":"none"}}>
            This is contents
            {
                contents.map((result) =>{
                    let src = `${BASE_URL}${result.backdrop_path || result.poster_path}`;
                    <Image src={src} layout="responsive"/>
                })
            }
        </div>
    )
}

export default Contents;