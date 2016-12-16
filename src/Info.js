import isEmpty from 'lodash/isEmpty';
import React from 'react';


export default class Info extends React.Component {
  render() {
    const info = this.props.info;
    console.log(info);
    if (isEmpty(info)) {
      return (
        <div>
          <h1>Error</h1>
          <p>해당 회원은 존재하지 않습니다!</p>
        </div>
      );
    }
    return (
      <div>
        <h1><a href={info.html_url}>{info.name}</a></h1>
        <dl>
          {info.blog && <dt>Blog</dt>}
          {info.blog && <dd>{info.blog}</dd>}
          <dt>Public Repos</dt>
          <dd>{info.public_repos}</dd>
          <dt>Public Gists</dt>
          <dd>{info.public_gists}</dd>
          <dt>Followers</dt>
          <dd>{info.followers}</dd>
          <dt>Following</dt>
          <dd>{info.following}</dd>
        </dl>
      </div>
    );
  }
}

Info.propTypes = {
  html_url: React.PropTypes.string,
  name: React.PropTypes.string,
  blog: React.PropTypes.string,
  public_repos: React.PropTypes.string,
  public_gists: React.PropTypes.string,
  followers: React.PropTypes.number,
  following: React.PropTypes.number,
};
