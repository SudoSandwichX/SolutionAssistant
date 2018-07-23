import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import { withStyles, Paper } from "@material-ui/core";
import { addNotification, removeNotification } from "../../redux";
import TreeView from "react-treeview";
import SplitPane from "react-split-pane";

import "../../assets/css/tree-view-styles.css";
import "../../assets/css/split-pane.css";

// This example data format is totally arbitrary. No data massaging is
// required and you use regular js in `render` to iterate through and
// construct your nodes.
const dataSource = [
  {
    type: "Entities",
    collapsed: false,
    entities: [
      {
        name: "Announcement",
        fields: [{ name: "subject" }],
        collapsed: false
      },
      {
        name: "Test Entity",
        fields: [{ name: "subject" }],
        collapsed: false
      }
    ]
  }
];

const styles = {};

class VersionControl extends React.Component {
  render() {
    return (
      <Paper>
        <SplitPane
          split="vertical"
          minSize={150}
          defaultSize={200}
          paneStyle={this.props.classes.relative}
        >
          <div>
            <div>
              {dataSource.map((node, i) => {
                const type = node.type;
                const label = <span className="node">{type}</span>;
                return (
                  <TreeView
                    key={type + "|" + i}
                    nodeLabel={label}
                    defaultCollapsed={false}
                  >
                    {node.entities.map(entity => {
                      const label2 = (
                        <span className="node">{entity.name}</span> // Header
                      );
                      const label3 = (
                        <span className="node">{"Fields"}</span> // Header 1
                      );
                      return (
                        <TreeView
                          key={entity.name}
                          nodeLabel={label2}
                          defaultCollapsed={false}
                        >
                          <TreeView
                            nodeLabel={label3}
                            key={entity.name + "_fields"}
                            defaultCollapsed={false}
                          >
                            {entity.fields.map(field => {
                              return <div className="info">{field.name}</div>;
                            })}
                          </TreeView>
                        </TreeView>
                      );
                    })}
                  </TreeView>
                );
              })}
            </div>
          </div>
          <div>
            <div className="pane-content"> Second Pane </div>
          </div>
        </SplitPane>
      </Paper>
    );
  }
}

VersionControl.propTypes = {
  onUpdatePackagerSetting: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  packagerSettings: state.packagerSettings
});

const mapActionsToProps = {
  onAddNotification: addNotification,
  onRemoveNotification: removeNotification
};

export default compose(
  connect(
    mapStateToProps,
    mapActionsToProps
  ),
  withStyles(styles)
)(VersionControl);
