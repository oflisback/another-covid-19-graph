import GraphWithQuery from "containers/GraphWithQuery";
import GraphWithStatic from "containers/GraphWithStatic";
import React from "react";
import SettingsPanel from "containers/SettingsPanel";

export default () => (
  <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'stretch', width: '100%' }}>
    <SettingsPanel />
    {process.env.NODE_ENV === "production" || process.env.REACT_APP_STATIC_DATA === 'false' ? <GraphWithQuery /> : <GraphWithStatic />}
  </div>
)
