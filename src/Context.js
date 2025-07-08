import React, {createContext} from "react";
export const ExtraContext = createContext({
    extra: false,
    setExtra: () => {}
});
