import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../Pages/admin/firebase";

export async function getDocument(coll, id) {
  const snap = await getDoc(doc(db, coll, id));
  if (snap.exists()) return { ...snap.data(), id: snap.id };
  else return Promise.reject(Error(`No such document: ${coll}.${id}`));
}

export const fetchDocumentCount = async (coll) => {
  const querySnapshot = await getDocs(collection(db, coll));
  const count = querySnapshot.size; // get the number of documents
  return count;
};

export const fetchModuleList = async (coll, setState) => {
  await getDocs(collection(db, coll)).then((querySnapshot) => {
    const newData = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id
    }));
    setState(newData);
  });
};

export const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "INR"

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});
