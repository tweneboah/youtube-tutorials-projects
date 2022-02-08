/** @jsx jsx */
import * as React from "react";
import { SerializedStyles } from "@emotion/react";
import { Keyframes } from "@emotion/serialize";
import { LoaderSizeProps } from "./interfaces";
declare class Loader extends React.PureComponent<Required<LoaderSizeProps>> {
    static defaultProps: Required<LoaderSizeProps>;
    thickness: () => number;
    lat: () => number;
    offset: () => number;
    color: () => string;
    before: () => Keyframes;
    after: () => Keyframes;
    style: (i: number) => SerializedStyles;
    wrapper: () => SerializedStyles;
    render(): JSX.Element | null;
}
export default Loader;
