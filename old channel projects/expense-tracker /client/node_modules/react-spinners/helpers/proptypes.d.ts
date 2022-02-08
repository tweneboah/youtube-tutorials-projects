import { LoaderHeightWidthProps, LoaderSizeProps, LoaderSizeMarginProps, LoaderHeightWidthRadiusProps } from "../interfaces";
export declare function sizeDefaults(sizeValue: number): Required<LoaderSizeProps>;
export declare function sizeMarginDefaults(sizeValue: number): Required<LoaderSizeMarginProps>;
export declare function heightWidthDefaults(height: number, width: number): Required<LoaderHeightWidthProps>;
export declare function heightWidthRadiusDefaults(height: number, width: number, radius?: number): Required<LoaderHeightWidthRadiusProps>;
