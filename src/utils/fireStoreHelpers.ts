import { doc, DocumentData, setDoc } from "firebase/firestore";
import firestore, {
    FirebaseFirestoreTypes,
  } from '@react-native-firebase/firestore';
import { deleteFirestoreDataType, getFireStoreDataType, setFirestoreDataType, updateFirestoreDataType } from "./types";
import { db } from "./firebaseService";

export enum DB_KEYS {
    USER = 'users',
    NOTIFICATION_DATA = 'notificationData',
    REQUEST = 'request',
    BOXDATA = 'BoxData',
  }

  export const getFireStoreData = async (
    data: getFireStoreDataType,
  ): Promise<DocumentData> => {
    const { id, collectionName } = data;
    if (id) {
      return await firestore()
        .collection(collectionName)
        .doc(id)
        .get()
        .then(documentSnapshot => {
          return documentSnapshot.data()!;
        })
        .catch(err => {
          return err;
        });
    } else {
      return await firestore()
        .collection(collectionName)
        .get()
        .then(documentSnapshot => {
          return documentSnapshot.docs;
        })
        .catch(err => {
          return err;
        });
    }
  };

  export const setFirestoreData = async <T>(
    data: setFirestoreDataType<T>,
  ): Promise<DocumentData | void> => {
    const { id, collectionName, payload } = data;
  
    if (id) {
      return await firestore()
        .collection(collectionName)
        .doc(id)
        .set(payload as FirebaseFirestoreTypes.SetOptions);
    } else {
      return await setDoc(
        doc(db, collectionName),
        payload as FirebaseFirestoreTypes.SetOptions,
      );
    }
  };

  export const updateFirestoreData = async <T>(
    data: updateFirestoreDataType<T>,
  ): Promise<void> => {
    const { id, collectionName, payload } = data;
    return await firestore()
      .collection(collectionName)
      .doc(id)
      .update(payload as FirebaseFirestoreTypes.SetOptions);
  };

  export const deleteFirestoreData = async (
    data: deleteFirestoreDataType,
  ): Promise<void> => {
    const { id, collectionName } = data;
    return await firestore()
      .collection(collectionName)
      .doc(id)
      .delete();
  };