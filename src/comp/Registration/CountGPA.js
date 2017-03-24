import React from 'react';
import { Picker } from 'react-native';

const Count = ({ onValueChange, selectedValue }) => {
  return (
    <Picker
      style={{ flex: 1 }}
      selectedValue={selectedValue}
      onValueChange={onValueChange}
    >
    <Picker.Item label='FAIL (<5)' value={4} />
    <Picker.Item label='5.0' value={5.0} />
    <Picker.Item label='5.2' value={5.2} />
    <Picker.Item label='5.4' value={5.4} />
    <Picker.Item label='5.6' value={5.6} />
    <Picker.Item label='5.8' value={5.8} />
    <Picker.Item label='6.0' value={6.0} />
    <Picker.Item label='6.2' value={6.2} />
    <Picker.Item label='6.4' value={6.4} />
    <Picker.Item label='6.6' value={6.6} />
    <Picker.Item label='6.8' value={6.8} />
    <Picker.Item label='7.0' value={7.0} />
    <Picker.Item label='8.0' value={8.0} />
    <Picker.Item label='8.2' value={8.2} />
    <Picker.Item label='8.4' value={8.4} />
    <Picker.Item label='8.6' value={8.6} />
    <Picker.Item label='8.8' value={8.8} />
    <Picker.Item label='9.0' value={9.0} />
    <Picker.Item label='9.2' value={9.2} />
    <Picker.Item label='9.4' value={9.4} />
    <Picker.Item label='9.6' value={9.6} />
    <Picker.Item label='9.8' value={9.8} />
    <Picker.Item label='10.0' value={10.0} />
    </Picker>
  );
};

export default Count;
