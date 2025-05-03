import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
type DatePickerProps = {
  startDate: Date | null;
  endDate: Date | null;
  setStartDate: (date: Date) => void;
  setEndDate: (date: Date) => void;
};

export default function DatePicker({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
}: DatePickerProps) {
  const [pickerVisible, setPickerVisible] = useState(false);
  const [pickingStart, setPickingStart] = useState(true);

  const openPicker = (isStart: boolean) => {
    setPickingStart(isStart);
    setPickerVisible(true);
  };

  const handleConfirm = (date: Date) => {
    if (pickingStart) {
      setStartDate(date);
    } else {
      setEndDate(date);
    }
    setPickerVisible(false);
  };

  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      <TouchableOpacity style={styles.box} onPress={() => openPicker(true)}>
        <Text style={styles.label}>Sortida</Text>
        <Text style={styles.date}>
          {startDate ? startDate.toLocaleDateString() : "Afegeix una data"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.box} onPress={() => openPicker(false)}>
        <Text style={styles.label}>Tornada</Text>
        <Text style={styles.date}>
          {endDate ? endDate.toLocaleDateString() : "Afegeix una data"}
        </Text>
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={pickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={() => setPickerVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
    margin: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  label: {
    color: "#666",
    fontSize: 14,
    marginBottom: 6,
  },
  date: {
    fontSize: 16,
    color: "#333",
  },
});
