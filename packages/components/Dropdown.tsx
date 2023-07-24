import React, { useEffect, useRef, useState } from "react";
import {
  LayoutChangeEvent,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

import { DefaultValue, useDropdowns } from "../context/DropdownsProvider";

interface DropdownProps {
  children:
    | React.ReactNode
    | (({ closeOpenedDropdown }: Partial<DefaultValue>) => React.ReactNode);
  triggerComponent?: React.ReactNode;
  style?: ViewStyle;
  onDropdownClosed?: () => void;
  positionStyle?: ViewStyle;
}

export const Dropdown = ({
  style,
  children,
  triggerComponent,
  onDropdownClosed,
  positionStyle = {},
}: DropdownProps) => {
  const [, setLayout] = useState({
    height: 0,
    width: 0,
  });
  const {
    onPressDropdownButton,
    isDropdownOpen,
    closeOpenedDropdown,
    openedDropdownRef,
  } = useDropdowns();
  const dropdownRef = useRef<View>(null);

  const [copyDropdownOpen, setCopyDropdownOpen] = useState(false);

  useEffect(() => {
    if (copyDropdownOpen && !isDropdownOpen(dropdownRef)) {
      onDropdownClosed?.();
    }
    if (!copyDropdownOpen && isDropdownOpen(dropdownRef)) {
      setCopyDropdownOpen(true);
    }
  }, [copyDropdownOpen, isDropdownOpen, onDropdownClosed, openedDropdownRef]);

  const handleLayout = ({ nativeEvent: { layout } }: LayoutChangeEvent) => {
    setLayout(layout);
  };

  useEffect(() => {
    !triggerComponent && onPressDropdownButton(dropdownRef);
  }, [onPressDropdownButton, triggerComponent]);

  return (
    <View
      style={[{ position: "relative" }, style]}
      ref={dropdownRef}
      onLayout={handleLayout}
    >
      <TouchableOpacity onPress={() => onPressDropdownButton(dropdownRef)}>
        {triggerComponent}
      </TouchableOpacity>
      {isDropdownOpen(dropdownRef) && (
        <View
          style={[
            {
              position: "absolute",
              width: "auto",
              flex: 1,
              zIndex: 999,
            },
            positionStyle,
          ]}
        >
          {typeof children === "function"
            ? children({ isDropdownOpen, closeOpenedDropdown })
            : children}
        </View>
      )}
    </View>
  );
};