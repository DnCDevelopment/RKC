import React, { Fragment } from 'react';
import { Link } from 'gatsby';

import { IBreadcrumbsProps } from './Types';

import './Breadcrumbs.scss';

const Breadcrumbs: React.FC<IBreadcrumbsProps> = ({ crumbs }): JSX.Element => {
  return (
    <div className="breadcrumbs">
      {crumbs.map(({ title, link }, idx) => (
        <Fragment key={`${title}_${link}_crumb`}>
          <Link to={link} className="breadcrumbs-link">
            {title}
          </Link>
          {idx !== crumbs.length - 1 && <span className="breadcrumbs-dot" />}
          {idx === 1 && crumbs.length !== 2 && <span className="breadcrumbs-break" />}
        </Fragment>
      ))}
    </div>
  );
};

export default Breadcrumbs;
