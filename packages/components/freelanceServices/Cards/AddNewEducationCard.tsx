import React, { useState } from "react";
import { View } from "react-native";

import { SecondaryButton } from "../../../components/buttons/SecondaryButton";
import { EducationInfo } from "../../../screens/FreelanceServices/types/fields";
import {
  secondaryColor,
  neutral33,
  neutral00,
} from "../../../utils/style/colors";
import { TertiaryBox } from "../../boxes/TertiaryBox";
import { TextInputCustom } from "../../inputs/TextInputCustom";

export const AddNewEducationCard: React.FC<{
  value?: EducationInfo;
  onClose: () => void;
  onAdd: (educationInfo: EducationInfo) => void;
}> = ({ value, onClose, onAdd }) => {
  const [title, setTitle] = useState(value ? value.title : "");
  const [description, setDescription] = useState(
    value ? value.description : ""
  );
  return (
    <TertiaryBox fullWidth style={{ marginTop: 12, zIndex: 1 }}>
      <View style={{ width: "100%", padding: 10 }}>
        <TextInputCustom
          label=""
          name="title"
          placeHolder="College/University Name"
          value={title}
          style={{ marginTop: 5 }}
          onChangeText={setTitle}
        />
        <TextInputCustom
          label=""
          name="description"
          placeHolder="Description"
          value={description}
          style={{ marginTop: 5 }}
          onChangeText={setDescription}
        />
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "center",
            marginTop: 20,
          }}
        >
          <SecondaryButton
            size="SM"
            text="Cancel"
            color={secondaryColor}
            backgroundColor={neutral33}
            style={{
              marginRight: 10,
            }}
            onPress={onClose}
          />
          <SecondaryButton
            size="SM"
            text={value ? "Update" : "Add"}
            color={neutral00}
            backgroundColor={secondaryColor}
            style={{ marginLeft: 10 }}
            onPress={() => {
              if (title.trim() === "") return;
              if (description.trim() === "") return;
              onAdd({ title, description } as EducationInfo);
              onClose();
            }}
          />
        </View>
      </View>
    </TertiaryBox>
  );
};