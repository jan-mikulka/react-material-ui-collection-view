import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';

import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Toggle from 'material-ui/Toggle';

import ActionDone from 'material-ui/svg-icons/action/done';
import ActionVisibility from 'material-ui/svg-icons/action/visibility';

import * as h from '../helpers';
import * as uiActions from '../uiActions';
import * as dataActions from '../dataActions';

import RevizeMenu from './RevizeMenu';

class RevizeCollectionHeader extends React.Component {

  loadData() {
    this.props.dataActions.fetchData('revizes');
    this.props.dataActions.fetchData('materials');
    this.props.dataActions.fetchSimpleData('classes');
    this.props.dataActions.fetchSimpleData('uniques');
  }

  render() {
    const uiActions = this.props.uiActions;
    const dataActions = this.props.dataActions;
    const ui = this.props.ui.revizeCollection;
    const items = h.revizeFilter(this.props.items, ui);

    return (
        <div>
          <AppBar
            title="Revize"
            onLeftIconButtonTouchTap={() => uiActions.toggleDrawer({ open })}
            iconElementRight={<RevizeMenu />}
          />
          <Drawer
            docked={false}
            open={this.props.ui.drawer.open}
            onRequestChange={(open) => uiActions.toggleDrawer({ open: false })}
          >
            <List>
              <Subheader>Stránky</Subheader>
            </List>
            <List>
              <ListItem
                primaryText="Synchronizovat data"
                onTouchTap={() => this.loadData()}
              />
              <Subheader>Nastavení zobrazení</Subheader>
              <ListItem
                primaryText="Revize"
                leftIcon={<ActionVisibility />}
                initiallyOpen={false}
                primaryTogglesNestedList
                nestedItems={[
                  <ListItem
                    primaryText="K vykonání"
                    rightIcon={ui.scope == 'kVykonani' ? <ActionDone /> : ''}
                    key={1}
                    onTouchTap={() => uiActions.update2('revizeCollection', 'scope', 'kVykonani')}
                  />,
                  <ListItem
                    primaryText="K tisku"
                    rightIcon={ui.scope == 'kTisku' ? <ActionDone /> : ''}
                    key={2}
                    onTouchTap={() => uiActions.update2('revizeCollection', 'scope', 'kTisku')}
                  />,
                  <ListItem
                    primaryText="Odeslané"
                    rightIcon={ui.scope == 'historie' ? <ActionDone /> : ''}
                    key={3}
                    onTouchTap={() => uiActions.update2('revizeCollection', 'scope', 'historie')}
                  />,
                ]}
              />
              <ListItem
                primaryText="Sloupce"
                leftIcon={<ActionVisibility />}
                initiallyOpen={false}
                primaryTogglesNestedList
                nestedItems={[
                  <ListItem primaryText="HP - tlaková zkouška" key={1}
                    rightToggle={<Toggle toggled={ui.columns.otlakovat} onToggle={() => uiActions.toggle('revizeCollection', 'columns', 'otlakovat')} />}
                  />,
                  <ListItem primaryText="HP - k vyřazení" key={2}
                    rightToggle={<Toggle toggled={ui.columns.vyradit} onToggle={() => uiActions.toggle('revizeCollection', 'columns', 'vyradit')} />}
                  />,
                  <ListItem primaryText="Hydrant - C52" key={3}
                    rightToggle={<Toggle toggled={ui.columns.C52} onToggle={() => uiActions.toggle('revizeCollection', 'columns', 'C52')} />}
                  />,
                ]}
              />
              <ListItem
                primaryText="Součty"
                leftIcon={<ActionVisibility />}
                initiallyOpen={false}
                primaryTogglesNestedList
              />
            </List>
          </Drawer>
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
export default connect(mapStateToProps, mapDispatchToProps)(RevizeCollectionHeader);
