import React from "react";

export const ClientContext = React.createContext({
  client: (window as any).config.client,
});

export default ClientContext;
