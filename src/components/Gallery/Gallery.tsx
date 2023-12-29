import { useRef, useState } from "react";
import Photo from "./Photo";
import { v4 } from "uuid"


interface Photo {
    id: string;
    url: string;
}


const Gallery = () => {
    const [photos, setPhoto] = useState([])
    const inputFile  = useRef<HTMLInputElement>(null)


    const selectFile = () => {
         inputFile.current?.click()
    }



    const fileToDataUrl = (file : File) => {
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
        
          fileReader.addEventListener('load', evt  => {
            resolve(evt.currentTarget.result);
          });
          
          fileReader.addEventListener('error', evt  => {
            reject(new Error(evt.currentTarget.error));
          });
          
          fileReader.readAsDataURL(file);
        });
      }
      
      const handleSelect = async (evt) => {
          const files = [...evt.target.files];
          const urls: {url : string }[] = await Promise.all(files.map(o =>  fileToDataUrl(o)));
          const data : Photo[] = urls.map(el => {return { id : v4() , url : el}});
        setPhoto([...photos, ...data])
        evt.target.value = ""
          // У вас в массиве - dataUrl, можете использовать в качестве значения атрибута src тега img
      }

      const delFile = (evt: React.ChangeEvent<HTMLSpanElement> | undefined)  => {

        const id = evt?.target.closest(".photo")?.id      
        const newPhotos = [...photos].filter(el => {return  !(el.id == id)})

        setPhoto(newPhotos)      
        
        
      }
    
    return (
        <div className="photo__wrapper">
            <div className="photo__margin"></div>
            <div className="photo__select" onClick={selectFile}>
                <input type="file" className="photo__input hidden" ref={inputFile} accept="image/*" multiple={true} onChange={handleSelect}></input>
                {"Select file"}
            </div>
            <div className="photo__gallery">
                <Photo photos={photos} onDel ={delFile}/>
              
            </div>
            <div className="photo__margin"></div>

        </div>
    )
}


export default Gallery