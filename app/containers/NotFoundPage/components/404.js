import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage, injectIntl } from 'react-intl';
import Helmet from 'react-helmet';

import messages from '../messages';

const pageMessage = <FormattedMessage {...messages.page_message} />;
const backLink = <FormattedMessage {...messages.back_link} />;

const Error404 = () => (
  <div className="err-container text-center">
    <div className="err">
      <h1>404</h1>
      <h2>{pageMessage}</h2>
    </div>

    <div className="err-body">
      <Link to="/" className="btn btn-raised btn-lg btn-default">
        {backLink}
      </Link>
    </div>
  </div>
);

const Page = injectIntl(({ intl }) => (
  <div className="page-err">
    <Helmet>
      <title>{intl.formatMessage(messages.tab_title)}</title>
    </Helmet>
    <div>
      <Error404 />
    </div>
  </div>
));

export default Page;
