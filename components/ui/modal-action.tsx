import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const MoreAction = () => {
  const router = useRouter();
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <>
      <TouchableOpacity onPress={openMenu}>
        <Feather name="more-vertical" size={25} style={{ marginLeft: 8 }} />
      </TouchableOpacity>
      <Modal
        visible={visible}
        transparent={true}
        animationType="fade"
        style={{ backgroundColor: 'transparent' }}>
        <SafeAreaView style={{ flex: 1 }}>
          <TouchableOpacity style={{ flex: 1 }} onPress={closeMenu} activeOpacity={1} />
          <View
            className={'absolute rounded bg-white  p-4 shadow-md'}
            style={{ right: 15, top: 42 }}>
            <TouchableOpacity
              onPress={() => {
                router.push('/');
                closeMenu();
              }}>
              <Text className={'p-2 text-lg'}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                router.push('/favorite');
                closeMenu();
              }}>
              <Text className={'p-2 text-lg'}>Favorite</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                router.push('/captain');
                closeMenu();
              }}>
              <Text className={'p-2 text-lg'}>Captain</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>
    </>
  );
};

export default MoreAction;
