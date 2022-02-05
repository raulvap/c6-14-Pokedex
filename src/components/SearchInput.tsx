import {View, StyleSheet, StyleProp, ViewStyle, TextInput} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDebouncedValue} from '../hooks/useDebouncedValue';

interface Props {
  style?: StyleProp<ViewStyle>;
  onDebounce: (value: string) => void;
}

export default function SearchInput({style, onDebounce}: Props) {
  const [textValue, setTextValue] = useState('');

  // Vamos a utilizar el debounced value para retrasar la búsqueda: (clase 268)
  const debouncedValue = useDebouncedValue(textValue, 1000);

  useEffect(() => {
    onDebounce(debouncedValue);
  }, [debouncedValue]);

  return (
    <View style={{...stylesComp.container, ...(style as any)}}>
      <View style={{...stylesComp.textBackground}}>
        <TextInput
          placeholder="Search Pokemon"
          style={stylesComp.textInput}
          autoCapitalize="none"
          autoCorrect={false}
          value={textValue}
          onChangeText={setTextValue}
        />
        <Icon name="search-outline" color="grey" size={30} />
      </View>
    </View>
  );
}

const stylesComp = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
  },
  textBackground: {
    marginVertical: 20,
    backgroundColor: '#f3f1f3',
    borderRadius: 50,
    height: 45,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,

    elevation: 8,
  },
  textInput: {
    flex: 1,
    fontSize: 18,
  },
});
