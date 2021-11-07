import * as React from 'react';
import UseButtonProps from './UseButtonProps';
export default function useButton(props: UseButtonProps): {
    getRootProps: (otherHandlers?: Record<string, (event: any) => void> | undefined) => {
        tabIndex: number;
        type: "button" | "reset" | "submit" | undefined;
        ref: (instance: HTMLElement | null) => void;
    };
    focusVisible: boolean;
    setFocusVisible: React.Dispatch<React.SetStateAction<boolean>>;
    disabled: boolean;
    active: boolean;
};
