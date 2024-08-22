import { IconProvider } from "../components/appIcon";
import { AppColors } from "../styles/colors";
import { Action, AmenitiesData, categoryListType, dayTimeListType, TimeListType } from "./types";

export const eveningTimeList: dayTimeListType[] = [
    {
      id: 12,
      time: '06:00pm To 07:00pm',
      booked: false,
      duration: 'Evening',
      price: 600,
      available: true,
    },
    {
      id: 13,
      time: '07:00pm To 08:00pm',
      booked: false,
      duration: 'Evening',
      price: 900,
      available: true,
    },
    {
      id: 14,
      time: '08:00pm To 09:00pm',
      booked: false,
      duration: 'Evening',
      price: 900,
      available: true,
    },
    {
      id: 15,
      time: '09:00pm To 10:00pm',
      booked: true,
      duration: 'Evening',
      price: 900,
      available: true,
    },
    {
      id: 16,
      time: '10:00pm To 11:00pm',
      booked: true,
      duration: 'Evening',
      price: 900,
      available: true,
    },
    {
      id: 17,
      time: '11:00pm To 12:00pm',
      booked: false,
      duration: 'Evening',
      price: 900,
      available: true,
    },
    {
      id: 18,
      time: '12:00am To 01:00am',
      booked: false,
      duration: 'Evening',
      price: 900,
      available: true,
    },
  ];

  export const morningTimeList: dayTimeListType[] = [
    {
      id: 1,
      time: '07:00am To 08:00am',
      booked: false,
      duration: 'Morning',
      price: 600,
      available: true,
    },
    {
      id: 2,
      time: '08:00am To 09:00am',
      booked: false,
      duration: 'Morning',
      price: 600,
      available: true,
    },
    {
      id: 3,
      time: '09:00am To 10:00am',
      booked: false,
      duration: 'Morning',
      price: 600,
      available: true,
    },
    {
      id: 4,
      time: '10:00am To 11:00am',
      booked: true,
      duration: 'Morning',
      price: 600,
      available: true,
    },
    {
      id: 5,
      time: '11:00am To 12:00pm',
      booked: false,
      duration: 'Morning',
      price: 600,
      available: true,
    },
  ];

  export const afternoonTimeList: dayTimeListType[] = [
    {
      id: 6,
      time: '12:00pm To 01:00pm',
      booked: false,
      duration: 'Afternoon',
      price: 600,
      available: true,
    },
    {
      id: 7,
      time: '01:00pm To 02:00pm',
      booked: false,
      duration: 'Afternoon',
      price: 600,
      available: true,
    },
    {
      id: 8,
      time: '02:00pm To 03:00pm',
      booked: false,
      duration: 'Afternoon',
      price: 600,
      available: true,
    },
    {
      id: 9,
      time: '03:00pm To 04:00pm',
      booked: false,
      duration: 'Afternoon',
      price: 600,
      available: false,
    },
    {
      id: 10,
      time: '04:00pm To 05:00pm',
      booked: true,
      duration: 'Afternoon',
      price: 600,
      available: true,
    },
    {
      id: 11,
      time: '05:00pm To 06:00pm',
      booked: true,
      duration: 'Afternoon',
      price: 600,
      available: true,
    },
  ];

export const availableData = [
  {
    id: 1,
    title: "Available",
  },
  {
    id: 2,
    title: "Not Available",
  },
];

export const data = [
  {
    id: 1,
    icon: 'dollar',
    number: '1,00,000',
    desc: 'Earnings',
    bgColor: AppColors.purple,
  },
  {
    id: 2,
    icon: 'envelope-open-o',
    number: '10,000',
    desc: 'Enquiries',
    bgColor: AppColors.green,
  },
  {
    id: 3,
    icon: 'bookmark-o',
    number: '65',
    desc: 'Booked',
    bgColor: AppColors.primaryColor,
  },
  {
    id: 4,
    icon: 'calendar-o',
    number: '11',
    desc: 'Available',
    bgColor: AppColors.blue,
  },
];

export const categoryList: categoryListType[] = [
  {
    id: 1,
    name: 'Cricket',
  },
  {
    id: 2,
    name: 'Pickle ball',
  },
  {
    id: 3,
    name: 'Basket ball',
  },
  {
    id: 4,
    name: 'Volley ball',
  },
  {
    id: 5,
    name: 'Football',
  },
  {
    id: 6,
    name: 'Lawn tennis',
  },
  {
    id:7,
    name: 'Table tennis',
  },
];

export const grassType: categoryListType[] = [
  {
    id: 1,
    name: 'Original',
  },
  {
    id: 2,
    name: 'Artificial',
  },
  {
    id: 3,
    name: 'None',
  }
];

export const amenitiesList: AmenitiesData[] = [
  {
    id: 1,
    name: 'Cafe',
    icon: 'fastfood',
    iconProvider: IconProvider.materialIcons,
  },
  {
    id: 2,
    name: 'Water',
    icon: 'glass-water',
    iconProvider: IconProvider.fontAwesome6,
  },
  {
    id: 3,
    name: 'Parking',
    icon: 'car',
    iconProvider: IconProvider.fontAwesome5,
  },
  {
    id: 4,
    name: 'Restroom',
    icon: 'restroom',
    iconProvider: IconProvider.fontAwesome5,
  },
  {
    id: 5,
    name: 'Seating',
    icon: 'chair',
    iconProvider: IconProvider.materialIcons,
  },
  {
    id: 6,
    name: 'Changing room',
    icon: 'door-open',
    iconProvider: IconProvider.fontAwesome5,
  },
  {
    id: 7,
    name: 'Lighting',
    icon: 'ceiling-light',
    iconProvider: IconProvider.materialCommunityIcons,
  },
];

const includeExtra = true;

export const actions: Action[] = [
  {
    title: 'Take a Image',
    type: 'capture',
    iconName: 'photo-camera',
    options: {
      saveToPhotos: true,
      mediaType: 'photo',
      includeBase64: false,
      includeExtra,
    },
  },
  {
    title: 'Upload from Library',
    type: 'library',
    iconName: 'photo-library',
    options: {
      selectionLimit: 5,
      mediaType: 'photo',
      includeBase64: false,
      includeExtra,
    },
  },
];

export const timeList: TimeListType[] = [
  {
    id: 1,
    time: 'Morning',
    duration: '07:00AM To 12:00PM'
  },
  {
    id: 1,
    time: 'Afternoon',
    duration: '12:00PM To 06:00PM'
  },
  {
    id: 1,
    time: 'Evening',
    duration: '06:00PM To 01:00AM'
  },
]