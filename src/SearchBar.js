import { useEffect, useRef, useState } from "react";
import QuiltedImageList from './QuiltedImageList';
import noresults from './empty.svg';

const SearchBar = () => {

    const [isLoading, setLoading] = useState(false);
    const [images, setImages] = useState(null);
    const searchInput = useRef();
    const [page,setPage]=useState(1);
    const [totalPage,setTotalPage]=useState(0);
    const key = process.env.REACT_APP_ACCESS_KEY

    const fetchImage= ()=>{
        setLoading(true);
        setTimeout(()=>{
            fetch(`https://api.unsplash.com/search/photos?&query=${searchInput.current.value}&client_id=${key}&page=${page}&per_page=9`)
            .then((res)=>{
                if(!res.ok) throw Error('Could not fetch!')
                return res.json();
            })
            .then((data)=>{
                setTotalPage(data.total_pages);
                data=data.results;
                setLoading(false);
                setImages(data);
            })
            .catch((err)=>{
                setLoading(false);
                console.log(err);
                setPage(1);
            })
        },2000)
    }

    const handleSearch = (event)=>{
        event.preventDefault();
        fetchImage();
    }

    useEffect(()=>{
        fetchImage();
    },[page]);

    return (
        <div className="SearchBar">
            <form action="" onSubmit={(event)=>handleSearch(event)}>
                <div className="field p-4">
                    <input ref={searchInput} type="search" onChange={(event)=>{handleSearch(event)}} maxLength="50" minLength="1" placeholder="Search" className="w-full bg-slate-200 p-2 rounded text-xl"/>
                </div>
            </form>
            {!images && <div className="flex justify-center"><img src={noresults} alt="" width="30%"/></div>}
            {!isLoading && images && <QuiltedImageList data={images}/>}
            {isLoading && <div className="px-4 text-center text-xl py-2">Loading...</div>}
            <div className="pagination flex justify-center mb-10 gap-x-4">
                {!isLoading && page>1 && <button className="px-4 py-2 bg-blue-500 text-white font-bold rounded" onClick={()=>{setPage(page-1)}}>Previous</button>}
                {!isLoading && page<totalPage && <button className="px-4 py-2 bg-blue-500 text-white font-bold rounded" onClick={()=>{setPage(page+1)}}>Next</button>}
            </div>
            <footer className="p-4 flex justify-center">
                <div className="">Powered by Unsplash Image API</div>
                <div className="ml-6">&copy; Copyright Azim Ahmed Bijapur 2024</div>
                
            </footer>
        </div>
    );
}
 
export default SearchBar;