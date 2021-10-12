/** @jsx jsx */
import * as React from "react";
import { SerializedStyles } from "@emotion/react";
import { LoaderSizeProps } from "./interfaces";
declare class Loader extends React.PureComponent<Required<LoaderSizeProps>> {
    static defaultProps: Required<LoaderSizeProps>;
    style: () => SerializedStyles;
    render(): JSX.Element | null;
}
export default Loader;
