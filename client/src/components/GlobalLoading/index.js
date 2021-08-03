import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import './style.css';

function GlobalLoading(props) {
  const { showLoading, loadingFull } = props;
  let xhtml = null;
  if (showLoading && loadingFull) {
    xhtml = (
      <div className="global-loading">
        <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
      </div>
    );
  }
  else if (showLoading) {
    xhtml = (
      <div className="global-loading not-full">
        <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
      </div>
    );
  }
  return xhtml;
}

GlobalLoading.propTypes = {
  showLoading: PropTypes.bool,

};

const mapStateToProps = state => {
  return {
    showLoading: state.ui?.showLoading,
    loadingFull: state.ui?.loadingFull
  };
};

const withConnect = connect(
  mapStateToProps,
  null,
);

export default compose(
  withConnect
)(GlobalLoading);
