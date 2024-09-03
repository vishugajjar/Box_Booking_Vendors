
import {IconProvider} from '../components/appIcon';
import { ReactNode } from 'react';
import { DB_KEYS } from './fireStoreHelpers';
import * as ImagePicker from 'react-native-image-picker';

export type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  App: undefined;
  Auth: undefined;
  Mediator: undefined;
  Home: undefined;
  Bottom: undefined;
  Schedule: {
    item: FormDataType;
  };
  Form: undefined;
};

export type Root = {
  navigate: any;
  goBack: any;
  dispatch: any;
  replace: any;
  push: any;
};

export type UserTextInputType = {
  iconName: string;
  iconProvider: IconProvider;
  icon?: ReactNode;
  onVisible?: () => void;
};

export type FormModalType = {
  visible: boolean;
  onClose: () => void;
  data: FormDataType;
  selectedTime: string;
  selectedGround: GroundDetailsType;
  index: number;
};

export type DataType = {
  id: number;
  icon: string;
  number: string;
  desc: string;
  bgColor: string;
};

export type CardType = {
  data: DataType; 
};

export type groundListType = {
  title: string;
};
export type timeListType = {
  title: string;
  time: string;
};

export type TimeCardType = {
  dataItem: dayTimeListType[];
};
export type dayTimeListType = {
  id: number;
  time: string;
  booked: boolean;
};

export type TextInputFieldType = {
  title: string;
};

export type getFireStoreDataType = {
  collectionName: DB_KEYS;
  id?: string;
};

export type setFirestoreDataType<T> = {
  collectionName: DB_KEYS;
  id?: string;
  payload: T;
};

export type FormType = {
  visible: boolean;
  onClose: () => void;
};

export type categoryListType = {
  id: number;
  name: string;
};

export interface AmenitiesData {
  id: number;
  name: string;
  icon: string;
  iconProvider: IconProvider;
};

export type GroundDetailsType = {
  ground: string;
  groundSize: string;
  groundCategory: string;
  price: number;
  grassType: string;
  width: string;
  height: string;
  availableTime: TimeListType[];
};

export type FormDataType = {
  uid: string,
  name: string,
  emailId: string,
  contactNumber: string,
  numberOfGrounds: number,
  grounds: GroundDetailsType[]
  amenities: AmenitiesData[],
  description: string,
  address: string,
  photos: string[];
  id: string;
  location: any;
}

export type ScheduleScreenType = {
  route: {
    params: {
      item: FormDataType;
    }
  }
};

export interface Action {
  title: string;
  type: 'capture' | 'library';
  iconName: string;
  options: ImagePicker.CameraOptions | ImagePicker.ImageLibraryOptions;
}

export type ActionModalType = {
  showOptions: boolean;
  onClose: () => void;
  onButtonPress: (type: string, options: ImagePicker.CameraOptions | ImagePicker.ImageLibraryOptions) => void;
};

export type GroundCardType = {
  onGroundCount: () => void;
  item?: GroundDetailsType;
  index: number;
};

export type TimeListType = {
    id: number;
    time: string;
    duration: string;
    price: number;
    available: boolean;
    timing: dayTimeListType[];
  };

  export type updateFirestoreDataType<T> = {
    collectionName: DB_KEYS;
    id: string;
    payload: T;
  };

export type deleteFirestoreDataType = Pick<
  updateFirestoreDataType<string>,
  'collectionName' | 'id'
>;
