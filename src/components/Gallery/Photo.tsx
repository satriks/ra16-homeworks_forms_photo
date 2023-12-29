interface Photo {
    id: string;
    url : string;
}

interface Props {
    photos : Photo[];
    onDel: (event: React.DOMAttributes<HTMLSpanElement>) => void 
}


const Photo = ({photos, onDel} : Props) => {

    return (
            photos.map (photo => {
                return (
                <div className="photo" key={photo.id} id={photo.id}>
                    <img className="photo__img" src={photo.url} alt="" />
                    <span className="photo__close" onClick={onDel}>{"X"}</span>
                 </div>
                )

            })
               
                
    )
}


export default Photo