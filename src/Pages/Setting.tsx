import {Button} from '@rneui/base';
import {useEffect, useRef, useState, useCallback} from 'react';
import {View} from 'react-native';
import {
  useCameraDevice,
  Camera,
  useCameraPermission,
  CameraDevice,
} from 'react-native-vision-camera';

export default function Setting() {
  let device = useCameraDevice('back');
  const {hasPermission, requestPermission} = useCameraPermission();
  const [show, setShow] = useState<boolean>(true);
  const camera = useRef<Camera>(null);
  const [canTake, setCantake] = useState(false);
  useEffect(() => {
    if (hasPermission) {
      setShow(true);
    } else {
      requestPermission();
      setShow(false);
    }
  }, [hasPermission,show]);
  if (device == null) {
    return null;
  }
  const Initialized = () => {
    setCantake(true);
  };
  const takephoto = () => {
    if (hasPermission) {
      if (canTake) {
        if (camera.current) {
          camera.current
            .takePhoto()
            .then(pciture => {
              console.log(pciture);
            })
            .catch(e => {
              console.log('拍照时错误', e);
            });
        }
      }
    }
  };

  if(device == null){
    return null
  }
  return (
    <View>
      {
        show ? (<Camera
          style={{width: 300, height: 300}}
          ref={camera}
          device={device}
          isActive={true}
          onError={e => console.log('运行时错误', e)}
          photo={true}
          onInitialized={Initialized}
          video={true} //录像功能打开关闭
        />) : null
      }
      <Button title={'点击拍照'} onPress={takephoto}></Button>
    </View>
  );
}
