import {ThumbUpIcon} from "@heroicons/react/outline";
import Image from "next/image";

const Thumbnail = ({content})=>{
    const BASE_URL = "https://image.tmdb.org/t/p/original";

    return(
        <div className="p-2 group cursor-pointer opacity-70 transition duration-200 ease-in hover:opacity-100">
            <Image src={`${BASE_URL}${content.backdrop_path || content.poster_path}`} height={"360px"} width={"640px"} layout="responsive"/>

            <div className="p-2">
                <p className="truncate max-w-md">{content.overview}</p>
                <h2 className="mt-1 text-2xl text-white transition-all duration-100 ease-in-out group-hover:font-bold">
                    {content.title || content.original_name}
                </h2>
                <p className="flex items-center opacity-0 group-hover:opacity-100">
                    {content.media_type && `${content.media_type}`}{" "}
                    {content.release_date || content.first_air_date}{" "}
                    <ThumbUpIcon className="h-5 mx-2"/>{content.vote_count}
                </p>
            </div>
        </div>
    )
}

export default Thumbnail;