import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as h from '../helpers';

import * as uiActions from '../uiActions';
import * as dataActions from '../dataActions';

import Paper from 'material-ui/Paper';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow } from 'material-ui/Table';

import { revizeCollection } from '../style.js';
import RevizeItem from './RevizeItem';

class RevizeCollectionTable extends React.Component {

  constructor() {
    super();
    this.onRowSelection.bind(this);
  }

  onRowSelection(items, selected) {
    let selection = [];
    switch (selected) {
      case 'all': selection = items.map(item => item.id); break;
      case 'none': selection = []; break;
      default: selection = selected.map(key => items[key].id); break;
    }
    this.props.uiActions.update2('revizeCollection', 'selected', selection);
  }

  render() {
    const uiActions = this.props.uiActions;
    const dataActions = this.props.dataActions;
    const ui = this.props.ui.revizeCollection;
    const items = h.revizeFilter(this.props.items, ui);

    return (
      <Paper style={{ marginTop: '20px' }}>
        <Table
          selectable
          multiSelectable
          onRowSelection={this.onRowSelection.bind(this, items)}
        >
          <TableHeader
            adjustForCheckbox
            displaySelectAll
            enableSelectAll
          >
            <TableRow>
              <TableHeaderColumn style={revizeCollection.tableRowColumnName}>Adresa</TableHeaderColumn>
              <TableHeaderColumn style={revizeCollection.tableRowColumnCount}>Hyd</TableHeaderColumn>
              <TableHeaderColumn style={revizeCollection.tableRowColumnCount}>hp</TableHeaderColumn>
              { ui.columns.otlakovat && <TableHeaderColumn
                style={revizeCollection.tableRowColumnCount}
              >TZ
              </TableHeaderColumn>}
              { ui.columns.vyradit && <TableHeaderColumn
                style={revizeCollection.tableRowColumnCount}
              >vyř.
              </TableHeaderColumn>}
              { ui.columns.C52 && <TableHeaderColumn
                style={revizeCollection.tableRowColumnCount}
              >C52
              </TableHeaderColumn> }
              { (ui.scope == 'kVykonani') && <TableHeaderColumn style={revizeCollection.tableRowColumnDate}>Termín</TableHeaderColumn>}
              { (ui.scope != 'kVykonani') && <TableHeaderColumn style={revizeCollection.tableRowColumnDate}>Provedena</TableHeaderColumn>}
              <TableHeaderColumn></TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox
          >
            {Object.keys(items).map(key => {
              return (
                <RevizeItem
                  key={'item-' + key}
                  item={items[key]}
                  rowNumber={items[key].id}
                />
              );
            }, this)}
         </TableBody>
       </Table>
      </Paper>
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
export default connect(mapStateToProps, mapDispatchToProps)(RevizeCollectionTable);
