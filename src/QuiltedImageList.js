import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import noresults from './empty.svg';

function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

export default function QuiltedImageList({data}) {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.up('md'));
  const rowsHeight = isLargeScreen ? 400 : (isMediumScreen ? 300 : 200); 


  return (
    <>
    { data.length===0 && <div className="flex justify-center mt-10"><img src={noresults} alt="" width="30%"/></div>}
    { data.length!==0 &&
      data && 
    <ImageList
      style={{padding:"1rem"}}
      variant="quilted"
      cols={isLargeScreen ? 3 : (isMediumScreen ? 2 : 2)}
      rowHeight={rowsHeight}
    >
      {data && data.map((item) => (
        <a key={item.id} href={item.links.download} download>
          <ImageListItem cols={item.cols || 1} key={item.id} rows={item.rows || 1}>
            <img
              {...srcset(item.urls.small, 121, item.rows, item.cols)}
              alt={item.title}
              loading="lazy"
              className='rounded'
            />
            <ImageListItemBar
            // title={item.description}
            title={'By '+item.user.name}
            />
          </ImageListItem>
        </a>
      ))}
    </ImageList>
    } 
    </>
  );
}