import GraphWithQuery from "containers/GraphWithQuery";
import GraphWithStatic from "containers/GraphWithStatic";
import React from "react";
import SettingsPanel from "containers/SettingsPanel";

export default () => (
  <>
    <SettingsPanel />
    {process.env.NODE_ENV === "production" || process.env.REACT_APP_STATIC_DATA === 'false' ? <GraphWithQuery /> : <GraphWithStatic />}
  </>
)