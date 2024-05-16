import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button
} from "@nextui-org/react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Textarea } from "@nextui-org/react";
import axios from "../../api/axios";
import { useState, useEffect } from "react";


function NotesModal({ appointmentID, isOpen, onOpenChange, onClose }) {

  const queryClient = useQueryClient();
  
  const [writtenNotes, setWrittenNotes] = useState("");

  const { data: notes } = useQuery({
    queryKey: ["medicNotes", appointmentID],
    queryFn: async () => {
      const res = await axios.get(
        `/medic/appointments/${appointmentID}/notes`,
        {
          headers: {
            Authorization: localStorage.getItem("token")
              ? `Bearer ${localStorage.getItem("token")}`
              : undefined,
          },
        }
      );
      return res.data.notes;
    },
    enabled : isOpen
  });

  const addNotes = useMutation({
    mutationKey: "addNotes",
    mutationFn: async (notes) => {
      const res = await axios.post(
        `/medic/appointments/${appointmentID}/notes`,
        notes,
        {
          headers: {
            Authorization: localStorage.getItem("token")
              ? `Bearer ${localStorage.getItem("token")}`
              : undefined,
          },
        }
      );
      return res.data;
    },
    onSuccess: () => {
      onOpenChange(false);
    },
  });

  useEffect(() => {
    if (notes) {
      setWrittenNotes(notes);
    }
  }, [notes]);

  return (
    <Modal size="xs" isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Appointment Notes
            </ModalHeader>
            <ModalBody>
              <Textarea
                label="Notes"
                placeholder="Enter Notes"
                className="max-w-xs"
                defaultValue={notes ? notes : ""}
                onChange={(e) => {
                  setWrittenNotes(e.target.value);
                }}
                value={writtenNotes}
              />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button
                color="primary"
                onPress={() => {
                  addNotes.mutate({
                    notes: writtenNotes,
                  });
                }}
              >
                Save
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default NotesModal;
