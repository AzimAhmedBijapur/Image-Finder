import * as React from 'react';
import { useState } from 'react';
import noresults from './empty.svg';

export default function QuiltedImageList({data}) {
  return (
    <>
    { data.length===0 && <div className="flex justify-center mt-10"><img src={noresults} alt="" width="30%"/></div>}
    { data.length!==0 &&
      data && 
    <div className="ImageList grid grid-cols-2 p-6 gap-4 sm:grid-cols-2 md:grid-cols-3">
      {data && data.map((item) => (
        <a key={item.id} href={item.links.download} download >
          <div key={item.id} style={{position:"relative"}} className='w-full h-full' >
            <img
              alt={item.title}
              src={item.urls.small}
              className='rounded object-cover	w-full h-full'
            />
            <span className="m-1 rounded" style={{ position: "absolute", zIndex: "3", bottom: "0", color: "white", backgroundColor: "rgba(0, 0, 0, 0.5)", padding: "0.2rem" }}>{'By '+item.user.name}</span>
            </div>
        </a>
      ))}
    </div>
    } 
    </>
  );
}