import * as React from 'react';
import { IHomeGamesProps } from './IHomeGamesProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { App } from './AppForm/App';

export default class HomeGames extends React.Component<IHomeGamesProps, {}> {
  public render(): React.ReactElement<IHomeGamesProps> {
    return (
      <div className="backgroundApp">
        <App siteUrl={this.props.siteUrl}/>
      </div>
    );
  }
}
