/** @jsx jsx */
import * as React from "react";
import { SerializedStyles } from "@emotion/react";
import { LoaderSizeProps } from "./interfaces";
declare class Loader extends React.PureComponent<Required<LoaderSizeProps>> {
    static defaultProps: Required<LoaderSizeProps>;
    moonSize: () => number;
    ballStyle: (size: number) => SerializedStyles;
    wrapper: () => SerializedStyles;
    ball: () => SerializedStyles;
    circle: () => SerializedStyles;
    render(): JSX.Element | null;
}
export default Loader;
