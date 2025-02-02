import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { database } from "../firebase/config";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import toast from "react-hot-toast";
// const {user} = useUser()



// Fetch Collection
export const useFetchCollection = (collectionName: string) => {
  return useQuery({
    queryKey: [collectionName],
    queryFn: async () => {
      const snapshot = await getDocs(collection(database, collectionName));
      return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    },
  });
};

// Add Document
export const useAddDocument = (collectionName: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (task: Record<string, any>) => {

      const dbCollection = collection(database, collectionName);
      await addDoc(dbCollection, task);
    },
    onSuccess: () => {
      toast.success("Task Created Successfully!");
      queryClient.invalidateQueries({ queryKey: [collectionName] }); 
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred.");
      }
    },
  });
};

// Update Document
export const useUpdateDocument = (collectionName: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: object }) => {
      const docRef = doc(database, collectionName, id);
      await updateDoc(docRef, data);
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: [collectionName, id] });
    },
  });
};

//Delete Task
export const useDeleteDocument = (collectionName: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      if (!id) throw new Error("Invalid document ID");

      const confirmDelete = window.confirm("Are you sure you want to delete this document?");
      if (!confirmDelete) return;

      const docRef = doc(database, collectionName, id);
      await deleteDoc(docRef);
    },
    onSuccess: () => {
      toast.success("Document deleted successfully!");
      queryClient.invalidateQueries({ queryKey: [collectionName] });
    },
    onError: (error: any) => {
      console.error("Error deleting document:", error);
      toast.error(error.message || "Failed to delete document");
    },
  });
};
