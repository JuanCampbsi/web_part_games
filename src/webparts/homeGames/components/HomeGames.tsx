import React from 'react';
import { IHomeGamesProps } from './IHomeGamesProps';
import { Routes } from './Routes';

export default function HomeGamess({ siteUrl }: IHomeGamesProps) {
  return (
    <>
      <div className="backgroundApp">
        <Routes siteUrl={siteUrl}/>
      </div>
    </>
  )
}

