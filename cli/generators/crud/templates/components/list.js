import React, { PropTypes } from 'react';
import <%= ucName %> from './<%= ucName %>';

const <%= ucName %>List = ({ <%= pluralizedName %>, onClickDetail, onClickDelete }) => {
  let <%= pluralizedName %>View = <p>Sorry, there are no <%= pluralizedName %> to show. You can try to add one.</p>;
  if (<%= pluralizedName %>.length > 0) {
    <%= pluralizedName %>View = <%= pluralizedName %>.map((<%= name %>) =>
      <<%= ucName %>
        key={<%= name %>.id}
        id={<%= name %>.id}
        name={<%= name %>.name}
        onClickDetail={onClickDetail}
        onClickDelete={onClickDelete} />
    );
  }
  return (
    <div>
      {<%= pluralizedName %>View}
    </div>
  );
};

<%= ucName %>List.propTypes = {
  <%= pluralizedName %>: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired).isRequired,
  onClickDetail: PropTypes.func.isRequired,
  onClickDelete: PropTypes.func.isRequired
};

export default <%= ucName %>List;
