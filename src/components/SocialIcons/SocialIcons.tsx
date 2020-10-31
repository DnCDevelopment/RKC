import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import { ISocialNetworks } from './Types';

import './SocialIcons.scss';

const SOCIAL_ICONS_QUERY = graphql`
  {
    allCockpitSocialNetworks(filter: { lang: { eq: "any" } }) {
      nodes {
        icon {
          value
        }
        lang
        link {
          value
        }
      }
    }
  }
`;

const SocialIcons: React.FC = (): JSX.Element => {
  const {
    allCockpitSocialNetworks: { nodes },
  }: ISocialNetworks = useStaticQuery(SOCIAL_ICONS_QUERY);

  return (
    <div className="social-icons">
      {nodes.map(({ icon: { value: iconValue }, link: { value: linkValue } }) => (
        <a className="social-icon" key={linkValue} href={linkValue} target="_blanc" dangerouslySetInnerHTML={{ __html: iconValue }} />
      ))}
    </div>
  );
};

export default SocialIcons;
