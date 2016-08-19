import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Grid, Row, Col } from 'react-bootstrap';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';

import * as h from '../helpers';
import * as uiActions from '../uiActions';
import * as dataActions from '../dataActions';
import { revizeCollection } from '../style.js';

import RevizeCollectionHeader from './RevizeCollectionHeader';
import RevizeCollectionTable from './RevizeCollectionTable';

class RevizeCollection extends React.Component {

  render() {
    const uiActions = this.props.uiActions;
    const dataActions = this.props.dataActions;
    const ui = this.props.ui.revizeCollection;
    const items = h.revizeFilter(this.props.items, ui);

    return (
        <div>
          <RevizeCollectionHeader />
          <Grid fluid>
            <Row>
              <Col md={12}>
                <RevizeCollectionTable />
                <DatePicker
                  value={ui.filter.termin_to ? new Date(ui.filter.termin_to) : undefined}
                  // formatDate={h.dateFormat.format}
                  floatingLabelText="Termín"
                  name="termin"
                  autoOk
                  onChange={(n, value) => uiActions.update('revizeCollection', 'filter', 'termin_to', (moment(value).format('YYYY-MM-DD') + ' 23:59:59'))}
                /><br />
                <RaisedButton
                  type="button"
                  label="Přidat další položku"
                  secondary
                />
              </Col>
            </Row>
          </Grid>
        </div>
      );
  }
}

function mapStateToProps(state) {
  return {
    data: state.data.entities,
    ui: state.ui,
    items: state.data.entities.revize,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    uiActions: bindActionCreators(uiActions, dispatch),
    dataActions: bindActionCreators(dataActions, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(RevizeCollection);
