import Thumbnail from './Thumbnail';

const Contents = ({contents})=>{
    
    return(
        <div style={{"userSelect":"none"}}>
            This is contents
            {
                contents.map((result) =><Thumbnail key={result.id} content={result}/>)
            }
        </div>
    )
}

export default Contents;