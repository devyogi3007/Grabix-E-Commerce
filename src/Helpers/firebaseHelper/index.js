import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
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

export const fetchQueryCountCount = async (coll, user) => {
  try {
    let count = 0;

    if (user.role?.id === 1) {
      // Admin: Fetch all products
      const snapshot = await getDocs(collection(db, coll));
      count = snapshot.size; // Firestore snapshot has a `size` property for count
    } else if (user.role?.id === 2 && user.id) {
      // Vendor: Fetch products by vendor ID
      const querys = query(
        collection(db, coll),
        where("vId", "==", user.id)
      );
      const snapshot = await getDocs(querys);
      count = snapshot.size;
    } else {
      // console.log("Invalid user role or missing vendor ID.");
      return 0;
    }

    // console.log(`Product Count for ${user.role}:`, count);
    return count;
  } catch (error) {
    // console.error("Error fetching product count:", error);
    return 0;
  }
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
