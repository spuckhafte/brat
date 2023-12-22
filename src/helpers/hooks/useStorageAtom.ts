// import AsyncStorage from "@react-native-async-storage/async-storage"
// import { PrimitiveAtom, atom, useAtom } from "jotai"

// type WithInitalValue<Value> = {
//     init: Value
// }

// type StorageAtom<T> = {
//     key: string,
//     atom: PrimitiveAtom<T> & WithInitalValue<T>
// }

// type StoreTypes = boolean | number | string | object | undefined;


// export default async <T extends StoreTypes>(storedAtom: StorageAtom<T>) => {
//     let previousValueInStorage = await getLocal<T>(storedAtom.key);
//     if (previousValueInStorage)
//         storedAtom = storageAtom(storedAtom.key, previousValueInStorage);

//     const [state, _setState] = useAtom(storedAtom.atom);
//     await storeLocal(storedAtom.key, state);

//     async function setState(value: T) {
//         await storeLocal(storedAtom.key, value);
//         _setState(value);
//     }

//     return [state, setState] as (T | ((value: T) => Promise<void>))[];
// }

// export function storageAtom<T extends StoreTypes>(key: string, value: T) {
//     const anAtom = atom(value);
//     return { 
//         key, 
//         atom: anAtom 
//     } as StorageAtom<T>;
// }

// // internal storage handlers:

// const TYPE_VALUE_SPLITTER = "::::>";

// async function storeLocal(key: string, data: StoreTypes) {
//     let dataToBeStored: string;

//     if (typeof data == "object")
//         dataToBeStored = `object${TYPE_VALUE_SPLITTER}${JSON.stringify(data)}`;
//     else
//         dataToBeStored = `${typeof data}::${data}`;
    
//     await AsyncStorage.setItem(`@brat-${key}`, dataToBeStored);
// }

// async function getLocal<T extends StoreTypes>(key: string): Promise<T | null> {
//     let item = await AsyncStorage.getItem(`@brat-${key}`);
//     if (item == null) return item;

//     let dataToBeReturned: any;

//     const [valueType, value] = item.split("${TYPE_VALUE_SPLITTER}");

//     switch (valueType) {
//         case "boolean":
//             dataToBeReturned = (value == "true");
//             break;
//         case "number":
//             dataToBeReturned = Number(value);
//             break;
//         case "string":
//             dataToBeReturned = value;
//             break;
//         case "object":
//             dataToBeReturned = JSON.parse(value);
//             break;
//         case "undefined":
//             dataToBeReturned = undefined;
//             break;
//         default:
//             dataToBeReturned = value;
//     }
    
//     return dataToBeReturned as T;
// }