import useSWR from 'swr';

const BASE_URL = 'https://api.themoviedb.org/3/genre/movie/list';
const API_KEY = process.env.API_KEY;

const fetcher = async(url)=>{
    console.log("??")
    const res = await fetch(url);
    const data = await res.json();

    if(res.status !== 200)
        console.error(data.message);

    console.log(data);
    return data;
}

const Nav = ()=>{
    const {data, error} = useSWR(()=>`${BASE_URL}?api_key=${API_KEY}&language=ko`, fetcher);
    if(error) return <div>{error.message}</div>
    if(!data) return <div>Loading...</div>
    
    return(
        <nav className="relative">
            <div className="flex px-10 sm:px-20 test-2xl whitespace-nowrap space-x-10 sm:space-x-20">
                {
                    data.genres.map((menu, idx)=> idx < 5 && 
                        <h2 key={idx} className="last:pr-24 cursor-pointer transition duration-100 transform hover:scale-125 hover:text-white active:text-red-500">
                            {menu.name}
                        </h2>
                    )
                }
            </div>
        </nav>
    )
}

export default Nav;